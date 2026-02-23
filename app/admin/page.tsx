"use client";

import Link from "next/link";
import { useData } from "@/context/DataContext";
import { LayoutDashboard, Building2, Briefcase, Users, ArrowUpRight, Plus, Settings } from "lucide-react";

export default function AdminDashboard() {
    const { firms, deals, teamMembers } = useData();
    const stats = [
        { label: "Total Firms", value: firms.length, icon: <Building2 className="text-brand-gold" size={20} />, href: "/admin/firms" },
        { label: "Total Deals", value: deals.length, icon: <Briefcase className="text-brand-gold" size={20} />, href: "/admin/deals" },
        { label: "Active Team Members", value: teamMembers.length, icon: <Users className="text-brand-gold" size={20} />, href: "/admin/people" },
    ];

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">System <span className="text-brand-gold">Admin</span></h1>
                        <p className="mt-2 text-foreground/50">Manage platform entities and global configurations.</p>
                    </div>
                    <button className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20">
                        <Plus size={18} />
                        Generate New Firm
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="mb-12 grid gap-6 md:grid-cols-3">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="glass rounded-2xl p-6 transition-all hover:border-brand-gold/30"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gray-900 border border-white/5">
                                {stat.icon}
                            </div>
                            <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">{stat.label}</p>
                            <div className="mt-1 flex items-end justify-between">
                                <p className="text-4xl font-bold text-white">{stat.value}</p>
                                <ArrowUpRight size={20} className="text-brand-gold" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Recent Firms */}
                    <div className="glass rounded-3xl p-8 border border-white/5">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Manage Firms</h3>
                            <Link href="/admin/firms" className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {firms.slice(0, 5).map((firm) => (
                                <div key={firm.id} className="flex items-center justify-between rounded-xl bg-brand-gray-900/50 p-4 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-24 flex items-center justify-center rounded-lg bg-white/5 p-1">
                                            <img src={firm.logoUrl || "/master-logo.png"} alt={firm.name} className="h-full object-contain" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{firm.name}</h4>
                                            <p className="text-xs text-foreground/40">/{firm.slug}</p>
                                        </div>
                                    </div>
                                    <Link href={`/admin/firms`} className="rounded-lg p-2 text-foreground/40 transition-all hover:bg-brand-gray-800 hover:text-brand-gold">
                                        <Settings size={18} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions / Activity Placeholder */}
                    <div className="glass rounded-3xl p-8 border border-white/5">
                        <h3 className="mb-6 text-xl font-bold text-white">Global Activity</h3>
                        <div className="flex h-64 flex-col items-center justify-center text-center">
                            <div className="mb-4 rounded-full bg-brand-gray-900 p-4">
                                <LayoutDashboard size={32} className="text-brand-gold/30" />
                            </div>
                            <p className="text-sm text-foreground/40">System-wide activity logs will appear here.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
