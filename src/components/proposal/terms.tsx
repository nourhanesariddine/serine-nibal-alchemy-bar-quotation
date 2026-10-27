import type { Proposal } from "@/data/proposal";
import { formatDate, validUntil } from "@/lib/pricing";
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
      <div className="mx-auto mb-5 max-w-3xl overflow-hidden rounded-2xl border border-gold-bright/50 bg-paper shadow-[0_20px_60px_-40px_rgba(90,70,30,0.5)]">
        <div className="grid md:grid-cols-[auto_1fr]">
          <div className="flex flex-col items-center justify-center bg-cream px-8 py-6 text-center md:min-w-56">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.28em] text-gold">Valid until</p>
            <p className="mt-2 font-display text-[1.9rem] leading-none text-ink md:text-[2.1rem]">{formatDate(validUntil(p))}</p>
            <p className="mt-2 text-[0.68rem] text-muted">{p.validForDays} days from issue</p>
          </div>
          <div className="px-6 py-6 md:px-8">
            <p className="font-display text-xl italic leading-snug text-ink">This proposal is held for you until then.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">{p.validity.body}</p>
            <p className="mt-3 text-[0.68rem] uppercase tracking-[0.2em] text-muted">
              Ref. {p.reference} · Issued {formatDate(p.issuedOn)}
            </p>
          </div>
        </div>
      </div>

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
