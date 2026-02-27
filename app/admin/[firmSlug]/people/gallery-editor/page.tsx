"use client";

import { useState, Suspense, useEffect, useRef } from "react";
import { useData, TeamMember, Firm } from "@/context/DataContext";
import {
    Users, Mail, ExternalLink, Save, Check, Plus, X,
    Linkedin, Phone, LayoutGrid, List, Trash2,
    Building2, Globe, Info, Camera, Image as ImageIcon, Video,
    GripVertical
} from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import RichTextEditor from "@/components/RichTextEditor";
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

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
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
            setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
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
        <div className="min-h-screen bg-brand-dark pb-24 overflow-x-hidden">
            <div className="px-4 md:px-8 lg:px-12 mx-auto max-w-[1700px]">
                {/* Header Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
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
                                    />
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    ) : (
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
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[300px]">Identity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap">Hero</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[250px]">Connectivity</th>
                                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.2em] text-white/20 whitespace-nowrap min-w-[350px]">Narrative</th>
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
                                                isNestedInRow
                                            />
                                        </Reorder.Item>
                                    ))}
                                </tbody>
                            </table>
                        </Reorder.Group>
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
function GridMemberCard({ member, firms, onUpdate, onDelete, saveStatus, currentUser }: {
    member: TeamMember,
    firms: Firm[],
    onUpdate: (updates: Partial<TeamMember>) => void,
    onDelete: () => void,
    saveStatus: 'idle' | 'saving' | 'saved',
    currentUser: any
}) {
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

            {/* Portfolio Hero Media */}
            <div className="space-y-3 mb-6">
                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Portfolio Hero</label>
                <div
                    className="aspect-[21/9] rounded-2xl border border-white/5 bg-black/40 overflow-hidden relative group/hero flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-brand-gold/20 transition-all"
                    onClick={() => heroInputRef.current?.click()}
                >
                    {member.heroMediaUrl ? (
                        <img src={member.heroMediaUrl} className="absolute inset-0 h-full w-full object-cover opacity-50" />
                    ) : (
                        <div className="flex flex-col items-center gap-1 opacity-20">
                            <ImageIcon size={16} />
                            <span className="text-[8px] font-black uppercase tracking-widest text-white">No Media</span>
                        </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/hero:opacity-100 transition-opacity bg-black/40">
                        <Video size={16} className="text-brand-gold" />
                    </div>
                </div>
                <input ref={heroInputRef} type="file" hidden accept="video/*,image/*" onChange={(e) => handleImageUpload(e, 'heroMediaUrl')} />
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

            {/* Connectivity Section */}
            <div className="space-y-4 flex-1">
                <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Email Connection</label>
                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 h-12 text-sm text-foreground/60 transition-all focus-within:border-brand-gold/30">
                        <Mail size={16} className="text-brand-gold/40" />
                        <input
                            type="email"
                            className="bg-transparent outline-none w-full text-white font-bold"
                            value={member.email || ""}
                            onChange={(e) => onUpdate({ email: e.target.value })}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">LinkedIn</label>
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 h-12 text-sm text-foreground/60 transition-all focus-within:border-brand-gold/30">
                            <Linkedin size={16} className="text-brand-gold/40" />
                            <input
                                type="text"
                                className="bg-transparent outline-none w-full text-white font-bold"
                                value={member.linkedInUrl || ""}
                                onChange={(e) => onUpdate({ linkedInUrl: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Phone</label>
                        <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-black/20 px-4 h-12 text-sm text-foreground/60 transition-all focus-within:border-brand-gold/30">
                            <Phone size={16} className="text-brand-gold/40" />
                            <input
                                type="text"
                                className="bg-transparent outline-none w-full text-white font-bold"
                                value={member.phoneNumber || ""}
                                onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Profile Narrative</label>
                    <textarea
                        className="w-full h-24 rounded-2xl border border-white/5 bg-black/20 p-4 text-xs font-medium text-white/60 outline-none focus:border-brand-gold/30 transition-all resize-none custom-scrollbar"
                        value={member.bio}
                        onChange={(e) => onUpdate({ bio: e.target.value })}
                        placeholder="Professional summary..."
                    />
                </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 flex gap-3">
                <Link
                    href={`/team/${member.slug}`}
                    className="flex-1 flex items-center justify-center gap-3 h-14 rounded-2xl bg-brand-dark/50 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 transition-all hover:bg-brand-gray-800 hover:text-white"
                >
                    <ExternalLink size={14} />
                    View Profile
                </Link>
                <div className="relative group">
                    {saveStatus === 'saved' ? (
                        <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-green-500 text-white shadow-xl shadow-green-500/20">
                            <Check size={20} />
                        </div>
                    ) : (
                        <button
                            onClick={onDelete}
                            className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/20 border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                    {saveStatus === 'saving' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-gray-900/80 rounded-2xl">
                            <div className="h-5 w-5 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

// Sub-component: High-density list row
function ListMemberRow({ member, firms, onUpdate, onDelete, saveStatus, currentUser, isNestedInRow }: {
    member: TeamMember,
    firms: Firm[],
    onUpdate: (updates: Partial<TeamMember>) => void,
    onDelete: () => void,
    saveStatus: 'idle' | 'saving' | 'saved',
    currentUser: any,
    isNestedInRow?: boolean
}) {
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

            {/* Hero Media Column */}
            <td className="px-8 py-6">
                <div
                    className="h-10 w-24 rounded-lg bg-black/40 border border-white/10 overflow-hidden relative group/list-hero cursor-pointer flex items-center justify-center transition-all hover:border-brand-gold/20"
                    onClick={() => {
                        const input = document.createElement('input');
                        input.type = 'file';
                        input.accept = 'image/*,video/*';
                        input.onchange = (e) => {
                            const file = (e.target as HTMLInputElement).files?.[0];
                            if (file) {
                                const reader = new FileReader();
                                reader.onloadend = () => onUpdate({ heroMediaUrl: reader.result as string });
                                reader.readAsDataURL(file);
                            }
                        };
                        input.click();
                    }}
                >
                    {member.heroMediaUrl ? (
                        <img src={member.heroMediaUrl} className="h-full w-full object-cover opacity-50" />
                    ) : (
                        <ImageIcon size={14} className="text-white/10" />
                    )}
                    <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover/list-hero:opacity-100 transition-opacity flex items-center justify-center">
                        <Camera size={12} className="text-brand-dark" />
                    </div>
                </div>
            </td>

            {/* Connectivity Column */}
            <td className="px-8 py-6">
                <div className="flex flex-col gap-2 min-w-[200px]">
                    <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 focus-within:border-brand-gold/30 transition-all">
                        <Mail size={12} className="text-brand-gold/40" />
                        <input
                            type="email"
                            className="bg-transparent border-none text-[11px] font-bold text-white outline-none w-full p-0"
                            value={member.email || ""}
                            onChange={(e) => onUpdate({ email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 focus-within:border-brand-gold/30 transition-all">
                        <Linkedin size={12} className="text-brand-gold/40" />
                        <input
                            type="text"
                            className="bg-transparent border-none text-[11px] font-bold text-white outline-none w-full p-0"
                            value={member.linkedInUrl || ""}
                            onChange={(e) => onUpdate({ linkedInUrl: e.target.value })}
                            placeholder="LinkedIn URL"
                        />
                    </div>
                    <div className="flex items-center gap-3 bg-black/20 border border-white/5 rounded-lg px-3 py-1.5 focus-within:border-brand-gold/30 transition-all">
                        <Phone size={12} className="text-brand-gold/40" />
                        <input
                            type="text"
                            className="bg-transparent border-none text-[11px] font-bold text-white outline-none w-full p-0"
                            value={member.phoneNumber || ""}
                            onChange={(e) => onUpdate({ phoneNumber: e.target.value })}
                            placeholder="Phone Number"
                        />
                    </div>
                </div>
            </td>

            {/* Narrative Column */}
            <td className="px-8 py-6">
                <textarea
                    className="w-full min-w-[250px] h-20 rounded-xl border border-white/5 bg-black/20 p-3 text-[11px] font-medium text-white/60 outline-none focus:border-brand-gold/30 transition-all resize-none custom-scrollbar"
                    value={member.bio}
                    onChange={(e) => onUpdate({ bio: e.target.value })}
                    placeholder="Narrative..."
                />
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
                    </div>
                    <Link
                        href={`/team/${member.slug}`}
                        className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 text-white/30 hover:bg-white/10 hover:text-white transition-all"
                        title="View Live Profile"
                    >
                        <ExternalLink size={16} />
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
