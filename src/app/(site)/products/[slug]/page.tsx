import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import type { Metadata } from "next";
import { ChevronRight, Download, MessageSquare, ArrowRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import ProductSpecTable from "@/components/products/ProductSpecTable";
import ProductCard from "@/components/products/ProductCard";
import { INDUSTRY_LABELS } from "@/lib/constants";
import type { IndustryId } from "@/types";

interface PageProps {
  params: { slug: string };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.seo.metaTitle,
    description: product.seo.metaDescription,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const all = await getAllProducts();
  const related = all
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const mainImage = product.images[0] || null;

  return (
    <div className="pt-16">
      {/* Breadcrumb */}
      <div className="bg-plum-surface-low border-b border-[rgba(203,160,198,0.15)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 text-sm text-plum-on-surface-variant/60">
          <Link href="/" className="hover:text-plum-primary transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/products" className="hover:text-plum-primary transition-colors">Products</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-plum-on-surface-variant font-medium truncate">{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">

          {/* Image gallery */}
          <div>
            <div className="bg-gradient-to-br from-plum-surface-low to-plum-surface-mid rounded-2xl aspect-[4/3] flex items-center justify-center overflow-hidden mb-4">
              {mainImage ? (
                <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center gap-3 opacity-25">
                  <div className="w-24 h-24 rounded-2xl bg-[rgba(203,160,198,0.4)]" />
                  <div className="w-16 h-2 bg-[rgba(203,160,198,0.4)] rounded" />
                </div>
              )}
            </div>
            {/* Thumbnail strip */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.slice(0, 5).map((img, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg overflow-hidden border-2 border-[rgba(203,160,198,0.30)] cursor-pointer hover:border-plum-primary transition-colors">
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product info */}
          <div>
            <Badge category={product.category} className="mb-4" />
            <h1 className="font-display font-bold text-plum-on-surface text-3xl md:text-4xl mb-4 leading-tight">
              {product.name}
            </h1>
            <p className="text-plum-on-surface-variant text-lg leading-relaxed mb-6">
              {product.shortDescription}
            </p>

            {/* Industries */}
            {product.industries.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {product.industries.map((ind) => (
                  <span key={ind} className="inline-block bg-plum-surface-high text-plum-primary text-xs font-medium px-3 py-1.5 rounded-full border border-[rgba(203,160,198,0.20)]">
                    {INDUSTRY_LABELS[ind as IndustryId]}
                  </span>
                ))}
              </div>
            )}

            {/* Key specs */}
            <div className="grid grid-cols-2 gap-3 mb-8">
              <div className="bg-plum-surface-low rounded-xl p-4">
                <p className="text-plum-on-surface-variant/60 text-xs font-medium uppercase tracking-wide mb-1">Material</p>
                <p className="font-semibold text-plum-on-surface text-sm">{product.specifications.material}</p>
              </div>
              <div className="bg-plum-surface-low rounded-xl p-4">
                <p className="text-plum-on-surface-variant/60 text-xs font-medium uppercase tracking-wide mb-1">Min. Order</p>
                <p className="font-semibold text-plum-on-surface text-sm">{product.specifications.moq}</p>
              </div>
              <div className="bg-plum-surface-low rounded-xl p-4">
                <p className="text-plum-on-surface-variant/60 text-xs font-medium uppercase tracking-wide mb-1">Lead Time</p>
                <p className="font-semibold text-plum-on-surface text-sm">{product.specifications.leadTime}</p>
              </div>
              <div className="bg-plum-surface-low rounded-xl p-4">
                <p className="text-plum-on-surface-variant/60 text-xs font-medium uppercase tracking-wide mb-1">Compliance</p>
                <p className="font-semibold text-plum-on-surface text-sm">{product.specifications.compliance[0]}</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={`/contact?product=${encodeURIComponent(product.name)}`}
                className="flex items-center justify-center gap-2 bg-gradient-cta text-white font-bold px-6 py-3.5 rounded-full hover:opacity-90 transition-opacity shadow-button flex-1"
              >
                <MessageSquare className="w-4 h-4" />
                Request a Quote
              </Link>
              {product.downloadDatasheet && (
                <a
                  href={product.downloadDatasheet}
                  className="flex items-center justify-center gap-2 border border-[rgba(203,160,198,0.20)] text-plum-primary font-semibold px-6 py-3.5 rounded-full hover:bg-plum-surface-low transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Datasheet
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Full specs */}
        {product.longDescription && (
          <div className="mb-12">
            <h2 className="font-display font-bold text-plum-on-surface text-2xl mb-6">Product Details</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="product-prose">
                {product.longDescription.split("\n\n").map((para, i) => (
                  <p key={i} className="text-plum-on-surface-variant leading-relaxed mb-4">{para}</p>
                ))}
              </div>
              <div>
                <h3 className="font-display font-bold text-plum-on-surface text-lg mb-4">Technical Specifications</h3>
                <ProductSpecTable specs={product.specifications} />
              </div>
            </div>
          </div>
        )}

        {/* Related products */}
        {related.length > 0 && (
          <div className="border-t border-[rgba(203,160,198,0.20)] pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-plum-on-surface text-2xl">Related Products</h2>
              <Link href="/products" className="text-[#3255b7] text-sm font-semibold flex items-center gap-1 hover:underline">
                View all <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
