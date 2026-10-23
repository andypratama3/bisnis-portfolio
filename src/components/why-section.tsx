import { Camera, MapPin, MessageCircle } from "lucide-react";

const reasons = [
  {
    icon: Camera,
    title: "Foto dari lokasi",
    body: "Semua foto toko di situs ini berasal dari lokasi usaha, bukan foto stok.",
  },
  {
    icon: MapPin,
    title: "Alamat dan rute jelas",
    body: "Setiap toko punya alamat lengkap dan tautan rute langsung ke Google Maps.",
  },
  {
    icon: MessageCircle,
    title: "Langsung ke WhatsApp",
    body: "Nomor toko bisa dihubungi tanpa perantara untuk menanyakan stok atau pesanan.",
  },
];

export function WhySection() {
  return (
    <section aria-labelledby="why-title" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <h2 id="why-title" className="font-display text-2xl font-bold text-balance sm:text-3xl">
        Kenapa lewat halaman ini
      </h2>
      <ul className="mt-5 grid gap-4 md:grid-cols-3">
        {reasons.map((reason) => (
          <li key={reason.title} className="rounded-card border border-line bg-card p-5">
            <reason.icon className="size-6 text-brand-ink" aria-hidden="true" />
            <h3 className="mt-3 font-display text-lg font-bold">{reason.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft text-pretty">{reason.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
