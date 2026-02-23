"use client";

import { motion } from "framer-motion";
import { MapPin, TrendingUp, Maximize2, Lock } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface DealCardProps {
    deal: {
        id: string;
        address: string;
        assetType: string;
        strategy: string;
        purchaseAmount: number | null;
        stillImageURL: string | null;
        isPublic: boolean;
        capRate: number | null;
        sqFt: number | null;
    };
    index: number;
}

export default function DealCard({ deal, index }: DealCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-xl border border-white/5 bg-brand-gray-900 transition-all hover:border-brand-gold/30"
        >
            {/* Image Container */}
            <div className="relative aspect-[16/9] overflow-hidden">
                {deal.stillImageURL ? (
                    <img
                        src={deal.stillImageURL}
                        alt={deal.address}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full bg-brand-gray-800" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-gold">
                        {deal.assetType.replace("_", " ")}
                    </span>
                    <span className="glass rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-foreground">
                        {deal.strategy.replace("_", " ")}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-1.5 text-sm text-foreground/70">
                        <MapPin size={14} className="text-brand-gold" />
                        <span className="truncate">{deal.address}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">Purchase Price</p>
                        <p className="flex items-center gap-1.5 text-sm font-semibold">
                            {!deal.isPublic ? (
                                <>
                                    <Lock size={12} className="text-brand-gold" />
                                    <span className="text-foreground/30 italic">Confidential</span>
                                </>
                            ) : (
                                formatCurrency(deal.purchaseAmount || 0)
                            )}
                        </p>
                    </div>

                    <div className="space-y-1">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-foreground/40">Metrics</p>
                        <div className="flex gap-3">
                            <div className="flex items-center gap-1 text-sm font-semibold">
                                <TrendingUp size={12} className="text-brand-gold" />
                                {deal.capRate}%
                            </div>
                            <div className="flex items-center gap-1 text-sm font-semibold">
                                <Maximize2 size={12} className="text-brand-gold" />
                                {deal.sqFt?.toLocaleString()} SF
                            </div>
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="mt-6">
                    <Link href={`/deals/${deal.id}`} className="block w-full text-center rounded-lg border border-brand-gold/20 py-2.5 text-xs font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark">
                        View Digital Tombstone
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
