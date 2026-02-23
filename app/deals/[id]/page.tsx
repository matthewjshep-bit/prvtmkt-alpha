"use client";

import { use, useState, useEffect } from "react";
import { useData } from "@/context/DataContext";
import { formatCurrency } from "@/lib/utils";
import { MapPin, TrendingUp, Maximize2, Layers, Calendar, ChevronLeft, ShieldCheck, Briefcase, Building2, Mail, Award, Info, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ProgressSlider, SliderContent, SliderWrapper, SliderBtnGroup, SliderBtn } from "@/components/ui/progressive-carousel";

export default function DealPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { deals, teamMembers, firms } = useData();

    const deal = deals.find((d) => d.id === id);

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

    // Dynamic Theming
    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.primaryColor || '#c5a059',
        '--firm-secondary': firm?.secondaryColor || '#f5f5f5',
    } as React.CSSProperties;

    return (
        <div
            className="min-h-screen pt-28 pb-32 transition-colors duration-500"
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className="container mx-auto px-6">
                {/* Back Link */}
                <div className="mb-12">
                    <Link
                        href={firm ? `/firms/${firm.slug || firm.id}` : "/"}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 transition-all hover:opacity-100 hover:text-[var(--firm-primary)]"
                        style={{ color: 'var(--firm-text)' }}
                    >
                        <ChevronLeft size={18} />
                        Return to {firm?.name || "Portfolio"}
                    </Link>
                </div>

                {/* Hero Section: Split-Pane Identity & Carousel */}
                <div className="grid gap-16 lg:grid-cols-[450px_1fr] items-start">
                    {/* Left Pane: Identity & Enhanced Lead Card */}
                    <div className="animate-in fade-in slide-in-from-left-4 duration-700">
                        <div className="flex flex-wrap gap-2 mb-8">
                            <span className="rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-black/5" style={{ backgroundColor: 'var(--firm-secondary)', color: 'var(--firm-primary)' }}>
                                {deal.assetType.replace("_", " ")}
                            </span>
                            <span className="rounded-lg px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest border border-black/5 opacity-70" style={{ backgroundColor: 'var(--firm-secondary)', color: 'black' }}>
                                {deal.isPublic ? "Public Transaction" : "Private Offering"}
                            </span>
                        </div>

                        <div className="space-y-12">
                            <h1 className="text-5xl font-bold tracking-tight md:text-7xl leading-[1.1]">
                                {deal.address.split(",")[0]}
                                <span className="block text-2xl font-medium mt-3 opacity-50 tracking-normal">
                                    {deal.address.split(",").slice(1).join(",")}
                                </span>
                            </h1>

                            {/* Enhanced Persona Lead Card in Dynamic Secondary Background (Soft-Rectangular) */}
                            <div className="inline-flex items-center gap-6 rounded-3xl p-4 pr-12 shadow-xl transition-transform hover:scale-[1.02]" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                                <div className="h-24 w-24 overflow-hidden rounded-2xl border-4 border-white shadow-md">
                                    <img
                                        src={member?.imageURL || ""}
                                        alt={member?.name}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                <div className="space-y-0.5">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">Transaction Lead</p>
                                    <Link href={`/team/${member?.slug}`} className="text-2xl font-black text-black hover:text-[var(--firm-primary)] transition-colors">
                                        {member?.name}
                                    </Link>
                                    <p className="text-xs font-bold text-black/60 uppercase tracking-wider mb-3">{member?.role}</p>

                                    <div className="flex items-center gap-3">
                                        <a href={`mailto:${member?.email}`} className="group/icon flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 text-black/40 transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]">
                                            <Mail size={16} />
                                        </a>
                                        {member?.linkedInUrl && (
                                            <a href={member.linkedInUrl} target="_blank" rel="noopener noreferrer" className="group/icon flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 text-black/40 transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]">
                                                <Linkedin size={16} />
                                            </a>
                                        )}
                                        {member?.phoneNumber && (
                                            <a href={`tel:${member.phoneNumber}`} className="group/icon flex h-8 w-8 items-center justify-center rounded-lg bg-black/5 text-black/40 transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]">
                                                <Phone size={16} />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Pane: Dominant Visuals - Top Aligned with Title */}
                    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl transition-all duration-500 hover:border-[var(--firm-primary)]/30 lg:mt-[108px]">
                        <ProgressSlider activeSlider="slide-0" className="w-full">
                            <SliderContent>
                                {allImages.map((img, idx) => (
                                    <SliderWrapper key={idx} value={`slide-${idx}`}>
                                        <div className="aspect-[16/9] w-full overflow-hidden">
                                            <img
                                                src={img}
                                                alt={`Deal view ${idx + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    </SliderWrapper>
                                ))}
                            </SliderContent>

                            <SliderBtnGroup className="grid grid-cols-2 divide-x divide-white/10 border-t border-white/10 bg-black/40 backdrop-blur-xl">
                                <SliderBtn
                                    value="slide-0"
                                    className="py-4 text-center transition-all hover:bg-white/5"
                                    progressBarClass="bg-[var(--firm-primary)] h-1 bottom-0 absolute"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Property Gallery</span>
                                </SliderBtn>
                                <SliderBtn
                                    value={`slide-${Math.min(1, allImages.length - 1)}`}
                                    className="py-4 text-center transition-all hover:bg-white/5"
                                    progressBarClass="bg-[var(--firm-primary)] h-1 bottom-0 absolute"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Site Perspectives</span>
                                </SliderBtn>
                            </SliderBtnGroup>
                        </ProgressSlider>
                    </div>
                </div>

                {/* Containerized Metrics Bar (Soft-Rectangular) */}
                <div className="mt-20 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="grid grid-cols-2 gap-y-10 md:grid-cols-3 lg:grid-cols-6 divide-x divide-black/5">
                        <div className="px-6 space-y-1">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <TrendingUp size={12} className="text-black/60" />
                                Purchase
                            </p>
                            <p className="text-3xl font-black text-black">{deal.isPublic ? formatCurrency(deal.purchaseAmount || 0) : "Confidential"}</p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Layers size={12} className="text-black/60" />
                                Rehab
                            </p>
                            <p className="text-3xl font-black text-black">{formatCurrency(deal.rehabAmount || 0)}</p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Award size={12} className="text-black/60" />
                                Exit (ARV)
                            </p>
                            <p className="text-3xl font-black text-black">{formatCurrency(deal.arv || 0)}</p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Maximize2 size={12} className="text-black/60" />
                                Total Size
                            </p>
                            <p className="text-3xl font-black text-black">{deal.sqFt?.toLocaleString()} <span className="text-xs opacity-50">SF</span></p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Briefcase size={12} className="text-black/60" />
                                Strategy
                            </p>
                            <p className="text-sm font-black uppercase tracking-tight text-black opacity-80">{deal.strategy?.replace("_", " ")}</p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <ShieldCheck size={12} className="text-black/60" />
                                Financing
                            </p>
                            <p className="text-sm font-black uppercase tracking-tight text-black opacity-80">{deal.financingType}</p>
                        </div>
                    </div>
                </div>

                {/* Standalone Narrative Section (Soft-Rectangular - Width Flush with Metrics) */}
                <div className="mt-12 rounded-[2rem] p-12 md:p-16 shadow-2xl" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="space-y-8">
                        <h2 className="text-sm font-black uppercase tracking-[0.4em] text-black/30">Investment Overview</h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-3xl font-bold leading-[1.6] text-black/80">
                                {deal.context || "No project overview available. This transaction represents a strategic positioning within the target submarket, leveraging institutional-grade management and favorable capital structures to maximize risk-adjusted returns."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
