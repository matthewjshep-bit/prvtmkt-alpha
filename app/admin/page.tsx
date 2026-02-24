"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    ArrowUpRight,
    Plus,
    Settings,
    X,
    Save,
    UserPlus
} from "lucide-react";

export default function AdminDashboard() {
    const data = useData();
    const { firms, deals, teamMembers, addFirm, activities } = data;

    // Debug log
    if (typeof window !== 'undefined' && !addFirm) {
        console.error("AdminDashboard: addFirm is undefined!", data);
    }

    const [isAddingFirm, setIsAddingFirm] = useState(false);
    const [newFirm, setNewFirm] = useState({
        name: "",
        logoUrl: "",
        primaryColor: "#c5a059"
    });

    const handleAddFirm = (e: React.FormEvent) => {
        e.preventDefault();
        const firmToAdd = {
            ...newFirm,
            id: `f-${Date.now()}`,
            slug: newFirm.name.toLowerCase().replace(/\s+/g, '-'),
        };
        addFirm(firmToAdd);
        setIsAddingFirm(false);
        setNewFirm({ name: "", logoUrl: "", primaryColor: "#c5a059" });
    };

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
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/deals?add=true"
                            className="flex items-center gap-2 rounded-xl border-2 border-brand-gold/30 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                        >
                            <Briefcase size={18} />
                            Add New Deal
                        </Link>
                        <Link
                            href="/admin/people?add=true"
                            className="flex items-center gap-2 rounded-xl border-2 border-brand-gold/30 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                        >
                            <UserPlus size={18} />
                            Generate New Member
                        </Link>
                        <button
                            onClick={() => setIsAddingFirm(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                        >
                            <Plus size={18} />
                            Generate New Firm
                        </button>
                    </div>
                </div>

                {/* New Firm Modal */}
                {isAddingFirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Generate <span className="text-brand-gold">New Firm</span></h3>
                                <button onClick={() => setIsAddingFirm(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddFirm} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Firm Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        placeholder="e.g. Blackstone"
                                        value={newFirm.name}
                                        onChange={(e) => setNewFirm({ ...newFirm, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Primary Color (Hex)</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            className="flex-1 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                            placeholder="#c5a059"
                                            value={newFirm.primaryColor}
                                            onChange={(e) => setNewFirm({ ...newFirm, primaryColor: e.target.value })}
                                        />
                                        <div className="h-12 w-12 rounded-xl border border-white/10" style={{ backgroundColor: newFirm.primaryColor }} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                                >
                                    <Save size={18} />
                                    Create Firm Entity
                                </button>
                            </form>
                        </div>
                    </div>
                )}

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

                    {/* Global Activity Feed */}
                    <div className="glass rounded-3xl p-8 border border-white/5">
                        <h3 className="mb-6 text-xl font-bold text-white">Global Activity</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {activities.length > 0 ? (
                                activities.map((activity) => {
                                    const firm = firms.find(f => f.id === activity.firmId);
                                    return (
                                        <div key={activity.id} className="relative flex gap-4 pb-6 before:absolute before:left-[19px] before:top-10 before:bottom-0 before:w-px before:bg-white/5 last:pb-0 last:before:hidden">
                                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gray-900 border border-white/10">
                                                {firm?.logoUrl ? (
                                                    <img src={firm.logoUrl} alt="" className="h-6 w-6 object-contain opacity-50" />
                                                ) : (
                                                    <LayoutDashboard size={18} className="text-brand-gold/30" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-white">{activity.title}</p>
                                                    <span className="text-[10px] text-foreground/30 font-medium">
                                                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60">
                                                    {firm?.name || 'Platform System'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex h-64 flex-col items-center justify-center text-center">
                                    <div className="mb-4 rounded-full bg-brand-gray-900 p-4">
                                        <LayoutDashboard size={32} className="text-brand-gold/30" />
                                    </div>
                                    <p className="text-sm text-foreground/50">System-wide activity logs will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
