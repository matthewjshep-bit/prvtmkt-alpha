"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Activity, ArrowUpRight, Plus, RefreshCw, User, Tag, Briefcase } from 'lucide-react';

interface FeedItem {
    id: string;
    type: string;
    title: string;
    timestamp: string;
    performedByEmail?: string;
}

interface LiveFeedProps {
    activities: FeedItem[];
}

export default function LiveFeed({ activities }: LiveFeedProps) {
    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'DEAL_ADDED': return <Plus className="text-green-400" size={14} />;
            case 'DEAL_UPDATED': return <RefreshCw className="text-blue-400" size={14} />;
            case 'MEMBER_UPDATED': return <User className="text-brand-gold" size={14} />;
            case 'FIRM_SETTINGS_UPDATED': return <Tag className="text-purple-400" size={14} />;
            default: return <Activity className="text-white/40" size={14} />;
        }
    };

    const getRelativeTime = (timestamp: string) => {
        const date = new Date(timestamp);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Just now';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
        return date.toLocaleDateString();
    };

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 border border-white/10">
                        <Activity size={16} />
                    </div>
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white">Event Stream</h3>
                        <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-0.5">Live Data Uplink</p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20">
                    <span className="h-1 w-1 rounded-full bg-brand-gold animate-ping" />
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-gold">Active</span>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                {activities.length > 0 ? (
                    activities.slice(0, 20).map((activity, idx) => (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.03 }}
                            className="group flex flex-col gap-2 p-4 rounded-xl border border-white/5 bg-white/[0.01] hover:bg-white/[0.03] transition-all cursor-crosshair"
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="h-7 w-7 rounded-lg bg-white/5 flex items-center justify-center border border-white/5">
                                        {getTypeIcon(activity.type)}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="text-[10px] font-bold text-white/80 truncate leading-none uppercase tracking-tight">
                                            {activity.title}
                                        </p>
                                        <p className="text-[8px] font-bold text-white/20 uppercase tracking-widest mt-1">
                                            {activity.performedByEmail || 'SYSTEM'} // {activity.type}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 text-white/20">
                                    <Clock size={10} />
                                    <span className="text-[8px] font-bold uppercase tracking-widest">
                                        {getRelativeTime(activity.timestamp)}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-widest text-brand-gold hover:text-white transition-colors">
                                    Analyze <ArrowUpRight size={10} />
                                </button>
                                <div className="h-px flex-1 bg-white/5" />
                                <span className="text-[8px] font-mono text-white/10 uppercase">UID: {activity.id.slice(0, 8)}</span>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-20">
                        <Activity size={32} className="mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.3em]">No events detected</p>
                    </div>
                )}
            </div>

            <div className="p-4 border-t border-white/5 bg-black/40">
                <button className="w-full py-2.5 rounded-lg border border-white/5 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all text-[9px] font-black uppercase tracking-widest text-white/30 hover:text-brand-gold">
                    View Full System Logs
                </button>
            </div>
        </div>
    );
}
