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
    firm?: any;
    isReversed?: boolean;
    isPreview?: boolean;
    onMemberClick?: (id: string) => void;
    onDealClick?: (id: string) => void;
}

export default function DealCard({
    deal,
    index,
    isListView = false,
    firm: propFirm,
    isReversed = false,
    isPreview = false,
    onMemberClick,
    onDealClick
}: DealCardProps) {
    const { teamMembers, firms } = useData();
    const firm = propFirm || firms.find(f => f.id === deal.firmId);
    const members = (deal.teamMemberIds || []).map(mId => teamMembers.find(m => m.id === mId)).filter(Boolean);
    const member = members[0]; // Show the primary (first) lead on the card

    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.accentColor || '#ffffff', // remap primary to accent
        '--firm-secondary': firm?.accentColor || '#151515',
    } as React.CSSProperties;

    const radiusClass = firm?.borderRadius === 'square' ? 'rounded-none' : 'rounded-[2.5rem]';
    const subRadiusClass = firm?.borderRadius === 'square' ? 'rounded-none' : 'rounded-2xl';

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
            className={`group relative overflow-hidden border border-white/5 bg-[var(--firm-bg)] transition-all hover:border-[var(--firm-primary)]/30 hover:shadow-2xl flex ${radiusClass} ${isListView ? `w-full ${isReversed ? 'flex-row-reverse text-right' : 'flex-row'} items-center p-8 gap-10` : 'flex-col'}`}
        >
            <Link
                href={isPreview ? "#" : `/deals/${deal.id}`}
                className="absolute inset-0 z-20"
                onClick={(e) => {
                    if (isPreview) {
                        e.preventDefault();
                        onDealClick?.(deal.id);
                    }
                }}
            />
            {/* Image Container */}
            <div className={`relative overflow-hidden ${subRadiusClass} ${isListView ? 'h-48 w-72 shrink-0' : 'aspect-[16/9]'}`}>
                {deal.generatedVideoURL ? (
                    <video
                        src={deal.generatedVideoURL}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                ) : deal.stillImageURL ? (
                    <img
                        src={deal.stillImageURL}
                        alt={deal.address}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="h-full w-full bg-brand-gray-800" />
                )}
                {/* Badges */}
                <div className={`absolute ${isReversed ? 'right-6' : 'left-6'} ${isListView ? 'bottom-4' : 'top-6'} flex gap-2`}>
                    <span className={`glass px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)] border border-white/20 backdrop-blur-md ${subRadiusClass}`}>
                        {(deal.assetType || "INDUSTRIAL").replace("_", " ")}
                    </span>
                    {!isListView && (
                        <span className={`glass px-3 py-1 text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/70 border border-white/10 backdrop-blur-md ${subRadiusClass}`}>
                            {(deal.strategy || "CORE").replace("_", " ")}
                        </span>
                    )}
                </div>
            </div>

            {/* Content area */}
            <div className={`flex flex-1 ${isListView ? `flex-row items-center gap-10 ${isReversed ? 'justify-end' : ''}` : 'flex-col p-10 pt-8'}`}>
                {/* 1. Address & Strategy (Left/Top) */}
                <div className={`${isListView ? 'w-1/4' : 'mb-8'}`}>
                    <div className={`flex items-start gap-3 ${isReversed ? 'flex-row-reverse' : ''}`}>
                        <MapPin size={isListView ? 18 : 20} className="text-[var(--firm-text)] shrink-0 mt-1" />
                        <div>
                            <h3 className={`${isListView ? 'text-lg' : 'text-xl'} font-black tracking-tight text-[var(--firm-text)] leading-tight`}>{deal.address}</h3>
                            {isListView && <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--firm-text)]/30 mt-1">{deal.strategy.replace("_", " ")}</p>}
                        </div>
                    </div>
                </div>

                {/* 2. Metrics (Center) */}
                <div className={`flex-1 ${isListView ? `flex gap-8 justify-around px-8 border-x border-white/5 ${isReversed ? 'flex-row-reverse' : ''}` : 'grid grid-cols-2 gap-6'}`}>
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
                <div className={`${isListView ? `flex items-center gap-10 w-1/3 ${isReversed ? 'justify-start mr-auto' : 'justify-end'}` : 'mt-8 pt-8 border-t border-white/5 space-y-8'}`}>
                    {/* Lead */}
                    <div className="space-y-1 min-w-[160px]">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[var(--firm-text)]/30">Transaction lead</p>
                        <div className={`flex items-center gap-3 ${isReversed ? 'flex-row-reverse' : ''}`}>
                            {members.length > 0 ? (
                                <Link
                                    href={isPreview ? "#" : `/team/${members[0]?.slug || members[0]?.id}`}
                                    className={`relative z-30 flex items-center gap-3 transition-all hover:opacity-70 ${isReversed ? 'flex-row-reverse text-right' : ''}`}
                                    onClick={(e) => {
                                        if (isPreview) {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            onMemberClick?.(members[0]?.id || "");
                                        }
                                    }}
                                >
                                    <div className={`flex -space-x-2 overflow-hidden ${isReversed ? 'flex-row-reverse space-x-reverse' : ''}`}>
                                        {members.slice(0, 2).map((m: any) => (
                                            <img
                                                key={m.id}
                                                src={m.imageURL}
                                                alt={m.name}
                                                className={`h-8 w-8 object-cover border-2 border-[var(--firm-bg)] shadow-xl ${subRadiusClass}`}
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
                                <span className={`text-xs italic text-[var(--firm-text)]/20 ${isReversed ? 'text-right block w-full' : ''}`}>Unassigned</span>
                            )}
                        </div>
                    </div>

                    {/* CTA Button (Removed for Universal Click) */}
                </div>
            </div>
        </motion.div>
    );
}
