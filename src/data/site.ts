export const siteConfig = {
  name: "Empat Toko Samarinda",
  title: "Empat Toko Samarinda — Buah, Sembako, Frozen Food, Sayur",
  description:
    "Empat toko di Samarinda: Citra Buah, Sentra Sembako, Fatur Frozen Food, dan Sumber Tani Makmur. Lihat lokasi, jam, dan hubungi lewat WhatsApp.",
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
