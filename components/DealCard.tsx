import { motion } from "framer-motion";
import { MapPin, TrendingUp, Maximize2, Lock, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";
import { useData } from "@/context/DataContext";

interface DealCardProps {
    deal: {
        id: string;
        address: string;
        assetType: string;
        strategy: string;
        purchaseAmount?: number | null;
        rehabAmount?: number | null;
        arv?: number | null;
        stillImageURL: string | null;
        generatedVideoURL?: string | null;
        isPublic: boolean;
        capRate?: number | null;
        sqFt?: number | null;
        teamMemberIds: string[];
        firmId: string;
    };
    index: number;
    isListView?: boolean;
}

export default function DealCard({ deal, index, isListView = false }: DealCardProps) {
    const { teamMembers, firms } = useData();
    const firm = firms.find(f => f.id === deal.firmId);
    const members = (deal.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);
    const member = members[0]; // Show the primary (first) lead on the card

    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.primaryColor || '#ffffff',
        '--firm-secondary': firm?.accentColor || '#151515',
    } as React.CSSProperties;

    // Suppression Logic
    const hasPurchase = deal.purchaseAmount && deal.purchaseAmount > 0;
    const hasRehab = deal.rehabAmount && deal.rehabAmount > 0;
    const hasARV = deal.arv && deal.arv > 0;

    const visibleMetricsCount = [hasPurchase, hasRehab, hasARV].filter(Boolean).length;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            style={themeStyles}
            className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-[var(--firm-bg)] transition-all hover:border-[var(--firm-primary)]/30 hover:shadow-2xl flex ${isListView ? 'w-full flex-row items-center p-8 gap-10' : 'flex-col'}`}
        >
            {/* Image Container */}
            <div className={`relative overflow-hidden rounded-2xl ${isListView ? 'h-48 w-72 shrink-0' : 'aspect-[16/9]'}`}>
                {deal.generatedVideoURL ? (
                    <video
                        src={deal.generatedVideoURL}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : deal.stillImageURL ? (
                    <img
                        src={deal.stillImageURL}
                        alt={deal.address}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full bg-brand-gray-800" />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--firm-bg)] via-[var(--firm-bg)]/20 to-transparent" />

                {/* Badges */}
                <div className={`absolute left-6 ${isListView ? 'bottom-4' : 'top-6'} flex gap-2`}>
                    <span className="glass rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)] border border-white/20 backdrop-blur-md">
                        {deal.assetType.replace("_", " ")}
                    </span>
                    {!isListView && (
                        <span className="glass rounded-xl px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/70 border border-white/10 backdrop-blur-md">
                            {deal.strategy.replace("_", " ")}
                        </span>
                    )}
                </div>
            </div>

            {/* Content area */}
            <div className={`flex flex-1 ${isListView ? 'flex-row items-center gap-10' : 'flex-col p-10 pt-8'}`}>
                {/* 1. Address & Strategy (Left/Top) */}
                <div className={`${isListView ? 'w-1/4' : 'mb-8'}`}>
                    <div className="flex items-start gap-3">
                        <MapPin size={isListView ? 18 : 20} className="text-[var(--firm-text)] shrink-0 mt-1" />
                        <div>
                            <h3 className={`${isListView ? 'text-lg' : 'text-xl'} font-black tracking-tight text-[var(--firm-text)] leading-tight`}>{deal.address}</h3>
                            {isListView && <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--firm-text)]/30 mt-1">{deal.strategy.replace("_", " ")}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. Metrics (Center) */}
                <div className={`flex-1 ${isListView ? 'flex gap-8 justify-around px-8 border-x border-white/5' : 'grid grid-cols-2 gap-6'}`}>
                    {hasPurchase && (
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/30">Purchase</p>
                            <p className={`${isListView ? 'text-lg' : 'text-xl'} font-black text-[var(--firm-text)]`}>
                                {!deal.isPublic ? <Lock size={12} className="text-[var(--firm-primary)] inline mr-2" /> : formatCurrency(deal.purchaseAmount || 0)}
                            </p>
                        </div>
                    )}
                    {hasRehab && (
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/30">Rehab</p>
                            <p className={`${isListView ? 'text-lg' : 'text-xl'} font-black text-[var(--firm-text)]`}>{formatCurrency(deal.rehabAmount || 0)}</p>
                        </div>
                    )}
                    {hasARV && (
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/30">Exit (ARV)</p>
                            <p className={`${isListView ? 'text-lg' : 'text-xl'} font-black text-[var(--firm-text)]`}>{formatCurrency(deal.arv || 0)}</p>
                        </div>
                    )}
                </div>

                {/* 3. Transaction Lead & Button (Right/Bottom) */}
                <div className={`${isListView ? 'flex items-center gap-10 w-1/3 justify-end' : 'mt-8 pt-8 border-t border-white/5 space-y-8'}`}>
                    {/* Lead */}
                    <div className="space-y-1 min-w-[160px]">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/30">Transaction lead</p>
                        <div className="flex items-center gap-3">
                            {members.length > 0 ? (
                                <Link
                                    href={`/team/${members[0]?.slug || members[0]?.id}`}
                                    className="flex items-center gap-3 transition-all hover:opacity-70"
                                >
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {members.slice(0, 2).map((m: any) => (
                                            <img
                                                key={m.id}
                                                src={m.imageURL}
                                                alt={m.name}
                                                className="h-8 w-8 rounded-lg object-cover border-2 border-[var(--firm-bg)] shadow-xl"
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-[10px] font-black text-[var(--firm-text)] truncate uppercase tracking-widest leading-none">
                                            {members[0]?.name}
                                        </span>
                                        <span className="text-[8px] font-bold text-[var(--firm-primary)] uppercase tracking-tighter mt-0.5">
                                            {members.length > 1 ? `+ ${members.length - 1} other` : 'Lead Partner'}
                                        </span>
                                    </div>
                                </Link>
                            ) : (
                                <span className="text-xs italic text-[var(--firm-text)]/20">Unassigned</span>
                            )}
                        </div>
                    </div>

                    {/* CTA Button */}
                    <Link
                        href={`/deals/${deal.id}`}
                        className={`inline-flex items-center justify-center rounded-2xl border-2 border-[var(--firm-text)]/30 text-[9px] font-black uppercase tracking-[0.3em] text-[var(--firm-text)] transition-all hover:bg-[var(--firm-text)] hover:text-[var(--firm-bg)] ${isListView ? 'px-8 py-5' : 'w-full py-4'}`}
                    >
                        Tombstone
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
