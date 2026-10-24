import Link from "next/link";
import { ChevronRight, MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { BranchLogo } from "@/components/branch-logo";
import { OpenBadge } from "@/components/open-badge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { TEXT } from "@/lib/constants";

export function BranchHero({ business }: { business: Business }) {
  return (
    <section data-brand={business.slug} className="border-b border-line bg-brand-soft">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-12 lg:py-14">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-ink-soft"
        >
          <Link href="/" className="hover:text-ink hover:underline">
            Beranda
          </Link>
          <ChevronRight className="size-3.5" aria-hidden="true" />
          <span aria-current="page">{business.name}</span>
        </nav>

        <div className="mt-8 flex flex-col gap-6 sm:flex-row sm:items-start">
          <BranchLogo business={business} className="size-24 bg-white sm:size-28" />

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2.5">
              <Badge>{business.category}</Badge>
              <Badge variant="neutral">Sejak {business.established}</Badge>
              <OpenBadge hours={business.hours} />
            </div>

            <h1 className={cn("mt-4 font-display font-bold text-balance", TEXT.heading.h1)}>
              {business.name}
            </h1>
            <p
              className={cn(
                "mt-3 max-w-2xl leading-relaxed text-ink-soft text-pretty",
                TEXT.body.lg,
              )}
            >
              {business.tagline}
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-emerald-600 text-white shadow-lg hover:bg-emerald-700">
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  <Navigation className="size-4" aria-hidden="true" />
                  Rute
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
              >
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
