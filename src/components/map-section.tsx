import Link from "next/link";
import { MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function MapSection({ branches }: { branches: Business[] }) {
  return (
    <section aria-labelledby="map-title" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="map-title" className="font-display text-2xl font-bold text-balance sm:text-3xl">
            Lokasi keempat toko
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            Tautan rute membuka Google Maps. Titik peta masih perkiraan, konfirmasi lewat WhatsApp.
          </p>
        </div>
        <Badge variant="neutral">Samarinda</Badge>
      </div>

      <ul className="mt-5 grid gap-4 sm:grid-cols-2">
        {branches.map((business) => (
          <li
            key={business.slug}
            data-brand={business.slug}
            className="flex flex-col rounded-card border border-line border-t-4 border-t-brand bg-card p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-brand-ink">{business.category}</p>
                <h3 className="mt-1 font-display text-xl font-bold">
                  <Link href={`/${business.slug}`} className="hover:underline">
                    {business.name}
                  </Link>
                </h3>
              </div>
              <span className="rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-ink-soft">
                {business.serviceArea}
              </span>
            </div>

            <address className="mt-3 text-sm leading-relaxed text-ink-soft not-italic">
              {business.address.street}
              <br />
              Kel. {business.address.kelurahan}, Kec. {business.address.kecamatan}
              <br />
              {business.address.city}, {business.address.province}
            </address>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" variant="outline">
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" aria-hidden="true" />
                  Rute
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={`tel:${business.phoneE164}`}>
                  <Phone className="size-4" aria-hidden="true" />
                  Telepon
                </a>
              </Button>
              <Button asChild size="sm" variant="ghost">
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
