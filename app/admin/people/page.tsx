"use client";

import { MOCK_TEAM_MEMBERS, MOCK_FIRMS } from "@/lib/mock-data";
import { Users, Building2, Mail, ExternalLink, Settings } from "lucide-react";
import Link from "next/link";

export default function AdminPeoplePage() {
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
                    {MOCK_TEAM_MEMBERS.map((member) => {
                        const firm = MOCK_FIRMS.find(f => f.id === member.firmId);
                        return (
                            <div key={member.id} className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 p-6 transition-all hover:border-brand-gold/20">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="h-16 w-16 overflow-hidden rounded-2xl border-2 border-brand-gold/10">
                                        <img src={member.imageURL || ""} alt={member.name} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white">{member.name}</h3>
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
                                    <button className="rounded-xl bg-brand-dark border border-white/5 p-3 text-foreground/40 transition-all hover:text-brand-gold">
                                        <Settings size={16} />
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
