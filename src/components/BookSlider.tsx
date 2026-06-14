import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookCard, type BookCardData } from "@/components/BookCard";
import React, { useEffect, useRef, useState } from "react";

interface Props {
  title: string;
  subtitle?: string;
  books?: BookCardData[];
  isLoading?: boolean;
  seeAllTo?: string;
  emptyText?: string;
  fullWidth?: boolean;
  autoplay?: boolean;
  scaleActive?: boolean;
}

export function BookSlider({
  title,
  subtitle,
  books,
  isLoading,
  seeAllTo,
  emptyText,
  fullWidth = false,
  autoplay = false,
  scaleActive = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    if (!containerRef.current || !books || books.length === 0) return;
    const opts: IntersectionObserverInit = {
      root: containerRef.current,
      threshold: 0.55,
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const idx = Number(entry.target.getAttribute("data-index"));
        if (entry.isIntersecting) setActiveIndex(idx);
      });
    }, opts);
    slideRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [books]);

  useEffect(() => {
    if (!autoplay || !books || books.length === 0 || !containerRef.current) return;
    let paused = false;
    let timer: ReturnType<typeof setInterval> | null = null;
    const start = () => {
      if (timer) return;
      timer = setInterval(() => {
        if (paused) return;
        const next = (activeIndex + 1) % books.length;
        const nextEl = slideRefs.current[next];
        const container = containerRef.current;
        if (nextEl && container) {
          const target = nextEl.offsetLeft - (container.clientWidth - nextEl.clientWidth) / 2;
          container.scrollTo({ left: target, behavior: "smooth" });
        }
      }, 3500);
    };
    start();
    const el = containerRef.current;
    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      if (timer) clearInterval(timer);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [autoplay, books, activeIndex]);

  const sectionClass = fullWidth
    ? "w-full overflow-hidden px-4 py-8 sm:px-6"
    : "mx-auto max-w-7xl px-4 py-10 sm:px-6";

  return (
    <section className={sectionClass}>
      {(title || subtitle || seeAllTo) && (
        <div className="mb-6 flex items-end justify-between">
          <div>
            {title && <h2 className="font-display text-3xl text-foreground">{title}</h2>}
            {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
          </div>
          {seeAllTo && (
            <Button asChild variant="ghost" size="sm">
              <Link to={seeAllTo}>
                See all <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          )}
        </div>
      )}

      {isLoading ? (
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[2/3] w-44 shrink-0" />
          ))}
        </div>
      ) : books && books.length > 0 ? (
        <div
          ref={containerRef}
          className={
            (fullWidth ? "px-3 sm:px-4 " : "-mx-4 px-4 sm:-mx-6 sm:px-6 ") +
            "flex snap-x snap-mandatory gap-4 overflow-x-auto py-3 pb-5 scrollbar-thin"
          }
        >
          {books.map((b, i) => (
            <div
              key={b.id}
              data-index={i}
              ref={(el) => {
                if (!el) return;
                slideRefs.current[i] = el;
              }}
              className={`w-44 shrink-0 origin-center snap-start sm:w-52 transition-transform duration-300 ${
                scaleActive && i === activeIndex ? "scale-105 z-10" : "scale-100"
              }`}
            >
              <BookCard book={b} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">{emptyText ?? "Nothing here yet."}</p>
      )}
    </section>
  );
}
