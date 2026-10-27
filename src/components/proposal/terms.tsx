import type { Proposal } from "@/data/proposal";
import { SectionHeading } from "./ui";

const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

export function TermsSection({ p }: { p: Proposal }) {
  return (
    <section id="terms">
      <SectionHeading
        index="06"
        eyebrow="Notes & terms"
        title={
          <>
            The <em className="text-gold">fine print</em>
          </>
        }
      />
      <ol className="mx-auto grid max-w-3xl gap-3 md:grid-cols-2">
        {p.notes.map((n, i) => (
          <li key={i} className="flex gap-3 rounded-xl border border-line bg-paper/70 p-4 md:gap-4 md:p-5">
            <span className="w-8 shrink-0 font-display text-2xl italic leading-none text-gold-bright">
              {roman[i]}
            </span>
            <p className="text-sm leading-relaxed text-ink/80">{n}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
