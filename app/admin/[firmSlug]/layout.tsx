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
    Shield,
    ExternalLink,
    Globe
} from "lucide-react";

interface NavItem {
    label: string;
    href: string;
    icon: React.ReactNode;
    subItems?: { label: string; href: string }[];
}

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

    const navItems: NavItem[] = currentUser.role === "USER"
        ? [
            { label: "My Profile", href: `/admin/${firmSlug}/profile`, icon: <UserCircle size={18} /> },
            { label: "Firm Site", href: `/firms/${firmSlug}`, icon: <Globe size={18} /> },
        ]
        : [
            { label: "My Site", href: `/admin/${firmSlug}/mysite`, icon: <Globe size={18} /> },
            {
                label: "My Team",
                href: `/admin/${firmSlug}/people/gallery-editor`,
                icon: <Users size={18} />,
            },
            { label: "Deals", href: `/admin/${firmSlug}/deals`, icon: <Briefcase size={18} /> },
            { label: "Dashboard", href: `/admin/${firmSlug}/dashboard`, icon: <LayoutDashboard size={18} /> },
            { label: "Authorized Users", href: `/admin/${firmSlug}/users`, icon: <Shield size={18} /> },
        ];

    return (
        <div className="min-h-screen bg-brand-dark flex">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-brand-gray-900 border-r border-white/5 transition-transform duration-300 lg:relative lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex flex-col h-full p-6 relative">
                    {/* Persistent PRVT MKT Branding */}
                    <div className="px-6 py-8 flex items-center justify-between">
                        <Link href="/" className="block">
                            <img
                                src="/logo.svg"
                                alt="PRVT MKT"
                                className="h-12 w-auto brightness-200"
                            />
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-foreground/40 hover:text-white p-2">
                            <X size={24} />
                        </button>
                    </div>

                    <div className="flex-1 px-6 pb-6 overflow-y-auto">
                        <div className="flex flex-col gap-8">
                            {/* Individual Firm Branding - Increased Scale & Visibility */}
                            <div className="flex flex-col gap-2 group/brand p-2">
                                <Link href={`/firms/${firm.slug}`} className="flex items-center gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-brand-dark/50 border border-white/10 p-2 shadow-inner group-hover/brand:border-brand-gold/30 transition-all">
                                        {firm.logoUrl ? (
                                            <img src={firm.logoUrl} alt={firm.name} className="h-full w-full object-contain" />
                                        ) : (
                                            <Building2 size={32} className="text-brand-gold" />
                                        )}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-black text-brand-gold tracking-[0.1em] uppercase leading-tight group-hover/brand:text-white transition-colors">
                                            {firm.name}
                                        </span>
                                        <span className="text-[10px] font-bold text-foreground/30 uppercase tracking-widest mt-0.5">
                                            {currentUser.role === "SYSTEM_ADMIN" ? "System Admin" :
                                                currentUser.role === "FIRM_ADMIN" ? "Firm Admin" :
                                                    "Standard User"}
                                        </span>
                                    </div>
                                </Link>
                                <Link
                                    href={`/firms/${firm.slug}`}
                                    className="flex items-center gap-1.5 ml-24 text-[10px] font-black uppercase tracking-widest text-brand-gold/60 hover:text-brand-gold transition-colors"
                                >
                                    <ExternalLink size={10} />
                                    View Site
                                </Link>
                            </div>

                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname === item.href || (item.subItems && pathname.startsWith(item.href));
                                    const hasSubItems = item.subItems && item.subItems.length > 0;

                                    return (
                                        <div key={item.label} className="flex flex-col gap-1">
                                            <Link
                                                href={hasSubItems ? item.subItems![0].href : item.href}
                                                className={`flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-bold transition-all ${isActive ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/10" : "text-foreground/40 hover:bg-white/5 hover:text-white"}`}
                                            >
                                                {item.icon}
                                                {item.label}
                                            </Link>

                                            {item.subItems && hasSubItems && isActive && (
                                                <div className="ml-12 flex flex-col gap-1 mt-1 border-l border-white/5 pl-4">
                                                    {item.subItems.map(subItem => {
                                                        const isSubActive = pathname === subItem.href;
                                                        return (
                                                            <Link
                                                                key={subItem.label}
                                                                href={subItem.href}
                                                                className={`py-2 text-xs font-bold transition-all ${isSubActive ? "text-brand-gold" : "text-foreground/40 hover:text-white"}`}
                                                            >
                                                                {subItem.label}
                                                            </Link>
                                                        );
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <div className="flex items-center gap-3 mb-6 px-2">
                            <div className="h-10 w-10 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center">
                                <UserCircle size={24} className="text-brand-gold" />
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="text-xs font-bold text-white truncate">{currentUser.email}</p>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60">
                                    {currentUser.role === "SYSTEM_ADMIN" ? "System Admin" :
                                        currentUser.role === "FIRM_ADMIN" ? "Firm Admin" :
                                            "Standard User"}
                                </p>
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
