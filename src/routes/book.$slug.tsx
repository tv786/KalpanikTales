import { useEffect } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Eye, Calendar, Bookmark, BookmarkCheck } from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { StarRating } from "@/components/ui/star-rating";
import { RatingDistribution } from "@/components/RatingDistribution";
import { CommentThread } from "@/components/CommentThread";
import { EmptyState } from "@/components/ui/empty-state";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { timeAgo, formatNumber } from "@/lib/helpers";
import { getSessionId, hasViewedBook, markBookAsViewed } from "@/lib/view-tracking";

async function fetchBookDetail(slug: string) {
  const { data, error } = await supabase
    .from("books")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  if (!data) throw notFound();
  return data;
}

async function fetchChapters(bookId: string) {
  const { data, error } = await supabase
    .from("chapters")
    .select("id, slug, title, chapter_number, is_published, created_at")
    .eq("book_id", bookId)
    .eq("is_published", true)
    .order("chapter_number", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function fetchRatings(bookId: string) {
  const { data } = await supabase.from("ratings").select("score").eq("book_id", bookId);
  return (data ?? []).map((r) => r.score);
}

async function fetchCommentCount(bookId: string) {
  const { count, error } = await supabase
    .from("comments")
    .select("id", { count: "exact", head: true })
    .eq("book_id", bookId)
    .eq("is_hidden", false);
  if (error) throw error;
  return count ?? 0;
}

async function fetchMyRating(bookId: string, userId: string) {
  const { data } = await supabase
    .from("ratings")
    .select("score")
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .maybeSingle();
  return data?.score ?? 0;
}

async function fetchMyBookmark(bookId: string, userId: string) {
  const { data } = await supabase
    .from("bookmarks")
    .select("id")
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .is("chapter_id", null)
    .maybeSingle();
  return data?.id ?? null;
}

export const Route = createFileRoute("/book/$slug")({
  component: BookDetailPage,
  notFoundComponent: () => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
        <EmptyState
          icon={<BookOpen className="h-16 w-16" />}
          title="Story not found"
          description="This tale may have been moved or removed."
          action={<Button asChild><Link to="/browse">Browse library</Link></Button>}
        />
      </main>
    </div>
  ),
  errorComponent: ({ error }) => (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-3xl">Could not load this story</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
      </main>
    </div>
  ),
});

function BookDetailPage() {
  const { slug } = Route.useParams();
  const { user } = useAuth();
  const qc = useQueryClient();

  const bookQ = useQuery({ queryKey: ["book", slug], queryFn: () => fetchBookDetail(slug) });
  const book = bookQ.data;

  const chaptersQ = useQuery({
    queryKey: ["chapters", book?.id],
    queryFn: () => fetchChapters(book!.id),
    enabled: !!book,
  });

  const ratingsQ = useQuery({
    queryKey: ["ratings", book?.id],
    queryFn: () => fetchRatings(book!.id),
    enabled: !!book,
  });

  const myRatingQ = useQuery({
    queryKey: ["my-rating", book?.id, user?.id],
    queryFn: () => fetchMyRating(book!.id, user!.id),
    enabled: !!book && !!user,
  });

  const bookmarkQ = useQuery({
    queryKey: ["bookmark", book?.id, user?.id],
    queryFn: () => fetchMyBookmark(book!.id, user!.id),
    enabled: !!book && !!user,
  });

  const commentsCountQ = useQuery({
    queryKey: ["comments-count", book?.id],
    queryFn: () => fetchCommentCount(book!.id),
    enabled: !!book,
  });

  // Increment view count once per session
  useEffect(() => {
    if (book?.id) {
      const sessionId = getSessionId();
      const alreadyViewed = hasViewedBook(book.id);
      console.log("Book ID:", book.id, "Session ID:", sessionId, "Already viewed:", alreadyViewed);
      
      if (!alreadyViewed) {
        console.log("Attempting to increment views for book:", book.id);
        supabase.rpc("increment_book_views", { book_id_param: book.id, session_id_param: sessionId }).then(
          ({ error }) => {
            if (error) {
              console.error("Failed to increment book views:", error);
            } else {
              console.log("Successfully incremented views for book:", book.id);
              markBookAsViewed(book.id);
              // Refresh book data to get updated view count
              qc.invalidateQueries({ queryKey: ["book", slug] });
            }
          }
        );
      } else {
        console.log("Book already viewed in this session, skipping increment");
      }
    }
  }, [book?.id, slug, qc]);

  const rate = useMutation({
    mutationFn: async (score: number) => {
      if (!user || !book) throw new Error("Sign in to rate");
      const { error } = await supabase
        .from("ratings")
        .upsert({ book_id: book.id, user_id: user.id, score }, { onConflict: "book_id,user_id" });
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["ratings", book?.id] });
      qc.invalidateQueries({ queryKey: ["my-rating", book?.id, user?.id] });
      toast.success("Rating saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleBookmark = useMutation({
    mutationFn: async () => {
      if (!user || !book) throw new Error("Sign in to bookmark");
      if (bookmarkQ.data) {
        await supabase.from("bookmarks").delete().eq("id", bookmarkQ.data);
      } else {
        await supabase.from("bookmarks").insert({ book_id: book.id, user_id: user.id });
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["bookmark", book?.id, user?.id] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (bookQ.isLoading || !book) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Skeleton className="h-80 w-full" />
        </main>
      </div>
    );
  }

  const ratings = ratingsQ.data ?? [];
  const avg = ratings.length ? ratings.reduce((a, c) => a + c, 0) / ratings.length : 0;
  const firstChapter = chaptersQ.data?.[0];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero header */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 opacity-20" style={{ background: "var(--gradient-warm)" }} />
          <div className="relative mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[260px_1fr] md:py-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto w-full max-w-[260px]"
            >
              <div className="aspect-[2/3] overflow-hidden rounded-xl border border-border bg-gradient-to-br from-[var(--saffron)]/30 to-[var(--crimson)]/30 shadow-[var(--shadow-elegant)]">
                {book.cover_image_url ? (
                  <img src={book.cover_image_url} alt={book.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-16 w-16 text-[var(--gold)]/60" strokeWidth={1} />
                  </div>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary" className="capitalize">{book.type}</Badge>
                <Badge variant="outline" className="capitalize">{book.status}</Badge>
                {book.is_featured && <Badge className="bg-[var(--gold)] text-[var(--indigo-deep)]">Featured</Badge>}
              </div>
              <h1 className="mt-3 font-display text-4xl text-foreground md:text-5xl">{book.title}</h1>
              {book.author && (
                <p className="mt-1 font-reading italic text-muted-foreground">
                  by {book.author}{book.artist && book.artist !== book.author ? ` · art by ${book.artist}` : ""}
                </p>
              )}
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <StarRating value={avg} readOnly size="sm" />
                  <span>{avg.toFixed(1)} ({ratings.length})</span>
                </span>
                <span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" /> {formatNumber(book.total_views)}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {timeAgo(book.updated_at)}</span>
              </div>
              {book.synopsis && (
                <p className="mt-4 max-w-2xl font-reading text-foreground/90">{book.synopsis}</p>
              )}
              {book.tags?.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {book.tags.map((t) => (
                    <span key={t} className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">#{t}</span>
                  ))}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-3">
                {firstChapter ? (
                  <Button size="lg" asChild>
                    <Link to="/read/$bookSlug/$chapterSlug" params={{ bookSlug: book.slug, chapterSlug: firstChapter.slug }}>
                      <BookOpen className="mr-2 h-5 w-5" />
                      Start: {firstChapter.title}
                    </Link>
                  </Button>
                ) : (
                  <Button size="lg" disabled>
                    <BookOpen className="mr-2 h-5 w-5" />
                    No chapters yet
                  </Button>
                )}
                {user ? (
                  <Button variant="outline" onClick={() => toggleBookmark.mutate()} disabled={toggleBookmark.isPending}>
                    {bookmarkQ.data ? <BookmarkCheck className="mr-2 h-4 w-4" /> : <Bookmark className="mr-2 h-4 w-4" />}
                    {bookmarkQ.data ? "Bookmarked" : "Bookmark"}
                  </Button>
                ) : (
                  <Button asChild variant="outline"><Link to="/auth">Sign in to bookmark</Link></Button>
                )}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tabs */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <Tabs defaultValue="chapters">
            <TabsList>
              <TabsTrigger value="chapters">Chapters ({chaptersQ.data?.length ?? 0})</TabsTrigger>
              <TabsTrigger value="ratings">Ratings</TabsTrigger>
              <TabsTrigger value="comments">Comments ({commentsCountQ.data ?? 0})</TabsTrigger>
            </TabsList>

            <TabsContent value="chapters" className="mt-6">
              {chaptersQ.isLoading ? (
                <div className="space-y-2">
                  {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-14 w-full" />)}
                </div>
              ) : (chaptersQ.data?.length ?? 0) === 0 ? (
                <EmptyState
                  icon={<BookOpen className="h-12 w-12" />}
                  title="No chapters published yet"
                  description="The author is weaving — check back soon."
                />
              ) : (
                <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                  {chaptersQ.data!.map((ch) => (
                    <li key={ch.id} className="flex items-center justify-between gap-4 px-4 py-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="font-display text-[var(--gold)]">#{ch.chapter_number}</span>
                          <span className="truncate font-medium">{ch.title}</span>
                        </div>
                        <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo(ch.created_at)}</p>
                      </div>
                      <Button size="sm" variant="ghost" asChild>
                        <Link to="/read/$bookSlug/$chapterSlug" params={{ bookSlug: book.slug, chapterSlug: ch.slug }}>
                          Read
                        </Link>
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </TabsContent>

            <TabsContent value="ratings" className="mt-6 space-y-6">
              <RatingDistribution scores={ratings} />
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-xl">Your rating</h3>
                {user ? (
                  <div className="mt-2 flex items-center gap-3">
                    <StarRating
                      value={myRatingQ.data ?? 0}
                      onChange={(v) => rate.mutate(v)}
                      size="lg"
                    />
                    {myRatingQ.data ? (
                      <span className="text-sm text-muted-foreground">You rated this {myRatingQ.data} star{myRatingQ.data > 1 ? "s" : ""}</span>
                    ) : (
                      <span className="text-sm text-muted-foreground">Tap a star to rate</span>
                    )}
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-muted-foreground">
                    <Link to="/auth" className="text-primary underline">Sign in</Link> to share your rating.
                  </p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="comments" className="mt-6">
              <CommentThread bookId={book.id} />
            </TabsContent>
          </Tabs>
        </section>
      </main>
      <Footer />
    </div>
  );
}
