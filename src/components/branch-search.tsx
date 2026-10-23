"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Search } from "lucide-react";
import type { Business } from "@/data/types";
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
    <section aria-labelledby="search-title" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="rounded-panel border border-line bg-card p-5 sm:p-6 panel-shadow">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 id="search-title" className="font-display text-2xl font-bold text-balance sm:text-3xl">
              Cari berdasarkan kebutuhan
            </h2>
            <p className="mt-1 text-sm text-ink-soft">
              Ketik buah, beras, frozen, atau sayur untuk menemukan toko yang tepat.
            </p>
          </div>

          <div className="relative w-full lg:max-w-sm">
            <label htmlFor="branch-search" className="sr-only">
              Cari toko atau kebutuhan
            </label>
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-ink-soft"
              aria-hidden="true"
            />
            <Input
              id="branch-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buah, beras, frozen, sayur…"
              className="pl-10"
              autoComplete="off"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              aria-pressed={filter === item.id}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors",
                filter === item.id
                  ? "border-brand-ink bg-brand-soft text-brand-ink"
                  : "border-line bg-paper text-ink-soft hover:border-ink-soft hover:text-ink",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <p className="mt-4 text-xs font-medium text-ink-soft" aria-live="polite">
          {results.length} toko ditemukan
        </p>

        {results.length > 0 ? (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {results.map((business) => (
              <li key={business.slug}>
                <Link
                  href={`/${business.slug}`}
                  data-brand={business.slug}
                  className="group flex h-full flex-col rounded-card border border-line bg-paper p-4 transition-colors hover:border-ink-soft"
                >
                  <span className="text-xs font-bold text-brand-ink">{business.category}</span>
                  <span className="mt-1 font-display text-lg font-bold">{business.name}</span>
                  <span className="mt-1 flex items-start gap-1.5 text-sm leading-relaxed text-ink-soft">
                    <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
                    {business.address.street}, {business.address.kelurahan}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-ink">
                    Lihat toko
                    <ArrowRight
                      className="size-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-4 rounded-card border border-dashed border-line bg-paper p-5">
            <p className="text-sm font-semibold">Belum ada toko yang cocok.</p>
            <p className="mt-1 text-sm text-ink-soft">
              Coba kata lain, atau tampilkan semua toko.
            </p>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => {
                setQuery("");
                setFilter("semua");
              }}
            >
              Tampilkan semua
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
