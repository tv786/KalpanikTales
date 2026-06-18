import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { ArrowLeft, Plus, Trash2, ToggleLeft, ToggleRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/_authenticated/admin/redirects")({
  component: AdminRedirects,
});

function AdminRedirects() {
  const qc = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    source_path: "",
    target_path: "",
    status_code: "301",
  });

  const { data: redirects, isLoading } = useQuery({
    queryKey: ["admin", "redirects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("redirects" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const create = useMutation({
    mutationFn: async () => {
      if (!form.source_path.trim() || !form.target_path.trim()) {
        throw new Error("Source and target paths are required");
      }
      const { error } = await supabase
        .from("redirects" as any)
        .insert({
          source_path: form.source_path.trim(),
          target_path: form.target_path.trim(),
          status_code: parseInt(form.status_code),
        });
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Redirect created successfully");
      qc.invalidateQueries({ queryKey: ["admin", "redirects"] });
      setShowForm(false);
      setForm({ source_path: "", target_path: "", status_code: "301" });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, active }: { id: string; active: boolean }) => {
      const { error } = await supabase
        .from("redirects" as any)
        .update({ active })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Redirect updated");
      qc.invalidateQueries({ queryKey: ["admin", "redirects"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const remove = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("redirects" as any)
        .delete()
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Redirect deleted");
      qc.invalidateQueries({ queryKey: ["admin", "redirects"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to admin
            </Link>
          </Button>
          <h2 className="text-xl font-semibold">Redirects</h2>
        </div>
        <Button onClick={() => setShowForm((v) => !v)}>
          <Plus className="mr-2 h-4 w-4" /> New redirect
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle>Create New Redirect</CardTitle>
            <CardDescription>
              Set up URL redirects for moved or renamed pages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="source_path">Source Path</Label>
                <Input
                  id="source_path"
                  value={form.source_path}
                  onChange={(e) => setForm({ ...form, source_path: e.target.value })}
                  placeholder="/old-page"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target_path">Target Path</Label>
                <Input
                  id="target_path"
                  value={form.target_path}
                  onChange={(e) => setForm({ ...form, target_path: e.target.value })}
                  placeholder="/new-page"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status_code">Status Code</Label>
                <Select value={form.status_code} onValueChange={(v) => setForm({ ...form, status_code: v })}>
                  <SelectTrigger id="status_code">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="301">301 - Permanent Redirect</SelectItem>
                    <SelectItem value="302">302 - Temporary Redirect</SelectItem>
                    <SelectItem value="307">307 - Temporary Redirect</SelectItem>
                    <SelectItem value="308">308 - Permanent Redirect</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
                <Button onClick={() => create.mutate()} disabled={create.isPending}>
                  {create.isPending ? "Creating..." : "Create redirect"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : !redirects || redirects.length === 0 ? (
        <p className="text-muted-foreground">No redirects configured yet.</p>
      ) : (
        <div className="space-y-3">
          {redirects.map((redirect: any) => (
            <Card key={redirect.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {redirect.source_path}
                    </code>
                    <span className="text-muted-foreground">→</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {redirect.target_path}
                    </code>
                    <Badge variant={redirect.active ? "default" : "secondary"}>
                      {redirect.active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{redirect.status_code}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Created {new Date(redirect.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActive.mutate({ id: redirect.id, active: !redirect.active })}
                  >
                    {redirect.active ? (
                      <ToggleRight className="h-4 w-4" />
                    ) : (
                      <ToggleLeft className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (!confirm("Delete this redirect?")) return;
                      remove.mutate(redirect.id);
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
