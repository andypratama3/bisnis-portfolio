import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBusiness } from "@/data/businesses";
import { siteConfig } from "@/data/site";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { absoluteUrl } from "@/lib/utils";
import { JsonLd } from "@/components/json-ld";
import { BranchHero } from "@/components/branch-hero";
import { BranchGallery } from "@/components/branch-gallery";
import { BranchCatalog } from "@/components/branch-catalog";
import { BranchLocation } from "@/components/branch-location";
import { CrossLinks } from "@/components/cross-links";
import { ActionBar } from "@/components/action-bar";

const business = getBusiness("sumber-tani-makmur");

export function generateMetadata(): Metadata {
  if (!business) return {};

  return {
    title: `${business.name} | Sayur Segar & Bumbu Samarinda`,
    description: business.description,
    alternates: {
      canonical: `/${business.slug}`,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteUrl(`/${business.slug}`),
      siteName: siteConfig.name,
      title: business.name,
      description: business.description,
      images: business.photos.map((photo) => ({
        url: absoluteUrl(photo.src),
        width: photo.width,
        height: photo.height,
        alt: photo.alt,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title: business.name,
      description: business.description,
      images: business.photos.map((photo) => absoluteUrl(photo.src)),
    },
  };
}

export default function SumberTaniMakmurPage() {
  if (!business) notFound();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(business)} />
      <BranchHero business={business} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div>
          <BranchGallery photos={business.photos} name={business.name} />
          <BranchCatalog business={business} />
          <CrossLinks currentSlug={business.slug} />
        </div>
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <BranchLocation business={business} />
        </aside>
      </div>
      <div className="pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-10" />
      <ActionBar business={business} />
    </>
  );
}
