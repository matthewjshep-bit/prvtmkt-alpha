"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { useData, TeamMember, Firm, TeamMemberFile } from "@/context/DataContext";
import {
    Users, Mail, ExternalLink, Save, Check, Plus, X,
    Linkedin, Phone, LayoutGrid, List, Trash2,
    GripVertical, Camera, Image as ImageIcon, Video,
    FileText, FileCode, CheckCircle2, AlertCircle, FileStack, Settings, Building2, Globe, Info, GitGraph,
    AlertTriangle
} from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
import OrgChart from "@/components/OrgChart";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export default function TenantGalleryEditorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantGalleryEditorContent />
        </Suspense>
    );
}

function TenantGalleryEditorContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember, deleteTeamMember, reorderTeamMembers, isInitialized, currentUser } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'org'>('grid');
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved' | 'error'>>({});
    const [lastError, setLastError] = useState<string | null>(null);
    const [isAddingPerson, setIsAddingPerson] = useState(false);
    const [isConfirmingDelete, setIsConfirmingDelete] = useState<string | null>(null);
    const [orderedMembers, setOrderedMembers] = useState<TeamMember[]>([]);
    const [hasOrderChanged, setHasOrderChanged] = useState(false);

    // Filter members for this firm
    const firmMembers = teamMembers.filter(m => {
        const hasId = firm?.id && (
            (m.firmIds || []).includes(firm.id) ||
            m.firmId === firm.id
        );
        return hasId;
    });

    const [newPerson, setNewPerson] = useState<Partial<TeamMember>>({
        name: "",
        firmIds: [firm?.id || ""],
        role: "Associate",
        email: "",
        phoneNumber: "",
        linkedInUrl: "",
        imageURL: firm?.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        bio: "",
        heroMediaUrl: ""
    });

    useEffect(() => {
        if (firm && (!newPerson.firmIds || newPerson.firmIds[0] === "")) {
            setNewPerson(prev => ({ ...prev, firmIds: [firm.id], firmId: firm.id, imageURL: firm.logoUrl || prev.imageURL }));
        }
    }, [firm?.id, newPerson.firmIds]);

    useEffect(() => {
        if (isInitialized) {
            const sorted = [...firmMembers].sort((a, b) => (a.order || 0) - (b.order || 0));
            setOrderedMembers(sorted);
            setHasOrderChanged(false);
        }
    }, [isInitialized, teamMembers, firm?.id]); // Reset when membership or firm changes

    const handleReorder = (newOrder: TeamMember[]) => {
        setOrderedMembers(newOrder);
        setHasOrderChanged(true);
    };

    const handleSaveOrder = async () => {
        const updatedMembers = orderedMembers.map((m, index) => ({
            ...m,
            order: index
        }));
        const success = await reorderTeamMembers(updatedMembers);
        if (success === true) {
            setHasOrderChanged(false);
        }
    };

    const handleAddPerson = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`[GalleryEditor] handleAddPerson starting. Firm ID: ${firm?.id}`);

        if (!firm?.id) {
            console.error("[GalleryEditor] Cannot add member: Missing Firm ID");
            return;
        }

        const personToAdd: TeamMember = {
            id: `p-${Date.now()}`,
            firmId: firm.id,
            firmIds: (newPerson.firmIds && newPerson.firmIds.length > 0 && newPerson.firmIds[0] !== "")
                ? newPerson.firmIds
                : [firm.id],
            name: newPerson.name || "New Team Member",
            slug: `${(newPerson.name || "new-member").toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`,
            role: newPerson.role || "Associate",
            email: newPerson.email,
            phoneNumber: newPerson.phoneNumber,
            linkedInUrl: newPerson.linkedInUrl,
            imageURL: newPerson.imageURL || "",
            bio: newPerson.bio || "",
            heroMediaUrl: newPerson.heroMediaUrl,
            order: orderedMembers.length
        };

        console.log(`[GalleryEditor] Prepared payload:`, personToAdd);
        const result = await addTeamMember(personToAdd);

        if (result) {
            console.log(`[GalleryEditor] Add successful:`, result);
            setIsAddingPerson(false);
            setNewPerson({
                name: "",
                firmId: firm.id,
                firmIds: [firm.id],
                role: "Associate",
                email: "",
                phoneNumber: "",
                linkedInUrl: "",
                imageURL: firm.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
                bio: "",
                heroMediaUrl: ""
            });
        } else {
            console.error(`[GalleryEditor] Add failed (addTeamMember returned null)`);
            const errorMessage = localStorage.getItem('last_add_member_error') || "Database connection failure.";
            alert(`Critical Database Error: ${errorMessage}\n\nFailed to initialize professional record.`);
        }
    };

    const handleSave = async (id: string, updates: Partial<TeamMember>) => {
        console.log(`[GalleryEditor] handleSave triggered for ${id}`, updates);
        setSaveStatus(prev => ({ ...prev, [id]: 'saving' }));
        const success = await updateTeamMember(id, updates);
        if (success) {
            console.log(`[GalleryEditor] handleSave success for ${id}`);
            setSaveStatus(prev => ({ ...prev, [id]: 'saved' }));
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
            }, 2000);
        } else {
            console.error(`[GalleryEditor] handleSave failed for ${id}`);
            const errorMsg = localStorage.getItem('last_update_member_error') || 'Save failed';
            setLastError(errorMsg);
            setSaveStatus(prev => ({ ...prev, [id]: 'error' }));
        }
    };

    const handleDelete = async (id: string) => {
        console.log(`[GalleryEditor] handleDelete triggered for ${id}`);
        await deleteTeamMember(id);
        setIsConfirmingDelete(null);
    };

    if (!isInitialized || !firm) {
        return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>;
    }

    return (
        <div className={`min-h-screen bg-brand-dark pb-24 transition-all duration-500 ${viewMode === 'org' ? '-m-6 lg:-m-12 !pb-0' : ''}`}>
            <div className={`mx-auto transition-all duration-500 ${viewMode === 'org' ? 'max-w-none px-0' : 'max-w-[1700px] px-4 md:px-8 lg:px-12'}`}>
                {/* Header Section - Conditional Layout */}
                <div className={`flex flex-col md:flex-row md:items-end justify-between gap-6 transition-all ${viewMode === 'org' ? 'px-8 lg:px-12 py-12 bg-brand-gray-900/50 border-b border-white/5 mb-0' : 'mb-12'}`}>
                    <div>
                        <h1 className="text-4xl font-black text-white uppercase tracking-tight">Team <span className="text-brand-gold">Members</span></h1>
                        <p className="mt-2 text-foreground/40 font-medium max-w-xl">Manage your firm's professional profiles and their public appearance across the platform.</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1 rounded-2xl bg-brand-gray-900 border border-white/5 p-1.5 shadow-xl">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-foreground/30 hover:text-white'}`}
                            >
                                <LayoutGrid size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-foreground/30 hover:text-white'}`}
                            >
                                <List size={18} />
                            </button>
                            <button
                                onClick={() => setViewMode('org')}
                                className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${viewMode === 'org' ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-foreground/30 hover:text-white'}`}
                                title="Organization Chart"
                            >
                                <GitGraph size={18} />
                            </button>
                        </div>

                        <button
                            onClick={() => setIsAddingPerson(true)}
                            className="flex items-center gap-3 rounded-2xl bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-dark transition-all hover:shadow-xl hover:shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                        >
                            <Plus size={18} />
                            Add Team Member
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {lastError && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-[2rem] p-6 mb-8 flex items-center justify-between group overflow-hidden"
                        >
                            <div className="flex items-center gap-4 text-red-500 font-bold text-sm">
                                <AlertTriangle size={20} />
                                <div className="space-y-0.5">
                                    <h4 className="font-black uppercase tracking-tight">Save Error Encountered</h4>
                                    <p className="text-xs opacity-80">{lastError}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setLastError(null)}
                                className="h-10 px-4 rounded-xl bg-red-500 text-white text-[10px] font-black uppercase tracking-widest transition-all hover:bg-red-600 active:scale-95"
                            >
                                Dismiss
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {hasOrderChanged && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 flex items-center justify-between p-6 rounded-[2rem] bg-brand-gold/10 border border-brand-gold/20"
                    >
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-gold text-brand-dark">
                                <GripVertical size={20} />
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white uppercase tracking-tight">Custom Order Detected</h3>
                                <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">Apply recent drag-and-drop rearrangements to the live site</p>
                            </div>
                        </div>
                        <button
                            onClick={handleSaveOrder}
                            className="flex items-center gap-3 rounded-xl bg-brand-gold px-8 py-3 text-[10px] font-black uppercase tracking-widest text-brand-dark transition-all hover:scale-[1.05]"
                        >
                            <Save size={14} />
                            Save New Order
                        </button>
                    </motion.div>
                )}

                {/* Main Content Area */}
                <AnimatePresence mode="wait">
                    {viewMode === 'grid' ? (
                        <Reorder.Group
                            axis="y"
                            values={orderedMembers}
                            onReorder={handleReorder}
                            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                        >
                            {orderedMembers.map((member) => (
                                <Reorder.Item
                                    key={member.id}
                                    value={member}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <GridMemberCard
                                        member={member}
                                        firms={firms}
                                        onUpdate={(updates) => handleSave(member.id, updates)}
                                        onDelete={() => setIsConfirmingDelete(member.id)}
                                        saveStatus={saveStatus[member.id] || 'idle'}
                                        currentUser={currentUser}
                                        teamMembers={teamMembers}
                                    />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    ) : viewMode === 'list' ? (
                        <Reorder.Group
                            axis="y"
                            values={orderedMembers}
                            onReorder={handleReorder}
                            className="rounded-[2.5rem] border border-white/5 bg-brand-gray-900/30 overflow-hidden shadow-2xl"
                        >
                            <table className="w-full text-left border-collapse">
                                <thead className="bg-brand-gray-900/50">
                                    <tr className="border-b border-white/5">
                                        <th className="w-12 pl-6 py-4"></th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[200px]">Identity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">Docs</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[150px]">Department</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[200px]">Reports To</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[180px]">Firm</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap text-right pr-12">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {orderedMembers.map((member) => (
                                        <Reorder.Item
                                            key={member.id}
                                            value={member}
                                            as="tr"
                                            className="group/row transition-colors hover:bg-brand-gray-900/50"
                                        >
                                            <td className="pl-6 cursor-grab active:cursor-grabbing text-white/10 hover:text-brand-gold transition-colors">
                                                <GripVertical size={16} />
                                            </td>
                                            <ListMemberRow
                                                member={member}
                                                firms={firms}
                                                onUpdate={(updates) => handleSave(member.id, updates)}
                                                onDelete={() => setIsConfirmingDelete(member.id)}
                                                saveStatus={saveStatus[member.id] || 'idle'}
                                                currentUser={currentUser}
                                                teamMembers={teamMembers}
                                                isNestedInRow
                                            />
                                        </Reorder.Item>
                                    ))}
                                </tbody>
                            </table>
                        </Reorder.Group>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                        >
                            <OrgChart
                                members={orderedMembers}
                                onMemberClick={(member) => {
                                    window.location.href = `/admin/${firmSlug}/people/${member.id}`;
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {firmMembers.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-32 rounded-[3rem] border-2 border-dashed border-white/5 bg-brand-gray-900/10">
                        <Users size={64} className="text-white/5 mb-6" />
                        <h3 className="text-xl font-bold text-white/40 uppercase tracking-widest">No Team Members Registered</h3>
                        <p className="text-white/20 text-sm mt-2">Initialize your firm's roster by adding your first professional profile.</p>
                        <button
                            onClick={() => setIsAddingPerson(true)}
                            className="mt-8 flex items-center gap-3 rounded-2xl border border-white/10 px-8 py-4 text-xs font-black uppercase tracking-widest text-white/40 hover:text-brand-gold hover:border-brand-gold transition-all"
                        >
                            <Plus size={18} />
                            Onboard First Member
                        </button>
                    </div>
                )}

                {/* Modal: Add Team Member */}
                <AnimatePresence>
                    {isAddingPerson && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsAddingPerson(false)}
                                className="absolute inset-0 bg-brand-dark/95 backdrop-blur-xl"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                                animate={{ scale: 1, opacity: 1, y: 0 }}
                                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                                className="relative w-full max-w-2xl rounded-[3rem] border border-white/10 bg-brand-gray-900 p-10 shadow-2xl overflow-y-auto max-h-[90vh] custom-scrollbar"
                            >
                                <div className="mb-8 flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-white uppercase tracking-tight">Onboard <span className="text-brand-gold">Member</span></h3>
                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mt-2">Registry Expansion Workflow</p>
                                    </div>
                                    <button onClick={() => setIsAddingPerson(false)} className="h-12 w-12 flex items-center justify-center rounded-full bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition-all">
                                        <X size={24} />
                                    </button>
                                </div>

                                <form onSubmit={handleAddPerson} className="space-y-8">
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Full Legal Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                                    placeholder="e.g. John Shepherd"
                                                    value={newPerson.name}
                                                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Professional Title</label>
                                                <input
                                                    type="text"
                                                    className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold text-white outline-none focus:border-brand-gold/40 transition-all font-inter"
                                                    value={newPerson.role}
                                                    placeholder="e.g. Principal / Associate"
                                                    onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 flex flex-col items-center justify-end">
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 mb-3">Profile Portrait</label>
                                            <div className="relative group/photo">
                                                <div className="h-32 w-32 overflow-hidden rounded-[2rem] border-2 border-brand-gold/30 shadow-xl bg-brand-dark group-hover/photo:border-brand-gold transition-all">
                                                    <img src={newPerson.imageURL} className="h-full w-full object-cover" />
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="absolute inset-0 z-10 w-full cursor-pointer opacity-0"
                                                        onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => {
                                                                    setNewPerson({ ...newPerson, imageURL: reader.result as string });
                                                                };
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }}
                                                    />
                                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity">
                                                        <Camera size={24} className="text-white" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Email Address</label>
                                        <div className="relative group">
                                            <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                            <input
                                                type="email"
                                                className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl pl-16 pr-6 text-sm font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                                placeholder="professional@firm.com"
                                                value={newPerson.email}
                                                onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex items-center justify-center gap-3 rounded-[1.5rem] bg-brand-gold py-5 text-xs font-black uppercase tracking-[0.2em] text-brand-dark transition-all hover:shadow-[0_20px_40px_-10px_rgba(197,160,89,0.3)] hover:scale-[1.01]"
                                    >
                                        <Check size={20} />
                                        Initialize Professional Profile
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Modal: Delete Confirmation */}
                <AnimatePresence>
                    {isConfirmingDelete && (
                        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsConfirmingDelete(null)}
                                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="relative w-full max-w-sm rounded-[2rem] border border-red-500/20 bg-brand-gray-900 p-10 text-center"
                            >
                                <div className="h-20 w-20 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-6 text-red-500">
                                    <Trash2 size={40} />
                                </div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">Purge Member?</h3>
                                <p className="text-sm text-foreground/40 mb-10 font-medium">This professional record and all associated media will be permanently purged from the registry.</p>
                                <div className="flex flex-col gap-3">
                                    <button
                                        onClick={() => handleDelete(isConfirmingDelete)}
                                        className="w-full py-4 rounded-2xl bg-red-500 text-white text-xs font-black uppercase tracking-[0.2em] transition-all hover:bg-red-600 shadow-xl shadow-red-500/20"
                                    >
                                        Delete Record
                                    </button>
                                    <button
                                        onClick={() => setIsConfirmingDelete(null)}
                                        className="w-full py-4 rounded-2xl border border-white/5 bg-white/5 text-white/40 text-xs font-black uppercase tracking-[0.2em] hover:text-white transition-all"
                                    >
                                        Cancel Action
                                    </button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

// Sub-component: Grid card refined to match Site Editor aesthetic
function GridMemberCard({ member, firms, onUpdate, onDelete, saveStatus, currentUser, teamMembers }: {
    member: TeamMember,
    firms: Firm[],
    onUpdate: (updates: Partial<TeamMember>) => void,
    onDelete: () => void,
    saveStatus: 'idle' | 'saving' | 'saved' | 'error',
    currentUser: any,
    teamMembers: TeamMember[]
}) {
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const fileInputRef = useRef<HTMLInputElement>(null);
    const heroInputRef = useRef<HTMLInputElement>(null);
    const isSystemAdmin = currentUser?.role === 'SYSTEM_ADMIN';

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
        <div className="glass group overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/30 p-8 transition-all hover:border-brand-gold/20 hover:bg-brand-gray-900/50 flex flex-col h-full shadow-2xl relative">
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-white/10 hover:text-brand-gold">
                <GripVertical size={16} />
            </div>
            {/* Portrait & Identity Section */}
            <div className="flex items-start gap-6 mb-8">
                <div className="relative group/photo shrink-0">
                    <div className="h-24 w-24 overflow-hidden rounded-3xl border-2 border-brand-gold/30 shadow-xl bg-brand-dark group-hover/photo:border-brand-gold transition-all">
                        <img src={member.imageURL || "/placeholder-user.jpg"} className="h-full w-full object-cover" alt={member.name} />
                        <div
                            className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-opacity cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Camera size={20} className="text-white" />
                        </div>
                    </div>
                    <input ref={fileInputRef} type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'imageURL')} />
                </div>

                <div className="flex-1 space-y-4 pt-1">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Full Legal Name</label>
                        <input
                            type="text"
                            value={member.name}
                            onChange={(e) => onUpdate({ name: e.target.value })}
                            className="w-full bg-transparent border-b border-white/10 text-xl font-black text-white outline-none focus:border-brand-gold transition-all"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Professional Title</label>
                        <input
                            type="text"
                            value={member.role}
                            onChange={(e) => onUpdate({ role: e.target.value })}
                            className="w-full bg-transparent border-b border-white/10 text-xs font-bold text-brand-gold outline-none focus:border-brand-gold transition-all uppercase tracking-widest"
                        />
                    </div>
                </div>
            </div>

            {/* Core Documentation Status */}
            <div className="space-y-3 mb-6">
                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Core Documentation</label>
                <div className="grid grid-cols-2 gap-2">
                    {['SOUL', 'ROLE', 'AGENTS', 'TOOLS'].map(type => {
                        const file = (member.files || []).find(f => f.type === type);
                        return (
                            <Link
                                key={type}
                                href={`/admin/${firmSlug}/people/${member.id}?tab=FILES`}
                                className={`flex items-center gap-2 p-2 rounded-xl border transition-all ${file
                                    ? 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'
                                    : 'bg-black/20 border-white/5 text-white/20 hover:border-white/10'
                                    }`}
                            >
                                {file ? <CheckCircle2 size={10} /> : <AlertCircle size={10} />}
                                <span className="text-[9px] font-black tracking-widest uppercase">{type}.MD</span>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Associated Firms Section - READ ONLY on Firm Admin level */}
            <div className="space-y-3 mb-6">
                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Firm</label>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-black/20 border border-white/5 min-h-[48px]">
                    {(member.firmIds || []).map(fId => {
                        const f = firms.find(item => item.id === fId);
                        return (
                            <div key={fId} className="flex items-center gap-1.5 rounded-lg bg-brand-gold/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-brand-gold border border-brand-gold/20">
                                {f?.name}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Organizational Hierarchy Display */}
            <div className="space-y-4 flex-1">
                <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Department</label>
                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 h-12 text-sm text-brand-gold font-bold focus-within:border-brand-gold/30">
                        <Building2 size={16} className="text-brand-gold/40" />
                        <select
                            className="bg-transparent border-none outline-none w-full h-full text-brand-gold appearance-none cursor-pointer"
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

                <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Reports To</label>
                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 h-12 text-sm text-white/60 font-medium focus-within:border-brand-gold/30">
                        <Users size={16} className="text-white/20" />
                        <select
                            className="bg-transparent border-none outline-none w-full h-full text-white appearance-none cursor-pointer"
                            value={member.managerId || ""}
                            onChange={(e) => onUpdate({ managerId: e.target.value || null })}
                        >
                            <option value="" className="bg-brand-gray-900">No Manager</option>
                            {teamMembers.filter(m => m.id !== member.id).map(m => (
                                <option key={m.id} value={m.id} className="bg-brand-gray-900">{m.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex gap-3">
                <Link
                    href={`/admin/${firmSlug}/people/${member.id}`}
                    className="flex-1 flex items-center justify-center gap-3 h-14 rounded-2xl bg-brand-gold text-brand-dark shadow-xl shadow-brand-gold/20 text-[10px] font-black uppercase tracking-widest transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                    <FileStack size={14} />
                    Manage Member
                </Link>
                <button
                    onClick={onDelete}
                    className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/20 border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
                >
                    <Trash2 size={20} />
                </button>
            </div>
        </div>
    );
}

// Sub-component: High-density list row
function ListMemberRow({ member, firms, onUpdate, onDelete, saveStatus, currentUser, teamMembers, isNestedInRow }: {
    member: TeamMember,
    firms: Firm[],
    onUpdate: (updates: Partial<TeamMember>) => void,
    onDelete: () => void,
    saveStatus: 'idle' | 'saving' | 'saved' | 'error',
    currentUser: any,
    teamMembers: TeamMember[],
    isNestedInRow?: boolean
}) {
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const isSystemAdmin = currentUser?.role === 'SYSTEM_ADMIN';

    const content = (
        <>
            {/* Identity Column */}
            <td className="px-8 py-6">
                <div className="flex items-center gap-5">
                    <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-white/10 group-hover/row:border-brand-gold/30 transition-all">
                        <img src={member.imageURL} className="h-full w-full object-cover" />
                    </div>
                    <div className="space-y-1">
                        <input
                            type="text"
                            className="bg-transparent border-none text-sm font-black text-white outline-none w-64 block p-0"
                            value={member.name}
                            onChange={(e) => onUpdate({ name: e.target.value })}
                        />
                        <input
                            type="text"
                            className="bg-transparent border-none text-[10px] font-bold text-brand-gold/60 outline-none w-64 block p-0 uppercase tracking-widest"
                            value={member.role}
                            onChange={(e) => onUpdate({ role: e.target.value })}
                        />
                    </div>
                </div>
            </td>

            {/* Documentation Column */}
            <td className="px-8 py-6">
                <div className="flex gap-1.5">
                    {['SOUL', 'ROLE', 'AGENTS', 'TOOLS'].map(type => {
                        const file = (member.files || []).find(f => f.type === type);
                        return (
                            <div
                                key={type}
                                title={`${type}.md ${file ? '(Active)' : '(Missing)'}`}
                                className={`h-8 w-8 flex items-center justify-center rounded-lg border transition-all ${file
                                    ? 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'
                                    : 'bg-black/20 border-white/5 text-white/10'
                                    }`}
                            >
                                {file ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                            </div>
                        );
                    })}
                </div>
            </td>

            {/* Organization Columns */}
            <td className="px-8 py-6">
                <select
                    className="text-[10px] font-black text-brand-gold uppercase tracking-widest bg-brand-gold/5 px-3 py-1.5 rounded-lg border border-brand-gold/10 outline-none appearance-none cursor-pointer hover:bg-brand-gold/10 transition-colors"
                    value={member.department || ""}
                    onChange={(e) => onUpdate({ department: e.target.value })}
                >
                    <option value="" className="bg-brand-gray-900 italic">Unassigned</option>
                    {["Acquisitions", "Investor Relations", "Finance", "Asset Management"].map(dept => (
                        <option key={dept} value={dept} className="bg-brand-gray-900">{dept}</option>
                    ))}
                </select>
            </td>

            <td className="px-8 py-6">
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5 hover:border-brand-gold/30 transition-all">
                    <Users size={12} className="text-white/20" />
                    <select
                        className="bg-transparent border-none outline-none text-[10px] font-bold text-white/40 uppercase tracking-widest appearance-none cursor-pointer"
                        value={member.managerId || ""}
                        onChange={(e) => onUpdate({ managerId: e.target.value || null })}
                    >
                        <option value="" className="bg-brand-gray-900">No Manager</option>
                        {teamMembers.filter(m => m.id !== member.id).map(m => (
                            <option key={m.id} value={m.id} className="bg-brand-gray-900">{m.name}</option>
                        ))}
                    </select>
                </div>
            </td>

            {/* Firm Column - READ ONLY */}
            <td className="px-8 py-6">
                <div className="flex flex-wrap gap-1.5 max-w-[150px]">
                    {(member.firmIds || []).map(fId => {
                        const f = firms.find(item => item.id === fId);
                        return (
                            <span key={fId} className="px-2 py-1 rounded-lg bg-brand-gold/10 border border-brand-gold/20 text-[8px] font-black uppercase text-brand-gold">
                                {f?.name}
                            </span>
                        );
                    })}
                </div>
            </td>

            {/* Actions Column */}
            <td className="px-8 py-6 text-right pr-12">
                <div className="flex items-center justify-end gap-3 opacity-0 group-hover/row:opacity-100 transition-opacity">
                    <div className="flex items-center justify-center w-8">
                        {saveStatus === 'saving' && <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />}
                        {saveStatus === 'saved' && <Check size={16} className="text-green-500" />}
                        {saveStatus === 'error' && <AlertTriangle size={16} className="text-red-500" />}
                    </div>
                    <Link
                        href={`/admin/${firmSlug}/people/${member.id}`}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-brand-gold text-brand-dark hover:shadow-lg transition-all"
                        title="Manage Record"
                    >
                        <Settings size={16} />
                    </Link>
                    <button
                        onClick={onDelete}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-red-500/10 text-red-500/40 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete Record"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            </td>
        </>
    );

    if (isNestedInRow) return content;

    return (
        <tr className="group/row transition-colors hover:bg-brand-gray-900/50">
            {content}
        </tr>
    );
}
