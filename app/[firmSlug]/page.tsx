"use client";

import { useState, use } from "react";
import { MOCK_DEALS, MOCK_FIRMS } from "@/lib/mock-data";
import DealCard from "@/components/DealCard";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, Search, LayoutGrid, List, Globe } from "lucide-react";
import { notFound } from "next/navigation";

const CATEGORIES = ["ALL", "INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF"];

export default function FirmDashboardPage({
  params,
}: {
  params: Promise<{ firmSlug: string }>;
}) {
  const { firmSlug } = use(params);
  const [filter, setFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const firm = MOCK_FIRMS.find((f) => f.slug === firmSlug);

  if (!firm) {
    notFound();
  }

  const filteredDeals = MOCK_DEALS.filter((deal) => {
    const isFirmDeal = deal.firmId === firm.id;
    const matchesFilter = filter === "ALL" || deal.assetType === filter;
    const matchesSearch = deal.address.toLowerCase().includes(searchQuery.toLowerCase());
    return isFirmDeal && matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-brand-dark pt-28 pb-20">
      <div className="container mx-auto px-6">
        {/* Firm Brand Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="space-y-4">
            <div className="h-12 w-48">
              <img
                src={firm.logoUrl || ""}
                alt={firm.name}
                className="h-full object-contain object-left"
              />
            </div>
            <div>
              <h1 className="mb-2 text-4xl font-bold tracking-tight text-foreground">
                Institutional <span className="text-brand-gold">Portfolio</span>
              </h1>
              <p className="text-lg text-foreground/50">
                Real-time track record for {firm.name}.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
              <input
                type="text"
                placeholder="Search portfolio..."
                className="h-11 w-full rounded-xl border border-white/5 bg-brand-gray-900 pl-10 pr-4 text-sm text-foreground outline-none transition-all focus:border-brand-gold/50 md:w-64"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex h-11 items-center rounded-xl bg-brand-gray-900 border border-white/5 p-1">
              <button className="flex h-full items-center gap-2 rounded-lg bg-brand-gray-800 px-3 text-xs font-semibold text-foreground">
                <LayoutGrid size={16} />
                Grid view
              </button>
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mb-10 flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-wider transition-all ${filter === cat
                  ? "bg-brand-gold text-brand-dark shadow-lg shadow-brand-gold/20"
                  : "bg-brand-gray-900 text-foreground/50 hover:bg-brand-gray-800 hover:text-foreground"
                }`}
            >
              {cat.replace("_", " ")}
            </button>
          ))}

          <div className="ml-auto hidden items-center gap-2 lg:flex">
            <Filter size={16} className="text-brand-gold" />
            <span className="text-xs font-semibold text-foreground/40">
              {filteredDeals.length} assets identified
            </span>
          </div>
        </div>

        {/* Portfolio Grid */}
        <motion.div
          layout
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredDeals.map((deal, index) => (
              <DealCard key={deal.id} deal={deal} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredDeals.length === 0 && (
          <div className="flex h-64 flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 bg-brand-gray-900/10">
            <p className="text-lg font-medium text-foreground/40">No assets found in this segment</p>
            <button
              onClick={() => { setFilter("ALL"); setSearchQuery(""); }}
              className="mt-4 text-brand-gold transition-all hover:opacity-70"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
