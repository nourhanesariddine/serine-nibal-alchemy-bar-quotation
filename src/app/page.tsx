import { proposal } from "@/data/proposal";
import { CoupleSection } from "@/components/proposal/couple";
import { TouchesSection } from "@/components/proposal/touches";
import { BuildYourBar } from "@/components/proposal/build-your-bar";
import { EventsSection } from "@/components/proposal/events";
import { Footer } from "@/components/proposal/footer";
import { Hero } from "@/components/proposal/hero";
import { Nav } from "@/components/proposal/nav";
import { PackageSection } from "@/components/proposal/package";
import { PricingSection } from "@/components/proposal/pricing";
import { SelectionProvider } from "@/components/proposal/selection";
import { StickyTotal } from "@/components/proposal/sticky-total";
import { TermsSection } from "@/components/proposal/terms";

export default function ProposalPage() {
  const p = proposal;
  return (
    <SelectionProvider initial={p.addOns.filter((a) => a.preselected).map((a) => a.id)}>
      <Nav />
      <main className="mx-auto max-w-5xl space-y-14 px-4 md:space-y-20">
        <Hero p={p} />
        <PackageSection p={p} />
        <PricingSection p={p} />
        <TouchesSection p={p} />
        <BuildYourBar p={p} />
        <EventsSection p={p} />
        <TermsSection p={p} />
        <CoupleSection p={p} index="07" />
        <Footer p={p} />
      </main>
      <StickyTotal p={p} />
    </SelectionProvider>
  );
}
