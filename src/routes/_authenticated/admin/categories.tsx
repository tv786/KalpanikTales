import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { slugify } from "@/lib/helpers";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/categories")({
  component: AdminCategories,
});

function AdminCategories() {
  const qc = useQueryClient();
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ["admin", "categories"],
    queryFn: async () => {
      const { data, error } = await supabase.from("categories").select("id, name, slug, created_at").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const [name, setName] = useState("");

  const create = useMutation({
    mutationFn: async () => {
      const n = name.trim();
      if (!n) throw new Error("Name required");
      const { data, error } = await supabase.from("categories").insert({ name: n, slug: slugify(n) }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Category created");
      setName("");
      qc.invalidateQueries({ queryKey: ["admin", "categories"] });
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

      <h2 className="text-xl font-semibold">Categories</h2>

      <section className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2 md:col-span-2">
            <Label>Name</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="flex items-end">
            <Button onClick={() => create.mutate()} disabled={create.isPending}>
              {create.isPending ? "Creating..." : "Create category"}
            </Button>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        {isLoading ? (
          <p className="text-muted-foreground">Loading...</p>
        ) : categories.length === 0 ? (
          <p className="text-muted-foreground">No categories yet.</p>
        ) : (
          <ul className="space-y-2">
            {categories.map((c: any) => (
              <li key={c.id} className="flex items-center justify-between rounded-md p-2">
                <div>
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-muted-foreground">{c.slug}</div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
