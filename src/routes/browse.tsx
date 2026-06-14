import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { BookOpen, X } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EmptyState } from "@/components/ui/empty-state";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookCard } from "@/components/BookCard";
import { fetchBooks } from "@/lib/books";

const TYPES = ["all", "mythology", "folklore", "fantasy", "epic", "fable"] as const;
const STATUSES = ["all", "ongoing", "completed", "hiatus"] as const;
const SORTS = ["newest", "popular", "rating", "title"] as const;

const searchSchema = z.object({
  type: fallback(z.enum(TYPES), "all").default("all"),
  status: fallback(z.enum(STATUSES), "all").default("all"),
  sort: fallback(z.enum(SORTS), "newest").default("newest"),
  q: fallback(z.string(), "").default(""),
});

export const Route = createFileRoute("/browse")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Browse stories — KalpanikTales" },
      { name: "description", content: "Browse all books on KalpanikTales by genre, status, and rating." },
    ],
  }),
  component: BrowsePage,
});

function BrowsePage() {
  const { type, status, sort, q } = Route.useSearch();
  const navigate = useNavigate({ from: "/browse" });

  const update = (patch: Record<string, string>) => {
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, ...patch }) });
  };

  const { data, isLoading } = useQuery({
    queryKey: ["books", { type, status, sort, q }],
    queryFn: () => fetchBooks({ type, status, sort, q }),
  });

  const hasFilters = type !== "all" || status !== "all" || sort !== "newest" || q !== "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-4xl text-foreground">Browse</h1>
        <p className="mt-1 text-muted-foreground">Wander every realm in the library.</p>

        {/* Filters */}
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl border border-border bg-card p-4">
          <Input
            value={q}
            onChange={(e) => update({ q: e.target.value })}
            placeholder="Search by title…"
            className="w-full max-w-xs"
          />
          <Select value={type} onValueChange={(v) => update({ type: v })}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Genre" /></SelectTrigger>
            <SelectContent>
              {TYPES.map((t) => (
                <SelectItem key={t} value={t} className="capitalize">{t === "all" ? "All genres" : t}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={(v) => update({ status: v })}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Status" /></SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s} className="capitalize">{s === "all" ? "Any status" : s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sort} onValueChange={(v) => update({ sort: v })}>
            <SelectTrigger className="w-40"><SelectValue placeholder="Sort" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="rating">Top rated</SelectItem>
              <SelectItem value="title">Title (A–Z)</SelectItem>
            </SelectContent>
          </Select>
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate({ search: { type: "all", status: "all", sort: "newest", q: "" } })}
            >
              <X className="mr-1 h-4 w-4" /> Clear
            </Button>
          )}
        </div>

        {/* Grid */}
        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="aspect-[2/3] w-full" />
              ))}
            </div>
          ) : data && data.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">
                {data.length} {data.length === 1 ? "story" : "stories"}
              </p>
              <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {data.map((b) => <BookCard key={b.id} book={b} />)}
              </div>
            </>
          ) : (
            <EmptyState
              icon={<BookOpen className="h-16 w-16" />}
              title="No stories match"
              description="Try clearing filters or searching for something else."
            />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
