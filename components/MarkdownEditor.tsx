"use client";

import React from 'react';
import { Save, X, FileText, Maximize2 } from 'lucide-react';

interface MarkdownEditorProps {
    fileName: string;
    content: string;
    onChange: (content: string) => void;
    onSave: () => void;
    onClose: () => void;
    isSaving?: boolean;
}

export default function MarkdownEditor({
    fileName,
    content,
    onChange,
    onSave,
    onClose,
    isSaving = false
}: MarkdownEditorProps) {
    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-[2rem] border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-brand-gold/10 flex items-center justify-center text-brand-gold border border-brand-gold/20">
                        <FileText size={18} />
                    </div>
                    <div>
                        <h3 className="text-xs font-black text-white uppercase tracking-tight">{fileName}</h3>
                        <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-1">Live Markdown Editor</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={onClose}
                        className="h-10 px-4 rounded-xl border border-white/5 bg-white/5 text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/10 transition-all"
                    >
                        Discard
                    </button>
                    <button
                        onClick={onSave}
                        disabled={isSaving}
                        className="h-10 px-6 rounded-xl bg-brand-gold text-brand-dark text-[9px] font-black uppercase tracking-widest shadow-lg shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                    >
                        {isSaving ? (
                            <div className="h-3 w-3 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                        ) : (
                            <Save size={14} />
                        )}
                        {isSaving ? 'Synchronizing...' : 'Save File'}
                    </button>
                </div>
            </div>

            <div className="flex-1 relative group">
                <textarea
                    value={content}
                    onChange={(e) => onChange(e.target.value)}
                    className="absolute inset-0 w-full h-full p-10 bg-transparent text-white/80 font-mono text-sm leading-relaxed outline-none resize-none custom-scrollbar selection:bg-brand-gold/20"
                    placeholder="Write your markdown here..."
                    spellCheck={false}
                />
            </div>

            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                        <span className="text-brand-gold">{content.length}</span> Characters
                    </div>
                    <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/20">
                        <span className="text-brand-gold">{content.split(/\s+/).filter(Boolean).length}</span> Words
                    </div>
                </div>
                <div className="text-[8px] font-black uppercase tracking-[0.2em] text-white/10 italic">
                    UTF-8 Encoded Markdown
                </div>
            </div>
        </div>
    );
}
