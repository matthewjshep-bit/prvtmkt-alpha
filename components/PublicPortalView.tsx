"use client";

import { useState, useRef, useEffect } from "react";
import DealCard from "@/components/DealCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, LayoutGrid, Globe, Building2, UserPlus, FilePlus, ArrowLeft, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { Firm, Deal, TeamMember } from "@/context/DataContext";

const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

interface PublicPortalViewProps {
    firm: Firm;
    deals: Deal[];
    teamMembers: TeamMember[];
    isInitialized: boolean;
    isPreview?: boolean;
}

export default function PublicPortalView({
    firm,
    deals,
    teamMembers,
    isInitialized,
    isPreview = false
}: PublicPortalViewProps) {
    const [activeTab, setActiveTab] = useState("DEALS");
    const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
    const [teamViewMode, setTeamViewMode] = useState<"GRID" | "LIST">("GRID");
    const [filter, setFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");
    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

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

    const firmTeamMembers = teamMembers.filter((m) => (m.firmIds || []).includes(firm.id));

    const filteredDeals = deals.filter((deal) => {
        const isFirmDeal = deal.firmId === firm.id;
        const matchesFilter = filter === "ALL" || deal.assetType === filter;
        const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase());
        return isFirmDeal && matchesFilter && matchesSearch;
    });

    // Dynamic Theming
    const themeStyles = {
        '--firm-bg': firm.backgroundColor || '#0a0a0a',
        '--firm-text': firm.fontColor || '#ffffff',
        '--firm-primary': firm.primaryColor || '#ffffff',
        '--firm-secondary': firm.accentColor || '#151515',
    } as React.CSSProperties;

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
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    return (
        <div
            className={`min-h-full pb-20 transition-colors duration-500 rounded-[2.5rem] overflow-hidden ${isPreview ? "" : "pt-28"}`}
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className={`container mx-auto ${isPreview ? "px-4" : "px-6"}`}>
                {/* Exit / Breadcrumb Utility - Only shown if agency branding is toggled off */}
                {!isPreview && firm.showAgencyBranding === false && (
                    <div className="mb-6 pt-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
                            style={{ color: 'var(--firm-text)' }}
                        >
                            <ArrowLeft size={14} />
                            Back to Explore
                        </Link>
                    </div>
                )}

                {/* Distinct Firm Header (Soft-Rectangular) */}
                <div className={`mb-8 rounded-[2.5rem] p-10 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 ${(!isPreview && firm.showAgencyBranding !== false) ? 'mt-8' : ''}`} style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="h-32 w-80 flex-shrink-0">
                            {firm.logoUrl ? (
                                <img
                                    src={firm.logoUrl}
                                    alt={firm.name}
                                    className="h-full w-full object-contain object-left"
                                />
                            ) : (
                                <div className="flex items-center gap-4 h-full" style={{ color: 'var(--firm-primary)' }}>
                                    <Building2 size={64} />
                                    <span className="text-5xl font-black uppercase tracking-widest">{firm.name}</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center lg:text-left">
                            <h1 className="mb-4 text-7xl font-black tracking-tight text-black">
                                {firm.name}
                            </h1>
                            <div
                                className="text-2xl font-bold opacity-40 leading-relaxed max-w-2xl prose prose-invert prose-p:leading-relaxed"
                                style={{ color: 'inherit' }}
                                dangerouslySetInnerHTML={{ __html: firm.bio || "Professional institutional track record and specialized team directory." }}
                            />

                            {(firm.linkedInUrl || firm.googleReviewsUrl || firm.physicalAddress) && (
                                <div className="mt-8 flex flex-wrap items-center gap-6">
                                    {firm.linkedInUrl && (
                                        <a
                                            href={firm.linkedInUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black/10 transition-all"
                                        >
                                            <Globe size={14} className="text-black/40" />
                                            LinkedIn
                                        </a>
                                    )}
                                    {firm.googleReviewsUrl && (
                                        <a
                                            href={firm.googleReviewsUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 rounded-full bg-black/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-black hover:bg-black/10 transition-all"
                                        >
                                            <div className="flex text-yellow-500">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className="h-3 w-3 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" /></svg>
                                                ))}
                                            </div>
                                            Reviews
                                        </a>
                                    )}
                                    {firm.physicalAddress && (
                                        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                                            <Building2 size={14} />
                                            <span className="max-w-[250px] truncate">{firm.physicalAddress}</span>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Conditional Hero Media (Banner) */}
                {firm.heroMediaUrl && (
                    <div className="mb-16 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        <div className="relative aspect-[21/9] w-full overflow-hidden rounded-[3rem] border border-white/10 shadow-3xl bg-black/20 backdrop-blur-sm">
                            {isVideo(firm.heroMediaUrl) ? (
                                <div
                                    className="group/video relative h-full w-full cursor-pointer"
                                    onClick={toggleAudio}
                                >
                                    <video
                                        ref={videoRef}
                                        key={firm.heroMediaUrl.slice(-32)}
                                        src={firm.heroMediaUrl}
                                        className="h-full w-full object-cover"
                                        autoPlay
                                        loop
                                        playsInline
                                        muted={isMuted}
                                    />
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setIsMuted(!isMuted);
                                        }}
                                        className="absolute bottom-8 right-8 z-10 flex items-center gap-3 rounded-2xl bg-black/40 backdrop-blur-md px-6 py-4 text-xs font-black uppercase tracking-widest text-white border border-white/10 hover:bg-black/60 transition-all opacity-0 group-hover/video:opacity-100 shadow-2xl"
                                    >
                                        {isMuted ? (
                                            <>
                                                <VolumeX size={18} className="text-red-500" />
                                                Sound Off
                                            </>
                                        ) : (
                                            <>
                                                <Volume2 size={18} className="text-brand-gold" />
                                                Sound On
                                            </>
                                        )}
                                    </button>

                                    {isMuted && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity group-hover/video:bg-black/40 z-20"
                                            onClick={toggleAudio}
                                        >
                                            <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-500">
                                                <div className="h-24 w-24 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl">
                                                    <VolumeX size={48} className="text-white animate-pulse" />
                                                </div>
                                                <div className="text-center space-y-2">
                                                    <span className="block text-sm font-black uppercase tracking-[0.4em] text-white drop-shadow-lg">Click to Unmute</span>
                                                    <span className="block text-[9px] font-bold uppercase tracking-[0.2em] text-white/40">Browser Autoplay Initialized Muted</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <img
                                    src={firm.heroMediaUrl}
                                    className="h-full w-full object-cover"
                                    alt={`${firm.name} Portfolio Hero`}
                                />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        </div>
                    </div>
                )}

                {/* Distinct Search & Navigation Area (Soft-Rectangular) */}
                <div className="mb-16 rounded-[2rem] p-4 pr-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden" style={{ backgroundColor: 'var(--firm-secondary)' }}>
                    <div className="flex flex-1 items-center gap-4 w-full">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-16 w-full rounded-2xl bg-white/50 border border-black/5 pl-14 pr-6 text-lg font-bold text-black outline-none transition-all focus:bg-white focus:border-black/10 placeholder:text-black/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex h-16 items-center rounded-2xl bg-white/50 p-2 border border-black/5">
                            <button
                                onClick={() => setActiveTab("DEALS")}
                                className={`flex h-full items-center gap-3 rounded-xl px-12 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "DEALS" ? "bg-white text-black shadow-lg scale-[1.02]" : "text-black/40 hover:text-black"}`}
                            >
                                <LayoutGrid size={20} />
                                Portfolio
                            </button>
                            <button
                                onClick={() => setActiveTab("PEOPLE")}
                                className={`flex h-full items-center gap-3 rounded-xl px-12 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "PEOPLE" ? "bg-white text-black shadow-lg scale-[1.02]" : "text-black/40 hover:text-black"}`}
                            >
                                <Globe size={20} />
                                Team
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === "DEALS" ? (
                    <>
                        {deals.filter(d => d.firmId === firm.id).length > 0 ? (
                            <>
                                {/* Standardized Filter Bar with Integrated Toggles */}
                                <div className="mb-12 flex flex-wrap items-center gap-3">
                                    <div className="mr-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--firm-text)' }}>
                                        <Filter size={14} />
                                        Asset Type
                                    </div>

                                    {(() => {
                                        const availableTypes = Array.from(new Set(deals.filter(d => d.firmId === firm.id).map(d => d.assetType)));
                                        const dynamicCategories = CATEGORIES.filter(cat => cat === "ALL" || availableTypes.includes(cat));

                                        return dynamicCategories.map((cat) => {
                                            const isActive = filter === cat;
                                            return (
                                                <button
                                                    key={cat}
                                                    onClick={() => setFilter(cat)}
                                                    className={`rounded-xl px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                                                        ? "shadow-[0_10px_30px_-10px_rgba(0,0,0,0.3)] scale-105 border-0"
                                                        : "border border-black/10 hover:border-black/30 hover:bg-black/5"
                                                        }`}
                                                    style={{
                                                        backgroundColor: isActive ? 'var(--firm-primary)' : 'transparent',
                                                        color: isActive ? 'var(--firm-bg)' : 'rgba(0,0,0,0.6)',
                                                        boxShadow: isActive ? `0 10px 30px -10px ${firm.primaryColor}50` : 'none'
                                                    }}
                                                >
                                                    {cat.replace("_", " ")}
                                                </button>
                                            );
                                        });
                                    })()}

                                    <div className="ml-auto flex items-center gap-4">
                                        <div className="hidden lg:flex items-center gap-2 mr-4 opacity-30" style={{ color: 'var(--firm-text)' }}>
                                            <span className="text-xs font-black uppercase tracking-widest">
                                                {filteredDeals.length} assets identified
                                            </span>
                                        </div>

                                        <div className="flex h-12 items-center rounded-xl bg-black/5 p-1.5 border border-black/5">
                                            <button
                                                onClick={() => setViewMode("GRID")}
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${viewMode === "GRID" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}
                                                title="Grid View"
                                            >
                                                <LayoutGrid size={16} />
                                            </button>
                                            <button
                                                onClick={() => setViewMode("LIST")}
                                                className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${viewMode === "LIST" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}
                                                title="List View"
                                            >
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <motion.div
                                    layout
                                    className={viewMode === "GRID" ? "grid gap-12 sm:grid-cols-2 lg:grid-cols-2" : "flex flex-col gap-10"}
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredDeals.map((deal, index) => (
                                            <div key={deal.id} className={viewMode === "LIST" ? "w-full" : ""}>
                                                <DealCard deal={deal} index={index} isListView={viewMode === "LIST"} />
                                            </div>
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {filteredDeals.length === 0 && (
                                    <div className="flex h-64 flex-col items-center justify-center rounded-[3rem] border-2 border-dashed border-white/5 bg-white/5">
                                        <p className="text-lg font-bold opacity-30 uppercase tracking-widest">No matching assets</p>
                                        <button
                                            onClick={() => { setFilter("ALL"); setSearchQuery(""); }}
                                            className="mt-4 font-black uppercase tracking-widest text-xs transition-all hover:opacity-70"
                                            style={{ color: 'var(--firm-primary)' }}
                                        >
                                            Reset filters
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-white/10 bg-white/5 p-24 text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-black/20">
                                    <FilePlus size={40} className="animate-pulse" style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-3xl font-black">Private Portfolio Hidden</h2>
                                <p className="mt-4 max-w-sm font-bold opacity-30 leading-relaxed uppercase text-xs tracking-widest" style={{ color: 'var(--firm-text)' }}>
                                    Capture your firm's market velocity. Standardized digital track record required.
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        <div className="mb-12 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-30" style={{ color: 'var(--firm-text)' }}>
                                <Globe size={14} />
                                Leadership Registry
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="hidden lg:flex items-center gap-2 mr-4 opacity-30" style={{ color: 'var(--firm-text)' }}>
                                    <span className="text-xs font-black uppercase tracking-widest">
                                        {firmTeamMembers.length} Partners identified
                                    </span>
                                </div>

                                <div className="flex h-12 items-center rounded-xl bg-black/5 p-1.5 border border-black/5">
                                    <button
                                        onClick={() => setTeamViewMode("GRID")}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${teamViewMode === "GRID" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}
                                        title="Grid View"
                                    >
                                        <LayoutGrid size={16} />
                                    </button>
                                    <button
                                        onClick={() => setTeamViewMode("LIST")}
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all ${teamViewMode === "LIST" ? "bg-white text-black shadow-lg" : "text-black/40 hover:text-black"}`}
                                        title="List View"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-list"><line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {firmTeamMembers.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={teamViewMode === "GRID" ? "grid gap-10 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-8"}
                            >
                                {firmTeamMembers.map((member) => (
                                    <div
                                        key={member.id}
                                        className={`group overflow-hidden rounded-[2.5rem] border border-black/5 bg-white/50 p-6 transition-all hover:scale-[1.02] hover:shadow-2xl flex ${teamViewMode === "GRID" ? "flex-col aspect-[4/5] w-full" : "flex-row items-center gap-10"}`}
                                    >
                                        <div className={`${teamViewMode === "GRID" ? "aspect-[4/5] w-full" : "h-40 w-40 shrink-0"} overflow-hidden rounded-[2rem] shadow-md border-4 border-white`}>
                                            <img
                                                src={member.imageURL}
                                                alt={member.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="space-y-3 px-2 flex-1">
                                            <div className="space-y-1">
                                                <h3 className="text-3xl font-black text-black leading-none">{member.name}</h3>
                                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--firm-primary)]">{member.role}</p>
                                            </div>
                                            <p className={`text-sm font-bold leading-relaxed text-black/60 ${teamViewMode === "GRID" ? "line-clamp-3" : "line-clamp-4 max-w-2xl"}`}>
                                                {member.bio}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-white/10 bg-white/5 p-24 text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-black/20">
                                    <UserPlus size={40} style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-3xl font-black">Team Directory Active</h2>
                                <p className="mt-4 max-w-sm font-bold opacity-30 leading-relaxed uppercase text-xs tracking-widest" style={{ color: 'var(--firm-text)' }}>
                                    Showcase the experts behind your firm. High-contrast profile required.
                                </p>
                            </div>
                        )}
                    </>
                )}

                {/* Footer Utility */}
                <div className="mt-32 pt-16 text-center">
                    <div
                        className="inline-flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.5em] opacity-10"
                        style={{ color: 'var(--firm-text)' }}
                    >
                        {firm.name} proprietary portal // closed ecosystem
                    </div>
                </div>
            </div>
        </div>
    );
}
