"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Users, Building2, Mail, ExternalLink, Settings, Save, Check } from "lucide-react";
import Link from "next/link";

export default function AdminPeoplePage() {
    const { firms, teamMembers, updateTeamMember } = useData();
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});

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
                    <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white">
                        Return to Dashboard
                    </Link>
                </div>

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
                                        <input
                                            type="text"
                                            className="bg-transparent border-b border-white/10 text-lg font-bold text-white focus:border-brand-gold outline-none w-full mb-1"
                                            value={member.name}
                                            onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                                        />
                                        <p className="text-xs text-brand-gold font-medium">{member.role}</p>
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
