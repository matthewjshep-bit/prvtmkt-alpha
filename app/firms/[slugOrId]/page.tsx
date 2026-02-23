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

                {/* Firm Brand Header */}
                <div className={`mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end ${firm.showAgencyBranding !== false ? 'pt-8' : ''}`}>
                    <div className="space-y-4 max-w-2xl">
                        <div className="h-12 w-48">
                            {firm.logoUrl ? (
                                <img
                                    src={firm.logoUrl}
                                    alt={firm.name}
                                    className="h-full object-contain object-left"
                                />
                            ) : (
                                <div className="flex items-center gap-2 h-full" style={{ color: 'var(--firm-primary)' }}>
                                    <Building2 size={32} />
                                    <span className="text-xl font-bold uppercase tracking-widest">{firm.name}</span>
                                </div>
                            )}
                        </div>
                        <div>
                            <h1 className="mb-2 text-4xl font-bold tracking-tight" style={{ color: 'var(--firm-text)' }}>
                                {firm.name} <span style={{ color: 'var(--firm-primary)' }}>Platform</span>
                            </h1>
                            <p className="text-lg opacity-60 leading-relaxed">
                                {firm.bio || "Institutional track record and professional team."}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        {activeTab === "DEALS" && deals.filter(d => d.firmId === firm.id).length > 0 && (
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search portfolio..."
                                    className="h-11 w-full rounded-xl border border-white/5 bg-white/5 pl-10 pr-4 text-sm outline-none transition-all focus:border-brand-gold/50 md:w-64"
                                    style={{ color: 'var(--firm-text)' }}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        )}

                        <div className="flex h-11 items-center rounded-xl bg-white/5 border border-white/5 p-1">
                            <button
                                onClick={() => setActiveTab("DEALS")}
                                className={`flex h-full items-center gap-2 rounded-lg px-4 text-xs font-bold transition-all ${activeTab === "DEALS" ? "bg-white/10" : "opacity-40 hover:opacity-100"}`}
                                style={{ color: activeTab === "DEALS" ? 'var(--firm-primary)' : 'inherit' }}
                            >
                                <LayoutGrid size={16} />
                                Portfolio
                            </button>
                            <button
                                onClick={() => setActiveTab("PEOPLE")}
                                className={`flex h-full items-center gap-2 rounded-lg px-4 text-xs font-bold transition-all ${activeTab === "PEOPLE" ? "bg-white/10" : "opacity-40 hover:opacity-100"}`}
                                style={{ color: activeTab === "PEOPLE" ? 'var(--firm-primary)' : 'inherit' }}
                            >
                                <Globe size={16} />
                                Team
                            </button>
                        </div>
                    </div>
                </div>

                {activeTab === "DEALS" ? (
                    <>
                        {deals.filter(d => d.firmId === firm.id).length > 0 ? (
                            <>
                                {/* Filter Bar */}
                                <div className="mb-10 flex flex-wrap gap-2">
                                    {CATEGORIES.map((cat) => (
                                        <button
                                            key={cat}
                                            onClick={() => setFilter(cat)}
                                            className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${filter === cat
                                                ? "shadow-lg"
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

                                    <div className="ml-auto hidden items-center gap-2 lg:flex opacity-40">
                                        <Filter size={16} style={{ color: 'var(--firm-primary)' }} />
                                        <span className="text-xs font-semibold">
                                            {filteredDeals.length} assets identified
                                        </span>
                                    </div>
                                </div>

                                {/* Portfolio Grid */}
                                <motion.div
                                    layout
                                    className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
                                >
                                    <AnimatePresence mode="popLayout">
                                        {filteredDeals.map((deal, index) => (
                                            <DealCard key={deal.id} deal={deal} index={index} />
                                        ))}
                                    </AnimatePresence>
                                </motion.div>

                                {filteredDeals.length === 0 && (
                                    <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 bg-white/5">
                                        <p className="text-lg font-medium opacity-40">No assets found in this segment</p>
                                        <button
                                            onClick={() => { setFilter("ALL"); setSearchQuery(""); }}
                                            className="mt-4 transition-all hover:opacity-70"
                                            style={{ color: 'var(--firm-primary)' }}
                                        >
                                            Reset filters
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Empty Portfolio State */
                            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-20 text-center">
                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/20">
                                    <FilePlus size={32} className="animate-pulse" style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-2xl font-bold">No Assets Published</h2>
                                <p className="mt-2 max-w-sm opacity-40">
                                    Capture your firm's market velocity. Start building your digital track record today.
                                </p>
                                <Link
                                    href="/deals/new"
                                    className="mt-8 rounded-xl px-8 py-3 text-sm font-bold transition-all hover:shadow-lg"
                                    style={{
                                        backgroundColor: 'var(--firm-primary)',
                                        color: 'var(--firm-bg)'
                                    }}
                                >
                                    Create Your First Tombstone
                                </Link>
                            </div>
                        )}
                    </>
                ) : (
                    /* People Grid */
                    <>
                        {firmTeamMembers.length > 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
                            >
                                {firmTeamMembers.map((member) => (
                                    <Link
                                        key={member.id}
                                        href={`/team/${member.slug || member.id}`}
                                        className="glass group overflow-hidden rounded-3xl border border-white/5 bg-white/5 p-4 transition-all hover:border-white/20"
                                    >
                                        <div className="aspect-square w-full overflow-hidden rounded-2xl mb-4">
                                            <img
                                                src={member.imageURL}
                                                alt={member.name}
                                                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold group-hover:opacity-80 transition-colors" style={{ color: 'var(--firm-text)' }}>{member.name}</h3>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-60" style={{ color: 'var(--firm-primary)' }}>{member.role}</p>
                                            <p className="mt-3 text-sm leading-relaxed opacity-40 line-clamp-3">{member.bio}</p>
                                        </div>
                                    </Link>
                                ))}
                            </motion.div>
                        ) : (
                            /* Empty Team State */
                            <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/10 bg-white/5 p-20 text-center">
                                <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-black/20">
                                    <UserPlus size={32} style={{ color: 'var(--firm-primary)' }} />
                                </div>
                                <h2 className="text-2xl font-bold">No Team Directory</h2>
                                <p className="mt-2 max-w-sm opacity-40">
                                    Showcase the experts behind your firm. Add team members to build trust with investors.
                                </p>
                                <Link
                                    href="/admin/people"
                                    className="mt-8 rounded-xl border px-8 py-3 text-sm font-bold transition-all hover:opacity-70"
                                    style={{
                                        borderColor: 'var(--firm-primary)',
                                        color: 'var(--firm-primary)'
                                    }}
                                >
                                    Onboard Team
                                </Link>
                            </div>
                        )}
                    </>
                )}

                {/* Footer Utility */}
                <div className="mt-20 border-t border-white/5 py-12 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest opacity-20 hover:opacity-100 transition-all"
                        style={{ color: 'var(--firm-text)' }}
                    >
                        Powered by The PRVT MKT Agency
                    </Link>
                </div>
            </div>
        </div>
    );
}
