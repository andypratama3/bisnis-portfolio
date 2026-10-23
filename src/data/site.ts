export const siteConfig = {
  name: "Empat Toko Samarinda",
  title: "Toko Buah, Sembako, Frozen Food & Sayur Terpercaya di Samarinda",
  description:
    "Belanja kebutuhan harian di 4 toko terpercaya Samarinda: Citra Buah (buah segar), Sentra Sembako (kebutuhan pokok), Fatur Frozen Food (makanan beku), Sumber Tani Makmur (sayuran). Lokasi jelas, foto asli, pesan via WhatsApp.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bisnis-portfolio.vercel.app",
  locale: "id_ID",
  city: "Samarinda",
  province: "Kalimantan Timur",
  timeZone: "Asia/Makassar",
};

export const siteNav = [
  { href: "/citra-buah", label: "Citra Buah" },
  { href: "/sentra-sembako", label: "Sentra Sembako" },
  { href: "/fatur-frozen-food", label: "Fatur Frozen Food" },
  { href: "/sumber-tani-makmur", label: "Sumber Tani Makmur" },
];
