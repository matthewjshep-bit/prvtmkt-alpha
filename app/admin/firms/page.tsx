"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Building2, Save, Upload, ExternalLink, Shield, Check, Plus, X, Search, Trash2, AlertTriangle, Palette, Type, Layout, Info, Linkedin } from "lucide-react";
import Link from "next/link";

export default function AdminFirmsPage() {
    const { firms, teamMembers, updateFirm, updateTeamMember, addFirm, deleteFirm } = useData();
    const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

    const isVideo = (url: string | undefined) => {
        if (!url) return false;
        const lowerUrl = url.toLowerCase();
        const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov', '.quicktime', '.m4v'];
        const hasVideoExtension = videoExtensions.some(ext => lowerUrl.split(/[?#]/)[0].endsWith(ext));
        const isVideoDataUrl = url.startsWith('data:video/') || lowerUrl.includes('video/quicktime') || lowerUrl.includes('video/mp4');
        return hasVideoExtension || isVideoDataUrl || (url.startsWith('data:') && !lowerUrl.includes('image/'));
    };
    const [isAddingFirm, setIsAddingFirm] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [newFirm, setNewFirm] = useState({
        name: "",
        slug: "",
        logoUrl: "",
        primaryColor: "#c5a059",
        bio: "",
        backgroundColor: "#0a0a0a",
        fontColor: "#ffffff",
        secondaryColor: "#151515",
        showAgencyBranding: true,
        physicalAddress: "",
        linkedInUrl: "",
        googleReviewsUrl: "",
        heroMediaUrl: ""
    });
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});

    const filteredFirms = firms.filter(f =>
        f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleUpdateLogo = (id: string, newUrl: string) => {
        updateFirm(id, { logoUrl: newUrl });
        setSaveStatus({ ...saveStatus, [id]: 'idle' });
    };

    const handleAddFirm = (e: React.FormEvent) => {
        e.preventDefault();
        const firmToAdd = {
            ...newFirm,
            id: `f-${Date.now()}`,
        };
        addFirm(firmToAdd);
        setIsAddingFirm(false);
        setNewFirm({
            name: "",
            slug: "",
            logoUrl: "",
            primaryColor: "#c5a059",
            bio: "",
            backgroundColor: "#0a0a0a",
            fontColor: "#ffffff",
            secondaryColor: "#151515",
            showAgencyBranding: true,
            physicalAddress: "",
            linkedInUrl: "",
            googleReviewsUrl: "",
            heroMediaUrl: ""
        });
    };

    const handleSave = (id: string) => {
        setSaveStatus({ ...saveStatus, [id]: 'saving' });
        setTimeout(() => {
            setSaveStatus({ ...saveStatus, [id]: 'saved' });
            setTimeout(() => {
                setSaveStatus(prev => ({ ...prev, [id]: 'idle' }));
            }, 2000);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div>
                        <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-gold">
                            <Shield size={14} />
                            Admin Access
                        </div>
                        <h1 className="text-4xl font-bold text-white">Manage <span className="text-brand-gold">Firms</span></h1>
                    </div>

                    <div className="flex flex-1 max-w-xl items-center gap-4">
                        <div className="relative flex-1 group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by firm name or slug..."
                                className="h-12 w-full rounded-xl border border-white/5 bg-brand-gray-900/50 pl-12 pr-4 text-sm text-white focus:border-brand-gold/50 focus:outline-none transition-all"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setIsAddingFirm(true)}
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                        >
                            <Plus size={18} />
                            Add New Firm
                        </button>
                        <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white transition-colors">
                            Dashboard
                        </Link>
                    </div>
                </div>

                {/* Add Firm Form */}
                {isAddingFirm && (
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="glass overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-gray-900/50 p-10">
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h2 className="text-2xl font-bold text-white mb-2">Scaffold <span className="text-brand-gold">New Firm Platform</span></h2>
                                    <p className="text-sm text-foreground/40">Initialize a new firm portfolio and brand identity.</p>
                                </div>
                                <button onClick={() => setIsAddingFirm(false)} className="text-foreground/40 hover:text-white transition-colors">
                                    <X size={28} />
                                </button>
                            </div>

                            <form onSubmit={handleAddFirm} className="space-y-10">
                                <div className="grid gap-8 md:grid-cols-2">
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Firm Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. Blackstone"
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                                value={newFirm.name}
                                                onChange={(e) => {
                                                    const name = e.target.value;
                                                    const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
                                                    setNewFirm({ ...newFirm, name, slug });
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">URL Slug</label>
                                            <div className="flex items-center gap-2 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white">
                                                <span className="text-foreground/40">/</span>
                                                <input
                                                    required
                                                    type="text"
                                                    className="bg-transparent outline-none w-full"
                                                    value={newFirm.slug}
                                                    onChange={(e) => setNewFirm({ ...newFirm, slug: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Firm Bio & Mission</label>
                                        <textarea
                                            placeholder="Enter firm description..."
                                            className="h-[136px] w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none resize-none"
                                            value={newFirm.bio}
                                            onChange={(e) => setNewFirm({ ...newFirm, bio: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-10 md:grid-cols-3">
                                    <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Primary Color</label>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                                <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={newFirm.primaryColor} onChange={(e) => setNewFirm({ ...newFirm, primaryColor: e.target.value })} />
                                                <span className="text-[10px] font-mono text-white/60">{newFirm.primaryColor}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Background</label>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                                <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={newFirm.backgroundColor} onChange={(e) => setNewFirm({ ...newFirm, backgroundColor: e.target.value })} />
                                                <span className="text-[10px] font-mono text-white/60">{newFirm.backgroundColor}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Font Color</label>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                                <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={newFirm.fontColor} onChange={(e) => setNewFirm({ ...newFirm, fontColor: e.target.value })} />
                                                <span className="text-[10px] font-mono text-white/60">{newFirm.fontColor}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Accent Shade</label>
                                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                                <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={newFirm.secondaryColor} onChange={(e) => setNewFirm({ ...newFirm, secondaryColor: e.target.value })} />
                                                <span className="text-[10px] font-mono text-white/60">{newFirm.secondaryColor}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-brand-dark px-6 py-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Agency Branding</label>
                                            <p className="text-[10px] text-foreground/40">Show PRVT MKT nav</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setNewFirm({ ...newFirm, showAgencyBranding: !newFirm.showAgencyBranding })}
                                            className={`relative h-6 w-11 rounded-full transition-all ${newFirm.showAgencyBranding ? 'bg-brand-gold' : 'bg-white/10'}`}
                                        >
                                            <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${newFirm.showAgencyBranding ? 'right-1' : 'left-1'}`} />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid gap-10 md:grid-cols-2 border-t border-white/5 pt-10">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Hero Media (Banner Image/Video)</label>
                                        <div className="group relative flex aspect-[21/9] cursor-pointer items-center justify-center overflow-hidden rounded-[2rem] border-2 border-dashed border-white/5 bg-brand-dark transition-all hover:border-brand-gold/50">
                                            {newFirm.heroMediaUrl ? (
                                                <>
                                                    {isVideo(newFirm.heroMediaUrl) ? (
                                                        <video
                                                            key={newFirm.heroMediaUrl.slice(-32)}
                                                            src={newFirm.heroMediaUrl}
                                                            className="h-full w-full object-cover opacity-50 transition-transform group-hover:scale-110"
                                                            muted
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                            onError={(e) => console.error("New Firm Video Error:", e)}
                                                        />
                                                    ) : (
                                                        <img src={newFirm.heroMediaUrl} className="h-full w-full object-cover opacity-50 transition-transform group-hover:scale-110" />
                                                    )}
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setNewFirm({ ...newFirm, heroMediaUrl: "" });
                                                        }}
                                                        className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-red-500 text-white shadow-xl transition-transform hover:scale-110"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </>
                                            ) : (
                                                <div className="text-center">
                                                    <Upload className="mx-auto mb-2 text-foreground/20" size={32} />
                                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Upload Portfolio Hero</p>
                                                </div>
                                            )}
                                            <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*,video/*,video/mp4,video/quicktime,.mov,.mp4" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    console.log("File selected:", file.name, file.type, file.size);
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => {
                                                        const result = reader.result as string;
                                                        setNewFirm({ ...newFirm, heroMediaUrl: result });
                                                    };
                                                    reader.onerror = (error) => console.error("FileReader error:", error);
                                                    reader.readAsDataURL(file);
                                                }
                                            }} />
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Physical Address</label>
                                            <textarea
                                                className="h-24 w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-sm text-white focus:border-brand-gold/50 focus:outline-none resize-none"
                                                value={newFirm.physicalAddress}
                                                onChange={(e) => setNewFirm({ ...newFirm, physicalAddress: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 border-t border-white/5 pt-10">
                                    <button type="submit" className="flex items-center gap-3 rounded-2xl bg-brand-gold px-12 py-5 text-sm font-bold text-brand-dark transition-all hover:shadow-2xl hover:shadow-brand-gold/30">
                                        <Building2 size={20} />
                                        Initialize Firm Platform
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="space-y-12">
                    {filteredFirms.length > 0 ? filteredFirms.map((firm) => (
                        <div key={firm.id} className="glass group relative overflow-hidden rounded-[3rem] border border-white/5 bg-brand-gray-900/30 p-10 transition-all hover:border-brand-gold/20">
                            <div className="flex flex-col xl:flex-row gap-12">

                                {/* 1. Identity & Logo Section */}
                                <div className="xl:w-[280px] shrink-0 space-y-8">
                                    <div className="relative aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] bg-white/5 p-8 border border-white/5">
                                        <img src={firm.logoUrl || "/master-logo.png"} alt={firm.name} className="h-full w-full object-contain" />
                                        <div className="absolute inset-0 flex items-center justify-center bg-brand-dark/80 opacity-0 transition-opacity group-hover:opacity-100">
                                            <label className="cursor-pointer font-bold text-xs text-brand-gold flex items-center gap-2">
                                                <Upload size={16} />
                                                Change Logo
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => handleUpdateLogo(firm.id, reader.result as string);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3 border-b border-white/5 pb-2">
                                            <Building2 size={18} className="text-brand-gold" />
                                            <input type="text" className="bg-transparent text-xl font-bold text-white focus:outline-none w-full" value={firm.name} onChange={(e) => updateFirm(firm.id, { name: e.target.value })} />
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-mono opacity-40">
                                            <span className="uppercase">Slug:</span>
                                            <span>/{firm.slug}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* 2. Main Content & Branding Editor */}
                                <div className="flex-1 space-y-10">
                                    {/* Content Grid */}
                                    <div className="grid gap-10 md:grid-cols-2">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                <Info size={14} className="text-brand-gold" />
                                                Firm Narrative
                                            </div>
                                            <textarea
                                                className="h-40 w-full rounded-2xl border border-white/5 bg-brand-dark px-5 py-4 text-sm text-foreground/80 focus:border-brand-gold/50 focus:outline-none resize-none leading-relaxed"
                                                value={firm.bio || ""}
                                                onChange={(e) => updateFirm(firm.id, { bio: e.target.value })}
                                                placeholder="Enter firm bio and mission statement..."
                                            />
                                        </div>

                                        <div className="space-y-6">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                <Palette size={14} className="text-brand-gold" />
                                                Visual Identity System
                                            </div>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-3 rounded-2xl border border-white/5 bg-brand-dark p-4">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 block">Primary</label>
                                                    <div className="flex items-center gap-3">
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.primaryColor || "#c5a059"} onChange={(e) => updateFirm(firm.id, { primaryColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-white/60">{firm.primaryColor}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 rounded-2xl border border-white/5 bg-brand-dark p-4">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 block">Background</label>
                                                    <div className="flex items-center gap-3">
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.backgroundColor || "#0a0a0a"} onChange={(e) => updateFirm(firm.id, { backgroundColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-white/60">{firm.backgroundColor}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 rounded-2xl border border-white/5 bg-brand-dark p-4">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 block">Font</label>
                                                    <div className="flex items-center gap-3">
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.fontColor || "#ffffff"} onChange={(e) => updateFirm(firm.id, { fontColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-white/60">{firm.fontColor}</span>
                                                    </div>
                                                </div>
                                                <div className="space-y-3 rounded-2xl border border-white/5 bg-brand-dark p-4">
                                                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/30 block">Accent</label>
                                                    <div className="flex items-center gap-3">
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.secondaryColor || "#151515"} onChange={(e) => updateFirm(firm.id, { secondaryColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-white/60">{firm.secondaryColor}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hero & Contact Details Area */}
                                    <div className="grid gap-10 md:grid-cols-2 pt-6 border-t border-white/5">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                <Layout size={14} className="text-brand-gold" />
                                                Hero & Banner Visuals
                                            </div>
                                            <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-brand-dark">
                                                {firm.heroMediaUrl ? (
                                                    isVideo(firm.heroMediaUrl) ? (
                                                        <video
                                                            key={firm.heroMediaUrl.slice(-32)}
                                                            src={firm.heroMediaUrl}
                                                            className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105"
                                                            muted
                                                            loop
                                                            autoPlay
                                                            playsInline
                                                            onError={(e) => console.error("Firm Card Video Error:", e)}
                                                        />
                                                    ) : (
                                                        <img src={firm.heroMediaUrl} className="h-full w-full object-cover opacity-60 transition-transform group-hover:scale-105" />
                                                    )
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full text-foreground/20">
                                                        <Upload size={24} className="mb-2" />
                                                        <p className="text-[10px] font-bold uppercase">No Hero Media</p>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center gap-3 bg-brand-dark/60 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <label className="cursor-pointer font-bold text-[10px] text-white bg-brand-gold/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-brand-gold/40 transition-colors">
                                                        <Upload size={14} />
                                                        {firm.heroMediaUrl ? 'Replace' : 'Upload'}
                                                        <input type="file" className="hidden" accept="image/*,video/*,video/mp4,video/quicktime,.mov,.mp4" onChange={(e) => {
                                                            const file = e.target.files?.[0];
                                                            if (file) {
                                                                console.log("Updating firm media:", file.name, file.type);
                                                                const reader = new FileReader();
                                                                reader.onloadend = () => updateFirm(firm.id, { heroMediaUrl: reader.result as string });
                                                                reader.onerror = (err) => console.error("FileReader error (update):", err);
                                                                reader.readAsDataURL(file);
                                                            }
                                                        }} />
                                                    </label>
                                                    {firm.heroMediaUrl && (
                                                        <button
                                                            onClick={() => updateFirm(firm.id, { heroMediaUrl: "" })}
                                                            className="font-bold text-[10px] text-white bg-red-500/20 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2 hover:bg-red-500/40 transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                            Remove
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                    <Linkedin size={14} className="text-brand-gold" />
                                                    LinkedIn & Social
                                                </div>
                                                <input
                                                    type="url"
                                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-sm text-foreground/70 focus:border-brand-gold/50 focus:outline-none"
                                                    placeholder="LinkedIn Profile URL"
                                                    value={firm.linkedInUrl || ""}
                                                    onChange={(e) => updateFirm(firm.id, { linkedInUrl: e.target.value })}
                                                />
                                            </div>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">
                                                    <ExternalLink size={14} className="text-brand-gold" />
                                                    Public Reviews (Google)
                                                </div>
                                                <input
                                                    type="url"
                                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-sm text-foreground/70 focus:border-brand-gold/50 focus:outline-none"
                                                    placeholder="Google Reviews URL"
                                                    value={firm.googleReviewsUrl || ""}
                                                    onChange={(e) => updateFirm(firm.id, { googleReviewsUrl: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* 3. Actions Panel */}
                                <div className="xl:w-[150px] shrink-0 flex flex-col gap-4 border-l border-white/5 xl:pl-8">
                                    <button
                                        onClick={() => handleSave(firm.id)}
                                        disabled={saveStatus[firm.id] === 'saving'}
                                        className={`group relative flex items-center justify-center gap-2 rounded-2xl px-4 py-4 text-xs font-bold transition-all ${saveStatus[firm.id] === 'saved' ? 'bg-green-500 text-white' : 'bg-brand-gold text-brand-dark hover:shadow-xl'
                                            }`}
                                    >
                                        {saveStatus[firm.id] === 'saving' ? (
                                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-dark/30 border-t-brand-dark" />
                                        ) : saveStatus[firm.id] === 'saved' ? (
                                            <Check size={16} />
                                        ) : (
                                            <Save size={16} />
                                        )}
                                        {saveStatus[firm.id] === 'saving' ? 'Saving' : saveStatus[firm.id] === 'saved' ? 'Saved' : 'Update'}
                                    </button>

                                    <Link
                                        href={`/firms/${firm.slug || firm.id}`}
                                        target="_blank"
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-white/5 px-4 py-4 text-xs font-bold text-white transition-all hover:bg-white/10"
                                    >
                                        <ExternalLink size={16} />
                                        Portal
                                    </Link>

                                    <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                                        <div className="flex items-center justify-between px-2">
                                            <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider">Agency</span>
                                            <button
                                                onClick={() => updateFirm(firm.id, { showAgencyBranding: !firm.showAgencyBranding })}
                                                className={`relative h-4 w-8 rounded-full transition-all ${firm.showAgencyBranding !== false ? 'bg-brand-gold' : 'bg-white/10'}`}
                                            >
                                                <div className={`absolute top-0.5 h-3 w-3 rounded-full bg-brand-dark transition-all ${firm.showAgencyBranding !== false ? 'right-0.5' : 'left-0.5'}`} />
                                            </button>
                                        </div>

                                        <button
                                            onClick={() => setConfirmDeleteId(firm.id)}
                                            className="w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500/10 px-4 py-4 text-xs font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                                        >
                                            <Trash2 size={16} />
                                            Purge
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="flex flex-col items-center justify-center py-20 rounded-[3rem] border-2 border-dashed border-white/5 bg-white/5">
                            <Building2 size={64} className="text-white/10 mb-6" />
                            <h3 className="text-2xl font-bold text-white mb-2">No Matching Entities</h3>
                            <p className="text-foreground/40 max-w-sm text-center">Your search query did not return any firms. Try adjusting your filters or search terms.</p>
                            <button onClick={() => setSearchQuery("")} className="mt-8 text-brand-gold font-bold text-sm hover:underline tracking-widest uppercase">Clear Search</button>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {confirmDeleteId && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/90 backdrop-blur-sm shadow-2xl">
                    <div className="w-full max-w-md bg-brand-gray-900 rounded-[2.5rem] border border-white/10 p-10 text-center">
                        <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10 text-red-500 mx-auto">
                            <AlertTriangle size={40} />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-3">Permanent Deletion</h2>
                        <p className="text-foreground/50 mb-10 leading-relaxed text-sm">
                            You are about to purge <span className="text-white font-bold">{firms.find(f => f.id === confirmDeleteId)?.name}</span>. All associations, records, and branding data will be removed.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setConfirmDeleteId(null)} className="flex-1 rounded-2xl bg-white/5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all">Abort</button>
                            <button
                                onClick={() => { deleteFirm(confirmDeleteId); setConfirmDeleteId(null); }}
                                className="flex-1 rounded-2xl bg-red-500 py-4 text-sm font-bold text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                            >
                                Confirm Purge
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
