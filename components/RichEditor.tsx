"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function RichEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (value: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={{
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: "10px",
      overflow: "hidden",
      background: "#0f172a"
    }}>

      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "8px",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          background: "#020617"
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={btn}
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          style={btn}
        >
          H1
        </button>

        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          style={btn}
        >
          H2
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={btn}
        >
          Bullet
        </button>
      </div>

      {/* Editor Area */}
      <div
        style={{
          padding: "16px",
          minHeight: "220px",
          color: "#e5e7eb",
          lineHeight: "1.7"
        }}
      >
        <EditorContent editor={editor} />
      </div>

    </div>
  );
}

const btn = {
  padding: "4px 10px",
  fontSize: "13px",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "6px",
  background: "transparent",
  color: "#e5e7eb",
  cursor: "pointer"
};