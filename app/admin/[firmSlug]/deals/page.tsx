"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useData, Deal } from "@/context/DataContext";
import {
    Briefcase, Building2, MapPin, Eye, Edit3, Trash2, Plus, X,
    Save, Upload, Search, GripVertical, ListChecks, TrendingUp,
    Video, LayoutGrid, List as ListIcon, Camera, Image as ImageIcon,
    ExternalLink, Check, Mail, Globe, Sparkles, Loader2
} from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, Reorder } from "framer-motion";

export default function TenantDealsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantDealsContent />
        </Suspense>
    );
}

function TenantDealsContent() {
    const { firms, deals, teamMembers, addDeal, updateDeal, deleteDeal, reorderDeals, isInitialized } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [orderedDeals, setOrderedDeals] = useState<Deal[]>([]);
    const [hasOrderChanged, setHasOrderChanged] = useState(false);
    const [saveStatus, setSaveStatus] = useState<Record<string, 'idle' | 'saving' | 'saved'>>({});

    const [editingDeal, setEditingDeal] = useState<any | null>(null);
    const [isAddingDeal, setIsAddingDeal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Bulk Editing State
    const [localDeals, setLocalDeals] = useState<any[]>([]);
    const [changedDealIds, setChangedDealIds] = useState<Set<string>>(new Set());
    const [isSaving, setIsSaving] = useState(false);
    const [activeMediaDealId, setActiveMediaDealId] = useState<string | null>(null);
    const [aiProcessingIds, setAiProcessingIds] = useState<Set<string>>(new Set());
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    // Asset Scraper State
    const [isScraping, setIsScraping] = useState(false);
    const [scrapeUrl, setScrapeUrl] = useState("");
    const [scrapedDeals, setScrapedDeals] = useState<any[]>([]);
    const [showScrapeModal, setShowScrapeModal] = useState(false);
    const [scrapeError, setScrapeError] = useState<string | null>(null);
    const [importProgress, setImportProgress] = useState({ current: 0, total: 0 });

    // --- Persist AI Drone Engine Tasks ---
    const saveProcessingTask = (taskId: string, dealId: string, imageUrl: string) => {
        try {
            const saved = localStorage.getItem('kling_active_tasks');
            const tasks = saved ? JSON.parse(saved) : {};
            tasks[taskId] = { dealId, imageUrl, timestamp: Date.now() };
            localStorage.setItem('kling_active_tasks', JSON.stringify(tasks));
        } catch (e) { console.error("Failed to save AI task:", e); }
    };

    const removeProcessingTask = (taskId: string) => {
        try {
            const saved = localStorage.getItem('kling_active_tasks');
            if (saved) {
                const tasks = JSON.parse(saved);
                delete tasks[taskId];
                localStorage.setItem('kling_active_tasks', JSON.stringify(tasks));
            }
        } catch (e) { console.error("Failed to remove AI task:", e); }
    };

    const pollTaskStatus = async (taskId: string, dealId: string, imageUrl: string, retryCount = 0) => {
        try {
            const pollRes = await fetch(`/api/kling?taskId=${taskId}`);
            const pollData = await pollRes.json();

            if (pollData.error) throw new Error(pollData.error);

            // Kling spec uses 'succeed' (without -ed) or 'succeeded'
            const rawStatus = (pollData.data?.task_status || pollData.task_status);
            const status = rawStatus?.toLowerCase();
            console.log(`[Kling AI] Polling Task ${taskId}: ${status}`);

            if (status === "succeed" || status === "succeeded") {
                // Official path: data.task_result.videos[0].url
                const finalVideoUrl = pollData.data?.task_result?.videos?.[0]?.url ||
                    pollData.data?.video_url ||
                    pollData.video_url ||
                    pollData.data?.video_info?.videos?.[0]?.url;

                if (!finalVideoUrl) throw new Error("Generation succeeded but no video URL found in task_result.");

                console.log(`[Kling AI] Success! Downloading video from: ${finalVideoUrl}`);

                // 1. First, check if the webhook already updated the local state/DB
                const deal = localDeals.find((d: any) => d.id === dealId);

                if (deal?.generatedVideoURL && deal.generatedVideoURL.includes('supabase')) {
                    console.log("[Kling AI] Webhook beat the poller! Cleaning up.");
                    setAiProcessingIds(prev => {
                        const next = new Set(prev);
                        next.delete(imageUrl);
                        return next;
                    });
                    removeProcessingTask(taskId);
                    return;
                }

                // 2. Otherwise, trigger manual persistence via our unified route
                const persistRes = await fetch("/api/kling/webhook", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ videoUrl: finalVideoUrl, dealId })
                });
                const persistData = await persistRes.json();

                if (persistData.url) {
                    handleLocalUpdate(dealId, { generatedVideoURL: persistData.url }, true);
                    setAiProcessingIds(prev => {
                        const next = new Set(prev);
                        next.delete(imageUrl);
                        return next;
                    });
                    removeProcessingTask(taskId);
                    console.log("[Kling AI] Persistence Success via Polling:", persistData.url);
                }
            } else if (status === "failed") {
                const errorMsg = pollData.data?.task_status_msg || "Kling AI generation failed";
                removeProcessingTask(taskId);
                setAiProcessingIds(prev => {
                    const next = new Set(prev);
                    next.delete(imageUrl);
                    return next;
                });
                throw new Error(errorMsg);
            } else {
                // Submitted, Processing, or null - keep polling
                setTimeout(() => pollTaskStatus(taskId, dealId, imageUrl, 0), 6000);
            }
        } catch (e: any) {
            console.error(`[Kling AI] Polling Error (Attempt ${retryCount}):`, e);

            // If it's a 404/NotFound or permanent failure, stop.
            if (e.message.includes("Not Found") || e.message.includes("failed")) {
                setAiProcessingIds(prev => {
                    const next = new Set(prev);
                    next.delete(imageUrl);
                    return next;
                });
                removeProcessingTask(taskId);
                setUploadError(`AI Engine: ${e.message}`);
                return;
            }

            // Otherwise (network error, 500), retry up to 10 times with backoff
            if (retryCount < 10) {
                setTimeout(() => pollTaskStatus(taskId, dealId, imageUrl, retryCount + 1), 10000);
            } else {
                setAiProcessingIds(prev => {
                    const next = new Set(prev);
                    next.delete(imageUrl);
                    return next;
                });
                setUploadError("AI Engine: Polling timed out (Network Issue)");
            }
        }
    };

    const handleGenerateAIVideo = async (dealId: string, imageUrl: string) => {
        try {
            setAiProcessingIds(prev => new Set(prev).add(imageUrl));
            const startRes = await fetch("/api/kling", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl, dealId })
            });
            const startData = await startRes.json();
            if (!startRes.ok || startData.error) throw new Error(startData.error || "Handshake Rejected");

            const taskId = startData.data?.task_id || startData.task_id;
            saveProcessingTask(taskId, dealId, imageUrl);
            pollTaskStatus(taskId, dealId, imageUrl);
            return true;
        } catch (error: any) {
            setAiProcessingIds(prev => {
                const next = new Set(prev);
                next.delete(imageUrl);
                return next;
            });
            setUploadError(`AI Engine: ${error.message}`);
            return false;
        }
    };

    useEffect(() => {
        if (isInitialized && firm) {
            const filtered = deals.filter(d => d.firmId === firm.id);
            const sorted = [...filtered].sort((a, b) => (a.order || 0) - (b.order || 0));
            setOrderedDeals(sorted);
            setLocalDeals(sorted);
            setHasOrderChanged(false);

            // Resume AI Tasks
            try {
                const saved = localStorage.getItem('kling_active_tasks');
                if (saved) {
                    const tasks = JSON.parse(saved);
                    Object.keys(tasks).forEach(taskId => {
                        const { dealId, imageUrl, timestamp } = tasks[taskId];
                        if (Date.now() - timestamp > 2 * 60 * 60 * 1000) {
                            removeProcessingTask(taskId);
                            return;
                        }
                        setAiProcessingIds(prev => new Set(prev).add(imageUrl));
                        pollTaskStatus(taskId, dealId, imageUrl);
                    });
                }
            } catch (e) { console.error("Resume Tasks Error:", e); }
        }
    }, [deals, isInitialized, firm?.id]);

    const handleReorderDeals = (newOrder: Deal[]) => {
        setOrderedDeals(newOrder);
        setLocalDeals(newOrder);
        setHasOrderChanged(true);
    };

    const handleSaveOrder = async () => {
        const updatedDeals = orderedDeals.map((d, index) => ({
            ...d,
            order: index
        }));
        const success = await reorderDeals(updatedDeals);
        if (success === true) {
            setHasOrderChanged(false);
        }
    };

    const handleLocalUpdate = (dealId: string, updates: any, persist = false) => {
        const applyUpdates = (deal: any) => {
            const newDeal = { ...deal } as any;
            Object.keys(updates).forEach(key => {
                const val = updates[key];
                if (typeof val === 'function') {
                    newDeal[key] = val(deal[key]);
                } else {
                    newDeal[key] = val;
                }
            });
            return newDeal;
        };

        // 1. Update BOTH UI-local states (for immediate feedback)
        setLocalDeals(prev => prev.map(d => d.id === dealId ? applyUpdates(d) : d));
        setOrderedDeals(prev => prev.map(d => d.id === dealId ? applyUpdates(d) : d));
        setChangedDealIds(prev => new Set(prev).add(dealId));

        // 2. Conditionally PERSIST to DataContext (IndexedDB)
        if (persist) {
            updateDeal(dealId, (prev) => {
                const delta: any = {};
                Object.keys(updates).forEach(key => {
                    const val = updates[key];
                    if (typeof val === 'function') {
                        delta[key] = val((prev as any)[key]);
                    } else {
                        delta[key] = val;
                    }
                });
                return delta;
            });
        }
    };

    const handleSaveAll = async () => {
        setIsSaving(true);
        try {
            const savePromises = Array.from(changedDealIds).map(id => {
                const deal = localDeals.find(d => d.id === id);
                if (deal) {
                    return updateDeal(id, deal);
                }
                return Promise.resolve(true);
            });

            const results = await Promise.all(savePromises);
            if (results.every(r => r)) {
                setChangedDealIds(new Set());
            } else {
                console.error("Some deals failed to save.");
            }
        } catch (error) {
            console.error("Error saving all deals:", error);
        } finally {
            setIsSaving(false);
        }
    };

    interface DealForm {
        address: string;
        firmId: string;
        assetType: string;
        strategy: string;
        purchaseAmount: number | null;
        rehabAmount: number | null;
        arv: number | null;
        financingType: string;
        isPublic: boolean;
        teamMemberIds: string[];
        stillImageURL: string;
        context: string;
        images: string[];
    }

    const DEFAULT_TOMBSTONE: DealForm = {
        address: "",
        firmId: firm?.id || "",
        assetType: "MULTIFAMILY",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: null,
        rehabAmount: null,
        arv: null,
        financingType: "Debt Financing",
        isPublic: true,
        teamMemberIds: [],
        stillImageURL: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
        context: "",
        images: []
    };

    const [newDeal, setNewDeal] = useState<DealForm>(DEFAULT_TOMBSTONE);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("add") === "true") {
            setIsAddingDeal(true);
        }
    }, [searchParams]);

    if (!firm) return null;

    const firmDeals = deals.filter(d => d.firmId === firm.id);
    const firmTeam = teamMembers.filter(m => m.firmId === firm.id || (m.firmIds || []).includes(firm.id));

    const handleAddDeal = (e: React.FormEvent) => {
        e.preventDefault();
        const dealToAdd = {
            ...newDeal,
            id: `d-${Date.now()}`,
            firmId: firm.id,
            purchaseAmount: newDeal.purchaseAmount || null,
            financedAmount: newDeal.purchaseAmount ? newDeal.purchaseAmount * 0.7 : null,
            stillImageURL: newDeal.images && newDeal.images.length > 0 ? newDeal.images[0] : newDeal.stillImageURL,
            capRate: 5.0,
            sqFt: 20000,
        };
        // @ts-ignore
        addDeal(dealToAdd as any);
        setIsAddingDeal(false);
        setNewDeal(DEFAULT_TOMBSTONE);
    };

    const handleUpdateDeal = (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingDeal) return;
        const updatedDeal = {
            ...editingDeal,
            stillImageURL: editingDeal.images && editingDeal.images.length > 0 ? editingDeal.images[0] : editingDeal.stillImageURL,
        };
        updateDeal(editingDeal.id, updatedDeal);
        setEditingDeal(null);
    };

    const activeMediaDeal = orderedDeals.find(d => d.id === activeMediaDealId);

    const handleReorder = (dealId: string, index: number, direction: 'up' | 'down') => {
        const deal = localDeals.find(d => d.id === dealId);
        if (!deal || !deal.images) return;
        const newImages = [...deal.images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newImages.length) return;

        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        handleLocalUpdate(dealId, {
            images: newImages,
            stillImageURL: newImages[0] || deal.stillImageURL
        });
    };

    const handleScrapeAssets = async () => {
        if (!scrapeUrl) return;
        setIsScraping(true);
        setScrapedDeals([]);
        setScrapeError(null);
        try {
            const response = await fetch('/api/scrape/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: scrapeUrl })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                setScrapeError(errorData.error || errorData.detail || `Server error (${response.status})`);
                return;
            }

            const result = await response.json();
            if (result.success) {
                setScrapedDeals(result.deals || []);
                if (result.deals?.length === 0) {
                    setScrapeError("No assets were found on the provided page. Try the main portfolio URL.");
                }
            } else {
                setScrapeError(result.error || result.detail || 'Unknown scraper error');
            }
        } catch (error: any) {
            console.error("Scrape Error:", error);
            setScrapeError(error.message || "Connection failed while scraping.");
        } finally {
            setIsScraping(false);
        }
    };

    const handleApplyScrapeImport = async () => {
        if (!scrapedDeals.length) return;
        setIsSaving(true);
        setScrapeError(null);
        setImportProgress({ current: 0, total: scrapedDeals.length });

        let successCount = 0;
        let failedCount = 0;
        let lastError = "";

        const normalizeEnum = (val: string, type: 'asset' | 'strategy') => {
            const clean = (val || "").toUpperCase().trim().replace(/ /g, '_').replace(/-/g, '_');
            if (type === 'asset') {
                const allowed = ['INDUSTRIAL', 'RETAIL', 'MULTIFAMILY', 'SF', 'OFFICE', 'HOTEL', 'HOSPITALITY', 'MIXED_USE', 'LAND'];
                if (allowed.includes(clean)) return clean;
                if (clean.includes('HOTEL')) return 'HOTEL';
                if (clean.includes('RESORT') || clean.includes('HOSPITAL') || clean.includes('VACATION') || clean.includes('LODGING')) return 'HOSPITALITY';
                if (clean.includes('MIXED')) return 'MIXED_USE';
                if (clean.includes('MULTI')) return 'MULTIFAMILY';
                if (clean.includes('OFFICE')) return 'OFFICE';
                if (clean.includes('RETAIL')) return 'RETAIL';
                if (clean.includes('LAND')) return 'LAND';
                return 'INDUSTRIAL'; // Safety fallback
            } else {
                const allowed = ['BUY_AND_HOLD', 'FIX_FLIP', 'VALUE_ADD', 'CORE', 'STABILIZED', 'OPPORTUNISTIC'];
                if (allowed.includes(clean)) return clean;
                if (clean.includes('HOLD')) return 'BUY_AND_HOLD';
                if (clean.includes('FIX')) return 'FIX_FLIP';
                if (clean.includes('VALUE')) return 'VALUE_ADD';
                if (clean.includes('CORE')) return 'CORE';
                if (clean.includes('OPPORTUNI')) return 'OPPORTUNISTIC';
                return 'CORE'; // Safety fallback
            }
        };

        for (let i = 0; i < scrapedDeals.length; i++) {
            const deal = scrapedDeals[i];
            setImportProgress({ current: i + 1, total: scrapedDeals.length });

            try {
                const added = await addDeal({
                    id: `d-temp-${Date.now()}-${i}`,
                    firmId: firm.id,
                    address: deal.address || "Unknown Property",
                    assetType: normalizeEnum(deal.assetType, 'asset') as any,
                    strategy: normalizeEnum(deal.strategy, 'strategy') as any,
                    context: deal.description || deal.context || "",
                    stillImageURL: deal.imageURL || "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
                    purchaseAmount: deal.purchaseAmount ? (typeof deal.purchaseAmount === 'string' ? parseFloat(deal.purchaseAmount.replace(/[^0-9.]/g, '')) : deal.purchaseAmount) : null,
                    isPublic: true,
                    images: (deal.images && deal.images.length > 0 ? deal.images : [deal.imageURL]).filter(Boolean) as string[],
                    teamMemberIds: [],
                    sqFt: deal.sqFt || 20000,
                    capRate: 5.0
                });

                if (added) {
                    successCount++;
                } else {
                    failedCount++;
                    lastError = localStorage.getItem('last_add_deal_error') || 'Unknown Save Error';
                }
            } catch (err: any) {
                failedCount++;
                lastError = err.message || "Unknown Exception";
            }
        }

        setIsSaving(false);
        if (successCount > 0) {
            setScrapedDeals([]);
            setScrapeUrl("");
            setShowScrapeModal(false);
            // Show summary message
            if (failedCount > 0) {
                alert(`Import Complete: ${successCount} assets saved, ${failedCount} failed.\nLatest Error: ${lastError}`);
            }
        } else {
            setScrapeError(`Failed to save any assets. Latest error: ${lastError}`);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tight">Firm <span className="text-brand-gold">Deals</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">Manage and curate your digital tombstone portfolio.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 rounded-2xl bg-brand-gray-900 border border-white/5 p-1.5 shadow-xl">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${viewMode === 'grid' ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-foreground/30 hover:text-white'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`flex h-10 w-12 items-center justify-center rounded-xl transition-all ${viewMode === 'list' ? 'bg-brand-gold text-brand-dark shadow-lg' : 'text-foreground/30 hover:text-white'}`}
                        >
                            <ListIcon size={18} />
                        </button>
                    </div>

                    {changedDealIds.size > 0 && (
                        <button
                            onClick={handleSaveAll}
                            className="flex items-center gap-2 rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-white transition-all hover:shadow-lg hover:shadow-green-500/20 animate-in fade-in slide-in-from-right-4"
                        >
                            <Save size={18} />
                            Save All ({changedDealIds.size})
                        </button>
                    )}
                    <button
                        onClick={() => setShowScrapeModal(true)}
                        className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10 hover:border-brand-gold/50"
                    >
                        <Sparkles size={18} className="text-brand-gold" />
                        AI Scrape Assets
                    </button>
                    <button
                        onClick={() => setIsAddingDeal(true)}
                        className="flex items-center gap-3 rounded-2xl bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-dark transition-all hover:shadow-xl hover:shadow-brand-gold/20 hover:scale-[1.02] active:scale-[0.98]"
                    >
                        <Plus size={18} />
                        New Deal Tombstone
                    </button>
                </div>
            </div>

            {hasOrderChanged && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-6 rounded-[2rem] bg-brand-gold/10 border border-brand-gold/20"
                >
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-brand-gold text-brand-dark">
                            <GripVertical size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black text-white uppercase tracking-tight">Custom Order Detected</h3>
                            <p className="text-[10px] text-brand-gold font-bold uppercase tracking-widest">Apply recent drag-and-drop rearrangements to the live site</p>
                        </div>
                    </div>
                    <button
                        onClick={handleSaveOrder}
                        className="flex items-center gap-3 rounded-xl bg-brand-gold px-8 py-3 text-[10px] font-black uppercase tracking-widest text-brand-dark transition-all hover:scale-[1.05]"
                    >
                        <Save size={14} />
                        Save New Order
                    </button>
                </motion.div>
            )}

            {/* Filter */}
            <div className="relative group max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-brand-gold transition-colors" size={18} />
                <input
                    type="text"
                    placeholder="Search deals by address or asset type..."
                    className="w-full rounded-xl border border-white/5 bg-brand-gray-900/50 pl-12 pr-4 py-3 text-white outline-none focus:border-brand-gold/50 transition-all font-medium placeholder:text-white/20"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            {/* Add Deal Form */}
            {isAddingDeal && (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <div className="glass overflow-hidden rounded-[2rem] border border-white/10 bg-brand-gray-900/50 p-10">
                        <div className="flex items-center justify-between mb-10">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Digital <span className="text-brand-gold">Tombstone Editor</span></h2>
                                <p className="text-[10px] text-foreground/40 mt-1 uppercase tracking-widest font-black">Registry Template Active</p>
                            </div>
                            <button onClick={() => setIsAddingDeal(false)} className="text-foreground/40 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleAddDeal} className="grid gap-6 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Property Address</label>
                                <input
                                    required
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none font-bold"
                                    value={newDeal.address}
                                    onChange={(e) => setNewDeal({ ...newDeal, address: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Asset Category</label>
                                <select
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white focus:border-brand-gold/50 focus:outline-none appearance-none font-bold"
                                    value={newDeal.assetType}
                                    onChange={(e) => setNewDeal({ ...newDeal, assetType: e.target.value })}
                                >
                                    <option value="MULTIFAMILY">Multifamily</option>
                                    <option value="INDUSTRIAL">Industrial</option>
                                    <option value="RETAIL">Retail</option>
                                    <option value="SF">Single Family</option>
                                </select>
                            </div>

                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Investment Narrative</label>
                                <textarea
                                    className="w-full h-32 rounded-xl border border-white/5 bg-brand-dark p-4 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none resize-none font-medium"
                                    value={newDeal.context || ""}
                                    onChange={(e) => setNewDeal({ ...newDeal, context: e.target.value })}
                                />
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Portfolio Media</label>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                            onChange={async (e) => {
                                                const files = Array.from(e.target.files || []);
                                                for (const file of files) {
                                                    const formData = new FormData();
                                                    formData.append("file", file);
                                                    formData.append("id", "new-deal");
                                                    formData.append("type", "deals");

                                                    const res = await fetch("/api/upload", {
                                                        method: "POST",
                                                        body: formData
                                                    });
                                                    const { url } = await res.json();

                                                    setNewDeal(prev => ({
                                                        ...prev,
                                                        images: [...(prev.images || []), url]
                                                    }));

                                                    // Auto-trigger Kling for the first image
                                                    if (newDeal.images.length === 0) {
                                                        // Note: We'll trigger after the deal is created or if it's an existing deal
                                                    }
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-white/10 bg-white/5 py-12 transition-all hover:border-brand-gold/50 hover:bg-white/10">
                                            <Upload size={32} className="mb-2 text-brand-gold" />
                                            <p className="text-sm font-bold text-white">Upload Assets</p>
                                        </div>
                                    </div>
                                    {newDeal.images && newDeal.images.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {newDeal.images.map((img, idx) => (
                                                <div key={idx} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
                                                    <img src={img} className="h-full w-full object-cover" />
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            const newImages = (newDeal.images || []).filter((_, i) => i !== idx);
                                                            setNewDeal({ ...newDeal, images: newImages });
                                                        }}
                                                        className="absolute top-2 right-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Responsible Parties</label>
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {(newDeal.teamMemberIds || []).map(mId => {
                                        const member = firmTeam.find(m => m.id === mId);
                                        return (
                                            <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[10px] font-bold text-brand-gold">
                                                {member?.name}
                                                <button
                                                    type="button"
                                                    onClick={() => setNewDeal({ ...newDeal, teamMemberIds: (newDeal.teamMemberIds || []).filter(id => id !== mId) })}
                                                    className="hover:text-white"
                                                >
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                                <select
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 text-white focus:border-brand-gold/50 focus:outline-none appearance-none font-bold"
                                    value=""
                                    onChange={(e) => {
                                        if (e.target.value && !(newDeal.teamMemberIds || []).includes(e.target.value)) {
                                            setNewDeal({ ...newDeal, teamMemberIds: [...(newDeal.teamMemberIds || []), e.target.value] });
                                        }
                                    }}
                                >
                                    <option value="">+ Add Team Member...</option>
                                    {firmTeam
                                        .filter(m => !(newDeal.teamMemberIds || []).includes(m.id))
                                        .map(member => (
                                            <option key={member.id} value={member.id}>{member.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Visibility</label>
                                <div className="flex h-14 gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setNewDeal({ ...newDeal, isPublic: true })}
                                        className={`flex-1 rounded-xl border font-black uppercase tracking-widest text-[10px] transition-all ${newDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                    >
                                        Public
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setNewDeal({ ...newDeal, isPublic: false })}
                                        className={`flex-1 rounded-xl border font-black uppercase tracking-widest text-[10px] transition-all ${!newDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                    >
                                        Private
                                    </button>
                                </div>
                            </div>

                            <div className="md:col-span-2 pt-6">
                                <button
                                    type="submit"
                                    className="flex w-full h-16 items-center justify-center gap-3 rounded-2xl bg-brand-gold font-black uppercase tracking-widest text-xs text-brand-dark transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:scale-[1.02]"
                                >
                                    <Save size={18} />
                                    Publish Digital Tombstone
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <AnimatePresence mode="wait">
                {viewMode === 'grid' ? (
                    <Reorder.Group
                        axis="y"
                        values={orderedDeals}
                        onReorder={handleReorderDeals}
                        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                    >
                        {orderedDeals
                            .filter(deal => {
                                const q = searchQuery.toLowerCase();
                                return deal.address.toLowerCase().includes(q) || deal.assetType.toLowerCase().includes(q);
                            })
                            .map((deal) => (
                                <Reorder.Item
                                    key={deal.id}
                                    value={deal}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    className="h-full"
                                >
                                    <GridDealCard
                                        deal={deal}
                                        firmTeam={firmTeam}
                                        onUpdate={(updates: any) => handleLocalUpdate(deal.id, updates)}
                                        onDelete={() => deleteDeal(deal.id)}
                                        saveStatus={changedDealIds.has(deal.id) ? 'saving' : 'idle'}
                                        onMediaOpen={() => setActiveMediaDealId(deal.id)}
                                        aiProcessingIds={aiProcessingIds}
                                    />
                                </Reorder.Item>
                            ))}
                    </Reorder.Group>
                ) : (
                    <div className="glass overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/10">
                        <table className="w-full text-left">
                            <thead className="bg-brand-gray-900/50">
                                <tr className="border-b border-white/5">
                                    <th className="w-12 pl-6 py-4"></th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Media / File Upload</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Financial Metrics</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Investment Narrative</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Strategy & Structure</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Date Added</th>
                                    <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 whitespace-nowrap">Responsible Parties</th>
                                </tr>
                            </thead>
                            <Reorder.Group
                                axis="y"
                                values={orderedDeals}
                                onReorder={handleReorderDeals}
                                as="tbody"
                                className="divide-y divide-white/5"
                            >
                                {orderedDeals
                                    .filter(deal => {
                                        const q = searchQuery.toLowerCase();
                                        return deal.address.toLowerCase().includes(q) || deal.assetType.toLowerCase().includes(q);
                                    })
                                    .map((deal) => (
                                        <Reorder.Item
                                            key={deal.id}
                                            value={deal}
                                            as="tr"
                                            className={`group/row transition-colors hover:bg-white/[0.02] ${changedDealIds.has(deal.id) ? 'bg-brand-gold/[0.02]' : ''}`}
                                        >
                                            <td className="pl-6 cursor-grab active:cursor-grabbing text-white/10 hover:text-brand-gold transition-colors">
                                                <GripVertical size={16} />
                                            </td>
                                            <td className="px-10 py-8 min-w-[300px]">
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => setActiveMediaDealId(deal.id)}
                                                        className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-gray-900 border border-white/10 group/media"
                                                    >
                                                        {deal.generatedVideoURL ? (
                                                            <video
                                                                src={deal.generatedVideoURL}
                                                                autoPlay
                                                                muted
                                                                loop
                                                                playsInline
                                                                className="h-full w-full object-cover group-hover/media:scale-110 transition-transform"
                                                            />
                                                        ) : deal.stillImageURL ? (
                                                            <img src={deal.stillImageURL} className="h-full w-full object-cover group-hover/media:scale-110 transition-transform" />
                                                        ) : (
                                                            <div className="h-full w-full bg-white/5 flex items-center justify-center">
                                                                <Upload size={16} className="text-white/20" />
                                                            </div>
                                                        )}
                                                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 flex items-center justify-center transition-opacity">
                                                            <Upload size={16} className="text-white" />
                                                        </div>

                                                        {/* List View AI Indicator */}
                                                        {Array.from(aiProcessingIds).some((id: any) => id === deal.stillImageURL || (deal.images || []).includes(id)) && (
                                                            <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm flex items-center justify-center">
                                                                <div className="h-4 w-4 border-2 border-brand-gold/30 border-t-brand-gold rounded-full animate-spin" />
                                                            </div>
                                                        )}
                                                    </button>
                                                    <div className="flex-1 space-y-1">
                                                        <input
                                                            className="w-full bg-transparent border-none p-0 text-white font-bold placeholder:text-white/10 focus:ring-0 focus:outline-none"
                                                            value={deal.address.split(',')[0]}
                                                            onPointerDown={(e) => e.stopPropagation()}
                                                            onChange={(e) => {
                                                                const suffix = deal.address.split(',').slice(1).join(',');
                                                                handleLocalUpdate(deal.id, { address: `${e.target.value}${suffix ? ',' + suffix : ''}` });
                                                            }}
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <MapPin size={12} className="text-brand-gold/40" />
                                                            <input
                                                                className="w-full bg-transparent border-none p-0 text-[10px] font-bold uppercase tracking-widest text-foreground/30 focus:ring-0 focus:outline-none"
                                                                value={deal.address.split(',').slice(1).join(',')}
                                                                onPointerDown={(e) => e.stopPropagation()}
                                                                onChange={(e) => {
                                                                    const prefix = deal.address.split(',')[0];
                                                                    handleLocalUpdate(deal.id, { address: `${prefix}, ${e.target.value}` });
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 min-w-[250px]">
                                                <div className="space-y-3">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Purchase</span>
                                                        <div className="relative">
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold/40 text-[10px]">$</span>
                                                            <input
                                                                type="number"
                                                                className="w-32 bg-transparent border-b border-white/5 py-1 pl-3 text-sm font-bold text-white focus:border-brand-gold/50 focus:outline-none transition-all"
                                                                value={deal.purchaseAmount || ""}
                                                                onPointerDown={(e) => e.stopPropagation()}
                                                                onChange={(e) => handleLocalUpdate(deal.id, { purchaseAmount: Number(e.target.value) })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">Rehab</span>
                                                        <div className="relative">
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold/40 text-[10px]">$</span>
                                                            <input
                                                                type="number"
                                                                className="w-32 bg-transparent border-b border-white/5 py-1 pl-3 text-sm font-bold text-white focus:border-brand-gold/50 focus:outline-none transition-all"
                                                                value={deal.rehabAmount || ""}
                                                                onPointerDown={(e) => e.stopPropagation()}
                                                                onChange={(e) => handleLocalUpdate(deal.id, { rehabAmount: Number(e.target.value) })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20">ARV</span>
                                                        <div className="relative">
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-brand-gold/40 text-[10px]">$</span>
                                                            <input
                                                                type="number"
                                                                className="w-32 bg-transparent border-b border-white/5 py-1 pl-3 text-sm font-bold text-white focus:border-brand-gold/50 focus:outline-none transition-all"
                                                                value={deal.arv || ""}
                                                                onPointerDown={(e) => e.stopPropagation()}
                                                                onChange={(e) => handleLocalUpdate(deal.id, { arv: Number(e.target.value) })}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 min-w-[350px]">
                                                <div className="space-y-4">
                                                    <textarea
                                                        className="w-full bg-brand-dark/30 border border-white/5 rounded-xl p-4 text-sm text-foreground/70 placeholder:text-white/5 focus:border-brand-gold/30 focus:outline-none transition-all resize-none h-32 leading-relaxed"
                                                        placeholder="Enter investment narrative..."
                                                        value={deal.investmentOverview || ""}
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                        onChange={(e) => handleLocalUpdate(deal.id, { investmentOverview: e.target.value })}
                                                    />
                                                    <div className="flex items-center justify-between">
                                                        <div className={`flex items-center gap-2 rounded-lg px-3 py-1.5 border transition-all ${deal.isPublic ? 'bg-green-500/5 border-green-500/10 text-green-500' : 'bg-brand-gold/5 border-brand-gold/10 text-brand-gold'}`}>
                                                            <div className={`h-1.5 w-1.5 rounded-full ${deal.isPublic ? 'bg-green-500' : 'bg-brand-gold'}`} />
                                                            <span className="text-[10px] font-black uppercase tracking-widest">{deal.isPublic ? 'Public' : 'Private'}</span>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleLocalUpdate(deal.id, { isPublic: !deal.isPublic })}
                                                                className="text-[10px] font-bold text-foreground/30 hover:text-white uppercase tracking-widest underline underline-offset-4"
                                                            >
                                                                Toggle
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 min-w-[200px]">
                                                <div className="space-y-3">
                                                    <select
                                                        className="w-full bg-brand-dark/50 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white focus:border-brand-gold/50 focus:outline-none appearance-none cursor-pointer"
                                                        value={deal.assetType}
                                                        onChange={(e) => handleLocalUpdate(deal.id, { assetType: e.target.value })}
                                                    >
                                                        <option value="MULTIFAMILY">Multifamily</option>
                                                        <option value="INDUSTRIAL">Industrial</option>
                                                        <option value="RETAIL">Retail</option>
                                                        <option value="SF">Single Family</option>
                                                    </select>
                                                    <select
                                                        className="w-full bg-brand-dark/50 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white focus:border-brand-gold/50 focus:outline-none appearance-none cursor-pointer"
                                                        value={deal.strategy}
                                                        onChange={(e) => handleLocalUpdate(deal.id, { strategy: e.target.value })}
                                                    >
                                                        <option value="BUY_AND_HOLD">Buy & Hold</option>
                                                        <option value="FIX_FLIP">Fix & Flip</option>
                                                    </select>
                                                    <select
                                                        className="w-full bg-brand-dark/50 border border-white/5 rounded-lg px-3 py-2 text-[10px] font-bold text-white focus:border-brand-gold/50 focus:outline-none appearance-none cursor-pointer"
                                                        value={deal.financingType}
                                                        onChange={(e) => handleLocalUpdate(deal.id, { financingType: e.target.value })}
                                                    >
                                                        <option value="Debt Financing">Debt Financing</option>
                                                        <option value="Equity Ownership">Equity Ownership</option>
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 min-w-[150px]">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold text-white">
                                                        {new Date(deal.createdAt || Date.now()).toLocaleDateString()}
                                                    </p>
                                                    <p className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest">
                                                        {new Date(deal.createdAt || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 min-w-[250px]">
                                                <div className="flex flex-wrap gap-2">
                                                    {(deal.teamMemberIds || []).map((mId: string) => {
                                                        const member = firmTeam.find(m => m.id === mId);
                                                        return (
                                                            <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[10px] font-bold text-brand-gold">
                                                                {member?.name}
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleLocalUpdate(deal.id, { teamMemberIds: (deal.teamMemberIds || []).filter((id: string) => id !== mId) })}
                                                                    className="hover:text-white"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            </div>
                                                        );
                                                    })}
                                                    <select
                                                        className="w-full bg-transparent border-b border-white/5 py-1 text-[10px] font-bold text-brand-gold/60 focus:outline-none cursor-pointer"
                                                        value=""
                                                        onPointerDown={(e) => e.stopPropagation()}
                                                        onChange={(e) => {
                                                            if (e.target.value && !(deal.teamMemberIds || []).includes(e.target.value)) {
                                                                handleLocalUpdate(deal.id, { teamMemberIds: [...(deal.teamMemberIds || []), e.target.value] });
                                                            }
                                                        }}
                                                    >
                                                        <option value="">+ Assign Team...</option>
                                                        {firmTeam
                                                            .filter(m => !(deal.teamMemberIds || []).includes(m.id))
                                                            .map(member => (
                                                                <option key={member.id} value={member.id}>{member.name}</option>
                                                            ))
                                                        }
                                                        {firmTeam.length === 0 && (
                                                            <option disabled>No firm members found...</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 text-right min-w-[150px]">
                                                <div className="flex flex-col items-end gap-3 pr-10">
                                                    <div className="flex gap-2">
                                                        <Link href={`/deals/${deal.id}`} className="p-3 rounded-xl bg-white/5 text-foreground/30 hover:text-brand-gold transition-all border border-transparent hover:border-brand-gold/20">
                                                            <Eye size={16} />
                                                        </Link>
                                                        <button onClick={() => deleteDeal(deal.id)} className="p-3 rounded-xl bg-white/5 text-foreground/30 hover:text-red-500 transition-all border border-transparent hover:border-red-500/20">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </Reorder.Item>
                                    ))
                                }
                            </Reorder.Group>
                        </table>
                    </div>
                )}
            </AnimatePresence>
            {/* Media Gallery Modal */}
            {activeMediaDealId && activeMediaDeal && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/95 backdrop-blur-xl animate-in fade-in duration-300">
                    <div className="glass w-full max-w-4xl max-h-[85vh] overflow-hidden rounded-[3rem] border border-white/10 shadow-3xl bg-brand-gray-900/90">
                        <div className="flex items-center justify-between p-10 border-b border-white/5">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Media <span className="text-brand-gold">Gallery Manager</span></h2>
                                <p className="text-[10px] text-foreground/40 mt-1 uppercase tracking-widest font-black">{activeMediaDeal.address}</p>
                            </div>
                            <button onClick={() => setActiveMediaDealId(null)} className="h-12 w-12 rounded-full bg-white/5 flex items-center justify-center text-foreground/40 hover:text-white transition-all">
                                <X size={24} />
                            </button>
                        </div>

                        {uploadError && (
                            <div className="mx-10 mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-500 animate-in slide-in-from-top-2">
                                <Trash2 size={18} />
                                <div className="flex-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest">Upload Failed</p>
                                    <p className="text-xs font-bold">{uploadError}</p>
                                </div>
                                <button onClick={() => setUploadError(null)} className="hover:text-white">
                                    <X size={16} />
                                </button>
                            </div>
                        )}

                        <div className="p-10 overflow-y-auto max-h-[calc(85vh-180px)] custom-scrollbar">
                            <div className="grid gap-10">
                                <div className="grid md:grid-cols-2 gap-10">
                                    {/* Standard Portfolio Media */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Manual Portfolio Media</label>
                                            <span className="text-[8px] font-bold text-foreground/20 uppercase tracking-widest">Photos & Videos</span>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*,video/*"
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                onChange={async (e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    if (files.length === 0) return;

                                                    setIsUploading(true);
                                                    setUploadError(null);
                                                    try {
                                                        for (const file of files) {
                                                            const formData = new FormData();
                                                            formData.append("file", file);
                                                            formData.append("id", activeMediaDeal.id);
                                                            formData.append("type", "deals");

                                                            const res = await fetch("/api/upload", {
                                                                method: "POST",
                                                                body: formData
                                                            });

                                                            if (!res.ok) {
                                                                const errData = await res.json();
                                                                throw new Error(errData.error || "Upload failed");
                                                            }
                                                            const { url } = await res.json();

                                                            if (!url) throw new Error("No URL returned from server.");

                                                            handleLocalUpdate(activeMediaDeal.id, {
                                                                images: (prev: string[]) => [...(prev || []), url],
                                                                stillImageURL: (prev: string) => !prev ? url : prev
                                                            }, true); // Persist immediately for media
                                                            console.log("Portfolio Upload Success:", url);
                                                        }
                                                    } catch (err: any) {
                                                        console.error("Upload Error:", err);
                                                        setUploadError(err.message || "Failed to upload some assets.");
                                                    } finally {
                                                        setIsUploading(false);
                                                    }
                                                }}
                                            />
                                            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-white/10 bg-white/2 py-16 transition-all group-hover:border-white/20 group-hover:bg-white/5">
                                                <Upload size={32} className="mb-3 text-foreground/20 group-hover:text-white transition-colors" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Standard Upload</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* AI Drone Cinematic Engine */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between ml-1">
                                            <label className="text-[10px] font-black uppercase tracking-widest text-brand-gold">AI Drone Cinematic Engine</label>
                                            <div className="flex items-center gap-1.5">
                                                <div className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
                                                <span className="text-[8px] font-black text-brand-gold uppercase tracking-widest">Kling v1 High-Fi</span>
                                            </div>
                                        </div>
                                        <div className="relative group">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                onChange={async (e) => {
                                                    const file = e.target.files?.[0];
                                                    if (!file) return;

                                                    setIsUploading(true);
                                                    setUploadError(null);
                                                    try {
                                                        const formData = new FormData();
                                                        formData.append("file", file);
                                                        formData.append("id", activeMediaDeal.id);
                                                        formData.append("type", "deals");

                                                        const res = await fetch("/api/upload", {
                                                            method: "POST",
                                                            body: formData
                                                        });

                                                        if (!res.ok) {
                                                            const errData = await res.json();
                                                            throw new Error(errData.error || "Upload failed");
                                                        }
                                                        const { url } = await res.json();

                                                        if (!url) throw new Error("No URL returned from server.");

                                                        handleLocalUpdate(activeMediaDeal.id, {
                                                            images: (prev: string[]) => [...(prev || []), url],
                                                            stillImageURL: url // Force AI upload to becomes the primary cover
                                                        }, true);
                                                        console.log("AI Engine Upload Success:", url);

                                                        // Force Trigger Kling for this specific uploader
                                                        await handleGenerateAIVideo(activeMediaDeal.id, url);
                                                    } catch (err: any) {
                                                        console.error("AI Upload Error:", err);
                                                        setUploadError(err.message || "Failed to initiate AI generation.");
                                                    } finally {
                                                        setIsUploading(false);
                                                    }
                                                }}
                                            />
                                            <div className="flex flex-col items-center justify-center rounded-[2rem] border-2 border-dashed border-brand-gold/20 bg-brand-gold/5 py-16 transition-all group-hover:border-brand-gold/50 group-hover:bg-brand-gold/10">
                                                <TrendingUp size={32} className="mb-3 text-brand-gold group-hover:scale-110 transition-transform" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Generate Living Drone View</p>
                                            </div>
                                        </div>
                                        {uploadError && (
                                            <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 mt-2 animate-in slide-in-from-top-1">
                                                <div className="rounded-full bg-red-500 p-1 flex-shrink-0 mt-0.5">
                                                    <X size={8} className="text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[9px] font-black text-red-400 uppercase tracking-tighter">System Error</p>
                                                    <p className="text-[8px] font-medium text-red-300 active:select-all">{uploadError}</p>
                                                </div>
                                                <button onClick={() => setUploadError(null)} className="text-red-400/40 hover:text-red-400">
                                                    <X size={12} />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Current Gallery & Order</label>
                                        <span className="text-[10px] font-bold text-brand-gold/60">{(activeMediaDeal.images || []).length} items</span>
                                    </div>
                                    <div className="space-y-3">
                                        {(activeMediaDeal.images || []).map((img: string, idx: number) => (
                                            <div key={idx} className="flex items-center gap-6 p-4 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all">
                                                <div className="flex items-center gap-3 text-foreground/20">
                                                    <GripVertical size={20} />
                                                    <span className="text-xs font-black w-4">{idx + 1}</span>
                                                </div>
                                                <div className="h-20 w-32 overflow-hidden rounded-xl bg-brand-dark border border-white/5 relative group/img">
                                                    {activeMediaDeal.generatedVideoURL && idx === 0 ? (
                                                        <video
                                                            src={activeMediaDeal.generatedVideoURL}
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : (
                                                        img && <img src={img} className="h-full w-full object-cover" />
                                                    )}

                                                    {activeMediaDeal.generatedVideoURL && idx === 0 ? (
                                                        <div className="absolute inset-0 z-10 pointer-events-none">
                                                            <div className="absolute inset-0 bg-brand-gold/10" />
                                                            <div className="absolute bottom-2 right-2 rounded-full bg-brand-gold p-1 shadow-lg ring-2 ring-brand-dark">
                                                                <Video size={10} className="text-brand-dark" />
                                                            </div>
                                                        </div>
                                                    ) : aiProcessingIds.has(img) ? (
                                                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1 z-20">
                                                            <div className="h-4 w-4 border-2 border-brand-gold/30 border-t-brand-gold animate-spin rounded-full" />
                                                            <span className="text-[6px] font-black uppercase text-brand-gold">AI Processing</span>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => img && handleGenerateAIVideo(activeMediaDeal.id, img)}
                                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all z-20"
                                                        >
                                                            <div className="flex flex-col items-center gap-1">
                                                                <Upload size={14} className="text-brand-gold" />
                                                                <span className="text-[6px] font-black uppercase text-white">Gen Drone AI</span>
                                                            </div>
                                                        </button>
                                                    )}
                                                    {activeMediaDeal.generatedVideoURL && idx === 0 ? (
                                                        <video
                                                            src={activeMediaDeal.generatedVideoURL}
                                                            autoPlay
                                                            muted
                                                            loop
                                                            playsInline
                                                            className="h-full w-full object-cover"
                                                        />
                                                    ) : img ? (
                                                        <img src={img} className="h-full w-full object-cover" />
                                                    ) : null}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Asset File</p>
                                                    <p className="text-xs font-bold text-white mt-1 truncate max-w-[200px]">
                                                        {activeMediaDeal.generatedVideoURL && idx === 0 ? (
                                                            <span className="text-brand-gold flex items-center gap-1">
                                                                <Video size={10} />
                                                                Cinematic Video (.mp4)
                                                            </span>
                                                        ) : img ? (
                                                            (() => {
                                                                const parts = img.split('/');
                                                                const filename = parts[parts.length - 1];
                                                                const cleanName = filename.replace(/^\d+-/, '');
                                                                return decodeURIComponent(cleanName || "Unnamed Asset");
                                                            })()
                                                        ) : "Processing..."}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        disabled={idx === 0}
                                                        onClick={() => handleReorder(activeMediaDeal.id, idx, 'up')}
                                                        className="p-2 rounded-lg bg-white/5 text-foreground/40 hover:text-white disabled:opacity-20 transition-all"
                                                    >
                                                        <Plus className="rotate-0" size={16} />
                                                    </button>
                                                    <button
                                                        disabled={idx === (activeMediaDeal.images || []).length - 1}
                                                        onClick={() => handleReorder(activeMediaDeal.id, idx, 'down')}
                                                        className="p-2 rounded-lg bg-white/5 text-foreground/40 hover:text-white disabled:opacity-20 transition-all"
                                                    >
                                                        <Plus className="rotate-180" size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const newImages = (activeMediaDeal.images || []).filter((_: any, i: number) => i !== idx);
                                                            handleLocalUpdate(activeMediaDeal.id, {
                                                                images: newImages,
                                                                stillImageURL: newImages[0] || ""
                                                            });
                                                        }}
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                        {(activeMediaDeal.images || []).length === 0 && !isUploading && (
                                            <div className="flex flex-col items-center justify-center py-20 rounded-[2rem] border border-white/5 bg-white/2">
                                                <p className="text-xs font-bold text-foreground/30 italic">No media assets found for this deal.</p>
                                            </div>
                                        )}
                                        {isUploading && (
                                            <div className="flex flex-col items-center justify-center py-20 rounded-[2rem] border border-dashed border-brand-gold/20 bg-brand-gold/5">
                                                <div className="h-8 w-8 border-2 border-brand-gold/30 border-t-brand-gold animate-spin rounded-full mb-3" />
                                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Transferring to Cloud...</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 border-t border-white/5 bg-brand-dark/30 flex justify-end">
                            <button
                                onClick={() => {
                                    handleSaveAll();
                                    setActiveMediaDealId(null);
                                }}
                                className="flex items-center gap-2 rounded-xl bg-brand-gold px-10 py-4 text-xs font-black uppercase tracking-widest text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                            >
                                <Save size={16} />
                                Done Managing Assets
                            </button>
                        </div>

                    </div>
                </div>
            )}

            {/* Asset Scraper Modal */}
            <AnimatePresence>
                {showScrapeModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isScraping && !isSaving && setShowScrapeModal(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-brand-gray-900 shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between border-b border-white/5 bg-white/[0.02] p-8">
                                <div className="flex items-center gap-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/10 text-brand-gold">
                                        <Sparkles size={24} />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-white uppercase tracking-tight">AI Asset <span className="text-brand-gold">Scraper</span></h2>
                                        <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Isolated Portfolio extraction Engine</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowScrapeModal(false)}
                                    disabled={isScraping || isSaving}
                                    className="rounded-xl p-2 text-white/20 hover:bg-white/5 hover:text-white transition-all disabled:opacity-30"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
                                {/* URL Input */}
                                <div className="space-y-4">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 ml-1">Target Portfolio URL</label>
                                    <div className="flex gap-3">
                                        <div className="relative flex-1">
                                            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                                            <input
                                                type="text"
                                                placeholder="https://firm.com/portfolio-or-projects"
                                                className="w-full h-14 rounded-2xl border border-white/5 bg-black/50 pl-12 pr-4 text-sm font-bold text-white outline-none focus:border-brand-gold/50 transition-all placeholder:text-white/10"
                                                value={scrapeUrl}
                                                onChange={(e) => setScrapeUrl(e.target.value)}
                                                disabled={isScraping || isSaving}
                                            />
                                        </div>
                                        <button
                                            onClick={handleScrapeAssets}
                                            disabled={!scrapeUrl || isScraping || isSaving}
                                            className="h-14 px-8 rounded-2xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-xl hover:shadow-brand-gold/20 disabled:opacity-50 flex items-center gap-3"
                                        >
                                            {isScraping ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
                                            {isScraping ? "Analyzing..." : "Locate Assets"}
                                        </button>
                                    </div>
                                </div>

                                {scrapeError && (
                                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold">
                                        {scrapeError}
                                    </div>
                                )}

                                {/* Scraped Results Preview */}
                                {scrapedDeals.length > 0 && (
                                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                        <div className="flex items-center justify-between border-b border-white/5 pb-4">
                                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                                <ListChecks size={16} />
                                                Detected Assets ({scrapedDeals.length})
                                            </h3>
                                            <button
                                                onClick={handleApplyScrapeImport}
                                                disabled={isSaving}
                                                className="flex items-center gap-3 rounded-xl bg-green-500 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:shadow-lg hover:shadow-green-500/20 disabled:opacity-50"
                                            >
                                                {isSaving ? <Loader2 className="animate-spin" size={12} /> : <Save size={12} />}
                                                {isSaving ? `Importing (${importProgress.current}/${importProgress.total})` : "Finalize Import"}
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {scrapedDeals.map((deal, idx) => (
                                                <div key={idx} className="group relative flex gap-4 p-4 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all">
                                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-black">
                                                        {deal.imageURL ? (
                                                            <img src={deal.imageURL} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                        ) : (
                                                            <div className="flex h-full w-full items-center justify-center text-white/10">
                                                                <ImageIcon size={24} />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0 space-y-1">
                                                        <h4 className="text-xs font-bold text-white truncate">{deal.address}</h4>
                                                        <div className="flex flex-wrap gap-2 pt-1">
                                                            <span className="px-2 py-0.5 rounded-md bg-brand-gold/10 text-brand-gold text-[8px] font-black uppercase tracking-widest">
                                                                {deal.assetType || 'ASSET'}
                                                            </span>
                                                            <span className="px-2 py-0.5 rounded-md bg-white/5 text-white/40 text-[8px] font-black uppercase tracking-widest">
                                                                {deal.strategy || 'STRATEGY'}
                                                            </span>
                                                        </div>
                                                        <p className="text-[9px] text-white/20 line-clamp-2 pt-1 font-medium italic">
                                                            {deal.description || "No narrative extracted."}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Blank Slate */}
                                {!isScraping && !scrapedDeals.length && !scrapeError && (
                                    <div className="flex flex-col items-center justify-center py-12 text-center opacity-30">
                                        <div className="h-16 w-16 mb-4 rounded-full bg-white/5 flex items-center justify-center">
                                            <Briefcase size={32} />
                                        </div>
                                        <h3 className="text-lg font-bold text-white uppercase tracking-tight">Engine Offline</h3>
                                        <p className="text-[10px] font-black uppercase tracking-widest max-w-[240px] mt-2">Enter a portfolio or projects URL to begin deep asset extraction</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Sub-component: Grid card refined to match Site Editor aesthetic
function GridDealCard({ deal, firmTeam, onUpdate, onDelete, saveStatus, onMediaOpen, aiProcessingIds }: {
    deal: Deal,
    firmTeam: any[],
    onUpdate: (updates: any) => void,
    onDelete: () => void,
    saveStatus: 'idle' | 'saving' | 'saved',
    onMediaOpen: () => void,
    aiProcessingIds: Set<string>
}) {
    return (
        <div className="glass group overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/30 p-8 transition-all hover:border-brand-gold/20 hover:bg-brand-gray-900/50 flex flex-col h-full shadow-2xl relative">
            <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing text-white/10 hover:text-brand-gold">
                <GripVertical size={16} />
            </div>

            {/* Media Section */}
            <div className="relative group/media mb-8">
                <div
                    onClick={onMediaOpen}
                    className="aspect-video w-full overflow-hidden rounded-[2rem] border-2 border-brand-gold/30 shadow-xl bg-brand-dark group-hover/media:border-brand-gold transition-all cursor-pointer relative"
                >
                    {deal.generatedVideoURL ? (
                        <video
                            src={deal.generatedVideoURL}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="h-full w-full object-cover group-hover/media:scale-105 transition-transform"
                        />
                    ) : deal.stillImageURL ? (
                        <img src={deal.stillImageURL} className="h-full w-full object-cover group-hover/media:scale-110 transition-transform" />
                    ) : (
                        <div className="h-full w-full bg-white/5 flex items-center justify-center">
                            <Upload size={32} className="text-white/20" />
                        </div>
                    )}

                    {/* AI Generation State on Card */}
                    {!deal.generatedVideoURL && Array.from(aiProcessingIds).some((id: any) => id === deal.stillImageURL || (deal.images || []).includes(id)) && (
                        <div className="absolute inset-0 bg-brand-dark/40 backdrop-blur-sm flex flex-col items-center justify-center gap-3 animate-in fade-in z-10">
                            <div className="h-8 w-8 border-4 border-brand-gold/20 border-t-brand-gold rounded-full animate-spin shadow-2xl" />
                            <div className="text-center">
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">AI Rendering</p>
                                <p className="text-[8px] font-bold text-white/40 uppercase tracking-widest mt-1">Cinematic Drone Flight</p>
                            </div>
                        </div>
                    )}

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 flex items-center justify-center transition-opacity">
                        <Camera size={32} className="text-white" />
                    </div>
                </div>
            </div>

            {/* Identity & Address */}
            <div className="space-y-4 mb-8">
                <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Property Address</label>
                    <input
                        type="text"
                        value={deal.address}
                        onPointerDown={(e) => e.stopPropagation()}
                        onChange={(e) => onUpdate({ address: e.target.value })}
                        className="w-full bg-transparent border-b border-white/10 text-xl font-black text-white outline-none focus:border-brand-gold transition-all"
                    />
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Asset Category</label>
                        <select
                            className="w-full bg-transparent border-b border-white/10 text-[10px] font-black text-brand-gold outline-none focus:border-brand-gold transition-all uppercase tracking-widest appearance-none py-1"
                            value={deal.assetType}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ assetType: e.target.value })}
                        >
                            <option value="MULTIFAMILY">Multifamily</option>
                            <option value="INDUSTRIAL">Industrial</option>
                            <option value="RETAIL">Retail</option>
                            <option value="SF">Single Family</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Strategy</label>
                        <select
                            className="w-full bg-transparent border-b border-white/10 text-[10px] font-black text-brand-gold outline-none focus:border-brand-gold transition-all uppercase tracking-widest appearance-none py-1"
                            value={deal.strategy}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ strategy: e.target.value })}
                        >
                            <option value="BUY_AND_HOLD">Buy & Hold</option>
                            <option value="FIX_FLIP">Fix & Flip</option>
                        </select>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Structure</label>
                        <select
                            className="w-full bg-transparent border-b border-white/10 text-[10px] font-black text-brand-gold outline-none focus:border-brand-gold transition-all uppercase tracking-widest appearance-none py-1"
                            value={deal.financingType}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ financingType: e.target.value })}
                        >
                            <option value="Debt Financing">Debt</option>
                            <option value="Equity Ownership">Equity</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Metrics Section */}
            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="space-y-1 text-center p-3 rounded-2xl bg-black/20 border border-white/5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 block">Purchase</label>
                    <div className="text-xs font-black text-white flex items-center justify-center gap-0.5">
                        <span className="text-brand-gold/40">$</span>
                        <input
                            type="number"
                            className="bg-transparent w-full text-center outline-none"
                            value={deal.purchaseAmount || ""}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ purchaseAmount: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div className="space-y-1 text-center p-3 rounded-2xl bg-black/20 border border-white/5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 block">Rehab</label>
                    <div className="text-xs font-black text-white flex items-center justify-center gap-0.5">
                        <span className="text-brand-gold/40">$</span>
                        <input
                            type="number"
                            className="bg-transparent w-full text-center outline-none"
                            value={deal.rehabAmount || ""}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ rehabAmount: Number(e.target.value) })}
                        />
                    </div>
                </div>
                <div className="space-y-1 text-center p-3 rounded-2xl bg-black/20 border border-white/5">
                    <label className="text-[8px] font-black uppercase tracking-widest text-white/20 block">ARV</label>
                    <div className="text-xs font-black text-white flex items-center justify-center gap-0.5">
                        <span className="text-brand-gold/40">$</span>
                        <input
                            type="number"
                            className="bg-transparent w-full text-center outline-none"
                            value={deal.arv || ""}
                            onPointerDown={(e) => e.stopPropagation()}
                            onChange={(e) => onUpdate({ arv: Number(e.target.value) })}
                        />
                    </div>
                </div>
            </div>

            {/* Narrative Section */}
            <div className="space-y-2 mb-8 flex-1">
                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Investment Narrative</label>
                <textarea
                    className="w-full h-32 rounded-2xl border border-white/5 bg-black/20 p-4 text-xs font-medium text-white/60 outline-none focus:border-brand-gold/30 transition-all resize-none custom-scrollbar"
                    value={deal.investmentOverview || ""}
                    onPointerDown={(e) => e.stopPropagation()}
                    onChange={(e) => onUpdate({ investmentOverview: e.target.value })}
                    placeholder="Describe the opportunity..."
                />
            </div>

            {/* Parties Section */}
            <div className="space-y-3 mb-8">
                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Team Assigned</label>
                <div className="flex flex-wrap gap-1.5 p-3 rounded-2xl bg-black/20 border border-white/5 min-h-[48px]">
                    {(deal.teamMemberIds || []).map(mId => {
                        const m = firmTeam.find(item => item.id === mId);
                        return (
                            <div key={mId} className="flex items-center gap-1.5 rounded-lg bg-brand-gold/10 px-2.5 py-1 text-[8px] font-black uppercase tracking-widest text-brand-gold border border-brand-gold/20">
                                {m?.name}
                                <button onClick={() => onUpdate({ teamMemberIds: (deal.teamMemberIds || []).filter((id: string) => id !== mId) })}>
                                    <X size={10} />
                                </button>
                            </div>
                        );
                    })}
                    <select
                        className="bg-brand-dark/50 text-[8px] font-black uppercase tracking-[0.2em] text-brand-gold/60 hover:text-brand-gold outline-none cursor-pointer transition-all py-2 px-3 border border-white/5 rounded-xl w-full mt-2"
                        value=""
                        onPointerDown={(e) => e.stopPropagation()}
                        onChange={(e) => {
                            const val = e.target.value;
                            if (val && !(deal.teamMemberIds || []).includes(val)) {
                                onUpdate({ teamMemberIds: [...(deal.teamMemberIds || []), val] });
                            }
                        }}
                    >
                        <option value="" disabled className="bg-brand-dark">+ ASSIGN TRANSACTION LEAD</option>
                        {firmTeam
                            .filter((m: any) => !(deal.teamMemberIds || []).includes(m.id))
                            .map((m: any) => (
                                <option key={m.id} value={m.id} className="bg-brand-dark text-white font-inter">{m.name}</option>
                            ))
                        }
                        {firmTeam.length === 0 && (
                            <option disabled className="bg-brand-dark text-white/20">NO TEAM MEMBERS FOUND</option>
                        )}
                    </select>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center gap-3">
                <button
                    onClick={() => onUpdate({ isPublic: !deal.isPublic })}
                    className={`h-14 px-6 flex items-center gap-3 rounded-2xl border transition-all ${deal.isPublic ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-brand-gold/10 border-brand-gold/20 text-brand-gold'}`}
                >
                    <div className={`h-2 w-2 rounded-full ${deal.isPublic ? 'bg-green-500 animate-pulse' : 'bg-brand-gold'}`} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{deal.isPublic ? 'Public' : 'Private'}</span>
                </button>
                <Link
                    href={`/deals/${deal.id}`}
                    className="flex-1 flex items-center justify-center gap-3 h-14 rounded-2xl bg-brand-dark/50 border border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 transition-all hover:bg-brand-gray-800 hover:text-white"
                >
                    <ExternalLink size={14} />
                    View Live
                </Link>
                <button
                    onClick={onDelete}
                    className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 text-white/20 border border-white/5 hover:bg-red-500/10 hover:text-red-500 hover:border-red-500/20 transition-all"
                >
                    <Trash2 size={20} />
                </button>
            </div>

            {saveStatus === 'saving' && (
                <div className="absolute top-4 left-4">
                    <div className="h-2 w-2 rounded-full bg-brand-gold animate-pulse" />
                </div>
            )}
        </div>
    );
}

