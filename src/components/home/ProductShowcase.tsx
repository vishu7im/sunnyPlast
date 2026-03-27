import Link from "next/link";
import { ArrowRight, Package, Factory, Pill, ShoppingBag, Wrench } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import ScrollReveal from "@/components/ui/ScrollReveal";

const categories = [
  {
    icon: Package,
    label: "Food Packaging",
    slug: "food-packaging",
    description: "Thermoformed trays, tubs and clamshells for fresh produce, meat, dairy and ready meals.",
    color: "from-green-50 to-emerald-50",
    iconBg: "bg-green-100",
    iconColor: "text-green-700",
  },
  {
    icon: Factory,
    label: "Industrial Containers",
    slug: "industrial-containers",
    description: "Heavy-duty stackable containers and pallets for warehouse, logistics and component handling.",
    color: "from-orange-50 to-amber-50",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
  {
    icon: Pill,
    label: "Pharmaceutical",
    slug: "pharmaceutical-packaging",
    description: "GMP-compliant blister trays and sterile barrier packaging for medical and pharma applications.",
    color: "from-blue-50 to-sky-50",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
  },
  {
    icon: ShoppingBag,
    label: "Retail Packaging",
    slug: "retail-packaging",
    description: "High-clarity blister packs and clamshells that drive impulse purchase at point of sale.",
    color: "from-purple-50 to-violet-50",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700",
  },
  {
    icon: Wrench,
    label: "Custom Packaging",
    slug: "custom-packaging",
    description: "From concept to production — bespoke tooling, prototyping and full manufacturing runs.",
    color: "from-plum-surface-low to-plum-surface-mid",
    iconBg: "bg-plum-surface-high",
    iconColor: "text-plum-primary",
    wide: true,
  },
];

export default function ProductShowcase() {
  return (
    <section className="section bg-plum-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <SectionHeader
            eyebrow="Our Products"
            headline="Packaging for Every Industry"
            subtext="From food-grade thermoformed trays to bespoke pharmaceutical packaging — we manufacture across five specialist categories."
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <ScrollReveal
              key={cat.slug}
              delay={i * 80}
              className={cat.wide ? "sm:col-span-2 lg:col-span-2" : ""}
            >
              <Link
                href={`/products?category=${cat.slug}`}
                className={`group flex flex-col h-full bg-gradient-to-br ${cat.color} rounded-2xl p-6 border border-[rgba(203,160,198,0.15)] hover:border-plum-primary/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`inline-flex p-3 rounded-xl ${cat.iconBg} w-fit mb-5`}>
                  <cat.icon className={`w-6 h-6 ${cat.iconColor}`} strokeWidth={1.5} />
                </div>
                <h3 className="font-display font-bold text-plum-on-surface text-lg mb-2 group-hover:text-plum-primary transition-colors">
                  {cat.label}
                </h3>
                <p className="text-plum-on-surface-variant text-sm leading-relaxed flex-1">
                  {cat.description}
                </p>
                <div className="flex items-center gap-1.5 mt-5 text-plum-primary text-sm font-semibold">
                  View range
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
