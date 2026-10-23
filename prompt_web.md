# PROMPT — Website Hub 4 Cabang Usaha (Samarinda)

> Tempel seluruh isi file ini ke coding agent (Claude Code / OpenCode / dsb.) di root repo kosong.
> Bagian **Keputusan arsitektur** sudah menjawab pertanyaan "apakah 1 page cukup".

---

## 0. Jawaban singkat: apakah 1 page bisa menangani semuanya?

**Bisa, tapi bukan pilihan terbaik kalau hanya 1 URL.** Rekomendasi: **1 aplikasi, 1 hub, 4 halaman cabang.**

| Opsi | Kelebihan | Kekurangan |
|---|---|---|
| 1 page panjang, 4 section | Cepat dibuat, mudah dibagikan | 1 URL harus mewakili 4 bisnis berbeda; Google sulit membedakan; field "Website" di tiap Google Business Profile jadi menunjuk ke halaman yang sama |
| **Hub + 4 route cabang (dipilih)** | Tiap GBP punya URL sendiri; SEO lokal per bisnis; schema `LocalBusiness` per cabang; tetap satu codebase, satu desain | Sedikit lebih banyak halaman |
| 4 website terpisah | Isolasi penuh | Biaya maintenance 4x, tidak ada cerita "satu pemilik" |

Struktur rute:

```
/                      → Hub: hero interaktif 4 cabang, peta, FAQ, kontak
/citra-buah            → Halaman cabang 1
/sentra-sembako        → Halaman cabang 2
/fatur-frozen-food     → Halaman cabang 3
/sumber-tani-makmur    → Halaman cabang 4
```

Tiap halaman cabang memakai **satu template** yang diisi dari data. Menambah cabang ke-5 nanti = tambah 1 objek data, bukan 1 halaman baru.

URL tiap cabang dipakai sebagai field **Website** di Google Business Profile masing-masing.

---

## 1. Peran dan tujuan

Kamu adalah senior frontend engineer + desainer produk. Bangun website untuk **satu pemilik dengan empat usaha toko fisik di Samarinda, Kalimantan Timur**. Tujuan utama pengunjung (mayoritas dari HP, sinyal belum tentu cepat):

1. Menemukan toko yang tepat dan **datang** (rute Google Maps, jam buka, telepon).
2. **Memesan lewat WhatsApp** dengan daftar belanja yang sudah tertulis rapi.
3. Percaya bahwa tokonya nyata (foto asli, alamat jelas, ulasan Google).

Bukan tujuan: e-commerce dengan pembayaran, login, atau dashboard admin.

---

## 2. Stack (wajib)

- **Next.js 15 (App Router) + TypeScript strict**, rendering statis (SSG) untuk semua halaman.
- **Tailwind CSS v4** + **shadcn/ui** (Button, Card, Tabs, Sheet, Dialog, Accordion, Badge, Input, Toggle Group, Sonner, Skeleton, Separator).
- **motion** (Framer Motion) untuk animasi; **embla-carousel-react** untuk carousel galeri; **lucide-react** untuk ikon.
- **zustand** untuk state keranjang pesan (persist ke `localStorage`).
- **next/image**, **next/font** (font di-host sendiri, tanpa request ke Google Fonts saat runtime).
- Opsional: **vaul** (drawer mobile), **yet-another-react-lightbox** (lightbox galeri).
- Tanpa backend. Semua konten dari `src/data/*.ts`.
- Lint/format: ESLint + Prettier. Test: Vitest untuk util (format pesan WA, cek buka/tutup), Playwright untuk 1 alur smoke (pilih cabang → tambah item → buka WA).
- Deploy target: Vercel **atau** VPS (Nginx + Node). Sertakan `next.config.ts` yang aman untuk keduanya.

---

## 3. Sumber data tunggal (single source of truth)

Buat `src/data/businesses.ts`. **Semua teks, kontak, dan JSON-LD dibangkitkan dari sini.** Jangan hardcode nomor, alamat, atau nama di komponen.

```ts
export type Business = {
  slug: "citra-buah" | "sentra-sembako" | "fatur-frozen-food" | "sumber-tani-makmur";
  name: string;                 // PERSIS seperti plang & GBP, tanpa tambahan kata kunci
  tagline: string;              // plain language, maks 8 kata
  category: string;             // kategori GBP utama
  accent: { base: string; ink: string; soft: string }; // lihat palet
  phone: string;                // format E.164, mis. "+6281346880168"
  whatsapp: string;             // digit saja untuk wa.me, mis. "6281346880168"
  address: { street: string; kelurahan: string; kecamatan: string; city: "Samarinda"; province: "Kalimantan Timur"; postalCode: string; postalCodeNeedsConfirmation?: boolean };
  geo: { lat: number; lng: number; approximate: true };
  mapsUrl: string;              // link rute berdasarkan koordinat
  hours: Record<"mon"|"tue"|"wed"|"thu"|"fri"|"sat"|"sun", { open: string; close: string } | null> | null; // null = belum diisi
  description: string;          // ≤ 750 karakter (batas GBP) — satu teks dipakai di web & GBP
  photos: { src: string; alt: string; kind: "logo" | "exterior" | "interior" | "product" }[];
  products: Product[];
  googleReviewUrl?: string;     // isi setelah profil Verified
};
```

### Data yang sudah pasti (dari TODO GBP)

| Slug | Nama | Kategori | Telepon | Alamat | Kode pos | Koordinat (estimasi) |
|---|---|---|---|---|---|---|
| `citra-buah` | Citra Buah | Toko Buah | +62 813-4688-0168 | Jl. Pada Elo RT.03, Baqa, Samarinda Seberang | 75131 ⚠️ (kelurahan menulis 75132, set `postalCodeNeedsConfirmation: true`) | -0.506935, 117.140205 |
| `sentra-sembako` | Sentra Sembako | Toko Kelontong | +62 822-5433-8455 | Jl. Gatot Subroto RT.43, Pelita, Samarinda Ilir | 75117 | -0.489936, 117.153346 |
| `fatur-frozen-food` | Fatur Frozen Food | Toko Makanan Beku | +62 851-1710-8612 | Jl. P. Bendahara RT.05, Tenun, Samarinda Seberang | 75133 | -0.511662, 117.148452 |
| `sumber-tani-makmur` | Sumber Tani Makmur | Toko Buah dan Sayur | +62 898-0256-129 | Jl. Bung Tomo RT.07, Baqa, Samarinda Seberang | 75131 ⚠️ (sama seperti Citra Buah) | -0.509191, 117.138854 |

### Aturan keras soal data yang BELUM ada

- **Jam operasional, nama pemilik/grup, deskripsi final, daftar produk, harga, foto interior/produk belum tersedia.** Jangan mengarang.
- Isi dengan `null` / array kosong dan tandai `// TODO(owner)`. UI wajib punya **empty state yang berguna**: mis. jam `null` → tampil "Jam buka belum diumumkan — tanya langsung lewat WhatsApp" + tombol WA, bukan teks kosong atau jam palsu.
- Nama grup/pemilik: pakai konstanta `GROUP_NAME = "[ISI NAMA GRUP]"` di satu tempat; jangan tulis nama karangan.
- Jangan membuat testimoni, jumlah pelanggan, rating, atau klaim "termurah / terlengkap". Bagian ulasan hanya menampilkan tautan ke Google Reviews bila `googleReviewUrl` terisi; kalau belum, sembunyikan bagian itu.
- Koordinat bersifat estimasi (`approximate: true`) — tombol rute tetap pakai koordinat, tapi sediakan konstanta agar mudah diperbarui setelah pin GBP final.

### Aset foto

- Struktur folder asli: `NN-slug/foto-logo`, `foto-lokasi`, `foto-produk`. Salin ke `public/images/<slug>/` dan **konversi ke AVIF/WebP** saat build (next/image). Lebar sumber maks 1600px.
- **Jangan masukkan** `foto-legal/*` (KTP, foto pemilik) ke repo publik sama sekali. Tambahkan ke `.gitignore`.
- `foto-produk/*.jpg` yang 0 byte: abaikan; komponen harus tahan terhadap array foto kosong.
- Logo Sentra Sembako masih screenshot: sediakan placeholder wordmark teks sampai file bersih tersedia; beri `// TODO(owner): ganti logo`.
- Foto Fatur Frozen Food eksterior-3 menampilkan plat kendaraan: **jangan tampilkan sebelum diblur**; skip di data sampai ada versi blur.
- Foto asli saja. Jangan stok foto, jangan overlay logo ke foto toko.

---

## 4. Arah desain (sudah diputuskan, ikuti)

### Subjek dan suasana
Pasar tradisional yang rapi: tumpukan buah, karung sembako, freezer dingin, sayur segar. Kesannya **hangat, jujur, dekat**, bukan korporat dan bukan startup SaaS. Tiap cabang punya "warna dagangannya" sendiri; keempatnya duduk di atas satu dasar yang tenang.

### Palet
| Nama | Hex | Peran |
|---|---|---|
| Daun Tua | `#12261D` | Teks utama, footer |
| Kertas Pasar | `#F5F8F2` | Latar halaman (hijau sangat pucat, bukan krem) |
| Semangka | `#E23D5A` | Aksen Citra Buah |
| Kunyit | `#E7B10A` | Aksen Sentra Sembako |
| Es Biru | `#2B8CE0` | Aksen Fatur Frozen Food |
| Daun Muda | `#2F9E57` | Aksen Sumber Tani Makmur, juga aksen hub/CTA WhatsApp |

- Tiap aksen punya 3 turunan (`base`, `ink` untuk teks di atas latar terang, `soft` untuk latar lembut) sebagai CSS variable yang diganti per halaman cabang lewat `data-brand="slug"` di wrapper. Seluruh komponen shadcn membaca `--brand`, sehingga satu template cocok untuk 4 cabang.
- **Kontras wajib WCAG AA** (teks 4.5:1). Kunyit terlalu terang untuk teks: pakai `ink` gelap (`#6B5200`) untuk teks, `base` hanya untuk blok warna/ikon.
- Dark mode: tidak wajib. Kalau ada, jangan sekadar membalik warna; turunkan dari Daun Tua.

### Tipografi
- **Bricolage Grotesque** (display, variable, bobot 600–800): bentuknya punya karakter pasar/poster, bukan font default.
- **Plus Jakarta Sans** (body, 400/500/600): rapi, terbaca di layar HP, akrab bagi pembaca Indonesia.
- Skala: 14 / 16 / 18 / 24 / 32 / 48 / 72 (clamp untuk fluid). Panjang baris < 70 karakter. Heading memakai sentence case.
- Hindari: label ALL-CAPS tracking lebar di atas setiap heading, aksen satu kata saja di headline, penomoran 01/02/03 (konten ini bukan urutan), strip pemisah dengan titik tengah.

### Bentuk dan permukaan
- Radius dibedakan menurut hierarki: panel besar 28px, kartu 16px, tombol/chip pill. Jangan satu radius untuk semuanya.
- Tidak ada gradient wash dekoratif. Warna datar, foto asli sebagai pemberi tekstur. Bayangan hanya untuk elemen yang melayang (bottom bar, drawer, popover).

### Satu momen yang dibuat berani: hero "Rak Empat Cabang"
Hero adalah satu baris **empat panel vertikal** (di mobile: tumpukan vertikal, tiap panel tinggi 25vh) dengan warna aksen masing-masing.

```
Desktop (≥1024px) — panel flex, yang di-hover/fokus melebar ke ~50%
┌───────────┬───────────┬───────────┬───────────┐
│ Citra     │ Sentra    │ Fatur     │ Sumber    │
│ Buah      │ Sembako   │ Frozen    │ Tani      │
│ (merah)   │ (kuning)  │ (biru)    │ (hijau)   │
│           │           │ Food      │ Makmur    │
│ foto kecil│ foto kecil│           │           │
└───────────┴───────────┴───────────┴───────────┘
   panel aktif melebar → tampil: kategori, status buka/tutup,
   alamat singkat, [Pesan WhatsApp] [Rute] [Lihat toko]
```

- Heading hub di atas rak: satu kalimat jelas, mis. "Empat toko, satu keluarga, di Samarinda." (sesuaikan setelah `GROUP_NAME` dan fakta pemilik tersedia).
- Interaksi: hover (desktop), tap untuk memperluas (mobile, pakai accordion semantik), navigasi keyboard dengan panah kiri/kanan, `aria-expanded` benar.
- Ini satu-satunya animasi besar di halaman. Sisanya tenang: tanpa fade-up di setiap section, tanpa hover-lift di setiap kartu.

### Sisa halaman hub (urutan)
1. Hero Rak Empat Cabang.
2. **Cari toko untuk kebutuhanmu**: input pencarian + chip ("buah", "sayur", "beras", "frozen", "bumbu"). Hasil menyorot cabang yang relevan dan menggulir ke produknya. Pencarian murni client-side dari `products`.
3. **Peta cabang**: 4 kartu lokasi berdampingan di daftar, plus tautan rute per cabang. Tidak perlu SDK peta berat; gunakan tautan Google Maps. Boleh iframe embed **lazy** per kartu hanya saat dibuka.
4. **Kenapa belanja di sini**: hanya klaim yang bisa dibuktikan dari foto/data nyata (mis. "Semua foto toko di situs ini diambil langsung di lokasi"). Jika belum ada fakta, bagian ini dihapus, bukan diisi basa-basi.
5. **Ulasan Google** (hanya jika tautan tersedia).
6. **FAQ** (shadcn Accordion): cara pesan lewat WhatsApp, apakah antar, metode bayar, jam buka. Jawaban yang belum diketahui pemilik ditulis "Hubungi toko" + tombol, bukan jawaban karangan.
7. Footer: 4 cabang (nama, alamat, telepon klik-langsung), nama grup, tahun.

### Halaman cabang `/[slug]` (template)
1. Header cabang: nama, kategori, **badge Buka/Tutup** (dihitung dari `hours` zona waktu `Asia/Makassar`/WITA; jika `hours === null` tampil "Jam belum diumumkan").
2. Galeri: carousel Embla dengan lightbox; urutan Cover → Exterior → Interior → Product. Alt text deskriptif.
3. **Katalog + Keranjang Pesan**: kartu produk (jika ada), tombol "Tambah ke daftar"; ikon keranjang membuka **Sheet** berisi daftar, jumlah (stepper), catatan, dan tombol **"Kirim ke WhatsApp"**. Pesan dibangkitkan rapi:
   ```
   Halo {Nama Toko}, saya mau pesan:
   - Jeruk Pontianak x2 kg
   - Apel Fuji x1 kg
   Catatan: {catatan}
   Diambil / diantar? {pilihan}
   ```
   dengan `encodeURIComponent`, link `https://wa.me/{whatsapp}?text=...`. Jika katalog kosong, ganti dengan tombol WA umum + teks "Tanya stok hari ini".
4. Lokasi & jam: alamat, tombol Rute, tabel jam (atau empty state), telepon klik-langsung.
5. Tentang toko: `description` (≤750 karakter, teks yang sama dengan GBP).
6. Lintas-cabang: kartu kecil 3 cabang lain ("Butuh yang lain? Lihat toko kami di Baqa / Pelita / Tenun").

### Elemen khusus mobile (prioritas utama)
- **Bottom action bar** menempel di halaman cabang: `Telepon · WhatsApp · Rute`, target sentuh ≥ 48px, aman terhadap `env(safe-area-inset-bottom)`.
- Navigasi atas ringkas: logo/grup di kiri, menu Sheet di kanan.
- Angka target performa: LCP < 2,5 dtk pada throttling "Slow 4G", total JS halaman cabang < 150 KB gzip, gambar hero < 200 KB.

---

## 5. SEO lokal dan konsistensi dengan Google Business Profile

- Metadata per halaman (`generateMetadata`): title `Nama Toko — Kategori di Samarinda`, description dari data, OG image per cabang.
- **JSON-LD** per cabang: `LocalBusiness` (atau subtipe yang pas: `GroceryStore`, `Store`) dengan `name`, `telephone`, `address` (PostalAddress), `geo`, `openingHoursSpecification` (hanya bila jam ada), `image`, `url`. Di hub: `Organization` + `ItemList` keempat cabang. Jangan menaruh `aggregateRating` kecuali berdasarkan data nyata.
- **NAP identik** dengan yang diinput di GBP: nama persis seperti plang, alamat dan telepon sama karakter per karakter. Satu sumber data memastikan itu.
- `sitemap.xml`, `robots.txt`, canonical, `lang="id"`, `hreflang` tidak perlu.
- Jangan keyword stuffing di `name`; boleh di deskripsi secara natural.

---

## 6. Aksesibilitas dan kualitas

- Responsif dari 320px. Fokus keyboard terlihat jelas (ring memakai warna brand dengan kontras cukup).
- `prefers-reduced-motion`: matikan animasi perluasan panel (ganti jadi perubahan instan).
- Semua tombol ikon punya `aria-label`; gambar punya alt bermakna; urutan heading benar (satu `h1` per halaman).
- Target sentuh ≥ 44px. Tidak ada informasi yang hanya disampaikan lewat warna (status buka/tutup pakai teks + ikon).
- Teks UI konsisten: aksi bernama sama di seluruh alur ("Tambah ke daftar" → toast "Ditambahkan ke daftar"). Error menjelaskan masalah dan solusinya, tanpa permintaan maaf basa-basi. Bahasa Indonesia sehari-hari, kalimat aktif, sentence case.
- Privasi: tidak ada pelacak pihak ketiga selain analytics ringan opsional (Plausible/Umami). Nomor telepon hanya yang bisnis, bukan nomor pribadi pemilik selain yang tercantum di data.

---

## 7. Struktur proyek

```
src/
  app/
    layout.tsx                 # font, metadata dasar, JSON-LD Organization
    page.tsx                   # Hub
    [slug]/page.tsx            # Template cabang (generateStaticParams)
    sitemap.ts  robots.ts
  components/
    ui/                        # shadcn
    hero/branch-rack.tsx       # hero 4 panel
    branch/{header,gallery,catalog,cart-sheet,hours,location,cross-links}.tsx
    shared/{action-bar,faq,site-header,site-footer,open-badge}.tsx
  data/{businesses.ts,faq.ts,site.ts}
  lib/{whatsapp.ts,hours.ts,jsonld.ts,format-phone.ts}
  stores/cart.ts               # zustand + persist
public/images/<slug>/...
tests/ (vitest + playwright)
```

---

## 8. Urutan pengerjaan (kerjakan berurutan, commit per fase)

1. **Fondasi**: init Next + Tailwind v4 + shadcn, font lokal, token warna, `businesses.ts` dengan data pasti, util `whatsapp.ts` dan `hours.ts` + unit test.
2. **Template cabang**: header, lokasi, jam (dengan empty state), bottom action bar. Sudah cukup untuk dipasang di GBP.
3. **Hub + hero Rak Empat Cabang**.
4. **Galeri, katalog, keranjang WhatsApp**.
5. **SEO**: metadata, JSON-LD, sitemap; validasi dengan Rich Results Test.
6. **Polish**: reduced motion, audit aksesibilitas, Lighthouse mobile ≥ 90 (Performance, Accessibility, SEO).
7. **Deploy** + checklist.

Sebelum menulis kode, jawab dulu dalam satu pesan singkat: (a) rencana desain 5–8 baris yang mengonfirmasi palet, font, dan hero di atas, (b) daftar `TODO(owner)` yang menghambat, (c) asumsi yang kamu ambil. Lalu langsung bangun tanpa menunggu, kecuali ada konflik data.

---

## 9. Kriteria selesai

- [ ] Empat halaman cabang + hub ter-build statis tanpa error TypeScript/ESLint.
- [ ] Mengubah satu nilai di `businesses.ts` (mis. telepon) otomatis memperbarui UI, link `tel:`, link WA, dan JSON-LD.
- [ ] `hours === null` dan `products = []` tidak menghasilkan UI rusak atau teks kosong.
- [ ] Tidak ada foto KTP/pemilik/plat kendaraan di `public/` maupun repo.
- [ ] Lighthouse mobile ≥ 90 untuk Performance, Accessibility, SEO pada hub dan satu halaman cabang.
- [ ] Alur Playwright lulus: buka hub → pilih cabang → tambah 2 item → tombol WhatsApp menghasilkan URL `wa.me` dengan pesan yang benar.
- [ ] README berisi: cara mengisi data, cara mengganti foto, cara deploy, dan daftar `TODO(owner)` yang tersisa.

---

## 10. Checklist untuk pemilik (di luar kode)

- Isi jam operasional keempat toko.
- Konfirmasi kode pos Baqa (75131 vs 75132).
- Foto interior dan produk (minimal 3 per toko), logo Sentra Sembako yang bersih, foto Fatur dengan plat diblur.
- Daftar produk unggulan + harga (opsional; tanpa harga pun katalog tetap jalan).
- Setelah deploy, masukkan URL `/slug` masing-masing ke field **Website** di Google Business Profile, lalu setelah Verified isi `googleReviewUrl`.