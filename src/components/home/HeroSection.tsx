import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import HeroCarousel, { type HeroDefaultContent } from "./HeroCarousel";
import type { CarouselSlide } from "@/types";

interface HeroSectionProps {
  slides?: CarouselSlide[];
  defaultContent: HeroDefaultContent;
}

export default function HeroSection({ slides = [], defaultContent }: HeroSectionProps) {
  return (
    <section className="relative h-screen min-h-[600px] max-h-[900px] flex items-center overflow-hidden">
      {slides.length > 0 ? (
        <HeroCarousel slides={slides} defaultContent={defaultContent} />
      ) : (
        <>
          {/* Static gradient background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #2d1533 0%, var(--brand-primary) 60%, var(--brand-primary-container) 100%)" }}>
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-hero" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-cta opacity-80" />
          </div>

          {/* Static text content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <p className="animate-fade-up text-plum-primary-container/90 text-xs font-bold uppercase tracking-[0.2em] mb-5">
                {defaultContent.eyebrow}
              </p>
              <h1
                className="animate-fade-up delay-100 font-display font-bold text-white leading-tight mb-6"
                style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)", lineHeight: 1.05, letterSpacing: "-0.02em" }}
              >
                {defaultContent.headline.split(" ").slice(0, -2).join(" ")}<br />
                <span className="text-plum-primary-container">
                  {defaultContent.headline.split(" ").slice(-2).join(" ")}
                </span>
              </h1>
              <p className="animate-fade-up delay-200 text-white/75 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
                {defaultContent.subheadline}
              </p>
              <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4">
                <Link
                  href={defaultContent.ctaPrimary.href}
                  className="inline-flex items-center justify-center gap-2 bg-white text-plum-on-surface font-bold px-8 py-4 rounded-full hover:bg-plum-surface-low transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-base"
                >
                  {defaultContent.ctaPrimary.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href={defaultContent.ctaSecondary.href}
                  className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-200 text-base"
                >
                  {defaultContent.ctaSecondary.label}
                </Link>
              </div>
              <div className="animate-fade-up delay-400 flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-white/10">
                {["ISO 9001 Certified", "BRCGS AA Grade", "15+ Years Experience"].map((badge) => (
                  <div key={badge} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-plum-primary-container" />
                    <span className="text-white/70 text-sm font-medium">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
            <ChevronDown className="w-6 h-6 text-white/40" />
          </div>
        </>
      )}
    </section>
  );
}
