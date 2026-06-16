import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ReadingHistoryItem {
  book_id: string;
  chapter_id: string;
  page_number: number;
  last_read_at: string;
  books: {
    id: string;
    title: string;
    slug: string;
    cover_image_url: string | null;
    latest_chapter_number: number | null;
  };
  chapters: {
    id: string;
    title: string;
    slug: string;
    chapter_number: number;
  };
  total_pages?: number;
}

async function fetchReadingHistory(userId: string): Promise<ReadingHistoryItem[]> {
  // First fetch reading history without joins
  const { data: historyData, error: historyError } = await supabase
    .from("reading_history")
    .select("book_id, chapter_id, page_number, last_read_at")
    .eq("user_id", userId)
    .order("last_read_at", { ascending: false })
    .limit(5);

  if (historyError) throw historyError;
  const history = historyData ?? [];
  
  if (history.length === 0) return [];
  
  // Fetch books and chapters separately
  const historyBookIds = history.map(h => h.book_id);
  const historyChapterIds = history.map(h => h.chapter_id);
  
  const [{ data: books }, { data: chapterData }] = await Promise.all([
    supabase
      .from("books")
      .select("id, title, slug, cover_image_url")
      .in("id", historyBookIds),
    supabase
      .from("chapters")
      .select("id, title, slug, chapter_number")
      .in("id", historyChapterIds),
  ]);
  
  const booksMap = new Map(books?.map(b => [b.id, b]) ?? []);
  const chaptersMap = new Map(chapterData?.map(c => [c.id, c]) ?? []);
  
  // Combine data
  const combined = history
    .map((h: any) => ({
      ...h,
      books: booksMap.get(h.book_id) || null,
      chapters: chaptersMap.get(h.chapter_id) || null,
    }))
    .filter((h: any) => h.books && h.chapters) as unknown as ReadingHistoryItem[];
  
  if (combined.length === 0) return [];
  
  // Fetch total pages for each book
  const bookIds = combined.map(h => h.book_id);
  if (bookIds.length === 0) return combined;
  
  const { data: allChapters } = await supabase
    .from("chapters")
    .select("id, book_id")
    .in("book_id", bookIds)
    .eq("is_published", true);
  
  const allChapterIds = allChapters?.map((c: any) => c.id) ?? [];
  if (allChapterIds.length === 0) return combined;
  
  const { data: pages } = await supabase
    .from("pages")
    .select("chapter_id")
    .in("chapter_id", allChapterIds);
  
  // Calculate total pages per book
  const pagesByChapter = new Map<string, number>();
  (pages ?? []).forEach((p: any) => {
    const count = pagesByChapter.get(p.chapter_id) ?? 0;
    pagesByChapter.set(p.chapter_id, count + 1);
  });
  
  const totalPagesByBook = new Map<string, number>();
  (allChapters ?? []).forEach((c: any) => {
    const count = totalPagesByBook.get(c.book_id) ?? 0;
    totalPagesByBook.set(c.book_id, count + (pagesByChapter.get(c.id) ?? 0));
  });
  
  return combined.map((item: any) => ({
    ...item,
    total_pages: totalPagesByBook.get(item.book_id) ?? 0,
  }));
}

export function ContinueReading() {
  const { user } = useAuth();
  const historyQ = useQuery({
    queryKey: ["reading-history", user?.id],
    queryFn: () => fetchReadingHistory(user!.id),
    enabled: !!user,
  });

  if (!user) {
    return null;
  }

  if (historyQ.isLoading) {
    return (
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[var(--gold)]" />
          <h2 className="font-display text-2xl text-foreground">Continue reading</h2>
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  const items = historyQ.data ?? [];

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-[var(--gold)]" />
          <h2 className="font-display text-2xl text-foreground">Continue reading</h2>
        </div>
        <div className="rounded-lg border border-dashed border-border bg-muted/30 p-5 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-muted-foreground/50" />
          <p className="mt-3 text-sm text-muted-foreground">
            Start reading a tale to track your progress here.
          </p>
          <Button asChild className="mt-4" size="sm">
            <Link to="/browse">
              Browse library <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-[var(--gold)]" />
          <h2 className="font-display text-2xl text-foreground">Continue reading</h2>
        </div>
        {items.length > 0 && (
          <Button asChild variant="ghost" size="sm">
            <Link to="/browse">
              View all <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <ReadingItem key={item.book_id} item={item} />
        ))}
      </div>
    </div>
  );
}

function ReadingItem({ item }: { item: ReadingHistoryItem }) {
  const progressPercent = item.total_pages && item.total_pages > 0
    ? Math.min(100, Math.round((item.page_number / item.total_pages) * 100))
    : 0;
  const nextPage = item.page_number + 1;

  return (
    <Link
      to="/read/$bookSlug/$chapterSlug"
      params={{ bookSlug: item.books.slug, chapterSlug: item.chapters.slug }}
      search={{ page: nextPage }}
      className="group grid grid-cols-[4rem_minmax(0,1fr)] gap-3 rounded-md p-2 transition-colors hover:bg-muted"
    >
      <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
        {item.books.cover_image_url ? (
          <img
            src={item.books.cover_image_url}
            alt={item.books.title}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-5 w-5 text-[var(--gold)]/70" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="min-w-0 py-1">
        <h3 className="line-clamp-1 text-sm font-semibold text-foreground group-hover:text-primary">
          {item.books.title}
        </h3>
        <p className="mt-1 text-xs text-muted-foreground">
          Continue from page {nextPage}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex-1 overflow-hidden rounded-full bg-muted">
            <div
              className={cn(
                "h-1.5 rounded-full bg-gradient-to-r from-[var(--saffron)] to-[var(--crimson)]",
                "transition-all duration-300"
              )}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground">{progressPercent}%</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground/70">
          Last read {timeAgo(item.last_read_at)}
        </p>
      </div>
    </Link>
  );
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
