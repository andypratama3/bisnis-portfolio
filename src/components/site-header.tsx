"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, MessageCircle, Sparkles } from "lucide-react";
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
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-900/80">
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
          aria-label="Navigasi Utama"
          className="hidden items-center gap-1 rounded-full border border-slate-200/60 bg-slate-50/60 px-1.5 py-1 dark:border-slate-800/60 dark:bg-slate-900/60 lg:flex"
        >
          <Link
            href="/"
            className={cn(
              "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
              pathname === "/"
                ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                : "text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white",
            )}
          >
            Semua Toko
          </Link>
          <Link
            href="/#lokasi"
            className="relative rounded-full px-4 py-1.5 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white"
          >
            Peta Lokasi
          </Link>
          {siteNav.slice(0, 2).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-200",
                pathname === item.href
                  ? "bg-white text-slate-900 shadow-sm dark:bg-slate-800 dark:text-white"
                  : "text-slate-600 hover:bg-white/60 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-white",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            size="sm"
            className="hidden bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 sm:inline-flex"
          >
            <a
              href={`https://wa.me/${businesses[0].whatsapp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              <span>Hubungi Admin</span>
            </a>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon-sm"
                className="lg:hidden"
                aria-label="Buka menu navigasi"
              >
                <Menu className="size-4" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="border-slate-200 dark:border-slate-800">
              <SheetHeader className="border-b border-slate-200 dark:border-slate-800">
                <SheetTitle className="flex items-center gap-2">
                  <Sparkles className="size-5 text-emerald-600" aria-hidden="true" />
                  Empat Toko Samarinda
                </SheetTitle>
                <SheetDescription>
                  Katalog direktori toko lokal untuk kebutuhan harian Anda.
                </SheetDescription>
              </SheetHeader>
              <nav aria-label="Menu navigasi mobile" className="flex flex-col gap-1 px-4 py-4">
                <Link
                  href="/"
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                    pathname === "/" &&
                      "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
                  )}
                >
                  Semua Toko
                </Link>
                <Link
                  href="/#lokasi"
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Peta Lokasi
                </Link>
                {siteNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-xl px-3 py-2.5 text-sm font-semibold transition-colors hover:bg-slate-100 dark:hover:bg-slate-800",
                      pathname === item.href &&
                        "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t border-slate-200 px-6 py-4 dark:border-slate-800">
                <Button asChild className="w-full bg-emerald-600 text-white hover:bg-emerald-700">
                  <a
                    href={`https://wa.me/${businesses[0].whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="size-4" aria-hidden="true" />
                    Hubungi Admin
                  </a>
                </Button>
                <p className="mt-3 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                  Hubungi admin untuk info pembelian grosir atau kerjasama.
                </p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
