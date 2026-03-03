"use client";

import React from 'react';
import { File, MoreVertical, Trash2, Plus, FileText, ChevronRight } from 'lucide-react';
import { TeamMemberFile } from '@/context/DataContext';

interface FileTreeSidebarProps {
    files: TeamMemberFile[];
    selectedFileId: string | null;
    onFileSelect: (file: TeamMemberFile) => void;
    onAddFile: () => void;
    onDeleteFile: (fileId: string) => void;
}

export default function FileTreeSidebar({
    files,
    selectedFileId,
    onFileSelect,
    onAddFile,
    onDeleteFile
}: FileTreeSidebarProps) {
    return (
        <div className="flex flex-col h-full bg-black/20 rounded-[2rem] border border-white/5 overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <FileText size={16} className="text-brand-gold" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Explorer</span>
                </div>
                <button
                    onClick={onAddFile}
                    className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/5"
                >
                    <Plus size={16} />
                </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                {files.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-20 px-6">
                        <File size={32} className="mb-4" />
                        <p className="text-[8px] font-black uppercase tracking-widest leading-relaxed">No custom files.<br />Upload markdown now.</p>
                    </div>
                ) : (
                    files.map((file) => (
                        <div
                            key={file.id}
                            onClick={() => onFileSelect(file)}
                            className={`group relative flex items-center gap-3 p-3 rounded-xl transition-all cursor-pointer border ${selectedFileId === file.id
                                    ? 'bg-brand-gold/10 border-brand-gold/20'
                                    : 'hover:bg-white/5 border-transparent'
                                }`}
                        >
                            <div className={`h-8 w-8 rounded-lg flex items-center justify-center ${selectedFileId === file.id ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-white/20'
                                }`}>
                                <File size={14} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={`text-[10px] font-black uppercase tracking-widest truncate ${selectedFileId === file.id ? 'text-white' : 'text-white/40 group-hover:text-white/60'
                                    }`}>
                                    {file.name}
                                </h4>
                                <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest mt-0.5">
                                    Markdown document
                                </p>
                            </div>

                            <button
                                onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id); }}
                                className="opacity-0 group-hover:opacity-100 h-8 w-8 rounded-lg bg-red-500/10 text-red-500 border border-red-500/10 flex items-center justify-center transition-all hover:bg-red-500/20"
                            >
                                <Trash2 size={12} />
                            </button>
                        </div>
                    ))
                )}
            </div>

            <div className="p-4 bg-black/40 border-t border-white/5">
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/10">
                    <div className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
                    Storage System Ready
                </div>
            </div>
        </div>
    );
}
