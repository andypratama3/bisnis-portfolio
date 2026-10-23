import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { businesses } from "@/data/businesses";
import { siteConfig, siteNav } from "@/data/site";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { CONTAINER_WIDTHS } from "@/lib/constants";
import { IconWrapper } from "@/components/shared/icon-wrapper";
import { LogoMark } from "@/components/logo-mark";
import { cn } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-card">
      <div
        className={cn(
          "mx-auto grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.1fr_1fr]",
          CONTAINER_WIDTHS.default,
        )}
      >
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark />
            <span className="font-display text-lg font-bold">{siteConfig.name}</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft text-pretty">
            Empat usaha warga Samarinda untuk kebutuhan buah, sembako, frozen food, dan sayur
            harian. Semua foto toko di situs ini berasal dari lokasi usaha.
          </p>
          <nav aria-label="Toko di footer" className="mt-5 flex flex-wrap gap-x-4 gap-y-2">
            {siteNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-ink-soft underline-offset-4 hover:text-ink hover:underline"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <ul className="grid gap-5 sm:grid-cols-2">
          {businesses.map((business) => (
            <li key={business.slug} className="text-sm">
              <Link href={`/${business.slug}`} className="font-semibold text-ink hover:underline">
                {business.name}
              </Link>
              <p className="mt-1.5 flex items-start gap-1.5 leading-relaxed text-ink-soft">
                <IconWrapper icon={MapPin} className="mt-0.5 shrink-0" />
                <span>
                  {business.address.street}, {business.address.kelurahan}
                </span>
              </p>
              <div className="mt-1.5 flex flex-wrap gap-3">
                <a
                  className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink"
                  href={`tel:${business.phoneE164}`}
                >
                  <IconWrapper icon={Phone} />
                  <span>Telepon</span>
                </a>
                <a
                  className="inline-flex items-center gap-1.5 text-ink-soft hover:text-ink"
                  href={generalWhatsAppUrl(business.name, business.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconWrapper icon={MessageCircle} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-line">
        <div
          className={cn(
            "mx-auto flex flex-col gap-2 px-4 py-5 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6",
            CONTAINER_WIDTHS.default,
          )}
        >
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Samarinda, Kalimantan Timur.
          </p>
          <p>Alamat dan nomor dapat berubah. Konfirmasi lewat WhatsApp.</p>
        </div>
      </div>
    </footer>
  );
}
