import { businesses } from "@/data/businesses";
import { organizationJsonLd, itemListJsonLd } from "@/lib/jsonld";
import { JsonLd } from "@/components/json-ld";
import { BranchRack } from "@/components/branch-rack";
import { BranchSearch } from "@/components/branch-search";
import { MapSection } from "@/components/map-section";
import { WhySection } from "@/components/why-section";
import { FaqSection } from "@/components/faq-section";

export default function HomePage() {
  const ordered = [...businesses].sort((a, b) => a.order - b.order);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={itemListJsonLd(ordered)} />
      <BranchRack branches={ordered} />
      <BranchSearch branches={ordered} />
      <MapSection branches={ordered} />
      <WhySection />
      <FaqSection />
    </>
  );
}
