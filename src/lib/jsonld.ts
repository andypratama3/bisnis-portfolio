import type { Business, DayKey, WeeklyHours } from "@/data/types";
import { siteConfig } from "@/data/site";
import { absoluteUrl } from "./utils";

const dayNames: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

const dayOrder: DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

function buildOpeningHours(hours: WeeklyHours) {
  const groups = new Map<string, string[]>();

  for (const day of dayOrder) {
    const value = hours[day];
    if (!value) continue;
    const key = `${value.opens}-${value.closes}`;
    const dayName = dayNames[day];
    const existing = groups.get(key);
    if (existing) {
      existing.push(dayName);
    } else {
      groups.set(key, [dayName]);
    }
  }

  if (groups.size === 0) return undefined;

  return Array.from(groups.entries()).map(([key, days]) => {
    const [opens, closes] = key.split("-");
    return {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: days,
      opens,
      closes,
    };
  });
}

export function localBusinessJsonLd(business: Business) {
  return {
    "@context": "https://schema.org",
    "@type": business.slug === "fatur-frozen-food" ? "Store" : "GroceryStore",
    "@id": `${siteConfig.url}/${business.slug}#store`,
    name: business.name,
    description: business.description,
    url: `${siteConfig.url}/${business.slug}`,
    telephone: business.phoneE164,
    image: business.photos.map((photo) => absoluteUrl(photo.src)),
    logo: business.logo ? absoluteUrl(business.logo.src) : undefined,
    foundingDate: String(business.established),
    address: {
      "@type": "PostalAddress",
      streetAddress: `${business.address.street}, Kel. ${business.address.kelurahan}`,
      addressLocality: business.address.city,
      addressRegion: business.address.province,
      addressCountry: "ID",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    hasMap: business.mapsUrl,
    areaServed: business.serviceArea,
    openingHoursSpecification: business.hours ? buildOpeningHours(business.hours) : undefined,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteConfig.url}#organization`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
  };
}

export function itemListJsonLd(businesses: Business[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: siteConfig.name,
    itemListElement: businesses.map((business, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: business.name,
      url: `${siteConfig.url}/${business.slug}`,
    })),
  };
}
