# Bisnis Portfolio — Empat Toko Samarinda

Hub statis berbasis Next.js 15 + Tailwind CSS v4 berisi empat toko di Samarinda: Citra Buah, Sentra Sembako, Fatur Frozen Food, dan Sumber Tani Makmur. Setiap cabang punya halaman lokasi, galeri foto, katalog (kosong dengan empty state), jam buka (belum diumumkan), dan aksi WhatsApp/telepon/rute.

## Fitur

- Hub dengan rak interaktif, pencarian/filter, peta, FAQ
- Halaman cabang: foto lokasi, katalog + keranjang → WA, lokasi & jam, tautan lintas toko
- Schema.org LocalBusiness, OG/Twitter, sitemap/robots, manifest
- Mobile-first, bottom action bar, prefer-reduced-motion
- Unit test (Vitest), E2E (Playwright)

## Berjalan lokal

```bash
npm install
npm run dev
```

## Build & cek

```bash
npm run typecheck
npm run lint
npm test
npm run build
```

## Data

Data usaha ada di `src/data/`. Foto publik ada di `public/images/`. Folder `01-*` hingga `04-*` (berisi data mentah/foto asli) dan `foto-legal/` tidak di-push ke repo publik.

## TODO pemilik

- Jam buka per toko
- Daftar produk + harga
- Logo Sentra Sembako yang bersih (foto saat ini screenshot)
- Blur/crop plat nomor pada foto Fatur exterior-3 jika dipakai
- Konfirmasi pin Google Maps & kode pos
- Foto interior/produk (opsional)

## Deploy

Cocok untuk Vercel/Netlify. Set `NEXT_PUBLIC_SITE_URL` untuk canonical/OG.
