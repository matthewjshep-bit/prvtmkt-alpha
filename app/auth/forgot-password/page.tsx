"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSubmitted(true);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
            <div className="w-full max-w-md">
                <div className="mb-12 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20 mb-6">
                        <ShieldCheck className="text-brand-gold" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Reset <span className="text-brand-gold">Access</span></h1>
                    <p className="text-foreground/40 font-medium italic">Enter your email to receive a secure recovery link.</p>
                </div>

                <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Registered Email</label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                    <input
                                        required
                                        type="email"
                                        className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                        placeholder="name@firm.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? "Sending Link..." : "Send Recovery Link"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 border border-green-500/20 mb-6">
                                <CheckCircle2 className="text-green-500" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Email Sent</h3>
                            <p className="text-foreground/40 text-sm font-medium leading-relaxed">
                                If an account exists for <span className="text-white font-bold">{email}</span>, you will receive a reset link shortly.
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-8 text-xs font-black uppercase tracking-widest text-brand-gold hover:underline"
                            >
                                Use a different email
                            </button>
                        </div>
                    )}

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-foreground/40 font-bold hover:text-white transition-colors">
                            <ArrowLeft size={16} />
                            Return to Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
