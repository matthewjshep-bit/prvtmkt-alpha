"use client";

import { useState, Suspense } from "react";
import { useData } from "@/context/DataContext";
import { Users, Building2, Mail, ExternalLink, Settings, Save, Check, Plus, X, Linkedin, Phone } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AdminPeoplePage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <AdminPeopleContent />
        </Suspense>
    );
}

function AdminPeopleContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember, users } = useData();
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);
    const [firmFilter, setFirmFilter] = useState("ALL");
    const [newPerson, setNewPerson] = useState({
        name: "",
        firmIds: [firms[0]?.id || ""],
        role: "Associate",
        email: "",
        phoneNumber: "",
        linkedInUrl: "",
        imageURL: firms[0]?.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        bio: "",
        heroMediaUrl: "",
        userId: ""
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("add") === "true") {
            setIsAddingPerson(true);
        }
    }, [searchParams]);

    const handleAddPerson = (e: React.FormEvent) => {
        e.preventDefault();
        const personToAdd = {
            ...newPerson,
            id: `p-${Date.now()}`,
            slug: newPerson.name.toLowerCase().replace(/\s+/g, '-'),
            firmId: newPerson.firmIds[0] || "",
            order: teamMembers.length,
        };
        addTeamMember(personToAdd);
        setIsAddingPerson(false);
        setNewPerson({
            name: "",
            firmIds: [firms[0]?.id || ""],
            role: "Associate",
            email: "",
            phoneNumber: "",
            linkedInUrl: "",
            imageURL: firms[0]?.logoUrl || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            bio: "",
            heroMediaUrl: "",
            userId: ""
        });
    };

    const handleSave = (id: string) => {
        setSaveStatus({ ...saveStatus, [id]: 'saving' });
        setTimeout(() => {
            setSaveStatus({ ...saveStatus, [id]: 'saved' });
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
            }, 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Platform <span className="text-brand-gold">People</span></h1>
                        <p className="mt-2 text-foreground/50">Manage individual profiles and professional track records.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-3 rounded-xl bg-brand-gray-900 border border-white/5 px-4 py-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-foreground/30">Filter by Firm</span>
                            <select
                                className="bg-transparent text-sm font-bold text-brand-gold outline-none cursor-pointer"
                                value={firmFilter}
                                onChange={(e) => setFirmFilter(e.target.value)}
                            >
                                <option value="ALL">All People</option>
                                {firms.map(f => (
                                    <option key={f.id} value={f.id}>{f.name}</option>
                                ))}
                            </select>
                        </div>
                        <button
                            onClick={() => setIsAddingPerson(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                        >
                            <Plus size={18} />
                            Add Person
                        </button>
                        <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>

                {/* New Person Modal */}
                {isAddingPerson && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Onboard <span className="text-brand-gold">New Person</span></h3>
                                <button onClick={() => setIsAddingPerson(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddPerson} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Full Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        placeholder="e.g. John Doe"
                                        value={newPerson.name}
                                        onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Associated Firms (Multi-Select)</label>
                                    <div className="flex flex-wrap gap-2 p-2 rounded-xl border border-white/5 bg-brand-dark min-h-[50px]">
                                        {(newPerson.firmIds || []).map(fId => {
                                            const firm = firms.find(f => f.id === fId);
                                            return (
                                                <div key={fId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 px-3 py-1.5 text-xs font-bold text-brand-gold border border-brand-gold/20">
                                                    {firm?.name}
                                                    <button
                                                        type="button"
                                                        onClick={() => setNewPerson({ ...newPerson, firmIds: newPerson.firmIds.filter(id => id !== fId) })}
                                                        className="hover:text-white"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        <select
                                            className="bg-transparent border-none text-xs font-bold text-brand-gold outline-none cursor-pointer p-1"
                                            value=""
                                            onChange={(e) => {
                                                const id = e.target.value;
                                                if (id && !newPerson.firmIds.includes(id)) {
                                                    setNewPerson({ ...newPerson, firmIds: [...newPerson.firmIds, id] });
                                                }
                                            }}
                                        >
                                            <option value="" disabled>+ Add Firm</option>
                                            {firms.filter(f => !newPerson.firmIds.includes(f.id)).map(firm => (
                                                <option key={firm.id} value={firm.id}>{firm.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Professional Title</label>
                                        <input
                                            type="text"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                            value={newPerson.role}
                                            onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Email</label>
                                        <input
                                            type="email"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                            value={newPerson.email}
                                            onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Phone Number</label>
                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50" size={16} />
                                            <input
                                                type="tel"
                                                className="w-full rounded-xl border border-white/5 bg-brand-dark pl-12 pr-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                                placeholder="(555) 000-0000"
                                                value={newPerson.phoneNumber}
                                                onChange={(e) => setNewPerson({ ...newPerson, phoneNumber: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">LinkedIn URL</label>
                                        <div className="relative">
                                            <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/50" size={16} />
                                            <input
                                                type="url"
                                                className="w-full rounded-xl border border-white/5 bg-brand-dark pl-12 pr-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                                placeholder="https://linkedin.com/..."
                                                value={newPerson.linkedInUrl}
                                                onChange={(e) => setNewPerson({ ...newPerson, linkedInUrl: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Profile Narrative</label>
                                    <textarea
                                        className="w-full h-24 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 resize-none"
                                        placeholder="Principal professional with a specialization in..."
                                        value={newPerson.bio}
                                        onChange={(e) => setNewPerson({ ...newPerson, bio: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Platform Identity (System User)</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 cursor-pointer"
                                        value={newPerson.userId || ""}
                                        onChange={(e) => setNewPerson({ ...newPerson, userId: e.target.value })}
                                    >
                                        <option value="">None (Standalone Profile)</option>
                                        {users.map(u => (
                                            <option key={u.id} value={u.id}>{u.email} ({u.role})</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Portfolio Hero (Video/Banner)</label>
                                    <div className="group relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/5 bg-brand-dark transition-all hover:border-brand-gold/50">
                                        {newPerson.heroMediaUrl ? (
                                            <>
                                                {newPerson.heroMediaUrl.startsWith('data:video/') || newPerson.heroMediaUrl.includes('video/mp4') || newPerson.heroMediaUrl.includes('video/quicktime') ? (
                                                    <video
                                                        src={newPerson.heroMediaUrl}
                                                        className="h-full w-full object-cover opacity-50"
                                                        muted
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                    />
                                                ) : (
                                                    <img src={newPerson.heroMediaUrl} className="h-full w-full object-cover opacity-50" />
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setNewPerson({ ...newPerson, heroMediaUrl: "" });
                                                    }}
                                                    className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white shadow-xl"
                                                >
                                                    <X size={16} />
                                                </button>
                                            </>
                                        ) : (
                                            <div className="text-center">
                                                <Users className="mx-auto mb-2 text-foreground/20" size={24} />
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Upload Personal Hero</p>
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                            accept="image/*,video/*"
                                            onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        setNewPerson({ ...newPerson, heroMediaUrl: reader.result as string });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Profile Image (Desktop Upload)</label>
                                    <div className="flex items-center gap-4">
                                        <div className="h-16 w-16 overflow-hidden rounded-2xl border border-white/10 bg-brand-dark">
                                            <img src={newPerson.imageURL} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="relative flex-1">
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
                                            <div className="flex items-center justify-center rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/5">
                                                <Plus size={14} className="mr-2" />
                                                Choose File
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 mt-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                                >
                                    <Plus size={18} />
                                    Add Person to Platform
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {teamMembers
                        .filter(member => firmFilter === "ALL" || (member.firmIds || []).includes(firmFilter))
                        .map((member) => {
                            return (
                                <div key={member.id} className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 p-6 transition-all hover:border-brand-gold/20">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="group relative h-16 w-16 overflow-hidden rounded-2xl border-2 border-brand-gold/10">
                                            <img src={member.imageURL || ""} alt={member.name} className="h-full w-full object-cover" />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="absolute inset-0 cursor-pointer opacity-0"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                updateTeamMember(member.id, { imageURL: reader.result as string });
                                                            };
                                                            reader.readAsDataURL(file);
                                                        }
                                                    }}
                                                />
                                                <Plus size={16} className="text-white" />
                                            </div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Full Name</span>
                                                <input
                                                    type="text"
                                                    className="bg-transparent border-b border-white/5 text-lg font-bold text-white focus:border-brand-gold focus:border-b-2 outline-none w-full transition-all"
                                                    defaultValue={member.name}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== member.name) {
                                                            updateTeamMember(member.id, { name: e.target.value });
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            (e.target as HTMLInputElement).blur();
                                                        }
                                                    }}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1 mt-2">
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Professional Title</span>
                                                <input
                                                    type="text"
                                                    className="bg-transparent border-b border-white/5 text-xs font-bold text-brand-gold/70 focus:border-brand-gold focus:border-b-2 outline-none w-full transition-all"
                                                    defaultValue={member.role}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== member.role) {
                                                            updateTeamMember(member.id, { role: e.target.value });
                                                        }
                                                    }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') {
                                                            (e.target as HTMLInputElement).blur();
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-3 mb-8">
                                        <div className="flex flex-col gap-1.5">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Associated Firms (Multi-Select)</span>
                                            <div className="flex flex-wrap gap-2 rounded-xl border border-white/5 bg-brand-dark p-2 min-h-[42px]">
                                                {(member.firmIds || []).map(fId => {
                                                    const firm = firms.find(f => f.id === fId);
                                                    return (
                                                        <div key={fId} className="flex items-center gap-1.5 rounded-lg bg-brand-gold/10 px-2 py-1 text-[10px] font-bold text-brand-gold border border-brand-gold/20">
                                                            {firm?.name}
                                                            <button
                                                                onClick={() => updateTeamMember(member.id, { firmIds: (member.firmIds || []).filter(id => id !== fId) })}
                                                                className="hover:text-white"
                                                            >
                                                                <X size={10} />
                                                            </button>
                                                        </div>
                                                    );
                                                })}
                                                <select
                                                    className="bg-transparent border-none text-[10px] font-bold text-brand-gold outline-none cursor-pointer p-1"
                                                    value=""
                                                    onChange={(e) => {
                                                        const id = e.target.value;
                                                        if (id && !(member.firmIds || []).includes(id)) {
                                                            updateTeamMember(member.id, { firmIds: [...(member.firmIds || []), id] });
                                                        }
                                                    }}
                                                >
                                                    <option value="" disabled>+ Link Firm</option>
                                                    {firms.filter(f => !member.firmIds.includes(f.id)).map(firm => (
                                                        <option key={firm.id} value={firm.id}>{firm.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Email Address</span>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark px-3 py-2 text-sm text-foreground/60 focus-within:border-brand-gold/50 transition-all">
                                                <Mail size={16} className="text-brand-gold/50" />
                                                <input
                                                    type="email"
                                                    className="bg-transparent outline-none w-full text-white"
                                                    defaultValue={member.email}
                                                    onBlur={(e) => {
                                                        if (e.target.value !== member.email) {
                                                            updateTeamMember(member.id, { email: e.target.value });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">LinkedIn Profile</span>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark px-3 py-2 text-sm text-foreground/60 focus-within:border-brand-gold/50 transition-all">
                                                <Linkedin size={16} className="text-brand-gold/50" />
                                                <input
                                                    type="url"
                                                    className="bg-transparent outline-none w-full text-white"
                                                    defaultValue={member.linkedInUrl || ""}
                                                    placeholder="https://linkedin.com/in/..."
                                                    onBlur={(e) => {
                                                        if (e.target.value !== member.linkedInUrl) {
                                                            updateTeamMember(member.id, { linkedInUrl: e.target.value });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Phone Number</span>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark px-3 py-2 text-sm text-foreground/60 focus-within:border-brand-gold/50 transition-all">
                                                <Phone size={16} className="text-brand-gold/50" />
                                                <input
                                                    type="tel"
                                                    className="bg-transparent outline-none w-full text-white"
                                                    defaultValue={member.phoneNumber || ""}
                                                    placeholder="(555) 000-0000"
                                                    onBlur={(e) => {
                                                        if (e.target.value !== member.phoneNumber) {
                                                            updateTeamMember(member.id, { phoneNumber: e.target.value });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Profile Narrative</span>
                                            <textarea
                                                className="w-full h-20 rounded-xl border border-white/5 bg-brand-dark px-3 py-2 text-xs text-foreground/70 outline-none focus:border-brand-gold/50 transition-all resize-none"
                                                defaultValue={member.bio}
                                                onBlur={(e) => {
                                                    if (e.target.value !== member.bio) {
                                                        updateTeamMember(member.id, { bio: e.target.value });
                                                    }
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-1.5 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/60">Platform Identity Connection</span>
                                            <div className="flex items-center gap-3 rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-3 py-2 text-sm text-foreground/60 focus-within:border-brand-gold/50 transition-all">
                                                <Users size={16} className="text-brand-gold/50" />
                                                <select
                                                    className="bg-transparent outline-none w-full text-white cursor-pointer"
                                                    value={member.userId || ""}
                                                    onChange={(e) => updateTeamMember(member.id, { userId: e.target.value || null })}
                                                >
                                                    <option value="" className="bg-brand-gray-900">None (Standalone Profile)</option>
                                                    {users.map(u => (
                                                        <option key={u.id} value={u.id} className="bg-brand-gray-900">{u.email} ({u.role})</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-1.5 px-3">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/30">Portfolio Hero (Video/Banner)</span>
                                            <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-brand-dark">
                                                {member.heroMediaUrl ? (
                                                    <div className="h-full w-full">
                                                        {(member.heroMediaUrl.startsWith('data:video/') || member.heroMediaUrl.includes('video/mp4') || member.heroMediaUrl.includes('video/quicktime')) ? (
                                                            <video
                                                                key={member.heroMediaUrl.slice(-32)}
                                                                src={member.heroMediaUrl}
                                                                className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                                                                muted
                                                                loop
                                                                autoPlay
                                                                playsInline
                                                            />
                                                        ) : (
                                                            <img src={member.heroMediaUrl} className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105" />
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex h-full flex-col items-center justify-center text-foreground/20 italic text-[9px]">
                                                        <Users size={18} className="mb-1" />
                                                        No Hero Media
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <label className="cursor-pointer font-bold text-[9px] text-white bg-brand-gold/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-brand-gold/40 transition-colors">
                                                        <Save size={12} />
                                                        {member.heroMediaUrl ? 'Replace' : 'Upload'}
                                                        <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => updateTeamMember(member.id, { heroMediaUrl: reader.result as string });
                                                                reader.readAsDataURL(file);
                                                                setSaveStatus({ ...saveStatus, [member.id]: 'idle' });
                                                            }
                                                        }} />
                                                    </label>
                                                    {member.heroMediaUrl && (
                                                        <button
                                                            onClick={() => updateTeamMember(member.id, { heroMediaUrl: "" })}
                                                            className="font-bold text-[9px] text-white bg-red-500/20 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-red-500/40 transition-colors"
                                                        >
                                                            <X size={12} />
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link
                                            href={`/team/${member.slug}`}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-gray-800 py-3 text-xs font-bold text-white transition-all hover:bg-brand-gray-700"
                                        >
                                            <ExternalLink size={14} />
                                            Public Profile
                                        </Link>
                                        <button
                                            onClick={() => handleSave(member.id)}
                                            disabled={saveStatus[member.id] === 'saving'}
                                            className={`rounded-xl px-4 py-3 text-sm font-bold transition-all ${saveStatus[member.id] === 'saved'
                                                ? 'bg-green-500 text-white'
                                                : 'bg-brand-gold text-brand-dark hover:shadow-lg hover:shadow-brand-gold/30'
                                                } ${saveStatus[member.id] === 'saving' ? 'opacity-70 cursor-wait' : ''}`}
                                        >
                                            {saveStatus[member.id] === 'saving' ? (
                                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                                            ) : saveStatus[member.id] === 'saved' ? (
                                                <Check size={16} />
                                            ) : (
                                                <Save size={16} />
                                            )}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
