import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TipTapEditor } from "@/components/TipTapEditor";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/$bookId/$chapterId")({
  component: AdminChapter,
});

function AdminChapter() {
  const { bookId, chapterId } = Route.useParams();
  const qc = useQueryClient();

  const { data: chapter } = useQuery({
    queryKey: ["admin", "chapter", chapterId],
    queryFn: async () => {
      const { data, error } = await supabase.from("chapters").select("*").eq("id", chapterId).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: pages = [] } = useQuery({
    queryKey: ["admin", "pages", chapterId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pages")
        .select("id, page_number, content, image_url")
        .eq("chapter_id", chapterId)
        .order("page_number", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  useEffect(() => {
    if (!selectedId && pages.length > 0) setSelectedId(pages[0].id);
  }, [pages, selectedId]);

  const selected = pages.find((p) => p.id === selectedId) ?? null;
  const [draftContent, setDraftContent] = useState<unknown>(null);

  useEffect(() => {
    setDraftContent(selected?.content ?? { type: "doc", content: [{ type: "paragraph" }] });
  }, [selectedId, selected?.content]);

  const createPage = useMutation({
    mutationFn: async () => {
      const nextNumber = (pages[pages.length - 1]?.page_number ?? 0) + 1;
      const { data, error } = await supabase
        .from("pages")
        .insert({ chapter_id: chapterId, page_number: nextNumber, content: { type: "doc", content: [{ type: "paragraph" }] } })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (d) => {
      qc.invalidateQueries({ queryKey: ["admin", "pages", chapterId] });
      setSelectedId(d.id);
      toast.success("Page added");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const savePage = useMutation({
    mutationFn: async () => {
      if (!selectedId) return;
      const { error } = await supabase
        .from("pages")
        .update({
          content: draftContent as never,
        })
        .eq("id", selectedId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page saved");
      qc.invalidateQueries({ queryKey: ["admin", "pages", chapterId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deletePage = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page deleted");
      setSelectedId(null);
      qc.invalidateQueries({ queryKey: ["admin", "pages", chapterId] });
    },
  });

  if (!chapter) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/admin/$bookId" params={{ bookId }}>
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to chapters
        </Link>
      </Button>

      <header>
        <h2 className="text-xl font-semibold">
          Chapter {Number(chapter.chapter_number)} — {chapter.title}
        </h2>
        <p className="text-sm text-muted-foreground">{pages.length} page(s)</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Page list */}
        <aside className="space-y-2">
          <Button onClick={() => createPage.mutate()} disabled={createPage.isPending} className="w-full">
            <Plus className="mr-2 h-4 w-4" /> New page
          </Button>
          <div className="divide-y divide-border overflow-hidden rounded-md border border-border">
            {pages.map((p) => (
              <button
                key={p.id}
                onClick={() => setSelectedId(p.id)}
                className={`flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${
                  selectedId === p.id ? "bg-muted font-medium" : "hover:bg-muted/50"
                }`}
              >
                <span>Page {p.page_number}</span>
                <Trash2
                  className="h-4 w-4 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (confirm("Delete this page?")) deletePage.mutate(p.id);
                  }}
                />
              </button>
            ))}
            {pages.length === 0 && (
              <p className="px-3 py-4 text-center text-xs text-muted-foreground">No pages yet</p>
            )}
          </div>
        </aside>

        {/* Editor */}
        <section className="space-y-4">
          {selected ? (
            <>
              <TipTapEditor
                value={draftContent}
                onChange={setDraftContent}
                imageFolder={`pages/${chapterId}`}
              />
              <div className="flex justify-end pt-2">
                <Button onClick={() => savePage.mutate()} disabled={savePage.isPending}>
                  <Save className="mr-2 h-4 w-4" />
                  {savePage.isPending ? "Saving..." : "Save page"}
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">Select or create a page to start editing.</p>
          )}
        </section>
      </div>
    </div>
  );
}
