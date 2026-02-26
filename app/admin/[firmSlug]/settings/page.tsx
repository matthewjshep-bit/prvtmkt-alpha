"use client";

import { useState, useRef, useEffect } from "react";
import { useData } from "@/context/DataContext";
import { useParams } from "next/navigation";
import {
    Save,
    AtSign,
    Building2,
    Palette,
    FileText,
    ImageIcon,
    MapPin,
    Globe,
    ExternalLink,
    Shield,
    Upload,
    X,
    Volume2,
    VolumeX,
    Trash2,
    Check,
    Link as LinkIcon,
    Unlink,
    Type,
    Settings2
} from "lucide-react";
import RichTextEditor from "@/components/RichTextEditor";

export default function FirmSettingsPage() {
    const { firms, updateFirm } = useData();
    const params = useParams();
    const firmSlug = params.firmSlug as string;

    const firm = firms.find(f => f.slug === firmSlug);

    const [formData, setFormData] = useState({
        name: firm?.name || "",
        slug: firm?.slug || "",
        bio: firm?.bio || "",
        primaryColor: firm?.primaryColor || "#ffffff",
        backgroundColor: firm?.backgroundColor || "#0a0a0a",
        fontColor: firm?.fontColor || "#ffffff",
        accentColor: firm?.accentColor || "#151515",
        showAgencyBranding: firm?.showAgencyBranding ?? true,
        logoUrl: firm?.logoUrl || "",
        heroMediaUrl: firm?.heroMediaUrl || "",
        physicalAddress: firm?.physicalAddress || "",
        linkedInUrl: firm?.linkedInUrl || "",
        googleReviewsUrl: firm?.googleReviewsUrl || "",
        logoScale: firm?.logoScale || 100,
        borderRadius: (firm?.borderRadius as 'rounded' | 'square') || 'rounded',
        isColorLinked: firm?.isColorLinked ?? false,
        firmNameFontFamily: firm?.firmNameFontFamily || "Inter",
        firmNameFontWeight: firm?.firmNameFontWeight || "900",
        firmNameFontSize: firm?.firmNameFontSize || 72,
        bioFontFamily: firm?.bioFontFamily || "Inter",
        bioFontSize: firm?.bioFontSize || 18,
    });

    const [isMuted, setIsMuted] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleAudio = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        const nextMuted = !isMuted;
        setIsMuted(nextMuted);
        if (videoRef.current) {
            videoRef.current.muted = nextMuted;
            if (!nextMuted) {
                videoRef.current.volume = 1.0;
                videoRef.current.play().catch(err => console.error("Admin Unmute Error:", err));
            }
        }
    };

    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");

    if (!firm) return null;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setMessage("");

        try {
            updateFirm(firm.id, formData);
            setMessage("Settings updated successfully.");
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Failed to update settings.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-12">
                <h1 className="text-4xl font-bold text-white">Firm <span className="text-brand-gold">Settings</span></h1>
                <p className="mt-2 text-foreground/40 font-medium">Manage your platform identity and portal configurations.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
                {/* Branding Section */}
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                    <div className="px-10 py-6 border-b border-white/5 bg-white/2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                            <Palette size={18} className="text-brand-gold" />
                            Visual Identity
                        </h3>
                    </div>
                    <div className="p-10 grid gap-8 md:grid-cols-2">
                        {/* Logo Management - Relocated to top */}
                        <div className="md:col-span-2 space-y-4 p-8 rounded-2xl bg-brand-dark border border-white/5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Firm Logo Assets</label>

                            <div className="flex flex-col md:flex-row items-center gap-10">
                                <div className="h-24 w-48 rounded-xl border border-white/5 bg-brand-gray-900 p-4 flex items-center justify-center relative group/logo overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <img
                                            src={formData.logoUrl || "/master-logo.png"}
                                            alt="Current Logo"
                                            className="max-h-full max-w-full object-contain transition-all duration-300"
                                            style={{ transform: `scale(${formData.logoScale / 100})` }}
                                        />
                                    </div>
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/logo:opacity-100 transition-all flex items-center justify-center cursor-pointer rounded-xl backdrop-blur-sm z-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload size={20} className="text-white" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Replace Logo</span>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => setFormData({ ...formData, logoUrl: reader.result as string });
                                                reader.readAsDataURL(file);
                                            }
                                        }} />
                                    </label>
                                </div>

                                <div className="flex-1 w-full space-y-4">
                                    <div className="flex items-center justify-between px-1">
                                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/30">Logo Display Scale</label>
                                        <span className="text-xs font-mono text-brand-gold font-bold">{formData.logoScale}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="150"
                                        value={formData.logoScale}
                                        onChange={(e) => setFormData({ ...formData, logoScale: parseInt(e.target.value) })}
                                        className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                    />
                                    <div className="flex justify-between text-[8px] font-black uppercase tracking-widest text-white/10 px-1">
                                        <span>Compressed</span>
                                        <span>Standard</span>
                                        <span>Expanded</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Geometric Override */}
                        <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-white/5 bg-brand-dark px-8 py-6">
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">Geometric Override</label>
                                <p className="text-[10px] text-foreground/40 font-medium">Unilateral Border Logic for Portals & Cards</p>
                            </div>
                            <div className="flex bg-black/40 rounded-xl p-1.5 border border-white/5 shadow-inner">
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, borderRadius: 'rounded' })}
                                    className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.borderRadius === 'rounded' ? "bg-white text-brand-dark shadow-xl scale-105" : "text-white/30 hover:text-white"}`}
                                >
                                    Rounded
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, borderRadius: 'square' })}
                                    className={`px-6 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${formData.borderRadius === 'square' ? "bg-white text-brand-dark shadow-xl scale-105" : "text-white/30 hover:text-white"}`}
                                >
                                    Square
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Firm Name</label>
                            <input
                                type="text"
                                className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 px-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Portal Slug</label>
                            <div className="relative">
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={16} />
                                <input
                                    disabled
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-12 text-foreground/30 outline-none font-bold"
                                    value={formData.slug}
                                />
                            </div>
                        </div>

                        <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 block ml-1">Accent Shade</label>
                                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                    <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={formData.accentColor} onChange={(e) => {
                                        const newColor = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            accentColor: newColor,
                                            backgroundColor: prev.isColorLinked ? newColor : prev.backgroundColor
                                        }));
                                    }} />
                                    <span className="text-[10px] font-mono text-white/60">{formData.accentColor}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <label className="text-[10px] font-black uppercase tracking-wider text-white/30 block ml-1">Background</label>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, isColorLinked: !prev.isColorLinked, backgroundColor: !prev.isColorLinked ? prev.accentColor : prev.backgroundColor }))}
                                        className={`transition-all ${formData.isColorLinked ? 'text-brand-gold' : 'text-white/20'}`}
                                    >
                                        {formData.isColorLinked ? <LinkIcon size={14} /> : <Unlink size={14} />}
                                    </button>
                                </div>
                                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                    <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={formData.backgroundColor} onChange={(e) => {
                                        const newColor = e.target.value;
                                        setFormData(prev => ({
                                            ...prev,
                                            backgroundColor: newColor,
                                            accentColor: prev.isColorLinked ? newColor : prev.accentColor
                                        }));
                                    }} />
                                    <span className="text-[10px] font-mono text-white/60">{formData.backgroundColor}</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-wider text-white/30 block ml-1">Font Color</label>
                                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-brand-dark p-3">
                                    <input type="color" className="h-8 w-8 rounded border-none bg-transparent cursor-pointer" value={formData.fontColor} onChange={(e) => setFormData({ ...formData, fontColor: e.target.value })} />
                                    <span className="text-[10px] font-mono text-white/60">{formData.fontColor}</span>
                                </div>
                            </div>
                        </div>

                        {/* Typography Engine */}
                        <div className="md:col-span-2 space-y-8 p-10 rounded-3xl bg-black/20 border border-white/5 mt-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                    <Type size={14} />
                                    Typographic Engine
                                </h4>
                            </div>

                            <div className="grid gap-10 md:grid-cols-2">
                                {/* Firm Name Controls */}
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Firm Name Display</label>
                                        <p className="text-[8px] text-white/20 uppercase">Global Header & Title Weights</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/20">Family</label>
                                                <select
                                                    className="w-full h-10 rounded-lg bg-brand-dark border border-white/5 px-2 text-[10px] font-bold text-white outline-none"
                                                    value={formData.firmNameFontFamily}
                                                    onChange={(e) => setFormData({ ...formData, firmNameFontFamily: e.target.value })}
                                                >
                                                    <option value="Inter">Inter</option>
                                                    <option value="Roboto">Roboto</option>
                                                    <option value="Outfit">Outfit</option>
                                                    <option value="Playfair Display">Playfair</option>
                                                    <option value="Space Grotesk">Space Grotesk</option>
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/20">Weight</label>
                                                <select
                                                    className="w-full h-10 rounded-lg bg-brand-dark border border-white/5 px-2 text-[10px] font-bold text-white outline-none"
                                                    value={formData.firmNameFontWeight}
                                                    onChange={(e) => setFormData({ ...formData, firmNameFontWeight: e.target.value })}
                                                >
                                                    <option value="300">Light</option>
                                                    <option value="400">Regular</option>
                                                    <option value="600">Semibold</option>
                                                    <option value="700">Bold</option>
                                                    <option value="900">Black</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/20">Size</label>
                                                <span className="text-[10px] font-mono text-brand-gold">{formData.firmNameFontSize}px</span>
                                            </div>
                                            <input
                                                type="range" min="32" max="120" step="2"
                                                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                                value={formData.firmNameFontSize}
                                                onChange={(e) => setFormData({ ...formData, firmNameFontSize: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bio Controls */}
                                <div className="space-y-6">
                                    <div className="space-y-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Biography Stylization</label>
                                        <p className="text-[8px] text-white/20 uppercase">Content readability & line heights</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black uppercase tracking-widest text-white/20">Family</label>
                                            <select
                                                className="w-full h-10 rounded-lg bg-brand-dark border border-white/5 px-2 text-[10px] font-bold text-white outline-none"
                                                value={formData.bioFontFamily}
                                                onChange={(e) => setFormData({ ...formData, bioFontFamily: e.target.value })}
                                            >
                                                <option value="Inter">Inter</option>
                                                <option value="Roboto">Roboto</option>
                                                <option value="Georgia">Georgia</option>
                                                <option value="Merriweather">Merriweather</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/20">Scale</label>
                                                <span className="text-[10px] font-mono text-brand-gold">{formData.bioFontSize}px</span>
                                            </div>
                                            <input
                                                type="range" min="12" max="24" step="1"
                                                className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                                value={formData.bioFontSize}
                                                onChange={(e) => setFormData({ ...formData, bioFontSize: parseInt(e.target.value) })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="md:col-span-2 flex items-center justify-between rounded-2xl border border-white/5 bg-brand-dark px-6 py-4">
                            <div className="space-y-1">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gold">Agency Branding</label>
                                <p className="text-[10px] text-foreground/40">Toggle PRVT MKT platform navigation</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, showAgencyBranding: !formData.showAgencyBranding })}
                                className={`relative h-6 w-11 rounded-full transition-all ${formData.showAgencyBranding ? 'bg-brand-gold' : 'bg-white/10'}`}
                            >
                                <div className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${formData.showAgencyBranding ? 'right-1' : 'left-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                    <div className="px-10 py-6 border-b border-white/5 bg-white/2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                            <FileText size={18} className="text-brand-gold" />
                            Portal Content
                        </h3>
                    </div>
                    <div className="p-10 space-y-8">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Firm Biography (Rich-Text)</label>
                            <RichTextEditor
                                content={formData.bio}
                                onChange={(content) => setFormData({ ...formData, bio: content })}
                            />
                            <p className="text-[10px] text-foreground/20 italic ml-1 leading-relaxed">Format support for Bold, Heading hierarchy, and standardized Bullet Lists.</p>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Hero Media (Video or High-Res Image)</label>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 bg-brand-gray-800">
                                    {formData.heroMediaUrl ? (
                                        <>
                                            {formData.heroMediaUrl.includes('video') || formData.heroMediaUrl.endsWith('.mp4') || formData.heroMediaUrl.endsWith('.mov') ? (
                                                <div
                                                    className="group/video relative h-full w-full cursor-pointer"
                                                    onClick={toggleAudio}
                                                >
                                                    <video
                                                        ref={videoRef}
                                                        src={formData.heroMediaUrl}
                                                        className="h-full w-full object-cover opacity-60"
                                                        muted={isMuted}
                                                        loop
                                                        autoPlay
                                                        playsInline
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={toggleAudio}
                                                        className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-xl bg-black/40 backdrop-blur-md px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white border border-white/10 hover:bg-black/60 transition-all opacity-0 group-hover/video:opacity-100 shadow-xl"
                                                    >
                                                        {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                                        {isMuted ? "Muted" : "Sound On"}
                                                    </button>
                                                    {isMuted && (
                                                        <div
                                                            className="absolute inset-0 flex items-center justify-center bg-black/10 transition-opacity group-hover/video:bg-black/30"
                                                            onClick={toggleAudio}
                                                        >
                                                            <div className="flex flex-col items-center gap-2 animate-in fade-in zoom-in duration-300">
                                                                <VolumeX size={24} className="text-white/60" />
                                                                <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Click to Unmute</span>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <img src={formData.heroMediaUrl} className="h-full w-full object-cover opacity-60" />
                                            )}
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-foreground/10">
                                            <ImageIcon size={48} className="mb-2" />
                                            <p className="text-[10px] font-bold uppercase tracking-widest">No Media Selected</p>
                                        </div>
                                    )}
                                </div>
                                <div className="space-y-4">
                                    <div className="relative">
                                        <Upload className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={18} />
                                        <label className="flex items-center gap-3 w-full h-14 rounded-xl border-2 border-dashed border-white/10 bg-brand-dark px-12 text-white outline-none cursor-pointer hover:border-brand-gold/50 transition-all font-bold text-sm">
                                            Choose File...
                                            <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {
                                                const file = e.target.files?.[0];
                                                if (file) {
                                                    const reader = new FileReader();
                                                    reader.onloadend = () => setFormData({ ...formData, heroMediaUrl: reader.result as string });
                                                    reader.readAsDataURL(file);
                                                }
                                            }} />
                                        </label>
                                    </div>
                                    {formData.heroMediaUrl && (
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, heroMediaUrl: "" })}
                                            className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                        >
                                            <Trash2 size={14} />
                                            Purge Media
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact & Links */}
                <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                    <div className="px-10 py-6 border-b border-white/5 bg-white/2">
                        <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-3">
                            <Globe size={18} className="text-brand-gold" />
                            External Connectivity
                        </h3>
                    </div>
                    <div className="p-10 grid gap-8 md:grid-cols-2">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Physical Address</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-4 text-foreground/20" size={16} />
                                <textarea
                                    className="w-full h-24 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 pt-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold resize-none"
                                    value={formData.physicalAddress}
                                    onChange={(e) => setFormData({ ...formData, physicalAddress: e.target.value })}
                                    placeholder="Enter physical headquarters address..."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">Google Reviews URL</label>
                            <div className="relative">
                                <ExternalLink className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={16} />
                                <input
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                    value={formData.googleReviewsUrl}
                                    onChange={(e) => setFormData({ ...formData, googleReviewsUrl: e.target.value })}
                                    placeholder="https://g.page/r/..."
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-foreground/40 ml-1">LinkedIn Firm Page</label>
                            <div className="relative">
                                <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20" size={16} />
                                <input
                                    type="text"
                                    className="w-full h-14 rounded-xl border border-white/5 bg-brand-gray-900 pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                    value={formData.linkedInUrl}
                                    onChange={(e) => setFormData({ ...formData, linkedInUrl: e.target.value })}
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-6">
                    {message && (
                        <p className="text-sm font-bold text-brand-gold animate-pulse">{message}</p>
                    )}
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="ml-auto h-16 px-12 flex items-center gap-3 rounded-2xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-[0_0_40px_rgba(197,160,89,0.3)] hover:scale-[1.05] disabled:opacity-50"
                    >
                        <Save size={20} />
                        {isSaving ? "Persisting Changes..." : "Secure Registry Update"}
                    </button>
                </div>
            </form>
        </div>
    );
}
