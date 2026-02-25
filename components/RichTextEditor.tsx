"use client";

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading1,
    Heading2,
    Undo,
    Redo,
    Code
} from 'lucide-react';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;

    return (
        <div className="flex flex-wrap gap-1 p-2 border-b border-white/10 bg-white/5 rounded-t-2xl">
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('bold') ? 'bg-white text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <Bold size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('italic') ? 'bg-white text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <Italic size={18} />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-1 self-center" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 1 }) ? 'bg-white text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <Heading1 size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('heading', { level: 2 }) ? 'bg-brand-gold text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <Heading2 size={18} />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-1 self-center" />
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('bulletList') ? 'bg-brand-gold text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <List size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={`p-2 rounded-lg transition-all ${editor.isActive('orderedList') ? 'bg-brand-gold text-brand-dark' : 'text-foreground/40 hover:bg-white/5'}`}
            >
                <ListOrdered size={18} />
            </button>
            <div className="w-[1px] h-6 bg-white/10 mx-1 self-center" />
            <button
                type="button"
                onClick={() => editor.chain().focus().undo().run()}
                className="p-2 rounded-lg text-foreground/40 hover:bg-white/5 transition-all"
            >
                <Undo size={18} />
            </button>
            <button
                type="button"
                onClick={() => editor.chain().focus().redo().run()}
                className="p-2 rounded-lg text-foreground/40 hover:bg-white/5 transition-all"
            >
                <Redo size={18} />
            </button>
        </div>
    );
};

export default function RichTextEditor({ content, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        content: content,
        immediatelyRender: false,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML());
        },
        editorProps: {
            attributes: {
                class: 'prose prose-invert max-w-none min-h-[150px] p-4 outline-none',
            },
        },
    });

    return (
        <div className="w-full rounded-2xl border border-white/5 bg-brand-dark overflow-hidden focus-within:border-white/50 transition-all">
            <MenuBar editor={editor} />
            <EditorContent editor={editor} />
        </div>
    );
}
