"use client";

import { useEffect, useState } from "react";
import { Minus, Plus, ShoppingBasket, Trash2 } from "lucide-react";
import { toast } from "sonner";
import type { Business } from "@/data/types";
import { buildOrderMessage, generalWhatsAppUrl, whatsappUrl } from "@/lib/whatsapp";
import { useCart } from "@/stores/cart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function CartSheet({ business }: { business: Business }) {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const [fulfilment, setFulfilment] = useState<"pickup" | "delivery">("pickup");
  const branchSlug = useCart((state) => state.branchSlug);
  const items = useCart((state) => state.items);
  const increment = useCart((state) => state.increment);
  const decrement = useCart((state) => state.decrement);
  const removeItem = useCart((state) => state.removeItem);
  const clear = useCart((state) => state.clear);

  useEffect(() => {
    void useCart.persist.rehydrate();
  }, []);

  const cartItems = branchSlug === business.slug ? items : [];
  const count = cartItems.reduce((total, item) => total + item.qty, 0);
  const message = buildOrderMessage({
    businessName: business.name,
    items: cartItems,
    note,
    fulfilment,
  });
  const href =
    cartItems.length > 0
      ? whatsappUrl(business.whatsapp, message)
      : generalWhatsAppUrl(business.name, business.whatsapp);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingBasket className="size-4" aria-hidden="true" />
          Keranjang
          {count > 0 && (
            <span className="ml-1 rounded-full bg-brand px-2 py-0.5 text-[11px] font-bold text-brand-contrast tabular-nums">
              {count}
            </span>
          )}
        </Button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>Pesanan</SheetTitle>
          <SheetDescription>
            Cek pesanan, tambahkan catatan, lalu kirim lewat WhatsApp {business.name}.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          {cartItems.length === 0 ? (
            <div className="rounded-card border border-dashed border-line bg-paper p-5">
              <ShoppingBasket className="size-6 text-ink-soft" aria-hidden="true" />
              <p className="mt-2 text-sm font-semibold">Keranjang masih kosong.</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                Katalog produk belum tersedia. Tanyakan stok dan harga terbaru langsung lewat
                WhatsApp.
              </p>
              <Button asChild className="mt-4" size="sm">
                <a
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Tanya stok
                </a>
              </Button>
            </div>
          ) : (
            <ul className="divide-y divide-line">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center gap-3 py-4">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{item.name}</p>
                    <p className="text-xs text-ink-soft">{item.unit ?? "per item"}</p>
                  </div>
                  <div className="flex items-center gap-1 rounded-full border border-line p-1">
                    <button
                      type="button"
                      className="inline-flex size-7 items-center justify-center rounded-full hover:bg-paper-strong"
                      onClick={() => decrement(item.id)}
                      aria-label={`Kurangi ${item.name}`}
                    >
                      <Minus className="size-3.5" aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center text-sm font-semibold tabular-nums">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="inline-flex size-7 items-center justify-center rounded-full hover:bg-paper-strong"
                      onClick={() => increment(item.id)}
                      aria-label={`Tambah ${item.name}`}
                    >
                      <Plus className="size-3.5" aria-hidden="true" />
                    </button>
                  </div>
                  <button
                    type="button"
                    className="inline-flex size-8 items-center justify-center rounded-full text-ink-soft hover:bg-paper-strong hover:text-danger"
                    onClick={() => {
                      removeItem(item.id);
                      toast.success(`${item.name} dihapus dari keranjang.`);
                    }}
                    aria-label={`Hapus ${item.name}`}
                  >
                    <Trash2 className="size-4" aria-hidden="true" />
                  </button>
                </li>
              ))}
            </ul>
          )}

          <Separator className="my-5" />

          <div>
            <label htmlFor="order-note" className="text-sm font-semibold">
              Catatan
            </label>
            <textarea
              id="order-note"
              value={note}
              onChange={(event) => setNote(event.target.value)}
              rows={3}
              placeholder="Contoh: minta dipilih yang matang, ambil sore."
              className="mt-2 w-full resize-none rounded-2xl border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus-visible:border-brand-ink focus-visible:outline-none"
            />
          </div>

          <fieldset className="mt-5">
            <legend className="text-sm font-semibold">Cara ambil</legend>
            <ToggleGroup
              type="single"
              value={fulfilment}
              onValueChange={(value) => {
                if (value === "pickup" || value === "delivery") setFulfilment(value);
              }}
              className="mt-2"
              aria-label="Cara ambil pesanan"
            >
              <ToggleGroupItem value="pickup">Diambil</ToggleGroupItem>
              <ToggleGroupItem value="delivery">Diantar</ToggleGroupItem>
            </ToggleGroup>
            <p className="mt-2 text-xs leading-relaxed text-ink-soft">
              Ongkir dan ketersediaan antar dikonfirmasi oleh toko lewat WhatsApp.
            </p>
          </fieldset>

          {cartItems.length > 0 && (
            <button
              type="button"
              onClick={() => {
                clear();
                toast.success("Keranjang dikosongkan.");
              }}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-ink-soft hover:text-danger"
            >
              <Trash2 className="size-3.5" aria-hidden="true" />
              Kosongkan keranjang
            </button>
          )}
        </div>

        <SheetFooter>
          <Button asChild className={cn("w-full")} size="lg">
            <a href={href} target="_blank" rel="noopener noreferrer">
              {cartItems.length > 0 ? "Kirim pesanan via WhatsApp" : "Tanya stok via WhatsApp"}
            </a>
          </Button>
          <p className="mt-2 text-center text-[11px] leading-relaxed text-ink-soft">
            Pesanan dikonfirmasi langsung oleh toko. Situs ini tidak menyimpan pembayaran.
          </p>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
