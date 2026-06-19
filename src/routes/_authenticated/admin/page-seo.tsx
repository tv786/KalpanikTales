import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { ArrowLeft, Save, Plus, Trash2, Pencil } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/page-seo")({
  component: AdminPageSEO,
});

function AdminPageSEO() {
  const qc = useQueryClient();

  const { data: pageSEOList = [], isLoading } = useQuery({
    queryKey: ["admin", "page-seo"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("page_seo" as any)
        .select("*")
        .order("path", { ascending: true });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    path: "",
    title: "",
    description: "",
    keywords: "",
    canonical_url: "",
    noindex: false,
    nofollow: false,
    exclude_from_sitemap: false,
  });

  const resetForm = () => {
    setForm({
      path: "",
      title: "",
      description: "",
      keywords: "",
      canonical_url: "",
      noindex: false,
      nofollow: false,
      exclude_from_sitemap: false,
    });
    setEditingId(null);
  };

  const upsertPageSEO = useMutation({
    mutationFn: async () => {
      const payload: any = {
        path: form.path,
        title: form.title || null,
        description: form.description || null,
        keywords: form.keywords || null,
        canonical_url: form.canonical_url || null,
        noindex: form.noindex,
        nofollow: form.nofollow,
        exclude_from_sitemap: form.exclude_from_sitemap,
      };

      let error;
      if (editingId) {
        const result = await supabase
          .from("page_seo" as any)
          .update(payload)
          .eq("id", editingId);
        error = result.error;
      } else {
        const result = await supabase
          .from("page_seo" as any)
          .insert(payload);
        error = result.error;
      }

      if (error) throw error;
    },
    onSuccess: () => {
      toast.success(editingId ? "Page SEO updated" : "Page SEO created");
      setShowForm(false);
      resetForm();
      qc.invalidateQueries({ queryKey: ["admin", "page-seo"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const deletePageSEO = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("page_seo" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page SEO deleted");
      qc.invalidateQueries({ queryKey: ["admin", "page-seo"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const handleEdit = (item: any) => {
    setForm({
      path: item.path,
      title: item.title || "",
      description: item.description || "",
      keywords: item.keywords || "",
      canonical_url: item.canonical_url || "",
      noindex: item.noindex || false,
      nofollow: item.nofollow || false,
      exclude_from_sitemap: item.exclude_from_sitemap || false,
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-1 h-4 w-4" /> Back to admin
            </Link>
          </Button>
          <h2 className="text-xl font-semibold">Page SEO Settings</h2>
        </div>
        <Button onClick={() => { setShowForm(true); resetForm(); }}>
          <Plus className="mr-2 h-4 w-4" /> Add Page SEO
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>{editingId ? "Edit Page SEO" : "Add Page SEO"}</CardTitle>
            <CardDescription>
              Configure SEO settings for specific pages
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Path</Label>
              <Input
                value={form.path}
                onChange={(e) => setForm({ ...form, path: e.target.value })}
                placeholder="/book/mythological-stories"
                disabled={!!editingId}
              />
              <p className="text-xs text-muted-foreground">URL path (e.g., /book/mythological-stories)</p>
            </div>
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Custom title for this page"
              />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Custom description for this page"
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label>Keywords</Label>
              <Input
                value={form.keywords}
                onChange={(e) => setForm({ ...form, keywords: e.target.value })}
                placeholder="mythology, folklore, fantasy"
              />
            </div>
            <div className="space-y-2">
              <Label>Canonical URL</Label>
              <Input
                value={form.canonical_url}
                onChange={(e) => setForm({ ...form, canonical_url: e.target.value })}
                placeholder="https://kalpaniktales.com/book/mythological-stories"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>No Index</Label>
                <p className="text-xs text-muted-foreground">Prevent search engines from indexing this page</p>
              </div>
              <Switch
                checked={form.noindex}
                onCheckedChange={(checked) => setForm({ ...form, noindex: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>No Follow</Label>
                <p className="text-xs text-muted-foreground">Prevent search engines from following links on this page</p>
              </div>
              <Switch
                checked={form.nofollow}
                onCheckedChange={(checked) => setForm({ ...form, nofollow: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Exclude from Sitemap</Label>
                <p className="text-xs text-muted-foreground">Exclude this page from the XML sitemap</p>
              </div>
              <Switch
                checked={form.exclude_from_sitemap}
                onCheckedChange={(checked) => setForm({ ...form, exclude_from_sitemap: checked })}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="ghost" onClick={() => { setShowForm(false); resetForm(); }}>
                Cancel
              </Button>
              <Button onClick={() => upsertPageSEO.mutate()} disabled={upsertPageSEO.isPending}>
                {upsertPageSEO.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : pageSEOList.length === 0 ? (
        <p className="text-muted-foreground">No page SEO settings yet.</p>
      ) : (
        <div className="space-y-3">
          {pageSEOList.map((item: any) => (
            <Card key={item.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded">{item.path}</code>
                    {item.noindex && <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">No Index</span>}
                    {item.nofollow && <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">No Follow</span>}
                    {item.exclude_from_sitemap && <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded">No Sitemap</span>}
                  </div>
                  {item.title && <p className="text-sm font-medium">{item.title}</p>}
                  {item.description && <p className="text-xs text-muted-foreground">{item.description}</p>}
                  {item.canonical_url && <p className="text-xs text-muted-foreground">Canonical: {item.canonical_url}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(item)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (confirm(`Delete SEO settings for "${item.path}"?`)) {
                        deletePageSEO.mutate(item.id);
                      }
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
