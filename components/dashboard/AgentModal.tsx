"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    FileText,
    Shield,
    User,
    Zap,
    Save,
    ExternalLink,
    Terminal
} from 'lucide-react';
import { TeamMember, useData } from '@/context/DataContext';
import MarkdownEditor from '@/components/MarkdownEditor';

interface AgentModalProps {
    agent: TeamMember;
    onClose: () => void;
}

type TabType = 'INFO' | 'SOUL' | 'USER' | 'AGENTS';

export default function AgentModal({ agent, onClose }: AgentModalProps) {
    const { updateTeamMember, fetchMemberFiles, updateMemberFile, uploadMemberFile } = useData();
    const [activeTab, setActiveTab] = useState<TabType>('INFO');
    const [isSaving, setIsSaving] = useState(false);
    const [agentDocs, setAgentDocs] = useState<any[]>([]);
    const [localDocContent, setLocalDocContent] = useState('');

    useEffect(() => {
        const loadDocs = async () => {
            const files = await fetchMemberFiles(agent.id);
            setAgentDocs(files);
        };
        loadDocs();
    }, [agent.id]);

    useEffect(() => {
        if (['SOUL', 'USER', 'AGENTS'].includes(activeTab)) {
            const name = `${activeTab}.md`;
            const doc = agentDocs.find(d => d.name === name);
            setLocalDocContent(doc ? doc.content : `# ${name}\n\nProtocol not yet initialized.`);
        }
    }, [activeTab, agentDocs]);

    const getDocContent = (name: string) => {
        const doc = agentDocs.find(d => d.name === name);
        return doc ? doc.content : `# ${name}\n\nProtocol not yet initialized.`;
    };

    const handleSaveDoc = async (name: string, content: string) => {
        setIsSaving(true);
        const existingDoc = agentDocs.find(d => d.name === name);
        if (existingDoc) {
            await updateMemberFile(agent.id, existingDoc.id, { content });
        } else {
            await uploadMemberFile(agent.id, { name, content, type: 'MARKDOWN' });
        }

        // Refresh docs
        const files = await fetchMemberFiles(agent.id);
        setAgentDocs(files);
        setIsSaving(false);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-[#0a0a0a] border border-white/5 w-full max-w-6xl h-full max-h-[900px] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl"
            >
                {/* Modal Header */}
                <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-6">
                        <div className="h-16 w-16 rounded-2xl overflow-hidden border-2 border-brand-gold/40 shadow-lg shadow-brand-gold/10">
                            <img src={agent.imageURL} alt="" className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-xl font-black uppercase tracking-tight text-white">{agent.name}</h2>
                                <span className="px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-500 text-[8px] font-black uppercase tracking-widest">
                                    ACTIVE_OPERATIVE
                                </span>
                            </div>
                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.2em] mt-1">{agent.role}</p>
                        </div>
                    </div>

                    <button onClick={onClose} className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all">
                        <X size={20} />
                    </button>
                </div>

                {/* Tabs Area */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Secondary Sidebar (Tabs) */}
                    <div className="w-64 border-r border-white/5 bg-black/20 p-6 flex flex-col gap-2">
                        {[
                            { id: 'INFO', label: 'Operative_Info', icon: User },
                            { id: 'SOUL', label: 'SOUL.md', icon: Zap },
                            { id: 'USER', label: 'USER.md', icon: Shield },
                            { id: 'AGENTS', label: 'AGENTS.md', icon: Terminal },
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as TabType)}
                                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === tab.id
                                    ? 'bg-brand-gold text-brand-dark font-black'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <tab.icon size={18} />
                                <span className="text-[10px] uppercase tracking-widest">{tab.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Main Section Area */}
                    <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                        {activeTab === 'INFO' && (
                            <div className="max-w-3xl space-y-12">
                                <section>
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-2">
                                        <FileText size={12} />
                                        BIO_NARRATIVE
                                    </h3>
                                    <p className="text-sm text-white/60 leading-relaxed font-medium">
                                        {agent.bio || "No tactical narrative has been established for this operative."}
                                    </p>
                                </section>

                                <div className="grid grid-cols-2 gap-8">
                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-2">
                                            <Zap size={12} />
                                            CORE_METRICS
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Uptime', value: '99.9%' },
                                                { label: 'Latency', value: '18ms' },
                                                { label: 'Success Rate', value: '94%' },
                                            ].map((m, i) => (
                                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/5">
                                                    <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest">{m.label}</span>
                                                    <span className="text-[10px] font-black text-brand-gold">{m.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mb-6 flex items-center gap-2">
                                            <Shield size={12} />
                                            SECURITY_PROTOCOLS
                                        </h3>
                                        <div className="p-4 rounded-xl bg-green-500/5 border border-green-500/10">
                                            <p className="text-[9px] font-bold text-green-500/60 leading-relaxed italic">
                                                Operative identity verified via encrypted hash. All maneuvers recorded in the mission log.
                                            </p>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        )}

                        {['SOUL', 'USER', 'AGENTS'].includes(activeTab) && (
                            <div className="h-full flex flex-col">
                                <MarkdownEditor
                                    fileName={`${activeTab}.md`}
                                    content={localDocContent}
                                    onChange={(content) => setLocalDocContent(content)}
                                    onSave={() => handleSaveDoc(`${activeTab}.md`, localDocContent)}
                                    onClose={() => setActiveTab('INFO')}
                                    isSaving={isSaving}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
