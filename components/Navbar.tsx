"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";
import { LayoutDashboard, Users, PlusCircle, Globe, ArrowLeft } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { firms, currentUser, logout } = useData();

    const isWhiteLabelPath = pathname?.startsWith("/firms/");
    const isTenantAdminPath = pathname?.startsWith("/admin/") && pathname.split("/").length > 2 && pathname.split("/")[2] !== "firms" && pathname.split("/")[2] !== "deals" && pathname.split("/")[2] !== "people";

    if (isTenantAdminPath) return null;

    const firmSlugOrId = isWhiteLabelPath ? pathname.split("/")[2] : null;
    const currentFirm = firms.find(f => f.id === firmSlugOrId || f.slug === firmSlugOrId);

    const isWhiteLabelActive = isWhiteLabelPath && currentFirm?.showAgencyBranding === false;

    if (isWhiteLabelActive) {
        return (
            <nav
                className="fixed top-0 z-50 w-full border-b border-white/5 backdrop-blur-md transition-colors"
                style={{
                    backgroundColor: `${currentFirm.backgroundColor || '#0a0a0a'}e6`,
                    borderColor: 'rgba(255,255,255,0.05)'
                }}
            >
                <div className="container mx-auto flex h-20 items-center justify-between px-6">
                    <Link href={`/firms/${currentFirm.slug || currentFirm.id}`} className="flex items-center gap-4">
                        {currentFirm.logoUrl ? (
                            <img src={currentFirm.logoUrl} alt={currentFirm.name} className="h-12 object-contain" />
                        ) : (
                            <span className="text-2xl font-black uppercase tracking-widest" style={{ color: currentFirm.fontColor || '#ffffff' }}>{currentFirm.name}</span>
                        )}
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all hover:scale-105"
                        style={{
                            backgroundColor: currentFirm.primaryColor || '#ffffff',
                            color: currentFirm.backgroundColor || '#0a0a0a'
                        }}
                    >
                        <ArrowLeft size={16} />
                        Return Home
                    </Link>
                </div>
            </nav>
        );
    }

    // Default Agency Navbar
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link href="/" className="flex items-center group">
                    <div className="relative h-20 w-80 overflow-hidden transition-transform duration-500 group-hover:scale-105 flex items-center justify-center">
                        <img
                            src="/logo.svg"
                            alt="PRVT MKT Logo"
                            className="h-full w-full object-contain scale-[1.3] brightness-200"
                        />
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <NavLink href="/" icon={<Globe size={18} />} label="Explore Firms" />
                    {currentUser?.role === 'SYSTEM_ADMIN' && (
                        <NavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Platform Admin" />
                    )}
                    {currentUser?.role === 'ADMIN' && currentUser.firmId && (
                        <NavLink
                            href={`/admin/${firms.find(f => f.id === currentUser.firmId)?.slug || ''}`}
                            icon={<LayoutDashboard size={18} />}
                            label="Firm Admin"
                        />
                    )}
                    <NavLink href="/deals/new" icon={<PlusCircle size={18} />} label="System Intake" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden h-10 w-px bg-white/10 sm:block" />
                    {currentUser ? (
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-bold text-foreground/40">{currentUser.email}</span>
                            <button
                                onClick={logout}
                                className="rounded-full border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground/60 transition-all hover:bg-white/5 hover:text-white"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link
                                href="/auth/login"
                                className="flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-brand-dark"
                            >
                                <Users size={16} />
                                Login
                            </Link>
                            <Link
                                href="/auth/signup"
                                className="rounded-full bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white/10"
                            >
                                Register Firm
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2.5 text-sm font-medium text-foreground/60 transition-colors hover:text-white"
        >
            <span className="text-white/70">{icon}</span>
            {label}
        </Link>
    );
}
