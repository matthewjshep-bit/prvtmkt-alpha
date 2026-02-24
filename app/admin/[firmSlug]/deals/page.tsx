"use client";

import { useState, useEffect, Suspense, use } from "react";
import { useData } from "@/context/DataContext";
import { Briefcase, Building2, MapPin, Eye, Edit3, Trash2, Plus, X, Save, Upload, Search, GripVertical, ListChecks, TrendingUp } from "lucide-react";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

export default function TenantDealsPage() {
    return (
        <Suspense fallback={<div className="flex items-center justify-center p-20"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <TenantDealsContent />
        </Suspense>
    );
}

function TenantDealsContent() {
    const { firms, deals, teamMembers, addDeal, updateDeal, deleteDeal, isInitialized } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    const [editingDeal, setEditingDeal] = useState<any | null>(null);
    const [isAddingDeal, setIsAddingDeal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // Bulk Editing State
    const [localDeals, setLocalDeals] = useState<any[]>([]);
    const [changedDealIds, setChangedDealIds] = useState<Set<string>>(new Set());
    const [activeMediaDealId, setActiveMediaDealId] = useState<string | null>(null);
    const [aiProcessingIds, setAiProcessingIds] = useState<Set<string>>(new Set());
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleGenerateAIVideo = async (dealId: string, imageUrl: string) => {
        try {
            setAiProcessingIds(prev => new Set(prev).add(imageUrl));

            // 1. Start Kling Task
            const startRes = await fetch("/api/kling", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imageUrl, dealId })
            });
            const startData = await startRes.json();

            if (startData.error) throw new Error(startData.error);
            const taskId = startData.data?.task_id || startData.task_id;

            // 2. Poll for completion
            const poll = async () => {
                const pollRes = await fetch(`/api/kling?taskId=${taskId}`);
                const pollData = await pollRes.json();
                const status = (pollData.data?.task_status || pollData.task_status)?.toLowerCase();

                if (status === "succeeded") {
                    const finalVideoUrl = pollData.data?.video_url || pollData.video_url;

                    // 3. Persist to S3
                    const persistRes = await fetch("/api/kling/persist", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ videoUrl: finalVideoUrl, dealId })
                    });
                    const persistData = await persistRes.json();

                    if (persistData.url) {
                        handleLocalUpdate(dealId, { generatedVideoURL: persistData.url });
                        setAiProcessingIds(prev => {
                            const next = new Set(prev);
                            next.delete(imageUrl);
                            return next;
                        });
                    }
                } else if (status === "failed") {
                    throw new Error("Kling AI generation failed");
                } else {
                    setTimeout(poll, 3000); // Poll every 3s
                }
            };

            poll();
        } catch (error) {
            console.error("AI Generation Error:", error);
            setAiProcessingIds(prev => {
                const next = new Set(prev);
                next.delete(imageUrl);
                return next;
            });
            alert("Failed to generate AI video. Check console for details.");
        }
    };

    useEffect(() => {
        if (isInitialized && firm) {
            setLocalDeals(deals.filter(d => d.firmId === firm.id));
        }
    }, [deals, isInitialized, firm?.id]);

    const handleLocalUpdate = (dealId: string, updates: any) => {
        // 1. Update UI-local state (for immediate feedback)
        setLocalDeals(prev => prev.map(d => {
            if (d.id !== dealId) return d;
            const newDeal = { ...d };
            Object.keys(updates).forEach(key => {
                if (typeof updates[key] === 'function') {
                    newDeal[key] = updates[key](d[key]);
                } else {
                    newDeal[key] = updates[key];
                }
            });
            return newDeal;
        }));
        setChangedDealIds(prev => new Set(prev).add(dealId));

        // 2. Immediately PERSIST to DataContext (IndexedDB)
        // This solves the 'disappearing' media issue by saving URLs instantly.
        updateDeal(dealId, (prev) => {
            const delta: any = {};
            Object.keys(updates).forEach(key => {
                if (typeof updates[key] === 'function') {
                    delta[key] = updates[key](prev[key]);
                } else {
                    delta[key] = updates[key];
                }
            });
            return delta;
        });
    };

    const handleSaveAll = () => {
        changedDealIds.forEach(id => {
            const deal = localDeals.find(d => d.id === id);
            if (deal) {
                updateDeal(id, deal);
            }
        });
        setChangedDealIds(new Set());
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
    const firmTeam = teamMembers.filter(m => (m.firmIds || []).includes(firm.id));

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

    const activeMediaDeal = localDeals.find(d => d.id === activeMediaDealId);

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

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">Firm <span className="text-brand-gold">Deals</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">Manage and curate your digital tombstone portfolio.</p>
                </div>
                <div className="flex items-center gap-4">
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
                        onClick={() => setIsAddingDeal(true)}
                        className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                    >
                        <Plus size={18} />
                        New Deal Tombstone
                    </button>
                </div>
            </div>

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
                                <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Project Narrative</label>
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
                                                    formData.append("dealId", "new"); // temporary marker

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
                                    {newDeal.teamMemberIds.map(mId => {
                                        const member = firmTeam.find(m => m.id === mId);
                                        return (
                                            <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[10px] font-bold text-brand-gold">
                                                {member?.name}
                                                <button
                                                    type="button"
                                                    onClick={() => setNewDeal({ ...newDeal, teamMemberIds: newDeal.teamMemberIds.filter(id => id !== mId) })}
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
                                        if (e.target.value && !newDeal.teamMemberIds.includes(e.target.value)) {
                                            setNewDeal({ ...newDeal, teamMemberIds: [...newDeal.teamMemberIds, e.target.value] });
                                        }
                                    }}
                                >
                                    <option value="">+ Add Team Member...</option>
                                    {firmTeam
                                        .filter(m => !newDeal.teamMemberIds.includes(m.id))
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

            {/* List Table */}
            <div className="glass overflow-hidden rounded-[2rem] border border-white/5 bg-brand-gray-900/10">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Media / File Upload</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Financial Metrics</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Investment Overview</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Strategy & Structure</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Responsible Parties</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {localDeals
                            .filter(deal => {
                                const q = searchQuery.toLowerCase();
                                return deal.address.toLowerCase().includes(q) || deal.assetType.toLowerCase().includes(q);
                            })
                            .map((deal) => (
                                <tr key={deal.id} className={`group hover:bg-white/[0.02] transition-colors ${changedDealIds.has(deal.id) ? 'bg-brand-gold/[0.02]' : ''}`}>
                                    <td className="px-10 py-8 min-w-[300px]">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => setActiveMediaDealId(deal.id)}
                                                className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-gray-900 border border-white/10 group/media"
                                            >
                                                {deal.stillImageURL ? (
                                                    <img src={deal.stillImageURL} className="h-full w-full object-cover group-hover/media:scale-110 transition-transform" />
                                                ) : (
                                                    <div className="h-full w-full bg-white/5 flex items-center justify-center">
                                                        <Upload size={16} className="text-white/20" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/media:opacity-100 flex items-center justify-center transition-opacity">
                                                    <Upload size={16} className="text-white" />
                                                </div>
                                            </button>
                                            <div className="flex-1 space-y-1">
                                                <input
                                                    className="w-full bg-transparent border-none p-0 text-white font-bold placeholder:text-white/10 focus:ring-0 focus:outline-none"
                                                    value={deal.address.split(',')[0]}
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
                                                placeholder="Enter project narrative..."
                                                value={deal.investmentOverview || ""}
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
                                    <td className="px-10 py-8 min-w-[250px]">
                                        <div className="flex flex-wrap gap-2">
                                            {deal.teamMemberIds.map((mId: string) => {
                                                const member = firmTeam.find(m => m.id === mId);
                                                return (
                                                    <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[10px] font-bold text-brand-gold">
                                                        {member?.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => handleLocalUpdate(deal.id, { teamMemberIds: deal.teamMemberIds.filter((id: string) => id !== mId) })}
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
                                                onChange={(e) => {
                                                    if (e.target.value && !deal.teamMemberIds.includes(e.target.value)) {
                                                        handleLocalUpdate(deal.id, { teamMemberIds: [...deal.teamMemberIds, e.target.value] });
                                                    }
                                                }}
                                            >
                                                <option value="">+ Assign Team...</option>
                                                {firmTeam
                                                    .filter(m => !deal.teamMemberIds.includes(m.id))
                                                    .map(member => (
                                                        <option key={member.id} value={member.id}>{member.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right min-w-[150px]">
                                        <div className="flex flex-col items-end gap-3">
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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
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
                                                            formData.append("dealId", activeMediaDeal.id);

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
                                                            });
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
                                                        formData.append("dealId", activeMediaDeal.id);

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
                                                        });
                                                        console.log("AI Engine Upload Success:", url);

                                                        // Force Trigger Kling for this specific uploader
                                                        handleGenerateAIVideo(activeMediaDeal.id, url);
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
                                                    {img && <img src={img} className="h-full w-full object-cover" />}
                                                    {activeMediaDeal.generatedVideoURL && idx === 0 ? (
                                                        <div className="absolute inset-0 bg-brand-gold/20 flex items-center justify-center">
                                                            <div className="rounded-full bg-brand-gold p-1 animate-pulse">
                                                                <Eye size={10} className="text-brand-dark" />
                                                            </div>
                                                        </div>
                                                    ) : aiProcessingIds.has(img) ? (
                                                        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center gap-1">
                                                            <div className="h-4 w-4 border-2 border-brand-gold/30 border-t-brand-gold animate-spin rounded-full" />
                                                            <span className="text-[6px] font-black uppercase text-brand-gold">AI Processing</span>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            onClick={() => img && handleGenerateAIVideo(activeMediaDeal.id, img)}
                                                            className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all"
                                                        >
                                                            <div className="flex flex-col items-center gap-1">
                                                                <Upload size={14} className="text-brand-gold" />
                                                                <span className="text-[6px] font-black uppercase text-white">Gen Drone AI</span>
                                                            </div>
                                                        </button>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <p className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Asset File</p>
                                                    <p className="text-xs font-bold text-white mt-1 truncate max-w-[200px]">
                                                        {img ? (
                                                            (() => {
                                                                const parts = img.split('/');
                                                                const filename = parts[parts.length - 1];
                                                                // Remove timestamp prefix if exists (common in our upload route)
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
        </div>
    );
}
