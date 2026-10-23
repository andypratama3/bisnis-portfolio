import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { businesses } from "@/data/businesses";

export function CrossLinks({ currentSlug }: { currentSlug: string }) {
  const others = businesses.filter((business) => business.slug !== currentSlug);

  return (
    <section aria-labelledby="other-title" className="mt-14">
      <h2 id="other-title" className="font-display text-2xl font-bold">
        Toko lain
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {others.map((business) => (
          <li key={business.slug}>
            <Link
              href={`/${business.slug}`}
              data-brand={business.slug}
              className="group flex h-full flex-col rounded-card border border-line bg-card p-4 transition-colors hover:border-ink-soft"
            >
              <span className="text-xs font-bold text-brand-ink">{business.category}</span>
              <span className="mt-1 font-display text-lg font-bold">{business.name}</span>
              <span className="mt-1 text-sm leading-relaxed text-ink-soft">{business.tagline}</span>
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
    </section>
  );
}
