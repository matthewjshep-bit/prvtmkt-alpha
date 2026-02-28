"use client";

import { useState, useEffect, useRef } from "react";
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
    Globe,
    Star,
    TrendingUp,
    Camera,
    GripVertical,
    Video,
    ArrowUp,
    ArrowDown,
    Layers,
    Maximize2,
    X,
    Users
} from "lucide-react";
import PublicPortalView from "@/components/PublicPortalView";
import RichTextEditor from "@/components/RichTextEditor";

export default function MySiteOverhaul() {
    const params = useParams();
    const { firms, deals, teamMembers, updateFirm, updateTeamMember, updateDeal, isInitialized } = useData();
    const firmSlug = params.firmSlug as string;
    const firm = firms.find(f => f.slug === firmSlug);

    const [isEditorOpen, setIsEditorOpen] = useState(true);
    const [previewMode, setPreviewMode] = useState<"DESKTOP" | "MOBILE">("DESKTOP");
    const [isSaving, setIsSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [isUploadingHero, setIsUploadingHero] = useState(false);
    const [focusedMemberId, setFocusedMemberId] = useState<string | undefined>();
    const [focusedDealId, setFocusedDealId] = useState<string | undefined>();
    const [isUploadingMedia, setIsUploadingMedia] = useState(false);
    const [dealUploadError, setDealUploadError] = useState<string | null>(null);
    const [portalPreviewMode, setPortalPreviewMode] = useState<"GALLERY" | "PROFILE" | "DEAL">("GALLERY");
    const [editorWidth, setEditorWidth] = useState(40); // Initial 40% width
    const [isResizing, setIsResizing] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Local state for live sync
    const [formData, setFormData] = useState<Firm | null>(null);
    const [focusedMemberData, setFocusedMemberData] = useState<any>(null);
    const [focusedDealData, setFocusedDealData] = useState<any>(null);

    useEffect(() => {
        if (focusedDealId) {
            const deal = deals.find(d => d.id === focusedDealId);
            if (deal) {
                setFocusedDealData({ ...deal });
            }
        } else {
            setFocusedDealData(null);
        }
    }, [focusedDealId, deals]);

    useEffect(() => {
        if (focusedMemberId) {
            const member = teamMembers.find(m => m.id === focusedMemberId);
            if (member) {
                setFocusedMemberData({ ...member });
            }
        } else {
            setFocusedMemberData(null);
        }
    }, [focusedMemberId, teamMembers]);

    useEffect(() => {
        if (firm && !formData) {
            setFormData({
                ...firm
            });
        }
    }, [firm, formData]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isResizing || !containerRef.current) return;

            const containerRect = containerRef.current.getBoundingClientRect();
            const relativeX = e.clientX - containerRect.left;
            const containerWidth = containerRect.width;

            // Calculate percentage from right
            const newEditorWidth = ((containerWidth - relativeX) / containerWidth) * 100;

            // Constraints:
            // Site Preview (left side) must be at least 55% -> Editor max 45%
            // Live Site Editor (right side) must be at least 15% for usability
            if (newEditorWidth <= 45 && newEditorWidth >= 15) {
                setEditorWidth(newEditorWidth);
            }
        };

        const handleMouseUp = () => {
            setIsResizing(false);
            document.body.style.cursor = 'default';
        };

        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
            document.body.style.cursor = 'col-resize';
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    if (!firm || !formData) return (
        <div className="h-full flex items-center justify-center">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-brand-gold/30 border-t-brand-gold" />
        </div>
    );

    const handleSave = async () => {
        setIsSaving(true);
        try {
            let success = true;

            // 1. Always Save Global Firm Settings (which include Tombstone Visual settings)
            if (formData) {
                const res = await updateFirm(firm.id, formData);
                success = res === true;
            }

            // 2. Conditionally Save Specific Member/Deal Data
            if (portalPreviewMode === "PROFILE" && focusedMemberData) {
                const res = await updateTeamMember(focusedMemberData.id, focusedMemberData);
                success = success && (res === true);
            } else if (portalPreviewMode === "DEAL" && focusedDealData) {
                const res = await updateDeal(focusedDealData.id, focusedDealData);
                success = success && (res === true);
            }

            if (success) {
                setMessage("Registry Updated Successfully");
            } else {
                setMessage("Update Failed - Check Server Logs");
            }
            setTimeout(() => setMessage(""), 5000);
        } catch (err: any) {
            setMessage(`Update Failed: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const ensureHex = (color?: string | null) => {
        if (!color) return '#ffffff';
        if (color.startsWith('#')) return color;
        // Basic fallback for common rgba defaults in this app
        if (color.includes('rgba')) {
            if (color.includes('255, 255, 255')) return '#ffffff';
            if (color.includes('0, 0, 0')) return '#000000';
            return '#ffffff';
        }
        return color;
    };

    const updateField = (field: keyof Firm, value: any) => {
        setFormData((prev: Firm | null) => prev ? ({ ...prev, [field]: value }) : null);
    };

    const updateMemberField = (field: string, value: any) => {
        setFocusedMemberData((prev: any) => prev ? ({ ...prev, [field]: value }) : null);
    };

    const updateDealField = (field: string, value: any) => {
        setFocusedDealData((prev: any) => {
            if (!prev) return null;
            const updatedValue = typeof value === 'function' ? value(prev[field]) : value;
            return { ...prev, [field]: updatedValue };
        });
    };

    const handleReorderMedia = (index: number, direction: 'up' | 'down') => {
        if (!focusedDealData || !focusedDealData.images) return;
        const newImages = [...focusedDealData.images];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newImages.length) return;

        [newImages[index], newImages[targetIndex]] = [newImages[targetIndex], newImages[index]];
        updateDealField('images', newImages);
        if (targetIndex === 0 || index === 0) {
            updateDealField('stillImageURL', newImages[0]);
        }
    };

    const previewTeamMembers = teamMembers.map(m =>
        m.id === focusedMemberId && focusedMemberData ? focusedMemberData : m
    );

    const previewDeals = deals.map(d =>
        d.id === focusedDealId && focusedDealData ? focusedDealData : d
    );

    return (
        <div ref={containerRef} className="h-[calc(100vh-120px)] flex overflow-hidden -m-8 select-none">
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

                <div className="flex-1 overflow-auto p-4 flex justify-center items-start scrollbar-hide">
                    <div className={`transition-all duration-700 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[3rem] overflow-hidden border border-white/10 bg-brand-dark ${previewMode === "DESKTOP" ? "w-full h-auto min-h-[800px]" : "w-[375px] h-[750px] sticky top-0"}`}>
                        <PublicPortalView
                            firm={formData}
                            deals={previewDeals}
                            teamMembers={previewTeamMembers}
                            isInitialized={isInitialized}
                            isPreview={true}
                            focusedMemberId={focusedMemberId}
                            focusedDealId={focusedDealId}
                            previewMode={portalPreviewMode}
                            onMemberClick={(id) => {
                                if (id) {
                                    setFocusedMemberId(id);
                                    setFocusedDealId(undefined); // Clear deal if member clicked
                                    setPortalPreviewMode("PROFILE");
                                } else {
                                    setFocusedMemberId(undefined);
                                    setPortalPreviewMode("GALLERY");
                                }
                            }}
                            onDealClick={(id) => {
                                if (id) {
                                    setFocusedDealId(id);
                                    setFocusedMemberId(undefined); // Clear member if deal clicked
                                    setPortalPreviewMode("DEAL");
                                } else {
                                    setFocusedDealId(undefined);
                                    setPortalPreviewMode("GALLERY");
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Resizer Handle */}
            {isEditorOpen && (
                <div
                    onMouseDown={() => setIsResizing(true)}
                    className="group relative z-40 flex w-1 cursor-col-resize items-center justify-center bg-white/5 transition-colors hover:bg-brand-gold/40"
                >
                    <div className="absolute left-1/2 -translate-x-1/2 flex h-10 w-4 items-center justify-center rounded-full bg-brand-dark border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <GripVertical size={12} className="text-white/40" />
                    </div>
                </div>
            )}

            {/* Right Editor Column */}
            <div
                style={{ width: isEditorOpen ? `${editorWidth}%` : '0' }}
                className={`${!isResizing ? 'transition-[width] duration-500' : ''} bg-brand-dark border-l border-white/5 flex flex-col overflow-hidden shadow-2xl z-30`}
            >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-16 flex items-center justify-center rounded-lg bg-white/5 p-1 border border-white/5">
                            <img src={formData.logoUrl || "/master-logo.png"} alt="" className="h-full object-contain" />
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-xs font-black uppercase tracking-widest text-white flex items-center gap-3">
                                <Palette size={18} className="text-brand-gold" />
                                {portalPreviewMode === "PROFILE" ? "Member Profile Editor" :
                                    portalPreviewMode === "DEAL" ? "Asset Narrative Editor" :
                                        "Live Site Editor"}
                            </h2>
                            {portalPreviewMode === "PROFILE" && (
                                <p className="text-[8px] font-bold text-brand-gold/60 uppercase tracking-widest mt-1">Editing {focusedMemberData?.name}</p>
                            )}
                            {portalPreviewMode === "DEAL" && (
                                <p className="text-[8px] font-bold text-brand-gold/60 uppercase tracking-widest mt-1">Editing {focusedDealData?.address}</p>
                            )}
                        </div>
                    </div>
                    {message && <span className="text-[10px] font-bold text-brand-gold animate-pulse">{message}</span>}
                </div>

                <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                    {portalPreviewMode === "PROFILE" && focusedMemberData ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                            {/* Back to Site Settings */}
                            <button
                                onClick={() => {
                                    setFocusedMemberId(undefined);
                                    setPortalPreviewMode("GALLERY");
                                }}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-brand-gold transition-colors"
                            >
                                <ChevronLeft size={16} />
                                Back to Visual Identity
                            </button>

                            {/* Identity Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Professional Identity</h3>
                                </div>

                                <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Member Name</label>
                                            <input
                                                type="text"
                                                className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                                value={focusedMemberData.name || ''}
                                                onChange={(e) => updateMemberField('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Title / Role</label>
                                            <input
                                                type="text"
                                                className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all font-inter"
                                                value={focusedMemberData.role || ''}
                                                onChange={(e) => updateMemberField('role', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Portrait */}
                                <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Profile Portrait</label>
                                    <div className="flex items-center gap-6">
                                        <div className="h-24 w-24 rounded-3xl overflow-hidden border-2 border-brand-gold/30 relative group/portrait">
                                            <img src={focusedMemberData.imageURL || '/placeholder-user.jpg'} className="h-full w-full object-cover" />
                                            <label className="absolute inset-0 bg-black/60 opacity-0 group-hover/portrait:opacity-100 flex items-center justify-center cursor-pointer backdrop-blur-sm transition-all">
                                                <Camera size={20} className="text-white" />
                                                <input type="file" className="hidden" accept="image/*" onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => updateMemberField('imageURL', reader.result as string);
                                                        reader.readAsDataURL(file);
                                                    }
                                                }} />
                                            </label>
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <p className="text-[10px] font-bold text-white/60">High-resolution professional portraits recommended.</p>
                                            <p className="text-[8px] text-white/20 uppercase tracking-widest font-black leading-relaxed">Dimensions: 1:1 Aspect Ratio // Recommended size: 800x800px</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Narrative */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Narrative Bio</h3>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Professional Narrative</label>
                                    <RichTextEditor
                                        content={focusedMemberData.bio || ''}
                                        onChange={(content) => updateMemberField('bio', content)}
                                    />
                                </div>
                            </div>

                            {/* Connectivity */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Connectivity</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Email Connection</label>
                                        <div className="flex items-center gap-3">
                                            <AtSign size={14} className="text-brand-gold/40" />
                                            <input
                                                type="email"
                                                className="flex-1 bg-transparent text-xs font-bold text-white outline-none"
                                                value={focusedMemberData.email || ''}
                                                onChange={(e) => updateMemberField('email', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">LinkedIn Profile</label>
                                        <div className="flex items-center gap-3">
                                            <LinkIcon size={14} className="text-brand-gold/40" />
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent text-xs font-bold text-white outline-none"
                                                value={focusedMemberData.linkedInUrl || ''}
                                                onChange={(e) => updateMemberField('linkedInUrl', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Phone Connection</label>
                                        <div className="flex items-center gap-3">
                                            <Smartphone size={14} className="text-brand-gold/40" />
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent text-xs font-bold text-white outline-none"
                                                value={focusedMemberData.phoneNumber || ''}
                                                onChange={(e) => updateMemberField('phoneNumber', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Hero Media */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Profile Banner</h3>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Hero Asset Preview</label>
                                    <div className="group relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-brand-gray-900 shadow-inner">
                                        {focusedMemberData.heroMediaUrl ? (
                                            <div className="h-full w-full">
                                                {focusedMemberData.heroMediaUrl.includes('video') || focusedMemberData.heroMediaUrl.endsWith('.mp4') || focusedMemberData.heroMediaUrl.endsWith('.mov') ? (
                                                    <video src={focusedMemberData.heroMediaUrl} className="h-full w-full object-cover opacity-60" autoPlay loop muted playsInline />
                                                ) : (
                                                    <img src={focusedMemberData.heroMediaUrl} className="h-full w-full object-cover opacity-60" alt="Hero Preview" />
                                                )}
                                                <button
                                                    onClick={() => updateMemberField('heroMediaUrl', '')}
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
                                        Replace Member Banner
                                        <input type="file" className="hidden" accept="image/*,video/*" onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                const reader = new FileReader();
                                                reader.onloadend = () => updateMemberField('heroMediaUrl', reader.result as string);
                                                reader.readAsDataURL(file);
                                            }
                                        }} />
                                    </label>
                                </div>
                            </div>
                        </div>
                    ) : portalPreviewMode === "DEAL" && focusedDealData ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500 space-y-10">
                            {/* Back to Site Settings */}
                            <button
                                onClick={() => {
                                    setFocusedDealId(undefined);
                                    setPortalPreviewMode("GALLERY");
                                }}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-brand-gold transition-colors"
                            >
                                <ChevronLeft size={16} />
                                Back to Visual Identity
                            </button>

                            {/* Tombstone Visual Editor (Global Settings) */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Tombstone Visual Editor</h3>
                                </div>

                                <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="grid grid-cols-2 gap-4">
                                        {/* Padding Slider */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 ml-1">Section Spacing</label>
                                                <span className="text-[9px] font-black text-brand-gold">{formData.tombstonePadding ?? 64}px</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="0" max="200" step="8"
                                                className="w-full accent-brand-gold"
                                                value={formData.tombstonePadding ?? 64}
                                                onChange={(e) => updateField('tombstonePadding', parseInt(e.target.value))}
                                            />
                                        </div>

                                        {/* Width Slider */}
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <label className="text-[9px] font-black uppercase tracking-wider text-white/30 ml-1">Max Display Width</label>
                                                <span className="text-[9px] font-black text-brand-gold">{formData.tombstoneMaxWidth ?? 1200}px</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="600" max="1600" step="50"
                                                className="w-full accent-brand-gold"
                                                value={formData.tombstoneMaxWidth ?? 1200}
                                                onChange={(e) => updateField('tombstoneMaxWidth', parseInt(e.target.value))}
                                            />
                                        </div>
                                    </div>

                                    {/* Section Reordering & Colors */}
                                    <div className="space-y-3 pt-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 ml-1">Section Order & Colors</label>
                                        {(formData.tombstoneLayout || ['INFO', 'METRICS', 'MEDIA', 'NARRATIVE']).map((section, idx, arr) => (
                                            <div key={section} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5">
                                                <div className="flex flex-col gap-1">
                                                    <button
                                                        disabled={idx === 0}
                                                        onClick={() => {
                                                            const newLayout = [...arr];
                                                            [newLayout[idx], newLayout[idx - 1]] = [newLayout[idx - 1], newLayout[idx]];
                                                            updateField('tombstoneLayout', newLayout);
                                                        }}
                                                        className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-10 text-white/40 hover:text-white"
                                                    >
                                                        <ArrowUp size={10} />
                                                    </button>
                                                    <button
                                                        disabled={idx === arr.length - 1}
                                                        onClick={() => {
                                                            const newLayout = [...arr];
                                                            [newLayout[idx], newLayout[idx + 1]] = [newLayout[idx + 1], newLayout[idx]];
                                                            updateField('tombstoneLayout', newLayout);
                                                        }}
                                                        className="p-1 hover:bg-white/10 rounded transition-colors disabled:opacity-10 text-white/40 hover:text-white"
                                                    >
                                                        <ArrowDown size={10} />
                                                    </button>
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/60">{section}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-4 h-4 rounded-full" style={{ backgroundColor: ensureHex((formData as any)[`tombstone${section.charAt(0) + section.slice(1).toLowerCase()}BgColor`]) }} />
                                                    <input
                                                        type="color"
                                                        className="w-8 h-8 rounded-lg bg-transparent border-none cursor-pointer outline-none"
                                                        value={ensureHex((formData as any)[`tombstone${section.charAt(0) + section.slice(1).toLowerCase()}BgColor`])}
                                                        onChange={(e) => updateField(`tombstone${section.charAt(0) + section.slice(1).toLowerCase()}BgColor` as keyof Firm, e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-3 rounded-xl bg-brand-gold/5 border border-brand-gold/20">
                                    <p className="text-[8px] font-black text-brand-gold uppercase tracking-[0.1em] text-center">Global changes: affects all firm deal tombstones</p>
                                </div>
                            </div>

                            {/* Deal Identity Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Asset Identity</h3>
                                </div>

                                <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Asset Address</label>
                                        <input
                                            type="text"
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={focusedDealData.address || ''}
                                            onChange={(e) => updateDealField('address', e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Asset Type</label>
                                            <select
                                                className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all font-inter"
                                                value={focusedDealData.assetType || ''}
                                                onChange={(e) => updateDealField('assetType', e.target.value)}
                                            >
                                                <option value="INDUSTRIAL">Industrial</option>
                                                <option value="RETAIL">Retail</option>
                                                <option value="MULTIFAMILY">Multifamily</option>
                                                <option value="SF">SF</option>
                                                <option value="OTHER">Other</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Strategy</label>
                                            <input
                                                type="text"
                                                className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                                value={focusedDealData.strategy || ''}
                                                onChange={(e) => updateDealField('strategy', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Transaction Leads (Team Assignment) */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Transaction Leads</h3>
                                </div>

                                <div className="space-y-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Assigned Team Members</label>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(focusedDealData.teamMemberIds || []).map((mId: string) => {
                                            const member = teamMembers.find(m => m.id === mId);
                                            return (
                                                <div key={mId} className="flex items-center gap-2 rounded-lg bg-brand-gold/10 border border-brand-gold/20 px-3 py-1.5 text-[9px] font-bold text-brand-gold">
                                                    {member?.name || "Unknown Member"}
                                                    <button
                                                        type="button"
                                                        onClick={() => updateDealField('teamMemberIds', (focusedDealData.teamMemberIds || []).filter((id: string) => id !== mId))}
                                                        className="hover:text-white transition-colors"
                                                    >
                                                        <X size={12} />
                                                    </button>
                                                </div>
                                            );
                                        })}
                                        {(!focusedDealData.teamMemberIds || focusedDealData.teamMemberIds.length === 0) && (
                                            <p className="text-[9px] text-white/20 italic p-1">No Leads Assigned</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Add to Team</label>
                                        <select
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all font-inter"
                                            value=""
                                            onPointerDown={(e) => e.stopPropagation()}
                                            onChange={(e) => {
                                                const val = e.target.value;
                                                if (val && !(focusedDealData.teamMemberIds || []).includes(val)) {
                                                    updateDealField('teamMemberIds', [...(focusedDealData.teamMemberIds || []), val]);
                                                }
                                            }}
                                        >
                                            <option value="">+ Select Team Member...</option>
                                            {teamMembers
                                                .filter(m => m.firmId === firm.id || (m.firmIds || []).includes(firm.id))
                                                .filter(m => !(focusedDealData.teamMemberIds || []).includes(m.id))
                                                .map(member => (
                                                    <option key={member.id} value={member.id}>{member.name}</option>
                                                ))
                                            }
                                            {teamMembers.filter(m => m.firmId === firm.id || (m.firmIds || []).includes(firm.id)).length === 0 && (
                                                <option disabled>No firm members found...</option>
                                            )}
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Deal Narrative */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Investment Narrative</h3>
                                </div>
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Investment Overview</label>
                                    <RichTextEditor
                                        content={focusedDealData.investmentOverview || ''}
                                        onChange={(content) => updateDealField('investmentOverview', content)}
                                    />
                                </div>
                            </div>

                            {/* Metrics Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Performance Metrics</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Acquisition Price</label>
                                        <input
                                            type="number"
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={focusedDealData.purchaseAmount || ''}
                                            onChange={(e) => updateDealField('purchaseAmount', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Exit Value (ARV)</label>
                                        <input
                                            type="number"
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={focusedDealData.arv || ''}
                                            onChange={(e) => updateDealField('arv', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Rehab / CapEx</label>
                                        <input
                                            type="number"
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={focusedDealData.rehabAmount || ''}
                                            onChange={(e) => updateDealField('rehabAmount', parseFloat(e.target.value))}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block ml-1">Square Feet</label>
                                        <input
                                            type="number"
                                            className="w-full h-12 bg-brand-dark border border-white/5 rounded-xl px-4 text-xs font-bold text-white outline-none focus:border-brand-gold/40 transition-all"
                                            value={focusedDealData.sqFt || ''}
                                            onChange={(e) => updateDealField('sqFt', parseInt(e.target.value))}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Deal Media Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Asset Media</h3>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {/* Standard Upload */}
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*,video/*"
                                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                            onChange={async (e) => {
                                                const files = Array.from(e.target.files || []);
                                                if (files.length === 0) return;
                                                setIsUploadingMedia(true);
                                                try {
                                                    for (const file of files) {
                                                        const formData = new FormData();
                                                        formData.append("file", file);
                                                        formData.append("id", focusedDealData.id);
                                                        formData.append("type", "deals");
                                                        const res = await fetch("/api/upload", { method: "POST", body: formData });
                                                        const { url } = await res.json();
                                                        updateDealField('images', (prev: string[]) => [...(prev || []), url]);
                                                        if (!focusedDealData.stillImageURL) {
                                                            updateDealField('stillImageURL', url);
                                                        }
                                                    }
                                                } catch (err) {
                                                    console.error("Upload failed", err);
                                                } finally {
                                                    setIsUploadingMedia(false);
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-white/5 bg-white/[0.02] py-8 transition-all group-hover:border-white/20 group-hover:bg-brand-gray-900 shadow-inner">
                                            <Upload size={24} className="mb-2 text-white/20 group-hover:text-white transition-colors" />
                                            <p className="text-[8px] font-black uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Standard Upload</p>
                                        </div>
                                    </div>

                                    {/* AI Drone Cinematic - Logic for mirroring Kling engine if available */}
                                    <div className="relative group">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
                                            onChange={async (e) => {
                                                const file = e.target.files?.[0];
                                                if (!file) return;
                                                setIsUploadingMedia(true);
                                                try {
                                                    const formData = new FormData();
                                                    formData.append("file", file);
                                                    formData.append("id", focusedDealData.id);
                                                    formData.append("type", "deals");
                                                    const res = await fetch("/api/upload", { method: "POST", body: formData });
                                                    const { url } = await res.json();
                                                    updateDealField('images', (prev: string[]) => [...(prev || []), url]);
                                                    updateDealField('stillImageURL', url);
                                                    // handleGenerateAIVideo(focusedDealData.id, url) - Add logic if available
                                                } catch (err) {
                                                    console.error("AI Upload failed", err);
                                                } finally {
                                                    setIsUploadingMedia(false);
                                                }
                                            }}
                                        />
                                        <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-brand-gold/20 bg-brand-gold/5 py-8 transition-all group-hover:border-brand-gold/50 group-hover:bg-brand-gold/10 shadow-inner">
                                            <TrendingUp size={24} className="mb-2 text-brand-gold group-hover:scale-110 transition-transform" />
                                            <p className="text-[8px] font-black uppercase tracking-widest text-brand-gold">Generate Living Drone View</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Current Gallery & Order */}
                                <div className="space-y-3">
                                    {(focusedDealData.images || []).map((img: string, idx: number) => (
                                        <div key={idx} className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 group/media relative overflow-hidden">
                                            <div className="flex items-center gap-2 text-white/10">
                                                <GripVertical size={16} className="cursor-grab active:cursor-grabbing" />
                                                <span className="text-[9px] font-black w-4">{idx + 1}</span>
                                            </div>
                                            <div className="h-14 w-24 overflow-hidden rounded-lg bg-brand-dark border border-white/5 relative shrink-0">
                                                {img && <img src={img} alt="" className="h-full w-full object-cover" />}
                                                {img === focusedDealData.stillImageURL && (
                                                    <div className="absolute top-1 right-1 h-3 w-3 bg-brand-gold rounded-full border border-brand-dark flex items-center justify-center">
                                                        <Check size={8} className="text-brand-dark" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-[8px] font-black uppercase tracking-widest text-white/20">Asset File</p>
                                                <p className="text-[10px] font-bold text-white mt-1 truncate">
                                                    {decodeURIComponent(img.split('/').pop()?.replace(/^\d+-/, '') || "Unnamed Asset")}
                                                </p>
                                            </div>
                                            <div className="flex items-center gap-1 opacity-0 group-hover/media:opacity-100 transition-opacity">
                                                <button
                                                    disabled={idx === 0}
                                                    onClick={() => handleReorderMedia(idx, 'up')}
                                                    className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white disabled:opacity-10 transition-all font-bold"
                                                >
                                                    <ChevronLeft size={16} className="rotate-90" />
                                                </button>
                                                <button
                                                    disabled={idx === (focusedDealData.images || []).length - 1}
                                                    onClick={() => handleReorderMedia(idx, 'down')}
                                                    className="p-1.5 rounded-lg bg-white/5 text-white/40 hover:text-white disabled:opacity-10 transition-all font-bold"
                                                >
                                                    <ChevronLeft size={16} className="-rotate-90" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        const newImages = (focusedDealData.images || []).filter((_: any, i: number) => i !== idx);
                                                        updateDealField('images', newImages);
                                                        if (img === focusedDealData.stillImageURL) {
                                                            updateDealField('stillImageURL', newImages[0] || "");
                                                        }
                                                    }}
                                                    className="p-1.5 rounded-lg bg-red-500/10 text-red-500/40 hover:text-red-500 transition-all"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}

                                    {isUploadingMedia && (
                                        <div className="flex flex-col items-center justify-center py-6 rounded-xl border border-dashed border-brand-gold/20 bg-brand-gold/5">
                                            <div className="h-5 w-5 border-2 border-brand-gold/30 border-t-brand-gold animate-spin rounded-full mb-2" />
                                            <p className="text-[8px] font-black uppercase tracking-widest text-brand-gold">Transferring to Cloud...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <>
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
                                                value={ensureHex(formData.backgroundColor)}
                                                onChange={(e) => {
                                                    const newColor = e.target.value;
                                                    updateField('backgroundColor', newColor);
                                                    if (formData.isColorLinked) {
                                                        updateField('accentColor', newColor);
                                                    }
                                                    if (formData.isMemberCardColorLinked) {
                                                        updateField('memberCardBgColor', newColor);
                                                    }
                                                }}
                                            />
                                            <span className="text-[10px] font-mono text-white/40">{formData.backgroundColor || '#0a0a0a'}</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Accent Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                                value={ensureHex(formData.accentColor)}
                                                onChange={(e) => {
                                                    const newColor = e.target.value;
                                                    updateField('accentColor', newColor);
                                                    if (formData.isColorLinked) {
                                                        updateField('backgroundColor', newColor);
                                                    }
                                                    if (formData.isMemberCardColorLinked) {
                                                        updateField('memberCardBgColor', newColor);
                                                    }
                                                }}
                                            />
                                            <span className="text-[10px] font-mono text-white/40">{formData.accentColor || '#151515'}</span>
                                        </div>
                                    </div>
                                    <div className="col-span-2 space-y-3 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <label className="text-[9px] font-black uppercase tracking-wider text-white/30 block">Font Color</label>
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="color"
                                                className="h-8 w-8 rounded-lg border-none bg-transparent cursor-pointer ring-2 ring-white/10 ring-offset-2 ring-offset-brand-dark"
                                                value={ensureHex(formData.fontColor)}
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
                                                    <option value="Montserrat">Montserrat</option>
                                                    <option value="Poppins">Poppins</option>
                                                    <option value="Outfit">Outfit</option>
                                                    <option value="Playfair Display">Playfair</option>
                                                    <option value="Space Grotesk">Space Grotesk</option>
                                                    <option value="Lora">Lora</option>
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
                                                        value={ensureHex(formData.firmNameFontColor)}
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

                                        {/* Narrative */}
                                        <div className="space-y-4">
                                            <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Narrative Body</label>
                                            <select
                                                className="w-full h-9 rounded-lg bg-brand-dark border border-white/5 px-2 text-[9px] font-bold text-white outline-none"
                                                value={formData.bioFontFamily}
                                                onChange={(e) => updateField('bioFontFamily', e.target.value)}
                                            >
                                                <option value="Inter">Inter</option>
                                                <option value="Roboto">Roboto</option>
                                                <option value="Open Sans">Open Sans</option>
                                                <option value="Montserrat">Montserrat</option>
                                                <option value="Lora">Lora</option>
                                                <option value="Merriweather">Merriweather</option>
                                                <option value="Crimson Text">Crimson Text</option>
                                                <option value="Georgia">Georgia</option>
                                            </select>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[8px] text-white/20 uppercase">Size</span>
                                                    <span className="text-[9px] font-mono text-brand-gold">{formData.bioFontSize}px</span>
                                                </div>
                                                <input
                                                    type="range" min="12" max="32" step="1"
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
                                                        value={ensureHex(formData.bioFontColor)}
                                                        onChange={(e) => updateField('bioFontColor', e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Layout Section */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-gold" />
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Layout</h3>
                                </div>

                                <div className="space-y-12 pb-32">
                                    {/* Team Card Customization */}
                                    <div className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                            <Settings2 size={14} />
                                            Team Member Cards
                                        </h4>

                                        <div className="space-y-4 pt-2">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Card Background Hue</label>
                                                    <button
                                                        onClick={() => {
                                                            const nextLinked = !formData.isMemberCardColorLinked;
                                                            updateField('isMemberCardColorLinked', nextLinked);
                                                            if (nextLinked) {
                                                                updateField('memberCardBgColor', formData.backgroundColor);
                                                            }
                                                        }}
                                                        className={`transition-all ${formData.isMemberCardColorLinked ? 'text-brand-gold' : 'text-white/20'}`}
                                                    >
                                                        {formData.isMemberCardColorLinked ? <LinkIcon size={10} /> : <Unlink size={10} />}
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="color"
                                                        className="h-6 w-6 rounded border-none bg-transparent cursor-pointer"
                                                        value={ensureHex(formData.memberCardBgColor)}
                                                        onChange={(e) => {
                                                            const newColor = e.target.value;
                                                            updateField('memberCardBgColor', newColor);
                                                            if (formData.isMemberCardColorLinked) {
                                                                updateField('backgroundColor', newColor);
                                                                if (formData.isColorLinked) {
                                                                    updateField('accentColor', newColor);
                                                                }
                                                            }
                                                        }}
                                                    />
                                                    <span className="text-[10px] font-mono text-white/40 uppercase">{formData.memberCardBgColor || '#FFFFFF'}</span>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Photo / Identity Spacing</label>
                                                    <span className="text-[9px] font-mono text-brand-gold">{formData.memberPhotoSpacing || 12}px</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="64" step="4"
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                                    value={formData.memberPhotoSpacing || 12}
                                                    onChange={(e) => updateField('memberPhotoSpacing', parseInt(e.target.value))}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="space-y-1">
                                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Show Narrative</label>
                                                    <p className="text-[7px] text-white/10 font-bold uppercase tracking-widest">Display Bio on Card</p>
                                                </div>
                                                <button
                                                    onClick={() => updateField('showMemberNarrative', !formData.showMemberNarrative)}
                                                    className={`w-12 h-6 rounded-full transition-all relative flex items-center px-1 ${formData.showMemberNarrative !== false ? 'bg-brand-gold' : 'bg-white/10'}`}
                                                >
                                                    <div className={`h-4 w-4 rounded-full bg-white shadow-sm transition-all transform ${formData.showMemberNarrative !== false ? 'translate-x-6' : 'translate-x-0'}`} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Global Layout Extras */}
                                    <div className="space-y-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                                        <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-gold flex items-center gap-2">
                                            <Settings2 size={14} />
                                            Global Layout Controls
                                        </h4>

                                        <div className="space-y-6 pt-2">
                                            {/* Search Bar Toggle */}
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Search Bar</label>
                                                    <p className="text-[7px] text-white/10 font-bold uppercase tracking-widest">Enable site-wide search</p>
                                                </div>
                                                <button
                                                    onClick={() => updateField('showSearchBar', formData.showSearchBar !== false ? false : true)}
                                                    className={`w-10 h-5 rounded-full transition-all relative flex items-center px-1 ${formData.showSearchBar !== false ? 'bg-brand-gold' : 'bg-white/10'}`}
                                                >
                                                    <div className={`h-3 w-3 rounded-full bg-white shadow-sm transition-all transform ${formData.showSearchBar !== false ? 'translate-x-5' : 'translate-x-0'}`} />
                                                </button>
                                            </div>

                                            {/* Card Shading Intensity */}
                                            <div className="space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Global Card Shading</label>
                                                    <span className="text-[9px] font-mono text-brand-gold">{Math.round((formData.cardShadowIntensity || 0) * 100)}%</span>
                                                </div>
                                                <input
                                                    type="range" min="0" max="1" step="0.05"
                                                    className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-gold"
                                                    value={formData.cardShadowIntensity || 0}
                                                    onChange={(e) => updateField('cardShadowIntensity', parseFloat(e.target.value))}
                                                />
                                            </div>

                                            {/* View Layout Mode (Toggle) */}
                                            <div className="space-y-3">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Grid/List Visibility</label>
                                                <div className="grid grid-cols-3 gap-2">
                                                    {[
                                                        { id: 'BOTH', label: 'Show Both' },
                                                        { id: 'GRID', label: 'Grid Only' },
                                                        { id: 'LIST', label: 'List Only' }
                                                    ].map((mode) => (
                                                        <button
                                                            key={mode.id}
                                                            onClick={() => updateField('viewLayoutMode', mode.id)}
                                                            className={`py-2 px-1 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all border ${formData.viewLayoutMode === mode.id ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'bg-white/5 text-white/40 border-white/5'}`}
                                                        >
                                                            {mode.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Portfolio List Style */}
                                            <div className="space-y-3">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Portfolio List Logic</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: 'TRADITIONAL', label: 'Traditional' },
                                                        { id: 'ALTERNATING', label: 'Alternating' }
                                                    ].map((style) => (
                                                        <button
                                                            key={style.id}
                                                            onClick={() => updateField('portfolioListStyle', style.id)}
                                                            className={`py-2 px-1 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all border ${formData.portfolioListStyle === style.id ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'bg-white/5 text-white/40 border-white/5'}`}
                                                        >
                                                            {style.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Team List Style */}
                                            <div className="space-y-3">
                                                <label className="text-[8px] font-black uppercase tracking-widest text-white/30">Team List Logic</label>
                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { id: 'TRADITIONAL', label: 'Traditional' },
                                                        { id: 'ALTERNATING', label: 'Alternating' }
                                                    ].map((style) => (
                                                        <button
                                                            key={style.id}
                                                            onClick={() => updateField('teamListStyle', style.id)}
                                                            className={`py-2 px-1 rounded-lg text-[7px] font-black uppercase tracking-widest transition-all border ${formData.teamListStyle === style.id ? 'bg-brand-gold text-brand-dark border-brand-gold' : 'bg-white/5 text-white/40 border-white/5'}`}
                                                        >
                                                            {style.label}
                                                        </button>
                                                    ))}
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
                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/30 ml-1">Firm Narrative</label>
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
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Google Reviews URL</label>
                                        <div className="relative flex items-center">
                                            <Star className="text-brand-gold/40 mr-3" size={14} />
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent text-xs text-white outline-none font-medium placeholder:text-white/5"
                                                value={formData.googleReviewsUrl || ''}
                                                onChange={(e) => updateField('googleReviewsUrl', e.target.value)}
                                                placeholder="Search for your business on Google Maps..."
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-3">
                                        <label className="text-[9px] font-black uppercase tracking-widest text-white/30">Google Maps URL</label>
                                        <div className="relative flex items-center">
                                            <MapPin className="text-brand-gold/40 mr-3" size={14} />
                                            <input
                                                type="text"
                                                className="flex-1 bg-transparent text-xs text-white outline-none font-medium placeholder:text-white/5"
                                                value={formData.googleMapsUrl || ''}
                                                onChange={(e) => updateField('googleMapsUrl', e.target.value)}
                                                placeholder="google.com/maps/place/..."
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div className="p-8 border-t border-white/5 bg-brand-dark shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                    <button
                        onClick={handleSave}
                        disabled={isSaving || isUploadingHero}
                        className="w-full h-16 flex items-center justify-center gap-4 rounded-2xl bg-white text-black font-black uppercase tracking-[0.2em] text-xs transition-all hover:scale-[1.03] active:scale-[0.97] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] disabled:opacity-50"
                    >
                        <Save size={18} />
                        {isSaving ? "Persisting changes..." : (portalPreviewMode === "PROFILE" ? "Save Member Profile" : "Save Site Changes")}
                    </button>
                    <p className="mt-4 text-center text-[8px] font-bold text-white/20 uppercase tracking-[0.3em]">Instant site synchronization enabled</p>
                </div>
            </div>
        </div>
    );
}
