import type { Proposal } from "@/data/proposal";
import { PdfButton } from "./pdf-button";
import { formatDate, validUntil } from "@/lib/pricing";
import { Ornament, Wordmark } from "./ui";

export function Footer({ p }: { p: Proposal }) {
  return (
    <footer className="pb-28 pt-6 text-center md:pb-10">
      <PdfButton p={p} />
      <Ornament className="mx-auto mt-10" />
      <Wordmark className="mt-6 text-2xl" />
      <p className="mt-3 text-[0.62rem] font-semibold uppercase tracking-[0.4em] text-muted">
        Bar · Events · Experiences
      </p>
      <p className="mx-auto mt-4 max-w-sm text-xs text-muted/80">
        This quotation is prepared exclusively for its recipient and is valid until {formatDate(validUntil(p))}. All prices in {p.currency}.
      </p>
    </footer>
  );
}
