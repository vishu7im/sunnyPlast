import { getContent } from "@/lib/content";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyQuoteCTA from "@/components/layout/StickyQuoteCTA";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import ThemeCustomizerButton from "@/components/theme/ThemeCustomizerButton";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const content = await getContent();
  return (
    <ThemeProvider>
      <Navbar logoUrl={content.site.logo} companyName={content.site.companyName} />
      <main>{children}</main>
      <Footer />
      <StickyQuoteCTA />
      <ThemeCustomizerButton />
    </ThemeProvider>
  );
}
