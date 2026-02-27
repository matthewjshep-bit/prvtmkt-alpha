"use client";

import { useState, Suspense, useEffect } from "react";
import { useData } from "@/context/DataContext";
import { Users, Mail, ExternalLink, Save, Check, Plus, X, Linkedin, Phone } from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export default function TenantGalleryEditorPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantGalleryEditorContent />
        </Suspense>
    );
}

function TenantGalleryEditorContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember, isInitialized } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);

    // Filter members for this firm
    const firmMembers = teamMembers.filter(m => (m.firmIds || []).includes(firm?.id || ""));

    const [newPerson, setNewPerson] = useState({
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
        if (firm && newPerson.firmIds[0] === "") {
            setNewPerson(prev => ({ ...prev, firmIds: [firm.id], imageURL: firm.logoUrl || prev.imageURL }));
        }
    }, [firm, newPerson.firmIds]);

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
            slug: (newPerson.name || "new-member").toLowerCase().replace(/\s+/g, '-'),
            firmId: firm?.id || "",
        };
        addTeamMember(personToAdd);
        setIsAddingPerson(false);
        setNewPerson({
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
    };

    const handleSave = (id: string) => {
        const member = teamMembers.find(m => m.id === id);
        if (!member) return;

        setSaveStatus({ ...saveStatus, [id]: 'saving' });
        updateTeamMember(id, member).then(() => {
            setSaveStatus({ ...saveStatus, [id]: 'saved' });
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
            }, 2000);
        });
    };

    if (!isInitialized || !firm) {
        return <div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>;
    }

    return (
        <div className="min-h-screen bg-brand-dark pb-20">
            <div className="container mx-auto">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Gallery <span className="text-brand-gold">Editor</span></h1>
                        <p className="mt-2 text-foreground/50">Manage your firm's professional profiles in a grid view.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsAddingPerson(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                        >
                            <Plus size={18} />
                            Add Team Member
                        </button>
                    </div>
                </div>

                {/* New Person Modal */}
                {isAddingPerson && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Onboard <span className="text-brand-gold">Member</span></h3>
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
                                    Add Member to Team
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {firmMembers.map((member) => (
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
                    ))}
                </div>
            </div>
        </div>
    );
}
