"use client";

import React, { useMemo } from 'react';
import { TeamMember } from '@/context/DataContext';
import { motion } from 'framer-motion';
import { Users, ChevronRight, Building2 } from 'lucide-react';

interface OrgChartProps {
    members: TeamMember[];
    onMemberClick?: (member: TeamMember) => void;
}

interface OrgNodeProps {
    member: TeamMember;
    reports: TeamMember[];
    allMembers: TeamMember[];
    onMemberClick?: (member: TeamMember) => void;
    depth: number;
}

const OrgNode: React.FC<OrgNodeProps> = ({ member, reports, allMembers, onMemberClick, depth }) => {
    return (
        <div className="flex flex-col items-center">
            {/* Connection Line (Vertical) */}
            {depth > 0 && (
                <div className="w-px h-8 bg-brand-gold/20" />
            )}

            {/* Node Card */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onMemberClick?.(member)}
                className="relative group cursor-pointer"
            >
                <div className="w-64 p-4 rounded-3xl bg-brand-gray-900/50 backdrop-blur-md border border-white/5 hover:border-brand-gold/30 transition-all shadow-2xl overflow-hidden">
                    {/* Background Accent */}
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold/5 blur-2xl rounded-full -mr-12 -mt-12 transition-all group-hover:bg-brand-gold/10" />

                    <div className="flex items-center gap-4 relative z-10">
                        <div className="h-12 w-12 rounded-2xl overflow-hidden border-2 border-brand-gold/20 group-hover:border-brand-gold/40 transition-all shrink-0">
                            <img
                                src={member.imageURL || "/placeholder-user.jpg"}
                                className="h-full w-full object-cover"
                                alt={member.name}
                            />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-[11px] font-black text-white uppercase tracking-tight truncate">{member.name}</h4>
                            <p className="text-[8px] font-bold text-brand-gold uppercase tracking-widest truncate mt-0.5">{member.role}</p>
                            {member.department && (
                                <div className="flex items-center gap-1 mt-1.5 opacity-40">
                                    <Building2 size={8} className="text-white" />
                                    <span className="text-[7px] font-black text-white uppercase tracking-widest">{member.department}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Children Container */}
            {reports.length > 0 && (
                <div className="flex flex-col items-center">
                    {/* Connection Line (Vertical Down) */}
                    <div className="w-px h-8 bg-brand-gold/20" />

                    {/* Connector Bar (Horizontal) */}
                    {reports.length > 1 && (
                        <div className="h-px bg-brand-gold/20 mb-[-1px]" style={{ width: `calc(100% - ${256 / reports.length}px)` }} />
                    )}

                    <div className="flex gap-12 items-start pt-8">
                        {reports.map(report => (
                            <OrgNode
                                key={report.id}
                                member={report}
                                reports={allMembers.filter(m => m.managerId === report.id)}
                                allMembers={allMembers}
                                onMemberClick={onMemberClick}
                                depth={depth + 1}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function OrgChart({ members, onMemberClick }: OrgChartProps) {
    // Find top-level managers (those without a manager or whose manager isn't in this list)
    const roots = useMemo(() => {
        const memberIds = new Set(members.map(m => m.id));
        return members.filter(m => !m.managerId || !memberIds.has(m.managerId));
    }, [members]);

    if (members.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-32 opacity-20">
                <Users size={64} className="mb-4" />
                <p className="text-xs font-black uppercase tracking-widest underline decoration-brand-gold underline-offset-8">No Roster Detected</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto custom-scrollbar p-12 min-h-[calc(100vh-140px)]">
            <div className="inline-flex min-w-full justify-center gap-24 items-start h-fit py-12">
                {roots.map(root => (
                    <OrgNode
                        key={root.id}
                        member={root}
                        reports={members.filter(m => m.managerId === root.id)}
                        allMembers={members}
                        onMemberClick={onMemberClick}
                        depth={0}
                    />
                ))}
            </div>
        </div>
    );
}
