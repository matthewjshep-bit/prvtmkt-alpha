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

    const members = (deal.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);
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
            <div className="container mx-auto max-w-6xl px-6 space-y-12">
                {/* Back Link */}
                <div className="flex items-center justify-between">
                    <Link
                        href={firm ? `/firms/${firm.slug || firm.id}` : "/"}
                        className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-60 transition-all hover:opacity-100 hover:text-[var(--firm-primary)]"
                    >
                        <ChevronLeft size={18} />
                        Back to Portfolio
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] opacity-40">
                        <ShieldCheck size={14} className="text-[var(--firm-primary)]" />
                        Verified Transaction
                    </div>
                </div>

                {/* 1. Firm Identity Header (Inherited) */}
                <div className="rounded-[3rem] p-10 md:p-16 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                        <div className="h-32 w-32 flex-shrink-0 overflow-hidden rounded-[2rem] bg-white/50 p-4 border border-black/5 shadow-inner">
                            {firm?.logoUrl ? (
                                <img src={firm.logoUrl} alt={firm.name} className="h-full w-full object-contain" />
                            ) : (
                                <Building2 size={64} className="text-black/10" />
                            )}
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <h1 className="text-4xl font-black text-black tracking-tight uppercase leading-none">{firm?.name}</h1>
                            <p className="text-lg font-medium text-black/60 leading-relaxed max-w-2xl italic">
                                "{firm?.bio || "An institutional leader in private market real estate acquisitions and strategic asset management."}"
                            </p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                                {firm?.linkedInUrl && (
                                    <a href={firm.linkedInUrl} target="_blank" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 text-[10px] font-black uppercase tracking-widest text-black/60 hover:bg-[var(--firm-primary)] hover:text-white transition-all">
                                        <Linkedin size={16} /> LinkedIn
                                    </a>
                                )}
                                {firm?.physicalAddress && (
                                    <div className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 text-[10px] font-black uppercase tracking-widest text-black/40">
                                        <MapPin size={16} /> {firm.physicalAddress}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Property & Team Context */}
                <div className="rounded-[3rem] p-10 md:p-16 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="grid lg:grid-cols-[1fr_400px] gap-16 items-center">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <span className="rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm" style={{ backgroundColor: 'var(--firm-primary)', color: 'white' }}>
                                    {deal.assetType.replace("_", " ")}
                                </span>
                                <span className="rounded-lg border border-black/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest opacity-40">
                                    {deal.isPublic ? "Public Case Study" : "Private Portfolio Asset"}
                                </span>
                            </div>
                            <h2 className="text-5xl md:text-7xl font-black text-black tracking-tighter leading-[0.9]">
                                {deal.address.split(',')[0]}
                                <small className="block text-2xl font-bold opacity-30 tracking-tight mt-4 italic">{deal.address.split(',').slice(1).join(',')}</small>
                            </h2>
                        </div>

                        <div className="space-y-6">
                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 text-center lg:text-right">Transaction Leads</p>
                            <div className="flex justify-center lg:justify-end -space-x-4">
                                {members.map((m: any, i: number) => (
                                    <div key={m.id} className="relative group" style={{ zIndex: 10 - i }}>
                                        <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white shadow-2xl transition-transform group-hover:scale-110 group-hover:z-50">
                                            <img src={m.imageURL} alt={m.name} title={m.name} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-black text-white text-[8px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-black uppercase">
                                            {m.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 3. Full-Width Hero Media Carousel */}
                <div className="rounded-[3rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-1000 delay-200 border-8 border-white/5" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <ProgressSlider activeSlider="slide-0" className="w-full">
                        <SliderContent>
                            {allImages.map((img, idx) => (
                                <SliderWrapper key={idx} value={`slide-${idx}`}>
                                    <div className="aspect-[21/9] w-full overflow-hidden">
                                        <img
                                            src={img}
                                            alt={`Property view ${idx + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                </SliderWrapper>
                            ))}
                        </SliderContent>

                        <SliderBtnGroup className="grid grid-cols-2 divide-x divide-black/5 bg-white/50 backdrop-blur-xl">
                            <SliderBtn
                                value="slide-0"
                                className="py-6 text-center transition-all hover:bg-white/40"
                                progressBarClass="bg-[var(--firm-primary)] h-1.5 bottom-0 absolute"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Cinematic Tour</span>
                            </SliderBtn>
                            <SliderBtn
                                value={`slide-${Math.min(1, allImages.length - 1)}`}
                                className="py-6 text-center transition-all hover:bg-white/40"
                                progressBarClass="bg-[var(--firm-primary)] h-1.5 bottom-0 absolute"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-black/40">Site Perspectives</span>
                            </SliderBtn>
                        </SliderBtnGroup>
                    </ProgressSlider>
                </div>

                {/* 4. Transaction Metrics Bar */}
                <div className="rounded-[3rem] p-10 md:p-16 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 overflow-hidden" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-start gap-y-12 divide-x divide-black/5">
                        {deal.purchaseAmount && deal.purchaseAmount > 0 && (
                            <div className="px-6 space-y-1">
                                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                    <TrendingUp size={12} className="text-[var(--firm-primary)]" />
                                    Acquisition
                                </p>
                                <p className="text-3xl font-black text-black">{deal.isPublic ? formatCurrency(deal.purchaseAmount || 0) : "Confid."}</p>
                            </div>
                        )}

                        {deal.rehabAmount && deal.rehabAmount > 0 && (
                            <div className="px-6 space-y-1 border-l border-black/5">
                                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                    <Layers size={12} className="text-[var(--firm-primary)]" />
                                    Capital Ex.
                                </p>
                                <p className="text-3xl font-black text-black">{formatCurrency(deal.rehabAmount || 0)}</p>
                            </div>
                        )}

                        {deal.arv && deal.arv > 0 && (
                            <div className="px-6 space-y-1 border-l border-black/5">
                                <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                    <Award size={12} className="text-[var(--firm-primary)]" />
                                    Exit (ARV)
                                </p>
                                <p className="text-3xl font-black text-black">{formatCurrency(deal.arv || 0)}</p>
                            </div>
                        )}

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Maximize2 size={12} className="text-[var(--firm-primary)]" />
                                Dimensions
                            </p>
                            <p className="text-3xl font-black text-black">{deal.sqFt?.toLocaleString()} <span className="text-xs opacity-30">SF</span></p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5">
                            <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <Briefcase size={12} className="text-[var(--firm-primary)]" />
                                Objective
                            </p>
                            <p className="text-sm font-black uppercase tracking-tight text-black/80">{deal.strategy?.replace("_", " ")}</p>
                        </div>

                        <div className="px-6 space-y-1 border-l border-black/5 text-right lg:text-left">
                            <p className="flex lg:inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                <ShieldCheck size={12} className="text-[var(--firm-primary)]" />
                                Structure
                            </p>
                            <p className="text-sm font-black uppercase tracking-tight text-black/80">{deal.financingType}</p>
                        </div>
                    </div>
                </div>

                {/* 5. Investment Narrative Section */}
                <div className="rounded-[3rem] p-12 md:p-20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="max-w-4xl mx-auto space-y-12">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--firm-primary)]">Investment Narrative</h3>
                            <div className="h-1 w-20 bg-black/5 rounded-full" />
                        </div>
                        <div className="prose prose-2xl prose-invert max-w-none">
                            <p className="text-3xl md:text-4xl font-black leading-[1.6] text-black/80 tracking-tight text-center md:text-left">
                                {deal.investmentOverview || deal.context || "Experience excellence in private market real estate through institutional-grade execution and strategic tactical management."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Footer Branding Persistence */}
                <div className="pt-20 text-center">
                    <div className="inline-flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-700 group cursor-default">
                        <div className="h-12 w-12 grayscale group-hover:grayscale-0 transition-all">
                            {firm?.logoUrl && <img src={firm.logoUrl} className="h-full w-full object-contain" />}
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] font-brand-gold">
                            A {firm?.name} Digital Tombstone
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
