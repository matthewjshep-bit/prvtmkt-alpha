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
        stillImageURL: string | null;
        isPublic: boolean;
        capRate?: number | null;
        sqFt?: number | null;
        teamMemberIds: string[];
    };
    index: number;
}

export default function DealCard({ deal, index }: DealCardProps) {
    const { teamMembers } = useData();
    const members = (deal.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);
    const member = members[0]; // Show the primary (first) lead on the card

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900 transition-all hover:border-brand-gold/30 hover:shadow-2xl"
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
            <div className="p-10">
                <div className="mb-6 flex items-start justify-between">
                    <div className="flex items-center gap-3 text-lg text-foreground/80">
                        <MapPin size={20} className="text-brand-gold" />
                        <span className="truncate font-bold tracking-tight">{deal.address}</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-1.5">
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

                    <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/30">Transaction lead</p>
                        <div className="flex items-center gap-3">
                            {members.length > 0 ? (
                                <>
                                    <div className="flex -space-x-2 overflow-hidden">
                                        {members.slice(0, 3).map((m: any) => (
                                            <img
                                                key={m.id}
                                                src={m.imageURL}
                                                alt={m.name}
                                                className="h-8 w-8 rounded-lg object-cover border-2 border-brand-gray-900 shadow-sm"
                                                title={m.name}
                                            />
                                        ))}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-black text-foreground truncate uppercase tracking-widest leading-none mb-1">
                                            {members[0]?.name}
                                        </span>
                                        {members.length > 1 && (
                                            <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-tighter">
                                                + {members.length - 1} other{members.length > 2 ? 's' : ''}
                                            </span>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <>
                                    <User size={14} className="text-foreground/20" />
                                    <span className="text-xs font-bold text-foreground/20 italic uppercase tracking-widest">Unassigned</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* View Details Button */}
                <div className="mt-10">
                    <Link href={`/deals/${deal.id}`} className="block w-full text-center rounded-2xl border-2 border-brand-gold/30 py-4 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark hover:shadow-xl">
                        View Digital Tombstone
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}
