import type { Metadata } from "next";
import type { Business } from "@/data/types";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export function generateBranchMetadata(business: Business): Metadata {
  return {
    title: { absolute: `${business.name} — ${business.metaTitleSuffix}` },
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
