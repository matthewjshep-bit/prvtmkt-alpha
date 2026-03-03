"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    Briefcase,
    FileText,
    Database,
    TrendingUp,
    Layers,
    Globe,
    Cpu,
    Shield,
    Terminal,
    MapPin,
    Search,
    ChevronRight,
    ArrowUpRight
} from 'lucide-react';
import { Firm, Deal, TeamMember, Activity, Task, useData } from '@/context/DataContext';
import DashboardLayout from './dashboard/DashboardLayout';
import LiveFeed from './dashboard/LiveFeed';
import MissionQueue from './dashboard/MissionQueue';
import AgentsSidebar from './dashboard/AgentsSidebar';
import TeamKanban from './dashboard/TeamKanban';
import AgentModal from './dashboard/AgentModal';
import TaskModal from './dashboard/TaskModal';
import MarkdownEditor from '@/components/MarkdownEditor';
import { Plus } from 'lucide-react';

interface InternalDashboardViewProps {
    firm: Firm;
    deals: Deal[];
    teamMembers: TeamMember[];
    isInitialized: boolean;
}

export default function InternalDashboardView({
    firm,
    deals,
    teamMembers,
    isInitialized
}: InternalDashboardViewProps) {
    const { activities, tasks, updateTask, updateMemberFile, addActivity } = useData();
    const [activeTab, setActiveTab] = useState('overview');
    const [activeDoc, setActiveDoc] = useState<{ id: string, name: string, content: string } | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [selectedAgent, setSelectedAgent] = useState<TeamMember | null>(null);
    const [isCreatingTask, setIsCreatingTask] = useState(false);
    const [isSavingDoc, setIsSavingDoc] = useState(false);

    const firmActivities = activities.filter(a => a.firmId === firm.id);
    const firmDeals = deals.filter(d => d.firmId === firm.id);
    const firmMembers = teamMembers.filter(m => (m.firmIds || []).includes(firm.id) || m.firmId === firm.id);
    const firmTasks = tasks.filter(t => t.firmId === firm.id);

    const totalVolume = firmDeals.reduce((acc, d) => acc + (d.purchaseAmount || 0), 0);
    const totalSqFt = firmDeals.reduce((acc, d) => acc + (d.sqFt || 0), 0);

    const handleSaveDoc = async () => {
        if (!activeDoc) return;
        setIsSavingDoc(true);
        // Assuming docs are linked to firm or member. For now, we'll mimic saving.
        // In a real implementation, we'd find which member/firm this doc belongs to.
        setTimeout(() => {
            setIsSavingDoc(false);
            setActiveDoc(null);
            addActivity({
                type: 'FIRM_UPDATED',
                title: `System documentation synchronized: ${activeDoc.name}`,
                firmId: firm.id
            });
        }, 1000);
    };

    if (!isInitialized) return null;

    return (
        <DashboardLayout
            firmName={firm.name}
            logoUrl={firm.logoUrl}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
        >
            <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                    <motion.div
                        key="overview"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-8"
                    >
                        {/* Dashboard Control Header */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-white">Mission_Control</h1>
                                <p className="text-xs font-bold text-white/20 uppercase tracking-[0.3em] mt-1 italic">Tactical Task Orchestration Layer</p>
                            </div>
                            <button
                                onClick={() => setIsCreatingTask(true)}
                                className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-brand-gold text-brand-dark hover:brightness-110 transition-all text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-brand-gold/10"
                            >
                                <Plus size={18} />
                                Initialize_Launch
                            </button>
                        </div>

                        {/* High-Density Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[
                                { label: 'AUM_TOTAL_VALUE', value: `$${(totalVolume / 1000000).toFixed(1)}M`, icon: TrendingUp, color: 'text-brand-gold', trend: '+12.4% SYSTEM_GROWTH' },
                                { label: 'TOTAL_PHYSICAL_AREA', value: `${(totalSqFt / 1000).toFixed(0)}K SF`, icon: Layers, color: 'text-blue-400', trend: 'STABLE_METRIC' },
                                { label: 'DEPLOYED_OPERATIVES', value: firmMembers.length, icon: Users, color: 'text-purple-400', trend: 'ACTIVE_ROSTER' },
                                { label: 'ACTIVE_DEAL_NODES', value: firmDeals.length, icon: Briefcase, color: 'text-green-400', trend: 'SYNC_COMPLETE' },
                            ].map((stat, i) => (
                                <div key={i} className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-xl relative group overflow-hidden">
                                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <stat.icon size={48} />
                                    </div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className={`h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center border border-white/5 ${stat.color}`}>
                                            <stat.icon size={16} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">{stat.label}</span>
                                    </div>
                                    <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
                                    <p className={`text-[8px] font-bold uppercase tracking-widest ${stat.trend.includes('+') ? 'text-green-500' : 'text-white/20'}`}>
                                        {stat.trend}
                                    </p>
                                </div>
                            ))}
                        </div>

                        {/* 3-Column Mission Control Architecture */}
                        <div className="flex gap-8 h-[calc(100vh-280px)] min-h-[600px]">
                            {/* Left Column: Agents Sidebar */}
                            <div className="w-[320px] shrink-0">
                                <AgentsSidebar
                                    agents={firmMembers}
                                    onSelectAgent={(agent) => {
                                        setSelectedAgent(agent);
                                        // Auto-open agent docs if needed
                                    }}
                                />
                            </div>

                            {/* Middle Column: Mission Queue */}
                            <div className="flex-1 min-w-0">
                                <div className="h-full border border-white/5 rounded-2xl bg-[#0a0a0a]/40 backdrop-blur-sm p-6 overflow-hidden">
                                    <MissionQueue
                                        tasks={firmTasks}
                                        agents={firmMembers}
                                        onUpdateTask={updateTask}
                                        onSelectTask={setSelectedTask}
                                    />
                                </div>
                            </div>

                            {/* Right Column: Live Feed */}
                            <div className="w-[360px] shrink-0">
                                <LiveFeed activities={firmActivities} />
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'portfolio' && (
                    <motion.div
                        key="portfolio"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="h-full"
                    >
                        <TeamKanban deals={firmDeals} />
                    </motion.div>
                )}

                {activeTab === 'team' && (
                    <motion.div
                        key="team"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                    >
                        <div className="flex flex-wrap gap-6">
                            {firmMembers.map((member) => (
                                <div key={member.id} className="w-[300px] p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 hover:border-brand-gold/30 transition-all group cursor-pointer shadow-xl">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="h-16 w-16 rounded-xl overflow-hidden border-2 border-white/5 group-hover:border-brand-gold/40 transition-colors">
                                            <img src={member.imageURL} alt="" className="h-full w-full object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-black uppercase tracking-tight text-white">{member.name}</h4>
                                            <p className="text-[9px] font-bold text-brand-gold uppercase tracking-widest mt-1">{member.role}</p>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
                                            <span>Active Transactions</span>
                                            <span className="text-white/60">{deals.filter(d => (d.teamMemberIds || []).includes(member.id)).length}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className="h-full bg-brand-gold rounded-full" style={{ width: '75%' }} />
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveDoc({ id: member.id, name: `${member.name}_PROTOCOLS.md`, content: member.bio || '# Protocol Notes\n\n- No entry recorded.' })}
                                        className="w-full mt-6 py-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-all text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-white flex items-center justify-center gap-2"
                                    >
                                        <FileText size={12} />
                                        Access Operative Logs
                                    </button>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {activeTab === 'docs' && (
                    <motion.div
                        key="docs"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[calc(100vh-200px)] flex gap-8"
                    >
                        {/* Docs Browser Sidebar */}
                        <div className="w-80 flex flex-col gap-4">
                            <div className="p-6 rounded-2xl bg-[#0a0a0a] border border-white/5 shadow-xl flex-1">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-6 flex items-center gap-2">
                                    <Database size={12} />
                                    Archive_Hierarchy
                                </h3>
                                <div className="space-y-2">
                                    {[
                                        { name: 'FIRM_OVERVIEW.md', size: '4.2kb', date: '01/03/24' },
                                        { name: 'STRATEGY_CORE.md', size: '12.8kb', date: '02/28/24' },
                                        { name: 'RISK_MANAGEMENT.md', size: '8.4kb', date: '02/15/24' },
                                        { name: 'INVESTMENT_THESIS.md', size: '24.1kb', date: '03/01/24' },
                                    ].map((doc, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setActiveDoc({ id: `firm-${i}`, name: doc.name, content: `# ${doc.name.replace('.md', '')}\n\nThis is a secure system document for **${firm.name}**.\n\n## Content\n\n- Strategic alignment confirmed.\n- Resource allocation optimized.` })}
                                            className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/5 transition-all text-left group"
                                        >
                                            <div className="flex items-center gap-3 overflow-hidden">
                                                <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 group-hover:text-brand-gold transition-colors shrink-0">
                                                    <FileText size={14} />
                                                </div>
                                                <div className="overflow-hidden">
                                                    <p className="text-[10px] font-black uppercase tracking-tight text-white/60 truncate group-hover:text-white transition-colors">{doc.name}</p>
                                                    <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest mt-0.5">{doc.size} // {doc.date}</p>
                                                </div>
                                            </div>
                                            <ChevronRight size={12} className="text-white/5 group-hover:text-brand-gold transition-colors" />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Editor Area */}
                        <div className="flex-1">
                            {activeDoc ? (
                                <MarkdownEditor
                                    fileName={activeDoc.name}
                                    content={activeDoc.content}
                                    onChange={(content) => setActiveDoc({ ...activeDoc, content })}
                                    onSave={handleSaveDoc}
                                    onClose={() => setActiveDoc(null)}
                                    isSaving={isSavingDoc}
                                />
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/5 bg-white/[0.01] p-24 text-center">
                                    <div className="mb-6 rounded-full bg-white/5 p-8 border border-white/5">
                                        <Cpu size={40} className="text-white/10" />
                                    </div>
                                    <h3 className="text-xl font-black text-white/40 uppercase tracking-[0.2em]">Select an ARCHIVE to decode</h3>
                                    <p className="mt-2 text-xs font-bold text-white/10 uppercase tracking-widest italic">Secure End-to-End Encryption Active</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Modals */}
            <AnimatePresence>
                {selectedAgent && (
                    <AgentModal
                        agent={selectedAgent}
                        onClose={() => setSelectedAgent(null)}
                    />
                )}
                {(selectedTask || isCreatingTask) && (
                    <TaskModal
                        task={selectedTask}
                        firmId={firm.id}
                        agents={firmMembers}
                        onClose={() => {
                            setSelectedTask(null);
                            setIsCreatingTask(false);
                        }}
                    />
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
