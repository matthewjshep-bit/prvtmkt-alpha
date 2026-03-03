"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { useData, TeamMember, Firm, TeamMemberFile } from "@/context/DataContext";
import {
    Users, Building2, Mail, ExternalLink, Settings, Save, Check, Plus, X,
    Linkedin, Phone, Trash2, Image as ImageIcon, Video, ChevronDown, ChevronUp,
    Briefcase, Globe, Info, Camera, Eye, FileText, FileCode, CheckCircle2,
    AlertCircle, Share2, DollarSign, ChevronRight
} from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import PublicPortalView from "@/components/PublicPortalView";
import RichTextEditor from "@/components/RichTextEditor";
import { motion, AnimatePresence } from "framer-motion";
import PlanArtifactMapper from "@/components/PlanArtifactMapper";
import FileTreeSidebar from "@/components/FileTreeSidebar";
import MarkdownEditor from "@/components/MarkdownEditor";
import MemberDetailView from "@/components/MemberDetailView";


export default function SiteEditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantPeopleContent />
        </Suspense>
    );
}

function TenantPeopleContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember, deleteTeamMember, currentUser, isInitialized, deals, users } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [focusedMemberId, setFocusedMemberId] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<"GALLERY" | "PROFILE">("GALLERY");
    const [localTeam, setLocalTeam] = useState<TeamMember[]>([]);
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);
    const [isLoadedOnce, setIsLoadedOnce] = useState(false);
    const [activeTab, setActiveTab] = useState<"FILES" | "DEALS" | "SETTINGS">("FILES");
    const [selectedFile, setSelectedFile] = useState<TeamMemberFile | null>(null);
    const [isEditingFile, setIsEditingFile] = useState(false);
    const [fileEditContent, setFileEditContent] = useState("");
    const [isSavingFile, setIsSavingFile] = useState(false);

    const {
        fetchMemberFiles,
        uploadMemberFile,
        updateMemberFile,
        deleteMemberFile
    } = useData();

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
                                onMemberClick={(id: string | null) => {
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
                    {focusedMemberId && localTeam.find(m => m.id === focusedMemberId) ? (
                        <MemberDetailView
                            member={localTeam.find(m => m.id === focusedMemberId)!}
                            onBack={() => setFocusedMemberId(null)}
                            onUpdate={(updates) => handleUpdateLocal(focusedMemberId, updates)}
                            onSave={() => handleSave(localTeam.find(m => m.id === focusedMemberId)!)}
                            saveStatus={saveStatus[focusedMemberId] || 'idle'}
                            deals={deals.filter(d => (d.teamMemberIds || []).includes(focusedMemberId))}
                            users={users}
                            teamMembers={teamMembers}
                            firms={firms}
                            currentUser={currentUser}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            onFileSelect={(file: TeamMemberFile) => {
                                setSelectedFile(file);
                                setFileEditContent(file.content);
                                setIsEditingFile(true);
                            }}
                            onAddFile={async (name: string, content: string, type?: string) => {
                                const newFile = await uploadMemberFile(focusedMemberId, { name, content, type: type || 'OTHER' });
                                if (newFile) {
                                    setLocalTeam(prev => prev.map(m =>
                                        m.id === focusedMemberId ? { ...m, files: [newFile, ...(m.files || [])] } : m
                                    ));
                                }
                            }}
                            onDeleteFile={async (fileId: string) => {
                                if (confirm("Are you sure you want to delete this file?")) {
                                    const success = await deleteMemberFile(focusedMemberId, fileId);
                                    if (success) {
                                        setLocalTeam(prev => prev.map(m =>
                                            m.id === focusedMemberId ? { ...m, files: (m.files || []).filter(f => f.id !== fileId) } : m
                                        ));
                                        if (selectedFile?.id === fileId) setIsEditingFile(false);
                                    }
                                }
                            }}
                        />
                    ) : (
                        <>
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
                                        <div
                                            key={member.id}
                                            onClick={() => {
                                                setFocusedMemberId(member.id);
                                                setPreviewMode("PROFILE");
                                            }}
                                            className="group p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 hover:border-white/10 transition-all cursor-pointer flex items-center gap-4"
                                        >
                                            <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/10 shrink-0">
                                                <img src={member.imageURL || "/placeholder-user.jpg"} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-xs font-black text-white uppercase tracking-widest truncate">{member.name}</h4>
                                                <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-0.5">{member.role}</p>
                                            </div>
                                            <ChevronRight size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                                        </div>
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
                        </>
                    )}
                </div>

                {/* Overlaid Markdown Editor */}
                <AnimatePresence>
                    {isEditingFile && selectedFile && (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 right-0 w-[600px] z-[100] p-10 bg-brand-dark/50 backdrop-blur-3xl border-l border-white/10"
                        >
                            <MarkdownEditor
                                fileName={selectedFile.name}
                                content={fileEditContent}
                                onChange={setFileEditContent}
                                onClose={() => setIsEditingFile(false)}
                                isSaving={isSavingFile}
                                onSave={async () => {
                                    setIsSavingFile(true);
                                    const success = await updateMemberFile(focusedMemberId!, selectedFile.id, { content: fileEditContent });
                                    if (success) {
                                        // Update local state is handled by updateMemberFile in DataContext manually usually but wait
                                        // DataContext updateMemberFile updates setTeamMembers, which ripples to localTeam via useEffect
                                        setTimeout(() => {
                                            setIsSavingFile(false);
                                            setIsEditingFile(false);
                                        }, 500);
                                    } else {
                                        setIsSavingFile(false);
                                        alert("Failed to save file.");
                                    }
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}


