import Link from "next/link";
import { ChevronRight, MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { BranchLogo } from "@/components/branch-logo";
import { OpenBadge } from "@/components/open-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BranchHero({ business }: { business: Business }) {
  return (
    <section data-brand={business.slug} className="border-b border-line bg-brand-soft">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:py-10">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs font-medium text-ink-soft">
          <Link href="/" className="hover:text-ink hover:underline">
            Beranda
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page">{business.name}</span>
        </nav>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start">
          <BranchLogo business={business} className="size-20 bg-white" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <Badge>{business.category}</Badge>
              <Badge variant="neutral">Sejak {business.established}</Badge>
              <OpenBadge hours={business.hours} />
            </div>

            <h1 className="mt-3 font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl">
              {business.name}
            </h1>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink-soft text-pretty">
              {business.tagline}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <Button asChild>
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" aria-hidden="true" />
                  Rute
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${business.phoneE164}`}>
                  <Phone className="size-4" aria-hidden="true" />
                  Telepon
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
