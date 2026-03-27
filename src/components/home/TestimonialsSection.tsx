import { Quote } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const testimonials = [
  {
    quote: "SunnyPlaste's food-grade trays have consistently met our retailer's strict specification. Their lead times are reliable and their team is genuinely responsive — a rare combination in packaging.",
    author: "Head of Packaging",
    company: "Regional Food Manufacturer, West Midlands",
    industry: "Food & Beverage",
  },
  {
    quote: "We switched to SunnyPlaste for our pharmaceutical blister trays and haven't looked back. Their GMP compliance documentation is thorough and the quality is exactly what our validation requires.",
    author: "Quality Director",
    company: "Pharmaceutical Distributor, UK",
    industry: "Pharmaceutical",
  },
  {
    quote: "The bespoke tooling service saved us months of development time. From initial CAD to first-off sample was under 6 weeks, and the production pricing was very competitive.",
    author: "Operations Manager",
    company: "Consumer Electronics Brand",
    industry: "Retail",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="section bg-plum-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Client Feedback"
            headline="Trusted Across UK Industry"
            subtext="Don&apos;t take our word for it — here&apos;s what our clients say."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <ScrollReveal key={i} delay={i * 100}>
              <div className="flex flex-col h-full bg-plum-surface-mid rounded-2xl p-8 border border-[rgba(203,160,198,0.15)] hover:border-plum-primary/30 hover:shadow-card transition-all duration-300">
                <Quote className="w-8 h-8 text-plum-primary-container mb-5 flex-shrink-0" />
                <p className="text-plum-on-surface-variant text-sm leading-relaxed italic flex-1 mb-6">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="border-t border-[rgba(203,160,198,0.20)] pt-5">
                  <p className="font-semibold text-plum-on-surface text-sm">{t.author}</p>
                  <p className="text-plum-on-surface-variant text-xs mt-0.5">{t.company}</p>
                  <span className="inline-block mt-2 text-xs font-medium bg-plum-surface-high text-plum-primary px-2.5 py-1 rounded-full">
                    {t.industry}
                  </span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
