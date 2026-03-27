export type ProductCategory =
  | "food-packaging"
  | "industrial-containers"
  | "pharmaceutical-packaging"
  | "retail-packaging"
  | "custom-packaging";

export type IndustryId =
  | "food-beverage"
  | "pharmaceutical"
  | "automotive"
  | "retail";

export interface ProductSpecifications {
  material: string;
  thickness: string;
  dimensions: string;
  temperature?: string;
  moq: string;
  leadTime: string;
  colors: string[];
  compliance: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  subcategory?: string;
  shortDescription: string;
  longDescription: string;
  images: string[];
  thumbnailImage: string;
  specifications: ProductSpecifications;
  industries: IndustryId[];
  isFeatured: boolean;
  isCustom: boolean;
  downloadDatasheet?: string;
  tags: string[];
  seo: {
    metaTitle: string;
    metaDescription: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface RFQFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  productCategory: ProductCategory | "";
  quantity: string;
  message: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Certification {
  name: string;
  description: string;
  image: string;
}

export interface Industry {
  id: IndustryId;
  label: string;
  icon: string;
}

export interface Capability {
  title: string;
  description: string;
  icon: string;
}

export interface SiteContent {
  site: {
    companyName: string;
    tagline: string;
    phone: string;
    email: string;
    whatsapp: string;
    address: {
      line1: string;
      line2: string;
      postcode: string;
      country: string;
    };
    socialLinks: {
      linkedin: string;
      twitter: string;
    };
  };
  hero: {
    headline: string;
    subheadline: string;
    ctaPrimary: { label: string; href: string };
    ctaSecondary: { label: string; href: string };
    backgroundImage: string;
  };
  trustBar: {
    stats: Stat[];
  };
  certifications: Certification[];
  industries: Industry[];
  about: {
    headline: string;
    story: string;
    factoryImage: string;
    capabilities: Capability[];
  };
  contact: {
    formHeadline: string;
    formSubtext: string;
    mapEmbedUrl: string;
  };
  footer: {
    copyrightText: string;
    companyRegNumber: string;
    links: {
      quickLinks: { label: string; href: string }[];
      legal: { label: string; href: string }[];
    };
  };
}
