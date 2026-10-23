import { MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business, DayKey } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { OpenBadge } from "@/components/open-badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const dayLabels: Record<DayKey, string> = {
  monday: "Senin",
  tuesday: "Selasa",
  wednesday: "Rabu",
  thursday: "Kamis",
  friday: "Jumat",
  saturday: "Sabtu",
  sunday: "Minggu",
};

export function BranchLocation({ business }: { business: Business }) {
  return (
    <section aria-labelledby="location-title" className="rounded-panel border border-line bg-card p-5 panel-shadow">
      <div className="flex items-start justify-between gap-3">
        <h2 id="location-title" className="font-display text-xl font-bold">
          Lokasi & jam
        </h2>
        <OpenBadge hours={business.hours} />
      </div>

      <address className="mt-4 flex items-start gap-2 text-sm leading-relaxed text-ink-soft not-italic">
        <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
        <span>
          {business.address.street}
          <br />
          Kel. {business.address.kelurahan}, Kec. {business.address.kecamatan}
          <br />
          {business.address.city}, {business.address.province}
        </span>
      </address>

      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Titik peta masih perkiraan. Konfirmasi lokasi lewat WhatsApp sebelum berangkat.
      </p>

      <Separator className="my-4" />

      {business.hours ? (
        <div>
          <p className="text-sm font-semibold">Jam buka</p>
          <dl className="mt-2 space-y-1 text-sm">
            {(Object.keys(dayLabels) as DayKey[]).map((day) => {
              const value = business.hours?.[day];
              return (
                <div key={day} className="flex justify-between gap-3">
                  <dt className="text-ink-soft">{dayLabels[day]}</dt>
                  <dd className="font-medium tabular-nums">
                    {value ? `${value.opens}–${value.closes}` : "Tutup"}
                  </dd>
                </div>
              );
            })}
          </dl>
        </div>
      ) : (
        <div>
          <p className="text-sm font-semibold">Jam buka belum diumumkan</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            Hubungi toko lewat WhatsApp sebelum berkunjung agar tidak menunggu.
          </p>
        </div>
      )}

      <div className="mt-4 flex flex-col gap-2">
        <Button asChild>
          <a
            href={generalWhatsAppUrl(business.name, business.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            WhatsApp {business.name}
          </a>
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button asChild variant="outline">
            <a href={business.mapsUrl} target="_blank" rel="noopener noreferrer">
              <Navigation className="size-4" aria-hidden="true" />
              Rute
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={`tel:${business.phoneE164}`}>
              <Phone className="size-4" aria-hidden="true" />
              Telepon
            </a>
          </Button>
        </div>
      </div>

      <p className="mt-3 text-center text-xs text-ink-soft tabular-nums">
        {business.phoneDisplay}
      </p>
    </section>
  );
}
