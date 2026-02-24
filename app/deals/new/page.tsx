"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, Image as ImageIcon, Video, DollarSign, MapPin, X, Building2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function IntakeFormPage() {
    const { addDeal, firms } = useData();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isGenerating, setIsGenerating] = useState(false);
    const [form, setForm] = useState({
        address: "",
        firmId: "",
        assetType: "INDUSTRIAL",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: "",
        isPublic: true,
        images: [] as File[],
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, 2));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    const handleComplete = () => {
        setIsGenerating(true);
        // Simulate AI Video generation progress
        setTimeout(() => {
            const newId = `d-${Date.now()}`;
            // FIX: Ensure firmId is correctly mapped and has a fallback
            const finalFirmId = form.firmId || (firms.length > 0 ? firms[0].id : "");

            const newDeal = {
                id: newId,
                firmId: finalFirmId,
                address: form.address,
                assetType: form.assetType,
                strategy: form.strategy,
                purchaseAmount: form.purchaseAmount ? Number(form.purchaseAmount) : null,
                financedAmount: form.purchaseAmount ? Number(form.purchaseAmount) * 0.7 : null,
                // Default placeholder if no images
                stillImageURL: form.images.length > 0 ? URL.createObjectURL(form.images[0]) : "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800&auto=format&fit=crop",
                images: form.images.map(img => URL.createObjectURL(img)),
                isPublic: form.isPublic,
                capRate: 5.0,
                sqFt: 25000,
                teamMemberIds: ["cm1"], // Mock team member
                context: "Generated via System Intake workflow."
            };
            addDeal(newDeal);
            router.push(`/admin/deals`);
        }, 3000);
    };

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-20">
            <div className="container mx-auto max-w-2xl px-6">
                {/* Progress bar */}
                <div className="mb-12 flex items-center justify-between">
                    {[1, 2].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${step >= s
                                    ? "border-brand-gold bg-brand-gold text-brand-dark"
                                    : "border-white/10 bg-brand-gray-900 text-foreground/30"
                                    }`}
                            >
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </div>
                            {s < 2 && (
                                <div
                                    className={`h-0.5 w-16 md:w-32 transition-all ${step > s ? "bg-brand-gold" : "bg-white/10"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="glass rounded-3xl p-8 md:p-12">
                    <AnimatePresence mode="wait">
                        {step === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-foreground">Basic Information</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Responsible Firm</label>
                                        <div className="relative">
                                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                                            <select
                                                required
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-foreground outline-none focus:border-brand-gold/50 appearance-none"
                                                value={form.firmId}
                                                onChange={(e) => setForm({ ...form, firmId: e.target.value })}
                                            >
                                                <option value="" disabled>Select the lead firm...</option>
                                                {firms.map(firm => (
                                                    <option key={firm.id} value={firm.id}>{firm.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Property Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                                            <input
                                                required
                                                type="text"
                                                placeholder="e.g. 123 Industrial Way, Dallas, TX"
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-foreground outline-none focus:border-brand-gold/50"
                                                value={form.address}
                                                onChange={(e) => setForm({ ...form, address: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Asset Type</label>
                                            <select
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-gray-900 px-4 text-foreground outline-none focus:border-brand-gold/50"
                                                value={form.assetType}
                                                onChange={(e) => setForm({ ...form, assetType: e.target.value })}
                                            >
                                                <option value="INDUSTRIAL">Industrial</option>
                                                <option value="RETAIL">Retail</option>
                                                <option value="MULTIFAMILY">Multifamily</option>
                                                <option value="SF">Single Family</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Strategy</label>
                                            <select
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-gray-900 px-4 text-foreground outline-none focus:border-brand-gold/50"
                                                value={form.strategy}
                                                onChange={(e) => setForm({ ...form, strategy: e.target.value })}
                                            >
                                                <option value="BUY_AND_HOLD">Buy & Hold</option>
                                                <option value="FIX_FLIP">Fix & Flip</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-foreground">Financials & Media</h2>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Purchase Price</label>
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold uppercase text-foreground/40">Public Status</span>
                                                <button
                                                    onClick={() => setForm({ ...form, isPublic: !form.isPublic })}
                                                    className={`relative h-5 w-10 rounded-full transition-all ${form.isPublic ? 'bg-brand-gold' : 'bg-brand-gray-800'}`}
                                                >
                                                    <div className={`absolute top-1 h-3 w-3 rounded-full bg-brand-dark transition-all ${form.isPublic ? 'right-1' : 'left-1'}`} />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="relative">
                                            <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                                            <input
                                                type="number"
                                                placeholder="0.00"
                                                className="h-14 w-full rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-foreground outline-none focus:border-brand-gold/50"
                                                value={form.purchaseAmount}
                                                onChange={(e) => setForm({ ...form, purchaseAmount: e.target.value })}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Upload Imagery</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            {form.images.map((file, i) => (
                                                <div key={i} className="group relative aspect-video overflow-hidden rounded-xl border border-white/10">
                                                    <img src={URL.createObjectURL(file)} className="h-full w-full object-cover" />
                                                    <button
                                                        onClick={() => setForm({ ...form, images: form.images.filter((_, idx) => idx !== i) })}
                                                        className="absolute right-2 top-2 rounded-full bg-brand-dark/80 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            ))}
                                            <div className="group relative flex aspect-video flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-brand-gray-900/50 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-900">
                                                <Upload className="mb-2 text-brand-gold transition-transform group-hover:-translate-y-1" size={24} />
                                                <p className="px-4 text-center text-[10px] font-bold uppercase tracking-wider text-foreground/40">Add Photos</p>
                                                <input
                                                    type="file"
                                                    multiple
                                                    className="absolute inset-0 cursor-pointer opacity-0"
                                                    onChange={(e) => {
                                                        if (e.target.files) {
                                                            setForm({ ...form, images: [...form.images, ...Array.from(e.target.files)] });
                                                        }
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Asset Presentation deprecated */}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                        <button
                            onClick={prevStep}
                            className={`flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-all ${step === 1 ? "pointer-events-none opacity-0" : "text-foreground/40 hover:text-foreground"
                                }`}
                        >
                            <ChevronLeft size={20} />
                            Back
                        </button>

                        <button
                            onClick={step === 2 ? handleComplete : nextStep}
                            disabled={isGenerating}
                            className={`flex items-center gap-2 rounded-xl bg-brand-gold px-8 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-gold/20 transition-all hover:translate-x-1 ${isGenerating ? 'opacity-50 cursor-wait' : ''
                                }`}
                        >
                            {step === 2 ? (isGenerating ? "Finalizing..." : "Complete Intake") : "Next Segment"}
                            {step !== 2 && <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
