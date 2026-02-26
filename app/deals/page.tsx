"use client";

import { useData } from "@/context/DataContext";
import { Briefcase, MapPin, Search, Building2, Filter, Globe } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExploreDealsPage() {
    const { deals, firms } = useData();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("ALL");

    const publicDeals = deals.filter(deal => deal.isPublic);

    const filteredDeals = publicDeals.filter(deal => {
        const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
            deal.assetType.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilter === "ALL" || deal.assetType === activeFilter;
        return matchesSearch && matchesFilter;
    });

    const assetTypes = ["ALL", ...Array.from(new Set(publicDeals.map(d => d.assetType)))];

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white">Explore <span className="text-brand-gold">Deals</span></h1>
                    <p className="mt-2 text-foreground/50 text-lg">Browse institutional-grade investment opportunities across the nation.</p>
                </div>

                <div className="mb-10 flex flex-col md:flex-row gap-6">
                    <div className="relative group flex-1">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-brand-gold transition-colors" size={20} />
                        <input
                            type="text"
                            placeholder="Search by location, asset type, or keyword..."
                            className="w-full rounded-2xl border border-white/5 bg-brand-gray-900/50 pl-12 pr-4 py-4 text-white outline-none focus:border-brand-gold/50 transition-all font-medium placeholder:text-white/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-2 p-1 bg-white/5 rounded-2xl overflow-x-auto">
                        {assetTypes.map((type) => (
                            <button
                                key={type}
                                onClick={() => setActiveFilter(type)}
                                className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === type
                                        ? 'bg-brand-gold text-brand-dark'
                                        : 'text-foreground/40 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {type.replace('_', ' ')}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {filteredDeals.map((deal, index) => {
                        const firm = firms.find(f => f.id === deal.firmId);
                        return (
                            <motion.div
                                key={deal.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass group block overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/30 transition-all hover:border-brand-gold/20 hover:shadow-2xl hover:shadow-brand-gold/5"
                            >
                                <Link href={`/deals/${deal.id}`} className="block">
                                    <div className="aspect-video relative overflow-hidden">
                                        <img
                                            src={deal.stillImageURL}
                                            alt={deal.address}
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

                                        <div className="absolute top-6 left-6 flex gap-2">
                                            <span className="rounded-full bg-brand-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">
                                                {deal.assetType}
                                            </span>
                                            <span className="rounded-full bg-white/10 backdrop-blur-md px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white border border-white/10">
                                                {deal.strategy.replace('_', ' ')}
                                            </span>
                                        </div>

                                        {firm && (
                                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                                <div className="h-8 w-8 overflow-hidden rounded-full border-2 border-white/20 bg-brand-dark shadow-xl">
                                                    {firm.logoUrl ? (
                                                        <img src={firm.logoUrl} className="h-full w-full object-contain" />
                                                    ) : (
                                                        <Building2 size={16} className="m-auto text-brand-gold h-full" />
                                                    )}
                                                </div>
                                                <span className="text-xs font-bold text-white uppercase tracking-widest">{firm.name}</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8">
                                        <div className="mb-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <h3 className="text-2xl font-bold text-white line-clamp-1 group-hover:text-brand-gold transition-colors italic uppercase tracking-tighter">
                                                    {deal.address.split(',')[0]}
                                                </h3>
                                            </div>
                                            <div className="mt-2 flex items-center gap-2 text-foreground/40">
                                                <MapPin size={14} className="text-brand-gold" />
                                                <span className="text-sm font-medium">{deal.address.split(',').slice(1).join(',')}</span>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Purchase Price</p>
                                                <p className="text-lg font-bold text-white italic">
                                                    ${(deal.purchaseAmount || 0).toLocaleString()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Cap Rate</p>
                                                <p className="text-lg font-bold text-brand-gold italic">
                                                    {deal.capRate || "5.0"}%
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredDeals.length === 0 && (
                    <div className="py-20 text-center">
                        <Globe size={48} className="mx-auto mb-4 text-foreground/20" />
                        <h3 className="text-xl font-bold text-white">No opportunities found</h3>
                        <p className="text-foreground/40">Try adjusting your filters or search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
