"use client";

import { useState } from "react";
import { MOCK_FIRMS } from "@/lib/mock-data";
import { Building2, Save, Upload, ExternalLink, Shield } from "lucide-react";
import Link from "next/link";

export default function AdminFirmsPage() {
    const [firms, setFirms] = useState(MOCK_FIRMS);
    const [editingId, setEditingId] = useState<string | null>(null);

    const handleUpdateLogo = (id: string, newUrl: string) => {
        setFirms(firms.map(f => f.id === id ? { ...f, logoUrl: newUrl } : f));
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
                                                <input type="file" className="hidden" />
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Details Section */}
                                <div className="lg:col-span-6">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Building2 size={20} className="text-brand-gold" />
                                        <h2 className="text-2xl font-bold text-white">{firm.name}</h2>
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
                                    <button className="flex items-center gap-2 rounded-xl bg-brand-gold px-5 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30">
                                        <Save size={16} />
                                        Update
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
