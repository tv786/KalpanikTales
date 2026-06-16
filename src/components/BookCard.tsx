import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Star, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BookCardData {
  id: string;
  slug: string;
  title: string;
  cover_image_url: string | null;
  author: string | null;
  type: string;
  status: string;
  avg_rating?: number;
  rating_count?: number;
  latest_chapter_number?: number | null;
  latest_page_number?: number | null;
  total_pages?: number | null;
  latest_page_start?: number | null;
  latest_page_end?: number | null;
}

export function BookCard({ book, className, priority = false }: { book: BookCardData; className?: string; priority?: boolean }) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={cn("group rounded-lg", className)}
    >
      <Link
        to="/book/$slug"
        params={{ slug: book.slug }}
        className="relative isolate block overflow-hidden rounded-lg shadow-sm transition-shadow [clip-path:inset(0_round_var(--radius-lg))] hover:shadow-[var(--shadow-elegant)]"
      >
        <div className="relative aspect-[2/3] overflow-hidden rounded-lg bg-gradient-to-br from-[var(--saffron)]/30 to-[var(--crimson)]/30">
          {book.cover_image_url ? (
            <img
              src={book.cover_image_url}
              alt={book.title}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              className="h-full w-full rounded-t-lg object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="h-12 w-12 text-[var(--gold)]/60" strokeWidth={1} />
            </div>
          )}

          <div className="absolute right-2 top-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-1 text-xs font-semibold text-[var(--gold)]">
              <Star className="h-3 w-3" />
              {(book.avg_rating ?? 0) > 0 ? (book.avg_rating ?? 0).toFixed(1) : "New"}
            </span>
          </div>
        </div>

        <div className="pt-3">
          <h3 className="line-clamp-1 text-base font-medium text-foreground">{book.title}</h3>
          <div className="mt-2" />
          {/* author and publisher intentionally hidden in card */}
          <div className="mt-1 text-xs flex items-center justify-left gap-2">
            <div />
            {book.total_pages != null && (
              <span className="inline-flex items-center rounded-full bg-gradient-to-r from-[var(--saffron)]/10 to-[var(--crimson)]/10 px-2 py-0.5 text-xs font-semibold text-[var(--crimson)]">
                {book.total_pages} pages
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
