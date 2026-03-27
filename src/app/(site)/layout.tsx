import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyQuoteCTA from "@/components/layout/StickyQuoteCTA";
import WhatsAppButton from "@/components/contact/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <StickyQuoteCTA />
      <WhatsAppButton />
    </>
  );
}
