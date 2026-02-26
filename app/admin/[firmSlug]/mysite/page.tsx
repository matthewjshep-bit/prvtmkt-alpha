"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useData, Firm } from "@/context/DataContext";
import {
    Save,
    AtSign,
    Palette,
    ImageIcon,
    MapPin,
    Upload,
    Trash2,
    ChevronRight,
    Check,
    Volume2,
    VolumeX,
    ChevronLeft,
    Link as LinkIcon,
    Unlink,
    Type,
    Settings2,
    Monitor,
    Smartphone,
    Globe
} from "lucide-react";
import PublicPortalView from "@/components/PublicPortalView";
import RichTextEditor from "@/components/RichTextEditor";

export default function MySiteOverhaul() {
    const params = useParams();
    const { firms, deals, teamMembers, updateFirm, isInitialized } = useData();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [isEditorOpen, setIsEditorOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [isUploadingHero, setIsUploadingHero] = useState(false);

    // Local state for live sync
    const [formData, setFormData] = useState<Firm | null>(null);

    useEffect(() => {
        if (firm && !formData) {
            setFormData({
                ...firm
            });
        }
    }, [firm, formData]);

    if (!firm || !formData) return (
        <div className="h-full flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
        </div>
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const successOrError = await updateFirm(firm.id, formData);
            if (successOrError === true) {
                setMessage("Registry Updated Successfully");
            } else {
                setMessage(typeof successOrError === 'string' ? `Error: ${successOrError}` : "Update Failed - Check Server Logs");
            }
            setTimeout(() => setMessage(""), 5000);
        } catch (err: any) {
            setMessage(`Update Failed: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const updateField = (field: keyof Firm, value: any) => {
        setFormData((prev: Firm | null) => prev ? ({ ...prev, [field]: value }) : null);
    };

    return (
        <div className="h-[calc(100vh-120px)] flex overflow-hidden -m-8">
            {/* Center Preview Area */}
            <div className="flex-1 flex flex-col bg-brand-gray-900/50 relative overflow-hidden">
                <div className="p-6 flex items-center justify-between border-b border-white/5 bg-brand-dark/50 backdrop-blur-md z-20">
                    <div>
                        <h1 className="text-2xl font-bold text-white">My <span className="text-brand-gold">Site</span></h1>
                        <p className="text-[10px] text-foreground/40 font-black uppercase tracking-widest leading-none mt-1">Live Editor // Real-Time Preview</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex bg-brand-dark rounded-xl p-1 border border-white/5">
                            <button
                                onClick={() => setPreviewMode("DESKTOP")}
                                className={`p-2 rounded-lg transition-all ${previewMode === "DESKTOP" ? "bg-brand-gold text-brand-dark" : "text-white/40 hover:text-white"}`}
                                title="Desktop View"
                            >
                                <Monitor size={18} />
                            </button>
                            <button
                                onClick={() => setPreviewMode("MOBILE")}
                                className={`p-2 rounded-lg transition-all ${previewMode === "MOBILE" ? "bg-brand-gold text-brand-dark" : "text-white/40 hover:text-white"}`}
                                title="Mobile View"
                            >
                                <Smartphone size={18} />
                            </button>
                        </div>
                        <button
                            onClick={() => setIsEditorOpen(!isEditorOpen)}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all"
                        >
                            {isEditorOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
                            {isEditorOpen ? "Hide Editor" : "Show Editor"}
                        </button>
                    </div>
                </div>

                <div className="flex-1 overflow-auto p-12 flex justify-center items-start scrollbar-hide">
                    <div className={`transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden border border-white/10 bg-brand-dark ${previewMode === "DESKTOP" ? "w-full max-w-6xl h-auto min-h-[800px]" : "w-[375px] h-[750px] sticky top-0"}`}>
                        <PublicPortalView
                            firm={formData}
                            deals={deals}
                            teamMembers={teamMembers}
                            isInitialized={isInitialized}
                            isPreview={true}
                        />
                    </div>
                </div>
            </div>

            {/* Right Editor Column */}
            <div className={`transition-all duration-500 bg-brand-dark border-l border-white/5 flex flex-col overflow-hidden shadow-2xl z-30 ${isEditorOpen ? "w-[450px]" : "w-0"}`}>
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-16 flex items-center justify-center rounded-lg bg-white/5 p-1 border border-white/5">
                            <img src={formData.logoUrl || "/master-logo.png"} alt="" className="h-full object-contain" />
                        </div>
                        <h2 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-3">
                            <Palette size={18} className="text-brand-gold" />
                            Live Site Editor
                        </h2>
                    </div>
                    {message && <span className="text-[10px] font-bold text-brand-gold animate-pulse">{message}</span>}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {/* Visual Identity Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Visual Identity</h3>
                        </div>

                        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Firm Logo Assets</label>

                            <div className="flex items-center gap-6">
                                <div className="h-20 w-40 rounded-xl border border-white/5 bg-brand-gray-900 p-4 flex items-center justify-center relative group/logo overflow-hidden">
                                    <div className="absolute inset-0 flex items-center justify-center p-4">
                                        <img
                                            src={formData.logoUrl || "/master-logo.png"}
                                            alt="Current Logo"
                                            className="max-h-full max-w-full object-contain transition-all duration-300"
                                            style={{ transform: `scale(${(formData.logoScale || 100) / 100})` }}
                                        />
                                    </div>
                                    <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/logo:opacity-100 transition-all flex items-center justify-center cursor-pointer rounded-xl backdrop-blur-sm z-10">
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload size={18} className="text-white" />
                                            <span className="text-[8px] font-black uppercase tracking-widest text-white">Replace</span>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => updateField('logoUrl', reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }} />
                                    </label>
                                </div>

                                <div className="flex-1 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-white/30">Logo Scale</label>
                                        <span className="text-[8px] font-mono text-brand-gold">{formData.logoScale || 100}%</span>
                                    </div>
                                    <input
                                        type="range"
                                        min="50"
                                        max="300"
                                        value={formData.logoScale || 100}
                                        onChange={(e) => updateField('logoScale', parseInt(e.target.value))}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Geometric Override */}
                        <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Geometric Override</label>
                                    <p className="text-[8px] text-white/20 font-bold uppercase tracking-widest">Global Border Logic</p>
                                </div>
                                <div className="flex bg-brand-dark rounded-xl p-1 border border-white/5">
                                    <button
                                        onClick={() => updateField('borderRadius', 'rounded')}
                                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${formData.borderRadius !== 'square' ? "bg-white text-brand-dark" : "text-white/30 hover:text-white"}`}
                                    >
                                        Rounded
                                    </button>
                                    <button
                                        onClick={() => updateField('borderRadius', 'square')}
                                        className={`px-3 py-1.5 rounded-lg text-[8px] font-black uppercase tracking-widest transition-all ${formData.borderRadius === 'square' ? "bg-white text-brand-dark" : "text-white/30 hover:text-white"}`}
                                    >
                                        Square
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Accent Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                        value={formData.accentColor || '#151515'}
                                        onChange={(e) => {
                                            const newColor = e.target.value;
                                            updateField('accentColor', newColor);
                                            if (formData.isColorLinked) {
                                                updateField('backgroundColor', newColor);
                                            }
                                        }}
                                    />
                                    <span className="text-[10px] font-mono text-white/40">{formData.accentColor || '#151515'}</span>
                                </div>
                            </div>
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <div className="flex items-center justify-between">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Background</label>
                                    <button
                                        onClick={() => {
                                            const nextLinked = !formData.isColorLinked;
                                            updateField('isColorLinked', nextLinked);
                                            if (nextLinked) {
                                                updateField('backgroundColor', formData.accentColor);
                                            }
                                        }}
                                        className={`transition-all ${formData.isColorLinked ? 'text-brand-gold' : 'text-white/20'}`}
                                    >
                                        {formData.isColorLinked ? <LinkIcon size={12} /> : <Unlink size={12} />}
                                    </button>
                                </div>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                        value={formData.backgroundColor || '#0a0a0a'}
                                        onChange={(e) => {
                                            const newColor = e.target.value;
                                            updateField('backgroundColor', newColor);
                                            if (formData.isColorLinked) {
                                                updateField('accentColor', newColor);
                                            }
                                        }}
                                    />
                                    <span className="text-[10px] font-mono text-white/40">{formData.backgroundColor || '#0a0a0a'}</span>
                                </div>
                            </div>
                            <div className="col-span-2 space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Font Color</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                        value={formData.fontColor || '#ffffff'}
                                        onChange={(e) => updateField('fontColor', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono text-white/50">{formData.fontColor || '#ffffff'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Typography Engine */}
                        <div className="space-y-6 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                            <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                <Type size={14} />
                                Typography
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const nextLinked = !formData.isFontLinked;
                                        updateField('isFontLinked', nextLinked);
                                        if (nextLinked) {
                                            updateField('bioFontFamily', formData.firmNameFontFamily);
                                            updateField('bioFontSize', formData.firmNameFontSize);
                                            updateField('bioFontColor', formData.firmNameFontColor);
                                        }
                                    }}
                                    className={`ml-auto flex items-center gap-1.5 px-2 py-1 rounded-md text-[7px] font-black tracking-widest transition-all ${formData.isFontLinked ? 'bg-brand-gold text-brand-dark' : 'bg-white/5 text-white/30'}`}
                                >
                                    {formData.isFontLinked ? <LinkIcon size={8} /> : <Unlink size={8} />}
                                    {formData.isFontLinked ? 'LINKED' : 'LINK STYLES'}
                                </button>
                            </h4>

                            <div className="space-y-6">
                                {/* Firm Name */}
                                <div className="space-y-4">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Firm Name Header</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <select
                                            className="h-9 rounded-lg bg-brand-dark border border-white/5 px-2 text-[9px] font-bold text-white outline-none"
                                            value={formData.firmNameFontFamily}
                                            onChange={(e) => {
                                                const newFont = e.target.value;
                                                updateField('firmNameFontFamily', newFont);
                                                if (formData.isFontLinked) {
                                                    updateField('bioFontFamily', newFont);
                                                }
                                            }}
                                        >
                                            <option value="Inter">Inter</option>
                                            <option value="Roboto">Roboto</option>
                                            <option value="Outfit">Outfit</option>
                                            <option value="Playfair Display">Playfair</option>
                                            <option value="Space Grotesk">Space Grotesk</option>
                                        </select>
                                        <select
                                            className="h-9 rounded-lg bg-brand-dark border border-white/5 px-2 text-[9px] font-bold text-white outline-none"
                                            value={formData.firmNameFontWeight}
                                            onChange={(e) => updateField('firmNameFontWeight', e.target.value)}
                                        >
                                            <option value="300">Light</option>
                                            <option value="400">Regular</option>
                                            <option value="600">Semibold</option>
                                            <option value="700">Bold</option>
                                            <option value="900">Black</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-white/20 uppercase">Size</span>
                                            <span className="text-[9px] font-mono text-brand-gold">{formData.firmNameFontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="32" max="120" step="2"
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                            value={formData.firmNameFontSize}
                                            onChange={(e) => {
                                                const newSize = parseInt(e.target.value);
                                                updateField('firmNameFontSize', newSize);
                                                if (formData.isFontLinked) {
                                                    updateField('bioFontSize', newSize);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-white/20 uppercase">Color</span>
                                            <input
                                                type="color"
                                                className="h-4 w-4 rounded border-none bg-transparent cursor-pointer"
                                                value={formData.firmNameFontColor || '#000000'}
                                                onChange={(e) => {
                                                    const newColor = e.target.value;
                                                    updateField('firmNameFontColor', newColor);
                                                    if (formData.isFontLinked) {
                                                        updateField('bioFontColor', newColor);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Bio */}
                                <div className="space-y-4">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Biography Body</label>
                                    <select
                                        className="w-full h-9 rounded-lg bg-brand-dark border border-white/5 px-2 text-[9px] font-bold text-white outline-none"
                                        value={formData.bioFontFamily}
                                        onChange={(e) => updateField('bioFontFamily', e.target.value)}
                                    >
                                        <option value="Inter">Inter</option>
                                        <option value="Roboto">Roboto</option>
                                        <option value="Georgia">Georgia</option>
                                        <option value="Merriweather">Merriweather</option>
                                    </select>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-white/20 uppercase">Size</span>
                                            <span className="text-[9px] font-mono text-brand-gold">{formData.bioFontSize}px</span>
                                        </div>
                                        <input
                                            type="range" min="12" max="24" step="1"
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                            value={formData.bioFontSize}
                                            onChange={(e) => updateField('bioFontSize', parseInt(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-[8px] text-white/20 uppercase">Color</span>
                                            <input
                                                type="color"
                                                className="h-4 w-4 rounded border-none bg-transparent cursor-pointer"
                                                value={formData.bioFontColor || '#000000'}
                                                onChange={(e) => updateField('bioFontColor', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Portal Content Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Portal Content</h3>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Rich-Text Biography</label>
                            <RichTextEditor
                                content={formData.bio || ''}
                                onChange={(content) => updateField('bio', content)}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Hero Media Preview</label>
                            <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-gray-900 shadow-inner">
                                {formData.heroMediaUrl ? (
                                    <div className="h-full w-full">
                                        {formData.heroMediaUrl.includes('video') || formData.heroMediaUrl.endsWith('.mp4') || formData.heroMediaUrl.endsWith('.mov') ? (
                                            <video src={formData.heroMediaUrl} className="h-full w-full object-cover opacity-60" autoPlay loop muted playsInline />
                                        ) : (
                                            <img src={formData.heroMediaUrl} className="h-full w-full object-cover opacity-60" alt="Hero Preview" />
                                        )}
                                        <button
                                            onClick={() => updateField('heroMediaUrl', '')}
                                            className="absolute top-4 right-4 p-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all opacity-0 group-hover:opacity-100 backdrop-blur-md"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-foreground/10 p-4">
                                        {isUploadingHero ? (
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-gold/30 border-t-brand-gold" />
                                                <p className="text-[8px] font-black uppercase tracking-widest text-brand-gold">Uploading Media...</p>
                                            </div>
                                        ) : (
                                            <>
                                                <ImageIcon size={48} className="mb-2 opacity-50" />
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em]">Blank Slate</p>
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <label className={`flex items-center justify-center gap-3 w-full h-14 rounded-xl border-2 border-dashed border-white/5 bg-white/[0.02] px-4 text-white outline-none cursor-pointer hover:border-brand-gold/50 transition-all font-bold text-[10px] uppercase tracking-widest ${isUploadingHero ? 'opacity-50 cursor-not-allowed' : ''}`}>
                                <Upload size={16} className="text-brand-gold" />
                                {isUploadingHero ? "Processing..." : "Click to Upload Portfolio Media"}
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*,video/*"
                                    disabled={isUploadingHero}
                                    onChange={async (e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;

                                        setIsUploadingHero(true);

                                        try {
                                            // 1. Get signed URL
                                            const signRes = await fetch("/api/upload/signed-url", {
                                                method: "POST",
                                                headers: { "Content-Type": "application/json" },
                                                body: JSON.stringify({
                                                    fileName: file.name,
                                                    contentType: file.type,
                                                    id: firm.id,
                                                    type: "firms"
                                                }),
                                            });

                                            if (!signRes.ok) throw new Error("Failed to get signed upload URL");
                                            const { signedUrl, publicUrl } = await signRes.json();

                                            // 2. Upload directly to Supabase
                                            const uploadRes = await fetch(signedUrl, {
                                                method: "PUT",
                                                body: file,
                                                headers: {
                                                    "Content-Type": file.type,
                                                },
                                            });

                                            if (!uploadRes.ok) {
                                                const errorText = await uploadRes.text();
                                                let errorMsg = "Upload to storage failed";
                                                try {
                                                    const errorJson = JSON.parse(errorText);
                                                    errorMsg = errorJson.message || errorMsg;
                                                } catch {
                                                    errorMsg = errorText || errorMsg;
                                                }
                                                throw new Error(errorMsg);
                                            }

                                            // 3. Update field with public URL
                                            updateField('heroMediaUrl', publicUrl);
                                            setMessage("Media Uploaded Successfully");
                                            setTimeout(() => setMessage(""), 3000);
                                        } catch (err: any) {
                                            console.error("Upload error:", err);
                                            setMessage(`Upload Error: ${err.message}`);
                                            setTimeout(() => setMessage(""), 5000);
                                        } finally {
                                            setIsUploadingHero(false);
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {/* External Connectivity */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Connectivity</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Headquarters Address</label>
                                <div className="relative">
                                    <MapPin className="absolute left-0 top-0 text-brand-gold/40" size={14} />
                                    <textarea
                                        className="w-full h-24 bg-transparent pl-6 text-xs text-white outline-none font-medium resize-none placeholder:text-white/5"
                                        value={formData.physicalAddress || ''}
                                        onChange={(e) => updateField('physicalAddress', e.target.value)}
                                        placeholder="Enter HQ address..."
                                    />
                                </div>
                            </div>

                            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                <label className="text-[9px] font-black uppercase tracking-widest text-white/30">LinkedIn Page</label>
                                <div className="relative flex items-center">
                                    <Globe className="text-brand-gold/40 mr-3" size={14} />
                                    <input
                                        type="text"
                                        className="flex-1 bg-transparent text-xs text-white outline-none font-medium placeholder:text-white/5"
                                        value={formData.linkedInUrl || ''}
                                        onChange={(e) => updateField('linkedInUrl', e.target.value)}
                                        placeholder="linkedin.com/company/..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 border-t border-white/5 bg-brand-dark shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUploadingHero}
                        className="w-full h-16 flex items-center justify-center gap-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] disabled:opacity-50"
                    >
                        <Save size={18} />
                        {isSaving ? "Persisting changes..." : "Save"}
                    </button>
                    <p className="mt-4 text-center text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Instant site synchronization enabled</p>
                </div>
            </div>
        </div>
    );
}
