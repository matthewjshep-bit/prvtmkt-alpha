"use client";

import { useState, useRef, useEffect } from "react";
import DealCard from "@/components/DealCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, LayoutGrid, Globe, Building2, UserPlus, FilePlus, ArrowLeft, Volume2, VolumeX, ArrowUpRight, Mail, Linkedin, Phone, Briefcase, Award, TrendingUp, Layers, Maximize2, ChevronLeft, ChevronRight, MapPin, List } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Firm, Deal, TeamMember } from "@/context/DataContext";

const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

interface PublicPortalViewProps {
    firm: Firm;
    deals: Deal[];
    teamMembers: TeamMember[];
    isInitialized: boolean;
    isPreview?: boolean;
    initialTab?: "DEALS" | "PEOPLE";
    focusedMemberId?: string;
    focusedDealId?: string;
    previewMode?: "GALLERY" | "PROFILE" | "DEAL";
    onMemberClick?: (id: string) => void;
    onDealClick?: (id: string) => void;
}

export default function PublicPortalView({
    firm,
    deals,
    teamMembers,
    isInitialized,
    isPreview = false,
    initialTab,
    focusedMemberId,
    focusedDealId,
    previewMode = "GALLERY",
    onMemberClick,
    onDealClick
}: PublicPortalViewProps) {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(initialTab || "DEALS");

    // Initialize view modes based on firm settings
    const initialViewMode = firm.viewLayoutMode === 'LIST' ? 'LIST' : 'GRID';
    const [viewMode, setViewMode] = useState<"GRID" | "LIST">(initialViewMode);
    const [teamViewMode, setTeamViewMode] = useState<"GRID" | "LIST">(initialViewMode);

    const [filter, setFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Update view modes if firm settings change
    useEffect(() => {
        if (firm.viewLayoutMode === 'LIST') {
            setViewMode('LIST');
            setTeamViewMode('LIST');
        } else if (firm.viewLayoutMode === 'GRID') {
            setViewMode('GRID');
            setTeamViewMode('GRID');
        }
    }, [firm.viewLayoutMode]);

    const focusedMember = teamMembers.find(m => m.id === focusedMemberId);
    const focusedDeal = deals.find(d => d.id === focusedDealId);
    const [dealMediaIndex, setDealMediaIndex] = useState(0);

    const allDealImages = focusedDeal ? [
        ...(focusedDeal.generatedVideoURL ? [focusedDeal.generatedVideoURL] : []),
        ...(focusedDeal.images && focusedDeal.images.length > 0 ? focusedDeal.images : [focusedDeal.stillImageURL])
    ].filter(Boolean) as string[] : [];

    useEffect(() => {
        if (initialTab) {
            setActiveTab(initialTab);
        }
    }, [initialTab]);

    useEffect(() => {
        if (focusedMemberId && activeTab === "PEOPLE") {
            const element = document.getElementById(`member-${focusedMemberId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    }, [focusedMemberId, activeTab]);

    useEffect(() => {
        // Force tab selection based on preview mode
        if (previewMode === "PROFILE" || focusedMemberId) {
            setActiveTab("PEOPLE");
        } else if (previewMode === "DEAL" || focusedDealId) {
            setActiveTab("DEALS");
        }
    }, [previewMode, focusedMemberId, focusedDealId]);

    const toggleAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (videoRef.current) {
            videoRef.current.muted = nextMuted;
            if (!nextMuted) {
                videoRef.current.volume = 1.0;
                videoRef.current.play().catch(err => console.error("Unmute play error:", err));
            }
        }
    };

    const firmTeamMembers = teamMembers
        .filter((m) => m.firmId === firm.id || (m.firmIds || []).includes(firm.id))
        .sort((a, b) => (a.order || 0) - (b.order || 0));

    const filteredDeals = deals.filter((deal) => {
        const isFirmDeal = deal.firmId === firm.id;
        const matchesFilter = filter === "ALL" || deal.assetType === filter;
        const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase());
        return isFirmDeal && matchesFilter && matchesSearch;
    });

    // Dynamic Theming
    useEffect(() => {
        const fontsToLoad = new Set<string>();
        if (firm.firmNameFontFamily && firm.firmNameFontFamily !== 'Inter') fontsToLoad.add(firm.firmNameFontFamily);
        if (firm.bioFontFamily && firm.bioFontFamily !== 'Inter') fontsToLoad.add(firm.bioFontFamily);

        if (fontsToLoad.size > 0) {
            const fontString = Array.from(fontsToLoad).map(f => f.replace(/ /g, '+')).join('|');
            const linkId = 'dynamic-fonts';
            let link = document.getElementById(linkId) as HTMLLinkElement;
            if (!link) {
                link = document.createElement('link');
                link.id = linkId;
                link.rel = 'stylesheet';
                document.head.appendChild(link);
            }
            // Load weights: 300,400,600,700,900
            link.href = `https://fonts.googleapis.com/css2?family=${Array.from(fontsToLoad).map(f => `${f.replace(/ /g, '+')}:wght@300;400;600;700;900`).join('&family=')}&display=swap`;
        }
    }, [firm.firmNameFontFamily, firm.bioFontFamily]);

    const themeStyles = {
        '--firm-bg': firm.backgroundColor || '#0a0a0a',
        '--firm-text': firm.fontColor || '#ffffff',
        '--firm-primary': firm.accentColor || '#ffffff',
        '--firm-secondary': firm.accentColor || '#151515',
        '--firm-name-font': firm.firmNameFontFamily || 'Inter',
        '--firm-name-weight': firm.firmNameFontWeight || '900',
        '--firm-name-size': `${firm.firmNameFontSize || 72}px`,
        '--firm-name-color': firm.firmNameFontColor || firm.fontColor || '#ffffff',
        '--firm-bio-font': firm.bioFontFamily || 'Inter',
        '--firm-bio-size': `${firm.bioFontSize || 18}px`,
        '--firm-bio-color': firm.bioFontColor || firm.fontColor || '#ffffff',
        '--member-card-bg': firm.memberCardBgColor || 'rgba(255, 255, 255, 0.5)',
        '--member-photo-spacing': `${firm.memberPhotoSpacing || 12}px`,
        '--card-shadow': `0 20px 50px rgba(0,0,0,${(firm.cardShadowIntensity || 0) * 0.5})`,
    } as React.CSSProperties;

    const radiusClass = firm.borderRadius === 'square' ? 'rounded-none' : 'rounded-[2.5rem]';
    const cardRadiusClass = firm.borderRadius === 'square' ? 'rounded-none' : 'rounded-[2rem]';
    const subRadiusClass = firm.borderRadius === 'square' ? 'rounded-none' : 'rounded-2xl';

    const isVideo = (url: string | undefined) => {
        if (!url) return false;
        const lowerUrl = url.toLowerCase();
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime', '.m4v'];
        const hasVideoExtension = videoExtensions.some(ext => lowerUrl.split(/[?#]/)[0].endsWith(ext));
        const isVideoDataUrl = url.startsWith('data:video/') || lowerUrl.includes('video/quicktime') || lowerUrl.includes('video/mp4');
        return hasVideoExtension || isVideoDataUrl || (url.startsWith('data:') && !lowerUrl.includes('image/'));
    };

    if (!isInitialized) {
        return (
            <div className="flex h-[400px] items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--firm-primary)]/30 border-t-[var(--firm-primary)]" />
            </div>
        );
    }

    return (
        <div
            className={`min-h-full pb-20 transition-colors duration-500 overflow-hidden ${radiusClass} ${isPreview ? "" : "pt-28"}`}
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className={`container mx-auto ${isPreview ? "px-4" : "px-6"}`}>
                {/* Back Link if not in preview */}
                {!isPreview && firm.showAgencyBranding === false && (
                    <div className="mb-6 pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all font-inter"
                            style={{ color: 'var(--firm-text)' }}
                        >
                            <ArrowLeft size={14} />
                            Back to Explore
                        </Link>
                    </div>
                )}

                {/* Sub-Views: Handle Profile and Deal views first */}
                {previewMode === "PROFILE" && focusedMember ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => onMemberClick?.('')}
                            className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all font-inter"
                            style={{ color: 'var(--firm-text)' }}
                        >
                            <ArrowLeft size={16} />
                            Back to Team
                        </button>

                        <div className="space-y-12 pb-20">
                            <div className="flex flex-col md:flex-row gap-10 items-start">
                                <div className="relative shrink-0">
                                    <div className="h-44 w-44 overflow-hidden border-4 border-white shadow-2xl rounded-[2.5rem]">
                                        <img src={focusedMember.imageURL || "/placeholder-user.jpg"} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-xl" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                                        <Award size={24} />
                                    </div>
                                </div>
                                <div className="flex-1 space-y-6">
                                    <div>
                                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2" style={{ color: 'var(--firm-text)' }}>{focusedMember.name}</h1>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                                            <p className="text-xl font-medium" style={{ color: 'var(--firm-text)', fontFamily: 'var(--firm-bio-font)' }}>{focusedMember.role}</p>
                                            <div className="flex items-center gap-1.5 text-xl font-medium opacity-40" style={{ color: 'var(--firm-text)' }}>
                                                <Building2 size={20} />
                                                {firm.name}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className="max-w-2xl text-lg leading-relaxed prose prose-lg max-w-none opacity-80"
                                        style={{ color: 'var(--firm-text)', fontFamily: 'var(--firm-bio-font)' }}
                                        dangerouslySetInnerHTML={{ __html: focusedMember.bio?.replace(/&lt;/g, '<').replace(/&gt;/g, '>') || 'Principal professional with a specialization.' }}
                                    />

                                    <div className="flex flex-wrap gap-4">
                                        <a href={`mailto:${focusedMember.email}`} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-80" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                                            <Mail size={18} />
                                            Email
                                        </a>
                                        {focusedMember.linkedInUrl && (
                                            <a href={focusedMember.linkedInUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-6 py-3 rounded-xl bg-black/5 border border-black/5 text-black/60 text-sm font-bold hover:bg-black/10 transition-all">
                                                <Linkedin size={18} />
                                                LinkedIn
                                            </a>
                                        )}
                                        <div className="flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/5 text-sm font-bold">
                                            <Briefcase size={18} style={{ color: 'var(--firm-text)' }} />
                                            <span className="opacity-60" style={{ color: 'var(--firm-text)' }}>{deals.filter(d => (d.teamMemberIds || []).includes(focusedMember.id)).length} Deals</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {focusedMember.heroMediaUrl && (
                                <div className={`w-full overflow-hidden border border-black/5 bg-black/5 shadow-2xl relative flex items-center justify-center min-h-[300px] md:min-h-[400px] ${radiusClass}`}>
                                    {isVideo(focusedMember.heroMediaUrl) ? (
                                        <video src={focusedMember.heroMediaUrl} autoPlay loop muted playsInline className="max-w-full max-h-[60vh] object-contain" />
                                    ) : (
                                        <img src={focusedMember.heroMediaUrl} className="max-w-full max-h-[60vh] object-contain" alt="" />
                                    )}
                                </div>
                            )}

                            {/* Portfolio for member */}
                            <div className="pt-12 border-t border-white/5">
                                <h2 className="text-4xl font-black mt-2 mb-12 uppercase" style={{ color: 'var(--firm-text)' }}>Track <span style={{ color: 'var(--firm-primary)' }}>Record</span></h2>
                                <div className="grid gap-8">
                                    {deals.filter(d => (d.teamMemberIds || []).includes(focusedMember.id)).map((deal, idx) => (
                                        <DealCard key={deal.id} deal={deal} index={idx} firm={firm} isPreview={isPreview} onMemberClick={onMemberClick} isListView={true} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ) : previewMode === "DEAL" && focusedDeal ? (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <button
                            onClick={() => onDealClick?.('')}
                            className="mb-8 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] opacity-40 hover:opacity-100 transition-all font-inter"
                            style={{ color: 'var(--firm-text)' }}
                        >
                            <ArrowLeft size={16} />
                            Back to Portfolio
                        </button>

                        <div className="flex flex-col items-center">
                            <div
                                className="flex flex-col w-fit max-w-full"
                                style={{
                                    gap: `${firm.tombstonePadding ?? 48}px`,
                                    maxWidth: firm.tombstoneMaxWidth ? `${firm.tombstoneMaxWidth}px` : '1200px'
                                }}
                            >
                                {(firm.tombstoneLayout || ['INFO', 'METRICS', 'MEDIA', 'NARRATIVE']).map((section) => {
                                    const sectionBg = (firm as any)[`tombstone${section.charAt(0) + section.slice(1).toLowerCase()}BgColor`] || 'var(--firm-secondary)';

                                    switch (section) {
                                        case 'INFO':
                                            return (
                                                <div key="INFO" className={`${radiusClass} p-10 md:p-12 shadow-2xl transition-all duration-500 w-full`} style={{ backgroundColor: sectionBg }}>
                                                    <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-center">
                                                        <div className="space-y-6">
                                                            <span className={`${subRadiusClass} px-4 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-sm inline-block font-inter`} style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                                                                {focusedDeal.assetType.replace("_", " ")}
                                                            </span>
                                                            <h1 className="text-4xl md:text-6xl font-black text-black tracking-tighter leading-none">
                                                                {focusedDeal.address.split(',')[0]}
                                                                <small className="block text-xl font-bold opacity-30 mt-4 italic">{focusedDeal.address.split(',').slice(1).join(',')}</small>
                                                            </h1>
                                                        </div>
                                                        <div className="space-y-4">
                                                            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/20 text-center lg:text-right">Transaction Leads</p>
                                                            <div className="flex flex-col gap-3 items-center lg:items-end">
                                                                {focusedDeal.teamMemberIds?.map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean).map((m: any) => (
                                                                    <button
                                                                        key={m.id}
                                                                        onClick={() => {
                                                                            if (onMemberClick) {
                                                                                onMemberClick(m.id);
                                                                            } else {
                                                                                router.push(`/team/${m.slug || m.id}`);
                                                                            }
                                                                        }}
                                                                        className="flex items-center gap-3 group/lead transition-all hover:opacity-100 cursor-pointer"
                                                                    >
                                                                        <span className="text-right">
                                                                            <p className="text-[10px] font-black uppercase tracking-widest text-black/80 leading-none group-hover/lead:text-black transition-colors">{m.name}</p>
                                                                            <p className="text-[8px] font-bold uppercase tracking-tighter text-black/40 mt-1">{m.role}</p>
                                                                        </span>
                                                                        <div className={`h-12 w-12 overflow-hidden ${subRadiusClass} border-2 border-white shadow-lg transition-all group-hover/lead:border-[var(--firm-primary)]/40`}>
                                                                            <img src={m.imageURL} alt={m.name} className="h-full w-full object-cover" />
                                                                        </div>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        case 'METRICS':
                                            return (
                                                <div key="METRICS" className={`${radiusClass} p-10 shadow-2xl overflow-hidden transition-all duration-500 w-full`} style={{ backgroundColor: sectionBg }}>
                                                    <div className="flex flex-wrap justify-between gap-8 divide-x divide-black/5">
                                                        {focusedDeal.purchaseAmount && focusedDeal.purchaseAmount > 0 && (
                                                            <div className="px-4 space-y-1">
                                                                <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40"><TrendingUp size={10} className="text-[var(--firm-primary)]" />Acquisition</p>
                                                                <p className="text-2xl font-black text-black">{focusedDeal.isPublic ? formatCurrency(focusedDeal.purchaseAmount || 0) : "Confid."}</p>
                                                            </div>
                                                        )}
                                                        {focusedDeal.rehabAmount && focusedDeal.rehabAmount > 0 && (
                                                            <div className="px-4 space-y-1 border-l border-black/5">
                                                                <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40"><Layers size={10} className="text-[var(--firm-primary)]" />CapEx</p>
                                                                <p className="text-2xl font-black text-black">{formatCurrency(focusedDeal.rehabAmount || 0)}</p>
                                                            </div>
                                                        )}
                                                        {focusedDeal.arv && focusedDeal.arv > 0 && (
                                                            <div className="px-4 space-y-1 border-l border-black/5">
                                                                <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40"><Award size={10} className="text-[var(--firm-primary)]" />ARV</p>
                                                                <p className="text-2xl font-black text-black">{formatCurrency(focusedDeal.arv || 0)}</p>
                                                            </div>
                                                        )}
                                                        <div className="px-4 space-y-1 border-l border-black/5">
                                                            <p className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-black/40"><Maximize2 size={10} className="text-[var(--firm-primary)]" />Dimensions</p>
                                                            <p className="text-2xl font-black text-black">{focusedDeal.sqFt?.toLocaleString()} <span className="text-[10px] opacity-30 font-inter font-bold">SF</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        case 'MEDIA':
                                            return (
                                                <div key="MEDIA" className="w-full flex flex-col items-center">
                                                    <div className={`relative group ${radiusClass} overflow-hidden shadow-2xl border-4 border-white/5 bg-black/5 w-fit transition-all duration-500`} style={{ backgroundColor: sectionBg }}>
                                                        <AnimatePresence mode="wait">
                                                            <motion.div key={dealMediaIndex} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center justify-center">
                                                                {allDealImages.length > 0 && (
                                                                    isVideo(allDealImages[dealMediaIndex]) ? (
                                                                        <video src={allDealImages[dealMediaIndex]} autoPlay muted loop playsInline className="max-h-[75vh] w-auto h-auto min-w-[300px] block" />
                                                                    ) : (
                                                                        <img src={allDealImages[dealMediaIndex]} className="max-h-[75vh] w-auto h-auto min-w-[300px] block" alt="" />
                                                                    )
                                                                )}
                                                            </motion.div>
                                                        </AnimatePresence>
                                                        {allDealImages.length > 1 && (
                                                            <>
                                                                <button onClick={() => setDealMediaIndex(prev => (prev - 1 + allDealImages.length) % allDealImages.length)} className="absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:bg-black/40"><ChevronLeft size={16} /></button>
                                                                <button onClick={() => setDealMediaIndex(prev => (prev + 1) % allDealImages.length)} className="absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-black/20 backdrop-blur-md border border-white/10 flex items-center justify-center text-white transition-all hover:bg-black/40"><ChevronRight size={16} /></button>
                                                            </>
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        case 'NARRATIVE':
                                            return (
                                                <div key="NARRATIVE" className={`${radiusClass} p-12 shadow-2xl transition-all duration-500 w-full`} style={{ backgroundColor: sectionBg }}>
                                                    <div className="max-w-4xl mx-auto text-center space-y-8">
                                                        <h3 className="text-[9px] font-black uppercase tracking-[0.5em] text-black/30">Narrative</h3>
                                                        <div
                                                            className="text-2xl font-black leading-relaxed text-black/80 tracking-tight prose max-w-none font-inter"
                                                            dangerouslySetInnerHTML={{
                                                                __html: (focusedDeal.investmentOverview || focusedDeal.context || "Institutional transaction.").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        default: return null;
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* GALLERY VIEW: Firm Info */}
                        <div className={`mb-8 p-10 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 ${radiusClass}`} style={{ backgroundColor: 'var(--firm-secondary)' }}>
                            <div className="flex flex-col lg:flex-row items-center gap-12 flex-1">
                                <div className="flex-shrink-0 flex items-center justify-center relative p-2 bg-white/5 rounded-2xl border border-white/5 shadow-inner w-fit h-fit max-w-full">
                                    {firm.logoUrl && (
                                        <img
                                            src={firm.logoUrl}
                                            className="transition-all duration-300 object-contain h-auto"
                                            style={{
                                                width: `${(firm.logoScale || 100) * 1.6}px`, // 100 -> 160px base, up to 480px
                                                maxWidth: 'min(90vw, 600px)',
                                            }}
                                        />
                                    )}
                                </div>
                                <div className="text-center lg:text-left flex-1 flex flex-col justify-between">
                                    <div>
                                        <h1 className="mb-4 tracking-tight" style={{ fontFamily: 'var(--firm-name-font)', fontWeight: 'var(--firm-name-weight)', fontSize: 'var(--firm-name-size)', color: 'var(--firm-name-color)' }}>{firm.name}</h1>
                                        <div className="font-bold leading-relaxed max-w-2xl prose prose-invert mb-8" style={{ color: 'var(--firm-bio-color)', fontFamily: 'var(--firm-bio-font)', fontSize: 'var(--firm-bio-size)' }} dangerouslySetInnerHTML={{ __html: firm.bio || "" }} />
                                    </div>

                                    {/* Connectivity Section - Now under bio */}
                                    {(firm.linkedInUrl || firm.googleReviewsUrl || firm.googleMapsUrl) && (
                                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                                            {firm.linkedInUrl && (
                                                <a href={firm.linkedInUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 ${subRadiusClass} hover:bg-white/10 transition-all group text-white`}>
                                                    <Linkedin size={14} className="opacity-60 group-hover:opacity-100" />
                                                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">LinkedIn</span>
                                                </a>
                                            )}
                                            {firm.googleReviewsUrl && (
                                                <a href={firm.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 ${subRadiusClass} hover:bg-white/10 transition-all group text-white`}>
                                                    <Globe size={14} className="opacity-60 group-hover:opacity-100" />
                                                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">Reviews</span>
                                                </a>
                                            )}
                                            {firm.googleMapsUrl && (
                                                <a href={firm.googleMapsUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 ${subRadiusClass} hover:bg-white/10 transition-all group text-white`}>
                                                    <MapPin size={14} className="opacity-60 group-hover:opacity-100" />
                                                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-60 group-hover:opacity-100">Location</span>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* GALLERY VIEW: Hero Media Section */}
                        {firm.heroMediaUrl && (
                            <div className={`mb-16 overflow-hidden shadow-2xl relative flex items-center justify-center min-h-[300px] md:min-h-[400px] ${radiusClass}`} style={{ backgroundColor: 'var(--firm-secondary)' }}>
                                {isVideo(firm.heroMediaUrl) ? (
                                    <video src={firm.heroMediaUrl} autoPlay loop muted playsInline className="max-w-full max-h-[70vh] object-contain" />
                                ) : (
                                    <img src={firm.heroMediaUrl} className="max-w-full max-h-[70vh] object-contain" alt="Firm Hero Banner" />
                                )}
                            </div>
                        )}

                        {/* Tab Switcher and Search */}
                        <div className={`mb-16 p-4 pr-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden ${radiusClass}`} style={{ backgroundColor: 'var(--firm-secondary)' }}>
                            <div className="flex-1 w-full relative group">
                                <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/30" size={20} />
                                <input type="text" placeholder="Search..." className={`h-16 w-full bg-white/50 border border-black/5 pl-14 pr-6 text-lg font-bold text-black outline-none ${subRadiusClass}`} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                            </div>
                            <div className="flex items-center gap-4">
                                {(firm.viewLayoutMode === 'BOTH' || !firm.viewLayoutMode) && (
                                    <div className={`flex h-16 items-center bg-white/50 p-2 border border-black/5 ${subRadiusClass}`}>
                                        <button
                                            onClick={() => {
                                                if (activeTab === 'DEALS') setViewMode("GRID");
                                                else setTeamViewMode("GRID");
                                            }}
                                            className={`flex h-full items-center justify-center w-12 transition-all ${subRadiusClass} ${(activeTab === 'DEALS' ? viewMode === 'GRID' : teamViewMode === 'GRID') ? "bg-white text-black shadow-lg" : "text-black/30 hover:text-black"}`}
                                        >
                                            <LayoutGrid size={18} />
                                        </button>
                                        <button
                                            onClick={() => {
                                                if (activeTab === 'DEALS') setViewMode("LIST");
                                                else setTeamViewMode("LIST");
                                            }}
                                            className={`flex h-full items-center justify-center w-12 transition-all ${subRadiusClass} ${(activeTab === 'DEALS' ? viewMode === 'LIST' : teamViewMode === 'LIST') ? "bg-white text-black shadow-lg" : "text-black/30 hover:text-black"}`}
                                        >
                                            <List size={18} />
                                        </button>
                                    </div>
                                )}
                                <div className={`flex h-16 items-center bg-white/50 p-2 border border-black/5 ${subRadiusClass}`}>
                                    <button onClick={() => setActiveTab("DEALS")} className={`flex h-full items-center gap-3 px-12 text-xs font-black uppercase tracking-widest transition-all ${subRadiusClass} ${activeTab === "DEALS" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}>Portfolio</button>
                                    <button onClick={() => setActiveTab("PEOPLE")} className={`flex h-full items-center gap-3 px-12 text-xs font-black uppercase tracking-widest transition-all ${subRadiusClass} ${activeTab === "PEOPLE" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}>Team</button>
                                </div>
                            </div>
                        </div>

                        {activeTab === "DEALS" ? (
                            <div className="space-y-12">
                                <div className="flex flex-wrap items-center gap-3">
                                    {CATEGORIES.map(cat => (
                                        <button key={cat} onClick={() => setFilter(cat)} className={`px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all ${subRadiusClass} ${filter === cat ? "bg-white text-black shadow-lg" : "border border-black/10 text-black/40 hover:bg-black/5"}`}>{cat}</button>
                                    ))}
                                    <div className="ml-auto flex items-center gap-2 mr-4 opacity-30 text-xs font-black uppercase tracking-widest" style={{ color: 'var(--firm-text)' }}>{filteredDeals.length} assets</div>
                                </div>

                                <motion.div layout className={viewMode === "GRID" ? "grid gap-12 sm:grid-cols-2" : "flex flex-col gap-10"}>
                                    <AnimatePresence mode="popLayout">
                                        {filteredDeals.map((deal, index) => {
                                            const isReversed = viewMode === "LIST" && firm.portfolioListStyle === 'ALTERNATING' && index % 2 !== 0;
                                            return (
                                                <div key={deal.id} className={`transition-all duration-500 overflow-hidden ${radiusClass} ${focusedDealId === deal.id ? 'ring-4 ring-[var(--firm-primary)] ring-offset-4 ring-offset-[var(--firm-bg)]' : ''}`} style={{ boxShadow: 'var(--card-shadow)' }}>
                                                    <DealCard deal={deal} index={index} isListView={viewMode === "LIST"} firm={firm} isPreview={isPreview} onMemberClick={onMemberClick} onDealClick={onDealClick} isReversed={isReversed} />
                                                </div>
                                            );
                                        })}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                        ) : (
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={teamViewMode === "GRID" ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-8"}>
                                {firmTeamMembers.map((member, index) => {
                                    const isReversed = teamViewMode === "LIST" && firm.teamListStyle === 'ALTERNATING' && index % 2 !== 0;
                                    return (
                                        <div key={member.id} id={`member-${member.id}`} className={`transition-all duration-500 overflow-hidden ${radiusClass} ${focusedMemberId === member.id ? 'ring-4 ring-[var(--firm-primary)] ring-offset-8 ring-offset-[var(--firm-bg)]' : ''}`} style={{ boxShadow: 'var(--card-shadow)' }}>
                                            <div onClick={(e) => { if (isPreview) { e.preventDefault(); onMemberClick?.(member.id); } }} className="cursor-pointer h-full">
                                                <Link
                                                    href={isPreview ? "#" : `/team/${member.slug}`}
                                                    className={`group overflow-hidden border border-black/5 p-6 flex ${radiusClass} ${teamViewMode === "GRID" ? "flex-col" : `flex-row items-center ${isReversed ? 'flex-row-reverse text-right' : ''}`}`}
                                                    style={{
                                                        backgroundColor: 'var(--member-card-bg)',
                                                        gap: 'var(--member-photo-spacing)'
                                                    }}
                                                >
                                                    <div className={`overflow-hidden shadow-md border-4 border-white shrink-0 ${cardRadiusClass} ${teamViewMode === "GRID" ? "aspect-[4/5] w-full mb-6" : "h-40 w-40"}`}>
                                                        <img src={member.imageURL} alt={member.name} className="h-full w-full object-cover transition-transform group-hover:scale-110" />
                                                    </div>
                                                    <div className="space-y-3 px-2 flex-1">
                                                        <h3 className="text-3xl font-black leading-none" style={{ color: 'var(--firm-text)' }}>{member.name}</h3>
                                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40" style={{ color: 'var(--firm-text)' }}>{member.role}</p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </motion.div>
                        )}
                    </>
                )}

                {/* Footer Utility */}
                <div className="mt-32 pt-16 text-center border-t border-black/5">
                    <div className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em] opacity-10" style={{ color: 'var(--firm-text)' }}>
                        {firm.name} proprietary portal // closed ecosystem
                    </div>
                </div>
            </div>
        </div>
    );
}
