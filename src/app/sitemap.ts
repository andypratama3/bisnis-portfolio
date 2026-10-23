import type { MetadataRoute } from "next";
import { businesses } from "@/data/businesses";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // Homepage - Highest priority
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Individual business pages - High priority
  businesses.forEach((business) => {
    routes.push({
      url: `${siteConfig.url}/${business.slug}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  // Additional important sections
  routes.push(
    {
      url: `${siteConfig.url}/#toko`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/#lokasi`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  );

  return routes;
}
