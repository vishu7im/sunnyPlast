import { Factory, Settings, ShieldCheck, Leaf, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Capability } from "@/types";

const capabilityIcons: Record<string, React.ElementType> = {
  Factory,
  Settings,
  ShieldCheck,
  Leaf,
};

interface CapabilitiesSectionProps {
  headline: string;
  capabilities: Capability[];
}

export default function CapabilitiesSection({ headline, capabilities }: CapabilitiesSectionProps) {
  return (
    <section className="section bg-plum-surface overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — visual */}
          <ScrollReveal>
            <div className="relative">
              {/* Main block */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] flex items-center justify-center" style={{ background: "linear-gradient(135deg, #2d1533 0%, var(--brand-primary) 100%)" }}>
                {/* Grid pattern */}
                <div className="absolute inset-0 opacity-10"
                  style={{
                    backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                <div className="relative z-10 text-center p-8">
                  <Factory className="w-24 h-24 text-plum-primary-container/80 mx-auto mb-6" strokeWidth={1} />
                  <p className="font-display font-bold text-white text-2xl">45,000 sq ft</p>
                  <p className="text-plum-primary-container/80 text-sm mt-1">UK Manufacturing Facility</p>
                </div>
              </div>

              {/* Stats chip */}
              <div className="absolute -bottom-5 -right-5 bg-plum-surface rounded-xl shadow-card-hover p-5 border border-[rgba(203,160,198,0.15)]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-plum-surface-mid flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-plum-primary" />
                  </div>
                  <div>
                    <p className="font-display font-bold text-plum-on-surface text-lg leading-none">ISO Certified</p>
                    <p className="text-plum-on-surface-variant text-xs mt-0.5">9001 · 14001 · BRCGS</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right — capabilities list */}
          <ScrollReveal delay={150}>
            <SectionHeader
              eyebrow="Our Capabilities"
              headline={headline}
              align="left"
            />

            <div className="space-y-6">
              {capabilities.map((cap, i) => {
                const Icon = capabilityIcons[cap.icon] || Factory;
                return (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.15)] flex items-center justify-center group-hover:bg-plum-primary group-hover:border-plum-primary transition-all duration-300">
                      <Icon className="w-5 h-5 text-plum-primary group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-plum-on-surface text-base mb-1">{cap.title}</h4>
                      <p className="text-plum-on-surface-variant text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
