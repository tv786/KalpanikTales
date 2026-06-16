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
}

async function fetchReadingHistory(userId: string): Promise<ReadingHistoryItem[]> {
  const { data, error } = await supabase
    .from("reading_history")
    .select(`
      book_id,
      chapter_id,
      page_number,
      last_read_at,
      books!inner (
        id,
        title,
        slug,
        cover_image_url,
        latest_chapter_number
      ),
      chapters!inner (
        id,
        title,
        slug,
        chapter_number
      )
    `)
    .eq("user_id", userId)
    .order("last_read_at", { ascending: false })
    .limit(5);

  if (error) throw error;
  return (data ?? []) as unknown as ReadingHistoryItem[];
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
  const progressPercent = item.books.latest_chapter_number
    ? Math.min(100, Math.round((item.chapters.chapter_number / item.books.latest_chapter_number) * 100))
    : 0;

  return (
    <Link
      to="/read/$bookSlug/$chapterSlug"
      params={{ bookSlug: item.books.slug, chapterSlug: item.chapters.slug }}
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
          Chapter {item.chapters.chapter_number} — {item.chapters.title}
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
