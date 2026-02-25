"use client";

import { useData } from "@/context/DataContext";
import { useRouter, useParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState, use } from "react";
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    UserCircle,
    Shield
} from "lucide-react";

export default function TenantAdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { currentUser, firms, logout, isInitialized } = useData();
    const router = useRouter();
    const params = useParams();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    useEffect(() => {
        if (isInitialized && !currentUser) {
            router.push("/auth/login");
            return;
        }
        // Basic Tenant Guard - Skip if God Mode (SYSTEM_ADMIN)
        if (isInitialized && currentUser && currentUser.role !== "SYSTEM_ADMIN") {
            const userFirm = firms.find(f => f.id === currentUser.firmId);
            // If admin belongs to a firm, they can only see their own firm's admin page
            // UNLESS they are a system admin (handled by the role check above)
            if (userFirm && userFirm.slug !== firmSlug) {
                router.push(`/admin/${userFirm.slug}`);
            }
        }
    }, [currentUser, isInitialized, firmSlug, firms, router]);

    if (!isInitialized || !firm || !currentUser) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    const navItems = [
        { label: "Dashboard", icon: <LayoutDashboard size={20} />, href: `/admin/${firmSlug}` },
        { label: "Firm Deals", icon: <Briefcase size={20} />, href: `/admin/${firmSlug}/deals` },
        { label: "Firm People", icon: <Users size={20} />, href: `/admin/${firmSlug}/people` },
        { label: "Manage Users", icon: <Shield size={20} />, href: `/admin/${firmSlug}/users` },
        { label: "Firm Settings", icon: <Settings size={20} />, href: `/admin/${firmSlug}/settings` },
    ];

    return (
        <div className="min-h-screen bg-brand-dark flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-gray-900 border-r border-white/5 transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full p-6">
                    <div className="mb-0 flex items-center justify-between">
                        <Link href={`/firms/${firm.slug}`} className="flex items-center gap-4 group/brand">
                            <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-2xl bg-brand-dark/50 border border-white/10 p-2 shadow-inner group-hover/brand:border-brand-gold/30 transition-all">
                                {firm.logoUrl ? (
                                    <img src={firm.logoUrl} alt={firm.name} className="h-full w-full object-contain" />
                                ) : (
                                    <Building2 size={24} className="text-brand-gold" />
                                )}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-xs font-black text-brand-gold tracking-[0.2em] uppercase leading-tight group-hover/brand:text-white transition-colors">
                                    {firm.name}
                                </span>
                                <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">
                                    Admin Portal
                                </span>
                            </div>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-foreground/40 hover:text-white p-2">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent my-8" />

                    <nav className="flex-1 space-y-2">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={`flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/10" : "text-foreground/40 hover:bg-white/5 hover:text-white"}`}
                                >
                                    {item.icon}
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="h-10 w-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                                <UserCircle size={24} className="text-brand-gold" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">{currentUser.email}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60">{currentUser.role}</p>
                            </div>
                        </div>
                        <button
                            onClick={logout}
                            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500/60 hover:bg-red-500/5 hover:text-red-500 transition-all"
                        >
                            <LogOut size={20} />
                            Logout Session
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 min-h-screen overflow-y-auto">
                <header className="h-20 lg:h-0 flex items-center px-6 lg:hidden border-b border-white/5">
                    <button onClick={() => setIsSidebarOpen(true)} className="text-foreground/40">
                        <Menu size={24} />
                    </button>
                </header>
                <div className="p-6 lg:p-12">
                    {children}
                </div>
            </main>
        </div>
    );
}
