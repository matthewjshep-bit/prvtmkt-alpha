"use client";

import { useData } from "@/context/DataContext";
import { Users, Mail, Phone, ExternalLink, Search, Building2 } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ExplorePeoplePage() {
    const { teamMembers, firms } = useData();
    const [searchQuery, setSearchQuery] = useState("");

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-brand-dark pt-28 pb-20">
            <div className="container mx-auto px-6">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-white">Explore <span className="text-brand-gold">People</span></h1>
                    <p className="mt-2 text-foreground/50 text-lg">Connect with the industry's top commercial real estate professionals.</p>
                </div>

                <div className="mb-10 relative group max-w-2xl">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-brand-gold transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name, role, or expertise..."
                        className="w-full rounded-2xl border border-white/5 bg-brand-gray-900/50 pl-12 pr-4 py-4 text-white outline-none focus:border-brand-gold/50 transition-all font-medium placeholder:text-white/20"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredMembers.map((member, index) => {
                        const firm = firms.find(f => f.id === member.firmId);
                        return (
                            <motion.div
                                key={member.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-900/50 hover:shadow-2xl hover:shadow-brand-gold/5"
                            >
                                <div className="aspect-[4/5] relative overflow-hidden">
                                    <img
                                        src={member.imageURL}
                                        alt={member.name}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />

                                    {firm && (
                                        <div className="absolute top-4 left-4">
                                            <div className="flex items-center gap-2 rounded-full bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                                                <div className="h-5 w-5 overflow-hidden rounded-full border border-white/20">
                                                    {firm.logoUrl ? (
                                                        <img src={firm.logoUrl} className="h-full w-full object-contain" />
                                                    ) : (
                                                        <Building2 size={10} className="m-auto text-brand-gold" />
                                                    )}
                                                </div>
                                                <span className="text-[10px] font-bold text-white uppercase tracking-widest">{firm.name}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="p-6">
                                    <div className="mb-4">
                                        <h3 className="text-xl font-bold text-white group-hover:text-brand-gold transition-colors">{member.name}</h3>
                                        <p className="text-xs font-bold text-brand-gold/60 uppercase tracking-widest mt-1">{member.role}</p>
                                    </div>

                                    <p className="text-sm text-foreground/50 line-clamp-2 mb-6 h-10">
                                        {member.bio}
                                    </p>

                                    <div className="flex items-center gap-3">
                                        <Link
                                            href={`/team/${member.slug}`}
                                            className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-xs font-bold text-white transition-all hover:bg-brand-gold hover:text-brand-dark"
                                        >
                                            View Profile
                                            <ExternalLink size={14} />
                                        </Link>
                                        <a
                                            href={`mailto:${member.email}`}
                                            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-foreground/40 transition-all hover:bg-brand-gold/10 hover:text-brand-gold"
                                        >
                                            <Mail size={18} />
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {filteredMembers.length === 0 && (
                    <div className="py-20 text-center">
                        <Users size={48} className="mx-auto mb-4 text-foreground/20" />
                        <h3 className="text-xl font-bold text-white">No professionals found</h3>
                        <p className="text-foreground/40">Try adjusting your search query.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
