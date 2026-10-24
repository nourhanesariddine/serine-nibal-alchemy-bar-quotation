import type { Proposal } from "@/data/proposal";
import { basePrice, formatMoney } from "@/lib/pricing";
import { SectionHeading } from "./ui";

export function PackageSection({ p }: { p: Proposal }) {
  return (
    <section id="package">
      <SectionHeading
        index="01"
        eyebrow="Premium package"
        title={
          <>
            The <em className="text-gold">bar menu</em>
          </>
        }
        lead="Everything below is poured all evening and included in your base price, apart from anything marked as extra."
      />

      <div className="mx-auto max-w-2xl rounded-2xl border border-line bg-paper p-5 shadow-[0_20px_60px_-40px_rgba(90,70,30,0.5)] md:p-10">
        <p className="text-center font-display text-sm uppercase tracking-[0.35em] text-muted">
          Spirits & shots
        </p>
        <ul className="mt-6 space-y-5">
          {p.packageItems.map((item) => {
            const extra = item.tag?.kind === "extra";
            const highlighted = extra || item.tag?.kind === "fee";
            return (
              <li key={item.category} className={highlighted ? "-mx-2 rounded-xl border border-dashed border-gold-bright/60 bg-cream/60 px-3 py-3 sm:mx-0 sm:px-4" : ""}>
                <div className="flex items-baseline gap-3">
                  <span className="whitespace-nowrap font-display text-[1.35rem] text-ink sm:text-2xl md:text-[1.7rem]">{item.category}</span>
                  <span className="leader" />
                  <span className="max-w-[55%] text-right text-[0.82rem] font-semibold leading-snug text-ink sm:max-w-none sm:text-sm md:text-base">{item.selection}</span>
                </div>
                {item.tag && (
                  <div className="mt-1.5 flex items-center justify-end gap-2">
                    {item.note && <span className="text-xs text-muted">{item.note}</span>}
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
                        highlighted ? "bg-gold-bright text-white" : "bg-sage/15 text-sage"
                      }`}
                    >
                      {item.tag.label}
                    </span>
                    {extra && (
                      <a href="#build" className="no-print text-xs font-semibold text-gold hover:underline">
                        Add ↓
                      </a>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <div className="mt-8 flex flex-col items-center justify-between gap-2 rounded-xl bg-cream px-5 py-4 text-center sm:flex-row sm:text-left">
          <span className="text-sm text-muted">
            {p.packageName} · {p.event.guests} guests
          </span>
          <span className="font-display text-3xl font-semibold text-ink">{formatMoney(basePrice(p))}</span>
        </div>
      </div>
    </section>
  );
}
