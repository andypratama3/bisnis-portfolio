"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight, MessageCircle, Navigation } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function BranchRack({ branches }: { branches: Business[] }) {
  const [active, setActive] = useState(branches[0]?.slug ?? "");

  return (
    <section aria-labelledby="hero-title" className="mx-auto max-w-6xl px-4 pt-10 sm:px-6 lg:pt-16">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold text-brand-ink">Samarinda, Kalimantan Timur</p>
        <h1
          id="hero-title"
          className="mt-3 font-display text-4xl leading-[1.05] font-bold text-balance sm:text-5xl lg:text-6xl"
        >
          Empat toko, satu keluarga, di Samarinda.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-soft text-pretty sm:text-lg">
          Buah segar, sembako, frozen food, dan sayur harian. Pilih toko untuk melihat foto
          lokasi, alamat, dan kontak WhatsApp.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 lg:h-[34rem] lg:flex-row" role="list">
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
                "flex min-w-0 flex-col overflow-hidden rounded-panel border border-line bg-card panel-shadow",
                "transition-[flex-grow] duration-200",
                isActive ? "lg:grow-[2.4]" : "lg:grow",
              )}
            >
              <div className="bg-brand-soft p-5">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-bold text-brand-ink">{business.category}</p>
                  <button
                    type="button"
                    className="rounded-full bg-card px-3 py-1 text-xs font-semibold text-brand-ink lg:hidden"
                    aria-expanded={isActive}
                    aria-controls={`panel-${business.slug}`}
                    onClick={() => setActive(business.slug)}
                  >
                    {isActive ? "Tutup" : "Lihat"}
                  </button>
                </div>

                <h2 className="mt-2 font-display text-2xl leading-tight font-bold text-balance">
                  <Link href={`/${business.slug}`} className="hover:underline">
                    {business.name}
                  </Link>
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{business.tagline}</p>

                <div id={`panel-${business.slug}`} hidden={!isActive}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                    >
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-soft">
                        {business.description}
                      </p>
                      <p className="mt-3 text-xs font-medium text-ink-soft">
                        {business.address.street}, {business.address.kelurahan}
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
                            <ArrowRight className="size-4" aria-hidden="true" />
                          </Link>
                        </Button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <div className="relative h-52 lg:h-auto lg:flex-1">
                <Image
                  src={business.photos[0].src}
                  alt={business.photos[0].alt}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
