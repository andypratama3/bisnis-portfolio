import { describe, expect, it } from "vitest";
import { buildOrderMessage, whatsappUrl } from "./whatsapp";

describe("buildOrderMessage", () => {
  it("builds a general stock question when the cart is empty", () => {
    expect(buildOrderMessage({ businessName: "Citra Buah", items: [] })).toBe(
      "Halo Citra Buah, saya mau tanya stok hari ini.",
    );
  });

  it("lists items, note, and fulfilment method", () => {
    const message = buildOrderMessage({
      businessName: "Sentra Sembako",
      items: [
        { id: "beras", name: "Beras", unit: "kg", qty: 2 },
        { id: "gula", name: "Gula", unit: "kg", qty: 1 },
      ],
      note: "Ambil sore",
      fulfilment: "delivery",
    });

    expect(message).toContain("Halo Sentra Sembako, saya mau pesan:");
    expect(message).toContain("- Beras x2 kg");
    expect(message).toContain("- Gula x1 kg");
    expect(message).toContain("Catatan: Ambil sore");
    expect(message).toContain("Diantar (konfirmasi ongkir)");
  });

  it("ignores zero-quantity items", () => {
    const message = buildOrderMessage({
      businessName: "Fatur Frozen Food",
      items: [{ id: "ayam", name: "Ayam", qty: 0 }],
    });

    expect(message).toBe("Halo Fatur Frozen Food, saya mau tanya stok hari ini.");
  });
});

describe("whatsappUrl", () => {
  it("normalizes the number and encodes the message", () => {
    expect(whatsappUrl("+62 813-4688-0168", "Halo Citra Buah")).toBe(
      "https://wa.me/6281346880168?text=Halo%20Citra%20Buah",
    );
  });
});
