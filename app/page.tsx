"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { ShieldCheck, Zap, Globe, Building2, PlusCircle, Filter, Users, Briefcase, Search, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

export default function PlatformLandingPage() {
  const { firms, deals, teamMembers } = useData();
  const [activeTab, setActiveTab] = useState<"FIRMS" | "PEOPLE" | "DEALS">("FIRMS");
  const [searchQuery, setSearchQuery] = useState("");
  const [assetFilter, setAssetFilter] = useState("ALL");

  // Filter Logic
  const filteredFirms = firms.filter(firm =>
    firm.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publicDeals = deals.filter(deal => deal.isPublic);
  const filteredDeals = publicDeals.filter(deal => {
    const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      deal.assetType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = assetFilter === "ALL" || deal.assetType === assetFilter;
    return matchesSearch && matchesFilter;
  });

  const assetTypes = ["ALL", ...Array.from(new Set(publicDeals.map(d => d.assetType)))];

  return (
    <div className="min-h-screen bg-brand-dark pb-20 pt-40">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="mb-24 text-center flex flex-col items-center">
          <div className="mb-8 relative h-32 md:h-48 w-full max-w-4xl overflow-hidden flex items-center justify-center">
            <img
              src="/logo.svg"
              alt="PRVT MKT Logo"
              className="h-full w-full object-contain scale-[1.1] brightness-200"
            />
          </div>
          <div className="space-y-6">
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tighter"
              style={{ fontFamily: "'Bank Gothic', sans-serif", fontWeight: 600 }}
            >
              Private Markets Professionally Presented
            </h1>
            <p
              className="mx-auto max-w-3xl text-sm md:text-xl text-white leading-relaxed px-4 opacity-40 tracking-widest"
              style={{ fontFamily: "'Bank Gothic', sans-serif", fontWeight: 600 }}
            >
              Your Track Record, Your Team, Your Brand. All In One Platform.
            </p>
          </div>
        </div>
        {/* Discovery Navigation */}
        <div id="discovery-nav" className="mb-10 flex flex-col items-center gap-8 scroll-mt-24">
          <div className="flex gap-2 p-1.5 bg-white/5 rounded-[2rem] border border-white/5 overflow-x-auto max-w-full">
            <DiscoveryTab
              label="Explore Firms"
              active={activeTab === "FIRMS"}
              onClick={() => setActiveTab("FIRMS")}
              icon={<Building2 size={16} />}
            />
            <DiscoveryTab
              label="Explore People"
              active={activeTab === "PEOPLE"}
              onClick={() => setActiveTab("PEOPLE")}
              icon={<Users size={16} />}
            />
            <DiscoveryTab
              label="Explore Deals"
              active={activeTab === "DEALS"}
              onClick={() => setActiveTab("DEALS")}
              icon={<Briefcase size={16} />}
            />
          </div>

          <div className="w-full max-w-2xl relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-foreground/40 group-focus-within:text-brand-gold transition-colors" size={20} />
            <input
              type="text"
              placeholder={`Search ${activeTab.toLowerCase()}...`}
              className="h-16 w-full rounded-3xl border border-white/5 bg-brand-gray-900/50 pl-16 pr-6 text-white outline-none focus:border-brand-gold/50 transition-all font-bold placeholder:text-white/20 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Gallery Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "FIRMS" && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {filteredFirms.map((firm) => (
                  <Link
                    key={firm.id}
                    href={`/firms/${firm.slug || firm.id}`}
                    className="group relative flex flex-col items-center justify-center overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900 p-12 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-800 hover:shadow-2xl hover:shadow-brand-gold/10"
                  >
                    <div className="mb-8 flex h-40 w-full items-center justify-center p-4">
                      {firm.logoUrl ? (
                        <img
                          src={firm.logoUrl}
                          alt={firm.name}
                          className="max-h-full max-w-full object-contain transition-all duration-500 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-4 text-foreground/20 transition-all duration-500 group-hover:scale-110">
                          <Building2 size={64} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-center text-3xl font-black tracking-tight text-white transition-all duration-500 group-hover:text-white">
                      {firm.name}
                    </h3>
                  </Link>
                ))}
                <Link href="/admin/firms" className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-white/5 p-12 text-center transition-all hover:border-brand-gold/20 hover:bg-white/5">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gray-900">
                    <PlusCircle size={32} className="text-brand-gold" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Add Your Firm</h3>
                </Link>
              </div>
            )}

            {activeTab === "PEOPLE" && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredMembers.map((member, index) => {
                  const firm = firms.find(f => f.id === member.firmId);
                  return (
                    <div key={member.id} className="glass group overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900/30 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-900/50 hover:shadow-2xl hover:shadow-brand-gold/5">
                      <div className="aspect-[4/5] relative overflow-hidden">
                        <img src={member.imageURL} alt={member.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-60" />
                        {firm && (
                          <div className="absolute top-4 left-4">
                            <div className="flex items-center gap-2 rounded-full bg-brand-dark/80 backdrop-blur-md px-3 py-1.5 border border-white/10">
                              <div className="h-5 w-5 overflow-hidden rounded-full border border-white/20">
                                {firm.logoUrl ? <img src={firm.logoUrl} className="h-full w-full object-contain" /> : <Building2 size={10} className="m-auto text-brand-gold" />}
                              </div>
                              <span className="text-[10px] font-bold text-white uppercase tracking-widest">{firm.name}</span>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="mb-4">
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-xs font-bold text-brand-gold/60 uppercase tracking-widest mt-1">{member.role}</p>
                        </div>
                        <Link href={`/team/${member.slug}`} className="flex items-center justify-center gap-2 rounded-xl bg-white/5 py-3 text-xs font-bold text-white transition-all hover:bg-brand-gold hover:text-brand-dark">
                          View Profile <ExternalLink size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {activeTab === "DEALS" && (
              <div className="space-y-10">
                <div className="flex gap-2 p-1 bg-white/5 rounded-2xl overflow-x-auto self-start w-fit mx-auto">
                  {assetTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setAssetFilter(type)}
                      className={`px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap ${assetFilter === type ? 'bg-brand-gold text-brand-dark' : 'text-foreground/40 hover:text-white hover:bg-white/5'}`}
                    >
                      {type.replace('_', ' ')}
                    </button>
                  ))}
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredDeals.map((deal) => {
                    const firm = firms.find(f => f.id === deal.firmId);
                    return (
                      <Link key={deal.id} href={`/deals/${deal.id}`} className="glass group block overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-gray-900/30 transition-all hover:border-brand-gold/20">
                        <div className="aspect-video relative overflow-hidden">
                          <img src={deal.stillImageURL} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />
                          <div className="absolute top-6 left-6 flex gap-2">
                            <span className="rounded-full bg-brand-gold px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-brand-dark">{deal.assetType}</span>
                          </div>
                          {firm && (
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                              <div className="h-8 w-8 overflow-hidden rounded-full border border-white/20 bg-brand-dark">
                                {firm.logoUrl ? <img src={firm.logoUrl} className="h-full w-full object-contain" /> : <Building2 size={16} className="m-auto text-brand-gold" />}
                              </div>
                              <span className="text-xs font-bold text-white uppercase tracking-widest">{firm.name}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-white italic uppercase tracking-tighter truncate">{deal.address.split(',')[0]}</h3>
                          <div className="mt-4 grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Price</p>
                              <p className="text-lg font-bold text-white italic">${(deal.purchaseAmount || 0).toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-widest text-foreground/30 mb-1">Cap Rate</p>
                              <p className="text-lg font-bold text-brand-gold italic">{deal.capRate || "5.0"}%</p>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Platform Features Section */}
        <div className="mt-32 grid gap-12 border-t border-white/5 pt-20 md:grid-cols-3">
          <Feature
            icon={<ShieldCheck className="text-brand-gold" />}
            title="Institutional Grade"
            description="Securely manage private financial data with customizable public/private visibility toggles."
          />
          <Feature
            icon={<Zap className="text-brand-gold" />}
            title="AI Powered"
            description="Generate cinematic property walk-throughs and highlight reels automatically with our video engine."
          />
          <Feature
            icon={<Globe className="text-brand-gold" />}
            title="Global Track Record"
            description="Share verified performance data with investors and partners through professional micro-sites."
          />
        </div>
      </div>
    </div>
  );
}

function DiscoveryTab({ label, active, onClick, icon }: { label: string, active: boolean, onClick: () => void, icon: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] text-xs font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${active
        ? 'bg-white text-brand-dark shadow-[0_10px_30px_-10px_rgba(255,255,255,0.3)] scale-[1.05]'
        : 'text-foreground/40 hover:text-white hover:bg-white/5'
        }`}
    >
      {icon}
      {label}
    </button>
  );
}

function Feature({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="space-y-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gray-900">
        {icon}
      </div>
      <h4 className="text-xl font-bold text-white">{title}</h4>
      <p className="text-sm leading-relaxed text-foreground/50">{description}</p>
    </div>
  );
}
