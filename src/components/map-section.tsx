import Link from "next/link";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { SPACING } from "@/lib/constants";
import { SectionContainer } from "@/components/shared/section-container";
import { IconWrapper } from "@/components/shared/icon-wrapper";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function MapSection({ branches }: { branches: Business[] }) {
  return (
    <SectionContainer aria-labelledby="map-title" className={SPACING.sectionTop} id="lokasi">
      <div className="text-center">
        <Badge variant="neutral" className="mb-4">
          Samarinda, Kalimantan Timur
        </Badge>
        <h2
          id="map-title"
          className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Lokasi keempat toko
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Tautan rute membuka Google Maps. Titik peta masih perkiraan, konfirmasi lewat WhatsApp.
        </p>
      </div>

      {/* Bento Grid Layout - Asymmetric for visual hierarchy */}
      <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {branches.map((business, index) => (
          <li
            key={business.slug}
            data-brand={business.slug}
            className={cn(
              "group relative flex flex-col overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-card to-paper transition-all duration-300 hover:shadow-2xl hover:shadow-brand/10 hover:-translate-y-1",
              SPACING.cardPadding,
              // Bento Grid: Make first card span 2 columns for emphasis
              index === 0 && "lg:col-span-2 lg:row-span-2",
            )}
          >
            {/* Accent bar with gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-brand via-brand-ink to-brand" />

            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="inline-flex rounded-full bg-brand-soft px-3 py-1.5">
                  <p className="text-xs font-bold text-brand-ink">{business.category}</p>
                </div>
                <h3
                  className={cn(
                    "mt-3 font-display font-bold leading-tight",
                    index === 0 ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl",
                  )}
                >
                  <Link href={`/${business.slug}`} className="hover:text-brand transition-colors">
                    {business.name}
                  </Link>
                </h3>
              </div>
              <span className="shrink-0 rounded-full bg-paper px-3 py-1 text-xs font-semibold text-ink-soft shadow-sm">
                {business.serviceArea}
              </span>
            </div>

            <address
              className={cn(
                "leading-relaxed text-ink-soft not-italic",
                index === 0 ? "mt-4 text-base" : "mt-3 text-sm",
              )}
            >
              {business.address.street}
              <br />
              Kel. {business.address.kelurahan}, Kec. {business.address.kecamatan}
              <br />
              {business.address.city}, {business.address.province}
            </address>

            <div className={cn("mt-auto flex flex-wrap gap-2", index === 0 ? "pt-6" : "pt-4")}>
              <Button asChild size="sm" variant="outline" className="shadow-sm">
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <IconWrapper icon={Navigation} />
                  Rute
                </a>
              </Button>
              <Button asChild size="sm" variant="outline" className="shadow-sm">
                <a href={`tel:${business.phoneE164}`}>
                  <IconWrapper icon={Phone} />
                  Telepon
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWrapper icon={MessageCircle} />
                  WhatsApp
                </a>
              </Button>
            </div>

            {/* Decorative gradient blob */}
            <div className="pointer-events-none absolute -right-12 -bottom-12 size-40 rounded-full bg-brand/5 blur-3xl transition-all duration-500 group-hover:bg-brand/10 group-hover:scale-110" />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
