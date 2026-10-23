import type { MetadataRoute } from "next";
import { businesses } from "@/data/businesses";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    {
      url: siteConfig.url,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 1,
    },
  ];

  businesses.forEach((business) => {
    routes.push({
      url: `${siteConfig.url}/${business.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    });
  });

  return routes;
}
