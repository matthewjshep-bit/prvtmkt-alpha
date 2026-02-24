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
        isPublic: boolean;
        capRate?: number | null;
        sqFt?: number | null;
        teamMemberIds: string[];
    };
    index: number;
    isListView?: boolean;
}

export default function DealCard({ deal, index, isListView = false }: DealCardProps) {
    const { teamMembers } = useData();
    const members = (deal.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);
    const member = members[0]; // Show the primary (first) lead on the card

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
            className={`group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900 transition-all hover:border-brand-gold/30 hover:shadow-2xl ${isListView ? 'flex flex-col md:flex-row min-h-[400px]' : ''}`}
        >
            {/* Image Container */}
            <div className={`relative overflow-hidden ${isListView ? 'w-full md:w-[45%] shrink-0' : 'aspect-[16/9]'}`}>
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
                <div className="absolute top-6 left-6 flex gap-2">
                    <span className="glass rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold border border-brand-gold/20">
                        {deal.assetType.replace("_", " ")}
                    </span>
                    <span className="glass rounded-xl px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 border border-white/10">
                        {deal.strategy.replace("_", " ")}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className={`flex flex-col flex-1 ${isListView ? 'p-12 md:p-14 justify-center' : 'p-10'}`}>
                <div className="mb-8 flex items-start justify-between">
                    <div className="flex items-center gap-4 text-2xl text-foreground/80">
                        <MapPin size={24} className="text-brand-gold" />
                        <span className="truncate font-black tracking-tight">{deal.address}</span>
                    </div>
                </div>

                <div className={`grid gap-10 ${isListView ? 'grid-cols-2 lg:grid-cols-4' : 'grid-cols-2'}`}>
                    {hasPurchase && (
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Purchase Price</p>
                            <p className="flex items-center gap-2 text-xl font-black">
                                {!deal.isPublic ? (
                                    <>
                                        <Lock size={14} className="text-brand-gold" />
                                        <span className="text-foreground/20 italic tracking-wider">Confidential</span>
                                    </>
                                ) : (
                                    formatCurrency(deal.purchaseAmount || 0)
                                )}
                            </p>
                        </div>
                    )}

                    {hasRehab && (
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Rehab Budget</p>
                            <p className="text-xl font-black">{formatCurrency(deal.rehabAmount || 0)}</p>
                        </div>
                    )}

                    {hasARV && (
                        <div className="space-y-2">
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Exit (ARV)</p>
                            <p className="text-xl font-black">{formatCurrency(deal.arv || 0)}</p>
                        </div>
                    )}

                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Transaction lead</p>
                        <div className="flex items-center gap-4">
                            {members.length > 0 ? (
                                <>
                                    <div className="flex -space-x-3 overflow-hidden">
                                        {members.slice(0, 3).map((m: any) => (
                                            <img
                                                key={m.id}
                                                src={m.imageURL}
                                                alt={m.name}
                                                className="h-10 w-10 rounded-xl object-cover border-2 border-brand-gray-900 shadow-xl"
                                                title={m.name}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-foreground truncate uppercase tracking-widest leading-none mb-1">
                                            {members[0]?.name}
                                        </span>
                                        {members.length > 1 && (
                                            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-tighter">
                                                + {members.length - 1} other{members.length > 2 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <User size={16} className="text-foreground/20" />
                                    <span className="text-sm font-bold text-foreground/20 italic uppercase tracking-widest">Unassigned</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <div className={`mt-auto ${isListView ? 'max-w-xs' : 'pt-12'}`}>
                    <Link href={`/deals/${deal.id}`} className="flex items-center justify-center rounded-2xl border-2 border-brand-gold/30 py-5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark hover:shadow-2xl group/btn">
                        View Digital Tombstone
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
