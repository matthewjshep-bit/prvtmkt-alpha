"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import DealCard from "@/components/DealCard";
import { useState, useMemo, useRef, useEffect } from "react";
import { Mail, Briefcase, Award, Building2, ChevronLeft, Linkedin, Phone, LayoutGrid, List, Search, Globe, Tag, MapPin, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function TeamMemberPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { teamMembers, deals, firms, isInitialized } = useData();
    const { slug } = use(params);

    const [viewMode, setViewMode] = useState<"GRID" | "LIST">("GRID");
    const [activeFilter, setActiveFilter] = useState("ALL");
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

    const isVideo = (url: string | undefined) => {
        if (!url) return false;
        const lowerUrl = url.toLowerCase();
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime', '.m4v'];
        const hasVideoExtension = videoExtensions.some(ext => lowerUrl.split(/[?#]/)[0].endsWith(ext));
        const isVideoDataUrl = url.startsWith('data:video/') || lowerUrl.includes('video/quicktime') || lowerUrl.includes('video/mp4');
        return hasVideoExtension || isVideoDataUrl || (url.startsWith('data:') && !lowerUrl.includes('image/'));
    };

    // Look up member
    const member = teamMembers.find((m) => m.slug === slug) || teamMembers.find((m) => m.id === slug);
    const memberDeals = member ? deals.filter((d) => (d.teamMemberIds || []).includes(member.id)) : [];
    const firm = member ? firms.find(f => (member.firmIds || []).includes(f.id)) : undefined;

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

    // Hook definitions (must be top-level)
    const availableAssetTypes = useMemo(() => {
        if (!member) return [];
        const types = new Set(memberDeals.map(d => d.assetType));
        return Array.from(types).sort();
    }, [member, memberDeals]);

    const filteredDeals = useMemo(() => {
        if (!member) return [];
        return memberDeals.filter(deal => {
            const matchesFilter = activeFilter === "ALL" || deal.assetType === activeFilter;
            const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                deal.assetType.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesFilter && matchesSearch;
        });
    }, [member, memberDeals, activeFilter, searchQuery]);

    // Early returns after all hooks
    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[var(--firm-bg)]">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-[var(--firm-primary)]/30 border-t-[var(--firm-primary)]" />
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen bg-brand-dark pt-32 pb-20 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
                    <p className="text-foreground/50 mb-8">The professional profile you're looking for doesn't exist or has been moved.</p>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:shadow-lg" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                        <ChevronLeft size={18} />
                        Return to Team
                    </Link>
                </div>
            </div>
        );
    }

    // Dynamic Theming Inheritance
    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.accentColor || '#ffffff',
        '--firm-secondary': firm?.accentColor || '#f5f5f5',
    } as React.CSSProperties;

    return (
        <div
            className="min-h-screen pt-24 pb-20 transition-colors duration-500"
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className="container mx-auto px-6">
                {/* Back Button Utility */}
                <div className="mb-8">
                    <Link
                        href={firm ? `/firms/${firm.slug || firm.id}` : "/"}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
                        style={{ color: 'var(--firm-text)' }}
                    >
                        <ChevronLeft size={16} />
                        {firm ? `Back to ${firm.name}` : 'Back to Team'}
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start">
                    <div className="relative">
                        <div className="h-48 w-48 overflow-hidden rounded-3xl border-4 bg-brand-gray-900 shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            {member.imageURL ? (
                                <img
                                    src={member.imageURL}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-4xl font-bold opacity-20">
                                    {member.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-xl" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                            <Award size={24} />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                            <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--firm-text)' }}>
                                {member.name}
                            </h1>
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
                                <p className="text-xl font-medium" style={{ color: 'var(--firm-primary)' }}>{member.role}</p>
                                {firm && (
                                    <div className="flex items-center gap-1.5 text-xl font-medium opacity-40">
                                        <Building2 size={20} />
                                        {firm.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div
                            className="mb-8 max-w-2xl text-lg leading-relaxed opacity-70 prose prose-lg prose-invert max-w-none"
                            dangerouslySetInnerHTML={{ __html: member.bio?.replace(/&lt;/g, '<').replace(/&gt;/g, '>') || "Principal professional with a specialization in high-value commercial real estate transactions and asset management." }}
                        />

                        {member.heroMediaUrl && (
                            <div className="mb-10 overflow-hidden rounded-[2.5rem] bg-black/5 border border-black/5 shadow-2xl relative">
                                <div className="aspect-[21/9] md:aspect-[3/1] w-full">
                                    {isVideo(member.heroMediaUrl) ? (
                                        <div
                                            className="group/video relative h-full w-full cursor-pointer"
                                            onClick={toggleAudio}
                                        >
                                            <video
                                                ref={videoRef}
                                                src={member.heroMediaUrl}
                                                autoPlay
                                                muted={isMuted}
                                                loop
                                                playsInline
                                                className="h-full w-full object-cover"
                                            />

                                            {/* Audio Controller Overlay */}
                                            <button
                                                type="button"
                                                onClick={toggleAudio}
                                                className="absolute bottom-6 right-6 z-10 flex items-center gap-3 rounded-2xl bg-black/40 backdrop-blur-md px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white border border-white/10 hover:bg-black/60 transition-all opacity-0 group-hover/video:opacity-100 shadow-2xl"
                                            >
                                                {isMuted ? (
                                                    <>
                                                        <VolumeX size={16} className="text-red-500" />
                                                        Sound Off
                                                    </>
                                                ) : (
                                                    <>
                                                        <Volume2 size={16} style={{ color: 'var(--firm-primary)' }} />
                                                        Sound On
                                                    </>
                                                )}
                                            </button>

                                            {/* Center Overlay for Muted State */}
                                            {isMuted && (
                                                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover/video:bg-black/40 transition-all z-20">
                                                    <div className="flex flex-col items-center gap-4">
                                                        <div className="h-16 w-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl transition-transform group-hover/video:scale-110">
                                                            <VolumeX size={32} className="text-white animate-pulse" />
                                                        </div>
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 drop-shadow-lg">Click to Unmute</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <img
                                            src={member.heroMediaUrl}
                                            className="h-full w-full object-cover"
                                            alt="Professional Hero"
                                        />
                                    )}
                                </div>
                            </div>
                        )}

                        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                            <a
                                href={`mailto:${member.email || "#"}`}
                                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:opacity-80"
                                style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}
                            >
                                <Mail size={18} />
                                Contact Email
                            </a>
                            {member.linkedInUrl && (
                                <a
                                    href={member.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]"
                                >
                                    <Linkedin size={18} />
                                    LinkedIn Profile
                                </a>
                            )}
                            {member.phoneNumber && (
                                <a
                                    href={`tel:${member.phoneNumber}`}
                                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]"
                                >
                                    <Phone size={18} />
                                    {member.phoneNumber}
                                </a>
                            )}
                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold">
                                <Briefcase size={18} style={{ color: 'var(--firm-primary)' }} />
                                <span className="opacity-60">{memberDeals.length} Deals Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-20 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* --- Track Record Section --- */}
                <div className="space-y-12">
                    {/* 1. Dashboard Header */}
                    <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                        <div className="space-y-4">
                            <h2 className="text-4xl font-black tracking-tight text-white uppercase">
                                Track <span style={{ color: 'var(--firm-primary)' }}>Record</span>
                            </h2>
                            <p className="max-w-md text-sm font-medium leading-relaxed text-white/40">
                                Exclusive digital tombstones representing verified execution and high-performance asset management by this professional.
                            </p>
                        </div>

                        {/* Search & Toggle Group */}
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="relative group">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 transition-colors group-focus-within:text-[var(--firm-primary)]" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search track record..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-14 w-full rounded-2xl border border-white/5 bg-white/5 pl-14 pr-6 text-sm font-bold text-white outline-none transition-all focus:border-[var(--firm-primary)]/50 focus:bg-white/10 md:w-80"
                                />
                            </div>

                            {/* View Toggle */}
                            <div className="flex h-14 items-center gap-1 rounded-2xl border border-white/5 bg-white/5 p-1.5 backdrop-blur-xl">
                                <button
                                    onClick={() => setViewMode("GRID")}
                                    className={`flex h-full items-center gap-2 rounded-xl px-5 transition-all ${viewMode === "GRID" ? "shadow-lg" : "text-white/40 hover:bg-white/5"}`}
                                    style={viewMode === "GRID" ? { backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' } : {}}
                                >
                                    <LayoutGrid size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Grid</span>
                                </button>
                                <button
                                    onClick={() => setViewMode("LIST")}
                                    className={`flex h-full items-center gap-2 rounded-xl px-5 transition-all ${viewMode === "LIST" ? "shadow-lg" : "text-white/40 hover:bg-white/5"}`}
                                    style={viewMode === "LIST" ? { backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' } : {}}
                                >
                                    <List size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">List</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* 2. Asset Type Filter Bar (Smart Pruning) */}
                    <div className="flex flex-wrap items-center gap-3 border-y border-white/5 py-8">
                        <div className="flex items-center gap-2 pr-6 border-r border-white/5 mr-3">
                            <Tag size={14} style={{ color: 'var(--firm-primary)' }} />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Filter</span>
                        </div>

                        <button
                            onClick={() => setActiveFilter("ALL")}
                            className={`rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeFilter === "ALL" ? "shadow-lg" : "border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:bg-white/10"}`}
                            style={activeFilter === "ALL" ? { border: '1px solid var(--firm-primary)', backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' } : {}}
                        >
                            All Assets
                        </button>

                        {availableAssetTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all border ${activeFilter === type ? "shadow-lg" : "border-white/5 bg-white/5 text-white/40 hover:border-white/20 hover:bg-white/10"}`}
                                style={activeFilter === type ? { border: '1px solid var(--firm-primary)', backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' } : {}}
                            >
                                {type.replace("_", " ")}
                            </button>
                        ))}
                    </div>

                    {/* 3. Results Area */}
                    <div className="min-h-[400px]">
                        {filteredDeals.length > 0 ? (
                            <div className={viewMode === "GRID" ? "grid gap-8 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-6"}>
                                {filteredDeals.map((deal, index) => (
                                    <DealCard
                                        key={deal.id}
                                        deal={deal}
                                        index={index}
                                        isListView={viewMode === "LIST"}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] p-24 text-center">
                                <div className="mb-6 rounded-full bg-white/5 p-8">
                                    <Briefcase size={40} className="text-white/10" />
                                </div>
                                <h3 className="text-2xl font-black text-white/80 uppercase tracking-tight">No deals found</h3>
                                <p className="mt-2 text-sm font-medium text-white/30">Adjust your filters or search to view track record.</p>
                                <button
                                    onClick={() => { setActiveFilter("ALL"); setSearchQuery(""); }}
                                    className="mt-8 text-[10px] font-black uppercase tracking-[0.2em] hover:underline"
                                    style={{ color: 'var(--firm-primary)' }}
                                >
                                    Reset all filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
