import type { Proposal } from "@/data/proposal";
import { touchIcons } from "./icons";
import { SectionHeading } from "./ui";

export function TouchesSection({ p }: { p: Proposal }) {
  return (
    <section id="touches">
      <SectionHeading
        index="03"
        eyebrow="Included in your package"
        title={
          <>
            The <em className="text-gold">Alchemy touch</em>
          </>
        }
        lead="Personal details we add to every wedding, at no extra cost."
      />
      <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
        {p.touches.map((t) => {
          const Icon = touchIcons[t.id];
          return (
            <div
              key={t.id}
              className="relative flex gap-4 overflow-hidden rounded-2xl border border-line bg-paper p-4 md:p-6"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-cream text-gold md:h-14 md:w-14">
                {Icon && <Icon className="h-7 w-7 md:h-8 md:w-8" />}
              </span>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-display text-[1.35rem] leading-tight text-ink md:text-2xl">{t.title}</h3>
                  <span className="rounded-full bg-sage/15 px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.12em] text-sage">
                    Included
                  </span>
                </div>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.body}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
