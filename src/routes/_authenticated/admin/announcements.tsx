import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/announcements")({
  component: AdminAnnouncements,
});

function AdminAnnouncements() {
  const qc = useQueryClient();
  const { data: announcements = [], isLoading } = useQuery({
    queryKey: ["admin", "announcements"],
    queryFn: async () => {
      const { data, error } = await supabase.from("announcements").select("id, title, body, is_published, created_at").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isPublished, setIsPublished] = useState(true);

  const create = useMutation({
    mutationFn: async () => {
      const t = title.trim();
      if (!t) throw new Error("Title required");
      const { data, error } = await supabase.from("announcements").insert({ title: t, body: body || null, is_published: isPublished }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Announcement created");
      setTitle("");
      setBody("");
      setIsPublished(true);
      qc.invalidateQueries({ queryKey: ["admin", "announcements"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm">
        <Link to="/admin">
          <ArrowLeft className="mr-1 h-4 w-4" /> Back
        </Link>
      </Button>

      <h2 className="text-xl font-semibold">Announcements</h2>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label>Publish now</Label>
            <div>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={isPublished} onChange={(e) => setIsPublished(e.target.checked)} />
                <span className="text-sm">Published</span>
              </label>
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label>Body</Label>
            <Textarea rows={6} value={body} onChange={(e) => setBody(e.target.value)} />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => { setTitle(""); setBody(""); setIsPublished(true); }}>Cancel</Button>
          <Button onClick={() => create.mutate()} disabled={create.isPending}>{create.isPending ? "Creating..." : "Create announcement"}</Button>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : announcements.length === 0 ? (
          <p className="text-muted-foreground">No announcements yet.</p>
        ) : (
          <ul className="space-y-3">
            {announcements.map((a: any) => (
              <li key={a.id} className="rounded-md border p-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.is_published ? "Published" : "Draft"}</div>
                  </div>
                </div>
                {a.body && <div className="mt-2 text-sm text-muted-foreground">{a.body}</div>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
