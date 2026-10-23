# TODO — Apply Google Business Profile (1 per 1)

Target: 4 profil bisnis, satu email Google, diajukan bertahap agar tidak memicu pembatasan akun baru.
Link: https://business.google.com/create

---

## FASE 0 — Persiapan (lakukan sekali)

- [ ] Buat/pakai **1 Google Account khusus bisnis** (jangan akun pribadi), aktifkan 2FA.
- [ ] Pastikan nomor HP pemilik aktif untuk terima kode verifikasi.
- [ ] Siapkan folder upload per bisnis (logo, cover, eksterior, interior, produk).
- [ ] Konfirmasi **kode pos** (lihat tabel) dan **share location** persis dari pemilik.
- [ ] Tulis deskripsi bisnis ≤750 karakter per usaha.
- [ ] Siapkan video verifikasi (lihat panduan di bawah).
- [ ] Jangan upload KTP ke Google; simpan hanya untuk arsip internal.
- [ ] Jangan tempel logo digital ke foto ruko; foto lokasi harus asli.

### Perbaikan file sebelum submit

- [ ] Sentra Sembako: export ulang logo bersih (sekarang screenshot aplikasi desain).
- [ ] Fatur Frozen Food: blur plat "KT 3750 B" di `fatur-frozen-food-eksterior-3.jpeg`.
- [ ] Sumber Tani Makmur: tambah minimal 1 foto eksterior (sekarang 2).
- [ ] Tambah foto interior + produk untuk semua bisnis (opsional tapi disarankan).

### Data referensi

| Bisnis             | Alamat (GBP)                                      | Kode Pos | Koordinat (estimasi)  |
| ------------------ | ------------------------------------------------- | -------- | --------------------- |
| Citra Buah         | Jl. Pada Elo RT.03, Baqa, Samarinda Seberang      | 75131*   | -0.506935, 117.140205 |
| Sentra Sembako     | Jl. Gatot Subroto RT.43, Pelita, Samarinda Ilir   | 75117    | -0.489936, 117.153346 |
| Fatur Frozen Food  | Jl. P. Bendahara RT.05, Tenun, Samarinda Seberang | 75133    | -0.511662, 117.148452 |
| Sumber Tani Makmur | Jl. Bung Tomo RT.07, Baqa, Samarinda Seberang     | 75131*   | -0.509191, 117.138854 |

\* Situs Kelurahan Baqa menulis 75132 — konfirmasi ke kelurahan/pemilik sebelum submit.

### Peta folder → kategori upload GBP

| Kategori di GBP        | Folder lokal   | File                                             |
| ---------------------- | -------------- | ------------------------------------------------ |
| **Logo**               | `foto-logo/`   | `<bisnis>-logo.jpeg`                             |
| **Cover**              | `foto-lokasi/` | `<bisnis>-eksterior-1.jpeg`                      |
| **Exterior**           | `foto-lokasi/` | `<bisnis>-eksterior-2.jpeg` dst.                 |
| **Interior**           | belum ada      | tambah foto rak/stok dalam                       |
| **Product**            | `foto-produk/` | `produk-01.jpg` – `produk-05.jpg` (masih 0 byte) |
| **At work** (opsional) | belum ada      | foto pemilik/staf packing                        |

**Jangan upload ke GBP:**

- `foto-legal/foto-ktp.jpg` dan `foto-legal/foto-pemilik.jpg` → arsip internal saja.
- Semua `foto-produk/*.jpg` yang masih 0 byte → akan gagal.
- `02-sentra-sembako/foto-logo/sentra-sembako-logo.jpeg` → masih screenshot.

**Di step mana uploadnya:**

1. Saat onboarding, setelah isi jam & deskripsi, muncul step **"Tambahkan foto"** → upload **Logo** dan **Cover**.
2. Jika step foto dilewati/ditutup, buka dashboard profil → menu **Foto** → tambah per kategori **Logo / Cover / Exterior / Interior / Product**.
3. Cover dipilih dari salah satu foto eksterior terbaik; logo tetap diunggah terpisah (jangan overlay).

---

## URUTAN APPLY (dari paling siap)

### 1) Citra Buah — paling siap

- [ ] Buka business.google.com/create → pilih "Add your business"
- [ ] Nama: `Citra Buah` (persis seperti plang)
- [ ] Kategori utama: **Toko Buah** (cek dropdown; alternatif: Toko Buah dan Sayur)
- [ ] "Customers can visit this location" → **Ya** (storefront)
- [ ] Alamat: Jl. Pada Elo RT.03, Samarinda; provinsi Kalimantan Timur; kode pos 75131
- [ ] Geser pin ke titik ruko sebenarnya (jangan biarkan pin otomatis di tengah jalan)
- [ ] Telepon: +62 813-4688-0168
- [ ] Jam operasional: isi (belum ada data — tanya pemilik)
- [ ] Deskripsi ≤750 karakter
- [ ] Foto: Logo `03-citra-buah/foto-logo/citra-buah-logo.jpeg` (kategori **Logo**)
- [ ] Cover: `03-citra-buah/foto-lokasi/citra-buah-eksterior-1.jpeg` (kategori **Cover**)
- [ ] Exterior: `citra-buah-eksterior-1.jpeg`, `-2.jpeg`, `-3.jpeg` (kategori **Exterior**)
- [ ] Interior: belum ada — foto rak buah bagian dalam
- [ ] Product: belum ada — foto buah terdekat, minimal 3
- [ ] Jangan upload: `foto-legal/*`, `foto-produk/*` (masih 0 byte)
- [ ] Minta verifikasi → pilih video jika tersedia
- [ ] Cek status di Business Profile Manager sampai **Verified**

### 2) Fatur Frozen Food

- [ ] Blur plat kendaraan dulu
- [ ] Nama: `Fatur Frozen Food`
- [ ] Kategori utama: **Toko Makanan Beku** (alternatif: Toko Daging)
- [ ] Alamat: Jl. P. Bendahara RT.05, Tenun; kode pos 75133
- [ ] Pin: -0.511662, 117.148452 → geser ke ruko
- [ ] Telepon: +62 851-1710-8612
- [ ] Jam operasional + deskripsi
- [ ] Foto: Logo `04-fatur-frozen-food/foto-logo/fatur-frozen-food-logo.jpeg` (kategori **Logo**)
- [ ] Cover: `04-fatur-frozen-food/foto-lokasi/fatur-frozen-food-eksterior-1.jpeg` (kategori **Cover**)
- [ ] Exterior: `fatur-frozen-food-eksterior-1.jpeg`, `-2.jpeg`, `-4.jpeg`; `-3.jpeg` **setelah plat diblur**
- [ ] Interior: belum ada — foto freezer/rak produk
- [ ] Product: belum ada — foto daging/sayur frozen, minimal 3
- [ ] Jangan upload: `foto-legal/*`, `foto-produk/*` (masih 0 byte)
- [ ] Verifikasi → cek status

### 3) Sentra Sembako

- [ ] Export ulang logo (jangan screenshot) → minimal 720×720
- [ ] Nama: `Sentra Sembako`
- [ ] Kategori utama: **Toko Kelontong** (alternatif: Toko Sembako)
- [ ] Alamat: Jl. Gatot Subroto RT.43, Pelita; kode pos 75117
- [ ] Pin: -0.489936, 117.153346 → geser ke ruko
- [ ] Telepon: +62 822-5433-8455
- [ ] Jam operasional + deskripsi
- [ ] Foto: Logo **belum bisa** — export ulang; JANGAN pakai `02-sentra-sembako/foto-logo/sentra-sembako-logo.jpeg` (screenshot)
- [ ] Cover: `02-sentra-sembako/foto-lokasi/sentra-sembako-eksterior-1.jpeg` (kategori **Cover**)
- [ ] Exterior: `sentra-sembako-eksterior-1.jpeg`, `-2.jpeg`, `-3.jpeg` (kategori **Exterior**)
- [ ] Interior: belum ada — foto rak sembako
- [ ] Product: belum ada — foto sembako/bumbu sasetan, minimal 3
- [ ] Jangan upload: `foto-legal/*`, `foto-produk/*` (masih 0 byte), logo screenshot
- [ ] Verifikasi → cek status

### 4) Sumber Tani Makmur

- [ ] Tambah 1 foto eksterior (total min. 3)
- [ ] Nama: `Sumber Tani Makmur`
- [ ] Kategori utama: **Toko Buah dan Sayur** (alternatif: Toko Sayur)
- [ ] Alamat: Jl. Bung Tomo RT.07, Baqa; kode pos 75131
- [ ] Pin: -0.509191, 117.138854 → geser ke ruko
- [ ] Telepon: +62 898-0256-129
- [ ] Jam operasional + deskripsi
- [ ] Foto: Logo `01-sumber-tani-makmur/foto-logo/sumber-tani-makmur-logo.jpeg` (kategori **Logo**)
- [ ] Cover: `01-sumber-tani-makmur/foto-lokasi/sumber-tani-makmur-eksterior-1.jpeg` (kategori **Cover**)
- [ ] Exterior: `sumber-tani-makmur-eksterior-1.jpeg`, `-2.jpeg` (tambah 1 lagi)
- [ ] Interior: belum ada — foto rak sayur/bumbu
- [ ] Product: belum ada — foto sayur & bumbu, minimal 3
- [ ] Jangan upload: `foto-legal/*`, `foto-produk/*` (masih 0 byte)
- [ ] Verifikasi → cek status

---

## PANDUAN VIDEO VERIFIKASI

Satu take, tanpa edit, durasi ±2–5 menit, cahaya cukup:

- [ ] Mulai dari jalan: tunjukkan nama jalan/patokan dan plang toko terbaca.
- [ ] Sorot nama usaha di plang (harus sama dengan nama GBP).
- [ ] Jalan ke pintu masuk, buka pintu.
- [ ] Pan dalam ruangan: rak, stok, freezer/meja packing.
- [ ] Tunjukkan aktivitas/alat khas usaha (timbangan, freezer, karung, rak buah).
- [ ] Tunjukkan Anda punya akses (buka gudang/lemari stok).
- [ ] Jika diminta: tunjukkan dokumen usaha (NIB/izin), bukan KTP publik.
- [ ] Jangan rekam wajah orang lain tanpa izin; jangan menampilkan dokumen pribadi.

---

## SETELAH SUBMIT

- [ ] Cek status per profil di https://business.google.com
- [ ] Jika diminta verifikasi pos/telepon/email, selesaikan maksimal 5–14 hari
- [ ] Jangan edit besar-besaran selama review
- [ ] **Jangan buat listing duplikat** untuk bisnis yang sama
- [ ] Setelah live: tambah jam, produk, posting, dan minta ulasan pelanggan

---

## ATURAN PENTING

- Satu email Google **bisa** mengelola 4 bisnis; tiap bisnis tetap profil terpisah.
- Nama bisnis harus sama dengan plang—jangan tambah kata kunci ("Toko Sayur", "Termurah", dll).
- Alamat & telepon tiap bisnis harus unik (data Anda sudah unik).
- Foto harus asli; jangan stok foto, jangan overlay logo, jangan edit suasana.
- Jangan submit 4 bisnis serentak dari akun baru; beri jeda ±24–48 jam per pengajuan.
- Simpan bukti: screenshot status, email verifikasi, dan tanggal submit tiap bisnis.

---

## PROGRESS

| Bisnis             | Submit | Verified | Live | Tanggal |
| ------------------ | ------ | -------- | ---- | ------- |
| Citra Buah         | ⬜     | ⬜       | ⬜   |         |
| Fatur Frozen Food  | ⬜     | ⬜       | ⬜   |         |
| Sentra Sembako     | ⬜     | ⬜       | ⬜   |         |
| Sumber Tani Makmur | ⬜     | ⬜       | ⬜   |         |
