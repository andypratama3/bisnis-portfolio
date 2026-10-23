import { notFound } from "next/navigation";
import { businesses, getBusiness } from "@/data/businesses";
import { localBusinessJsonLd } from "@/lib/jsonld";
import { generateBranchMetadata } from "@/lib/branch-page";
import { JsonLd } from "@/components/json-ld";
import { BranchHero } from "@/components/branch-hero";
import { BranchGallery } from "@/components/branch-gallery";
import { BranchCatalog } from "@/components/branch-catalog";
import { BranchLocation } from "@/components/branch-location";
import { CrossLinks } from "@/components/cross-links";
import { ActionBar } from "@/components/action-bar";

export function generateStaticParams() {
  return businesses.map((business) => ({ slug: business.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) return {};
  return generateBranchMetadata(business);
}

export default async function BranchPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const business = getBusiness(slug);
  if (!business) notFound();

  return (
    <>
      <JsonLd data={localBusinessJsonLd(business)} />
      <BranchHero business={business} />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div>
          <BranchGallery photos={business.photos} name={business.name} />
          <BranchCatalog business={business} />
          <CrossLinks currentSlug={business.slug} />
        </div>
        <aside className="lg:sticky lg:top-20 lg:self-start">
          <BranchLocation business={business} />
        </aside>
      </div>
      <div className="pb-[calc(5rem+env(safe-area-inset-bottom))] lg:pb-10" />
      <ActionBar business={business} />
    </>
  );
}
