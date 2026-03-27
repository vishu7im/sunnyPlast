import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col h-full bg-plum-surface rounded-2xl border border-[rgba(203,160,198,0.15)] hover:border-plum-primary/30 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Image area */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-plum-surface-low to-plum-surface-mid flex items-center justify-center">
        {product.thumbnailImage ? (
          <img
            src={product.thumbnailImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 opacity-30">
            <div className="w-16 h-16 rounded-xl bg-[rgba(203,160,198,0.4)]" />
            <div className="w-10 h-1.5 bg-[rgba(203,160,198,0.4)] rounded" />
          </div>
        )}

        {product.isCustom && (
          <div className="absolute top-3 right-3 bg-plum-primary text-white text-xs font-bold px-2.5 py-1 rounded-full">
            Bespoke
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="mb-3">
          <Badge category={product.category} />
        </div>
        <h3 className="font-display font-bold text-plum-on-surface text-lg mb-2 group-hover:text-plum-primary transition-colors leading-snug">
          {product.name}
        </h3>
        <p className="text-plum-on-surface-variant text-sm leading-relaxed flex-1 mb-5">
          {product.shortDescription}
        </p>

        {/* Specs preview */}
        {product.specifications.moq && (
          <div className="flex items-center gap-4 text-xs text-plum-on-surface-variant/60 mb-5 border-t border-[rgba(203,160,198,0.15)] pt-4">
            <span>MOQ: <strong className="text-plum-on-surface-variant">{product.specifications.moq}</strong></span>
            <span>Lead: <strong className="text-plum-on-surface-variant">{product.specifications.leadTime}</strong></span>
          </div>
        )}

        <div className="flex items-center gap-1.5 text-plum-primary text-sm font-semibold">
          View details
          <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
