import { Camera, MapPin, MessageCircle } from "lucide-react";
import { SPACING } from "@/lib/constants";
import { SectionContainer } from "@/components/shared/section-container";
import { IconWrapper } from "@/components/shared/icon-wrapper";

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
    <SectionContainer aria-labelledby="why-title" className={SPACING.sectionTop}>
      <div className="text-center">
        <h2
          id="why-title"
          className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Kenapa lewat halaman ini
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Informasi akurat langsung dari lokasi, tanpa perantara atau data palsu.
        </p>
      </div>
      <ul className="mt-12 grid gap-6 md:grid-cols-3 lg:gap-8">
        {reasons.map((reason, index) => (
          <li
            key={reason.title}
            className="group relative overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-card to-paper p-8 transition-all duration-300 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <div className="relative">
              <div className="inline-flex rounded-2xl bg-brand-soft p-4 shadow-sm">
                <IconWrapper icon={reason.icon} size="xl" className="text-brand-ink" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold sm:text-2xl">{reason.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft text-pretty sm:text-base">
                {reason.body}
              </p>
            </div>
            <div className="pointer-events-none absolute -right-8 -bottom-8 size-32 rounded-full bg-brand/5 blur-2xl transition-all duration-300 group-hover:bg-brand/10" />
          </li>
        ))}
      </ul>
    </SectionContainer>
  );
}
