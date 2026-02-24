"use client";

import { useState } from "react";
import Link from "next/link";
import { useData } from "@/context/DataContext";
import { ShieldCheck, Zap, Globe, Building2, PlusCircle, Filter } from "lucide-react";

const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

export default function PlatformLandingPage() {
  const { firms, deals } = useData();
  const [activeFilter, setActiveFilter] = useState("ALL");

  // Filter firms based on whether they have at least one deal matching the selected asset type
  const filteredFirms = firms.filter(firm => {
    if (activeFilter === "ALL") return true;
    return deals.some(deal => deal.firmId === firm.id && deal.assetType === activeFilter);
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="mb-20 text-center">
          <h1 className="mb-6 text-6xl font-bold tracking-tight text-white md:text-7xl">
            PRVT <span className="text-brand-gold">MKT</span>
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-foreground/50">
            The institutional-grade platform for Commercial Real Estate firms to manage,
            showcase, and share digital deal tombstones.
          </p>
        </div>

        {/* High-Contrast Asset Type Filter */}
        <div className="mb-16 flex flex-wrap items-center justify-center gap-3">
          <div className="mr-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-gold">
            <Filter size={14} />
            Filter Deals
          </div>
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`rounded-xl px-8 py-3.5 text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${isActive
                  ? "bg-brand-gold text-brand-dark shadow-[0_10px_30px_-10px_rgba(197,160,89,0.5)] scale-105"
                  : "border border-white/10 text-white/40 hover:border-brand-gold/50 hover:text-white hover:bg-white/5"
                  }`}
              >
                {cat.replace("_", " ")}
              </button>
            );
          })}
        </div>

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

              <h3 className="text-center text-3xl font-black tracking-tight text-white transition-all duration-500 group-hover:text-brand-gold">
                {firm.name}
              </h3>

              <div className="absolute top-0 right-0 p-8 opacity-0 transition-opacity group-hover:opacity-20">
                <Globe size={24} className="text-brand-gold" />
              </div>
            </Link>
          ))}

          {/* New Firm Placeholder */}
          <Link href="/admin/firms" className="flex flex-col items-center justify-center rounded-[2.5rem] border-2 border-dashed border-white/5 p-12 text-center transition-all hover:border-brand-gold/20 hover:bg-white/5">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-brand-gray-900">
              <PlusCircle size={32} className="text-brand-gold" />
            </div>
            <h3 className="text-xl font-bold text-white">Add Your Firm</h3>
            <p className="mt-2 text-sm text-foreground/40 leading-relaxed">Initialize your firm's platform presence instantly.</p>
          </Link>
        </div>

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
