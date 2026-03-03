"use client";

import React from 'react';
import { motion } from 'framer-motion';
import {
    LayoutGrid,
    MoreVertical,
    Calendar,
    MapPin,
    DollarSign,
    Layers,
    ChevronRight,
    Search
} from 'lucide-react';
import { Deal } from '@/context/DataContext';
import { formatCurrency } from '@/lib/utils';

interface TeamKanbanProps {
    deals: Deal[];
    onDealClick?: (id: string) => void;
}

const CATEGORIES = ["INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF", "OFFICE"];

export default function TeamKanban({ deals, onDealClick }: TeamKanbanProps) {
    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 border border-white/10">
                        <LayoutGrid size={16} />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Asset Deployment</h3>
                        <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-0.5">Tactical Resource Allocation</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                        <Search size={12} className="text-white/20" />
                        <input
                            type="text"
                            placeholder="FILTER_X"
                            className="bg-transparent border-none outline-none text-[9px] font-mono text-white/40 w-24 uppercase"
                        />
                    </div>
                    <button className="h-8 w-8 rounded-lg bg-brand-gold text-brand-dark flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-brand-gold/20">
                        <MoreVertical size={16} />
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-[#050505]">
                <div className="flex h-full p-6 gap-6 min-w-max">
                    {CATEGORIES.map((cat) => {
                        const catDeals = deals.filter(d => d.assetType === cat);
                        return (
                            <div key={cat} className="flex flex-col w-[320px] rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
                                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/[0.01]">
                                    <div className="flex items-center gap-2">
                                        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">{cat}</h4>
                                    </div>
                                    <span className="px-2 py-0.5 rounded-md bg-white/5 text-[9px] font-black font-mono text-white/20">{catDeals.length}</span>
                                </div>

                                <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
                                    {catDeals.map((deal) => (
                                        <motion.div
                                            key={deal.id}
                                            layoutId={deal.id}
                                            onClick={() => onDealClick?.(deal.id)}
                                            className="p-4 rounded-xl border border-white/5 bg-brand-dark hover:border-brand-gold/30 hover:shadow-xl hover:shadow-brand-gold/5 transition-all cursor-pointer group"
                                        >
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={10} className="text-brand-gold" />
                                                    <span className="text-[10px] font-bold text-white/80 tracking-tight uppercase truncate max-w-[180px]">
                                                        {deal.address.split(',')[0]}
                                                    </span>
                                                </div>
                                                <ChevronRight size={14} className="text-white/10 group-hover:text-brand-gold group-hover:translate-x-1 transition-all" />
                                            </div>

                                            <div className="h-32 w-full rounded-lg overflow-hidden border border-white/5 mb-4 bg-[#0a0a0a]">
                                                <img
                                                    src={deal.stillImageURL}
                                                    className="h-full w-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                                                    alt=""
                                                />
                                            </div>

                                            <div className="grid grid-cols-2 gap-2">
                                                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <DollarSign size={8} className="text-green-400" />
                                                        <span className="text-[7px] font-black uppercase tracking-widest text-white/20">Purchase</span>
                                                    </div>
                                                    <p className="text-[10px] font-black text-white/90">{formatCurrency(deal.purchaseAmount || 0)}</p>
                                                </div>
                                                <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                                                    <div className="flex items-center gap-1.5 mb-1">
                                                        <Layers size={8} className="text-blue-400" />
                                                        <span className="text-[7px] font-black uppercase tracking-widest text-white/20">Dimension</span>
                                                    </div>
                                                    <p className="text-[10px] font-black text-white/90">{deal.sqFt?.toLocaleString()} SF</p>
                                                </div>
                                            </div>

                                            <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                                                <div className="flex -space-x-2">
                                                    {(deal.teamMemberIds || []).slice(0, 3).map((mId, i) => (
                                                        <div key={i} className="h-6 w-6 rounded-md border border-brand-dark bg-white/10 overflow-hidden ring-2 ring-brand-dark">
                                                            <div className="h-full w-full bg-brand-gold/20 flex items-center justify-center text-[8px] font-black text-brand-gold">
                                                                {mId.slice(0, 1)}
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex items-center gap-1 text-white/20">
                                                    <Calendar size={10} />
                                                    <span className="text-[8px] font-bold uppercase tracking-widest">Q1 2026</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                    {catDeals.length === 0 && (
                                        <div className="py-12 flex flex-col items-center justify-center opacity-10">
                                            <Layers size={24} className="mb-2" />
                                            <p className="text-[8px] font-black uppercase tracking-widest">Void</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
