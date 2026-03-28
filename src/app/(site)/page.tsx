import { getContent } from "@/lib/content";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductShowcase from "@/components/home/ProductShowcase";
import TrustSection from "@/components/home/TrustSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import CTABanner from "@/components/home/CTABanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();

  return (
    <>
      <HeroSection
        slides={content.hero.heroCarousel ?? []}
        defaultContent={{
          eyebrow: "",
          headline: content.hero.headline,
          subheadline: content.hero.subheadline,
          ctaPrimary: content.hero.ctaPrimary,
          ctaSecondary: content.hero.ctaSecondary,
        }}
      />
      <TrustBar stats={content.trustBar.stats} />
      <ProductShowcase />
      <TrustSection
        certifications={content.certifications}
        industries={content.industries}
      />
      <CapabilitiesSection
        headline={content.about.headline}
        capabilities={content.about.capabilities}
      />
      <CTABanner />
      <TestimonialsSection />
    </>
  );
}
