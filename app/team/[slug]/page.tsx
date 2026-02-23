import { notFound } from "next/navigation";
import { MOCK_TEAM_MEMBERS, MOCK_DEALS } from "@/lib/mock-data";
import DealCard from "@/components/DealCard";
import { Mail, Briefcase, Award } from "lucide-react";

export default async function TeamMemberPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const member = MOCK_TEAM_MEMBERS.find((m) => m.slug === slug);

    if (!member) {
        notFound();
    }

    const memberDeals = MOCK_DEALS.filter((d) => d.teamMemberId === member.id);

    return (
        <div className="min-h-screen bg-brand-dark pt-24 pb-20">
            <div className="container mx-auto px-6">
                {/* Profile Header */}
                <div className="mb-16 flex flex-col items-center gap-10 md:flex-row md:items-start">
                    <div className="relative">
                        <div className="h-48 w-48 overflow-hidden rounded-2xl border-4 border-brand-gold/20">
                            <img
                                src={member.imageURL || ""}
                                alt={member.name}
                                className="h-full w-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-4 -right-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold text-brand-dark shadow-xl">
                            <Award size={24} />
                        </div>
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
                            {member.name}
                        </h1>
                        <p className="mb-6 text-xl font-medium text-brand-gold">{member.role}</p>

                        <p className="mb-8 max-w-2xl text-lg leading-relaxed text-foreground/70">
                            {member.bio}
                        </p>

                        <div className="flex flex-wrap justify-center gap-4 md:justify-start">
                            <a
                                href={`mailto:${member.email || "#"}`}
                                className="flex items-center gap-2 rounded-lg bg-brand-gray-800 px-5 py-2.5 text-sm font-semibold transition-all hover:bg-brand-gray-700"
                            >
                                <Mail size={18} className="text-brand-gold" />
                                Contact Profile
                            </a>
                            <div className="flex items-center gap-2 rounded-lg bg-brand-dark border border-white/5 px-5 py-2.5 text-sm font-semibold">
                                <Briefcase size={18} className="text-brand-gold" />
                                {memberDeals.length} Deals Completed
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="mb-12 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                {/* Track Record Grid */}
                <div>
                    <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                        <div>
                            <h2 className="text-2xl font-bold text-foreground">Track Record</h2>
                            <p className="text-foreground/50">Exclusive digital tombstones for this professional</p>
                        </div>

                        <div className="flex gap-2">
                            <button className="rounded-full bg-brand-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-brand-dark">
                                All Assets
                            </button>
                            <button className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/60 transition-all hover:border-brand-gold/30 hover:text-brand-gold">
                                Industrial
                            </button>
                            <button className="rounded-full border border-white/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider text-foreground/60 transition-all hover:border-brand-gold/30 hover:text-brand-gold">
                                Multifamily
                            </button>
                        </div>
                    </div>

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {memberDeals.map((deal, index) => (
                            <DealCard key={deal.id} deal={deal} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
