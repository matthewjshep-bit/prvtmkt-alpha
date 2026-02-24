"use client";

import { useData } from "@/context/DataContext";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
    Briefcase,
    Users,
    ArrowUpRight,
    TrendingUp,
    Plus,
    Settings,
    LayoutDashboard,
    Shield,
    Building2
} from "lucide-react";

export default function TenantDashboard() {
    const { firms, deals, teamMembers, activities } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    if (!firm) return null;

    const firmDeals = deals.filter(d => d.firmId === firm.id);
    const firmTeam = teamMembers.filter(m => (m.firmIds || []).includes(firm.id));
    const firmActivities = activities.filter(a => a.firmId === firm.id).slice(0, 10);

    const stats = [
        { label: "Firm Assets", value: firmDeals.length, icon: <Briefcase size={20} className="text-brand-gold" />, href: `/admin/${firmSlug}/deals` },
        { label: "Team Members", value: firmTeam.length, icon: <Users size={20} className="text-brand-gold" />, href: `/admin/${firmSlug}/people` },
        { label: "Authorized Users", value: 1, icon: <Shield size={20} className="text-brand-gold" />, href: `/admin/${firmSlug}/users` },
    ];

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">Firm <span className="text-brand-gold">Dashboard</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">{firm.name} // Administrative Hub</p>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href={`/admin/${firmSlug}/deals?add=true`}
                        className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                    >
                        <Plus size={18} />
                        New Deal
                    </Link>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 md:grid-cols-3">
                {stats.map((stat) => (
                    <Link
                        key={stat.label}
                        href={stat.href}
                        className="glass rounded-2xl p-6 border border-white/5 transition-all hover:border-brand-gold/30 hover:scale-[1.02]"
                    >
                        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gray-900 border border-white/5">
                            {stat.icon}
                        </div>
                        <p className="text-xs font-black uppercase tracking-widest text-foreground/40">{stat.label}</p>
                        <div className="mt-2 flex items-end justify-between">
                            <p className="text-4xl font-bold text-white">{stat.value}</p>
                            <ArrowUpRight size={20} className="text-brand-gold/40" />
                        </div>
                    </Link>
                ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                {/* Firm Details Summary */}
                <div className="glass rounded-3xl p-8 border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <Building2 size={120} className="text-brand-gold" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-8">Firm Registry</h3>
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="h-16 w-32 flex items-center justify-center rounded-xl bg-white/5 p-2">
                                <img src={firm.logoUrl || "/master-logo.png"} alt="" className="h-full object-contain" />
                            </div>
                            <div>
                                <h4 className="font-bold text-white text-lg">{firm.name}</h4>
                                <p className="text-xs text-foreground/40 font-bold uppercase tracking-widest">/{firm.slug}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Primary Brand Color</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: firm.primaryColor || '#c5a059' }} />
                                    <span className="text-sm font-bold text-white uppercase">{firm.primaryColor || '#c5a059'}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mb-1">Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                    <span className="text-sm font-bold text-white uppercase">Operational</span>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={`/admin/${firmSlug}/settings`}
                            className="mt-4 w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 py-4 text-xs font-black uppercase tracking-widest text-foreground/40 hover:bg-white/5 hover:text-white transition-all"
                        >
                            <Settings size={16} />
                            View Full Configuration
                        </Link>
                    </div>
                </div>

                {/* Local Activity Feed */}
                <div className="glass rounded-3xl p-8 border border-white/5">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Registry Logs</h3>
                        <TrendingUp size={20} className="text-brand-gold/40" />
                    </div>

                    <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                        {firmActivities.length > 0 ? (
                            firmActivities.map((activity) => (
                                <div key={activity.id} className="relative flex gap-4 pb-6 last:pb-0 before:absolute before:left-[19.5px] before:top-10 before:bottom-0 before:w-px before:bg-white/5 last:before:hidden">
                                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gray-900 border border-white/10 group-hover:border-brand-gold/30 transition-colors">
                                        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold/40" />
                                    </div>
                                    <div className="flex flex-col pt-2">
                                        <p className="text-sm font-bold text-white">{activity.title}</p>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-foreground/30 mt-1">
                                            {new Date(activity.timestamp).toLocaleDateString()} @ {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex h-64 flex-col items-center justify-center text-center">
                                <div className="mb-4 rounded-full bg-brand-gray-900 p-4 border border-white/5">
                                    <LayoutDashboard size={24} className="text-brand-gold/20" />
                                </div>
                                <p className="text-xs font-black uppercase tracking-widest text-foreground/20">Zero local events logged</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
