"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone, Sparkles } from "lucide-react";
import { businesses } from "@/data/businesses";
import { siteNav } from "@/data/site";
import { cn } from "@/lib/utils";
import { LogoMark } from "@/components/logo-mark";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/80 glass-subtle">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-full transition-transform duration-200 hover:scale-[0.98]"
          aria-label="Empat Toko Samarinda, ke beranda"
        >
          <LogoMark className="transition-transform duration-200 group-hover:rotate-6" />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold tracking-tight">
              Empat Toko
            </span>
            <span className="block text-[11px] font-medium text-ink-muted">Samarinda</span>
          </span>
        </Link>

        <nav
          aria-label="Toko"
          className="hidden items-center gap-1 rounded-full border border-line/60 bg-surface/60 px-1.5 py-1 lg:flex"
        >
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-brand-soft text-brand-ink shadow-sm"
                  : "text-ink-soft hover:text-ink hover:bg-paper-strong/60",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={`tel:${businesses[0].phoneE164}`}>
              <Phone className="size-4" aria-hidden="true" />
              <span>Hubungi</span>
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Buka menu toko"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-line">
              <SheetHeader className="border-b border-line-soft">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-brand" aria-hidden="true" />
                  Empat Toko Samarinda
                </SheetTitle>
                <SheetDescription>
                  Pilih toko untuk melihat lokasi, foto, dan kontak WhatsApp.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu toko" className="flex flex-col gap-1 px-4 py-4">
                <Link
                  href="/"
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-paper-strong",
                    pathname === "/" && "bg-brand-soft text-brand-ink",
                  )}
                >
                  Beranda
                </Link>
                {siteNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-paper-strong",
                      pathname === item.href && "bg-brand-soft text-brand-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t border-line-soft px-6 py-4">
                <p className="text-xs leading-relaxed text-ink-muted">
                  Jam buka tiap toko belum diumumkan. Hubungi langsung sebelum berkunjung.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
