"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import DealCard from "@/components/DealCard";
import { Mail, Briefcase, Award, Building2, ChevronLeft, Linkedin, Phone } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function TeamMemberPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { teamMembers, deals, firms, isInitialized } = useData();
    const { slug } = use(params);

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    // Improved lookup: try slug first, then ID
    const member = teamMembers.find((m) => m.slug === slug) || teamMembers.find((m) => m.id === slug);

    if (!isInitialized) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    if (!member) {
        return (
            <div className="min-h-screen bg-brand-dark pt-32 pb-20 flex flex-col items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">Profile Not Found</h1>
                    <p className="text-foreground/50 mb-8">The professional profile you're looking for doesn't exist or has been moved.</p>
                    <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20">
                        <ChevronLeft size={18} />
                        Return to Team
                    </Link>
                </div>
            </div>
        );
    }

    const memberDeals = deals.filter((d) => (d.teamMemberIds || []).includes(member.id));
    const firm = firms.find(f => (member.firmIds || []).includes(f.id)); // Use first associated firm for branding

    // Dynamic Theming Inheritance
    const themeStyles = {
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.primaryColor || '#c5a059',
        '--firm-secondary': firm?.secondaryColor || '#f5f5f5',
    } as React.CSSProperties;

    return (
        <div
            className="min-h-screen pt-24 pb-20 transition-colors duration-500"
            style={{
                ...themeStyles,
                backgroundColor: 'var(--firm-bg)',
                color: 'var(--firm-text)'
            }}
        >
            <div className="container mx-auto px-6">
                {/* Back Button Utility */}
                <div className="mb-8">
                    <Link
                        href={firm ? `/firms/${firm.slug || firm.id}` : "/"}
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-40 hover:opacity-100 transition-all"
                        style={{ color: 'var(--firm-text)' }}
                    >
                        <ChevronLeft size={16} />
                        {firm ? `Back to ${firm.name}` : 'Back to Team'}
                    </Link>
                </div>

                {/* Profile Header */}
                <div className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start">
                    <div className="relative">
                        <div className="h-48 w-48 overflow-hidden rounded-3xl border-4 bg-brand-gray-900 shadow-2xl" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                            {member.imageURL ? (
                                <img
                                    src={member.imageURL}
                                    alt={member.name}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full w-full items-center justify-center text-4xl font-bold opacity-20">
                                    {member.name.charAt(0)}
                                </div>
                            )}
                        </div>
                        <div className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-xl shadow-xl" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                            <Award size={24} />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <div className="mb-4">
                            <h1 className="mb-2 text-4xl font-bold tracking-tight md:text-5xl" style={{ color: 'var(--firm-text)' }}>
                                {member.name}
                            </h1>
                            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:justify-start">
                                <p className="text-xl font-medium" style={{ color: 'var(--firm-primary)' }}>{member.role}</p>
                                {firm && (
                                    <div className="flex items-center gap-1.5 text-xl font-medium opacity-40">
                                        <Building2 size={20} />
                                        {firm.name}
                                    </div>
                                )}
                            </div>
                        </div>

                        <p className="mb-8 max-w-2xl text-lg leading-relaxed opacity-70">
                            {member.bio || `Principal professional with a specialization in high-value commercial real estate transactions and asset management.`}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                            <a
                                href={`mailto:${member.email || "#"}`}
                                className="flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all hover:opacity-80"
                                style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}
                            >
                                <Mail size={18} />
                                Contact Email
                            </a>
                            {member.linkedInUrl && (
                                <a
                                    href={member.linkedInUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]"
                                >
                                    <Linkedin size={18} />
                                    LinkedIn Profile
                                </a>
                            )}
                            {member.phoneNumber && (
                                <a
                                    href={`tel:${member.phoneNumber}`}
                                    className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold transition-all hover:bg-[var(--firm-primary)] hover:text-[var(--firm-bg)]"
                                >
                                    <Phone size={18} />
                                    {member.phoneNumber}
                                </a>
                            )}
                            <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 text-sm font-bold">
                                <Briefcase size={18} style={{ color: 'var(--firm-primary)' }} />
                                <span className="opacity-60">{memberDeals.length} Deals Completed</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Track Record Grid */}
                <div>
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-3xl font-bold text-white">Track <span className="text-brand-gold">Record</span></h2>
                            <p className="text-foreground/50">Exclusive digital tombstones for this professional</p>
                        </div>

                        <div className="flex gap-2">
                            <span className="rounded-full bg-brand-gold/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-gold border border-brand-gold/20">
                                Verified Execution
                            </span>
                        </div>
                    </div>

                    {memberDeals.length > 0 ? (
                        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {memberDeals.map((deal, index) => (
                                <DealCard key={deal.id} deal={deal} index={index} />
                            ))}
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-dashed border-white/10 p-20 text-center">
                            <Briefcase size={48} className="mx-auto mb-4 text-foreground/10" />
                            <h3 className="text-xl font-bold text-white mb-2">Portfolio Pending</h3>
                            <p className="text-foreground/40">This member hasn't published any digital tombstones yet.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
