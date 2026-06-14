import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const BUCKET = "book-images";
const MAX_BYTES = 5 * 1024 * 1024;
const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
};

type UploadInput = {
  fileName: string;
  contentType: string;
  base64: string;
  folder?: string;
};

function validateUploadInput(input: unknown): UploadInput {
  if (!input || typeof input !== "object") throw new Error("Invalid upload payload");
  const data = input as Partial<UploadInput>;
  if (typeof data.fileName !== "string" || data.fileName.length > 255) throw new Error("Invalid file name");
  if (typeof data.contentType !== "string" || !(data.contentType in MIME_EXTENSIONS)) {
    throw new Error("Please upload a JPG, PNG, WebP, or GIF image");
  }
  if (typeof data.base64 !== "string" || data.base64.length < 1 || data.base64.length > 7_000_000) {
    throw new Error("Invalid image data");
  }
  if (data.folder !== undefined && (typeof data.folder !== "string" || data.folder.length > 120)) {
    throw new Error("Invalid upload folder");
  }
  return {
    fileName: data.fileName,
    contentType: data.contentType,
    base64: data.base64,
    folder: data.folder,
  };
}

function normalizeFolder(folder?: string) {
  const cleaned = (folder ?? "misc").replace(/^\/+|\/+$/g, "") || "misc";
  if (!/^[a-zA-Z0-9/_-]+$/.test(cleaned) || cleaned.includes("..")) {
    throw new Error("Invalid upload folder");
  }
  return cleaned;
}

export const uploadBookImage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(validateUploadInput)
  .handler(async ({ data, context }) => {
    const { data: role, error: roleError } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleError || !role) throw new Error("Only admins can upload images");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const bytes = Buffer.from(data.base64, "base64");
    if (bytes.byteLength > MAX_BYTES) throw new Error("Image must be under 5MB");

    const existingBucket = await supabaseAdmin.storage.getBucket(BUCKET);
    if (existingBucket.error) {
      const status = (existingBucket.error as { statusCode?: string | number }).statusCode;
      const message = existingBucket.error.message.toLowerCase();
      if (status === 404 || status === "404" || message.includes("not found")) {
        const { error: createError } = await supabaseAdmin.storage.createBucket(BUCKET, { public: true });
        if (createError && !createError.message.toLowerCase().includes("already exists")) {
          throw new Error(`Could not create image bucket: ${createError.message}`);
        }
      } else {
        throw existingBucket.error;
      }
    } else if (!existingBucket.data.public) {
      const { error: updateError } = await supabaseAdmin.storage.updateBucket(BUCKET, { public: true });
      if (updateError) throw new Error(`Could not make image bucket public: ${updateError.message}`);
    }

    const ext = MIME_EXTENSIONS[data.contentType];
    const path = `${normalizeFolder(data.folder)}/${crypto.randomUUID()}.${ext}`;
    const blob = new Blob([bytes], { type: data.contentType });
    const { error: uploadError } = await supabaseAdmin.storage.from(BUCKET).upload(path, blob, {
      cacheControl: "3600",
      contentType: data.contentType,
      upsert: false,
    });
    if (uploadError) throw uploadError;

    const { data: publicData } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(path);
    return { publicUrl: publicData.publicUrl };
  });