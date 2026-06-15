import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmptyState } from "@/components/ui/empty-state";
import { BookHeart } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchUserBookmarks } from "@/lib/books";

export const Route = createFileRoute("/_authenticated/bookmarks")({
  head: () => ({
    meta: [{ title: "Your bookmarks — KalpanikTales" }],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { user } = Route.useRouteContext();
  const bookmarks = useQuery({
    queryKey: ["user-bookmarks", user.id],
    queryFn: () => fetchUserBookmarks(user.id),
  });

  return (
    <div className="min-h-screen bg-transparent">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <header className="mb-10 flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary font-display text-2xl text-primary-foreground">
            {(user.email ?? "?").charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="font-display text-3xl text-foreground">Your bookmarks</h1>
            <p className="text-sm text-muted-foreground">Tales you've saved to read</p>
          </div>
        </header>

        <section>
          {bookmarks.isLoading ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full" />
              ))}
            </div>
          ) : bookmarks.data && bookmarks.data.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {bookmarks.data.map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={<BookHeart className="h-16 w-16" />}
              title="No bookmarks yet"
              description="Tap the bookmark icon on any book to save it here."
            />
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}
