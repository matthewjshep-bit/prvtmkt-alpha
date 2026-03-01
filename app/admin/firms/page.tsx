"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";

import { Building2, Save, Upload, ExternalLink, Shield, Check, Plus, X, Search, Trash2, AlertTriangle, Palette, Type, Layout, Info, Linkedin, LayoutDashboard, Sparkles, Globe, Wand2, Loader2, UserPlus, Briefcase } from "lucide-react";
import Link from "next/link";

export default function AdminFirmsPage() {
    const { firms, teamMembers, updateFirm, updateTeamMember, addFirm, deleteFirm, addTeamMember, addDeal } = useData();
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
        primaryColor: "#ffffff",
        bio: "",
        backgroundColor: "#0a0a0a",
        fontColor: "#ffffff",
        accentColor: "#151515",
        showAgencyBranding: true,
        physicalAddress: "",
        linkedInUrl: "",
        googleReviewsUrl: "",
        heroMediaUrl: ""
    });

    // Scraping State
    const [isImporting, setIsImporting] = useState(false);
    const [importUrl, setImportUrl] = useState("");
    const [isScraping, setIsScraping] = useState(false);
    const [scrapedResults, setScrapedResults] = useState<any>(null);
    const [isApplyingImport, setIsApplyingImport] = useState(false);
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
            primaryColor: "#ffffff",
            bio: "",
            backgroundColor: "#0a0a0a",
            fontColor: "#ffffff",
            accentColor: "#151515",
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

    const handleStartScrape = async () => {
        if (!importUrl) return;
        setIsScraping(true);
        setScrapedResults(null);
        try {
            const response = await fetch('/api/scrape/firm', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: importUrl })
            });

            const result = await response.json();
            if (result.success) {
                setScrapedResults(result.data);
            } else {
                alert(`Import failed: ${result.error || result.detail || 'Unknown error'}`);
            }
        } catch (error) {
            console.error("Scrape Error:", error);
            alert("Connection error while scraping. Please ensure your backend is running.");
        } finally {
            setIsScraping(false);
        }
    };

    const handleApplyImport = async () => {
        if (!scrapedResults) return;
        setIsApplyingImport(true);
        try {
            // 1. Create Firm
            const rawFirm = scrapedResults.firm;
            const firmSlug = (rawFirm.name || "new-firm").toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

            const initialFirmData = {
                ...newFirm,
                id: `f-temp-${Date.now()}`,
                name: rawFirm.name || "Imported Firm",
                slug: firmSlug,
                bio: rawFirm.bio || "",
                logoUrl: rawFirm.logoUrl || "",
                primaryColor: rawFirm.primaryColor || "#ffffff",
                backgroundColor: rawFirm.backgroundColor || "#0a0a0a",
                fontColor: rawFirm.fontColor || "#ffffff",
                accentColor: rawFirm.accentColor || "#151515",
                physicalAddress: rawFirm.physicalAddress || "",
                linkedInUrl: rawFirm.linkedInUrl || ""
            };

            const savedFirm = await addFirm(initialFirmData);
            if (!savedFirm) throw new Error("Failed to create firm during import");

            const firmId = savedFirm.id;

            // 2. Add Team Members
            if (scrapedResults.team && Array.isArray(scrapedResults.team)) {
                for (let i = 0; i < scrapedResults.team.length; i++) {
                    const member = scrapedResults.team[i];
                    await addTeamMember({
                        id: `m-temp-${Date.now()}-${i}`,
                        firmId: firmId,
                        firmIds: [firmId],
                        name: member.name || "Unknown Member",
                        slug: (member.name || "member").toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                        role: member.role || "Team Member",
                        bio: member.bio || "",
                        imageURL: member.imageURL || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                        linkedInUrl: member.linkedInUrl || "",
                        order: i
                    });
                }
            }

            // 3. Add Deals
            if (scrapedResults.deals && Array.isArray(scrapedResults.deals)) {
                for (let i = 0; i < scrapedResults.deals.length; i++) {
                    const deal = scrapedResults.deals[i];
                    await addDeal({
                        id: `d-temp-${Date.now()}-${i}`,
                        firmId: firmId,
                        address: deal.address || "Unknown Property",
                        assetType: deal.assetType || "INDUSTRIAL",
                        strategy: deal.strategy || "Core Plus",
                        context: deal.description || "",
                        stillImageURL: deal.imageURL || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
                        purchaseAmount: deal.purchaseAmount || null,
                        isPublic: true,
                        teamMemberIds: []
                    });
                }
            }

            setScrapedResults(null);
            setIsImporting(false);
            setImportUrl("");
            alert("Firm, Team, and Portfolio successfully imported!");
        } catch (error) {
            console.error("Apply Import Error:", error);
            alert("Failed to save imported data.");
        } finally {
            setIsApplyingImport(false);
        }
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
                            onClick={() => setIsImporting(true)}
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10"
                        >
                            <Sparkles size={18} className="text-brand-gold animate-pulse" />
                            AI Scrape Import
                        </button>
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

                {/* AI Import Modal */}
                {isImporting && (
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="glass overflow-hidden rounded-[2.5rem] border border-brand-gold/20 bg-brand-gray-900/50 p-10 shadow-[0_0_50px_rgba(234,179,8,0.1)]">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Sparkles className="text-brand-gold" size={20} />
                                        <h2 className="text-2xl font-bold text-white">Automated <span className="text-brand-gold">Firm Scraper</span></h2>
                                    </div>
                                    <p className="text-sm text-foreground/40">Enter a website URL. Our AI will automatically detect the brand identity, team members, and properties.</p>
                                </div>
                                <button onClick={() => { setIsImporting(false); setScrapedResults(null); }} className="text-foreground/40 hover:text-white p-2">
                                    <X size={28} />
                                </button>
                            </div>

                            {!scrapedResults ? (
                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-4">
                                        <div className="relative flex-1 group">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold/40 group-focus-within:text-brand-gold transition-colors" size={20} />
                                            <input
                                                type="url"
                                                placeholder="https://firmwebsite.com"
                                                className="h-16 w-full rounded-2xl border border-white/5 bg-brand-dark pl-14 pr-4 text-white focus:border-brand-gold/50 focus:outline-none transition-all text-lg font-medium"
                                                value={importUrl}
                                                onChange={(e) => setImportUrl(e.target.value)}
                                            />
                                        </div>
                                        <button
                                            onClick={handleStartScrape}
                                            disabled={!importUrl || isScraping}
                                            className="h-16 px-10 rounded-2xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs flex items-center gap-3 disabled:opacity-50 hover:shadow-2xl transition-all"
                                        >
                                            {isScraping ? <Loader2 className="animate-spin" size={20} /> : <Wand2 size={20} />}
                                            {isScraping ? "Analyzing Firm..." : "Analyze Website"}
                                        </button>
                                    </div>
                                    {isScraping && (
                                        <div className="flex items-center gap-4 p-6 rounded-2xl bg-white/5 border border-white/5 animate-pulse">
                                            <div className="space-y-2 flex-1">
                                                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                                    <div className="h-full bg-brand-gold w-1/3 animate-progress" />
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60">Scraping URL and extracting entities with AI...</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="space-y-10 animate-in zoom-in-95 duration-500">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6 p-8 rounded-3xl bg-brand-dark/50 border border-white/5">
                                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                                <Building2 size={16} />
                                                Firm Identity Detected
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="h-16 w-16 rounded-xl bg-white/5 border border-white/10 p-2 shrink-0">
                                                        <img src={scrapedResults.firm?.logoUrl || "/master-logo.png"} alt="" className="w-full h-full object-contain" />
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl font-bold text-white">{scrapedResults.firm?.name}</h4>
                                                        <div className="flex items-center gap-2 mt-1">
                                                            <div className="h-3 w-3 rounded-full border border-white/10" style={{ backgroundColor: scrapedResults.firm?.primaryColor }} />
                                                            <span className="text-[10px] font-mono opacity-40 uppercase tracking-widest">{scrapedResults.firm?.primaryColor}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3">{scrapedResults.firm?.bio}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-6 rounded-3xl bg-brand-dark/50 border border-white/5 flex flex-col items-center justify-center gap-2">
                                                <UserPlus size={24} className="text-brand-gold" />
                                                <span className="text-2xl font-black text-white">{scrapedResults.team?.length || 0}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center leading-tight">Team Members<br />Detected</span>
                                            </div>
                                            <div className="p-6 rounded-3xl bg-brand-dark/50 border border-white/5 flex flex-col items-center justify-center gap-2">
                                                <Briefcase size={24} className="text-brand-gold" />
                                                <span className="text-2xl font-black text-white">{scrapedResults.deals?.length || 0}</span>
                                                <span className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center leading-tight">Portfolio Assets<br />Detected</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end gap-4 pt-6 border-t border-white/5">
                                        <button
                                            onClick={() => setScrapedResults(null)}
                                            className="px-8 py-4 rounded-xl text-xs font-bold text-white/40 hover:text-white transition-colors"
                                        >
                                            Reset
                                        </button>
                                        <button
                                            onClick={handleApplyImport}
                                            disabled={isApplyingImport}
                                            className="px-12 py-4 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
                                        >
                                            {isApplyingImport ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                                            {isApplyingImport ? "Finalizing Firm Data..." : "Apply & Create Firm"}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

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
                                        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-foreground/40">Firm Narrative</label>
                                        <textarea
                                            placeholder="Enter firm narrative..."
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
                                                <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={newFirm.accentColor} onChange={(e) => setNewFirm({ ...newFirm, accentColor: e.target.value })} />
                                                <span className="text-[10px] font-mono text-white/60">{newFirm.accentColor}</span>
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
                                                placeholder="Enter firm narrative and mission statement..."
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
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.primaryColor || "#ffffff"} onChange={(e) => updateFirm(firm.id, { primaryColor: e.target.value })} />
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
                                                        <input type="color" className="h-7 w-7 rounded border-none bg-transparent cursor-pointer" value={firm.accentColor || "#151515"} onChange={(e) => updateFirm(firm.id, { accentColor: e.target.value })} />
                                                        <span className="text-[10px] font-mono text-white/60">{firm.accentColor}</span>
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
                                        href={`/admin/${firm.slug || firm.id}`}
                                        className="flex items-center justify-center gap-2 rounded-2xl bg-brand-gold/10 px-4 py-4 text-xs font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                                    >
                                        <LayoutDashboard size={16} />
                                        Admin Page
                                    </Link>

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
                                            Delete Account
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
                        <h2 className="text-3xl font-bold text-white mb-3">Confirm Deletion</h2>
                        <p className="text-foreground/50 mb-10 leading-relaxed text-sm">
                            You are about to delete <span className="text-white font-bold">{firms.find(f => f.id === confirmDeleteId)?.name}</span>. All associations, records, and branding data will be removed permanently.
                        </p>
                        <div className="flex gap-4">
                            <button onClick={() => setConfirmDeleteId(null)} className="flex-1 rounded-2xl bg-white/5 py-4 text-sm font-bold text-white hover:bg-white/10 transition-all">Cancel</button>
                            <button
                                onClick={() => { deleteFirm(confirmDeleteId); setConfirmDeleteId(null); }}
                                className="flex-1 rounded-2xl bg-red-500 py-4 text-sm font-bold text-white hover:bg-red-600 transition-all shadow-lg shadow-red-500/20"
                            >
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
