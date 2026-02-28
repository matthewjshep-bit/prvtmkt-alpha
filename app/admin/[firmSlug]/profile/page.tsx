"use client";

import { useData, TeamMember, Deal } from "@/context/DataContext";
import {
    UserCircle,
    Shield,
    Mail,
    Linkedin,
    Phone,
    Camera,
    Video,
    Check,
    ExternalLink,
    AlertCircle,
    Building2,
    Award,
    VolumeX,
    Volume2,
    Briefcase,
    LayoutGrid,
    Search,
    Tag
} from "lucide-react";
import { useParams } from "next/navigation";
import { useState, useRef, useMemo } from "react";
import Link from "next/link";
import DealCard from "@/components/DealCard";

export default function MyProfilePage() {
    const { currentUser, teamMembers, firms, deals, updateTeamMember, isInitialized } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const portraitRef = useRef<HTMLInputElement>(null);
    const heroRef = useRef<HTMLInputElement>(null);
    const [isMuted, setIsMuted] = useState(true);

    // 1. Find the associated profile
    const myProfile = teamMembers.find(m => m.userId === currentUser?.id);
    const firm = firms.find(f => f.slug === firmSlug);

    // 2. Filter associates deals
    const myDeals = useMemo(() => {
        if (!myProfile) return [];
        return deals.filter(d => (d.teamMemberIds || []).includes(myProfile.id));
    }, [deals, myProfile]);

    const handleSave = async (updates: Partial<TeamMember>) => {
        if (!myProfile) return;
        setSaveStatus('saving');
        const success = await updateTeamMember(myProfile.id, updates);
        if (success) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } else {
            setSaveStatus('idle');
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                handleSave({ [field]: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    const isVideo = (url: string | undefined) => {
        if (!url) return false;
        return url.startsWith('data:video/') || url.toLowerCase().includes('.mp4') || url.toLowerCase().includes('.mov');
    };

    // Theme logic from public profile
    const themeStyles = useMemo(() => ({
        '--firm-bg': firm?.backgroundColor || '#0a0a0a',
        '--firm-text': firm?.fontColor || '#ffffff',
        '--firm-primary': firm?.primaryColor || '#ffffff',
        '--firm-secondary': firm?.accentColor || '#f5f5f5',
    } as React.CSSProperties), [firm]);

    if (!isInitialized) {
        return (
            <div className="flex h-screen items-center justify-center bg-brand-dark">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    if (!myProfile) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-6">
                <div className="glass rounded-[3rem] border border-white/5 bg-brand-gray-900/30 p-12 text-center flex flex-col items-center gap-8">
                    <div className="h-24 w-24 rounded-full bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold mb-4">
                        <AlertCircle size={48} />
                    </div>
                    <h1 className="text-4xl font-black text-white uppercase tracking-tight">Identity Disconnected</h1>
                    <p className="text-foreground/40 font-medium max-w-lg leading-relaxed">
                        Please contact your administrator to link your account to a professional profile.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-[calc(100vh-6rem)] -m-6 lg:-m-12 overflow-hidden bg-brand-dark">
            {/* Header Identity Bar - Shared top bar */}
            <div className="h-24 bg-brand-gray-900/50 border-b border-white/5 px-12 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">My <span className="text-brand-gold">Professional Profile</span></h1>
                    <div className="h-6 w-px bg-white/10" />
                    <div className="flex items-center gap-3">
                        {saveStatus === 'saving' ? (
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-brand-gold animate-pulse">
                                <div className="h-3 w-3 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
                                Synchronizing...
                            </div>
                        ) : saveStatus === 'saved' ? (
                            <div className="flex items-center gap-2 text-[10px] font-black uppercase text-green-500">
                                <Check size={14} />
                                Registry Updated
                            </div>
                        ) : (
                            <div className="text-[10px] font-black uppercase text-white/20">All changes autosave</div>
                        )}
                    </div>
                </div>
                <Link
                    href={`/team/${myProfile.slug}`}
                    className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-all"
                >
                    <ExternalLink size={14} />
                    View Live Site
                </Link>
            </div>

            <div className="flex-1 flex overflow-hidden">
                {/* LEFT: PUBLIC PREVIEW */}
                <div className="w-[55%] border-r border-white/5 overflow-y-auto custom-scrollbar bg-black p-12 pb-24">
                    <div className="mb-8 flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/40">Live Layout Preview</span>
                        <span className="text-[10px] font-bold text-white/20 italic">Scale: Rendering at 100% Reality</span>
                    </div>

                    {/* Rendering the Profile Component Look */}
                    <div
                        className="rounded-[3rem] overflow-hidden transition-all duration-500 min-h-full"
                        style={{ ...themeStyles, backgroundColor: 'var(--firm-bg)', color: 'var(--firm-text)' }}
                    >
                        <div className="p-12">
                            {/* Profile Header Block */}
                            <div className="flex items-start gap-10 mb-12">
                                <div className="relative shrink-0">
                                    <div className="h-44 w-44 overflow-hidden rounded-[2.5rem] border-4 border-white/5 shadow-2xl bg-brand-gray-900">
                                        <img src={myProfile.imageURL || ""} className="h-full w-full object-cover" />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 h-12 w-12 rounded-[1.2rem] flex items-center justify-center shadow-2xl" style={{ backgroundColor: 'var(--firm-primary)', color: 'var(--firm-bg)' }}>
                                        <Award size={24} />
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <h2 className="text-5xl font-black tracking-tight mb-2" style={{ color: 'var(--firm-text)' }}>
                                        {myProfile.name}
                                    </h2>
                                    <div className="flex items-center gap-4">
                                        <span className="text-xl font-bold" style={{ color: 'var(--firm-primary)' }}>{myProfile.role}</span>
                                        {firm && <span className="text-xl font-bold opacity-40">{firm.name}</span>}
                                    </div>
                                </div>
                            </div>

                            {/* Bio Narrative Preview */}
                            <div
                                className="text-lg leading-relaxed opacity-70 max-w-2xl mb-12"
                                dangerouslySetInnerHTML={{ __html: myProfile.bio || "No narrative established yet..." }}
                            />

                            {/* Hero Media Preview */}
                            {myProfile.heroMediaUrl && (
                                <div className="rounded-[2.5rem] overflow-hidden bg-black/5 border border-black/5 shadow-2xl mb-12 relative aspect-[21/9]">
                                    {isVideo(myProfile.heroMediaUrl) ? (
                                        <video src={myProfile.heroMediaUrl} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                                    ) : (
                                        <img src={myProfile.heroMediaUrl} className="h-full w-full object-cover" />
                                    )}
                                </div>
                            )}

                            {/* Connectivity Bar Preview */}
                            <div className="flex flex-wrap gap-4 mb-20">
                                <div className="px-6 py-3 rounded-xl font-bold text-sm bg-[var(--firm-primary)] text-[var(--firm-bg)] flex items-center gap-2">
                                    <Mail size={16} /> Contact Email
                                </div>
                                {myProfile.linkedInUrl && (
                                    <div className="px-6 py-3 rounded-xl font-bold text-sm border border-white/10 bg-white/5 flex items-center gap-2">
                                        <Linkedin size={16} /> LinkedIn
                                    </div>
                                )}
                                {myProfile.phoneNumber && (
                                    <div className="px-6 py-3 rounded-xl font-bold text-sm border border-white/10 bg-white/5 flex items-center gap-2">
                                        <Phone size={16} /> {myProfile.phoneNumber}
                                    </div>
                                )}
                            </div>

                            {/* Track Record Section */}
                            <div className="space-y-12">
                                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black tracking-tight uppercase" style={{ color: 'var(--firm-text)' }}>
                                        Track <span style={{ color: 'var(--firm-primary)' }}>Record</span>
                                    </h2>
                                    <p className="max-w-md text-sm font-medium leading-relaxed opacity-40">
                                        Verified execution and high-performance asset management associated with this professional.
                                    </p>
                                </div>

                                <div className="grid gap-8">
                                    {myDeals.length > 0 ? (
                                        myDeals.map((deal, idx) => (
                                            <DealCard
                                                key={deal.id}
                                                deal={deal as any}
                                                index={idx}
                                                isListView={true}
                                            />
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center rounded-[3rem] border border-dashed border-white/10 bg-white/[0.02] p-24 text-center">
                                            <Briefcase size={40} className="text-white/10 mb-6" />
                                            <h3 className="text-2xl font-black text-white/80 uppercase">No deals assigned</h3>
                                            <p className="mt-2 text-sm font-medium text-white/30">Contact your administrator to link completed deals to your profile.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: MANAGE PROFILE */}
                <div className="w-[45%] overflow-y-auto custom-scrollbar bg-brand-gray-900/30 p-12">
                    <div className="space-y-12 max-w-2xl">
                        {/* 1. Identity Form Section */}
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-black text-white uppercase tracking-tight mb-2">Registry Essentials</h3>
                                <p className="text-xs font-medium text-white/30 uppercase tracking-widest">Core personal and role-based data</p>
                            </div>

                            <div className="grid grid-cols-[160px_1fr] gap-8 items-start">
                                <div className="relative group/photo">
                                    <div className="h-40 w-40 rounded-[2.5rem] border-2 border-brand-gold/30 overflow-hidden bg-brand-dark cursor-pointer group-hover/photo:border-brand-gold transition-all" onClick={() => portraitRef.current?.click()}>
                                        <img src={myProfile.imageURL || ""} className="h-full w-full object-cover" />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/photo:opacity-100 flex items-center justify-center transition-all">
                                            <Camera size={24} className="text-white" />
                                        </div>
                                    </div>
                                    <input ref={portraitRef} type="file" hidden accept="image/*" onChange={(e) => handleImageUpload(e, 'imageURL')} />
                                </div>

                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Visible Public Name</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={myProfile.name}
                                            onChange={(e) => handleSave({ name: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Professional Role</label>
                                        <input
                                            type="text"
                                            className="w-full h-14 bg-black/40 border border-white/5 rounded-2xl px-6 text-sm font-bold text-brand-gold outline-none focus:border-brand-gold transition-all"
                                            value={myProfile.role}
                                            onChange={(e) => handleSave({ role: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. Narrative Bio Section */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between ml-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Professional Narrative</label>
                                <span className="text-[10px] font-bold text-brand-gold/60 uppercase tracking-widest italic">HTML Supported</span>
                            </div>
                            <textarea
                                className="w-full h-64 bg-black/40 border border-white/5 rounded-[2rem] p-8 text-sm font-medium text-white/80 outline-none focus:border-brand-gold/40 transition-all resize-none custom-scrollbar leading-relaxed"
                                placeholder="Your professional journey..."
                                value={myProfile.bio || ""}
                                onChange={(e) => handleSave({ bio: e.target.value })}
                            />
                        </div>

                        {/* 3. Media Portfolio section */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20 ml-1">Hero Portfolio Media</label>
                            <div
                                className="relative aspect-[3/1] rounded-[2rem] bg-black/40 border border-white/5 overflow-hidden group/hero cursor-pointer hover:border-brand-gold/40 transition-all flex items-center justify-center"
                                onClick={() => heroRef.current?.click()}
                            >
                                {myProfile.heroMediaUrl ? (
                                    <img src={myProfile.heroMediaUrl} className="absolute inset-0 h-full w-full object-cover opacity-40" />
                                ) : (
                                    <div className="flex flex-col items-center gap-2 opacity-20">
                                        <Video size={24} />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white">Upload Narrative Media</span>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-brand-gold/20 opacity-0 group-hover/hero:opacity-100 flex items-center justify-center transition-all bg-black/60">
                                    <Camera size={24} className="text-white" />
                                </div>
                            </div>
                            <input ref={heroRef} type="file" hidden accept="image/*,video/*" onChange={(e) => handleImageUpload(e, 'heroMediaUrl')} />
                        </div>

                        {/* 4. Connectivity section */}
                        <div className="space-y-6">
                            <h3 className="text-lg font-black text-white uppercase tracking-tight">Market Connectivity</h3>
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 h-14 bg-black/40 border border-white/5 rounded-2xl px-6 focus-within:border-brand-gold/40 transition-all">
                                    <Mail size={18} className="text-brand-gold/40" />
                                    <input
                                        type="email"
                                        className="bg-transparent border-none outline-none w-full text-sm font-bold text-white"
                                        placeholder="professional@firm.com"
                                        value={myProfile.email || ""}
                                        onChange={(e) => handleSave({ email: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center gap-4 h-14 bg-black/40 border border-white/5 rounded-2xl px-6 focus-within:border-brand-gold/40 transition-all">
                                    <Linkedin size={18} className="text-brand-gold/40" />
                                    <input
                                        type="text"
                                        className="bg-transparent border-none outline-none w-full text-sm font-bold text-white"
                                        placeholder="linkedin.com/in/username"
                                        value={myProfile.linkedInUrl || ""}
                                        onChange={(e) => handleSave({ linkedInUrl: e.target.value })}
                                    />
                                </div>
                                <div className="flex items-center gap-4 h-14 bg-black/40 border border-white/5 rounded-2xl px-6 focus-within:border-brand-gold/40 transition-all">
                                    <Phone size={18} className="text-brand-gold/40" />
                                    <input
                                        type="text"
                                        className="bg-transparent border-none outline-none w-full text-sm font-bold text-white"
                                        placeholder="Direct Phone Line"
                                        value={myProfile.phoneNumber || ""}
                                        onChange={(e) => handleSave({ phoneNumber: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Support footer */}
                        <div className="p-8 rounded-[2.5rem] bg-brand-gold/5 border border-brand-gold/20 flex gap-6 items-start">
                            <Shield className="text-brand-gold shrink-0 mt-1" size={20} />
                            <div>
                                <h4 className="font-black text-white text-[10px] uppercase tracking-tight mb-2">Enterprise Governance</h4>
                                <p className="text-[10px] font-medium text-white/30 leading-relaxed uppercase">
                                    Changes are audited and stored in the secure registry. Contact support for identity re-assignment.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
