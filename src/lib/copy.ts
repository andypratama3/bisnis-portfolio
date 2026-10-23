/**
 * Centralized copy/microcopy for consistent CTA and messaging
 * SEO-optimized, conversion-focused, natural Indonesian language
 */

// Call-to-Action buttons
export const CTA = {
  // Primary actions
  whatsapp: {
    primary: "Pesan via WhatsApp",
    secondary: "Chat WhatsApp",
    withName: (name: string) => `WhatsApp ${name}`,
    inquiry: "Tanya Stok & Harga",
  },
  phone: {
    primary: "Telepon Sekarang",
    secondary: "Hubungi via Telepon",
    short: "Telepon",
  },
  maps: {
    primary: "Lihat Rute di Google Maps",
    secondary: "Petunjuk Arah",
    short: "Rute",
  },
  // Secondary actions
  viewStore: "Lihat Detail Toko",
  addToCart: "Tambah ke Keranjang",
  sendOrder: "Kirim Pesanan",
  viewAll: "Lihat Semua Toko",
  exploreStores: "Jelajahi Toko",
} as const;

// Section headings (SEO-optimized)
export const HEADINGS = {
  hero: {
    main: "Empat Toko Terpercaya di Samarinda",
    sub: "Buah segar, sembako lengkap, frozen food, dan sayuran pilihan",
  },
  locations: {
    main: "Lokasi & Kontak Keempat Toko",
    sub: "Alamat lengkap dengan petunjuk arah Google Maps",
  },
  why: {
    main: "Kenapa Belanja di Toko Kami",
    sub: "Foto asli lokasi, alamat jelas, dan kontak langsung",
  },
  faq: {
    main: "Pertanyaan yang Sering Diajukan",
    sub: "Informasi lengkap cara pesan dan metode pembayaran",
  },
  search: {
    main: "Cari Toko Sesuai Kebutuhan Anda",
    sub: "Temukan toko berdasarkan produk yang Anda cari",
    placeholder: "Cari buah, sayur, sembako, frozen food...",
  },
  catalog: {
    main: "Katalog Produk",
    sub: "Tambahkan ke daftar belanja, lalu pesan via WhatsApp",
  },
  hours: {
    main: "Lokasi & Jam Operasional",
    sub: "Pastikan toko buka sebelum berkunjung",
  },
} as const;

// Descriptive text (informative, helpful)
export const COPY = {
  // Empty states
  noProducts:
    "Katalog produk sedang dipersiapkan. Hubungi kami via WhatsApp untuk menanyakan ketersediaan stok dan harga terbaru.",
  noPhotos:
    "Foto lokasi akan segera ditambahkan. Silakan hubungi kami via WhatsApp untuk konfirmasi alamat sebelum berkunjung.",
  emptyCart:
    "Keranjang belanja Anda masih kosong. Jelajahi katalog produk kami dan tambahkan yang Anda butuhkan.",
  noHours:
    "Jam operasional akan diperbarui segera. Untuk memastikan toko buka, hubungi kami via WhatsApp sebelum berkunjung.",

  // Disclaimers & notices
  locationDisclaimer:
    "Titik koordinat peta masih estimasi level jalan. Untuk alamat tepat, konfirmasi via WhatsApp sebelum berangkat.",
  priceDisclaimer: "Harga dapat berubah sewaktu-waktu. Konfirmasi harga terkini via WhatsApp.",
  deliveryNotice:
    "Layanan antar tersedia untuk area tertentu. Tanyakan ongkos kirim dan ketersediaan via WhatsApp.",

  // Instructions
  orderInstructions: {
    step1: "Tambahkan produk yang Anda inginkan ke keranjang belanja",
    step2: "Tambahkan catatan khusus jika diperlukan (misal: buah yang matang)",
    step3: "Klik tombol 'Kirim Pesanan' untuk membuka WhatsApp",
    step4: "Konfirmasi pesanan dengan pemilik toko via chat WhatsApp",
  },

  // Social proof / trust signals
  photoAuthenticity:
    "Semua foto toko di website ini adalah foto asli lokasi usaha, bukan foto stok atau ilustrasi.",
  directContact: "Nomor WhatsApp dan telepon terhubung langsung ke pemilik toko tanpa perantara.",
  mapsIntegration: "Tautan rute terintegrasi dengan Google Maps untuk petunjuk arah yang akurat.",

  // Footer
  copyright: (year: number) =>
    `© ${year} Empat Toko Samarinda. Usaha lokal warga Samarinda, Kalimantan Timur.`,
  footerNotice:
    "Alamat dan nomor kontak dapat berubah. Untuk informasi terbaru, hubungi toko via WhatsApp.",
} as const;

// SEO meta descriptions (140-160 chars optimal)
export const META = {
  home: "Toko buah, sembako, frozen food, dan sayuran terpercaya di Samarinda. Lokasi jelas, foto asli, pesan langsung via WhatsApp.",
  notFound:
    "Halaman tidak ditemukan. Kembali ke beranda untuk melihat 4 toko kami di Samarinda: Citra Buah, Sentra Sembako, Fatur Frozen Food, dan Sumber Tani Makmur.",
} as const;

// Accessibility labels
export const A11Y = {
  skipToContent: "Lewati navigasi, langsung ke konten utama",
  openMenu: "Buka menu navigasi",
  closeMenu: "Tutup menu",
  openCart: "Buka keranjang belanja",
  increaseQuantity: (item: string) => `Tambah jumlah ${item}`,
  decreaseQuantity: (item: string) => `Kurangi jumlah ${item}`,
  removeItem: (item: string) => `Hapus ${item} dari keranjang`,
  previousImage: "Foto sebelumnya",
  nextImage: "Foto berikutnya",
  enlargeImage: "Perbesar foto",
} as const;
