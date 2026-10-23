import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60dvh] max-w-3xl flex-col items-center justify-center px-4 text-center sm:px-6">
      <p className="text-sm font-semibold text-brand-ink">404</p>
      <h1 className="mt-2 font-display text-4xl font-bold text-balance">Halaman tidak ditemukan</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft text-pretty">
        Halaman yang Anda cari tidak ada. Kembali ke beranda untuk melihat keempat toko.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">
          <ArrowLeft className="size-4" aria-hidden="true" />
          Kembali ke beranda
        </Link>
      </Button>
    </section>
  );
}
