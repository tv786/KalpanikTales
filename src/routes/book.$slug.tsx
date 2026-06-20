import { useEffect, useState, useMemo } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BookOpen, Eye, Calendar, Bookmark, BookmarkCheck, CheckCircle, Circle, ChevronDown, ChevronUp } from "lucide-react";
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
import { BookSchema } from "@/components/seo/StructuredData";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { SEOMeta } from "@/components/seo/SEOMeta";

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

async function fetchReadingProgress(bookId: string, userId: string) {
  const { data } = await supabase
    .from("reading_history")
    .select("chapter_id, page_number")
    .eq("book_id", bookId)
    .eq("user_id", userId)
    .maybeSingle();
  return data ?? null;
}

async function fetchChapterPages(chapterId: string) {
  const { data, error } = await supabase
    .from("pages")
    .select("id, page_number")
    .eq("chapter_id", chapterId)
    .order("page_number", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

async function fetchAllChapterPages(chapterIds: string[]) {
  if (chapterIds.length === 0) return [];
  const { data, error } = await supabase
    .from("pages")
    .select("chapter_id, page_number")
    .in("chapter_id", chapterIds);
  if (error) throw error;
  return data ?? [];
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
  const [expandedChapterId, setExpandedChapterId] = useState<string | null>(null);

  const bookQ = useQuery({ queryKey: ["book", slug], queryFn: () => fetchBookDetail(slug) });
  const book = bookQ.data;

  const bookWithMeta = book as any;

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

  const readingProgressQ = useQuery({
    queryKey: ["reading-progress", book?.id, user?.id],
    queryFn: () => fetchReadingProgress(book!.id, user!.id),
    enabled: !!book && !!user,
  });

  const chapterPagesQ = useQuery({
    queryKey: ["chapter-pages", expandedChapterId],
    queryFn: () => fetchChapterPages(expandedChapterId!),
    enabled: !!expandedChapterId,
  });

  const allPagesQ = useQuery({
    queryKey: ["all-pages", book?.id, chaptersQ.data?.map(c => c.id)],
    queryFn: () => fetchAllChapterPages(chaptersQ.data?.map(c => c.id) ?? []),
    enabled: !!book && !!chaptersQ.data && chaptersQ.data.length > 0,
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

  // Calculate continuous page offsets for each chapter (must be before early return)
  const chapters = chaptersQ.data ?? [];
  const allPages = allPagesQ.data ?? [];
  const chapterPageOffsets = useMemo(() => {
    const offsets: Record<string, number> = {};
    let offset = 0;
    for (let i = 0; i < chapters.length; i++) {
      offsets[chapters[i].id] = offset;
      const chapterPages = allPages.filter(p => p.chapter_id === chapters[i].id);
      offset += chapterPages.length;
    }
    return offsets;
  }, [chapters, allPages]);

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
  const readingProgress = readingProgressQ.data;
  const currentChapterId = readingProgress?.chapter_id;
  const currentPageNumber = readingProgress?.page_number;
  
  // Calculate which chapters are read (chapters before and including current reading progress)
  const currentChapterIndex = currentChapterId 
    ? chapters.findIndex(ch => ch.id === currentChapterId)
    : -1;
  const totalChapters = chapters.length;
  
  // Calculate page-level progress
  const totalPages = allPages.length;
  let completedPages = 0;

  if (currentChapterIndex >= 0 && totalPages > 0 && currentPageNumber) {
    // Count all pages with page_number less than or equal to current page
    completedPages = allPages.filter(p => p.page_number <= currentPageNumber).length;
  }
  
  const progressPercent = totalPages > 0 
    ? Math.round((completedPages / totalPages) * 100)
    : 0;
  
  // Calculate continuous page number for display
  const continuousCurrentPageNumber = currentChapterId && currentPageNumber
    ? currentPageNumber
    : null;

  return (
    <>
      <SEOMeta
        title={bookWithMeta.meta_title || book.title}
        description={bookWithMeta.meta_description || book.synopsis}
        keywords={bookWithMeta.meta_keywords}
        canonical={typeof window !== "undefined" ? `${window.location.origin}/book/${book.slug}` : undefined}
        ogTitle={bookWithMeta.meta_title || book.title}
        ogDescription={bookWithMeta.meta_description || book.synopsis}
        ogImage={book.cover_image_url || undefined}
        ogType="book"
      />
      <BookSchema {...book} avg_rating={avg} total_pages={allPages.length} />
      <Breadcrumb items={[{ name: book.title, href: `/book/${book.slug}` }]} />
      <div className="min-h-screen bg-transparent">
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
                  <img
                    src={book.cover_image_url}
                    alt={(book as any).cover_image_alt || book.title}
                    title={(book as any).cover_image_title || undefined}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <BookOpen className="h-16 w-16 text-[var(--gold)]/60" strokeWidth={1} />
                  </div>
                )}
                {(book as any).cover_image_caption && (
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    {(book as any).cover_image_caption}
                  </p>
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
                    <Link to="/read/$bookSlug/$chapterSlug" params={{ bookSlug: book.slug, chapterSlug: firstChapter.slug }} search={{ page: undefined }}>
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
                <div className="space-y-4">
                  {user && totalChapters > 0 && (
                    <div className="rounded-lg border border-border bg-card p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">Your progress</span>
                        <span className="text-sm text-muted-foreground">{progressPercent}%</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full bg-gradient-to-r from-[var(--saffron)] to-[var(--crimson)] transition-all duration-300"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground">
                        {currentChapterIndex >= 0 
                          ? `You're on Chapter ${chapters[currentChapterIndex].chapter_number}${continuousCurrentPageNumber ? `, Page ${continuousCurrentPageNumber}` : ""}`
                          : "Start reading to track your progress"}
                      </p>
                    </div>
                  )}
                  <ul className="divide-y divide-border rounded-xl border border-border bg-card">
                    {chaptersQ.data!.map((ch, index) => {
                      const isRead = user && currentChapterIndex >= 0 && index <= currentChapterIndex;
                      const isCurrent = ch.id === currentChapterId;
                      const isExpanded = expandedChapterId === ch.id;
                      const pages = chapterPagesQ.data ?? [];
                      return (
                        <li key={ch.id}>
                          <div 
                            className={`flex items-center justify-between gap-4 px-4 py-3 transition-colors cursor-pointer ${
                              isCurrent ? "bg-muted/50" : ""
                            }`}
                          >
                            <div 
                              className="min-w-0 flex-1"
                              onClick={() => setExpandedChapterId(isExpanded ? null : ch.id)}
                            >
                              <div className="flex items-center gap-3">
                                {user ? (
                                  isRead ? (
                                    <CheckCircle className="h-4 w-4 text-[var(--crimson)]" />
                                  ) : (
                                    <Circle className="h-4 w-4 text-muted-foreground" />
                                  )
                                ) : (
                                  <span className="font-display text-[var(--gold)]">#{ch.chapter_number}</span>
                                )}
                                <span className="truncate font-medium">{ch.title}</span>
                                {isCurrent && (
                                  <Badge variant="secondary" className="text-xs">Current</Badge>
                                )}
                              </div>
                              <p className="mt-0.5 text-xs text-muted-foreground">{timeAgo(ch.created_at)}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => setExpandedChapterId(isExpanded ? null : ch.id)}
                                className="p-2"
                              >
                                {isExpanded ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                              <Button size="sm" variant="ghost" asChild>
                                <Link to="/read/$bookSlug/$chapterSlug" params={{ bookSlug: book.slug, chapterSlug: ch.slug }} search={{ page: undefined }}>
                                  Read
                                </Link>
                              </Button>
                            </div>
                          </div>
                          {isExpanded && (
                            <div className="border-t border-border bg-muted/30 px-4 py-3">
                              {chapterPagesQ.isLoading ? (
                                <div className="flex gap-2">
                                  {Array.from({ length: 3 }).map((_, i) => (
                                    <Skeleton key={i} className="h-8 w-16 rounded" />
                                  ))}
                                </div>
                              ) : pages.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {pages.map((page) => {
                                    const continuousPageNumber = chapterPageOffsets[ch.id] + page.page_number;
                                    const isPageRead = user && isCurrent && currentPageNumber && page.page_number <= currentPageNumber;
                                    return (
                                      <Link
                                        key={page.id}
                                        to="/read/$bookSlug/$chapterSlug"
                                        params={{ bookSlug: book.slug, chapterSlug: ch.slug }}
                                        search={{ page: page.page_number }}
                                        className={`inline-flex items-center justify-center rounded-md border px-3 py-1.5 text-sm transition-colors ${
                                          isPageRead
                                            ? "border-[var(--crimson)] bg-[var(--crimson)]/10 text-[var(--crimson)]"
                                            : "border-border bg-background text-foreground hover:bg-muted hover:text-primary"
                                        }`}
                                      >
                                        {isPageRead && <CheckCircle className="mr-1 h-3 w-3" />}
                                        Page {page.page_number}
                                      </Link>
                                    );
                                  })}
                                </div>
                              ) : (
                                <p className="text-sm text-muted-foreground">No pages in this chapter yet.</p>
                              )}
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
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
    </>
  );
}
