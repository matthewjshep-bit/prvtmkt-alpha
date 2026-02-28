"use client";

import { use, useState, useEffect } from "react";
import { useData } from "@/context/DataContext";
import { formatCurrency } from "@/lib/utils";
import { MapPin, TrendingUp, Maximize2, Layers, Calendar, ChevronLeft, ChevronRight, ShieldCheck, Briefcase, Building2, Mail, Award, Info, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function DealPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const { deals, teamMembers, firms } = useData();
    const [currentIndex, setCurrentIndex] = useState(0);

    const deal = deals.find((d) => d.id === id);
    const firm = firms.find(f => f.id === deal?.firmId);
    const members = (deal?.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);

    useEffect(() => {
        if (!firm) return;
        const fontsToLoad = new Set<string>();
        if (firm.firmNameFontFamily && firm.firmNameFontFamily !== 'Inter') fontsToLoad.add(firm.firmNameFontFamily);
        if (firm.bioFontFamily && firm.bioFontFamily !== 'Inter') fontsToLoad.add(firm.bioFontFamily);

        if (fontsToLoad.size > 0) {
            const linkId = 'dynamic-fonts';
            let link = document.getElementById(linkId) as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
            link.href = `https://fonts.googleapis.com/css2?family=${Array.from(fontsToLoad).map(f => `${f.replace(/ /g, '+')}:wght@300;400;600;700;900`).join('&family=')}&display=swap`;
        }
    }, [firm?.firmNameFontFamily, firm?.bioFontFamily]);

    if (!deal) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark text-white">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-4">Deal Not Found</h2>
                    <Link href="/" className="text-white hover:underline">Return to Portfolio</Link>
                </div>
            </div>
        );
    }

    // Prioritize generated video in the gallery
    const allImages = [
        ...(deal.generatedVideoURL ? [deal.generatedVideoURL] : []),
        ...(deal.images && deal.images.length > 0 ? deal.images : [deal.stillImageURL])
    ].filter(Boolean);

    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.primaryColor || '#ffffff',
        '--firm-secondary': firm?.accentColor || '#f5f5f5',
    } as React.CSSProperties;

    const radiusClass = firm?.borderRadius === 'square' ? 'rounded-none' : 'rounded-[3rem]';
    const subRadiusClass = firm?.borderRadius === 'square' ? 'rounded-none' : 'rounded-2xl';
    const cardRadiusClass = firm?.borderRadius === 'square' ? 'rounded-none' : 'rounded-[2rem]';

    return (
        <div
            className="min-h-screen pt-28 pb-32 transition-colors duration-500"
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className="flex flex-col items-center px-6">
                <div
                    className="flex flex-col transition-all duration-700 w-fit max-w-full"
                    style={{
                        gap: `${firm?.tombstonePadding ?? 48}px`,
                        maxWidth: firm?.tombstoneMaxWidth ? `${firm.tombstoneMaxWidth}px` : '1200px'
                    }}
                >
                    {/* Back Link - Static */}
                    <div className="flex items-center justify-between mb-4 w-full">
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

                    {(firm?.tombstoneLayout || ['INFO', 'METRICS', 'MEDIA', 'NARRATIVE']).map((section) => {
                        const sectionBg = (firm as any)?.[`tombstone${section.charAt(0) + section.slice(1).toLowerCase()}BgColor`] || 'var(--firm-secondary)';

                        switch (section) {
                            case 'INFO':
                                return (
                                    <div key="INFO" className={`${radiusClass} p-10 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 w-full`} style={{ backgroundColor: sectionBg }}>
                                        <div className="flex flex-col md:flex-row items-center md:items-start gap-12">
                                            <div className={`h-32 w-32 flex-shrink-0 overflow-hidden ${cardRadiusClass} bg-white/50 p-4 border border-black/5 shadow-inner`}>
                                                {firm?.logoUrl ? (
                                                    <img src={firm.logoUrl} alt={firm?.name} className="h-full w-full object-contain" />
                                                ) : (
                                                    <Building2 size={64} className="text-black/10" />
                                                )}
                                            </div>
                                            <div className="flex-1 text-center md:text-left space-y-4">
                                                <h1
                                                    className="text-4xl font-black tracking-tight uppercase leading-none"
                                                    style={{
                                                        fontFamily: firm?.firmNameFontFamily,
                                                        fontSize: firm?.firmNameFontSize ? `${firm.firmNameFontSize}px` : undefined,
                                                        color: firm?.firmNameFontColor || 'black'
                                                    }}
                                                >
                                                    {firm?.name}
                                                </h1>

                                                <div className="flex flex-col md:flex-row items-center md:items-start gap-12 mt-8 pt-8 border-t border-black/5">
                                                    <div className="space-y-4 flex-1">
                                                        <span className={`${subRadiusClass} px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm inline-block font-inter`} style={{ backgroundColor: 'var(--firm-primary)', color: 'white' }}>
                                                            {deal.assetType.replace("_", " ")}
                                                        </span>
                                                        <h2 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none">
                                                            {deal.address.split(',')[0]}
                                                            <small className="block text-xl font-bold opacity-30 mt-4 italic">{deal.address.split(',').slice(1).join(',')}</small>
                                                        </h2>
                                                    </div>

                                                    <div className="space-y-4 min-w-[250px]">
                                                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 text-center md:text-right">Transaction Leads</p>
                                                        <div className="flex flex-col gap-4 items-center md:items-end">
                                                            {members.map((m: any) => (
                                                                <Link
                                                                    key={m.id}
                                                                    href={`/team/${m.slug || m.id}`}
                                                                    className="flex items-center gap-4 group/lead transition-all hover:opacity-100 hover:scale-[1.02]"
                                                                >
                                                                    <div className="text-right">
                                                                        <p className="text-[11px] font-black uppercase tracking-widest text-black/80 leading-none group-hover/lead:text-black transition-colors">{m.name}</p>
                                                                        <p className="text-[9px] font-bold uppercase tracking-tighter text-black/40 mt-1">{m.role}</p>
                                                                    </div>
                                                                    <div className={`h-14 w-14 overflow-hidden ${subRadiusClass} border-4 border-white shadow-xl transition-all group-hover/lead:border-[var(--firm-primary)]/40`}>
                                                                        <img src={m.imageURL} alt={m.name} className="h-full w-full object-cover" />
                                                                    </div>
                                                                </Link>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            case 'METRICS':
                                return (
                                    <div key="METRICS" className={`${radiusClass} p-10 md:p-12 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200 overflow-hidden w-full`} style={{ backgroundColor: sectionBg }}>
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
                                                        CapEx
                                                    </p>
                                                    <p className="text-3xl font-black text-black">{formatCurrency(deal.rehabAmount || 0)}</p>
                                                </div>
                                            )}
                                            {deal.arv && deal.arv > 0 && (
                                                <div className="px-6 space-y-1 border-l border-black/5">
                                                    <p className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-black/40">
                                                        <Award size={12} className="text-[var(--firm-primary)]" />
                                                        ARV
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
                                        </div>
                                    </div>
                                );
                            case 'MEDIA':
                                return (
                                    <div key="MEDIA" className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
                                        <div className={`relative group ${radiusClass} overflow-hidden shadow-2xl border-8 border-white/5 bg-black/20 w-fit`} style={{ backgroundColor: sectionBg }}>
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={currentIndex}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    transition={{ duration: 0.3 }}
                                                    className="flex items-center justify-center"
                                                >
                                                    {allImages.length > 0 && (
                                                        (allImages[currentIndex]?.toLowerCase().includes('.mp4') || allImages[currentIndex]?.toLowerCase().includes('.mov')) ? (
                                                            <video src={allImages[currentIndex]} autoPlay muted loop playsInline className="max-h-[85vh] w-auto h-auto min-w-[300px] block" />
                                                        ) : (
                                                            <img src={allImages[currentIndex]} className="max-h-[85vh] w-auto h-auto min-w-[300px] block" alt="" />
                                                        )
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                            {allImages.length > 1 && (
                                                <>
                                                    <button onClick={() => setCurrentIndex((prev) => (prev - 1 + allImages.length) % allImages.length)} className="absolute left-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"><ChevronLeft size={24} /></button>
                                                    <button onClick={() => setCurrentIndex((prev) => (prev + 1) % allImages.length)} className="absolute right-6 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/40"><ChevronRight size={24} /></button>
                                                </>
                                            )}
                                        </div>

                                        {allImages.length > 1 && (
                                            <div className="mt-8 flex justify-center gap-3">
                                                {allImages.map((_, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() => setCurrentIndex(idx)}
                                                        className={`h-2 transition-all duration-300 rounded-full ${currentIndex === idx ? "w-8 bg-[var(--firm-primary)]" : "w-2 bg-black/10"}`}
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                );
                            case 'NARRATIVE':
                                return (
                                    <div key="NARRATIVE" className={`${radiusClass} p-12 md:p-20 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-400 w-full`} style={{ backgroundColor: sectionBg }}>
                                        <div className="max-w-4xl mx-auto space-y-12">
                                            <div className="flex flex-col items-center text-center space-y-4">
                                                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-black/30">Investment Narrative</h3>
                                                <div className="h-1 w-20 bg-black/5 rounded-full" />
                                            </div>
                                            <div
                                                className="text-3xl md:text-5xl font-black leading-[1.6] text-black/80 tracking-tight text-center md:text-left prose prose-2xl max-w-none font-inter"
                                                dangerouslySetInnerHTML={{
                                                    __html: (deal.investmentOverview || deal.context || "Institutional transaction.").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            default: return null;
                        }
                    })}
                    {/* Footer Branding Persistence */}
                    <div className="pt-20 text-center w-full">
                        <div className="inline-flex flex-col items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-700 group cursor-default">
                            <div className="h-12 w-12 grayscale group-hover:grayscale-0 transition-all">
                                {firm?.logoUrl && <img src={firm.logoUrl} className="h-full w-full object-contain" />}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">
                                A {firm?.name} Digital Tombstone
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
