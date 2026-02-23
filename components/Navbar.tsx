"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useData } from "@/context/DataContext";
import { LayoutDashboard, Users, PlusCircle, Globe, ArrowLeft } from "lucide-react";

export default function Navbar() {
    const pathname = usePathname();
    const { firms } = useData();

    const isWhiteLabelPath = pathname?.startsWith("/firms/");
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
                <div className="container mx-auto flex h-16 items-center justify-between px-6">
                    <Link href={`/firms/${currentFirm.slug || currentFirm.id}`} className="flex items-center gap-3">
                        {currentFirm.logoUrl ? (
                            <img src={currentFirm.logoUrl} alt={currentFirm.name} className="h-8 object-contain" />
                        ) : (
                            <span className="text-lg font-bold" style={{ color: currentFirm.fontColor || '#ffffff' }}>{currentFirm.name}</span>
                        )}
                    </Link>

                    <Link
                        href="/"
                        className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-all hover:opacity-80"
                        style={{
                            backgroundColor: currentFirm.primaryColor || '#c5a059',
                            color: currentFirm.backgroundColor || '#0a0a0a'
                        }}
                    >
                        <ArrowLeft size={14} />
                        Agency Home
                    </Link>
                </div>
            </nav>
        );
    }

    if (isWhiteLabelPath && (!currentFirm || currentFirm.showAgencyBranding !== false)) {
        // Continue showing standard navbar or hide it? 
        // User said: "Instead of rendering the full PRVT MKT header/sidebar, render a simplified Utility Header"
        // But the prompt also says: "If toggled ON, the standard PRVT MKT navigation remains visible."
    }

    // Default Agency Navbar
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-white/5 bg-brand-dark/80 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                <Link href="/" className="flex items-center">
                    <div className="relative h-12 w-48 transition-transform hover:scale-105">
                        <img
                            src="/master-logo.png"
                            alt="PRVT MKT Logo"
                            className="h-full w-full object-contain object-left"
                        />
                    </div>
                </Link>

                <div className="hidden items-center gap-8 md:flex">
                    <NavLink href="/" icon={<Globe size={18} />} label="Explore Firms" />
                    <NavLink href="/admin" icon={<LayoutDashboard size={18} />} label="Platform Admin" />
                    <NavLink href="/deals/new" icon={<PlusCircle size={18} />} label="System Intake" />
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden h-10 w-px bg-white/10 sm:block" />
                    <button className="flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-sm font-semibold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark">
                        <Users size={16} />
                        Member Login
                    </button>
                </div>
            </div>
        </nav>
    );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-2.5 text-sm font-medium text-foreground/60 transition-colors hover:text-brand-gold"
        >
            <span className="text-brand-gold/70">{icon}</span>
            {label}
        </Link>
    );
}
