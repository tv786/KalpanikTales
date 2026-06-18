import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Globe, Image as ImageIcon } from "lucide-react";

interface SEOSnippetPreviewProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  onTitleChange?: (title: string) => void;
  onDescriptionChange?: (description: string) => void;
  onUrlChange?: (url: string) => void;
  onImageChange?: (image: string) => void;
}

export function SEOSnippetPreview({
  title = "",
  description = "",
  url = "",
  image = "",
  onTitleChange,
  onDescriptionChange,
  onUrlChange,
  onImageChange,
}: SEOSnippetPreviewProps) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>SEO Preview</CardTitle>
          <CardDescription>
            Preview how your page will appear in search engine results
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="preview-title">Title</Label>
            <Input
              id="preview-title"
              value={title}
              onChange={(e) => onTitleChange?.(e.target.value)}
              placeholder="Your page title"
              maxLength={60}
            />
            <p className="text-xs text-muted-foreground">
              {title.length}/60 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preview-description">Description</Label>
            <Textarea
              id="preview-description"
              value={description}
              onChange={(e) => onDescriptionChange?.(e.target.value)}
              placeholder="Your page description"
              rows={3}
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground">
              {description.length}/160 characters
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="preview-url">URL</Label>
            <Input
              id="preview-url"
              value={url}
              onChange={(e) => onUrlChange?.(e.target.value)}
              placeholder="https://kalpaniktales.com/your-page"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="preview-image">Image URL</Label>
            <Input
              id="preview-image"
              value={image}
              onChange={(e) => onImageChange?.(e.target.value)}
              placeholder="https://kalpaniktales.com/og-image.png"
            />
          </div>
        </CardContent>
      </Card>

      {/* Google Search Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Google Search Result</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className="text-sm text-[var(--crimson)]">
              {url || "https://kalpaniktales.com/your-page"}
            </p>
            <h3 className="text-xl text-[var(--gold)] hover:underline cursor-pointer">
              {title || "Your Page Title"}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {description || "Your page description will appear here. Make it compelling to attract clicks."}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Twitter Card Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Twitter Card</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-1">
                {url || "https://kalpaniktales.com/your-page"}
              </p>
              <p className="text-sm font-medium line-clamp-2">
                {title || "Your Page Title"}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {description || "Your page description will appear here."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Open Graph Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Facebook / Open Graph</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border border-border rounded-lg overflow-hidden max-w-md">
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-muted flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-muted-foreground" />
              </div>
            )}
            <div className="p-3 bg-muted/50">
              <p className="text-xs text-muted-foreground mb-1 uppercase">
                {url ? new URL(url).hostname : "kalpaniktales.com"}
              </p>
              <p className="text-sm font-medium line-clamp-2">
                {title || "Your Page Title"}
              </p>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">
                {description || "Your page description will appear here."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
