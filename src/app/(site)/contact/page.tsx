import type { Metadata } from "next";
import RFQForm from "@/components/contact/RFQForm";
import ContactDetails from "@/components/contact/ContactDetails";
import ScrollReveal from "@/components/ui/ScrollReveal";

export const metadata: Metadata = {
  title: "Contact & Request a Quote",
  description:
    "Get in touch with SunnyPlaste UK. Request a quote for plastic packaging, discuss custom solutions, or ask our team a question. We respond within 1 business day.",
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#2d1533] to-[#a61c82] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-plum-primary-container/80 text-xs font-bold uppercase tracking-[0.15em] mb-3">
            Let&apos;s Talk
          </p>
          <h1 className="font-display font-bold text-white text-4xl md:text-5xl mb-3">
            Request a Quote
          </h1>
          <p className="text-white/70 text-lg max-w-xl">
            Tell us your requirements and we&apos;ll respond within 1 business day.
          </p>
        </div>
      </div>

      {/* Form + details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <ScrollReveal>
              <div className="bg-plum-surface rounded-2xl border border-[rgba(203,160,198,0.15)] p-8 md:p-10 shadow-card">
                <h2 className="font-display font-bold text-plum-on-surface text-2xl mb-2">
                  Packaging Enquiry Form
                </h2>
                <p className="text-plum-on-surface-variant text-sm mb-8">
                  Fill in your requirements below. The more detail you provide, the more accurate our quote will be.
                </p>
                <RFQForm />
              </div>
            </ScrollReveal>
          </div>

          {/* Contact details */}
          <div>
            <ScrollReveal delay={150}>
              <ContactDetails />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </div>
  );
}
