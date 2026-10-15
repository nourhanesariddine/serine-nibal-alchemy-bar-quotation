"use client";

import type { Proposal } from "@/data/proposal";
import { computeTotal, formatMoney } from "@/lib/pricing";
import { useSelection } from "./selection";

export function StickyTotal({ p }: { p: Proposal }) {
  const { selected } = useSelection();
  const { total, lines } = computeTotal(p, selected);

  return (
    <a
      href="#build"
      className="no-print fixed bottom-3 right-3 z-40 flex items-center gap-3 rounded-full border border-gold-bright/50 bg-paper/95 py-2.5 pl-5 pr-5 shadow-[0_15px_40px_-12px_rgba(90,70,30,0.45)] backdrop-blur md:bottom-6 md:right-6"
    >
      <span className="text-[0.62rem] font-bold uppercase leading-tight tracking-[0.18em] text-gold">
        Bar tab
        <span className="block font-semibold normal-case tracking-normal text-muted">
          {lines.length} add-on{lines.length === 1 ? "" : "s"}
        </span>
      </span>
      <span key={total} className="pop font-display text-2xl font-semibold tabular-nums text-ink">
        {formatMoney(total)}
      </span>
    </a>
  );
}
