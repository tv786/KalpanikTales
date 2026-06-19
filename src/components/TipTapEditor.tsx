import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import { Bold, Italic, List, ListOrdered, Heading2, Quote, Undo, Redo, ImagePlus, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { uploadImageFile } from "@/lib/upload-image";
import { toast } from "sonner";

interface Props {
  value: unknown;
  onChange: (json: unknown) => void;
  placeholder?: string;
  imageFolder?: string;
}

function Toolbar({
  editor,
  onPickImage,
  uploading,
}: {
  editor: Editor | null;
  onPickImage: () => void;
  uploading: boolean;
}) {
  if (!editor) return null;
  const btn = (active: boolean, onClick: () => void, icon: React.ReactNode, label: string) => (
    <Button
      type="button"
      size="sm"
      variant={active ? "default" : "ghost"}
      onClick={onClick}
      aria-label={label}
      className="h-8 w-8 p-0"
    >
      {icon}
    </Button>
  );
  return (
    <div className="flex flex-wrap gap-1 border-b border-border bg-muted/40 p-2">
      {btn(editor.isActive("bold"), () => editor.chain().focus().toggleBold().run(), <Bold className="h-4 w-4" />, "Bold")}
      {btn(editor.isActive("italic"), () => editor.chain().focus().toggleItalic().run(), <Italic className="h-4 w-4" />, "Italic")}
      {btn(editor.isActive("heading", { level: 2 }), () => editor.chain().focus().toggleHeading({ level: 2 }).run(), <Heading2 className="h-4 w-4" />, "Heading")}
      {btn(editor.isActive("bulletList"), () => editor.chain().focus().toggleBulletList().run(), <List className="h-4 w-4" />, "Bullet list")}
      {btn(editor.isActive("orderedList"), () => editor.chain().focus().toggleOrderedList().run(), <ListOrdered className="h-4 w-4" />, "Numbered list")}
      {btn(editor.isActive("blockquote"), () => editor.chain().focus().toggleBlockquote().run(), <Quote className="h-4 w-4" />, "Quote")}
      <div className="mx-1 w-px bg-border" />
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={onPickImage}
        disabled={uploading}
        aria-label="Insert image"
        className="h-8 w-8 p-0"
      >
        {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
      </Button>
      <div className="mx-1 w-px bg-border" />
      {btn(false, () => editor.chain().focus().undo().run(), <Undo className="h-4 w-4" />, "Undo")}
      {btn(false, () => editor.chain().focus().redo().run(), <Redo className="h-4 w-4" />, "Redo")}
    </div>
  );
}

export function TipTapEditor({ value, onChange, placeholder, imageFolder = "pages" }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: { class: "rounded-md border border-border my-3 max-w-full h-auto" },
      }),
    ],
    content: value ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class:
          "prose prose-neutral dark:prose-invert max-w-none min-h-[320px] p-4 focus:outline-none",
        "data-placeholder": placeholder ?? "Start writing...",
      },
      handlePaste: (view, event) => {
        const files = Array.from(event.clipboardData?.files ?? []).filter((f) => f.type.startsWith("image/"));
        if (files.length > 0) {
          event.preventDefault();
          files.forEach((f) => void insertImage(f));
          return true;
        }
        // Let TipTap handle HTML/text pasting by default
        return false;
      },
      handleDrop: (view, event) => {
        const files = Array.from((event as DragEvent).dataTransfer?.files ?? []).filter((f) =>
          f.type.startsWith("image/"),
        );
        if (files.length > 0) {
          event.preventDefault();
          files.forEach((f) => void insertImage(f));
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON()),
    immediatelyRender: false,
  });

  async function insertImage(file: File) {
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

  useEffect(() => {
    if (!editor) return;
    const current = JSON.stringify(editor.getJSON());
    const next = JSON.stringify(value ?? { type: "doc", content: [{ type: "paragraph" }] });
    if (current !== next) {
      editor.commands.setContent((value as never) ?? { type: "doc", content: [{ type: "paragraph" }] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  return (
    <div className="rounded-md border border-border bg-background">
      <Toolbar editor={editor} onPickImage={() => fileRef.current?.click()} uploading={uploading} />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) void insertImage(f);
        }}
      />
      <EditorContent editor={editor} />
    </div>
  );
}
