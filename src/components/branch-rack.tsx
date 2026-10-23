"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MapPin, MessageCircle, Navigation, Sparkles } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function BranchRack({ branches }: { branches: Business[] }) {
  const [active, setActive] = useState(branches[0]?.slug ?? "");

  return (
    <section aria-labelledby="hero-title" className="relative mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-16">
      <div className="pointer-events-none absolute -top-20 left-1/2 -z-10 h-72 w-[min(80rem,90vw)] -translate-x-1/2 rounded-full bg-gradient-to-b from-brand-soft/60 to-transparent blur-3xl" />

      <div className="max-w-4xl">
        <Badge variant="glass" className="gap-1.5">
          <Sparkles className="size-3" aria-hidden="true" />
          Samarinda, Kalimantan Timur
        </Badge>
        <h1
          id="hero-title"
          className="mt-6 font-display text-4xl leading-[1.02] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl"
        >
          <span className="block">Empat toko,</span>
          <span className="block text-gradient">satu kebutuhan harian.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg lg:text-xl">
          Buah segar, sembako, frozen food, dan sayur harian dari toko lokal Samarinda.
          Pilih toko, lihat lokasi, dan hubungi langsung lewat WhatsApp.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Button asChild size="lg">
            <a href="#toko">
              Jelajahi toko
              <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#lokasi">
              Lihat peta lokasi
              <MapPin className="size-4" aria-hidden="true" />
            </a>
          </Button>
        </div>
      </div>

      <div id="toko" className="mt-10 flex flex-col gap-3 lg:h-[38rem] lg:flex-row" role="list">
        {branches.map((business, index) => {
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
              <div className="relative flex flex-col gap-3 p-6">
                <div className="flex items-center justify-between gap-3">
                  <Badge variant="default">{business.category}</Badge>
                  <button
                    type="button"
                    className="rounded-full border border-line-soft bg-surface/80 px-3 py-1 text-xs font-semibold text-ink-soft transition-colors hover:text-ink lg:hidden"
                    aria-expanded={isActive}
                    aria-controls={`panel-${business.slug}`}
                    onClick={() => setActive(business.slug)}
                  >
                    {isActive ? "Tutup" : "Detail"}
                  </button>
                </div>

                <div>
                  <h2 className="font-display text-2xl leading-tight font-bold tracking-tight sm:text-3xl">
                    <Link href={`/${business.slug}`} className="hover:underline underline-offset-4">
                      {business.name}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft sm:text-base">
                    {business.tagline}
                  </p>
                </div>

                <div id={`panel-${business.slug}`} className={cn("lg:block", isActive ? "block" : "hidden")}>
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                      {business.description}
                    </p>
                    <p className="mt-3 flex items-start gap-1.5 text-xs font-medium text-ink-muted">
                      <MapPin className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
                      <span>
                        {business.address.street}, {business.address.kelurahan}
                      </span>
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <Button asChild size="sm">
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
                          <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="relative mt-auto h-56 sm:h-64 lg:h-auto lg:flex-1">
                <Image
                  src={business.photos[0].src}
                  alt={business.photos[0].alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink/60 to-transparent" />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
