import type { Proposal } from "@/data/proposal";
import { basePrice, formatMoney, guestRangeLabel } from "@/lib/pricing";
import { SectionHeading } from "./ui";

const numerals = ["I", "II", "III", "IV"];

/**
 * "One package, one price" — explains that the package is priced for the evening
 * as a whole, and holds across the agreed guest range.
 */
export function PricingSection({ p }: { p: Proposal }) {
  const { min, max } = p.event.guestRange;
  return (
    <section id="pricing">
      <SectionHeading
        index="02"
        eyebrow={p.pricing.eyebrow}
        title={
          <>
            One package, <em className="text-gold">one price</em>
          </>
        }
        lead={p.pricing.tagline}
      />

      <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-line bg-paper shadow-[0_20px_60px_-40px_rgba(90,70,30,0.5)]">
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          {/* Editorial copy */}
          <div className="px-6 py-8 md:px-10 md:py-10">
            <p className="font-display text-2xl italic leading-snug text-ink md:text-[1.7rem]">
              Priced for the evening, <span className="text-gold">not per head.</span>
            </p>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-ink/80 md:text-[0.95rem]">
              {p.pricing.body.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>

            {/* The price, stated once, plainly */}
            <div className="mt-7 flex flex-wrap items-end justify-between gap-x-6 gap-y-3 border-t border-dashed border-gold-bright/50 pt-5">
              <div>
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-gold">{p.packageName}</p>
                <p className="mt-1 text-xs text-muted">The same price for {min} to {max} guests</p>
              </div>
              <p className="font-display text-4xl font-semibold tabular-nums leading-none text-ink">
                {formatMoney(basePrice(p))}
              </p>
            </div>
          </div>

          {/* What the price is built around */}
          <div className="border-t border-line bg-cream/70 px-6 py-8 md:border-l md:border-t-0 md:px-9 md:py-10">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-gold">What your package is built around</p>
            <ol className="mt-5 space-y-5">
              {p.pricing.foundations.map((f, i) => (
                <li key={f.title} className="flex gap-4">
                  <span className="w-7 shrink-0 pt-0.5 font-display text-2xl italic leading-none text-gold-bright">
                    {numerals[i]}
                  </span>
                  <div>
                    <p className="font-display text-xl leading-tight text-ink">{f.title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{f.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-gold-bright/30 pt-4 text-xs leading-relaxed text-muted">
              These are the same for {guestRangeLabel(p)} — which is why the price is, too.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
