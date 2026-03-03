"use client";

import React from 'react';
import { FileText, AlertCircle, CheckCircle2, Plus } from 'lucide-react';
import { TeamMemberFile } from '@/context/DataContext';

interface PlanArtifactMapperProps {
    files: TeamMemberFile[];
    onFileClick: (file: TeamMemberFile | string, type: string) => void;
    onUpload?: (file: File, type: string) => void;
}

const CORE_FILES = [
    { name: 'AGENTS.md', type: 'AGENTS', description: 'Bootstrap persona and identity' },
    { name: 'SOUL.md', type: 'SOUL', description: 'Core values and personality' },
    { name: 'ROLE.md', type: 'ROLE', description: 'Responsibilities and goals' },
    { name: 'TOOLS.md', type: 'TOOLS', description: 'Tool guidance and capabilities' },
];

export default function PlanArtifactMapper({ files, onFileClick, onUpload }: PlanArtifactMapperProps) {
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [uploadingType, setUploadingType] = React.useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && uploadingType && onUpload) {
            onUpload(file, uploadingType);
            setUploadingType(null);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const triggerUpload = (e: React.MouseEvent, type: string) => {
        e.stopPropagation();
        setUploadingType(type);
        fileInputRef.current?.click();
    };

    return (
        <div className="space-y-6">
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="absolute inset-0 w-0 h-0 opacity-0 pointer-events-none"
                accept=".md,text/markdown"
            />
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-black text-white uppercase tracking-tight">Core <span className="text-brand-gold">Files</span></h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Bootstrap persona, identity, and tool guidance.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {CORE_FILES.map((core) => {
                    const existingFile = files.find(f => f.type === core.type || f.name === core.name);
                    const isMissing = !existingFile;

                    return (
                        <div
                            key={core.type}
                            onClick={() => onFileClick(existingFile || core.name, core.type)}
                            className={`group p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${isMissing
                                ? 'bg-white/5 border-white/5 hover:border-white/10'
                                : 'bg-brand-gold/5 border-brand-gold/20 hover:border-brand-gold/40'
                                }`}
                        >
                            <div className="flex items-center gap-4">
                                <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${isMissing ? 'bg-white/5 text-white/20' : 'bg-brand-gold/20 text-brand-gold'
                                    }`}>
                                    <FileText size={18} />
                                </div>
                                <div>
                                    <h4 className={`text-xs font-black uppercase tracking-widest ${isMissing ? 'text-white/40' : 'text-white'
                                        }`}>{core.name}</h4>
                                    <p className="text-[9px] font-bold text-white/20 uppercase tracking-widest mt-0.5">{isMissing ? 'Missing' : 'Loaded'}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={(e) => triggerUpload(e, core.type)}
                                    className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all border ${isMissing
                                        ? 'bg-white/5 text-white/40 border-white/5 hover:bg-white/10 hover:text-white'
                                        : 'bg-brand-gold/10 text-brand-gold border-brand-gold/10 hover:bg-brand-gold/20'
                                        }`}
                                    title="Upload File"
                                >
                                    <Plus size={14} />
                                </button>
                                <div className={`px-3 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest border ${isMissing
                                    ? 'bg-red-500/10 text-red-500 border-red-500/20'
                                    : 'bg-green-500/10 text-green-500 border-green-500/20'
                                    }`}>
                                    {isMissing ? 'Missing' : 'Active'}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
