"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { Briefcase, Building2, MapPin, Eye, Edit3, Trash2, Plus, X, Save } from "lucide-react";
import Link from "next/link";

export default function AdminDealsPage() {
    const { firms, deals, teamMembers, addDeal, deleteDeal } = useData();
    const [isAddingDeal, setIsAddingDeal] = useState(false);
    const [newDeal, setNewDeal] = useState({
        address: "",
        firmId: firms[0].id,
        assetType: "MULTIFAMILY",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: 0,
        isPublic: true,
        teamMemberId: teamMembers[0]?.id || "",
        stillImageURL: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
    });

    const handleAddDeal = (e: React.FormEvent) => {
        e.preventDefault();
        const dealToAdd = {
            ...newDeal,
            id: `d-${Date.now()}`,
            financedAmount: newDeal.purchaseAmount * 0.7, // Mock financing
            capRate: 5.0, // Default for mock
            sqFt: 20000,   // Default for mock
        };
        // @ts-ignore - Ignoring enum mismatch for simplicity in mock
        addDeal(dealToAdd);
        setIsAddingDeal(false);
        setNewDeal({
            address: "",
            firmId: firms[0].id,
            assetType: "MULTIFAMILY",
            strategy: "BUY_AND_HOLD",
            purchaseAmount: 0,
            isPublic: true,
            teamMemberId: teamMembers[0]?.id || "",
            stillImageURL: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop"
        });
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

                {/* Add Deal Form */}
                {isAddingDeal && (
                    <div className="mb-12 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="glass overflow-hidden rounded-3xl border border-white/10 bg-brand-gray-900/50 p-8">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-white">New <span className="text-brand-gold">Digital Tombstone</span></h2>
                                <button onClick={() => setIsAddingDeal(false)} className="text-foreground/40 hover:text-white">
                                    <X size={24} />
                                </button>
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
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Investment Strategy</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.strategy}
                                        onChange={(e) => setNewDeal({ ...newDeal, strategy: e.target.value })}
                                    >
                                        <option value="BUY_AND_HOLD">Buy & Hold</option>
                                        <option value="FIX_FLIP">Fix & Flip</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Purchase Amount ($)</label>
                                    <input
                                        required
                                        type="number"
                                        placeholder="12500000"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white placeholder:text-white/10 focus:border-brand-gold/50 focus:outline-none"
                                        value={newDeal.purchaseAmount || ""}
                                        onChange={(e) => setNewDeal({ ...newDeal, purchaseAmount: Number(e.target.value) })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Responsible Party</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white focus:border-brand-gold/50 focus:outline-none appearance-none"
                                        value={newDeal.teamMemberId}
                                        onChange={(e) => setNewDeal({ ...newDeal, teamMemberId: e.target.value })}
                                    >
                                        <option value="">Select a team member...</option>
                                        {teamMembers.map(member => (
                                            <option key={member.id} value={member.id}>{member.name} ({firms.find(f => f.id === member.firmId)?.name})</option>
                                        ))}
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
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:bg-brand-gold/90"
                                    >
                                        <Save size={18} />
                                        Create Digital Tombstone
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
                            {deals.map((deal) => {
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
                                                <Building2 size={14} className="text-brand-gold" />
                                                <span className="text-sm font-medium text-white">{firm?.name}</span>
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
                                                <button className="p-2 text-foreground/40 hover:text-white">
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
