"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { useData, TeamMember, Firm } from "@/context/DataContext";
import {
    Users, Building2, Mail, ExternalLink, Settings, Save, Check, Plus, X,
    Linkedin, Phone, Trash2, Image as ImageIcon, Video, ChevronDown, ChevronUp,
    Briefcase, Globe, Info, Camera
} from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import PublicPortalView from "@/components/PublicPortalView";
import RichTextEditor from "@/components/RichTextEditor";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export default function SiteEditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantPeopleContent />
        </Suspense>
    );
}

function TenantPeopleContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember, deleteTeamMember, currentUser, isInitialized, deals } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [focusedMemberId, setFocusedMemberId] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<"GALLERY" | "PROFILE">("GALLERY");
    const [localTeam, setLocalTeam] = useState<TeamMember[]>([]);
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);
    const [isLoadedOnce, setIsLoadedOnce] = useState(false);

    // One-Way Sync: Only populate localTeam once on load or firm change
    useEffect(() => {
        if (isInitialized && firm && !isLoadedOnce) {
            const firmTeam = teamMembers.filter((m) => m.firmId === firm.id || (m.firmIds || []).includes(firm.id));
            setLocalTeam(firmTeam);

            // Set initial focus if none exists
            if (firmTeam.length > 0 && !focusedMemberId) {
                setFocusedMemberId(firmTeam[0].id);
                setPreviewMode("PROFILE");
            }
            setIsLoadedOnce(true);
        }
    }, [isInitialized, firm?.id, isLoadedOnce, teamMembers]); // Include teamMembers for the initial load

    // Reset sync flag if firm changes to allow fresh load
    useEffect(() => {
        setIsLoadedOnce(false);
    }, [firm?.id]);

    if (!firm) return null;

    const handleUpdateLocal = (id: string, updates: Partial<TeamMember>) => {
        setLocalTeam(prev => prev.map(m => m.id === id ? { ...m, ...updates } : m));
    };

    const handleMoveMember = (id: string, direction: 'up' | 'down') => {
        setLocalTeam(prev => {
            const index = prev.findIndex(m => m.id === id);
            if (index === -1) return prev;
            if (direction === 'up' && index === 0) return prev;
            if (direction === 'down' && index === prev.length - 1) return prev;

            const newTeam = [...prev];
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            [newTeam[index], newTeam[targetIndex]] = [newTeam[targetIndex], newTeam[index]];

            // Update order/sortOrder for all members to match the new array order
            return newTeam.map((m, i) => ({ ...m, order: i, sortOrder: i }));
        });
    };

    const handleSave = async (member: TeamMember) => {
        setSaveStatus(prev => ({ ...prev, [member.id]: 'saving' }));
        const success = await updateTeamMember(member.id, member);
        if (success) {
            setSaveStatus(prev => ({ ...prev, [member.id]: 'saved' }));
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [member.id]: 'idle' }));
            }, 2000);
        } else {
            setSaveStatus(prev => ({ ...prev, [member.id]: 'idle' }));
        }
    };

    const handleSaveAll = async () => {
        const membersToSave = localTeam;
        for (const member of membersToSave) {
            handleSave(member);
        }
    };

    const handleTeamView = () => {
        setFocusedMemberId(null);
        setPreviewMode("GALLERY");
    };

    const handleOnboardMember = async () => {
        setIsAddingPerson(true);
        const newId = `p-${Date.now()}`;
        const memberToAdd: TeamMember = {
            id: newId,
            firmId: firm.id,
            firmIds: [firm.id],
            name: "New Team Member",
            slug: `new-member-${Date.now()}`,
            role: "Role / Title",
            imageURL: firm.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            bio: "",
            order: localTeam.length,
        };

        // Add to local state immediately for visual feedback
        setLocalTeam(prev => [memberToAdd, ...prev]);
        setFocusedMemberId(newId);
        setPreviewMode("PROFILE");

        try {
            const savedMember = await addTeamMember(memberToAdd);
            if (savedMember) {
                // Update local ID to real ID to maintain focus
                setLocalTeam(prev => prev.map(m => m.id === newId ? savedMember : m));
                setFocusedMemberId(savedMember.id);
            } else {
                console.error("Failed to onboard member: addTeamMember returned null");
                alert("Critical Registry Error: Failed to initialize database record. Please check server connectivity.");
                // Revert local state if failed
                setLocalTeam(prev => prev.filter(m => m.id !== newId));
                setFocusedMemberId(null);
                setPreviewMode("GALLERY");
            }
        } catch (error) {
            console.error("Failed to onboard member exception:", error);
            // Revert local state if failed
            setLocalTeam(prev => prev.filter(m => m.id !== newId));
            setFocusedMemberId(null);
            setPreviewMode("GALLERY");
        } finally {
            setIsAddingPerson(false);
        }
    };

    const handleMemberDelete = async (id: string) => {
        try {
            await deleteTeamMember(id);
            // Sync local state immediately and permanently
            setLocalTeam(prev => prev.filter(m => m.id !== id));
            // Shift focus
            if (focusedMemberId === id) {
                setFocusedMemberId(null);
                setPreviewMode("GALLERY");
            }
        } catch (error) {
            console.error("Failed to delete member:", error);
            alert("Failed to delete member. Please try again.");
        }
    };

    return (
        <div className="fixed inset-0 top-[72px] left-[280px] bg-brand-dark overflow-hidden">
            <div className="flex h-full w-full">
                {/* Center Workspace: Live Preview */}
                <div className="relative flex-1 bg-[#111] overflow-hidden flex flex-col">
                    <div className="absolute top-6 left-6 z-50 flex items-center gap-3">
                        <div className="flex h-10 items-center gap-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 px-4">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Live Preview Environment</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar pt-20 pb-40 px-10">
                        <div className="max-w-5xl mx-auto shadow-2xl border border-white/5 rounded-[3rem] overflow-hidden bg-black h-fit min-h-[800px]">
                            <PublicPortalView
                                firm={firm}
                                deals={deals}
                                teamMembers={localTeam}
                                isInitialized={isInitialized}
                                isPreview={true}
                                initialTab="PEOPLE"
                                focusedMemberId={focusedMemberId || undefined}
                                previewMode={previewMode}
                                onMemberClick={(id) => {
                                    if (id) {
                                        setFocusedMemberId(id);
                                        setPreviewMode("PROFILE");
                                    } else {
                                        setFocusedMemberId(null);
                                        setPreviewMode("GALLERY");
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Right-Hand Editor Stack */}
                <div className="w-[450px] bg-brand-gray-900 border-l border-white/5 flex flex-col">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between bg-brand-gray-900/50 backdrop-blur-md sticky top-0 z-10">
                        <div>
                            <h2 className="text-xl font-black text-white uppercase tracking-tight">Team <span className="text-brand-gold">Registry</span></h2>
                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Management Workflow</p>
                        </div>
                        <button
                            onClick={handleOnboardMember}
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-gold text-brand-dark transition-all hover:scale-110 active:scale-95 shadow-lg shadow-brand-gold/20"
                        >
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6 pb-4">
                        {localTeam.length === 0 ? (
                            <div className="h-64 flex flex-col items-center justify-center text-center opacity-20 border-2 border-dashed border-white/10 rounded-3xl m-4">
                                <Users size={48} className="mb-4" />
                                <p className="text-sm font-bold uppercase tracking-widest">No members registered</p>
                            </div>
                        ) : (
                            localTeam.map((member, index) => (
                                <MemberEditorCard
                                    key={member.id}
                                    member={member}
                                    firms={firms}
                                    isFocused={focusedMemberId === member.id}
                                    onFocus={() => {
                                        setFocusedMemberId(member.id);
                                        setPreviewMode("PROFILE");
                                    }}
                                    onUpdate={(updates) => handleUpdateLocal(member.id, updates)}
                                    onMove={(dir) => handleMoveMember(member.id, dir)}
                                    onSave={() => handleSave(member)}
                                    onDelete={() => handleMemberDelete(member.id)}
                                    saveStatus={saveStatus[member.id] || 'idle'}
                                    currentUser={currentUser}
                                    isFirst={index === 0}
                                    isLast={index === localTeam.length - 1}
                                />
                            ))
                        )}
                    </div>

                    {/* Registry Controls Footer */}
                    <div className="p-6 border-t border-white/10 bg-brand-gray-900/80 backdrop-blur-xl flex gap-4">
                        <button
                            onClick={handleTeamView}
                            className={`flex-[1] flex items-center justify-center gap-3 h-14 rounded-2xl border font-black uppercase tracking-widest text-[10px] transition-all ${!focusedMemberId ? 'bg-white text-brand-dark border-white shadow-xl shadow-white/10' : 'bg-brand-dark border-white/10 text-white/40 hover:text-white hover:border-white/20'}`}
                        >
                            <Eye size={16} />
                            Team View
                        </button>
                        <button
                            onClick={handleSaveAll}
                            className="flex-[2] flex items-center justify-center gap-3 h-14 rounded-2xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-[10px] transition-all hover:shadow-xl hover:shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Save size={16} />
                            Save All Edits
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

}

interface MemberEditorCardProps {
    member: TeamMember;
    firms: Firm[];
    isFocused: boolean;
    onFocus: () => void;
    onUpdate: (updates: Partial<TeamMember>) => void;
    onMove: (direction: 'up' | 'down') => void;
    onSave: () => void;
    onDelete: () => void;
    saveStatus: 'idle' | 'saving' | 'saved';
    currentUser: any;
    isFirst: boolean;
    isLast: boolean;
}

function MemberEditorCard({
    member,
    firms,
    isFocused,
    onFocus,
    onUpdate,
    onMove,
    onSave,
    onDelete,
    saveStatus,
    currentUser,
    isFirst,
    isLast
}: MemberEditorCardProps) {
    const [isExpanded, setIsExpanded] = useState(isFocused);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const heroInputRef = useRef<HTMLInputElement>(null);
    const isSystemAdmin = currentUser?.role === 'SYSTEM_ADMIN';

    useEffect(() => {
        if (isFocused) setIsExpanded(true);
    }, [isFocused]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'imageURL' | 'heroMediaUrl') => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate({ [field]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div
            onClick={() => { onFocus(); }}
            className={`group transition-all duration-500 rounded-[2rem] border overflow-hidden ${isFocused
                ? 'bg-brand-gray-800 border-brand-gold/30 shadow-2xl scale-[1.02]'
                : 'bg-white/5 border-white/5 hover:border-white/10 opacity-70 hover:opacity-100'
                }`}
        >
            {/* Header / Identity Editor */}
            <div className="p-6">
                <div className="flex gap-5 items-start relative group/identity">
                    <div className="relative group/photo shrink-0">
                        <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-brand-gold/30 shadow-xl bg-brand-dark group-hover/photo:border-brand-gold transition-all">
                            <img src={member.imageURL || "/placeholder-user.jpg"} className="h-full w-full object-cover" alt={member.name} />
                            <div
                                className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            >
                                <Camera size={20} className="text-white" />
                            </div>
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                            className="mt-2 w-full text-[8px] font-black uppercase tracking-[0.15em] text-brand-gold hover:text-white transition-colors text-center"
                        >
                            Replace Headshot
                        </button>
                        <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'imageURL')} />
                    </div>

                    <div className="flex-1 space-y-3 pt-1">
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">Full Legal Name</label>
                            <input
                                type="text"
                                placeholder="Legal Name"
                                value={member.name}
                                onChange={(e) => onUpdate({ name: e.target.value })}
                                className="w-full h-10 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all font-inter"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-widest text-white/20 ml-1">Professional Title</label>
                            <input
                                type="text"
                                placeholder="Professional Title"
                                value={member.role}
                                onChange={(e) => onUpdate({ role: e.target.value })}
                                className="w-full h-10 bg-black/40 border border-white/5 rounded-xl px-4 text-xs font-bold text-white/60 outline-none focus:border-brand-gold/40 transition-all font-inter"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 shrink-0">
                        <button
                            onClick={(e) => { e.stopPropagation(); onMove('up'); }}
                            disabled={isFirst}
                            className={`h-8 w-8 flex items-center justify-center rounded-lg border border-white/5 transition-all ${isFirst ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                        >
                            <ChevronUp size={16} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); onMove('down'); }}
                            disabled={isLast}
                            className={`h-8 w-8 flex items-center justify-center rounded-lg border border-white/5 transition-all ${isLast ? 'opacity-20 cursor-not-allowed' : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white'}`}
                        >
                            <ChevronDown size={16} />
                        </button>
                    </div>

                    <div className="flex flex-col items-center gap-2 pt-2 shrink-0">
                        <div className="h-6 flex items-center justify-center">
                            {saveStatus === 'saved' && <Check size={18} className="text-green-500" />}
                            {saveStatus === 'saving' && <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />}
                        </div>
                        <button
                            onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                            className="h-10 w-10 flex items-center justify-center rounded-full bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition-all border border-white/5"
                        >
                            {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Expanded Editor */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="px-6 pb-8 space-y-8"
                    >
                        <hr className="border-white/5" />

                        {/* Connectivity Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">
                                <Globe size={12} />
                                Connectivity
                            </div>
                            <div className="space-y-3">
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={14} />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        value={member.email}
                                        onChange={(e) => onUpdate({ email: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={14} />
                                    <input
                                        type="url"
                                        placeholder="LinkedIn URL"
                                        value={member.linkedInUrl || ""}
                                        onChange={(e) => onUpdate({ linkedInUrl: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                    />
                                </div>
                                <div className="relative group">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={14} />
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        value={member.phoneNumber || ""}
                                        onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                                        className="w-full h-12 bg-black/40 border border-white/5 rounded-xl pl-12 pr-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Associated Firms Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">
                                <Building2 size={12} />
                                {isSystemAdmin ? 'Associated Firms' : 'Firm'}
                            </div>
                            <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-black/20 border border-white/5">
                                {(member.firmIds || []).map(fId => {
                                    const f = firms.find(item => item.id === fId);
                                    return (
                                        <div key={fId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 px-3 py-1.5 text-[9px] font-black uppercase tracking-widest text-brand-gold border border-brand-gold/20">
                                            {f?.name}
                                            {isSystemAdmin && (
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); onUpdate({ firmIds: (member.firmIds || []).filter(id => id !== fId) }); }}
                                                    className="hover:text-white transition-colors"
                                                >
                                                    <X size={10} />
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                                {isSystemAdmin && (
                                    <select
                                        className="bg-transparent border-none text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white outline-none cursor-pointer w-[120px]"
                                        value=""
                                        onChange={(e) => {
                                            const id = e.target.value;
                                            if (id && !(member.firmIds || []).includes(id)) {
                                                onUpdate({ firmIds: [...(member.firmIds || []), id] });
                                            }
                                        }}
                                    >
                                        <option value="" disabled>+ Link Firm</option>
                                        {firms.filter(f => !(member.firmIds || []).includes(f.id)).map(f => (
                                            <option key={f.id} value={f.id} className="bg-brand-dark">{f.name}</option>
                                        ))}
                                    </select>
                                )}
                            </div>
                        </div>

                        {/* Narrative Section */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">
                                <Info size={12} />
                                Profile Narrative
                            </div>
                            <div className="rounded-2xl border border-white/5 overflow-hidden">
                                <RichTextEditor
                                    content={member.bio}
                                    onChange={(val) => onUpdate({ bio: val })}
                                />
                            </div>
                        </div>

                        {/* Portfolio Hero Media */}
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-2">
                                <ImageIcon size={12} />
                                Portfolio Hero
                            </div>
                            <div className={`aspect-[21/9] rounded-2xl border-2 border-dashed border-white/5 bg-black/20 overflow-hidden relative group/hero flex flex-col items-center justify-center gap-3 transition-all hover:border-brand-gold/20 hover:bg-black/40`}>
                                {member.heroMediaUrl ? (
                                    <>
                                        <img src={member.heroMediaUrl} className="absolute inset-0 h-full w-full object-cover opacity-60" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity bg-black/60 cursor-pointer" onClick={(e) => { e.stopPropagation(); heroInputRef.current?.click(); }}>
                                            <Video size={24} className="text-brand-gold mb-2" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Replace Media</span>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="h-10 w-10 rounded-full bg-white/5 flex items-center justify-center" onClick={(e) => { e.stopPropagation(); heroInputRef.current?.click(); }}>
                                            <Plus size={20} className="text-white/20" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Cinematic Banner</p>
                                            <p className="text-[8px] font-bold uppercase tracking-widest text-white/20">Video or Ultra-Wide Static</p>
                                        </div>
                                    </>
                                )}
                                <input ref={heroInputRef} type="file" hidden accept="video/*,image/*" onChange={(e) => handleImageUpload(e, 'heroMediaUrl')} />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-6">
                            <button
                                onClick={(e) => { e.stopPropagation(); onSave(); }}
                                disabled={saveStatus === 'saving'}
                                className={`flex-1 h-14 flex items-center justify-center gap-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${saveStatus === 'saved'
                                    ? 'bg-green-500 text-white shadow-[0_10px_30px_-10px_rgba(34,197,94,0.5)]'
                                    : 'bg-brand-gold text-brand-dark shadow-[0_10px_30px_-10px_rgba(197,160,89,0.3)] hover:scale-[1.02]'
                                    }`}
                            >
                                {saveStatus === 'saving' ? (
                                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                                ) : saveStatus === 'saved' ? (
                                    <>
                                        <Check size={18} />
                                        Registry Updated
                                    </>
                                ) : (
                                    <>
                                        <Save size={18} />
                                        Save Changes
                                    </>
                                )}
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (isConfirmingDelete) {
                                        onDelete();
                                    } else {
                                        setIsConfirmingDelete(true);
                                        // Reset confirmation after 3 seconds if not clicked
                                        setTimeout(() => setIsConfirmingDelete(false), 3000);
                                    }
                                }}
                                className={`h-14 flex items-center justify-center rounded-2xl transition-all border ${isConfirmingDelete
                                    ? 'bg-red-500 text-white px-6 border-red-600 animate-pulse'
                                    : 'w-14 bg-white/5 text-white/30 hover:bg-red-500/10 hover:text-red-500 border-white/5'
                                    }`}
                            >
                                {isConfirmingDelete ? (
                                    <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Confirm Delete?</span>
                                ) : (
                                    <Trash2 size={18} />
                                )}
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
