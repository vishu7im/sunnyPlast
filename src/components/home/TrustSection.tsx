import { ShieldCheck, Award, UtensilsCrossed, Pill, Car, ShoppingBag } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";
import type { Certification, Industry } from "@/types";

const industryIcons: Record<string, React.ElementType> = {
  UtensilsCrossed,
  Pill,
  Car,
  ShoppingBag,
};

interface TrustSectionProps {
  certifications: Certification[];
  industries: Industry[];
}

export default function TrustSection({ certifications, industries }: TrustSectionProps) {
  return (
    <section className="section bg-plum-surface-low">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Why SunnyPlaste"
            headline="Quality You Can Depend On"
            subtext="Independent certification, rigorous testing and 15 years of manufacturing experience — your packaging is in safe hands."
          />
        </ScrollReveal>

        {/* Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, i) => (
            <ScrollReveal key={cert.name} delay={i * 100}>
              <div className="bg-plum-surface rounded-2xl p-8 border border-[rgba(203,160,198,0.15)] hover:border-plum-primary/30 hover:shadow-card transition-all duration-300 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-plum-surface-mid flex items-center justify-center mb-5">
                  <ShieldCheck className="w-7 h-7 text-plum-primary" />
                </div>
                <h3 className="font-display font-bold text-plum-on-surface text-lg mb-1">{cert.name}</h3>
                <p className="text-plum-on-surface-variant text-sm">{cert.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Industries */}
        <ScrollReveal>
          <div className="bg-plum-surface rounded-2xl p-8 md:p-12 border border-[rgba(203,160,198,0.15)]">
            <div className="flex items-center gap-3 mb-8">
              <Award className="w-5 h-5 text-plum-primary" />
              <h3 className="font-display font-bold text-plum-on-surface text-xl">Industries We Serve</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {industries.map((industry, i) => {
                const Icon = industryIcons[industry.icon] || ShieldCheck;
                return (
                  <ScrollReveal key={industry.id} delay={i * 80}>
                    <div className="flex flex-col items-center gap-3 p-5 rounded-xl bg-plum-surface-low hover:bg-plum-surface-mid hover:border-navy-100 border border-transparent transition-all duration-200">
                      <div className="w-12 h-12 rounded-xl bg-plum-surface border border-[rgba(203,160,198,0.15)] flex items-center justify-center shadow-sm">
                        <Icon className="w-6 h-6 text-plum-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-plum-on-surface font-semibold text-sm text-center leading-tight">
                        {industry.label}
                      </span>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
