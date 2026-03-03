"use client";

import React, { useState } from 'react';
import { Search, User, ChevronRight, Plus } from 'lucide-react';
import { TeamMember } from '@/context/DataContext';
import { useParams, useRouter } from 'next/navigation';

interface TeamMemberSubSidebarProps {
    teamMembers: TeamMember[];
    activeMemberId: string;
    onAddMember?: () => void;
}

export default function TeamMemberSubSidebar({
    teamMembers,
    activeMemberId,
    onAddMember
}: TeamMemberSubSidebarProps) {
    const [search, setSearch] = useState("");
    const params = useParams();
    const router = useRouter();
    const firmSlug = params.firmSlug as string;

    const filteredMembers = teamMembers.filter(m =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.role.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="w-[320px] h-full bg-brand-gray-900/50 border-r border-white/5 flex flex-col backdrop-blur-md">
            <div className="p-8 border-b border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">Team <span className="text-brand-gold">Registry</span></h2>
                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-1">Firm Administration</p>
                    </div>
                    {onAddMember && (
                        <button
                            onClick={onAddMember}
                            className="h-10 w-10 rounded-full bg-brand-gold text-brand-dark flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-brand-gold/20"
                        >
                            <Plus size={20} />
                        </button>
                    )}
                </div>

                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="SEARCH MEMBERS..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full h-12 bg-black/40 border border-white/5 rounded-2xl pl-12 pr-4 text-[10px] font-black uppercase tracking-widest text-white outline-none focus:border-brand-gold/40 transition-all"
                    />
                </div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                {filteredMembers.length === 0 ? (
                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-20 border-2 border-dashed border-white/5 rounded-3xl m-2">
                        <User size={32} className="mb-4" />
                        <p className="text-[8px] font-black uppercase tracking-widest">No members found</p>
                    </div>
                ) : (
                    filteredMembers.map(member => (
                        <div
                            key={member.id}
                            onClick={() => router.push(`/admin/${firmSlug}/people/${member.id}`)}
                            className={`group p-4 rounded-2xl flex items-center gap-4 cursor-pointer transition-all border ${activeMemberId === member.id
                                    ? 'bg-brand-gold/10 border-brand-gold/20 shadow-lg'
                                    : 'bg-white/5 border-transparent hover:bg-white/10'
                                }`}
                        >
                            <div className={`h-12 w-12 rounded-xl overflow-hidden border transition-all ${activeMemberId === member.id ? 'border-brand-gold' : 'border-white/10 group-hover:border-white/20'
                                }`}>
                                <img
                                    src={member.imageURL || "/placeholder-user.jpg"}
                                    className="h-full w-full object-cover"
                                    alt={member.name}
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className={`text-[10px] font-black uppercase tracking-widest truncate ${activeMemberId === member.id ? 'text-brand-gold' : 'text-white'
                                    }`}>
                                    {member.name}
                                </h4>
                                <p className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-0.5 truncate">
                                    {member.role}
                                </p>
                            </div>
                            <ChevronRight size={14} className={`transition-all ${activeMemberId === member.id ? 'text-brand-gold translate-x-1' : 'text-white/10 group-hover:text-white/40'
                                }`} />
                        </div>
                    ))
                )}
            </div>

            <div className="p-6 border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-2 text-[8px] font-black uppercase tracking-[0.2em] text-white/10">
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                    Registry System Online
                </div>
            </div>
        </div>
    );
}
