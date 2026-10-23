"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Photo } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";

export function BranchGallery({ photos, name }: { photos: Photo[]; name: string }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: photos.length > 1 });
  const [selected, setSelected] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const activePhoto = lightbox !== null ? photos[lightbox] : null;

  if (photos.length === 0) {
    return (
      <div className="flex aspect-[4/3] items-center justify-center rounded-panel border border-dashed border-line bg-paper-strong p-6 text-center">
        <p className="max-w-xs text-sm text-ink-soft">
          Foto lokasi belum tersedia. Hubungi {name} lewat WhatsApp untuk informasi terbaru.
        </p>
      </div>
    );
  }

  return (
    <section aria-labelledby="gallery-title">
      <div className="flex items-center justify-between gap-3">
        <h2 id="gallery-title" className="font-display text-2xl font-bold">
          Foto lokasi
        </h2>
        <span className="text-xs font-semibold text-ink-soft tabular-nums">
          {selected + 1} / {photos.length}
        </span>
      </div>

      <div className="relative mt-4">
        <div
          ref={emblaRef}
          className="overflow-hidden rounded-panel border border-line bg-paper-strong"
          aria-roledescription="carousel"
          aria-label={`Foto lokasi ${name}`}
        >
          <div className="flex">
            {photos.map((photo, index) => (
              <div key={photo.src} className="min-w-0 flex-[0_0_100%]">
                <button
                  type="button"
                  onClick={() => setLightbox(index)}
                  className="group relative block aspect-[4/5] w-full sm:aspect-[4/3]"
                  aria-label={`Buka foto: ${photo.alt}`}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(min-width: 1024px) 720px, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute right-3 bottom-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white">
                    Perbesar
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {photos.length > 1 && (
          <div className="absolute inset-x-3 top-1/2 flex -translate-y-1/2 justify-between">
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={scrollPrev}
              aria-label="Foto sebelumnya"
              className="bg-card/90"
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              size="icon"
              variant="outline"
              onClick={scrollNext}
              aria-label="Foto berikutnya"
              className="bg-card/90"
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>

      <Dialog
        open={lightbox !== null}
        onOpenChange={(open) => {
          if (!open) setLightbox(null);
        }}
      >
        <DialogContent>
          <DialogTitle className="sr-only">Foto {name}</DialogTitle>
          <DialogDescription className="sr-only">{activePhoto?.alt}</DialogDescription>
          {activePhoto && (
            <Image
              src={activePhoto.src}
              alt={activePhoto.alt}
              width={activePhoto.width}
              height={activePhoto.height}
              sizes="90vw"
              className="mx-auto max-h-[82dvh] w-auto rounded-xl object-contain"
            />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
