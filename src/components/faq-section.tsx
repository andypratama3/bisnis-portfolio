import { faqItems } from "@/data/faq";
import { SPACING } from "@/lib/constants";
import { SectionContainer } from "@/components/shared/section-container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <SectionContainer aria-labelledby="faq-title" className={SPACING.sectionTop}>
      <div className="text-center">
        <h2
          id="faq-title"
          className="font-display text-3xl font-bold text-balance sm:text-4xl lg:text-5xl"
        >
          Pertanyaan yang sering muncul
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
          Informasi yang belum tersedia akan diperbarui setelah dikonfirmasi pemilik toko.
        </p>
      </div>

      <div className="relative mx-auto mt-12 max-w-3xl">
        {/* Decorative background blobs for organic feel */}
        <div className="pointer-events-none absolute -left-32 top-0 size-64 rounded-full bg-brand-soft/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 bottom-0 size-64 rounded-full bg-brand-soft/30 blur-3xl" />

        <Accordion type="single" collapsible className="relative space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="overflow-hidden rounded-2xl border border-line bg-gradient-to-br from-card to-paper shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-brand/5"
            >
              <AccordionTrigger className="px-6 py-5 text-left text-base font-semibold hover:text-brand sm:text-lg [&[data-state=open]]:text-brand">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6 text-sm leading-relaxed text-ink-soft sm:text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </SectionContainer>
  );
}
