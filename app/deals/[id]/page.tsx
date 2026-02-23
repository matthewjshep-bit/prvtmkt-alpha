"use client";

import { use, useState } from "react";
import { useData } from "@/context/DataContext";
import { formatCurrency } from "@/lib/utils";
import { MapPin, TrendingUp, Maximize2, Layers, Calendar, ChevronLeft, ShieldCheck, Briefcase, Building2, Mail, Award } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DealPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { deals, teamMembers, firms } = useData();

    const deal = deals.find((d) => d.id === id);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!deal) {
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
    const firm = firms.find(f => f.id === deal.firmId);
    const allImages = deal.images && deal.images.length > 0 ? deal.images : [deal.stillImageURL];

    return (
        <div className="relative min-h-screen bg-brand-dark overflow-hidden">
            {/* Hero Carousel Background */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={allImages[currentImageIndex] || ""}
                        alt={deal.address}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                        className="h-full w-full object-cover"
                    />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/60 to-brand-dark/30" />

                {/* Carousel Controls */}
                {allImages.length > 1 && (
                    <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
                        {allImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImageIndex(idx)}
                                className={`h-1 rounded-full transition-all ${idx === currentImageIndex ? 'w-8 bg-brand-gold' : 'w-4 bg-white/20'}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Back Button */}
            <div className="relative z-10 pt-28 px-6 container mx-auto">
                <Link
                    href={firm ? `/firms/${firm.slug || firm.id}` : "/"}
                    className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/60 transition-all hover:text-brand-gold"
                >
                    <ChevronLeft size={18} />
                    Return to {firm?.name || "Portfolio"}
                </Link>
            </div>

            {/* Main Content Overlay */}
            <div className="relative z-10 container mx-auto px-6 pt-12 pb-20">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
                    {/* Left: Asset Title & Identity */}
                    <div className="space-y-8">
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

                        {/* Deal Overview & Highlights */}
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                            <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-brand-gold">Deal Overview & Highlights</h3>
                            <div className="glass-dark rounded-2xl border border-white/5 p-6 md:p-8">
                                <p className="text-lg leading-relaxed text-foreground/70 italic">
                                    {deal.context || "This transaction represents a strategic positioning within a high-growth market, leveraging institutional-grade asset management to drive superior risk-adjusted returns."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right: Deal Sheet Overlay */}
                    <div className="glass-dark sticky top-32 rounded-3xl p-8 lg:p-10 border border-white/10 shadow-2xl">
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
                PRVT MKT ALPHA PROJECT v1.1
            </div>
        </div>
    );
}
