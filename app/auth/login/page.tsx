"use client";

import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";

export default function LoginPage() {
    const { login } = useData();
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const success = await login(email, password);
            if (success) {
                router.push("/admin");
            } else {
                setError("Invalid credentials. Please try again.");
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
            <div className="w-full max-w-md">
                <div className="mb-12 text-center">
                    <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold/10 border border-brand-gold/20 mb-6">
                        <ShieldCheck className="text-brand-gold" size={32} />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-2">Welcome <span className="text-brand-gold">Back</span></h1>
                    <p className="text-foreground/40 font-medium italic">Enter your credentials to access your firm dashboard.</p>
                </div>

                <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Email Address</label>
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

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Secure Password</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                <input
                                    required
                                    type="password"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
                        >
                            {isLoading ? "Authenticating..." : (
                                <>
                                    Access Portal
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center flex flex-col gap-4">
                        <Link href="/auth/forgot-password" className="text-sm text-brand-gold/60 hover:text-brand-gold transition-colors font-bold">
                            Forgot Password?
                        </Link>
                        <p className="text-sm text-foreground/40 font-bold">
                            Don't have a firm account?{" "}
                            <Link href="/auth/signup" className="text-brand-gold hover:underline">Register Firm</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
