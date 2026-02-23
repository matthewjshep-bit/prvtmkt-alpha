"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, CheckCircle2, ChevronRight, ChevronLeft, Image as ImageIcon, Video, DollarSign, MapPin } from "lucide-react";

export default function IntakeFormPage() {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        address: "",
        assetType: "INDUSTRIAL",
        strategy: "BUY_AND_HOLD",
        purchaseAmount: "",
        isPublic: true,
        stillImage: null as File | null,
    });

    const nextStep = () => setStep((s) => Math.min(s + 1, 3));
    const prevStep = () => setStep((s) => Math.max(s - 1, 1));

    return (
        <div className="min-h-screen bg-brand-dark pt-32 pb-20">
            <div className="container mx-auto max-w-2xl px-6">
                {/* Progress bar */}
                <div className="mb-12 flex items-center justify-between">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${step >= s
                                        ? "border-brand-gold bg-brand-gold text-brand-dark"
                                        : "border-white/10 bg-brand-gray-900 text-foreground/30"
                                    }`}
                            >
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </div>
                            {s < 3 && (
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
                                        <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Property Address</label>
                                        <div className="relative">
                                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-gold" size={18} />
                                            <input
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
                                        <div className="group relative flex h-40 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/10 bg-brand-gray-900/50 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-900">
                                            <Upload className="mb-2 text-brand-gold transition-transform group-hover:-translate-y-1" size={32} />
                                            <p className="text-sm font-medium text-foreground/60">Drag and drop or click to upload</p>
                                            <p className="text-[10px] text-foreground/30 mt-1 uppercase tracking-wider font-bold">PNG, JPG up to 10MB</p>
                                            <input type="file" className="absolute inset-0 cursor-pointer opacity-0" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div
                                key="step3"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <h2 className="text-3xl font-bold text-foreground">Asset Presentation</h2>
                                <div className="space-y-6">
                                    <div className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-6">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-brand-dark">
                                                <Video size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-bold text-foreground">AI Video Generator</h4>
                                                <p className="text-sm text-foreground/50">Generate a cinematic fly-through video for this asset.</p>
                                            </div>
                                        </div>
                                        <button className="mt-4 w-full rounded-xl bg-brand-gold py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20">
                                            Generate Asset Video
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-gray-900 p-4">
                                        <ImageIcon className="text-brand-gold" size={20} />
                                        <div className="flex-1">
                                            <p className="text-sm font-bold text-foreground">Digital Tombstone Ready</p>
                                            <p className="text-xs text-foreground/50">Your asset presentation is being prepared.</p>
                                        </div>
                                        <CheckCircle2 className="text-green-500" size={20} />
                                    </div>
                                </div>
                            </motion.div>
                        )}
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
                            onClick={step === 3 ? undefined : nextStep}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-8 py-3 text-sm font-bold text-brand-dark shadow-lg shadow-brand-gold/20 transition-all hover:translate-x-1"
                        >
                            {step === 3 ? "Complete Intake" : "Next Segment"}
                            {step !== 3 && <ChevronRight size={20} />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
