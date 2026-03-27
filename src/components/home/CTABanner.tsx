import Link from "next/link";
import { ArrowRight, MessageSquare } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTABanner() {
  return (
    <section className="py-20 bg-gradient-cta relative overflow-hidden">
      {/* Geometric accent */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.5'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40zm0-40h2l-2 2V0zm0 4l4-4h2l-6 6V4zm0 4l8-8h2L40 10V8zm0 4L52 0h2L40 14v-2zm0 4L56 0h2L40 18v-2zm0 4L60 0h2L40 22v-2zm0 4L64 0h2L40 26v-2zm0 4L68 0h2L40 30v-2zm0 4L72 0h2L40 34v-2zm0 4L76 0h2L40 38v-2zm0 4L80 0v2L42 40h-2zm4 0L80 4v2L46 40h-2zm4 0L80 8v2L50 40h-2zm4 0L80 12v2L54 40h-2zm4 0L80 16v2L58 40h-2zm4 0L80 20v2L62 40h-2zm4 0L80 24v2L66 40h-2zm4 0L80 28v2L70 40h-2zm4 0L80 32v2L74 40h-2zm4 0L80 36v2L78 40h-2zm4 0L80 40v0h-2zm-1-1v2h-2v-2h2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <p className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-4">
            Get Started Today
          </p>
          <h2 className="font-display font-bold text-white text-3xl md:text-4xl lg:text-5xl mb-6">
            Ready to Scale Your Packaging?
          </h2>
          <p className="text-white/75 text-lg max-w-2xl mx-auto mb-10">
            Tell us your requirements and we&apos;ll provide a detailed quote within 1 business day. No obligations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-white text-plum-on-surface font-bold px-8 py-4 rounded-full hover:bg-plum-surface-low transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              Get a Free Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 border border-white/30 text-white font-semibold px-8 py-4 rounded-full hover:bg-white/10 hover:border-white/60 transition-all duration-200"
            >
              Browse Products
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
