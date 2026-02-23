"use client";

import { MOCK_DEALS, MOCK_FIRMS } from "@/lib/mock-data";
import { Briefcase, Building2, MapPin, Eye, Edit3, Trash2 } from "lucide-react";
import Link from "next/link";

export default function AdminDealsPage() {
    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">Global <span className="text-brand-gold">Deals</span></h1>
                        <p className="mt-2 text-foreground/50">Oversee all digital tombstones across the platform.</p>
                    </div>
                    <Link href="/admin" className="text-sm font-bold text-foreground/40 hover:text-white">
                        Return to Dashboard
                    </Link>
                </div>

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
                            {MOCK_DEALS.map((deal) => {
                                const firm = MOCK_FIRMS.find(f => f.id === deal.firmId);
                                return (
                                    <tr key={deal.id} className="group transition-colors hover:bg-white/5">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 overflow-hidden rounded-lg">
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
                                                <button className="p-2 text-foreground/40 hover:text-red-500">
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
