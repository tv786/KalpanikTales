import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { fetchBooks } from "@/lib/books";
import { BookCard, type BookCardData } from "@/components/BookCard";

export const Route = createFileRoute("/search")({
  head: () => ({
    meta: [{ title: "Search — KalpanikTales" }],
  }),
  component: SearchPage,
});

function SearchPage() {
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const results = useQuery({
    queryKey: ["search", debouncedQ],
    queryFn: () => fetchBooks({ q: debouncedQ, limit: 50 }),
    enabled: debouncedQ.length > 0,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-4xl text-foreground">Search the library</h1>
        <div className="relative mt-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Title, author, theme…"
            className="pl-10"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="mt-8">
          {debouncedQ.length === 0 ? (
            <p className="text-sm text-muted-foreground">Type to search titles in the library.</p>
          ) : results.isLoading ? (
            <p className="text-sm text-muted-foreground">Searching…</p>
          ) : results.data && results.data.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {(results.data as BookCardData[]).map((b) => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No results for “{debouncedQ}”.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
