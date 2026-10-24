import { MessageCircle, Navigation, Phone } from "lucide-react";
import type { Business } from "@/data/types";
import { generalWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export function ActionBar({ business }: { business: Business }) {
  const actions = [
    {
      href: `tel:${business.phoneE164}`,
      label: "Telepon",
      icon: Phone,
      className: "border border-line bg-card text-ink",
      external: false,
    },
    {
      href: generalWhatsAppUrl(business.name, business.whatsapp),
      label: "WhatsApp",
      icon: MessageCircle,
      className: "bg-emerald-600 text-white hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-500",
      external: true,
    },
    {
      href: business.mapsUrl,
      label: "Rute",
      icon: Navigation,
      className: "border border-line bg-card text-ink",
      external: true,
    },
  ];

  return (
    <div
      data-brand={business.slug}
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-card/95 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden"
      aria-label="Aksi cepat"
    >
      <div className="mx-auto grid max-w-md grid-cols-3 gap-2 px-3 pt-3">
        {actions.map((action) => (
          <a
            key={action.label}
            href={action.href}
            target={action.external ? "_blank" : undefined}
            rel={action.external ? "noopener noreferrer" : undefined}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-1.5 rounded-full text-xs font-semibold",
              action.className,
            )}
          >
            <action.icon className="size-4" aria-hidden="true" />
            {action.label}
          </a>
        ))}
      </div>
    </div>
  );
}
