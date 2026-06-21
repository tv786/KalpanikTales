import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { PageRenderer } from "@/components/PageRenderer";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Settings, ArrowLeft } from "lucide-react";
import { getSessionId, hasViewedBook, markBookAsViewed } from "@/lib/view-tracking";
import { CommentThread } from "@/components/CommentThread";

// Convert continuous page number to chapter-local page number
function convertContinuousToChapterPage(continuousPage: number, chapterIndex: number, allChapters: any[], allPages: any[]): { chapterIndex: number; localPage: number } {
  let offset = 0;
  for (let i = 0; i < allChapters.length; i++) {
    const chapterPages = allPages.filter(p => p.chapter_id === allChapters[i].id);
    if (continuousPage <= offset + chapterPages.length) {
      return { chapterIndex: i, localPage: continuousPage - offset };
    }
    offset += chapterPages.length;
  }
  // If page is beyond all pages, return last page
  return { chapterIndex: allChapters.length - 1, localPage: allPages.filter(p => p.chapter_id === allChapters[allChapters.length - 1].id).length };
}

export const Route = createFileRoute("/read/$bookSlug/$chapterSlug")({
  ssr: false,
  component: ReaderPage,
  validateSearch: (search: Record<string, unknown>) => {
    return {
      page: typeof search.page === "number" ? search.page : undefined,
    };
  },
});

type ReadMode = "single" | "scroll";

function ReaderPage() {
  const { bookSlug, chapterSlug } = Route.useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const searchParams = Route.useSearch();
  const pageParam = searchParams.page as number | undefined;

  const [mode, setMode] = useState<ReadMode>(() => {
    if (typeof window === "undefined") return "single";
    return (localStorage.getItem("reader.mode") as ReadMode) || "single";
  });
  const [fontSize, setFontSize] = useState<number>(() => {
    if (typeof window === "undefined") return 18;
    return Number(localStorage.getItem("reader.fontSize") || 18);
  });
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem("reader.mode", mode);
  }, [mode]);
  useEffect(() => {
    localStorage.setItem("reader.fontSize", String(fontSize));
  }, [fontSize]);

  // Fetch book, chapter, pages and sibling chapters
  const { data, isLoading, error } = useQuery({
    queryKey: ["reader", bookSlug, chapterSlug],
    queryFn: async () => {
      const { data: book, error: bErr } = await supabase
        .from("books")
        .select("id, title, slug")
        .eq("slug", bookSlug)
        .maybeSingle();
      if (bErr) throw bErr;
      if (!book) throw new Error("Book not found");

      const { data: chapter, error: cErr } = await supabase
        .from("chapters")
        .select("id, title, slug, chapter_number, book_id, is_published")
        .eq("book_id", book.id)
        .eq("slug", chapterSlug)
        .maybeSingle();
      if (cErr) throw cErr;
      if (!chapter) throw new Error("Chapter not found");

      const [{ data: pages }, { data: chapters }] = await Promise.all([
        supabase
          .from("pages")
          .select("id, page_number, content, image_url")
          .eq("chapter_id", chapter.id)
          .order("page_number", { ascending: true }),
        supabase
          .from("chapters")
          .select("id, title, slug, chapter_number")
          .eq("book_id", book.id)
          .eq("is_published", true)
          .order("chapter_number", { ascending: true }),
      ]);

      return {
        book,
        chapter,
        pages: pages ?? [],
        chapters: chapters ?? [],
      };
    },
    enabled: !!bookSlug && !!chapterSlug,
  });

  const { prevChapter, nextChapter } = useMemo(() => {
    if (!data) return { prevChapter: null, nextChapter: null };
    const idx = data.chapters.findIndex((c) => c.id === data.chapter.id);
    return {
      prevChapter: idx > 0 ? data.chapters[idx - 1] : null,
      nextChapter: idx >= 0 && idx < data.chapters.length - 1 ? data.chapters[idx + 1] : null,
    };
  }, [data]);

  // Restore last page from reading_history when chapter loads, or use page param from URL
  useEffect(() => {
    if (!data) return;
    let cancelled = false;
    (async () => {
      if (pageParam !== undefined && pageParam > 0) {
        // Convert continuous page number to chapter-local page number
        const { localPage } = convertContinuousToChapterPage(pageParam, data.chapters.findIndex(c => c.id === data.chapter.id), data.chapters, data.pages);
        const target = Math.max(0, Math.min(data.pages.length - 1, localPage - 1));
        setPageIndex(target);
      } else if (user) {
        const { data: hist } = await supabase
          .from("reading_history")
          .select("chapter_id, page_number")
          .eq("user_id", user.id)
          .eq("book_id", data.book.id)
          .maybeSingle();
        if (cancelled) return;
        if (hist && hist.chapter_id === data.chapter.id) {
          const target = Math.max(0, Math.min(data.pages.length - 1, hist.page_number - 1));
          setPageIndex(target);
        } else {
          setPageIndex(0);
        }
      } else {
        setPageIndex(0);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [user, data, pageParam]);

  // Auto-save progress
  useEffect(() => {
    if (!user || !data || data.pages.length === 0) return;
    const pageNumber = data.pages[pageIndex]?.page_number ?? 1;
    const t = setTimeout(() => {
      supabase
        .from("reading_history")
        .upsert(
          {
            user_id: user.id,
            book_id: data.book.id,
            chapter_id: data.chapter.id,
            page_number: pageNumber,
            last_read_at: new Date().toISOString(),
          },
          { onConflict: "user_id,book_id" },
        )
        .then(() => {});
    }, 600);
    return () => clearTimeout(t);
  }, [pageIndex, data, user]);

  // Increment book view count once per session
  useEffect(() => {
    if (!data) return;
    const sessionId = getSessionId();
    const alreadyViewed = hasViewedBook(data.book.id);
    console.log("Read route - Book ID:", data.book.id, "Session ID:", sessionId, "Already viewed:", alreadyViewed);
    
    if (!alreadyViewed) {
      console.log("Read route - Attempting to increment views for book:", data.book.id);
      supabase.rpc("increment_book_views", { book_id_param: data.book.id, session_id_param: sessionId }).then(
        ({ error }) => {
          if (error) {
            console.error("Read route - Failed to increment book views:", error);
          } else {
            console.log("Read route - Successfully incremented views for book:", data.book.id);
            markBookAsViewed(data.book.id);
          }
        }
      );
    } else {
      console.log("Read route - Book already viewed in this session, skipping increment");
    }
  }, [data?.book.id]);

  if (isLoading) {
    return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  }
  if (error) {
    return (
      <div className="container py-16 text-center">
        <p className="text-destructive">{(error as Error)?.message ?? "Not found"}</p>
        <Link to="/browse" className="mt-4 inline-block underline">
          Back to browse
        </Link>
      </div>
    );
  }
  if (!data) {
    return <div className="container py-16 text-center text-muted-foreground">Loading...</div>;
  }

  const { book, chapter, pages } = data;
  const currentPage = pages[pageIndex];
  const [controlsVisible, setControlsVisible] = useState(false);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  return (
    <div className="min-h-screen bg-transparent">
      {/* Reader header (rendered only when `controlsVisible` is true so it doesn't take layout space) */}
      {controlsVisible && (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 relative flex h-14 items-center justify-between gap-2">
            <Link
              to="/book/$slug"
              params={{ slug: book.slug }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back</span>
            </Link>
            <div className="absolute left-0 right-0 text-center text-sm font-medium pointer-events-none px-4 sm:px-6 overflow-hidden">
              <div className="mx-auto w-full max-w-[15rem] sm:max-w-[25rem]">
                <Select
                  value={chapter.slug}
                  onValueChange={(v) => {
                    if (!v || v === chapter.slug) return;
                    navigate({ to: "/read/$bookSlug/$chapterSlug", params: { bookSlug: book.slug, chapterSlug: v }, search: { page: undefined } });
                  }}
                >
                  <SelectTrigger className="w-full pointer-events-auto bg-muted/10 px-3 py-1 rounded-md text-sm relative z-20">
                    <SelectValue placeholder={`Chapter ${Number(chapter.chapter_number)} — ${chapter.title}`} />
                  </SelectTrigger>
                  <SelectContent className="shadow-none bg-muted/10 p-0">
                    {data.chapters.map((ch) => (
                      <SelectItem key={ch.id} value={ch.slug}>
                        {`Chapter ${Number(ch.chapter_number)} — ${ch.title}`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Reader settings">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Reader settings</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-2">
                    <Label>Reading mode</Label>
                    <Select value={mode} onValueChange={(v) => setMode(v as ReadMode)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="single">Single page</SelectItem>
                        <SelectItem value="scroll">Scroll (all pages)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Font size: {fontSize}px</Label>
                    <Slider
                      min={14}
                      max={28}
                      step={1}
                      value={[fontSize]}
                      onValueChange={(v) => setFontSize(v[0])}
                    />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </header>
      )}

      {/* Main reading area - tapping/clicking on non-interactive areas toggles controls */}
      <main
        className="container mx-auto max-w-3xl px-4 sm:px-6 py-8 pb-24"
        onPointerDown={(e) => {
          const t = (e.target as HTMLElement | null);
          if (!t) return;
          // ignore taps on interactive elements
          if (t.closest("button, a, input, textarea, select, label")) return;
          // track touch start position to distinguish tap from scroll
          setTouchStart({ x: e.clientX, y: e.clientY });
        }}
        onPointerUp={(e) => {
          const t = (e.target as HTMLElement | null);
          if (!t || !touchStart) return;
          // ignore taps on interactive elements
          if (t.closest("button, a, input, textarea, select, label")) return;
          // check if this was a tap (minimal movement) or a scroll
          const deltaX = Math.abs(e.clientX - touchStart.x);
          const deltaY = Math.abs(e.clientY - touchStart.y);
          const isTap = deltaX < 10 && deltaY < 10;
          setTouchStart(null);
          // only toggle controls if it was a true tap, not a scroll
          if (isTap) {
            setControlsVisible((v) => !v);
          }
        }}
      >
        {pages.length === 0 ? (
          <p className="text-center text-muted-foreground">This chapter has no pages yet.</p>
        ) : mode === "scroll" ? (
          <div className="space-y-12">
            {pages.map((p) => (
              <article key={p.id} className="border-b border-border pb-12 last:border-0 px-0 sm:px-0">
                <div className="px-0 sm:px-0">
                  <PageRenderer content={p.content} imageUrl={p.image_url} fontSize={fontSize} />
                </div>
              </article>
            ))}
            <div className="pt-8">
              <CommentThread bookId={book.id} chapterId={chapter.id} />
            </div>
          </div>
        ) : (
          <article>
            <div className="px-0 sm:px-0">
              <PageRenderer
                content={currentPage?.content}
                imageUrl={currentPage?.image_url}
                fontSize={fontSize}
              />
            </div>
            {pageIndex === pages.length - 1 && (
              <div className="pt-8">
                <CommentThread bookId={book.id} chapterId={chapter.id} />
              </div>
            )}
            {controlsVisible && (
              <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 backdrop-blur">
                <div className="container mx-auto max-w-3xl px-4 sm:px-6 py-3 flex items-center justify-between gap-2">
                  <Button
                    variant="outline"
                    disabled={pageIndex === 0}
                    onClick={() => setPageIndex((i) => Math.max(0, i - 1))}
                  >
                    <ChevronLeft className="mr-1 h-4 w-4" /> Prev
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {pageIndex + 1} / {pages.length}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pageIndex >= pages.length - 1}
                    onClick={() => setPageIndex((i) => Math.min(pages.length - 1, i + 1))}
                  >
                    Next <ChevronRight className="ml-1 h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </article>
        )}
        {/* Floating hint when controls are hidden */}
        {!controlsVisible && (
          <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <button
              onClick={() => setControlsVisible(true)}
              className="rounded-full bg-muted/20 px-4 py-2 text-sm shadow-sm"
            >
              Tap to show controls
            </button>
          </div>
        )}

      </main>
    </div>
  );
}
