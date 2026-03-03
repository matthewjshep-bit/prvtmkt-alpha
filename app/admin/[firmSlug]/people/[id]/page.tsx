"use client";

import { useState, useEffect, Suspense } from "react";
import { useData, TeamMember, Firm, TeamMemberFile } from "@/context/DataContext";
import { useParams, useRouter } from "next/navigation";
import MemberDetailView from "@/components/MemberDetailView";
import TeamMemberSubSidebar from "@/components/TeamMemberSubSidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function MemberAdminPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center bg-brand-dark"><div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" /></div>}>
            <MemberAdminContent />
        </Suspense>
    );
}

function MemberAdminContent() {
    const {
        teamMembers, firms, updateTeamMember, uploadMemberFile,
        updateMemberFile, deleteMemberFile, fetchMemberFiles,
        deals, users, currentUser, isInitialized, addTeamMember
    } = useData();
    const params = useParams();
    const router = useRouter();
    const firmSlug = params.firmSlug as string;
    const memberId = params.id as string;

    const [activeTab, setActiveTab] = useState<"FILES" | "DEALS" | "SETTINGS">("FILES");
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [selectedFile, setSelectedFile] = useState<TeamMemberFile | null>(null);
    const [isEditingFile, setIsEditingFile] = useState(false);
    const [fileEditContent, setFileEditContent] = useState("");
    const [localMember, setLocalMember] = useState<TeamMember | null>(null);

    const member = teamMembers.find(m => m.id === memberId);

    useEffect(() => {
        if (isInitialized && memberId) {
            fetchMemberFiles(memberId);
        }
    }, [isInitialized, memberId]);

    // Reset local draft when memberId changes
    useEffect(() => {
        setLocalMember(null);
    }, [memberId]);

    // Initial seeding of local state
    useEffect(() => {
        if (member && !localMember) {
            setLocalMember(member);
        }
    }, [member, localMember]);

    if (!isInitialized || !member) {
        return (
            <div className="flex h-screen items-center justify-center bg-brand-dark">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-brand-gold/30 border-t-brand-gold" />
            </div>
        );
    }

    const handleUpdate = (updates: Partial<TeamMember>) => {
        setLocalMember(prev => prev ? { ...prev, ...updates } : null);
    };

    const handleAddMember = async () => {
        const firmId = firms.find(f => f.slug === firmSlug)?.id || "";
        const newMember: TeamMember = {
            id: `new-${Date.now()}`,
            firmId: firmId,
            firmIds: [firmId],
            slug: `new-member-${Date.now()}`,
            name: "New Member",
            role: "Role",
            imageURL: "",
            bio: "",
            order: teamMembers.length
        };
        const saved = await addTeamMember(newMember);
        if (saved) {
            router.push(`/admin/${firmSlug}/people/${saved.id}`);
        }
    };

    const handleSave = async () => {
        if (!localMember) return;
        setSaveStatus('saving');

        // Extract fields to save
        const updates: Partial<TeamMember> = {
            name: localMember.name,
            role: localMember.role,
            email: localMember.email,
            linkedInUrl: localMember.linkedInUrl,
            phoneNumber: localMember.phoneNumber,
            bio: localMember.bio,
            department: localMember.department,
            managerId: localMember.managerId,
            userId: localMember.userId,
            imageURL: localMember.imageURL
        };

        const success = await updateTeamMember(memberId, updates);
        if (success) {
            setSaveStatus('saved');
            setTimeout(() => setSaveStatus('idle'), 2000);
        } else {
            const error = localStorage.getItem('last_update_member_error');
            console.error('[MemberAdmin] Save Failed:', error);
            setSaveStatus('idle');
            alert(`Error saving changes: ${error}`);
        }
    };

    const onAddFile = async (name: string, content: string, type?: string) => {
        const file = await uploadMemberFile(memberId, { name, content, type: type || 'OTHER' });
        if (file) {
            setSelectedFile(file);
            setFileEditContent(file.content);
            setIsEditingFile(true);
        }
    };

    const onSaveFile = async () => {
        if (!selectedFile) return;
        const success = await updateMemberFile(memberId, selectedFile.id, { content: fileEditContent });
        if (success) {
            setIsEditingFile(false);
            // Don't clear selectedFile immediately if we want to keep it "active" in the UI
        }
    };

    return (
        <div className="fixed inset-0 lg:left-[288px] bg-brand-dark flex overflow-hidden">
            <TeamMemberSubSidebar
                teamMembers={teamMembers.filter(m => m.firmId === firms.find(f => f.slug === firmSlug)?.id || (m.firmIds || []).includes(firms.find(f => f.slug === firmSlug)?.id || ""))}
                activeMemberId={memberId}
                onAddMember={handleAddMember}
            />

            <div className="flex-1 overflow-y-auto custom-scrollbar border-l border-white/5">
                <MemberDetailView
                    member={localMember || member}
                    onBack={() => router.push(`/admin/${firmSlug}/people/gallery-editor`)}
                    onUpdate={handleUpdate}
                    onSave={handleSave}
                    saveStatus={saveStatus}
                    deals={deals.filter(d => d.teamMemberId === member.id || (d.teamMemberIds || []).includes(member.id))}
                    users={users}
                    teamMembers={teamMembers}
                    firms={firms}
                    currentUser={currentUser}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    onFileSelect={(file) => {
                        setSelectedFile(file);
                        setFileEditContent(file.content);
                        setIsEditingFile(true);
                    }}
                    onAddFile={onAddFile}
                    onDeleteFile={(fileId) => deleteMemberFile(memberId, fileId)}
                    isEditingFile={isEditingFile}
                    fileEditContent={fileEditContent}
                    onFileContentChange={setFileEditContent}
                    onSaveFile={onSaveFile}
                    onCloseEditor={() => {
                        setIsEditingFile(false);
                        setSelectedFile(null);
                    }}
                />
            </div>
        </div>
    );
}
