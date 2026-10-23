"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import type { Business } from "@/data/types";
import { SPACING, GRID } from "@/lib/constants";
import { SectionContainer } from "@/components/shared/section-container";
import { IconWrapper } from "@/components/shared/icon-wrapper";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const filters = [
  { id: "semua", label: "Semua" },
  { id: "buah", label: "Buah" },
  { id: "sembako", label: "Sembako" },
  { id: "frozen", label: "Frozen" },
  { id: "sayur", label: "Sayur" },
];

export function BranchSearch({ branches }: { branches: Business[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("semua");

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase();

    return branches.filter((business) => {
      const matchesFilter =
        filter === "semua" || business.keywords.some((keyword) => keyword.includes(filter));
      if (!matchesFilter) return false;
      if (!needle) return true;

      const haystack = [
        business.name,
        business.category,
        business.tagline,
        business.description,
        business.address.street,
        business.address.kelurahan,
        business.address.kecamatan,
        ...business.keywords,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(needle);
    });
  }, [branches, filter, query]);

  return (
    <SectionContainer aria-labelledby="search-title" className={SPACING.sectionTop}>
      <div className="relative overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-card via-paper to-card p-8 shadow-xl sm:p-10 lg:p-12">
        {/* Decorative elements */}
        <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-brand-soft/40 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 size-64 rounded-full bg-brand-soft/40 blur-3xl" />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-xl">
            <h2
              id="search-title"
              className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl"
            >
              Cari Toko Sesuai Kebutuhan
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">
              Ketik nama toko, jenis produk, atau lokasi untuk menemukan yang Anda cari.
            </p>
          </div>

          <div className="relative w-full lg:max-w-md">
            <label htmlFor="branch-search" className="sr-only">
              Cari toko atau kebutuhan
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <Input
              id="branch-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari buah, sayur, sembako, frozen food..."
              className="h-12 border-2 pl-12 text-base shadow-sm transition-all focus:border-brand focus:ring-2 focus:ring-brand/20"
              autoComplete="off"
            />
          </div>
        </div>

        <div
          className="relative mt-8 flex flex-wrap gap-3"
          role="group"
          aria-label="Filter kategori"
        >
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                "rounded-full border-2 px-5 py-2.5 text-sm font-semibold transition-all duration-200",
                filter === item.id
                  ? "scale-105 border-brand bg-brand text-brand-contrast shadow-lg shadow-brand/25"
                  : "border-line bg-paper text-ink-soft hover:scale-105 hover:border-brand/40 hover:bg-brand-soft/50 hover:text-brand-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="relative mt-8 flex items-center justify-between border-t border-line pt-8">
          <p className="text-sm font-medium text-ink-soft" aria-live="polite">
            <span className="text-lg font-bold text-brand">{results.length}</span>{" "}
            {results.length === 1 ? "toko" : "toko"} ditemukan
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <ul className={cn("mt-8", GRID.cards2, "gap-6 lg:gap-8")}>
          {results.map((business) => (
            <li key={business.slug}>
              <Link
                href={`/${business.slug}`}
                data-brand={business.slug}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-line bg-gradient-to-br from-card to-paper p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10"
              >
                <span className="inline-block w-fit rounded-full bg-brand-soft px-4 py-1.5 text-xs font-bold text-brand-ink shadow-sm">
                  {business.category}
                </span>
                <span className="mt-4 font-display text-xl font-bold sm:text-2xl">
                  {business.name}
                </span>
                <span className="mt-3 flex items-start gap-2.5 text-sm leading-relaxed text-ink-soft">
                  <IconWrapper icon={MapPin} className="mt-0.5 shrink-0" />
                  {business.address.street}, {business.address.kelurahan}
                </span>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-ink">
                  Lihat detail toko
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-2"
                    aria-hidden="true"
                  />
                </span>
                {/* Decorative gradient */}
                <div className="pointer-events-none absolute -right-10 -bottom-10 size-32 rounded-full bg-brand/5 blur-2xl transition-all duration-300 group-hover:scale-125 group-hover:bg-brand/10" />
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-8 rounded-3xl border-2 border-dashed border-line bg-paper-subtle p-12 text-center">
          <div className="mx-auto max-w-md">
            <p className="text-xl font-semibold sm:text-2xl">Tidak ada toko yang cocok</p>
            <p className="mt-3 text-base text-ink-soft">
              Coba kata kunci lain, atau tampilkan semua toko dengan mengklik &ldquo;Semua&rdquo;.
            </p>
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="mt-6 shadow-sm"
              onClick={() => {
                setQuery("");
                setFilter("semua");
              }}
            >
              Tampilkan Semua Toko
            </Button>
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
