"use client";

import { useState, Suspense, use } from "react";
import { useData } from "@/context/DataContext";
import { Users, Building2, Mail, ExternalLink, Settings, Save, Check, Plus, X, Linkedin, Phone, Trash2 } from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export default function TenantPeoplePage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantPeopleContent />
        </Suspense>
    );
}

function TenantPeopleContent() {
    const { firms, teamMembers, updateTeamMember, addTeamMember } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);

    const [newPerson, setNewPerson] = useState({
        name: "",
        firmIds: [firm?.id || ""],
        role: "Associate",
        email: "",
        phoneNumber: "",
        linkedInUrl: "",
        imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        bio: ""
    });

    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("add") === "true") {
            setIsAddingPerson(true);
        }
    }, [searchParams]);

    if (!firm) return null;

    const firmTeam = teamMembers.filter(m => (m.firmIds || []).includes(firm.id));

    const handleAddPerson = (e: React.FormEvent) => {
        e.preventDefault();
        const personToAdd = {
            ...newPerson,
            id: `p-${Date.now()}`,
            firmIds: [firm.id],
            slug: newPerson.name.toLowerCase().replace(/\s+/g, '-'),
        };
        addTeamMember(personToAdd);
        setIsAddingPerson(false);
        setNewPerson({
            name: "",
            firmIds: [firm.id],
            role: "Associate",
            email: "",
            phoneNumber: "",
            linkedInUrl: "",
            imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
            bio: ""
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
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">Firm <span className="text-brand-gold">People</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">Coordinate your specialized transaction leadership.</p>
                </div>
                <button
                    onClick={() => setIsAddingPerson(true)}
                    className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                >
                    <Plus size={18} />
                    Onboard Member
                </button>
            </div>

            {/* New Person Modal */}
            {isAddingPerson && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-md p-4">
                    <div className="w-full max-w-2xl rounded-[3rem] border border-white/10 bg-brand-gray-900 p-12 shadow-3xl animate-in zoom-in duration-300">
                        <div className="mb-10 flex items-center justify-between">
                            <h3 className="text-3xl font-bold text-white">Registry <span className="text-brand-gold">Onboarding</span></h3>
                            <button onClick={() => setIsAddingPerson(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddPerson} className="grid grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Full Legal Name</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white outline-none focus:border-brand-gold/50 font-bold"
                                    value={newPerson.name}
                                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Professional Title</label>
                                <input
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white outline-none focus:border-brand-gold/50 font-bold"
                                    value={newPerson.role}
                                    onChange={(e) => setNewPerson({ ...newPerson, role: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white outline-none focus:border-brand-gold/50 font-bold"
                                    value={newPerson.email}
                                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">LinkedIn Profile</label>
                                <input
                                    type="url"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white outline-none focus:border-brand-gold/50 font-bold"
                                    value={newPerson.linkedInUrl}
                                    onChange={(e) => setNewPerson({ ...newPerson, linkedInUrl: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Profile Narrative</label>
                                <textarea
                                    className="w-full h-24 rounded-xl border border-white/5 bg-brand-dark p-4 text-white outline-none focus:border-brand-gold/50 resize-none font-medium text-sm"
                                    value={newPerson.bio}
                                    onChange={(e) => setNewPerson({ ...newPerson, bio: e.target.value })}
                                />
                            </div>

                            <div className="col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Headshot Assets</label>
                                <div className="flex items-center gap-6 p-4 rounded-3xl border border-white/5 bg-brand-dark">
                                    <div className="h-20 w-20 overflow-hidden rounded-2xl border-2 border-brand-gold/20 shadow-lg">
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
                                        <div className="flex h-14 items-center justify-center rounded-xl bg-white/5 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10">
                                            Replace Media
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="col-span-2 h-16 flex items-center justify-center gap-2 rounded-2xl bg-brand-gold text-sm font-black uppercase tracking-widest text-brand-dark transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-[1.02]"
                            >
                                <Plus size={20} />
                                Finalize Onboarding
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {firmTeam.map((member) => (
                    <div key={member.id} className="glass group overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/20 p-8 transition-all hover:border-brand-gold/30">
                        <div className="flex items-center gap-6 mb-8">
                            <div className="group/img relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-4 border-white/5 shadow-2xl">
                                <img src={member.imageURL || ""} alt={member.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover/img:opacity-100">
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
                                    <Plus size={20} className="text-white" />
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <input
                                    type="text"
                                    className="bg-transparent text-xl font-bold text-white outline-none w-full border-b border-transparent focus:border-brand-gold/30 transition-all pb-1"
                                    defaultValue={member.name}
                                    onBlur={(e) => updateTeamMember(member.id, { name: e.target.value })}
                                />
                                <input
                                    type="text"
                                    className="bg-transparent text-[10px] font-black uppercase tracking-widest text-brand-gold/60 outline-none w-full mt-1"
                                    defaultValue={member.role}
                                    onBlur={(e) => updateTeamMember(member.id, { role: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-4 mb-10">
                            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-brand-dark/50 border border-white/5">
                                <Mail size={16} className="text-brand-gold/30" />
                                <input
                                    type="email"
                                    className="bg-transparent text-xs font-bold text-foreground/50 outline-none w-full"
                                    defaultValue={member.email}
                                    onBlur={(e) => updateTeamMember(member.id, { email: e.target.value })}
                                />
                            </div>
                            <div className="flex items-center gap-4 px-4 py-3 rounded-xl bg-brand-dark/50 border border-white/5">
                                <Linkedin size={16} className="text-brand-gold/30" />
                                <input
                                    type="url"
                                    className="bg-transparent text-xs font-bold text-foreground/50 outline-none w-full"
                                    defaultValue={member.linkedInUrl || ""}
                                    placeholder="LinkedIn URL"
                                    onBlur={(e) => updateTeamMember(member.id, { linkedInUrl: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Link
                                href={`/team/${member.slug}`}
                                className="flex-1 h-12 flex items-center justify-center gap-2 rounded-xl bg-white/5 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                            >
                                <ExternalLink size={14} />
                                Portal
                            </Link>
                            <button
                                onClick={() => handleSave(member.id)}
                                disabled={saveStatus[member.id] === 'saving'}
                                className={`h-12 w-12 flex items-center justify-center rounded-xl transition-all ${saveStatus[member.id] === 'saved' ? 'bg-green-500 text-white' : 'bg-brand-gold text-brand-dark'}`}
                            >
                                {saveStatus[member.id] === 'saving' ? <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" /> : saveStatus[member.id] === 'saved' ? <Check size={18} /> : <Save size={18} />}
                            </button>
                            <button className="h-12 w-12 flex items-center justify-center rounded-xl bg-red-500/5 text-red-500/40 hover:bg-red-500/10 hover:text-red-500 transition-all border border-red-500/10">
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

import { useEffect } from "react";
