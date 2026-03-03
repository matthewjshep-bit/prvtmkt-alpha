"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    Briefcase,
    FileText,
    Activity,
    Settings,
    Bell,
    Search,
    ChevronLeft,
    ChevronRight,
    Terminal,
    Database,
    Zap
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
    firmName: string;
    logoUrl?: string;
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export default function DashboardLayout({
    children,
    firmName,
    logoUrl,
    activeTab,
    setActiveTab
}: DashboardLayoutProps) {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'team', label: 'Team', icon: Users },
        { id: 'portfolio', label: 'Portfolio', icon: Briefcase },
        { id: 'docs', label: 'Docs', icon: FileText },
        { id: 'activity', label: 'Feed', icon: Activity },
        { id: 'settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="flex h-screen bg-[#050505] text-white font-inter overflow-hidden">
            {/* Sidebar */}
            <motion.aside
                initial={false}
                animate={{ width: isSidebarCollapsed ? '80px' : '260px' }}
                className="flex flex-col border-r border-white/5 bg-[#0a0a0a] z-50 relative"
            >
                <div className="p-6 flex items-center gap-4 border-b border-white/5 h-[80px]">
                    <div className="shrink-0 h-10 w-10 rounded-xl bg-brand-gold/10 flex items-center justify-center border border-brand-gold/20">
                        {logoUrl ? (
                            <img src={logoUrl} alt="" className="h-6 w-6 object-contain" />
                        ) : (
                            <Terminal size={20} className="text-brand-gold" />
                        )}
                    </div>
                    {!isSidebarCollapsed && (
                        <div className="overflow-hidden">
                            <h1 className="text-sm font-black uppercase tracking-tighter truncate">{firmName}</h1>
                            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest opacity-60">Mission Control</p>
                        </div>
                    )}
                </div>

                <nav className="flex-1 p-4 space-y-2 mt-4">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all group ${activeTab === item.id
                                    ? 'bg-brand-gold text-brand-dark font-black'
                                    : 'text-white/40 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <item.icon size={20} className={activeTab === item.id ? '' : 'group-hover:scale-110 transition-transform'} />
                            {!isSidebarCollapsed && (
                                <span className="text-[11px] uppercase tracking-widest">{item.label}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/5">
                    <button
                        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                        className="w-full flex items-center justify-center p-3 rounded-xl hover:bg-white/5 transition-all text-white/20 hover:text-white"
                    >
                        {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Bar */}
                <header className="h-[80px] border-b border-white/5 flex items-center justify-between px-8 bg-[#0a0a0a]/50 backdrop-blur-xl z-40">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                            <Database size={14} className="text-brand-gold" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Sync Status:</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold animate-pulse">Live</span>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
                            <Zap size={14} className="text-blue-400" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Core Latency:</span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">14ms</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="relative group hidden md:block">
                            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" />
                            <input
                                type="text"
                                placeholder="CORE_SEARCH_COMMAND"
                                className="h-10 w-64 bg-white/5 border border-white/5 rounded-xl pl-12 pr-4 text-[10px] font-mono tracking-widest focus:border-brand-gold/40 outline-none transition-all"
                            />
                        </div>
                        <button className="relative p-2 text-white/40 hover:text-white transition-colors">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 border-2 border-[#0a0a0a]" />
                        </button>
                    </div>
                </header>

                {/* Dashboard Area */}
                <div className="flex-1 overflow-auto p-8 custom-scrollbar relative">
                    {/* Background Grid Accent */}
                    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] pointer-events-none opacity-20" />

                    <div className="relative z-10">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
