"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import {
    LayoutDashboard,
    Building2,
    Briefcase,
    Users,
    ArrowUpRight,
    Plus,
    Settings,
    X,
    Save,
    UserPlus,
    Fingerprint,
    Shield,
    Trash2,
    Ghost
} from "lucide-react";

export default function AdminDashboard() {
    const data = useData();
    const { firms, deals, teamMembers, addFirm, activities, addUser, deleteUser, updateUser, currentUser, impersonateUser } = data;

    // Access Control: Only SYSTEM_ADMIN can access global admin dashboard
    if (currentUser && currentUser.role !== 'SYSTEM_ADMIN') {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-brand-dark px-6">
                <div className="text-center">
                    <h1 className="text-6xl font-black text-white italic">ACCESS <span className="text-red-500">DENIED</span></h1>
                    <p className="mt-4 text-foreground/50 uppercase tracking-[0.2em] font-bold">Unauthorized Privilege Escalation Attempt Detected</p>
                    <Link href="/" className="mt-12 inline-block rounded-full border border-white/20 px-8 py-3 text-xs font-black uppercase tracking-widest text-white transition-all hover:bg-white hover:text-brand-dark">
                        Return to Safety
                    </Link>
                </div>
            </div>
        );
    }

    // Debug log
    if (typeof window !== 'undefined' && !addFirm) {
        console.error("AdminDashboard: addFirm is undefined!", data);
    }

    const [isAddingFirm, setIsAddingFirm] = useState(false);
    const [isAddingUser, setIsAddingUser] = useState(false);
    const [isEditingUser, setIsEditingUser] = useState(false);
    const [editingUser, setEditingUser] = useState<any>(null);
    const [newUserEmail, setNewUserEmail] = useState("");
    const [newUserFirmId, setNewUserFirmId] = useState("");
    const [newUserRole, setNewUserRole] = useState<"FIRM_ADMIN" | "USER" | "SYSTEM_ADMIN">("FIRM_ADMIN");

    const [newFirm, setNewFirm] = useState({
        name: "",
        logoUrl: "",
        primaryColor: "#c5a059"
    });

    const handleEditUser = (e: React.FormEvent) => {
        e.preventDefault();
        updateUser(editingUser.id, {
            email: editingUser.email,
            password: editingUser.password,
            firmId: editingUser.firmId
        });
        setIsEditingUser(false);
        setEditingUser(null);
    };

    const handleAddUser = (e: React.FormEvent) => {
        e.preventDefault();
        const userToAdd = {
            id: `u-${Date.now()}`,
            email: newUserEmail,
            firmId: newUserFirmId,
            role: newUserRole
        };
        data.addUser(userToAdd);
        setIsAddingUser(false);
        setNewUserEmail("");
        setNewUserFirmId("");
    };

    const handleAddFirm = (e: React.FormEvent) => {
        e.preventDefault();
        const firmToAdd = {
            ...newFirm,
            id: `f-${Date.now()}`,
            slug: newFirm.name.toLowerCase().replace(/\s+/g, '-'),
        };
        addFirm(firmToAdd);
        setIsAddingFirm(false);
        setNewFirm({ name: "", logoUrl: "", primaryColor: "#c5a059" });
    };

    const stats = [
        { label: "Total Firms", value: firms.length, icon: <Building2 className="text-brand-gold" size={20} />, href: "/admin/firms" },
        { label: "Total Deals", value: deals.length, icon: <Briefcase className="text-brand-gold" size={20} />, href: "/admin/deals" },
        { label: "Active Team Members", value: teamMembers.length, icon: <Users className="text-brand-gold" size={20} />, href: "/admin/people" },
        { label: "Platform Users", value: data.users.length, icon: <Fingerprint className="text-brand-gold" size={20} />, href: "#users" },
    ];

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12 flex items-center justify-between">
                    <div>
                        <h1 className="text-4xl font-bold text-white">System <span className="text-brand-gold">Admin</span></h1>
                        <p className="mt-2 text-foreground/50">Manage platform entities and global configurations.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link
                            href="/admin/deals?add=true"
                            className="flex items-center gap-2 rounded-xl border-2 border-brand-gold/30 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                        >
                            <Briefcase size={18} />
                            Add New Deal
                        </Link>
                        <Link
                            href="/admin/people?add=true"
                            className="flex items-center gap-2 rounded-xl border-2 border-brand-gold/30 px-6 py-3 text-sm font-bold text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark"
                        >
                            <UserPlus size={18} />
                            Generate New Member
                        </Link>
                        <button
                            onClick={() => setIsAddingFirm(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/20"
                        >
                            <Plus size={18} />
                            Generate New Firm
                        </button>
                    </div>
                </div>

                {/* New Firm Modal */}
                {isAddingFirm && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Generate <span className="text-brand-gold">New Firm</span></h3>
                                <button onClick={() => setIsAddingFirm(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddFirm} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Firm Name</label>
                                    <input
                                        required
                                        type="text"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        placeholder="e.g. Blackstone"
                                        value={newFirm.name}
                                        onChange={(e) => setNewFirm({ ...newFirm, name: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Primary Color (Hex)</label>
                                    <div className="flex gap-3">
                                        <input
                                            type="text"
                                            className="flex-1 rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-white/50"
                                            placeholder="#ffffff"
                                            value={newFirm.primaryColor}
                                            onChange={(e) => setNewFirm({ ...newFirm, primaryColor: e.target.value })}
                                        />
                                        <div className="h-12 w-12 rounded-xl border border-white/10" style={{ backgroundColor: newFirm.primaryColor }} />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                                >
                                    <Save size={18} />
                                    Create Firm Entity
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Stats Grid */}
                <div className="mb-12 grid gap-6 md:grid-cols-4">
                    {stats.map((stat) => (
                        <Link
                            key={stat.label}
                            href={stat.href}
                            className="glass rounded-2xl p-6 transition-all hover:border-brand-gold/30"
                        >
                            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gray-900 border border-white/5">
                                {stat.icon}
                            </div>
                            <p className="text-sm font-bold uppercase tracking-widest text-foreground/40">{stat.label}</p>
                            <div className="mt-1 flex items-end justify-between">
                                <p className="text-4xl font-bold text-white">{stat.value}</p>
                                <ArrowUpRight size={20} className="text-brand-gold" />
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Recent Firms */}
                    <div className="glass rounded-3xl p-8 border border-white/5">
                        <div className="mb-6 flex items-center justify-between">
                            <h3 className="text-xl font-bold text-white">Manage Firms</h3>
                            <Link href="/admin/firms" className="text-xs font-bold uppercase tracking-widest text-brand-gold hover:underline">View All</Link>
                        </div>
                        <div className="space-y-4">
                            {firms.slice(0, 5).map((firm) => (
                                <div key={firm.id} className="flex items-center justify-between rounded-xl bg-brand-gray-900/50 p-4 border border-white/5">
                                    <div className="flex items-center gap-4">
                                        <div className="h-10 w-24 flex items-center justify-center rounded-lg bg-white/5 p-1">
                                            {firm.logoUrl ? (
                                                <img src={firm.logoUrl} alt={firm.name} className="h-full object-contain" />
                                            ) : (
                                                <Building2 className="text-brand-gold" size={20} />
                                            )}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{firm.name}</h4>
                                            <p className="text-xs text-foreground/40">/{firm.slug}</p>
                                        </div>
                                    </div>
                                    <Link href={`/admin/${firm.slug}`} className="rounded-lg p-2 text-foreground/40 transition-all hover:bg-brand-gray-800 hover:text-brand-gold">
                                        <Settings size={18} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Global Activity Feed */}
                    <div className="glass rounded-3xl p-8 border border-white/5">
                        <h3 className="mb-6 text-xl font-bold text-white">Global Activity</h3>
                        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {activities.length > 0 ? (
                                activities.map((activity) => {
                                    const firm = firms.find(f => f.id === activity.firmId);
                                    return (
                                        <div key={activity.id} className="relative flex gap-4 pb-6 before:absolute before:left-[19px] before:top-10 before:bottom-0 before:w-px before:bg-white/5 last:pb-0 last:before:hidden">
                                            <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gray-900 border border-white/10">
                                                {firm?.logoUrl ? (
                                                    <img src={firm.logoUrl} alt="" className="h-6 w-6 object-contain opacity-50" />
                                                ) : (
                                                    <LayoutDashboard size={18} className="text-brand-gold/30" />
                                                )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-bold text-white">{activity.title}</p>
                                                    <span className="text-[10px] text-foreground/30 font-medium">
                                                        {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </span>
                                                </div>
                                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60">
                                                    {firm?.name || 'Platform System'}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="flex h-64 flex-col items-center justify-center text-center">
                                    <div className="mb-4 rounded-full bg-brand-gray-900 p-4">
                                        <LayoutDashboard size={32} className="text-brand-gold/30" />
                                    </div>
                                    <p className="text-sm text-foreground/50">System-wide activity logs will appear here.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* System User Registry */}
                <div id="users" className="mt-12 glass rounded-3xl p-8 border border-white/5 bg-brand-gray-900/10">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h3 className="text-2xl font-bold text-white">System <span className="text-brand-gold">User Registry</span></h3>
                            <p className="text-xs text-foreground/40 mt-1 uppercase tracking-widest font-black">Global Access Control</p>
                        </div>
                        <button
                            onClick={() => setIsAddingUser(true)}
                            className="flex items-center gap-2 rounded-xl bg-brand-gold/10 px-6 py-3 text-xs font-black uppercase tracking-widest text-brand-gold hover:bg-brand-gold/20 transition-all"
                        >
                            <Plus size={16} />
                            Provision User
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/5">
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-foreground/30 px-4">Identity</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-foreground/30 px-4">Primary Firm</th>
                                    <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-foreground/30 px-4">Privilege Level</th>
                                    <th className="pb-4 text-right text-[10px] font-black uppercase tracking-widest text-foreground/30 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {data.users.map((user) => {
                                    const firm = firms.find(f => f.id === user.firmId);
                                    return (
                                        <tr key={user.id} className="group hover:bg-white/[0.02]">
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-8 w-8 rounded-full bg-brand-gray-900 flex items-center justify-center border border-white/5">
                                                        <Fingerprint size={14} className="text-brand-gold/50" />
                                                    </div>
                                                    <span className="text-sm font-bold text-white">{user.email}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4">
                                                <span className="text-xs font-medium text-foreground/60">{firm?.name || 'Unlinked'}</span>
                                            </td>
                                            <td className="py-4 px-4">
                                                <div className="flex items-center gap-2">
                                                    <Shield size={12} className={user.role === 'SYSTEM_ADMIN' ? 'text-red-500' : 'text-brand-gold/50'} />
                                                    <span className={`text-[10px] font-black uppercase tracking-widest ${user.role === 'SYSTEM_ADMIN' ? 'text-red-500' : 'text-foreground/40'}`}>
                                                        {user.role}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button
                                                        onClick={() => impersonateUser(user)}
                                                        disabled={currentUser?.id === user.id}
                                                        className={`p-2 transition-colors ${currentUser?.id === user.id ? 'text-white/5 cursor-not-allowed' : 'text-foreground/20 hover:text-brand-gold'}`}
                                                        title="Impersonate User"
                                                    >
                                                        <Ghost size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setEditingUser({ ...user });
                                                            setIsEditingUser(true);
                                                        }}
                                                        className="p-2 text-foreground/20 hover:text-brand-gold transition-colors"
                                                        title="Edit User Credentials"
                                                    >
                                                        <Settings size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            const newRole = user.role === 'FIRM_ADMIN' ? 'SYSTEM_ADMIN' : 'FIRM_ADMIN';
                                                            updateUser(user.id, { role: newRole as any });
                                                        }}
                                                        className="p-2 text-foreground/20 hover:text-brand-gold transition-colors"
                                                        title="Toggle Admin/System Admin"
                                                    >
                                                        <Shield size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            if (confirm(`Are you sure you want to delete user ${user.email}?`)) {
                                                                deleteUser(user.id);
                                                            }
                                                        }}
                                                        disabled={currentUser?.id === user.id}
                                                        className={`p-2 transition-colors ${currentUser?.id === user.id ? 'text-white/5 cursor-not-allowed' : 'text-foreground/20 hover:text-red-500'}`}
                                                        title="Remove User"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {data.users.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="py-12 text-center">
                                            <p className="text-sm text-foreground/20 font-medium italic">No registered users in the current environment context.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* User Provisioning Modal */}
                {isAddingUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Provision <span className="text-brand-gold">Global User</span></h3>
                                <button onClick={() => setIsAddingUser(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleAddUser} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Email Address</label>
                                    <input
                                        required
                                        type="email"
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        placeholder="user@example.com"
                                        value={newUserEmail}
                                        onChange={(e) => setNewUserEmail(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Primary Firm Association</label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
                                        value={newUserFirmId}
                                        onChange={(e) => setNewUserFirmId(e.target.value)}
                                    >
                                        <option value="">Select a Firm...</option>
                                        <option value="system">System (No Association)</option>
                                        {firms.map(f => (
                                            <option key={f.id} value={f.id}>{f.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Global Privilege Level</label>
                                    <select
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
                                        value={newUserRole}
                                        onChange={(e) => setNewUserRole(e.target.value as any)}
                                    >
                                        <option value="USER">Standard Account</option>
                                        <option value="FIRM_ADMIN">Firm Administrator</option>
                                        <option value="SYSTEM_ADMIN">Global System Admin</option>
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                                >
                                    <Fingerprint size={18} />
                                    Confirm Provisioning
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Edit User Modal */}
                {isEditingUser && editingUser && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-dark/90 backdrop-blur-sm p-4">
                        <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-brand-gray-900 p-8 shadow-2xl animate-in zoom-in duration-300">
                            <div className="mb-6 flex items-center justify-between">
                                <h3 className="text-2xl font-bold text-white">Edit <span className="text-brand-gold">User Identity</span></h3>
                                <button onClick={() => setIsEditingUser(false)} className="rounded-full p-2 text-foreground/40 hover:bg-white/5 hover:text-white">
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handleEditUser} className="space-y-6">
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
                                    <label className="text-xs font-bold uppercase tracking-widest text-brand-gold">Reset Password</label>
                                    <input
                                        type="password"
                                        className="w-full rounded-xl border border-brand-gold/20 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50"
                                        placeholder="Enter new password..."
                                        onChange={(e) => setEditingUser({ ...editingUser, password: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40">Primary Firm Association</label>
                                    <select
                                        required
                                        className="w-full rounded-xl border border-white/5 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-gold/50 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cpath%20d%3D%22M5%207L10%2012L15%207%22%20stroke%3D%22%23666666%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22/%3E%3C/svg%3E')] bg-[length:20px_20px] bg-[right_16px_center] bg-no-repeat"
                                        value={editingUser.firmId || ""}
                                        onChange={(e) => setEditingUser({ ...editingUser, firmId: e.target.value })}
                                    >
                                        <option value="">Select a Firm...</option>
                                        <option value="system">System (No Association)</option>
                                        {firms.map(f => (
                                            <option key={f.id} value={f.id}>{f.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-brand-gold py-4 text-sm font-bold text-brand-dark transition-all hover:shadow-lg hover:shadow-brand-gold/30"
                                >
                                    <Save size={18} />
                                    Update User Registry
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
