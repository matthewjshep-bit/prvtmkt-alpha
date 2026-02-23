"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import { formatCurrency } from "@/lib/utils";
import { MapPin, TrendingUp, Maximize2, Layers, Calendar, ChevronLeft, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function DealPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { deals, teamMembers } = useData();

    const deal = deals.find((d) => d.id === id);

    if (!deal) {
        // Since this is a client component, we might need a better way to handle notFound 
        // if the deal is truly missing vs just loading.
        // For now, let's just return a placeholder or redirect.
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Deal Not Found</h2>
                    <Link href="/" className="text-brand-gold hover:underline">Return to Portfolio</Link>
                </div>
            </div>
        );
    }

    const member = teamMembers.find((m) => m.id === deal.teamMemberId);

    return (
        <div className="relative min-h-screen bg-brand-dark overflow-hidden">
            {/* Hero Background */}
            <div className="absolute inset-0 z-0">
                <img
                    src={deal.stillImageURL || ""}
                    alt={deal.address}
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />
            </div>

            {/* Back Button */}
            <div className="relative z-10 pt-28 px-6 container mx-auto">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/60 transition-all hover:text-brand-gold"
                >
                    <ChevronLeft size={18} />
                    Return to Portfolio
                </Link>
            </div>

            {/* Main Content Overlay */}
            <div className="relative z-10 container mx-auto px-6 pt-12 pb-20">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
                    {/* Left: Asset Title & Identity */}
                    <div className="space-y-6">
                        <div className="flex flex-wrap gap-2">
                            <span className="glass-dark rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold">
                                {deal.assetType.replace("_", " ")}
                            </span>
                            <span className="glass-dark rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground">
                                {deal.strategy.replace("_", " ")}
                            </span>
                        </div>

                        <h1 className="text-5xl font-bold tracking-tight text-white md:text-7xl lg:max-w-xl">
                            {deal.address.split(",")[0]}
                            <span className="block text-2xl font-medium text-foreground/60 mt-2">
                                {deal.address.split(",").slice(1).join(",")}
                            </span>
                        </h1>

                        <div className="flex items-center gap-4 pt-4">
                            <div className="h-12 w-12 overflow-hidden rounded-full border-2 border-brand-gold/20">
                                <img
                                    src={member?.imageURL || ""}
                                    alt={member?.name}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40">Deal Managed By</p>
                                <Link href={`/team/${member?.slug}`} className="text-sm font-bold text-brand-gold hover:underline">
                                    {member?.name}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Right: Deal Sheet Overlay */}
                    <div className="glass-dark rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl">
                        <div className="mb-8 flex items-center justify-between border-b border-white/5 pb-6">
                            <h3 className="text-xl font-bold text-foreground">Digital Tombstone</h3>
                            <ShieldCheck className="text-brand-gold" size={24} />
                        </div>

                        <div className="grid gap-8 sm:grid-cols-2">
                            <div className="space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                    <TrendingUp size={12} className="text-brand-gold" />
                                    Market Cap Rate
                                </p>
                                <p className="text-3xl font-bold text-foreground">{deal.capRate}%</p>
                            </div>

                            <div className="space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                    <Maximize2 size={12} className="text-brand-gold" />
                                    Total Size
                                </p>
                                <p className="text-3xl font-bold text-foreground">{deal.sqFt?.toLocaleString()} SF</p>
                            </div>

                            <div className="space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                    <Layers size={12} className="text-brand-gold" />
                                    Purchase Price
                                </p>
                                <p className="text-3xl font-bold text-foreground">
                                    {deal.isPublic ? formatCurrency(deal.purchaseAmount || 0) : "Confidential"}
                                </p>
                            </div>

                            <div className="space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-foreground/40">
                                    <Calendar size={12} className="text-brand-gold" />
                                    Closed Date
                                </p>
                                <p className="text-3xl font-bold text-foreground">Oct 2025</p>
                            </div>
                        </div>

                        <button className="mt-10 w-full rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30">
                            Download Investor Summary
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom Subtle Overlay */}
            <div className="absolute bottom-4 right-6 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/20">
                PRVT MKT ALPHA PROJECT v1.0
            </div>
        </div>
    );
}
