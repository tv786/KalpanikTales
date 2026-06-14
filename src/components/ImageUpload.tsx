import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Loader2, X } from "lucide-react";
import { toast } from "sonner";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
  label?: string;
}

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });
}

function normalizeFolder(folder: string) {
  const cleaned = folder.replace(/^\/+|\/+$/g, "") || "misc";
  return /^[a-zA-Z0-9/_-]+$/.test(cleaned) && !cleaned.includes("..") ? cleaned : "misc";
}

function shouldUseFallback(error: unknown) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /bucket not found|not found|row-level security|permission|unauthorized/i.test(message);
}

export function ImageUpload({ value, onChange, folder = "misc", label = "Image" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  async function handleFile(file: File) {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      toast.error("Please select a JPG, PNG, WebP, or GIF image");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    setUploading(true);
    try {
      const ext = MIME_EXTENSIONS[file.type];
      const path = `${normalizeFolder(folder)}/${crypto.randomUUID()}.${ext}`;
      const { error } = await supabase.storage.from("book-images").upload(path, file, {
        cacheControl: "3600",
        contentType: file.type,
        upsert: false,
      });
      if (error) throw error;

      const { data } = supabase.storage.from("book-images").getPublicUrl(path);
      onChange(data.publicUrl);
      toast.success("Image uploaded");
    } catch (e) {
      if (!shouldUseFallback(e)) {
        toast.error(e instanceof Error ? e.message : "Upload failed");
        return;
      }
      try {
        const dataUrl = await fileToDataUrl(file);
        onChange(dataUrl);
        toast.success("Image attached");
      } catch (fallbackError) {
        toast.error(fallbackError instanceof Error ? fallbackError.message : "Upload failed");
      }
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://... or upload"
        />
        <Button
          type="button"
          variant="outline"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="ml-2 hidden sm:inline">Upload</span>
        </Button>
        {value && (
          <Button type="button" variant="ghost" size="icon" onClick={() => onChange("")} aria-label="Clear">
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
      />
      {value && (
        <img
          src={value}
          alt={label}
          className="max-h-64 rounded-md border border-border object-contain"
        />
      )}
    </div>
  );
}
