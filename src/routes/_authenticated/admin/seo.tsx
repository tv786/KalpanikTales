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
import { ArrowLeft, Save, Globe, BarChart3, Shield } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin/seo")({
  component: AdminSEO,
});

function AdminSEO() {
  const qc = useQueryClient();

  const { data: seoSettings, isLoading } = useQuery({
    queryKey: ["admin", "seo-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("seo_settings" as any)
        .select("*")
        .single();
      if (error) throw error;
      return data;
    },
  });

  const [form, setForm] = useState({
    site_title: "",
    site_description: "",
    default_og_image: "",
    twitter_handle: "",
    facebook_url: "",
    instagram_url: "",
    youtube_url: "",
    google_analytics_id: "",
    google_tag_manager_id: "",
    google_search_console_verification: "",
    bing_webmaster_verification: "",
    default_robots_index: true,
    default_robots_follow: true,
    default_canonical_url: "",
  });

  useState(() => {
    if (seoSettings) {
      const settings = seoSettings as any;
      setForm({
        site_title: settings.site_title || "",
        site_description: settings.site_description || "",
        default_og_image: settings.default_og_image || "",
        twitter_handle: settings.twitter_handle || "",
        facebook_url: settings.facebook_url || "",
        instagram_url: settings.instagram_url || "",
        youtube_url: settings.youtube_url || "",
        google_analytics_id: settings.google_analytics_id || "",
        google_tag_manager_id: settings.google_tag_manager_id || "",
        google_search_console_verification: settings.google_search_console_verification || "",
        bing_webmaster_verification: settings.bing_webmaster_verification || "",
        default_robots_index: settings.default_robots_index ?? true,
        default_robots_follow: settings.default_robots_follow ?? true,
        default_canonical_url: settings.default_canonical_url || "",
      });
    }
  });

  const update = useMutation({
    mutationFn: async () => {
      const { error } = await supabase
        .from("seo_settings" as any)
        .update({
          site_title: form.site_title,
          site_description: form.site_description,
          default_og_image: form.default_og_image || null,
          twitter_handle: form.twitter_handle || null,
          facebook_url: form.facebook_url || null,
          instagram_url: form.instagram_url || null,
          youtube_url: form.youtube_url || null,
          google_analytics_id: form.google_analytics_id || null,
          google_tag_manager_id: form.google_tag_manager_id || null,
          google_search_console_verification: form.google_search_console_verification || null,
          bing_webmaster_verification: form.bing_webmaster_verification || null,
          default_robots_index: form.default_robots_index,
          default_robots_follow: form.default_robots_follow,
          default_canonical_url: form.default_canonical_url || null,
        } as any)
        .eq("id", (seoSettings as any)?.id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("SEO settings updated successfully");
      qc.invalidateQueries({ queryKey: ["admin", "seo-settings"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (isLoading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="sm">
          <Link to="/admin">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to admin
          </Link>
        </Button>
        <h2 className="text-xl font-semibold">SEO Settings</h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-[var(--gold)]" />
              <CardTitle>General Settings</CardTitle>
            </div>
            <CardDescription>
              Configure your site's basic SEO information
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site_title">Site Title</Label>
              <Input
                id="site_title"
                value={form.site_title}
                onChange={(e) => setForm({ ...form, site_title: e.target.value })}
                placeholder="KalpanikTales"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site_description">Site Description</Label>
              <Textarea
                id="site_description"
                value={form.site_description}
                onChange={(e) => setForm({ ...form, site_description: e.target.value })}
                placeholder="Read mythological, folklore, and fantasy story books from across Bharat."
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default_og_image">Default OG Image URL</Label>
              <Input
                id="default_og_image"
                value={form.default_og_image}
                onChange={(e) => setForm({ ...form, default_og_image: e.target.value })}
                placeholder="https://kalpaniktales.com/og-image.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Robots & Canonical */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-[var(--gold)]" />
              <CardTitle>Robots & Canonical</CardTitle>
            </div>
            <CardDescription>
              Control search engine crawling and canonical URLs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Default Index</Label>
                <p className="text-xs text-muted-foreground">Allow search engines to index pages by default</p>
              </div>
              <Switch
                checked={form.default_robots_index}
                onCheckedChange={(checked) => setForm({ ...form, default_robots_index: checked })}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Default Follow</Label>
                <p className="text-xs text-muted-foreground">Allow search engines to follow links by default</p>
              </div>
              <Switch
                checked={form.default_robots_follow}
                onCheckedChange={(checked) => setForm({ ...form, default_robots_follow: checked })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="default_canonical_url">Default Canonical URL Pattern</Label>
              <Input
                id="default_canonical_url"
                value={form.default_canonical_url}
                onChange={(e) => setForm({ ...form, default_canonical_url: e.target.value })}
                placeholder="https://kalpaniktales.com"
              />
              <p className="text-xs text-muted-foreground">Base URL for canonical links (leave empty to use current domain)</p>
            </div>
          </CardContent>
        </Card>

        {/* Social Media */}
        <Card>
          <CardHeader>
            <CardTitle>Social Media</CardTitle>
            <CardDescription>
              Connect your social media accounts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="twitter_handle">Twitter Handle</Label>
              <Input
                id="twitter_handle"
                value={form.twitter_handle}
                onChange={(e) => setForm({ ...form, twitter_handle: e.target.value })}
                placeholder="@kalpaniktales"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="facebook_url">Facebook URL</Label>
              <Input
                id="facebook_url"
                value={form.facebook_url}
                onChange={(e) => setForm({ ...form, facebook_url: e.target.value })}
                placeholder="https://facebook.com/kalpaniktales"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram_url">Instagram URL</Label>
              <Input
                id="instagram_url"
                value={form.instagram_url}
                onChange={(e) => setForm({ ...form, instagram_url: e.target.value })}
                placeholder="https://instagram.com/kalpaniktales"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="youtube_url">YouTube URL</Label>
              <Input
                id="youtube_url"
                value={form.youtube_url}
                onChange={(e) => setForm({ ...form, youtube_url: e.target.value })}
                placeholder="https://youtube.com/@kalpaniktales"
              />
            </div>
          </CardContent>
        </Card>

        {/* Analytics & Verification */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-[var(--gold)]" />
              <CardTitle>Analytics & Verification</CardTitle>
            </div>
            <CardDescription>
              Configure analytics and search engine verification
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="google_analytics_id">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={form.google_analytics_id}
                onChange={(e) => setForm({ ...form, google_analytics_id: e.target.value })}
                placeholder="G-XXXXXXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_tag_manager_id">Google Tag Manager ID</Label>
              <Input
                id="google_tag_manager_id"
                value={form.google_tag_manager_id}
                onChange={(e) => setForm({ ...form, google_tag_manager_id: e.target.value })}
                placeholder="GTM-XXXXXX"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="google_search_console_verification">Google Search Console Verification</Label>
              <Textarea
                id="google_search_console_verification"
                value={form.google_search_console_verification}
                onChange={(e) => setForm({ ...form, google_search_console_verification: e.target.value })}
                placeholder="Meta tag content for verification"
                rows={2}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bing_webmaster_verification">Bing Webmaster Verification</Label>
              <Textarea
                id="bing_webmaster_verification"
                value={form.bing_webmaster_verification}
                onChange={(e) => setForm({ ...form, bing_webmaster_verification: e.target.value })}
                placeholder="Meta tag content for verification"
                rows={2}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button onClick={() => update.mutate()} disabled={update.isPending}>
          <Save className="mr-2 h-4 w-4" />
          {update.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </div>
    </div>
  );
}
