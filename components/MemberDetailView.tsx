"use client";

import { useRef } from "react";
import { TeamMember, Firm, TeamMemberFile } from "@/context/DataContext";
import {
    Users, Building2, Mail, ExternalLink, Save, Check, Plus, X,
    Linkedin, Phone, Info, Camera, Globe, DollarSign, FileText, CheckCircle2
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";
import PlanArtifactMapper from "@/components/PlanArtifactMapper";
import FileTreeSidebar from "@/components/FileTreeSidebar";
import MarkdownEditor from "@/components/MarkdownEditor";

export interface MemberDetailViewProps {
    member: TeamMember;
    onBack?: () => void;
    onUpdate: (updates: Partial<TeamMember>) => void;
    onSave: () => void;
    saveStatus: 'idle' | 'saving' | 'saved';
    deals: any[];
    users: any[];
    firms: Firm[];
    currentUser: any;
    activeTab: "FILES" | "DEALS" | "SETTINGS";
    setActiveTab: (tab: "FILES" | "DEALS" | "SETTINGS") => void;
    teamMembers: TeamMember[];
    onFileSelect: (file: TeamMemberFile) => void;
    onAddFile: (name: string, content: string, type?: string) => void;
    onDeleteFile: (fileId: string) => void;
    isEditingFile?: boolean;
    fileEditContent?: string;
    onFileContentChange?: (content: string) => void;
    onSaveFile?: () => void;
    onCloseEditor?: () => void;
}

export default function MemberDetailView({
    member,
    onBack,
    onUpdate,
    onSave,
    saveStatus,
    deals,
    users,
    firms,
    currentUser,
    activeTab,
    setActiveTab,
    teamMembers,
    onFileSelect,
    onAddFile,
    onDeleteFile,
    isEditingFile,
    fileEditContent,
    onFileContentChange,
    onSaveFile,
    onCloseEditor
}: MemberDetailViewProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const isSystemAdmin = currentUser?.role === 'SYSTEM_ADMIN';

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate({ imageURL: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex flex-col h-full">
            {/* Detail Header */}
            <div className="p-8 border-b border-white/5 bg-brand-gray-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4 mb-6">
                    {onBack && (
                        <button
                            onClick={onBack}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-white/40 hover:bg-white/10 hover:text-white transition-all border border-white/5"
                        >
                            <X size={18} />
                        </button>
                    )}
                    <div className="flex-1">
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">{member.name}</h2>
                        <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mt-1">{member.role}</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    {["FILES", "DEALS", "SETTINGS"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab as any)}
                            className={`px-6 h-10 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab
                                ? 'bg-white text-brand-dark border-white shadow-lg'
                                : 'bg-white/5 text-white/40 hover:bg-white/10 border border-white/5'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-10 pb-40">
                {activeTab === "FILES" && (
                    <div className="space-y-12">
                        {/* Core Files Mapper */}
                        <PlanArtifactMapper
                            files={member.files || []}
                            onFileClick={(fileOrName, type) => {
                                if (typeof fileOrName === 'string') {
                                    onAddFile(fileOrName, `# ${fileOrName}\n\nEnter role details for ${member.name}...`, type);
                                } else {
                                    onFileSelect(fileOrName as TeamMemberFile);
                                }
                            }}
                            onUpload={async (file, type) => {
                                const content = await file.text();
                                onAddFile(file.name, content, type);
                            }}
                        />

                        {/* File Tree & Editor Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="text-lg font-black text-white uppercase tracking-tight">File <span className="text-brand-gold">Explorer</span></h3>
                                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Custom member-specific documentation.</p>
                                </div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6 h-[600px]">
                                <div className={`${isEditingFile ? 'w-full lg:w-1/3' : 'w-full'} transition-all duration-300 h-full`}>
                                    <FileTreeSidebar
                                        files={(member.files || []).filter(f => !['AGENTS', 'SOUL', 'ROLE', 'TOOLS'].includes(f.type))}
                                        selectedFileId={isEditingFile && fileEditContent ? 'active' : null} // Rough selection highlighting
                                        onFileSelect={onFileSelect}
                                        onAddFile={() => {
                                            const name = prompt("Name of file:", "new-document.md");
                                            if (name) onAddFile(name, "", "OTHER");
                                        }}
                                        onDeleteFile={onDeleteFile}
                                    />
                                </div>

                                {isEditingFile && fileEditContent !== undefined && (
                                    <div className="flex-1 h-full bg-black/40 rounded-[2rem] border border-white/5 overflow-hidden">
                                        <MarkdownEditor
                                            fileName="Editor"
                                            content={fileEditContent}
                                            onChange={onFileContentChange || (() => { })}
                                            onSave={onSaveFile || (() => { })}
                                            onClose={onCloseEditor || (() => { })}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === "DEALS" && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight">Active <span className="text-brand-gold">Deals</span></h3>
                                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Real estate assets associated with this team member.</p>
                            </div>
                        </div>

                        {deals.length === 0 ? (
                            <div className="py-20 flex flex-col items-center justify-center text-center opacity-20 border-2 border-dashed border-white/5 rounded-[2rem]">
                                <DollarSign size={48} className="mb-4" />
                                <p className="text-xs font-black uppercase tracking-[0.2em]">No associated deals</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {deals.map(deal => (
                                    <div key={deal.id} className="p-4 bg-white/5 border border-white/5 rounded-2xl flex items-center gap-4 hover:bg-white/10 transition-all group">
                                        <div className="h-16 w-16 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                            <img src={deal.stillImageURL || "/placeholder-deal.jpg"} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-xs font-black text-white uppercase tracking-widest truncate">{deal.address}</h4>
                                            <div className="flex gap-4 mt-2">
                                                <div className="flex items-center gap-1.5">
                                                    <DollarSign size={10} className="text-brand-gold" />
                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">${deal.purchaseAmount?.toLocaleString() || 'N/A'}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <FileText size={10} className="text-brand-gold" />
                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{deal.assetType}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white/20 group-hover:text-white group-hover:bg-white/10 transition-all border border-white/5">
                                            <ExternalLink size={14} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === "SETTINGS" && (
                    <div className="space-y-8">
                        {/* Headshot Editor */}
                        <div className="flex gap-6 items-end">
                            <div className="h-32 w-32 rounded-[2rem] overflow-hidden border-2 border-brand-gold/20 shadow-2xl relative group/photo">
                                <img src={member.imageURL || "/placeholder-user.jpg"} className="h-full w-full object-cover" />
                                <div
                                    className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center opacity-0 group-hover/photo:opacity-100 transition-opacity cursor-pointer"
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    <Camera size={24} className="text-white mb-2" />
                                    <span className="text-[8px] font-black uppercase tracking-widest text-white">Replace</span>
                                </div>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Member Name</label>
                                    <input
                                        type="text"
                                        value={member.name}
                                        onChange={(e) => onUpdate({ name: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all mt-2"
                                    />
                                </div>
                                <div>
                                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Role / Title</label>
                                    <input
                                        type="text"
                                        value={member.role}
                                        onChange={(e) => onUpdate({ role: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white/60 outline-none focus:border-brand-gold/40 transition-all mt-2"
                                    />
                                </div>
                            </div>
                            <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={handleImageUpload} />
                        </div>

                        {/* Connectivity */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                                <Globe size={12} /> Contact & Social
                            </div>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">Email Address</label>
                                    <input
                                        type="email"
                                        value={member.email || ""}
                                        onChange={(e) => onUpdate({ email: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">LinkedIn URL</label>
                                    <input
                                        type="url"
                                        value={member.linkedInUrl || ""}
                                        onChange={(e) => onUpdate({ linkedInUrl: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Organizational Structure */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                                <Building2 size={12} /> Organizational Registry
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">Core Department</label>
                                    <div className="p-1 rounded-2xl bg-black/40 border border-white/5">
                                        <select
                                            className="bg-transparent outline-none w-full h-12 px-4 text-xs font-bold text-white cursor-pointer"
                                            value={member.department || ""}
                                            onChange={(e) => onUpdate({ department: e.target.value })}
                                        >
                                            <option value="" className="bg-brand-gray-900">Unassigned</option>
                                            {["Acquisitions", "Investor Relations", "Finance", "Asset Management"].map(dept => (
                                                <option key={dept} value={dept} className="bg-brand-gray-900">{dept}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">Directly Reports To</label>
                                    <div className="p-1 rounded-2xl bg-black/40 border border-white/5">
                                        <select
                                            className="bg-transparent outline-none w-full h-12 px-4 text-xs font-bold text-white cursor-pointer"
                                            value={member.managerId || ""}
                                            onChange={(e) => onUpdate({ managerId: e.target.value || null })}
                                        >
                                            <option value="" className="bg-brand-gray-900">No Manager Assigned</option>
                                            {teamMembers
                                                .filter(m => m.id !== member.id) // Can't report to self
                                                .map(m => (
                                                    <option key={m.id} value={m.id} className="bg-brand-gray-900">{m.name} ({m.role})</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Narrative Section */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                                <Info size={12} /> Narrative Bio
                            </div>
                            <div className="rounded-[2rem] border border-white/5 overflow-hidden">
                                <RichTextEditor
                                    content={member.bio}
                                    onChange={(val: string) => onUpdate({ bio: val })}
                                />
                            </div>
                        </div>

                        {/* Platform Identity */}
                        <div className="space-y-4 pt-4 border-t border-white/5">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/10">
                                <Users size={12} /> Platform Connection
                            </div>
                            <div className="p-1 rounded-2xl bg-black/40 border border-white/5">
                                <select
                                    className="bg-transparent outline-none w-full h-12 px-4 text-xs font-bold text-white cursor-pointer"
                                    value={member.userId || ""}
                                    onChange={(e) => onUpdate({ userId: e.target.value || null })}
                                >
                                    <option value="" className="bg-brand-gray-900">Standalone Profile</option>
                                    {(users || []).map((u: any) => (
                                        <option key={u.id} value={u.id} className="bg-brand-gray-900">{u.email}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Footer Actions */}
            <div className="p-8 border-t border-white/10 bg-brand-gray-900/80 backdrop-blur-xl flex gap-4 sticky bottom-0">
                <button
                    onClick={onSave}
                    disabled={saveStatus === 'saving'}
                    className={`flex-1 flex items-center justify-center gap-3 h-16 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all ${saveStatus === 'saved'
                        ? 'bg-green-500 text-white shadow-xl shadow-green-500/20'
                        : 'bg-brand-gold text-brand-dark shadow-xl shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]'
                        }`}
                >
                    {saveStatus === 'saving' ? (
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                    ) : saveStatus === 'saved' ? (
                        <>
                            <CheckCircle2 size={18} />
                            Success: Saved to Registry
                        </>
                    ) : (
                        <>
                            <Save size={18} />
                            Commit Member Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}
