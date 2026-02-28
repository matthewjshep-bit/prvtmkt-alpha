"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Lock, ArrowLeft, ShieldCheck, CheckCircle2, Eye, EyeOff } from "lucide-react";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!token) {
            setError("Invalid or missing recovery token.");
        }
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token, newPassword: password })
            });

            if (res.ok) {
                setIsSubmitted(true);
                setTimeout(() => {
                    router.push('/auth/login');
                }, 3000);
            } else {
                const data = await res.json();
                setError(data.error || "Failed to reset password.");
            }
        } catch (err) {
            setError("An unexpected network error occurred.");
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
                    <h1 className="text-4xl font-bold text-white mb-2">New <span className="text-brand-gold">Security</span></h1>
                    <p className="text-foreground/40 font-medium italic">Define your new access credentials.</p>
                </div>

                <div className="glass rounded-[2rem] p-8 md:p-10 border border-white/5 shadow-2xl">
                    {!isSubmitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-widest text-center">
                                    {error}
                                </div>
                            )}

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-12 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/20 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Confirm New Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold transition-colors" size={18} />
                                    <input
                                        required
                                        type={showPassword ? "text" : "password"}
                                        className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading || !token}
                                className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:grayscale"
                            >
                                {isLoading ? "Updating Security..." : "Complete Password Reset"}
                            </button>
                        </form>
                    ) : (
                        <div className="text-center py-4 animate-in fade-in zoom-in duration-500">
                            <div className="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-green-500/10 border border-green-500/20 mb-6">
                                <CheckCircle2 className="text-green-500" size={40} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">Password Updated</h3>
                            <p className="text-foreground/40 text-sm font-medium leading-relaxed">
                                Your security credentials have been updated. Redirecting to login...
                            </p>
                        </div>
                    )}

                    {!isSubmitted && (
                        <div className="mt-8 pt-8 border-t border-white/5 text-center">
                            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-foreground/40 font-bold hover:text-white transition-colors">
                                <ArrowLeft size={16} />
                                Return to Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold border-t-transparent" />
            </div>
        }>
            <ResetPasswordContent />
        </Suspense>
    );
}
