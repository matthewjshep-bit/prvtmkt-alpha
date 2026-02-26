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
    ChevronLeft,
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
            const success = await updateFirm(firm.id, formData);
            if (success) {
                setMessage("Registry Updated Successfully");
            } else {
                setMessage("Update Failed - Check Server Logs");
            }
            setTimeout(() => setMessage(""), 3000);
        } catch (err) {
            setMessage("Update Failed");
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
                    <h2 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-3">
                        <Palette size={18} className="text-brand-gold" />
                        Live Site Editor
                    </h2>
                    {message && <span className="text-[10px] font-bold text-brand-gold animate-pulse">{message}</span>}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {/* Visual Identity Section */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Visual Identity</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Primary</label>
                                <div className="flex items-center gap-3">
                                    <div className="relative group/picker">
                                        <input
                                            type="color"
                                            className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                            value={formData.primaryColor || '#ffffff'}
                                            onChange={(e) => updateField('primaryColor', e.target.value)}
                                        />
                                    </div>
                                    <span className="text-[10px] font-mono text-white/50">{formData.primaryColor || '#ffffff'}</span>
                                </div>
                            </div>
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Background</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                        value={formData.backgroundColor || '#0a0a0a'}
                                        onChange={(e) => updateField('backgroundColor', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono text-white/40">{formData.backgroundColor || '#0a0a0a'}</span>
                                </div>
                            </div>
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Font</label>
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
                            <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Accent</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="color"
                                        className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                        value={formData.accentColor || '#151515'}
                                        onChange={(e) => updateField('accentColor', e.target.value)}
                                    />
                                    <span className="text-[10px] font-mono text-white/40">{formData.accentColor || '#151515'}</span>
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
                                        <ImageIcon size={48} className="mb-2 opacity-50" />
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em]">Blank Slate</p>
                                    </div>
                                )}
                            </div>
                            <label className="flex items-center justify-center gap-3 w-full h-14 rounded-xl border-2 border-dashed border-white/5 bg-white/[0.02] px-4 text-white outline-none cursor-pointer hover:border-brand-gold/50 transition-all font-bold text-[10px] uppercase tracking-widest">
                                <Upload size={16} className="text-brand-gold" />
                                Click to Upload Portfolio Media
                                <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => updateField('heroMediaUrl', reader.result as string);
                                        reader.readAsDataURL(file);
                                    }
                                }} />
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
                        disabled={isSaving}
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
