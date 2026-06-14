import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useEffect } from "react";

interface Props {
  content: unknown;
  imageUrl?: string | null;
  fontSize?: number;
}

/** Read-only TipTap renderer. Falls back to image-only mode if no content. */
export function PageRenderer({ content, imageUrl, fontSize = 18 }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({
        HTMLAttributes: { class: "rounded-lg shadow-md my-4 mx-auto max-w-full h-auto" },
      }),
    ],
    editable: false,
    content: content ?? { type: "doc", content: [{ type: "paragraph" }] },
    editorProps: {
      attributes: {
        class: "prose prose-lg prose-neutral dark:prose-invert max-w-none focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content as never);
    }
  }, [content, editor]);

  if (imageUrl && !content) {
    return (
      <div className="flex justify-center">
        <img src={imageUrl} alt="Page" className="max-w-full rounded-lg shadow-md" />
      </div>
    );
  }

  return (
    <div style={{ fontSize: `${fontSize}px`, lineHeight: 1.7 }}>
      {imageUrl && (
        <div className="mb-6 flex justify-center">
          <img src={imageUrl} alt="" className="max-w-full rounded-lg shadow-md" />
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
