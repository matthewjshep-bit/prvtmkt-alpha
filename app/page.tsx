import Link from "next/link";
import { MOCK_FIRMS } from "@/lib/mock-data";
import { ChevronRight, ShieldCheck, Zap, Globe } from "lucide-react";

export default function PlatformLandingPage() {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {MOCK_FIRMS.map((firm) => (
            <Link
              key={firm.id}
              href={`/${firm.slug}`}
              className="group relative overflow-hidden rounded-3xl border border-white/5 bg-brand-gray-900 p-8 transition-all hover:border-brand-gold/30 hover:bg-brand-gray-800"
            >
              <div className="mb-6 h-12 w-full">
                {firm.logoUrl && (firm.logoUrl.startsWith('http') || firm.logoUrl.startsWith('/')) ? (
                  <img
                    src={firm.logoUrl}
                    alt={firm.name}
                    className="h-full object-contain object-left grayscale transition-all group-hover:grayscale-0"
                  />
                ) : (
                  <div className="h-full w-32 relative">
                    <img
                      src="/master-logo.png"
                      alt={firm.name}
                      className="h-full object-contain object-left"
                    />
                  </div>
                )}
              </div>

              <h3 className="mb-2 text-2xl font-bold text-white group-hover:text-brand-gold transition-colors">
                {firm.name}
              </h3>

              <div className="flex items-center gap-2 text-sm font-medium text-foreground/40">
                <span>View Portfolio</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </div>

              <div className="absolute top-0 right-0 p-6 opacity-0 transition-opacity group-hover:opacity-100">
                <Globe size={20} className="text-brand-gold/50" />
              </div>
            </Link>
          ))}

          {/* New Firm Placeholder */}
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 p-8 text-center transition-all hover:border-brand-gold/20">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-brand-gray-900">
              <Zap size={24} className="text-brand-gold" />
            </div>
            <h3 className="text-lg font-bold text-white">Join PRVT MKT</h3>
            <p className="mt-2 text-sm text-foreground/40">Scale your CRE firm with a professional digital presence.</p>
            <button className="mt-6 rounded-xl border border-brand-gold/20 px-6 py-2 text-xs font-bold uppercase tracking-wider text-brand-gold transition-all hover:bg-brand-gold hover:text-brand-dark">
              Inquire Now
            </button>
          </div>
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
