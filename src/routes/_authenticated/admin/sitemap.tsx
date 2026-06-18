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
import { ArrowLeft, RefreshCw, Globe, FileText } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/_authenticated/admin/sitemap")({
  component: AdminSitemap,
});

function AdminSitemap() {
  const qc = useQueryClient();

  const { data: sitemapSettings, isLoading } = useQuery({
    queryKey: ["admin", "sitemap-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("sitemap_settings" as any)
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    enabled: true,
    changefreq_default: "weekly",
    priority_default: 0.8,
    exclude_patterns: "",
  });

  useState(() => {
    if (sitemapSettings) {
      const settings = sitemapSettings as any;
      setForm({
        enabled: settings.enabled ?? true,
        changefreq_default: settings.changefreq_default ?? "weekly",
        priority_default: settings.priority_default ?? 0.8,
        exclude_patterns: settings.exclude_patterns?.join(", ") ?? "",
      });
    }
  });

  const update = useMutation({
    mutationFn: async () => {
      const excludePatterns = form.exclude_patterns
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);

      const { error } = await supabase
        .from("sitemap_settings" as any)
        .update({
          enabled: form.enabled,
          changefreq_default: form.changefreq_default,
          priority_default: form.priority_default,
          exclude_patterns: excludePatterns,
        } as any)
        .eq("id", (sitemapSettings as any)?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Sitemap settings updated successfully");
      qc.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const regenerate = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("sitemap_settings" as any)
        .update({ last_generated_at: new Date().toISOString() } as any)
        .eq("id", (sitemapSettings as any)?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Sitemap marked for regeneration");
      qc.invalidateQueries({ queryKey: ["admin", "sitemap-settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" size="sm">
            <Link to="/admin">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to admin
            </Link>
          </Button>
          <h2 className="text-xl font-semibold">Sitemap Management</h2>
        </div>
        <Button onClick={() => regenerate.mutate()} disabled={regenerate.isPending}>
          <RefreshCw className="mr-2 h-4 w-4" />
          {regenerate.isPending ? "Regenerating..." : "Regenerate Sitemap"}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--gold)]" />
              <CardTitle>Sitemap Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your XML sitemap for search engines
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Enable Sitemap</Label>
                <p className="text-sm text-muted-foreground">
                  Allow search engines to crawl your sitemap
                </p>
              </div>
              <Switch
                checked={form.enabled}
                onCheckedChange={(checked) => setForm({ ...form, enabled: checked })}
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="changefreq_default">Default Change Frequency</Label>
                <Select
                  value={form.changefreq_default}
                  onValueChange={(v) => setForm({ ...form, changefreq_default: v })}
                >
                  <SelectTrigger id="changefreq_default">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="always">Always</SelectItem>
                    <SelectItem value="hourly">Hourly</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority_default">Default Priority (0.0 - 1.0)</Label>
                <Input
                  id="priority_default"
                  type="number"
                  step="0.1"
                  min="0"
                  max="1"
                  value={form.priority_default}
                  onChange={(e) => setForm({ ...form, priority_default: parseFloat(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="exclude_patterns">Exclude Patterns (comma-separated)</Label>
              <Input
                id="exclude_patterns"
                value={form.exclude_patterns}
                onChange={(e) => setForm({ ...form, exclude_patterns: e.target.value })}
                placeholder="/admin, /auth, /_authenticated"
              />
              <p className="text-sm text-muted-foreground">
                Paths matching these patterns will be excluded from the sitemap
              </p>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => update.mutate()} disabled={update.isPending}>
                {update.isPending ? "Saving..." : "Save Settings"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Sitemap Info */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-[var(--gold)]" />
              <CardTitle>Sitemap Information</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Sitemap URL</Label>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-muted px-3 py-2 rounded text-sm">
                  https://kalpaniktales.com/sitemap.xml
                </code>
                <Button variant="outline" size="sm" asChild>
                  <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                    View
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Last Generated</Label>
              <p className="text-sm text-muted-foreground">
                {(sitemapSettings as any)?.last_generated_at
                  ? new Date((sitemapSettings as any).last_generated_at).toLocaleString()
                  : "Not generated yet"}
              </p>
            </div>

            <div className="space-y-2">
              <Label>Status</Label>
              <Badge variant={form.enabled ? "default" : "secondary"}>
                {form.enabled ? "Enabled" : "Disabled"}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Quick Tips */}
        <Card>
          <CardHeader>
            <CardTitle>SEO Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-muted-foreground">
              • Submit your sitemap to Google Search Console for better indexing
            </p>
            <p className="text-muted-foreground">
              • Set appropriate change frequencies for different content types
            </p>
            <p className="text-muted-foreground">
              • Use priority to indicate the relative importance of pages
            </p>
            <p className="text-muted-foreground">
              • Exclude admin and authentication pages from the sitemap
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
