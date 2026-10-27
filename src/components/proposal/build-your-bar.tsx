"use client";

import type { Proposal } from "@/data/proposal";
import { addOnPrice, computeTotal, formatMoney, guestRangeLabel } from "@/lib/pricing";
import { addOnIcons } from "./icons";
import { useSelection } from "./selection";
import { SectionHeading } from "./ui";

export function BuildYourBar({ p }: { p: Proposal }) {
  const { selected, toggle } = useSelection();
  const { base, lines, total, max } = computeTotal(p, selected);

  return (
    <section id="build">
      <SectionHeading
        index="04"
        eyebrow="Optional add-ons & upgrades"
        title={
          <>
            Make it <em className="text-gold">yours</em>
          </>
        }
        lead={
          <>
            <span className="no-print">Tap to add any extras. </span>Each is a flat{" "}
            <strong className="text-ink">{formatMoney(p.addOns[0]?.price ?? 0)}</strong> for the evening, and your bar tab
            below updates as you choose.
          </>
        }
      />

      <div className="mx-auto grid max-w-2xl gap-3 lg:max-w-none lg:grid-cols-3 lg:gap-4">
        {p.addOns.map((a) => {
          const on = selected.has(a.id);
          const Icon = addOnIcons[a.id];
          return (
            <button
              key={a.id}
              type="button"
              role="checkbox"
              aria-checked={on}
              onClick={() => toggle(a.id)}
              className={`group relative flex flex-col rounded-2xl border p-4 text-left transition duration-300 lg:items-center lg:px-5 lg:pb-5 lg:pt-7 lg:text-center ${
                on
                  ? "border-gold-bright bg-cream shadow-[0_24px_50px_-28px_rgba(156,116,44,0.7)] lg:-translate-y-1"
                  : "border-line bg-paper hover:border-gold-bright/60 lg:hover:-translate-y-0.5"
              }`}
            >
              <span
                className={`absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
                  on ? "border-gold-bright bg-gold-bright text-white" : "border-line text-transparent"
                }`}
                aria-hidden
              >
                ✓
              </span>
              <span className="flex items-start gap-4 lg:flex-1 lg:flex-col lg:items-center">
                <span
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full transition lg:h-20 lg:w-20 ${
                    on ? "bg-gold-bright text-white" : "bg-cream text-gold"
                  }`}
                >
                  {Icon && <Icon className="h-8 w-8 lg:h-11 lg:w-11" />}
                </span>
                <span className="flex-1 pr-7 lg:pr-0">
                  <span className="block font-display text-[1.45rem] leading-tight text-ink lg:mt-1 lg:text-2xl">
                    {a.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted lg:mt-2">{a.description}</span>
                </span>
              </span>
              <span className="mt-4 flex w-full items-center justify-between gap-3 border-t border-line pt-4 lg:flex-col lg:border-0 lg:pt-2">
                <span className="lg:text-center">
                  <span className="block font-display text-2xl font-semibold leading-none text-ink lg:text-3xl">
                    +{formatMoney(addOnPrice(a))}
                  </span>
                  <span className="mt-1 block text-xs text-muted">Flat, for the whole evening</span>
                </span>
                <span
                  className={`no-print shrink-0 rounded-full px-5 py-2.5 text-sm font-semibold transition lg:w-full ${
                    on ? "bg-ink text-white" : "border border-gold-bright/60 text-gold group-hover:bg-gold-bright group-hover:text-white"
                  }`}
                >
                  {on ? "Added ✓" : "Add to my bar"}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      {/* Bar tab receipt */}
      <div className="mx-auto mt-10 max-w-md">
        <div className="receipt-edge rotate-[-0.6deg] bg-paper px-7 pb-12 pt-8 shadow-[0_25px_60px_-30px_rgba(90,70,30,0.55)]">
          <div className="text-center">
            <p className="font-display text-3xl italic text-ink">Your bar tab</p>
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.3em] text-muted">{p.event.type}</p>
          </div>
          <div className="my-5 border-t border-dashed border-ink/25" />
          <ul className="space-y-3 text-sm">
            <li className="flex items-baseline gap-2">
              <span>
                {p.packageName}
                <span className="block text-xs text-muted">Event package · {guestRangeLabel(p)}</span>
              </span>
              <span className="leader" />
              <span className="font-semibold tabular-nums">{formatMoney(base)}</span>
            </li>
            {["Shots", "The Alchemy touch"].map((label) => (
              <li key={label} className="flex items-baseline gap-2">
                <span>{label}</span>
                <span className="leader" />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-sage">Included</span>
              </li>
            ))}
            {p.addOns.map((a) => {
              const line = lines.find((l) => l.id === a.id);
              return (
                <li key={a.id} className={`flex items-baseline gap-2 transition ${line ? "" : "text-muted/60"}`}>
                  <span className={line ? "" : "line-through decoration-muted/40"}>{a.name}</span>
                  <span className="leader" />
                  <span className="font-semibold tabular-nums">
                    {line ? formatMoney(line.amount) : "—"}
                  </span>
                </li>
              );
            })}
          </ul>
          <div className="my-5 border-t border-dashed border-ink/25" />
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-ink">Total</p>
              <p className="mt-0.5 text-[0.7rem] text-muted">All add-ons: {formatMoney(max)}</p>
            </div>
            <p key={total} className="pop font-display text-5xl font-semibold tabular-nums text-ink">
              {formatMoney(total)}
            </p>
          </div>
          <p className="mt-6 text-center font-display text-lg italic text-gold">Cheers!</p>
        </div>
      </div>
    </section>
  );
}
