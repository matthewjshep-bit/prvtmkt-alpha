"use client";

import { useState, use } from "react";
import { useData } from "@/context/DataContext";
import DealCard from "@/components/DealCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, LayoutGrid, Globe, Building2, UserPlus, FilePlus, ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";

const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

export default function FirmProfilePage({
    params,
}: {
    params: Promise<{ slugOrId: string }>;
}) {
    const { firms, deals, teamMembers, isInitialized } = useData();
    const { slugOrId } = use(params);
    const [activeTab, setActiveTab] = useState("DEALS");
    const [filter, setFilter] = useState("ALL");
    const [searchQuery, setSearchQuery] = useState("");

    const firm = firms.find((f) => f.id === slugOrId || f.slug === slugOrId);

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    if (!firm) {
        notFound();
    }

    const firmTeamMembers = teamMembers.filter((m) => m.firmId === firm.id);

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
        '--firm-primary': firm.primaryColor || '#c5a059',
    } as React.CSSProperties;

    return (
        <div
            className="min-h-screen pt-28 pb-20 transition-colors duration-500"
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className="container mx-auto px-6">
                {/* Exit / Breadcrumb Utility - Only shown if agency branding is toggled off */}
                {firm.showAgencyBranding === false && (
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

                {/* Distinct Firm Header (Light Grey Oval) */}
                <div className={`mb-8 rounded-full bg-[#f5f5f5] p-10 md:p-14 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-10 ${firm.showAgencyBranding !== false ? 'mt-8' : ''}`}>
                    <div className="flex flex-col lg:flex-row items-center gap-12">
                        <div className="h-24 w-72 flex-shrink-0">
                            {firm.logoUrl ? (
                                <img
                                    src={firm.logoUrl}
                                    alt={firm.name}
                                    className="h-full w-full object-contain object-left"
                                />
                            ) : (
                                <div className="flex items-center gap-4 h-full" style={{ color: 'var(--firm-primary)' }}>
                                    <Building2 size={56} />
                                    <span className="text-4xl font-black uppercase tracking-widest">{firm.name}</span>
                                </div>
                            )}
                        </div>
                        <div className="text-center lg:text-left">
                            <h1 className="mb-4 text-6xl font-black tracking-tight text-black">
                                {firm.name}
                            </h1>
                            <p className="text-xl font-bold text-black/40 leading-relaxed max-w-2xl">
                                {firm.bio || "Professional institutional track record and specialized team directory."}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Distinct Search & Navigation Area (Light Grey Oval) */}
                <div className="mb-16 rounded-full bg-[#f5f5f5] p-4 pr-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
                    <div className="flex flex-1 items-center gap-4 w-full">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-black/30 group-focus-within:text-black transition-colors" size={20} />
                            <input
                                type="text"
                                placeholder="Search proprietary portfolio..."
                                className="h-14 w-full rounded-full bg-white/50 border border-black/5 pl-14 pr-6 text-base font-bold text-black outline-none transition-all focus:bg-white focus:border-black/10 placeholder:text-black/20"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex h-14 items-center rounded-full bg-white/50 p-1.5 border border-black/5">
                        <button
                            onClick={() => setActiveTab("DEALS")}
                            className={`flex h-full items-center gap-3 rounded-full px-10 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "DEALS" ? "bg-white text-black shadow-lg scale-[1.02]" : "text-black/40 hover:text-black"}`}
                        >
                            <LayoutGrid size={18} />
                            Portfolio
                        </button>
                        <button
                            onClick={() => setActiveTab("PEOPLE")}
                            className={`flex h-full items-center gap-3 rounded-full px-10 text-xs font-black uppercase tracking-widest transition-all ${activeTab === "PEOPLE" ? "bg-white text-black shadow-lg scale-[1.02]" : "text-black/40 hover:text-black"}`}
                        >
                            <Globe size={18} />
                            Directory
                        </button>
                    </div>
                </div>

                {activeTab === "DEALS" ? (
                    <>
                        {deals.filter(d => d.firmId === firm.id).length > 0 ? (
                            <>
                                {/* Standardized Filter Bar */}
                                <div className="mb-12 flex flex-wrap items-center gap-3">
                                    <div className="mr-6 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-30">
                                        <Filter size={14} />
                                        Asset Type
                                    </div>
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilter(cat)}
                                            className={`rounded-full px-6 py-2.5 text-[11px] font-black uppercase tracking-widest transition-all ${filter === cat
                                                ? "shadow-xl scale-105"
                                                : "bg-white/5 opacity-50 hover:bg-white/10 hover:opacity-100"
                                                }`}
                                            style={{
                                                backgroundColor: filter === cat ? 'var(--firm-primary)' : '',
                                                color: filter === cat ? 'var(--firm-bg)' : 'var(--firm-text)'
                                            }}
                                        >
                                            {cat.replace("_", " ")}
                                        </button>
                                    ))}

                                    <div className="ml-auto hidden items-center gap-2 lg:flex opacity-30">
                                        <span className="text-xs font-black uppercase tracking-widest">
                                            {filteredDeals.length} assets identified
                                        </span>
                                    </div>
                                </div>

                                {/* Portfolio Grid */}
                                <motion.div
                                    layout
                                    className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredDeals.map((deal, index) => (
                                            <DealCard key={deal.id} deal={deal} index={index} />
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
                            /* Empty Portfolio State */
                            <div className="flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-white/10 bg-white/5 p-24 text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-black/20">
                                    <FilePlus size={40} className="animate-pulse" style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-3xl font-black">Private Portfolio Hidden</h2>
                                <p className="mt-4 max-w-sm font-bold opacity-30 leading-relaxed uppercase text-xs tracking-widest">
                                    Capture your firm's market velocity. Standardized digital track record required.
                                </p>
                                <Link
                                    href="/deals/new"
                                    className="mt-10 rounded-full px-10 py-5 text-xs font-black uppercase tracking-widest transition-all hover:scale-105 hover:shadow-2xl"
                                    style={{
                                        backgroundColor: 'var(--firm-primary)',
                                        color: 'var(--firm-bg)'
                                    }}
                                >
                                    Establish Digital Tombstone
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    /* Enhanced People Grid with Persona Scaling */
                    <>
                        {firmTeamMembers.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4"
                            >
                                {firmTeamMembers.map((member) => (
                                    <Link
                                        key={member.id}
                                        href={`/team/${member.slug || member.id}`}
                                        className="group overflow-hidden rounded-[3rem] bg-[#f5f5f5] p-6 transition-all hover:scale-[1.03] hover:shadow-2xl"
                                    >
                                        <div className="aspect-square w-full overflow-hidden rounded-[2.5rem] mb-6 shadow-md border-4 border-white">
                                            <img
                                                src={member.imageURL}
                                                alt={member.name}
                                                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                        <div className="space-y-1 px-2">
                                            <h3 className="text-2xl font-black text-black">{member.name}</h3>
                                            <p className="text-xs font-black uppercase tracking-[0.2em] text-black/40">{member.role}</p>
                                            <p className="mt-4 text-sm font-bold leading-relaxed text-black/60 line-clamp-3">{member.bio}</p>
                                        </div>
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            /* Empty Team State */
                            <div className="flex flex-col items-center justify-center rounded-[4rem] border-2 border-dashed border-white/10 bg-white/5 p-24 text-center">
                                <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-black/20">
                                    <UserPlus size={40} style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-3xl font-black">Team Directory Active</h2>
                                <p className="mt-4 max-w-sm font-bold opacity-30 leading-relaxed uppercase text-xs tracking-widest">
                                    Showcase the experts behind your firm. High-contrast profile required.
                                </p>
                                <Link
                                    href="/admin/people"
                                    className="mt-10 rounded-full border-2 px-10 py-5 text-xs font-black uppercase tracking-widest transition-all hover:opacity-70"
                                    style={{
                                        borderColor: 'var(--firm-primary)',
                                        color: 'var(--firm-primary)'
                                    }}
                                >
                                    ONBOARD LEADERSHIP
                                </Link>
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
