import { r as reactExports, j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "./_libs/tanstack__react-query.mjs";
import { s as supabase } from "./_ssr/client-Ek2-qFbi.mjs";
import { B as Button } from "./_ssr/button-BC9oXVxV.mjs";
import { u as useEditor, E as EditorContent } from "./_libs/tiptap__react.mjs";
import { i as index_default } from "./_libs/tiptap__starter-kit.mjs";
import { i as index_default$1 } from "./_libs/tiptap__extension-image.mjs";
import { t as toast } from "./_libs/sonner.mjs";
import { k as Route } from "./_ssr/router-C8UMfQVr.mjs";
import { x as ArrowLeft, P as Plus, G as Trash2, O as Save, I as LoaderCircle, Q as ImagePlus, V as Bold, W as Italic, Y as Heading2, Z as List, _ as ListOrdered, $ as Quote, a0 as Undo, a1 as Redo } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/supabase__supabase-js.mjs";
import "./_libs/supabase__postgrest-js.mjs";
import "./_libs/supabase__realtime-js.mjs";
import "./_libs/supabase__phoenix.mjs";
import "./_libs/supabase__storage-js.mjs";
import "./_libs/iceberg-js.mjs";
import "./_libs/supabase__auth-js.mjs";
import "./_libs/tslib.mjs";
import "./_libs/supabase__functions-js.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/use-sync-external-store.mjs";
import "./_libs/tiptap__core.mjs";
import "./_libs/prosemirror-transform.mjs";
import "./_libs/prosemirror-model.mjs";
import "./_libs/orderedmap.mjs";
import "./_libs/prosemirror-commands.mjs";
import "./_libs/prosemirror-state.mjs";
import "./_libs/prosemirror-schema-list.mjs";
import "./_libs/prosemirror-view.mjs";
import "./_libs/prosemirror-keymap.mjs";
import "./_libs/w3c-keyname.mjs";
import "./_libs/fast-equals.mjs";
import "./_libs/tiptap__extension-blockquote.mjs";
import "./_libs/tiptap__extension-bold.mjs";
import "./_libs/tiptap__extension-code.mjs";
import "./_libs/tiptap__extension-code-block.mjs";
import "./_libs/tiptap__extension-document.mjs";
import "./_libs/tiptap__extension-hard-break.mjs";
import "./_libs/tiptap__extension-heading.mjs";
import "./_libs/@tiptap/extension-horizontal-rule+[...].mjs";
import "./_libs/tiptap__extension-italic.mjs";
import "./_libs/tiptap__extension-link.mjs";
import "./_libs/linkifyjs.mjs";
import "./_libs/tiptap__extension-list.mjs";
import "./_libs/tiptap__extension-paragraph.mjs";
import "./_libs/tiptap__extension-strike.mjs";
import "./_libs/tiptap__extension-text.mjs";
import "./_libs/tiptap__extension-underline.mjs";
import "./_libs/tiptap__extensions.mjs";
import "./_libs/prosemirror-dropcursor.mjs";
import "./_libs/prosemirror-gapcursor.mjs";
import "./_libs/prosemirror-history.mjs";
import "./_libs/rope-sequence.mjs";
import "./_libs/tanstack__zod-adapter.mjs";
import "./_libs/zod.mjs";
const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
const EXT = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif"
};
function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = () => reject(new Error("Could not read image file"));
    r.readAsDataURL(file);
  });
}
function normalizeFolder(folder) {
  const cleaned = folder.replace(/^\/+|\/+$/g, "") || "misc";
  return /^[a-zA-Z0-9/_-]+$/.test(cleaned) && !cleaned.includes("..") ? cleaned : "misc";
}
function shouldUseFallback(error) {
  const m = error instanceof Error ? error.message : String(error ?? "");
  return /bucket not found|not found|row-level security|permission|unauthorized/i.test(m);
}
async function uploadImageFile(file, folder = "misc") {
  if (!ALLOWED.includes(file.type)) throw new Error("Please select a JPG, PNG, WebP, or GIF image");
  if (file.size > 5 * 1024 * 1024) throw new Error("Image must be under 5MB");
  try {
    const path = `${normalizeFolder(folder)}/${crypto.randomUUID()}.${EXT[file.type]}`;
    const { error } = await supabase.storage.from("book-images").upload(path, file, {
      cacheControl: "3600",
      contentType: file.type,
      upsert: false
    });
    if (error) throw error;
    const { data } = supabase.storage.from("book-images").getPublicUrl(path);
    return data.publicUrl;
  } catch (e) {
    if (shouldUseFallback(e)) return await fileToDataUrl(file);
    throw e;
  }
}
function Toolbar({
  editor,
  onPickImage,
  uploading
}) {
  if (!editor) return null;
  const btn = (active, onClick, icon, label) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      type: "button",
      size: "sm",
      variant: active ? "default" : "ghost",
      onClick,
      "aria-label": label,
      className: "h-8 w-8 p-0",
      children: icon
    }
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1 border-b border-border bg-muted/40 p-2", children: [
    btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, { className: "h-4 w-4" }), "Bold"),
    btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, { className: "h-4 w-4" }), "Italic"),
    btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Heading2, { className: "h-4 w-4" }), "Heading"),
    btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(List, { className: "h-4 w-4" }), "Bullet list"),
    btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(ListOrdered, { className: "h-4 w-4" }), "Numbered list"),
    btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Quote, { className: "h-4 w-4" }), "Quote"),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 w-px bg-border" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        type: "button",
        size: "sm",
        variant: "ghost",
        onClick: onPickImage,
        disabled: uploading,
        "aria-label": "Insert image",
        className: "h-8 w-8 p-0",
        children: uploading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ImagePlus, { className: "h-4 w-4" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-1 w-px bg-border" }),
    btn(false, () => editor.chain().focus().undo().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, { className: "h-4 w-4" }), "Undo"),
    btn(false, () => editor.chain().focus().redo().run(), /* @__PURE__ */ jsxRuntimeExports.jsx(Redo, { className: "h-4 w-4" }), "Redo")
  ] });
}
function TipTapEditor({ value, onChange, placeholder, imageFolder = "pages" }) {
  const fileRef = reactExports.useRef(null);
  const [uploading, setUploading] = reactExports.useState(false);
  const editor = useEditor({
    extensions: [
      index_default,
      index_default$1.configure({
        HTMLAttributes: { class: "rounded-md border border-border my-3 max-w-full h-auto" }
      })
    ],
    content: value ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class: "prose prose-neutral dark:prose-invert max-w-none min-h-[320px] p-4 focus:outline-none",
        "data-placeholder": placeholder ?? "Start writing..."
      },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (files.length === 0) return false;
        event.preventDefault();
        files.forEach((f) => void insertImage(f));
        return true;
      },
      handleDrop: (view, event) => {
        const files = Array.from(event.dataTransfer?.files ?? []).filter(
          (f) => f.type.startsWith("image/")
        );
        if (files.length === 0) return false;
        event.preventDefault();
        files.forEach((f) => void insertImage(f));
        return true;
      }
    },
    onUpdate: ({ editor: editor2 }) => onChange(editor2.getJSON()),
    immediatelyRender: false
  });
  async function insertImage(file) {
    if (!editor) return;
    setUploading(true);
    try {
      const url = await uploadImageFile(file, imageFolder);
      editor.chain().focus().setImage({ src: url }).run();
      toast.success("Image inserted");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  }
  reactExports.useEffect(() => {
    if (!editor) return;
    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(value ?? { type: "doc", content: [{ type: "paragraph" }] });
    if (current !== next) {
      editor.commands.setContent(value ?? { type: "doc", content: [{ type: "paragraph" }] });
    }
  }, [value, editor]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-md border border-border bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { editor, onPickImage: () => fileRef.current?.click(), uploading }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "input",
      {
        ref: fileRef,
        type: "file",
        accept: "image/*",
        className: "hidden",
        onChange: (e) => {
          const f = e.target.files?.[0];
          if (f) void insertImage(f);
        }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EditorContent, { editor })
  ] });
}
function AdminChapter() {
  const {
    bookId,
    chapterId
  } = Route.useParams();
  const qc = useQueryClient();
  const {
    data: chapter
  } = useQuery({
    queryKey: ["admin", "chapter", chapterId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("chapters").select("*").eq("id", chapterId).single();
      if (error) throw error;
      return data;
    }
  });
  const {
    data: pages = []
  } = useQuery({
    queryKey: ["admin", "pages", chapterId],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("pages").select("id, page_number, content, image_url").eq("chapter_id", chapterId).order("page_number", {
        ascending: true
      });
      if (error) throw error;
      return data ?? [];
    }
  });
  const [selectedId, setSelectedId] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (!selectedId && pages.length > 0) setSelectedId(pages[0].id);
  }, [pages, selectedId]);
  const selected = pages.find((p) => p.id === selectedId) ?? null;
  const [draftContent, setDraftContent] = reactExports.useState(null);
  reactExports.useEffect(() => {
    setDraftContent(selected?.content ?? {
      type: "doc",
      content: [{
        type: "paragraph"
      }]
    });
  }, [selectedId, selected?.content]);
  const createPage = useMutation({
    mutationFn: async () => {
      const nextNumber = (pages[pages.length - 1]?.page_number ?? 0) + 1;
      const {
        data,
        error
      } = await supabase.from("pages").insert({
        chapter_id: chapterId,
        page_number: nextNumber,
        content: {
          type: "doc",
          content: [{
            type: "paragraph"
          }]
        }
      }).select().single();
      if (error) throw error;
      return data;
    },
    onSuccess: (d) => {
      qc.invalidateQueries({
        queryKey: ["admin", "pages", chapterId]
      });
      setSelectedId(d.id);
      toast.success("Page added");
    },
    onError: (e) => toast.error(e.message)
  });
  const savePage = useMutation({
    mutationFn: async () => {
      if (!selectedId) return;
      const {
        error
      } = await supabase.from("pages").update({
        content: draftContent
      }).eq("id", selectedId);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page saved");
      qc.invalidateQueries({
        queryKey: ["admin", "pages", chapterId]
      });
    },
    onError: (e) => toast.error(e.message)
  });
  const deletePage = useMutation({
    mutationFn: async (id) => {
      const {
        error
      } = await supabase.from("pages").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Page deleted");
      setSelectedId(null);
      qc.invalidateQueries({
        queryKey: ["admin", "pages", chapterId]
      });
    }
  });
  if (!chapter) return /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Loading..." });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "ghost", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/admin/$bookId", params: {
      bookId
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "mr-1 h-4 w-4" }),
      " Back to chapters"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "text-xl font-semibold", children: [
        "Chapter ",
        Number(chapter.chapter_number),
        " — ",
        chapter.title
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
        pages.length,
        " page(s)"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 lg:grid-cols-[240px_1fr]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => createPage.mutate(), disabled: createPage.isPending, className: "w-full", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "mr-2 h-4 w-4" }),
          " New page"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "divide-y divide-border overflow-hidden rounded-md border border-border", children: [
          pages.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedId(p.id), className: `flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors ${selectedId === p.id ? "bg-muted font-medium" : "hover:bg-muted/50"}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              "Page ",
              p.page_number
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-muted-foreground hover:text-destructive", onClick: (e) => {
              e.stopPropagation();
              if (confirm("Delete this page?")) deletePage.mutate(p.id);
            } })
          ] }, p.id)),
          pages.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 py-4 text-center text-xs text-muted-foreground", children: "No pages yet" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "space-y-4", children: selected ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TipTapEditor, { value: draftContent, onChange: setDraftContent, imageFolder: `pages/${chapterId}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { onClick: () => savePage.mutate(), disabled: savePage.isPending, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "mr-2 h-4 w-4" }),
          savePage.isPending ? "Saving..." : "Save page"
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Select or create a page to start editing." }) })
    ] })
  ] });
}
export {
  AdminChapter as component
};
