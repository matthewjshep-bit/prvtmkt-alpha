"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
    UserPlus,
    Building2,
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Mail,
    Lock,
    AtSign,
    Palette
} from "lucide-react";

export default function SignupPage() {
    const { signup } = useData();
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        firmName: "",
        firmSlug: "",
        primaryColor: "#ffffff"
    });

    const updateFormData = (fields: Partial<typeof formData>) => {
        setFormData(prev => ({ ...prev, ...fields }));
    };

    const handleSignup = async () => {
        setIsLoading(true);
        try {
            const result = await signup(
                { email: formData.email, password: formData.password, firmId: "", role: "FIRM_ADMIN" },
                { name: formData.firmName, slug: formData.firmSlug, primaryColor: formData.primaryColor, logoUrl: "" }
            );
            if (result) {
                setStep(3);
                setTimeout(() => {
                    router.push(`/admin/${result.firm.slug || result.firm.id}`);
                }, 2000);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6 pt-20 pb-20">
            <div className="w-full max-w-xl">
                {/* Progress Bar */}
                <div className="mb-12 flex items-center justify-between px-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex flex-1 items-center last:flex-none">
                            <div className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold transition-all ${step >= s ? "bg-brand-gold text-brand-dark" : "bg-brand-gray-900 text-foreground/20 border border-white/5"}`}>
                                {step > s ? <CheckCircle2 size={20} /> : s}
                            </div>
                            {s < 3 && (
                                <div className={`h-1 flex-1 mx-4 rounded-full transition-all ${step > s ? "bg-brand-gold" : "bg-brand-gray-900"}`} />
                            )}
                        </div>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-white mb-2">Create <span className="text-brand-gold">Account</span></h1>
                                <p className="text-foreground/40 italic">Create your administrative identity.</p>
                            </div>

                            <div className="glass rounded-[2rem] p-10 border border-white/5 shadow-2xl space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Professional Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                        <input
                                            required
                                            type="email"
                                            className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                            placeholder="alex@company.com"
                                            value={formData.email}
                                            onChange={(e) => updateFormData({ email: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Secure Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                        <input
                                            required
                                            type="password"
                                            className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                            placeholder="••••••••"
                                            value={formData.password}
                                            onChange={(e) => updateFormData({ password: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={() => setStep(2)}
                                    disabled={!formData.email || !formData.password}
                                    className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
                                >
                                    Define Firm Entity
                                    <ArrowRight size={18} />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-8"
                        >
                            <div className="text-center">
                                <h1 className="text-4xl font-bold text-white mb-2">Firm <span className="text-brand-gold">Details</span></h1>
                                <p className="text-foreground/40 italic">Set up your firm's digital presence.</p>
                            </div>

                            <div className="glass rounded-[2rem] p-10 border border-white/5 shadow-2xl space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Firm Name</label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                        <input
                                            required
                                            type="text"
                                            className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                            placeholder="ABC Capital"
                                            value={formData.firmName}
                                            onChange={(e) => updateFormData({ firmName: e.target.value, firmSlug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Portal URL Slug</label>
                                    <div className="relative group">
                                        <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                        <input
                                            required
                                            type="text"
                                            className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                            placeholder="blackstone"
                                            value={formData.firmSlug}
                                            onChange={(e) => updateFormData({ firmSlug: e.target.value })}
                                        />
                                    </div>
                                    <p className="text-[9px] text-foreground/20 uppercase tracking-widest pl-1">yourportal.com/firms/{formData.firmSlug || '...'}</p>
                                </div>



                                <div className="flex gap-4">
                                    <button
                                        onClick={() => setStep(1)}
                                        className="h-14 px-6 flex items-center justify-center rounded-xl border border-white/5 bg-brand-gray-900 text-white font-black uppercase tracking-widest text-xs transition-all hover:bg-white/5"
                                    >
                                        <ArrowLeft size={18} />
                                    </button>
                                    <button
                                        onClick={handleSignup}
                                        disabled={isLoading || !formData.firmName || !formData.firmSlug}
                                        className="flex-1 h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-[1.02] disabled:opacity-50"
                                    >
                                        {isLoading ? "Provisioning..." : (
                                            <>
                                                Initialize Portal
                                                <ArrowRight size={18} />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center space-y-8"
                        >
                            <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-brand-gold/10 border border-brand-gold/20 mb-4">
                                <CheckCircle2 className="text-brand-gold animate-bounce" size={48} />
                            </div>
                            <div>
                                <h1 className="text-4xl font-bold text-white mb-2">Portal <span className="text-brand-gold">Initialized</span></h1>
                                <p className="text-foreground/40 italic">Redirecting to your new firm dashboard...</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className="mt-8 text-center">
                    <p className="text-sm text-foreground/20 font-bold uppercase tracking-widest">
                        Already registered?{" "}
                        <Link href="/auth/login" className="text-brand-gold/60 hover:text-brand-gold transition-colors">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
