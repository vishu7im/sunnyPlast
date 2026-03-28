import { getContent } from "@/lib/content";
import type { Metadata } from "next";
import { Factory, Settings, ShieldCheck, Leaf, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import TrustBar from "@/components/home/TrustBar";
import CTABanner from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SunnyPlaste UK — our story, manufacturing capabilities, and commitment to quality plastic packaging for UK industry.",
};

const capabilityIcons: Record<string, React.ElementType> = {
  Factory, Settings, ShieldCheck, Leaf,
};

export default function AboutPage() {
  const content = getContent();
  const { about, trustBar } = content;

  const paragraphs = about.story.split("\n\n");

  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="py-20 md:py-28" style={{ background: "linear-gradient(135deg, #2d1533 0%, var(--brand-primary) 100%)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-plum-primary-container/80 text-xs font-bold uppercase tracking-[0.15em] mb-4">
            Our Story
          </p>
          <h1 className="font-display font-bold text-white text-4xl md:text-6xl max-w-2xl leading-tight">
            {about.headline}
          </h1>
        </div>
      </div>

      {/* Stats */}
      <TrustBar stats={trustBar.stats} />

      {/* Story section */}
      <section className="section bg-plum-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Image column */}
            <ScrollReveal>
              <div className="relative">
                <div className="rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden" style={{ background: "linear-gradient(135deg, #2d1533 0%, var(--brand-primary) 100%)" }}>
                  <div className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                    }}
                  />
                  <Factory className="w-32 h-32 text-plum-primary-container/70 relative z-10" strokeWidth={0.5} />
                </div>
                {/* Founded chip */}
                <div className="absolute -bottom-6 -left-5 bg-plum-surface rounded-xl shadow-card-hover p-5 border border-[rgba(203,160,198,0.15)]">
                  <p className="font-display font-bold text-plum-on-surface text-3xl leading-none">2009</p>
                  <p className="text-plum-on-surface-variant text-xs mt-1">Founded in Birmingham, UK</p>
                </div>
              </div>
            </ScrollReveal>

            {/* Text column */}
            <ScrollReveal delay={150}>
              <div className="space-y-5 lg:pt-4">
                {paragraphs.map((para, i) => (
                  <p key={i} className="text-plum-on-surface-variant text-lg leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-plum-surface-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <SectionHeader
              eyebrow="What We Do"
              headline="Manufacturing Capabilities"
              subtext="State-of-the-art equipment and in-house expertise across the full production lifecycle."
            />
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {about.capabilities.map((cap, i) => {
              const Icon = capabilityIcons[cap.icon] || Factory;
              return (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="bg-plum-surface rounded-2xl p-8 border border-[rgba(203,160,198,0.15)] hover:border-plum-primary/30 hover:shadow-card hover:-translate-y-0.5 transition-all duration-300 flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-plum-surface-mid border border-[rgba(203,160,198,0.20)] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-plum-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-plum-on-surface text-lg mb-2">{cap.title}</h3>
                      <p className="text-plum-on-surface-variant text-sm leading-relaxed">{cap.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications highlight */}
      <section className="section bg-plum-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal>
            <div className="bg-plum-surface-low rounded-2xl p-10 md:p-14 border border-[rgba(203,160,198,0.15)] text-center">
              <CheckCircle2 className="w-12 h-12 text-plum-primary mx-auto mb-5" />
              <h2 className="font-display font-bold text-plum-on-surface text-3xl mb-4">
                Independently Certified
              </h2>
              <p className="text-plum-on-surface-variant text-lg max-w-2xl mx-auto mb-8">
                Our quality, environmental and food safety management systems are independently audited and certified — giving our clients confidence at every stage of production.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {["ISO 9001:2015", "ISO 14001:2015", "BRCGS AA Grade"].map((cert) => (
                  <span key={cert} className="bg-plum-surface border border-[rgba(203,160,198,0.20)] text-plum-primary font-semibold px-5 py-2.5 rounded-full text-sm shadow-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <CTABanner />
    </div>
  );
}
