import { supabase } from "@/integrations/supabase/client";

const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("Could not read image file"));
    r.readAsDataURL(file);
  });
}

function normalizeFolder(folder: string) {
  const cleaned = folder.replace(/^\/+|\/+$/g, "") || "misc";
  return /^[a-zA-Z0-9/_-]+$/.test(cleaned) && !cleaned.includes("..") ? cleaned : "misc";
}

function shouldUseFallback(error: unknown) {
  const m = error instanceof Error ? error.message : String(error ?? "");
  return /bucket not found|not found|row-level security|permission|unauthorized/i.test(m);
}

export async function uploadImageFile(file: File, folder = "misc"): Promise<string> {
  if (!ALLOWED.includes(file.type)) throw new Error("Please select a JPG, PNG, WebP, or GIF image");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");
  try {
    const path = `${normalizeFolder(folder)}/${crypto.randomUUID()}.${EXT[file.type]}`;
    const { error } = await supabase.storage.from("book-images").upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false,
    });
    if (error) throw error;
    const { data } = supabase.storage.from("book-images").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    if (shouldUseFallback(e)) return await fileToDataUrl(file);
    throw e;
  }
}
