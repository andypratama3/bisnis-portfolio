"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Phone } from "lucide-react";
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
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 rounded-full" aria-label="Empat Toko Samarinda, ke beranda">
          <LogoMark />
          <span className="leading-tight">
            <span className="block font-display text-base font-bold">Empat Toko</span>
            <span className="block text-[11px] font-medium text-ink-soft">Samarinda</span>
          </span>
        </Link>

        <nav aria-label="Toko" className="hidden items-center gap-1 lg:flex">
          {siteNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:bg-paper-strong hover:text-ink",
                pathname === item.href && "bg-brand-soft text-brand-ink",
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
              <span>Telepon</span>
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu toko">
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Empat toko, satu kota</SheetTitle>
                <SheetDescription>
                  Pilih toko untuk melihat lokasi, foto, dan kontak WhatsApp.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu toko" className="flex flex-col gap-1 px-3">
                <Link
                  href="/"
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-paper-strong"
                >
                  Beranda
                </Link>
                {siteNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-3 text-sm font-semibold text-ink hover:bg-paper-strong",
                      pathname === item.href && "bg-brand-soft text-brand-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 border-t border-line px-6 py-4">
                <p className="text-xs leading-relaxed text-ink-soft">
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
