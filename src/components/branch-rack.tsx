"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, MessageCircle, Navigation, Sparkles } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { BranchLogo } from "@/components/branch-logo";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SPACING, TEXT } from "@/lib/constants";

export function BranchRack({ branches }: { branches: Business[] }) {
  const [active, setActive] = useState(branches[0]?.slug ?? "");

  return (
    <section
      aria-labelledby="hero-title"
      className={cn("relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", SPACING.section)}
    >
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-96 w-[min(85rem,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-soft/70 to-transparent blur-3xl" />

      <div className="max-w-4xl">
        <Badge variant="glass" className="gap-1.5">
          <Sparkles className="size-3" aria-hidden="true" />
          Samarinda, Kalimantan Timur
        </Badge>
        <h1
          id="hero-title"
          className={cn("mt-8 font-display font-bold tracking-tight text-balance", TEXT.display)}
        >
          <span className="block">Empat toko,</span>
          <span className="block text-gradient">satu kebutuhan harian.</span>
        </h1>
        <p className={cn("mt-6 max-w-2xl leading-relaxed text-ink-soft text-pretty", TEXT.body.lg)}>
          Buah segar, sembako, frozen food, dan sayur harian dari toko lokal Samarinda. Pilih toko,
          lihat lokasi, dan hubungi langsung lewat WhatsApp.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg" className="shadow-lg">
            <a href="#toko">
              Jelajahi toko
              <ArrowRight
                className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="shadow-md">
            <a href="#lokasi">
              Lihat peta lokasi
              <MapPin className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div id="toko" className="mt-16 flex flex-col gap-4 lg:h-[40rem] lg:flex-row" role="list">
        {branches.map((business) => {
          const isActive = business.slug === active;

          return (
            <article
              key={business.slug}
              role="listitem"
              data-brand={business.slug}
              onMouseEnter={() => setActive(business.slug)}
              onFocusCapture={() => setActive(business.slug)}
              className={cn(
                "group flex min-w-0 flex-col overflow-hidden rounded-panel border border-line bg-surface panel-shadow-lg transition-all duration-500 ease-out",
                isActive ? "lg:flex-[2.6]" : "lg:flex-1",
              )}
            >
              <div className="relative flex flex-col gap-4 p-6 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="default">{business.category}</Badge>
                  <button
                    type="button"
                    className="rounded-full border border-line-soft bg-surface/80 px-3.5 py-1.5 text-xs font-semibold text-ink-soft transition-colors hover:text-ink lg:hidden"
                    aria-expanded={isActive}
                    aria-controls={`panel-${business.slug}`}
                    onClick={() => setActive(isActive ? "" : business.slug)}
                  >
                    {isActive ? "Tutup" : "Detail"}
                  </button>
                </div>

                <div className="flex items-start gap-5">
                  <BranchLogo business={business} className="size-20 shrink-0 sm:size-24" />
                  <div className="min-w-0 flex-1">
                    <h2 className={cn("font-display font-bold tracking-tight", TEXT.heading.h2)}>
                      <Link
                        href={`/${business.slug}`}
                        className="hover:underline underline-offset-4"
                      >
                        {business.name}
                      </Link>
                    </h2>
                    <p className={cn("mt-2 leading-relaxed text-ink-soft", TEXT.body.md)}>
                      {business.tagline}
                    </p>
                  </div>
                </div>

                <div
                  id={`panel-${business.slug}`}
                  className={cn("lg:block", isActive ? "block" : "hidden")}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className={cn("max-w-md leading-relaxed text-ink-soft", TEXT.body.md)}>
                      {business.description}
                    </p>
                    <p className="mt-4 flex items-start gap-2 text-xs font-medium text-ink-muted">
                      <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                      <span>
                        {business.address.street}, {business.address.kelurahan}
                      </span>
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      <Button asChild size="sm" className="shadow-md">
                        <a
                          href={generalWhatsAppUrl(business.name, business.whatsapp)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <MessageCircle className="size-4" aria-hidden="true" />
                          WhatsApp
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                          <Navigation className="size-4" aria-hidden="true" />
                          Rute
                        </a>
                      </Button>
                      <Button asChild size="sm" variant="ghost">
                        <Link href={`/${business.slug}`}>
                          Lihat toko
                          <ArrowRight
                            className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                            aria-hidden="true"
                          />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
