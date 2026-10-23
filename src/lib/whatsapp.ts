import type { CartItem } from "@/stores/cart";

type OrderInput = {
  businessName: string;
  items: CartItem[];
  note?: string;
  fulfilment?: "pickup" | "delivery";
};

export function buildOrderMessage({
  businessName,
  items,
  note,
  fulfilment = "pickup",
}: OrderInput) {
  const cleanNote = note?.trim();
  const cleanItems = items.filter((item) => item.qty > 0);

  if (cleanItems.length === 0) {
    return `Halo ${businessName}, saya mau tanya stok hari ini.${
      cleanNote ? `\nCatatan: ${cleanNote}` : ""
    }`;
  }

  const lines = cleanItems.map((item) => {
    const unit = item.unit ? ` ${item.unit}` : "";
    return `- ${item.name} x${item.qty}${unit}`;
  });

  const fulfilmentText =
    fulfilment === "delivery" ? "Diantar (konfirmasi ongkir)" : "Diambil di toko";

  return [
    `Halo ${businessName}, saya mau pesan:`,
    ...lines,
    ...(cleanNote ? [`Catatan: ${cleanNote}`] : []),
    fulfilmentText,
  ].join("\n");
}

export function whatsappUrl(phoneDigits: string, message: string) {
  const phone = phoneDigits.replace(/\D/g, "");
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function generalWhatsAppUrl(businessName: string, phoneDigits: string) {
  return whatsappUrl(
    phoneDigits,
    buildOrderMessage({ businessName, items: [] }),
  );
}
