"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Building2, Save, Upload, ExternalLink, Shield, Check } from "lucide-react";
import Link from "next/link";

export default function AdminFirmsPage() {
    const { firms, teamMembers, updateFirm, updateTeamMember } = useData();
    const [editingId, setEditingId] = useState<string | null>(null);
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});

    const handleUpdateLogo = (id: string, newUrl: string) => {
        updateFirm(id, { logoUrl: newUrl });
        // Reset save status if logo changed
        setSaveStatus({ ...saveStatus, [id]: 'idle' });
    };

    const handleSave = (id: string) => {
        setSaveStatus({ ...saveStatus, [id]: 'saving' });

        // Data is already updated in context via handleUpdateLogo
        // This just mocks the "saving" process for user feedback
        setTimeout(() => {
            setSaveStatus({ ...saveStatus, [id]: 'saved' });

            // Revert to idle after 2 seconds
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
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                            <Shield size={14} />
                            Admin Access
                        </div>
                        <h1 className="text-4xl font-bold text-white">Manage <span className="text-brand-gold">Firms</span></h1>
                    </div>
                    <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white">
                        Return to Dashboard
                    </Link>
                </div>

                <div className="space-y-6">
                    {firms.map((firm) => (
                        <div key={firm.id} className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 p-8 transition-all hover:border-brand-gold/20">
                            <div className="grid gap-8 lg:grid-cols-12 lg:items-center">

                                {/* Logo Section */}
                                <div className="lg:col-span-3">
                                    <div className="relative mb-4 flex h-24 w-full items-center justify-center rounded-2xl bg-white/5 p-4 border border-white/5 overflow-hidden">
                                        <img
                                            src={firm.logoUrl || "/master-logo.png"}
                                            alt={firm.name}
                                            className="h-full object-contain"
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80 opacity-0 transition-opacity group-hover:opacity-100">
                                            <label className="cursor-pointer font-bold text-xs text-brand-gold flex items-center gap-2">
                                                <Upload size={14} />
                                                Change Logo
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept="image/*"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0];
                                                        if (file) {
                                                            const url = URL.createObjectURL(file);
                                                            handleUpdateLogo(firm.id, url);
                                                        }
                                                    }}
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="lg:col-span-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <Building2 size={20} className="text-brand-gold" />
                                        <input
                                            type="text"
                                            className="bg-transparent border-b border-white/10 text-2xl font-bold text-white focus:border-brand-gold outline-none w-full"
                                            value={firm.name}
                                            onChange={(e) => updateFirm(firm.id, { name: e.target.value })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="rounded-lg bg-brand-dark px-3 py-1.5 text-xs border border-white/5">
                                            <span className="text-foreground/40 font-medium">Slug:</span> <span className="text-foreground font-bold">/{firm.slug}</span>
                                        </div>
                                        <div className="rounded-lg bg-brand-dark px-3 py-1.5 text-xs border border-white/5 flex items-center gap-2">
                                            <span className="text-foreground/40 font-medium">Brand Color:</span>
                                            <div className="h-3 w-3 rounded-full" style={{ backgroundColor: firm.primaryColor || '#c5a059' }} />
                                            <span className="text-foreground font-bold">{firm.primaryColor}</span>
                                        </div>
                                    </div>

                                    {/* Team Members Section */}
                                    <div className="mt-6 border-t border-white/5 pt-4">
                                        <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-foreground/30">Associated Team</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {teamMembers.filter(m => m.firmId === firm.id).map(member => (
                                                <div key={member.id} className="flex items-center gap-2 rounded-lg bg-white/5 p-2 pr-3 border border-white/5 group/member">
                                                    <div className="h-6 w-6 overflow-hidden rounded-md border border-white/10">
                                                        <img src={member.imageURL} alt={member.name} className="h-full w-full object-cover" />
                                                    </div>
                                                    <input
                                                        type="text"
                                                        className="bg-transparent text-xs font-bold text-white outline-none focus:border-b focus:border-brand-gold w-24"
                                                        value={member.name}
                                                        onChange={(e) => updateTeamMember(member.id, { name: e.target.value })}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Actions Section */}
                                <div className="lg:col-span-3 flex justify-end gap-3">
                                    <Link
                                        href={`/${firm.slug}`}
                                        target="_blank"
                                        className="flex items-center gap-2 rounded-xl bg-brand-gray-800 px-5 py-3 text-sm font-bold text-white transition-all hover:bg-brand-gray-700"
                                    >
                                        <ExternalLink size={16} />
                                        View Live
                                    </Link>
                                    <button
                                        onClick={() => handleSave(firm.id)}
                                        disabled={saveStatus[firm.id] === 'saving'}
                                        className={`flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-bold transition-all ${saveStatus[firm.id] === 'saved'
                                            ? 'bg-green-500 text-white'
                                            : 'bg-brand-gold text-brand-dark hover:shadow-lg hover:shadow-brand-gold/30'
                                            } ${saveStatus[firm.id] === 'saving' ? 'opacity-70 cursor-wait' : ''}`}
                                    >
                                        {saveStatus[firm.id] === 'saving' ? (
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                                        ) : saveStatus[firm.id] === 'saved' ? (
                                            <Check size={16} />
                                        ) : (
                                            <Save size={16} />
                                        )}
                                        {saveStatus[firm.id] === 'saving' ? 'Saving...' : saveStatus[firm.id] === 'saved' ? 'Saved' : 'Update'}
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
