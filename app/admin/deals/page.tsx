"use client";

import { useState, useEffect, Suspense } from "react";
import { useData } from "@/context/DataContext";
import { Briefcase, Building2, MapPin, Eye, Edit3, Trash2, Plus, X, Save, Upload, Search } from "lucide-react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function AdminDealsPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-brand-dark flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <AdminDealsContent />
        </Suspense>
    );
}

function AdminDealsContent() {
    const { firms, deals, teamMembers, addDeal, updateDeal, deleteDeal } = useData();
    const [editingDeal, setEditingDeal] = useState<any | null>(null);
    const [isAddingDeal, setIsAddingDeal] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedFirmId, setSelectedFirmId] = useState("all");

    const DEFAULT_TOMBSTONE: {
        address: string;
        firmId: string;
        assetType: string;
        strategy: string;
        purchaseAmount?: number | null;
        rehabAmount?: number | null;
        arv?: number | null;
        financingType: string;
        isPublic: boolean;
        teamMemberIds: string[];
        stillImageURL: string;
        context: string;
        images: string[];
    } = {
        address: "",
        firmId: firms[0]?.id || "",
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

    const [newDeal, setNewDeal] = useState(DEFAULT_TOMBSTONE);
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("add") === "true") {
            setIsAddingDeal(true);
        }
    }, [searchParams]);

    const handleAddDeal = (e: React.FormEvent) => {
        e.preventDefault();
        // Ensure firmId is correctly captured from newDeal state
        const dealToAdd = {
            ...newDeal,
            id: `d-${Date.now()}`,
            firmId: newDeal.firmId || firms[0]?.id, // Ensure we have a valid firmId
            purchaseAmount: newDeal.purchaseAmount || null,
            financedAmount: newDeal.purchaseAmount ? newDeal.purchaseAmount * 0.7 : null, // Mock financing
            stillImageURL: newDeal.images && newDeal.images.length > 0 ? newDeal.images[0] : newDeal.stillImageURL,
            capRate: 5.0, // Default for mock
            sqFt: 20000,   // Default for mock
        };
        // @ts-ignore - Ignoring enum mismatch for simplicity in mock
        addDeal(dealToAdd);
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

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Global <span className="text-brand-gold">Deals</span></h1>
                        <p className="mt-2 text-foreground/50">Oversee all digital tombstones across the platform.</p>
                    </div>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={() => setIsAddingDeal(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                        >
                            <Plus size={18} />
                            Add New Deal
                        </button>
                        <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white">
                            Return to Dashboard
                        </Link>
                    </div>
                </div>

                {/* Advanced Filtering Tools */}
                <div className="mb-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1 group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-brand-gold transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search deals by address or asset type..."
                            className="w-full rounded-xl border border-white/5 bg-brand-gray-900/50 pl-12 pr-4 py-3 text-white outline-none focus:border-brand-gold/50 transition-all font-medium placeholder:text-white/20"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            className="w-full rounded-xl border border-white/5 bg-brand-gray-900/50 px-4 py-3 text-white outline-none focus:border-brand-gold/50 transition-all appearance-none font-medium"
                            value={selectedFirmId}
                            onChange={(e) => setSelectedFirmId(e.target.value)}
                        >
                            <option value="all">All Firms</option>
                            {firms.map(firm => (
                                <option key={firm.id} value={firm.id}>{firm.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Add Deal Form */}
                {isAddingDeal && (
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="glass overflow-hidden rounded-3xl border border-white/10 bg-brand-gray-900/50 p-8">
                            <div className="flex items-center justify-between mb-8 text-center sm:text-left">
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Digital <span className="text-brand-gold">Tombstone Editor</span></h2>
                                    <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-bold">Standardized Transaction Template</p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setNewDeal(DEFAULT_TOMBSTONE)}
                                        className="text-[10px] font-bold uppercase tracking-widest text-brand-gold hover:opacity-70"
                                    >
                                        Reset to Template
                                    </button>
                                    <button onClick={() => setIsAddingDeal(false)} className="text-foreground/40 hover:text-white">
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            <form onSubmit={handleAddDeal} className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Property Address</label>
                                    <input
                                        required
                                        type="text"
                                        placeholder="e.g. 123 Main St, New York, NY"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none"
                                        value={newDeal.address}
                                        onChange={(e) => setNewDeal({ ...newDeal, address: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Associated Firm</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.firmId}
                                        onChange={(e) => setNewDeal({ ...newDeal, firmId: e.target.value })}
                                    >
                                        {firms.map(firm => (
                                            <option key={firm.id} value={firm.id}>{firm.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Deal Overview (Narrative)</label>
                                        <textarea
                                            placeholder="General project narrative..."
                                            className="w-full h-32 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none resize-none"
                                            value={newDeal.context || ""}
                                            onChange={(e) => setNewDeal({ ...newDeal, context: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="md:col-span-2 space-y-4">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Tombstone Media (Upload from Desktop)</label>
                                    <div className="space-y-4">
                                        {/* File Input */}
                                        <div className="relative">
                                            <input
                                                type="file"
                                                multiple
                                                accept="image/*"
                                                className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                onChange={(e) => {
                                                    const files = Array.from(e.target.files || []);
                                                    files.forEach(file => {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            const base64String = reader.result as string;
                                                            setNewDeal(prev => ({
                                                                ...prev,
                                                                images: [...(prev.images || []), base64String]
                                                            }));
                                                        };
                                                        reader.readAsDataURL(file);
                                                    });
                                                }}
                                            />
                                            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 py-10 transition-all hover:border-brand-gold/50 hover:bg-white/10">
                                                <Upload size={32} className="mb-2 text-brand-gold" />
                                                <p className="text-sm font-bold text-white">Select Images from Desktop</p>
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/40 mt-1">PNG, JPG or WEBP (Multiple allowed)</p>
                                            </div>
                                        </div>

                                        {/* Image Gallery Preview */}
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
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Asset Type</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.assetType}
                                        onChange={(e) => setNewDeal({ ...newDeal, assetType: e.target.value })}
                                    >
                                        <option value="MULTIFAMILY">Multifamily</option>
                                        <option value="INDUSTRIAL">Industrial</option>
                                        <option value="RETAIL">Retail</option>
                                        <option value="SF">Single Family</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Deal Strategy</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.strategy}
                                        onChange={(e) => setNewDeal({ ...newDeal, strategy: e.target.value })}
                                    >
                                        <option value="BUY_AND_HOLD">Buy and Hold</option>
                                        <option value="FIX_FLIP">Fix and Flip</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Financing Type</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.financingType}
                                        onChange={(e) => setNewDeal({ ...newDeal, financingType: e.target.value })}
                                    >
                                        <option value="Debt Financing">Debt Financing</option>
                                        <option value="Equity Ownership">Equity Ownership</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Purchase Amount ($)</label>
                                    <input
                                        type="number"
                                        placeholder="12500000"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none"
                                        value={newDeal.purchaseAmount === null ? "" : newDeal.purchaseAmount}
                                        onChange={(e) => setNewDeal({ ...newDeal, purchaseAmount: e.target.value ? Number(e.target.value) : null })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Rehab Amount ($)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none"
                                        value={newDeal.rehabAmount || ""}
                                        onChange={(e) => setNewDeal({ ...newDeal, rehabAmount: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">After Repair Value (ARV) ($)</label>
                                    <input
                                        type="number"
                                        placeholder="0"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none"
                                        value={newDeal.arv || ""}
                                        onChange={(e) => setNewDeal({ ...newDeal, arv: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">
                                        Responsible Parties <span className="text-brand-gold ml-1 text-[8px] italic">MULTI-SELECT ACTIVE</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {newDeal.teamMemberIds.map(mId => {
                                            const member = teamMembers.find(m => m.id === mId);
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
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value=""
                                        onChange={(e) => {
                                            if (e.target.value && !newDeal.teamMemberIds.includes(e.target.value)) {
                                                setNewDeal({ ...newDeal, teamMemberIds: [...newDeal.teamMemberIds, e.target.value] });
                                            }
                                        }}
                                    >
                                        <option value="">+ Add Transaction Lead...</option>
                                        {teamMembers
                                            .filter(m => !newDeal.teamMemberIds.includes(m.id))
                                            .map(member => (
                                                <option key={member.id} value={member.id}>{member.name} ({firms.filter(f => (member.firmIds || []).includes(f.id)).map(f => f.name).join(', ')})</option>
                                            ))
                                        }
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Visibility</label>
                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={() => setNewDeal({ ...newDeal, isPublic: true })}
                                            className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${newDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                        >
                                            Public
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setNewDeal({ ...newDeal, isPublic: false })}
                                            className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${!newDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                        >
                                            Private
                                        </button>
                                    </div>
                                </div>

                                <div className="md:col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        className="flex w-full flex-col items-center justify-center gap-1 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:bg-brand-gold/90"
                                    >
                                        <div className="flex items-center gap-2">
                                            <Save size={18} />
                                            <span>Finalize Digital Tombstone</span>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-50">Publish to Platform Portfolio</span>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit Deal Modal */}
                {editingDeal && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-6">
                        <div className="absolute inset-0 bg-brand-dark/90 backdrop-blur-sm" onClick={() => setEditingDeal(null)} />
                        <div className="glass relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-brand-gray-900 shadow-2xl animate-in zoom-in-95 duration-200">
                            <div className="flex items-center justify-between border-b border-white/5 p-8">
                                <h2 className="text-2xl font-bold text-white">Edit <span className="text-brand-gold">Digital Tombstone</span></h2>
                                <button onClick={() => setEditingDeal(null)} className="text-foreground/40 hover:text-white">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateDeal} className="p-8">
                                <div className="grid gap-6 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Property Address</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                            value={editingDeal.address}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, address: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Firm Association</label>
                                        <select
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                            value={editingDeal.firmId}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, firmId: e.target.value })}
                                        >
                                            {firms.map(firm => (
                                                <option key={firm.id} value={firm.id}>{firm.name}</option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="md:col-span-2 space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Deal Overview (Narrative)</label>
                                            <textarea
                                                placeholder="General project narrative..."
                                                className="w-full h-32 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none resize-none"
                                                value={editingDeal.context || ""}
                                                onChange={(e) => setEditingDeal({ ...editingDeal, context: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-4">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Tombstone Media (Upload from Desktop)</label>
                                        <div className="space-y-4">
                                            {/* File Input */}
                                            <div className="relative">
                                                <input
                                                    type="file"
                                                    multiple
                                                    accept="image/*"
                                                    className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                                    onChange={(e) => {
                                                        const files = Array.from(e.target.files || []);
                                                        files.forEach(file => {
                                                            const reader = new FileReader();
                                                            reader.onloadend = () => {
                                                                const base64String = reader.result as string;
                                                                setEditingDeal((prev: any) => ({
                                                                    ...prev,
                                                                    images: [...(prev.images || []), base64String]
                                                                }));
                                                            };
                                                            reader.readAsDataURL(file);
                                                        });
                                                    }}
                                                />
                                                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-white/5 py-8 transition-all hover:border-brand-gold/50 hover:bg-white/10">
                                                    <Upload size={24} className="mb-2 text-brand-gold" />
                                                    <p className="text-xs font-bold text-white">Add Images from Desktop</p>
                                                </div>
                                            </div>

                                            {/* Image Gallery Preview */}
                                            {editingDeal.images && editingDeal.images.length > 0 && (
                                                <div className="grid grid-cols-4 gap-3">
                                                    {editingDeal.images.map((img: string, idx: number) => (
                                                        <div key={idx} className="group relative aspect-square overflow-hidden rounded-xl border border-white/10">
                                                            <img src={img} className="h-full w-full object-cover" />
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    const newImages = (editingDeal.images || []).filter((_: any, i: number) => i !== idx);
                                                                    setEditingDeal({ ...editingDeal, images: newImages });
                                                                }}
                                                                className="absolute top-1 right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                            >
                                                                <X size={10} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Financing Type</label>
                                        <select
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                            value={editingDeal.financingType}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, financingType: e.target.value })}
                                        >
                                            <option value="Debt Financing">Debt Financing</option>
                                            <option value="Equity Ownership">Equity Ownership</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Purchase Amount ($)</label>
                                        <input
                                            required
                                            type="number"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                            value={editingDeal.purchaseAmount}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, purchaseAmount: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Rehab Amount ($)</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                            value={editingDeal.rehabAmount || ""}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, rehabAmount: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">ARV ($)</label>
                                        <input
                                            type="number"
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none"
                                            value={editingDeal.arv || ""}
                                            onChange={(e) => setEditingDeal({ ...editingDeal, arv: Number(e.target.value) })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Responsible Parties</label>
                                        <div className="flex flex-wrap gap-2 mb-2">
                                            {(editingDeal.teamMemberIds || []).map((mId: string) => {
                                                const member = teamMembers.find(m => m.id === mId);
                                                return (
                                                    <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[10px] font-bold text-brand-gold">
                                                        {member?.name}
                                                        <button
                                                            type="button"
                                                            onClick={() => setEditingDeal({ ...editingDeal, teamMemberIds: editingDeal.teamMemberIds.filter((id: string) => id !== mId) })}
                                                            className="hover:text-white"
                                                        >
                                                            <X size={12} />
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                        <select
                                            className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                            value=""
                                            onChange={(e) => {
                                                if (e.target.value && !(editingDeal.teamMemberIds || []).includes(e.target.value)) {
                                                    setEditingDeal({ ...editingDeal, teamMemberIds: [...(editingDeal.teamMemberIds || []), e.target.value] });
                                                }
                                            }}
                                        >
                                            <option value="">+ Add Transaction Lead...</option>
                                            {teamMembers
                                                .filter(m => !(editingDeal.teamMemberIds || []).includes(m.id))
                                                .map(member => (
                                                    <option key={member.id} value={member.id}>{member.name} ({firms.filter(f => (member.firmIds || []).includes(f.id)).map(f => f.name).join(', ')})</option>
                                                ))
                                            }
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Visibility</label>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setEditingDeal({ ...editingDeal, isPublic: true })}
                                                className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${editingDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                            >
                                                Public
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setEditingDeal({ ...editingDeal, isPublic: false })}
                                                className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${!editingDeal.isPublic ? 'border-brand-gold bg-brand-gold/10 text-brand-gold' : 'border-white/5 bg-brand-dark text-foreground/40'}`}
                                            >
                                                Private
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-4">
                                    <button
                                        type="button"
                                        onClick={() => setEditingDeal(null)}
                                        className="flex-1 rounded-xl border border-white/5 bg-brand-dark py-4 text-sm font-bold text-white transition-all hover:bg-white/5"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-[2] rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:bg-brand-gold/90"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                <div className="glass overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-white/5 bg-brand-gray-900/50">
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Asset</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Firm</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Status</th>
                                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-foreground/40">Price</th>
                                <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-foreground/40">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {deals
                                .filter(deal => {
                                    const matchesFirm = selectedFirmId === "all" || deal.firmId === selectedFirmId;
                                    const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                        deal.assetType.toLowerCase().includes(searchQuery.toLowerCase());
                                    return matchesFirm && matchesSearch;
                                })
                                .map((deal) => {
                                    const firm = firms.find(f => f.id === deal.firmId);
                                    return (
                                        <tr key={deal.id} className="group transition-colors hover:bg-white/5 animate-in fade-in duration-500">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 overflow-hidden rounded-lg bg-white/5">
                                                        <img src={deal.stillImageURL || ""} className="h-full w-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white">{deal.address.split(',')[0]}</p>
                                                        <div className="flex items-center gap-1 text-[10px] text-foreground/40">
                                                            <MapPin size={10} />
                                                            {deal.address.split(',').slice(1).join(',')}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-6 w-6 overflow-hidden rounded-md bg-white/5 border border-white/10">
                                                        {firm?.logoUrl ? (
                                                            <img src={firm.logoUrl} className="h-full w-full object-contain" />
                                                        ) : (
                                                            <Building2 size={12} className="m-auto h-full text-brand-gold" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{firm?.name || 'Unassigned'}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${deal.isPublic ? 'bg-green-500/10 text-green-500' : 'bg-brand-gold/10 text-brand-gold'}`}>
                                                    {deal.isPublic ? 'Public' : 'Private'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-white">${(deal.purchaseAmount || 0).toLocaleString()}</p>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/deals/${deal.id}`} className="p-2 text-foreground/40 hover:text-brand-gold">
                                                        <Eye size={18} />
                                                    </Link>
                                                    <button
                                                        onClick={() => setEditingDeal(deal)}
                                                        className="p-2 text-foreground/40 hover:text-white"
                                                    >
                                                        <Edit3 size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => deleteDeal(deal.id)}
                                                        className="p-2 text-foreground/40 hover:text-red-500"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
