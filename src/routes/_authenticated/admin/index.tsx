import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil, Trash, Search, X } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: AdminBooks,
});

function AdminBooks() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterFeatured, setFilterFeatured] = useState("all");

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin", "books", searchQuery, filterType, filterStatus, filterFeatured],
    queryFn: async () => {
      let query = supabase
        .from("books")
        .select("id, slug, title, type, status, total_views, is_featured, cover_image_url, created_at");

      if (searchQuery) {
        query = query.ilike("title", `%${searchQuery}%`);
      }

      if (filterType !== "all") {
        query = query.eq("type", filterType);
      }

      if (filterStatus !== "all") {
        query = query.eq("status", filterStatus);
      }

      if (filterFeatured === "featured") {
        query = query.eq("is_featured", true);
      } else if (filterFeatured === "not-featured") {
        query = query.eq("is_featured", false);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const { data: commentsForBooks = [] } = useQuery({
    queryKey: ["admin", "comments-for-books", books.map((b: any) => b.id)],
    queryFn: async () => {
      const ids = (books as any[]).map((b) => b.id);
      if (!ids.length) return [];
      const { data, error } = await supabase.from("comments").select("id, book_id").in("book_id", ids);
      if (error) throw error;
      return data ?? [];
    },
    enabled: (books as any[]).length > 0,
  });

  const commentCountByBook = (commentsForBooks as any[]).reduce((acc: any, c: any) => {
    acc[c.book_id] = (acc[c.book_id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const [form, setForm] = useState({
    title: "",
    synopsis: "",
    author: "",
    type: "fantasy",
    status: "ongoing",
    cover_image_url: "",
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!form.title.trim()) throw new Error("Title required");
      const { data, error } = await supabase
        .from("books")
        .insert({
          title: form.title,
          slug: slugify(form.title),
          synopsis: form.synopsis || null,
          author: form.author || null,
          type: form.type,
          status: form.status,
          cover_image_url: form.cover_image_url || null,
        })
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Book created");
      qc.invalidateQueries({ queryKey: ["admin", "books"] });
      setShowForm(false);
      setForm({ title: "", synopsis: "", author: "", type: "fantasy", status: "ongoing", cover_image_url: "" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
      return id;
    },
    onSuccess: (_, id) => {
      toast.success("Book deleted");
      qc.invalidateQueries({ queryKey: ["admin", "books"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Books</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/categories">Manage categories</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/announcements">Announcements</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/users">Users</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/feedback">Feedback</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/seo">SEO Settings</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/redirects">Redirects</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/sitemap">Sitemap</Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin/media">Media</Link>
          </Button>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" /> New book
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="mythology">Mythology</SelectItem>
            <SelectItem value="folklore">Folklore</SelectItem>
            <SelectItem value="fantasy">Fantasy</SelectItem>
            <SelectItem value="epic">Epic</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="ongoing">Ongoing</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="hiatus">Hiatus</SelectItem>
          </SelectContent>
        </Select>
        <Select value={filterFeatured} onValueChange={setFilterFeatured}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Featured" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="featured">Featured</SelectItem>
            <SelectItem value="not-featured">Not Featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {showForm && (
        <div className="space-y-4 rounded-lg border border-border bg-card p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Author</Label>
              <Input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
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
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
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
                value={form.cover_image_url}
                onChange={(url) => setForm({ ...form, cover_image_url: url })}
                folder="covers"
                label="Cover"
              />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Synopsis</Label>
              <Textarea rows={4} value={form.synopsis} onChange={(e) => setForm({ ...form, synopsis: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={() => create.mutate()} disabled={create.isPending}>
              {create.isPending ? "Creating..." : "Create book"}
            </Button>
          </div>
        </div>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : books.length === 0 ? (
        <p className="text-muted-foreground">No books yet.</p>
      ) : (
        <div className="overflow-hidden rounded-lg border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="px-4 py-2">Cover</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Views</th>
                <th className="px-4 py-2">Comments</th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {books.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="px-4 py-2">
                    {b.cover_image_url ? (
                      <img
                        src={b.cover_image_url}
                        alt={b.title}
                        className="h-12 w-8 object-cover rounded"
                      />
                    ) : (
                      <div className="h-12 w-8 bg-muted rounded flex items-center justify-center">
                        <span className="text-xs text-muted-foreground">No img</span>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2 font-medium">{b.title}</td>
                  <td className="px-4 py-2 capitalize">{b.type}</td>
                  <td className="px-4 py-2 capitalize">{b.status}</td>
                  <td className="px-4 py-2">{b.total_views}</td>
                  <td className="px-4 py-2">{commentCountByBook[b.id] ?? 0}</td>
                  <td className="px-4 py-2 text-right">
                    <Button asChild variant="ghost" size="sm">
                      <Link to="/admin/$bookId" params={{ bookId: b.id }}>
                        <Pencil className="mr-1 h-4 w-4" /> Manage
                      </Link>
                    </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (!confirm(`Delete \"${b.title}\"? This cannot be undone.`)) return;
                          remove.mutate(b.id);
                        }}
                      >
                        <Trash className="ml-2 h-4 w-4 text-destructive" />
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
