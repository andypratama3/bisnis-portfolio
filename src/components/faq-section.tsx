import { faqItems } from "@/data/faq";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section aria-labelledby="faq-title" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <h2 id="faq-title" className="font-display text-2xl font-bold text-balance sm:text-3xl">
            Pertanyaan yang sering muncul
          </h2>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-soft text-pretty">
            Informasi yang belum tersedia akan diperbarui setelah dikonfirmasi pemilik toko.
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-card border border-line bg-card px-5">
          {faqItems.map((item, index) => (
            <AccordionItem
              key={item.question}
              value={`item-${index}`}
              className="border-b border-line last:border-b-0"
            >
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
