"use client";

import { useData } from "@/context/DataContext";
import { useState } from "react";
import {
    Users,
    UserPlus,
    Mail,
    Shield,
    X,
    Check,
    Trash2,
    Copy,
    ExternalLink,
    Loader2
} from "lucide-react";
import { useParams as useNextParams } from "next/navigation";

export default function TenantUsersPage() {
    const { firms, users, teamMembers, currentUser, deleteUser, updateUser, updateTeamMember, createInvitation } = useData();
    const params = useNextParams();
    const firmSlug = params.firmSlug as string;

    const [isInviting, setIsInviting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"FIRM_ADMIN" | "USER">("USER");
    const [savingId, setSavingId] = useState<string | null>(null);
    const [isInviteSent, setIsInviteSent] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const firm = firms.find(f => f.slug === firmSlug);
    if (!firm) return null;

    const firmUsers = users.filter(u => u.firmId === firm.id);
    const firmTeam = teamMembers.filter(m => (m.firmIds || []).includes(firm.id));

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const invitation = await createInvitation(inviteEmail, inviteRole, firm.id);
            if (invitation) {
                const link = `${window.location.origin}/auth/signup?token=${invitation.token}`;
                setInviteLink(link);
                setIsInviteSent(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">Authorized <span className="text-brand-gold">Users</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">Directory of accounts with administrative access to {firm.name}.</p>
                </div>
                <button
                    onClick={() => {
                        setIsInviting(true);
                        setIsInviteSent(false);
                        setInviteEmail("");
                    }}
                    className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                >
                    <Mail size={18} />
                    Invite Member
                </button>
            </div>

            {/* Invite Modal */}
            {isInviting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">
                                {isInviteSent ? "Invite " : "Send "}
                                <span className="text-brand-gold">{isInviteSent ? "Sent" : "Invite"}</span>
                            </h3>
                            <button
                                onClick={() => {
                                    setIsInviting(false);
                                    setIsInviteSent(false);
                                }}
                                className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {!isInviteSent ? (
                            <form onSubmit={handleInvite} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Team Member Email</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/20 group-focus-within:text-brand-gold" size={18} />
                                        <input
                                            required
                                            type="email"
                                            className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark pl-12 pr-4 text-white outline-none focus:border-brand-gold/50 transition-all font-bold"
                                            placeholder="alex@company.com"
                                            value={inviteEmail}
                                            onChange={(e) => setInviteEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Acess Permissions</label>
                                    <select
                                        className="w-full h-14 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right:16px_center] bg-no-repeat font-bold"
                                        value={inviteRole}
                                        onChange={(e) => setInviteRole(e.target.value as any)}
                                    >
                                        <option value="USER">Standard User (Profile Only)</option>
                                        <option value="FIRM_ADMIN">Firm Admin (Full Site)</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading || !inviteEmail}
                                    className="w-full h-14 flex items-center justify-center gap-3 rounded-xl bg-brand-gold text-brand-dark font-black uppercase tracking-widest text-xs transition-all hover:shadow-lg hover:scale-[1.02] disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" size={18} />
                                    ) : (
                                        <>
                                            <Mail size={18} />
                                            Send Secure Invite
                                        </>
                                    )}
                                </button>
                            </form>
                        ) : (
                            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-300">
                                <div className="p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 text-center">
                                    <p className="text-sm font-medium text-white mb-1">Invitation generated for</p>
                                    <p className="text-lg font-bold text-brand-gold">{inviteEmail}</p>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Copy Invitation Link</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 h-12 rounded-xl border border-white/5 bg-brand-dark px-4 flex items-center overflow-hidden">
                                            <span className="text-[10px] font-medium text-foreground/40 truncate">{inviteLink}</span>
                                        </div>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(inviteLink);
                                                alert("Link copied to clipboard!");
                                            }}
                                            className="h-12 w-12 flex items-center justify-center rounded-xl bg-white/5 text-white hover:bg-brand-gold hover:text-brand-dark transition-all"
                                        >
                                            <Copy size={18} />
                                        </button>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsInviting(false);
                                        setIsInviteSent(false);
                                    }}
                                    className="w-full h-14 rounded-xl border border-white/10 bg-brand-gray-900 text-white font-black uppercase tracking-widest text-xs hover:bg-white/5 transition-all"
                                >
                                    Dismiss and Return
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {(isEditing && editingUser) && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">Edit <span className="text-brand-gold">Identity</span></h3>
                            <button onClick={() => { setIsEditing(false); setEditingUser(null); }} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={async (e) => {
                            e.preventDefault();
                            await updateUser(editingUser.id, {
                                email: editingUser.email,
                                role: editingUser.role,
                                password: editingUser.password
                            });
                            setIsEditing(false);
                            setEditingUser(null);
                        }} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                    value={editingUser.email}
                                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 text-brand-gold">Security: Change Password</label>
                                <input
                                    type="password"
                                    placeholder="Enter new password to reset..."
                                    className="w-full rounded-xl border border-brand-gold/20 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                    onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Registry Role</label>
                                <select
                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
                                    value={editingUser.role}
                                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value as any })}
                                >
                                    <option value="USER">Standard User</option>
                                    <option value="FIRM_ADMIN">Firm Admin</option>
                                    <option value="SYSTEM_ADMIN">System Admin (Global)</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                            >
                                <Check size={18} />
                                Update Member Registry
                            </button>
                        </form>
                    </div>
                </div>
            )}

            <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
                <table className="w-full text-left">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/2">
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">User Identity</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Registry Role</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Linked Profile</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30">Status</th>
                            <th className="px-10 py-6 text-[10px] font-black uppercase tracking-widest text-foreground/30 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {firmUsers.length > 0 ? (
                            firmUsers.map((user) => (
                                <tr key={user.id} className="group hover:bg-white/[0.02] transition-colors">
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 rounded-xl bg-brand-gray-900 border border-white/5 flex items-center justify-center font-bold text-brand-gold">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="font-bold text-white">{user.email}</p>
                                                <p className="text-[10px] text-foreground/30 font-medium mt-0.5">ID: {user.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="inline-flex items-center gap-2 rounded-lg bg-brand-gold/5 border border-brand-gold/10 px-3 py-1.5">
                                            <Shield size={12} className="text-brand-gold" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8">
                                        {(() => {
                                            const linkedMember = teamMembers.find(m => m.userId === user.id);
                                            const isProcessing = savingId === user.id;

                                            return (
                                                <div className="flex items-center min-h-[40px]">
                                                    {isProcessing ? (
                                                        <div className="flex items-center gap-2 text-[10px] font-bold text-brand-gold animate-pulse">
                                                            <div className="h-4 w-4 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
                                                            Saving Registry...
                                                        </div>
                                                    ) : linkedMember ? (
                                                        <div className="flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
                                                            <div className="h-8 w-8 rounded-lg overflow-hidden border border-brand-gold/20 shrink-0 shadow-lg shadow-black/20">
                                                                <img src={linkedMember.imageURL || ""} className="h-full w-full object-cover" alt={linkedMember.name} />
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="text-[10px] font-bold text-white truncate max-w-[100px]">{linkedMember.name}</p>
                                                                <button
                                                                    onClick={async (e) => {
                                                                        e.stopPropagation();
                                                                        setSavingId(user.id);
                                                                        const success = await updateTeamMember(linkedMember.id, { userId: null });
                                                                        if (!success) {
                                                                            const errMsg = localStorage.getItem('last_update_member_error');
                                                                            alert(errMsg || "Failed to unlink profile. Please ensure you have administrative rights.");
                                                                        }
                                                                        setSavingId(null);
                                                                    }}
                                                                    className="text-[8px] font-black uppercase tracking-[0.1em] text-red-500/60 hover:text-red-400 transition-colors flex items-center gap-1"
                                                                >
                                                                    Unlink Profile
                                                                </button>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <select
                                                            className="bg-transparent border border-white/5 rounded-lg px-2 py-1 text-[10px] font-bold text-brand-gold/40 hover:text-brand-gold hover:border-brand-gold/20 outline-none cursor-pointer max-w-[140px] transition-all disabled:opacity-50"
                                                            value=""
                                                            disabled={isProcessing}
                                                            onChange={async (e) => {
                                                                const memberId = e.target.value;
                                                                if (memberId) {
                                                                    console.log(`[UI] Attempting to link User ${user.id} to Member ${memberId}`);
                                                                    setSavingId(user.id);
                                                                    const success = await updateTeamMember(memberId, { userId: user.id });
                                                                    if (!success) {
                                                                        const errMsg = localStorage.getItem('last_update_member_error');
                                                                        alert(`Registry Error: ${errMsg || "Database rejected connection. Likely this identity is tied elsewhere."}`);
                                                                    }
                                                                    setSavingId(null);
                                                                }
                                                            }}
                                                        >
                                                            <option value="" disabled className="bg-brand-gray-900">+ Associate Profile</option>
                                                            {firmTeam
                                                                .filter(m => !m.userId && m.name.toLowerCase().trim() !== "new team member")
                                                                .map(m => (
                                                                    <option key={m.id} value={m.id} className="bg-brand-gray-900">{m.name}</option>
                                                                ))
                                                            }
                                                            {firmTeam.filter(m => !m.userId && m.name.toLowerCase().trim() !== "new team member").length === 0 && (
                                                                <option disabled className="bg-brand-gray-900 opacity-50 underline">No members available</option>
                                                            )}
                                                        </select>
                                                    )}
                                                </div>
                                            );
                                        })()}
                                    </td>
                                    <td className="px-10 py-8">
                                        <div className="flex items-center gap-2">
                                            <div className="h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-white">Active</span>
                                        </div>
                                    </td>
                                    <td className="px-10 py-8 text-right">
                                        <div className="flex justify-end gap-2">
                                            {currentUser?.id !== user.id && (
                                                <>
                                                    <button
                                                        onClick={async () => {
                                                            setSavingId(`invite-${user.id}`);
                                                            try {
                                                                const invitation = await createInvitation(user.email, user.role as any, firm.id);
                                                                if (invitation) {
                                                                    alert(`Invitation sent to ${user.email}`);
                                                                } else {
                                                                    alert("Failed to send invitation. Please check API settings.");
                                                                }
                                                            } catch (err) {
                                                                alert("Error sending invitation.");
                                                            } finally {
                                                                setSavingId(null);
                                                            }
                                                        }}
                                                        disabled={savingId === `invite-${user.id}`}
                                                        className={`p-2 transition-colors ${savingId === `invite-${user.id}` ? 'text-brand-gold animate-pulse' : 'text-foreground/20 hover:text-brand-gold'}`}
                                                        title="Send Invitation Email"
                                                    >
                                                        {savingId === `invite-${user.id}` ? <Loader2 size={18} className="animate-spin" /> : <Mail size={18} />}
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingUser({ ...user });
                                                            setIsEditing(true);
                                                        }}
                                                        className="p-2 text-foreground/20 hover:text-brand-gold transition-colors"
                                                        title="Edit Identity & Role"
                                                    >
                                                        <Shield size={18} />
                                                    </button>
                                                    <button
                                                        onClick={async () => {
                                                            if (confirm(`Are you sure you want to remove access for ${user.email}?`)) {
                                                                await deleteUser(user.id);
                                                            }
                                                        }}
                                                        className="p-2 text-foreground/20 hover:text-red-500 transition-colors"
                                                        title="Revoke Access"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </>
                                            )}
                                            {currentUser?.id === user.id && (
                                                <span className="text-[10px] font-black uppercase tracking-widest text-foreground/20 italic">You</span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={4} className="px-10 py-20 text-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <Users className="text-foreground/10" size={48} />
                                        <p className="text-xs font-black uppercase tracking-widest text-foreground/20">No users identified for this entity</p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Admin Note */}
            <div className="p-8 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 flex gap-6 items-start">
                <Shield className="text-brand-gold shrink-0 mt-1" size={24} />
                <div>
                    <h4 className="font-bold text-white mb-1">Administrative Protocol</h4>
                    <p className="text-xs font-medium text-foreground/40 leading-relaxed max-w-2xl">
                        Users assigned to this firm have full administrative rights to edit settings, deals, and team members.
                        To restrict access levels or offboard users, please contact the System Administrator.
                    </p>
                </div>
            </div>
        </div>
    );
}
