import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ImageUpload } from "@/components/ImageUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/helpers";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/$bookId/")({
  component: AdminBookDetail,
});

function AdminBookDetail() {
  const { bookId } = Route.useParams();
  const qc = useQueryClient();

  const { data: book } = useQuery({
    queryKey: ["admin", "book", bookId],
    queryFn: async () => {
      const { data, error } = await supabase.from("books").select("*").eq("id", bookId).single();
      if (error) throw error;
      return data;
    },
  });

  const { data: chapters = [] } = useQuery({
    queryKey: ["admin", "chapters", bookId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("chapters")
        .select("id, title, slug, chapter_number, is_published")
        .eq("book_id", bookId)
        .order("chapter_number", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [edit, setEdit] = useState<typeof book | null>(null);
  useEffect(() => setEdit(book ?? null), [book]);

  const saveBook = useMutation({
    mutationFn: async () => {
      if (!edit) return;
      const { error } = await supabase
        .from("books")
        .update({
          title: edit.title,
          synopsis: edit.synopsis,
          author: edit.author,
          artist: edit.artist,
          type: edit.type,
          status: edit.status,
          cover_image_url: edit.cover_image_url,
          is_featured: edit.is_featured,
          meta_title: (edit as any).meta_title || null,
          meta_description: (edit as any).meta_description || null,
          meta_keywords: (edit as any).meta_keywords || null,
        })
        .eq("id", bookId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Saved");
      qc.invalidateQueries({ queryKey: ["admin", "book", bookId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const [newChapterTitle, setNewChapterTitle] = useState("");
  const [newChapterNumber, setNewChapterNumber] = useState("");

  const createChapter = useMutation({
    mutationFn: async () => {
      const title = newChapterTitle.trim();
      const number = Number(newChapterNumber) || (chapters.length + 1);
      if (!title) throw new Error("Chapter title required");
      const { error } = await supabase.from("chapters").insert({
        book_id: bookId,
        title,
        slug: slugify(`${number}-${title}`),
        chapter_number: number,
        content_type: "text",
        is_published: false,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Chapter created");
      setNewChapterTitle("");
      setNewChapterNumber("");
      qc.invalidateQueries({ queryKey: ["admin", "chapters", bookId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const togglePublish = useMutation({
    mutationFn: async (c: { id: string; is_published: boolean }) => {
      const { error } = await supabase
        .from("chapters")
        .update({ is_published: !c.is_published })
        .eq("id", c.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin", "chapters", bookId] }),
  });

  const deleteChapter = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("chapters").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Chapter deleted");
      qc.invalidateQueries({ queryKey: ["admin", "chapters", bookId] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const { data: comments = [], isLoading: commentsLoading } = useQuery({
    queryKey: ["admin", "comments", bookId],
    queryFn: async () => {
      const { data: commentsData, error: commentsError } = await supabase
        .from("comments")
        .select("id, user_id, parent_id, content, likes, is_hidden, created_at")
        .eq("book_id", bookId)
        .order("created_at", { ascending: true });
      if (commentsError) throw commentsError;
      const commentsArr = (commentsData ?? []) as any[];

      const userIds = Array.from(new Set(commentsArr.map((c) => c.user_id))).filter(Boolean);
      let profilesMap = new Map<string, any>();
      if (userIds.length) {
        const { data: profilesData } = await supabase.from("profiles").select("id, username, avatar_url").in("id", userIds);
        (profilesData ?? []).forEach((p: any) => profilesMap.set(p.id, p));
      }

      return commentsArr.map((c) => ({ ...c, profile: profilesMap.get(c.user_id) ?? null }));
    },
    enabled: !!bookId,
  });

  const deleteComment = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("comments").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Comment deleted");
      qc.invalidateQueries({ queryKey: ["admin", "comments", bookId] });
      qc.invalidateQueries({ queryKey: ["admin", "books"] });
      qc.invalidateQueries({ queryKey: ["admin", "comments-for-books"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!edit) return <p className="text-muted-foreground">Loading...</p>;

  return (
    <div className="space-y-8">
      <Button asChild variant="ghost" size="sm">
        <Link to="/admin">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back to books
        </Link>
      </Button>

      {/* Book edit */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Book details</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={edit.title} onChange={(e) => setEdit({ ...edit, title: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Author</Label>
            <Input value={edit.author ?? ""} onChange={(e) => setEdit({ ...edit, author: e.target.value })} />
          </div>
          <div className="space-y-2">
            <Label>Type</Label>
            <Select value={edit.type} onValueChange={(v) => setEdit({ ...edit, type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mythology">Mythology</SelectItem>
                <SelectItem value="folklore">Folklore</SelectItem>
                <SelectItem value="fantasy">Fantasy</SelectItem>
                <SelectItem value="epic">Epic</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select value={edit.status} onValueChange={(v) => setEdit({ ...edit, status: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="hiatus">Hiatus</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Cover image</Label>
            <ImageUpload
              value={edit.cover_image_url ?? ""}
              onChange={(url) => setEdit({ ...edit, cover_image_url: url })}
              folder="covers"
              label="Cover"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Synopsis</Label>
            <Textarea rows={4} value={edit.synopsis ?? ""} onChange={(e) => setEdit({ ...edit, synopsis: e.target.value })} />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Meta Title</Label>
            <Input 
              value={(edit as any).meta_title ?? ""} 
              onChange={(e) => setEdit({ ...edit, meta_title: e.target.value })}
              placeholder={`Defaults to: ${edit.title}`}
            />
            <p className="text-xs text-muted-foreground">Leave empty to use book title</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Meta Description</Label>
            <Textarea 
              rows={3}
              value={(edit as any).meta_description ?? ""} 
              onChange={(e) => setEdit({ ...edit, meta_description: e.target.value })}
              placeholder={`Defaults to: ${edit.synopsis?.substring(0, 150)}...`}
            />
            <p className="text-xs text-muted-foreground">Leave empty to use synopsis</p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Meta Keywords</Label>
            <Input 
              value={(edit as any).meta_keywords ?? ""} 
              onChange={(e) => setEdit({ ...edit, meta_keywords: e.target.value })}
              placeholder="e.g., mythology, folklore, fantasy"
            />
            <p className="text-xs text-muted-foreground">Comma-separated keywords for SEO</p>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={() => saveBook.mutate()} disabled={saveBook.isPending}>
            {saveBook.isPending ? "Saving..." : "Save book"}
          </Button>
        </div>
      </section>

      {/* Chapters */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Chapters</h2>
        <div className="flex flex-wrap items-end gap-2">
          <div className="space-y-1">
            <Label>Number</Label>
            <Input
              type="number"
              step="0.1"
              className="w-24"
              value={newChapterNumber}
              onChange={(e) => setNewChapterNumber(e.target.value)}
              placeholder={String(chapters.length + 1)}
            />
          </div>
          <div className="flex-1 space-y-1">
            <Label>Chapter title</Label>
            <Input value={newChapterTitle} onChange={(e) => setNewChapterTitle(e.target.value)} />
          </div>
          <Button onClick={() => createChapter.mutate()} disabled={createChapter.isPending}>
            <Plus className="mr-2 h-4 w-4" /> Add
          </Button>
        </div>

        {chapters.length === 0 ? (
          <p className="text-sm text-muted-foreground">No chapters yet.</p>
        ) : (
          <div className="divide-y divide-border overflow-hidden rounded-md border border-border">
            {chapters.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3">
                <span className="w-12 text-sm text-muted-foreground">#{Number(c.chapter_number)}</span>
                <span className="flex-1 font-medium">{c.title}</span>
                <div className="flex items-center gap-2 text-xs">
                  <Switch
                    checked={c.is_published}
                    onCheckedChange={() => togglePublish.mutate({ id: c.id, is_published: c.is_published })}
                  />
                  <span className="text-muted-foreground">{c.is_published ? "Published" : "Draft"}</span>
                </div>
                <Button asChild variant="ghost" size="sm">
                  <Link to="/admin/$bookId/$chapterId" params={{ bookId, chapterId: c.id }}>
                    <Pencil className="mr-1 h-4 w-4" /> Pages
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    if (confirm("Delete this chapter and all its pages?")) deleteChapter.mutate(c.id);
                  }}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Comments */}
      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <h2 className="text-lg font-semibold">Comments</h2>
        {commentsLoading ? (
          <p className="text-sm text-muted-foreground">Loading comments...</p>
        ) : comments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No comments yet.</p>
        ) : (
          <div className="space-y-3">
            {comments.map((c: any) => (
              <div key={c.id} className="rounded-md border border-border bg-background p-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="font-medium text-sm">{c.profile?.username ?? "Traveller"}</span>
                      <span className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleString()}</span>
                    </div>
                    <p className="mt-2 text-sm whitespace-pre-wrap">{c.content}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs text-muted-foreground">Likes: {c.likes}</span>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (!confirm("Delete this comment?")) return;
                          deleteComment.mutate(c.id);
                        }}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
