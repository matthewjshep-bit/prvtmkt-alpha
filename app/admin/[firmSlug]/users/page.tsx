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
    Trash2
} from "lucide-react";
import { useParams as useNextParams } from "next/navigation";

export default function TenantUsersPage() {
    const { firms, users, currentUser, addUser, deleteUser, updateUser } = useData();
    const params = useNextParams();
    const firmSlug = params.firmSlug as string;

    const [isInviting, setIsInviting] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [inviteEmail, setInviteEmail] = useState("");
    const [inviteRole, setInviteRole] = useState<"ADMIN" | "USER">("USER");

    const firm = firms.find(f => f.slug === firmSlug);
    if (!firm) return null;

    const firmUsers = users.filter(u => u.firmId === firm.id);

    const handleInvite = (e: React.FormEvent) => {
        e.preventDefault();
        const newUser = {
            id: `u-${Date.now()}`,
            email: inviteEmail,
            firmId: firm.id,
            role: inviteRole as any
        };
        addUser(newUser);
        setIsInviting(false);
        setInviteEmail("");
    };

    return (
        <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">Authorized <span className="text-brand-gold">Users</span></h1>
                    <p className="mt-2 text-foreground/40 font-medium">Directory of accounts with administrative access to {firm.name}.</p>
                </div>
                <button
                    onClick={() => setIsInviting(true)}
                    className="flex items-center gap-2 rounded-xl border border-brand-gold/30 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                >
                    <UserPlus size={18} />
                    Invite Member
                </button>
            </div>

            {/* Invite Modal */}
            {isInviting && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-2xl font-bold text-white">Invite <span className="text-brand-gold">Member</span></h3>
                            <button onClick={() => setIsInviting(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleInvite} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Email Address</label>
                                <input
                                    required
                                    type="email"
                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                    placeholder="colleague@firm.com"
                                    value={inviteEmail}
                                    onChange={(e) => setInviteEmail(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Access Level</label>
                                <select
                                    className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
                                    value={inviteRole}
                                    onChange={(e) => setInviteRole(e.target.value as any)}
                                >
                                    <option value="USER">Standard User</option>
                                    <option value="ADMIN">Firm Admin</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                            >
                                <Mail size={18} />
                                Send Invitation
                            </button>
                        </form>
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

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            updateUser(editingUser.id, {
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
                                    <option value="ADMIN">Firm Admin</option>
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
                                                        onClick={() => {
                                                            if (confirm(`Are you sure you want to remove access for ${user.email}?`)) {
                                                                deleteUser(user.id);
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
