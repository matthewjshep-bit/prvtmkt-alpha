"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Users, Building2, Mail, ExternalLink, Settings, Save, Check, Plus, X } from "lucide-react";
import Link from "next/link";

export default function AdminPeoplePage() {
    const { firms, teamMembers, updateTeamMember, addTeamMember } = useData();
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});
    const [isAddingPerson, setIsAddingPerson] = useState(false);
    const [newPerson, setNewPerson] = useState({
        name: "",
        firmId: firms[0]?.id || "",
        role: "Associate",
        email: "",
        imageURL: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        bio: ""
    });

    const handleAddPerson = (e: React.FormEvent) => {
        e.preventDefault();
        const personToAdd = {
            ...newPerson,
            id: `p-${Date.now()}`,
            slug: newPerson.name.toLowerCase().replace(/\s+/g, '-'),
        };
        addTeamMember(personToAdd);
        setIsAddingPerson(false);
        setNewPerson({
            name: "",
            firmId: firms[0]?.id || "",
            role: "Associate",
            email: "",
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
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Platform <span className="text-brand-gold">People</span></h1>
                        <p className="mt-2 text-foreground/50">Manage individual profiles and professional track records.</p>
                    </div>
                    <div className="flex items-center gap-4">
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
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Associated Firm</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        value={newPerson.firmId}
                                        onChange={(e) => setNewPerson({ ...newPerson, firmId: e.target.value })}
                                    >
                                        {firms.map(firm => (
                                            <option key={firm.id} value={firm.id}>{firm.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Role</label>
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
                    {teamMembers.map((member) => {
                        const firm = firms.find(f => f.id === member.firmId);
                        return (
                            <div key={member.id} className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 p-6 transition-all hover:border-brand-gold/20">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-brand-gold/10">
                                        <img src={member.imageURL || ""} alt={member.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold/40">Name</span>
                                            <input
                                                type="text"
                                                className="bg-transparent border-b border-white/5 text-lg font-bold text-white focus:border-brand-gold focus:border-b-2 outline-none w-full transition-all"
                                                value={member.name}
                                                onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-brand-gold/70 font-medium italic">{member.role}</p>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-8">
                                    <div className="flex items-center gap-3 text-sm text-foreground/60">
                                        <Building2 size={16} className="text-brand-gold/50" />
                                        {firm?.name}
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-foreground/60">
                                        <Mail size={16} className="text-brand-gold/50" />
                                        {member.email}
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
