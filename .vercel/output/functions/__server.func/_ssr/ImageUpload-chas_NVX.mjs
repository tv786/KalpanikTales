import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-BC9oXVxV.mjs";
import { I as Input } from "./input-C0QjszdI.mjs";
import { s as supabase } from "./client-Ek2-qFbi.mjs";
import { t as toast } from "../_libs/sonner.mjs";
import { v as LoaderCircle, w as Upload, X } from "../_libs/lucide-react.mjs";
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const MIME_EXTENSIONS = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Could not read image file"));
    reader.readAsDataURL(file);
  });
}
function normalizeFolder(folder) {
  const cleaned = folder.replace(/^\/+|\/+$/g, "") || "misc";
  return /^[a-zA-Z0-9/_-]+$/.test(cleaned) && !cleaned.includes("..") ? cleaned : "misc";
}
function shouldUseFallback(error) {
  const message = error instanceof Error ? error.message : String(error ?? "");
  return /bucket not found|not found|row-level security|permission|unauthorized/i.test(message);
}
function ImageUpload({ value, onChange, folder = "misc", label = "Image" }) {
  const inputRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  async function handleFile(file) {
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
        upsert: false
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder: "https://... or upload"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          type: "button",
          variant: "outline",
          onClick: () => inputRef.current?.click(),
          disabled: uploading,
          children: [
            uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 hidden sm:inline", children: "Upload" })
          ]
        }
      ),
      value && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => onChange(""), "aria-label": "Clear", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: inputRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }
      }
    ),
    value && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: value,
        alt: label,
        className: "max-h-64 rounded-md border border-border object-contain"
      }
    )
  ] });
}
export {
  ImageUpload as I
};
