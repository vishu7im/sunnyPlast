import { getContent } from "@/lib/content";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import ProductShowcase from "@/components/home/ProductShowcase";
import TrustSection from "@/components/home/TrustSection";
import CapabilitiesSection from "@/components/home/CapabilitiesSection";
import CTABanner from "@/components/home/CTABanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";

export default async function HomePage() {
  const content = getContent();

  return (
    <>
      <HeroSection />
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
