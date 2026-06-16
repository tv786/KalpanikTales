import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Flame,
  Megaphone,
  Star,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { FeedbackButton } from "@/components/ui/feedback-button";
import { BookCard, type BookCardData } from "@/components/BookCard";
import { BookSlider } from "@/components/BookSlider";
import { ContinueReading } from "@/components/ContinueReading";
import { fetchBooks, fetchLastWeekBooks, fetchMostViewedBooks } from "@/lib/books";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "KalpanikTales - Latest Stories and Chapter Updates" },
      {
        name: "description",
        content:
          "Read mythological, folklore, and fantasy story books from across Bharat with latest chapter releases, trending picks, and admin announcements.",
      },
    ],
  }),
  loader: async () => {
    const [latest, chapterReleases, popular, topRated] = await Promise.all([
      fetchBooks({ sort: "newest", limit: 12 }),
      fetchLastWeekBooks(8),
      fetchMostViewedBooks(8),
      fetchBooks({ sort: "rating", limit: 6 }),
    ]);
    return { latest, chapterReleases, popular, topRated };
  },
  component: HomePage,
});

function HomePage() {
  const loaderData = Route.useLoaderData();
  const latest = useQuery({
    queryKey: ["latest-books"],
    queryFn: () => fetchBooks({ sort: "newest", limit: 12 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
    initialData: loaderData.latest,
  });
  const chapterReleases = useQuery({
    queryKey: ["homepage-chapter-releases"],
    queryFn: () => fetchLastWeekBooks(8),
    staleTime: 1000 * 60 * 5,
    initialData: loaderData.chapterReleases,
  });
  const popular = useQuery({
    queryKey: ["homepage-popular"],
    queryFn: () => fetchMostViewedBooks(8),
    staleTime: 1000 * 60 * 10,
    initialData: loaderData.popular,
  });
  const topRated = useQuery({
    queryKey: ["homepage-top-rated"],
    queryFn: () => fetchBooks({ sort: "rating", limit: 6 }),
    staleTime: 1000 * 60 * 10,
    initialData: loaderData.topRated,
  });

  const trendingBooks = chapterReleases.data?.length ? chapterReleases.data : popular.data;
  const latestUpdates = latest.data?.slice(0, 12);

  return (
    <div className="min-h-screen overflow-x-hidden bg-transparent">
      <Navbar />
      <main className="pb-16">
        <section className="border-b border-border bg-card/40">
        
          <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
              <div>
                <Badge variant="secondary" className="mb-3 gap-1.5">
                  <Bell className="h-3.5 w-3.5" />
                  Fresh releases
                </Badge>
                <h1 className="font-display text-4xl text-foreground sm:text-5xl">
                  Latest chapter releases
                </h1>
                <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                  New chapters and freshly updated tales, gathered into one quick reading lane.
                </p>
              </div>
              <Button asChild variant="outline">
                <Link to="/browse">
                  Browse library <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          <BookSlider
            title=""
            books={chapterReleases.data}
            isLoading={chapterReleases.isLoading}
            emptyText="No recent chapter releases yet."
            fullWidth
            autoplay
            scaleActive
          />
        </section>

        <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
          <ContinueReading />
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <TrendingPanel books={trendingBooks} isLoading={chapterReleases.isLoading || popular.isLoading} />
          <PopularPanel books={popular.data} isLoading={popular.isLoading} />
        </section>

        <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6">
          <SectionHeader
            icon={<CalendarDays className="h-5 w-5" />}
            title="Latest updates"
            action={
              <Button asChild variant="ghost" size="sm">
                <Link to="/browse">
                  View all <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            }
          />
          {latest.isLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-40 rounded-lg" />
              ))}
            </div>
          ) : latestUpdates?.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {latestUpdates.map((book) => (
                <UpdateCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <p className="rounded-lg border border-border bg-card p-4 text-sm text-muted-foreground">
              No latest updates yet.
            </p>
          )}
        </section>

        <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <AdminAnnouncement />
          <PopularPanel
            title="Top rated"
            icon={<Trophy className="h-5 w-5" />}
            books={topRated.data}
            isLoading={topRated.isLoading}
          />
        </section>
      </main>
      <Footer />
      <FeedbackButton />
    </div>
  );
}

function SectionHeader({
  icon,
  title,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-foreground">
        <span className="text-[var(--gold)]">{icon}</span>
        <h2 className="font-display text-3xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function TrendingPanel({ books, isLoading }: { books?: BookCardData[]; isLoading?: boolean }) {
  return (
    <div className="min-w-0">
      <SectionHeader icon={<Flame className="h-5 w-5" />} title="Trending today" />
      <div className="rounded-lg border border-border bg-card p-4 shadow-sm">
        {isLoading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[2/3] w-44 shrink-0 rounded-lg" />
            ))}
          </div>
        ) : books?.length ? (
          <>
            {/* Mobile: 2-column grid */}
            <div className="grid grid-cols-2 gap-4 sm:hidden">
              {books.slice(0, 8).map((book) => (
                <div key={book.id} className="relative">
                  <BookCard book={book} />
                </div>
              ))}
            </div>

            {/* Desktop: horizontal slider */}
            <div className="-mx-4 hidden snap-x gap-4 overflow-x-auto px-4 pb-2 sm:flex">
              {books.slice(0, 8).map((book) => (
                <div key={book.id} className="relative w-44 shrink-0 snap-start sm:w-48">
                  <BookCard book={book} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">Trending books will appear once readers start exploring.</p>
        )}
      </div>
    </div>
  );
}

function PopularPanel({
  title = "Popular",
  icon = <Star className="h-5 w-5" />,
  books,
  isLoading,
}: {
  title?: string;
  icon?: React.ReactNode;
  books?: BookCardData[];
  isLoading?: boolean;
}) {
  return (
    <aside>
      <SectionHeader icon={icon} title={title} />
      <div className="rounded-lg border border-border bg-card p-3 shadow-sm">
        {isLoading ? (
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-20 rounded-lg" />
            ))}
          </div>
        ) : books?.length ? (
          <div className="space-y-2">
            {books.slice(0, 8).map((book, index) => (
              <RankedBook key={book.id} book={book} rank={index + 1} />
            ))}
          </div>
        ) : (
          <p className="p-2 text-sm text-muted-foreground">No popular books yet.</p>
        )}
      </div>
    </aside>
  );
}

function RankedBook({ book, rank }: { book: BookCardData; rank: number }) {
  return (
    <Link
      to="/book/$slug"
      params={{ slug: book.slug }}
      className="group grid grid-cols-[3.5rem_minmax(0,1fr)] gap-3 rounded-md p-2 transition-colors hover:bg-muted"
    >
        <div className="relative aspect-[2/3] overflow-hidden rounded-md bg-muted">
        {book.cover_image_url ? (
          <img src={book.cover_image_url} alt={book.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-6 w-6 text-[var(--gold)]/70" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <div className="min-w-0 py-1">
        <h3 className="line-clamp-2 text-sm font-semibold text-foreground group-hover:text-primary">
          {book.title}
        </h3>
        <p className="mt-1 text-xs capitalize text-muted-foreground">{book.type}</p>
        <div className="mt-2 flex items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 text-[var(--gold)]">
            <Star className={cn("h-3 w-3", (book.rating_count ?? 0) > 0 && "fill-current")} />
            {(book.avg_rating ?? 0) > 0 ? (book.avg_rating ?? 0).toFixed(1) : "New"}
          </span>
          {book.total_pages != null && (
            <span className="text-muted-foreground items-center rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--crimson)]">{book.total_pages} pages</span>
          )}
        </div>
      </div>
    </Link>
  );
}

function UpdateCard({ book }: { book: BookCardData }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-[5rem_minmax(0,1fr)] gap-4 rounded-lg border border-border bg-card p-3 shadow-sm"
    >
      <Link to="/book/$slug" params={{ slug: book.slug }} className="aspect-[2/3] overflow-hidden rounded-md bg-muted">
        {book.cover_image_url ? (
          <img src={book.cover_image_url} alt={book.title} className="h-full w-full object-cover" loading="lazy" decoding="async" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <BookOpen className="h-7 w-7 text-[var(--gold)]/70" strokeWidth={1.5} />
          </div>
        )}
      </Link>
      <div className="min-w-0">
        <Link
          to="/book/$slug"
          params={{ slug: book.slug }}
          className="line-clamp-1 font-display text-xl text-foreground hover:text-primary"
        >
          {book.title}
        </Link>
        <p className="mt-1 text-xs capitalize text-muted-foreground">{book.status}</p>
        <div className="mt-3">
          {book.total_pages != null && (
            <div className="flex items-center justify-between gap-3 rounded-md bg-muted/70 px-3 py-2 text-xs">
              <span className="font-medium text-foreground">{book.total_pages} pages</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

function AdminAnnouncement() {
  return (
    <section className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-[var(--gold)]">
          <Megaphone className="h-5 w-5" />
        </span>
        <h2 className="font-display text-3xl text-foreground">Announcement</h2>
      </div>
      <div className="rounded-lg border border-[var(--gold)]/30 bg-gradient-to-br from-[var(--gold)]/10 via-transparent to-[var(--crimson)]/10 p-5">
        <Badge variant="secondary">From admin</Badge>
        <h3 className="mt-3 font-display text-2xl text-foreground">Welcome to the new reading hub</h3>
        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          The homepage now puts fresh chapter releases, trending stories, popular books, and latest updates in one
          place. More announcement controls can be wired into the admin panel next.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <Button asChild size="sm">
            <Link to="/browse">Start reading</Link>
          </Button>
          <Button asChild size="sm" variant="outline">
            <Link to="/search">Search stories</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

function makeChapterRows(latest?: number | null) {
  if (latest == null) {
    return [
      { label: "Chapter coming soon", time: "New" },
      { label: "Book added", time: "Recently" },
    ];
  }

  return [
    { label: `Chapter ${latest}`, time: "Latest" },
    ...(latest > 1 ? [{ label: `Chapter ${latest - 1}`, time: "Previous" }] : []),
    ...(latest > 2 ? [{ label: `Chapter ${latest - 2}`, time: "Archive" }] : []),
  ];
}
