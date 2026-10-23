"use client";

import { toast } from "sonner";
import { MessageCircle, Plus, ShoppingBasket } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { useCart } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { CartSheet } from "@/components/cart-sheet";

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BranchCatalog({ business }: { business: Business }) {
  const addItem = useCart((state) => state.addItem);
  const hasProducts = business.products.length > 0;

  return (
    <section aria-labelledby="catalog-title" className="mt-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="catalog-title" className="font-display text-2xl font-bold">
            Katalog
          </h2>
          <p className="mt-1 text-sm text-ink-soft">
            {hasProducts
              ? "Tambahkan produk ke keranjang, lalu kirim lewat WhatsApp."
              : "Stok dan harga terbaru dikonfirmasi langsung oleh toko."}
          </p>
        </div>
        <CartSheet business={business} />
      </div>

      {hasProducts ? (
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {business.products.map((product) => (
            <li
              key={product.id}
              className="flex flex-col rounded-card border border-line bg-card p-4"
            >
              <p className="text-sm font-semibold">{product.name}</p>
              <p className="mt-1 text-xs text-ink-soft">{product.unit ?? "per item"}</p>
              <p className="mt-2 text-sm font-bold tabular-nums">
                {product.price ? formatRupiah(product.price) : "Tanya harga"}
              </p>
              <Button
                type="button"
                size="sm"
                variant="outline"
                className="mt-3 self-start"
                onClick={() => {
                  addItem(business.slug, {
                    id: product.id,
                    name: product.name,
                    unit: product.unit,
                  });
                  toast.success(`${product.name} ditambahkan ke keranjang.`);
                }}
              >
                <Plus className="size-4" aria-hidden="true" />
                Tambah
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="mt-5 grid gap-4 rounded-panel border border-line bg-card p-5 sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
          <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-brand-soft text-brand-ink">
            <ShoppingBasket className="size-6" aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold">Katalog belum tersedia</h3>
            <p className="mt-1 max-w-xl text-sm leading-relaxed text-ink-soft text-pretty">
              Pemilik toko belum mengirimkan daftar produk dan harga. Tanyakan stok hari ini lewat
              WhatsApp agar tidak menebak-nebak.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm">
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Tanya stok via WhatsApp
                </a>
              </Button>
              <Button asChild size="sm" variant="outline">
                <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Lihat rute
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
