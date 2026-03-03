"use client";

import React, { useState } from 'react';
import { Search, Filter, Monitor, CheckCircle2, Clock, PlayCircle, ChevronRight } from 'lucide-react';
import { TeamMember } from '@/context/DataContext';

interface AgentsSidebarProps {
    agents: TeamMember[];
    onSelectAgent: (agent: TeamMember) => void;
}

export default function AgentsSidebar({ agents, onSelectAgent }: AgentsSidebarProps) {
    const [filter, setFilter] = useState<'ALL' | 'WORKING' | 'STANDBY'>('ALL');
    const [search, setSearch] = useState('');

    const filteredAgents = agents.filter(agent => {
        const matchesSearch = agent.name.toLowerCase().includes(search.toLowerCase());
        // For now, we'll mock status. In a real system, status would be a field.
        const isWorking = true; // Placeholder
        if (filter === 'WORKING') return matchesSearch && isWorking;
        if (filter === 'STANDBY') return matchesSearch && !isWorking;
        return matchesSearch;
    });

    return (
        <div className="flex flex-col h-full bg-[#0a0a0a] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60 flex items-center gap-2">
                        <Monitor size={12} className="text-brand-gold" />
                        Agents_Monitoring
                    </h3>
                    <span className="text-[9px] font-mono text-brand-gold bg-brand-gold/10 px-2 py-0.5 rounded border border-brand-gold/20">
                        {agents.length} ACTIVE
                    </span>
                </div>

                <div className="relative mb-4">
                    <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
                    <input
                        type="text"
                        placeholder="SEARCH_OPERATIVES..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white/5 border border-white/5 rounded-lg py-2 pl-10 pr-4 text-[9px] font-mono tracking-widest outline-none focus:border-brand-gold/30 transition-all text-white/80"
                    />
                </div>

                <div className="flex gap-2">
                    {['ALL', 'WORKING', 'STANDBY'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f as any)}
                            className={`flex-1 py-1.5 rounded-md text-[8px] font-black uppercase tracking-widest transition-all ${filter === f
                                ? 'bg-brand-gold text-brand-dark'
                                : 'bg-white/5 text-white/40 hover:bg-white/10'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
                {filteredAgents.map((agent) => (
                    <button
                        key={agent.id}
                        onClick={() => onSelectAgent(agent)}
                        className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left group"
                    >
                        <div className="relative shrink-0">
                            <div className="h-10 w-10 rounded-lg overflow-hidden border border-white/10 group-hover:border-brand-gold/40 transition-colors">
                                <img src={agent.imageURL} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-[#0a0a0a]" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-black uppercase tracking-tight text-white group-hover:text-brand-gold transition-colors truncate">
                                {agent.name}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <PlayCircle size={10} className="text-brand-gold/40" />
                                <span className="text-[7px] font-bold text-white/20 uppercase tracking-widest truncate">
                                    IDLE // WAITING_COMMAND
                                </span>
                            </div>
                        </div>
                        <ChevronRight size={14} className="text-white/5 group-hover:text-brand-gold transition-colors" />
                    </button>
                ))}
            </div>

            <div className="p-4 border-t border-white/5 bg-white/[0.01]">
                <button className="w-full py-3 rounded-xl border border-dashed border-white/10 hover:border-brand-gold/40 hover:bg-brand-gold/5 transition-all text-[8px] font-black uppercase tracking-widest text-white/40 hover:text-brand-gold">
                    + Register_New_Agent
                </button>
            </div>
        </div>
    );
}
