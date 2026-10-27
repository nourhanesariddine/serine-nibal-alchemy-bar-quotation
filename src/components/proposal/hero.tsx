import type { Proposal } from "@/data/proposal";
import { basePrice, formatDate, formatMoney, guestRangeLabel, validUntil } from "@/lib/pricing";
import { Ornament, Wordmark } from "./ui";

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 40 40" className={`absolute h-7 w-7 text-gold-bright ${className}`} aria-hidden>
      <path d="M2 38V14C2 7.4 7.4 2 14 2h24" fill="none" stroke="currentColor" strokeWidth="1.2" />
      <path d="M8 38V18c0-5.5 4.5-10 10-10h20" fill="none" stroke="currentColor" strokeWidth=".8" opacity=".6" />
      <circle cx="14" cy="14" r="1.8" fill="currentColor" />
    </svg>
  );
}

export function Hero({ p }: { p: Proposal }) {
  const facts = [
    { label: "Event", value: p.event.type },
    { label: "Guests", value: `${p.event.guests}` },
    { label: "Package", value: "Fixed price" },
    { label: "Date", value: p.event.date ? formatDate(p.event.date) : "To be confirmed" },
  ];

  return (
    // Fills exactly one screen (minus the 3.5rem top bar); all spacing scales with screen height.
    <section id="top" className="rise flex min-h-[calc(100svh-3.5rem)] items-center py-[2.5vh]">
      <div className="relative mx-auto w-full max-w-4xl rounded-[2px] border border-gold-bright/50 bg-paper px-5 py-[clamp(1.5rem,5vh,3.5rem)] text-center shadow-[0_30px_80px_-40px_rgba(90,70,30,0.45)] md:px-12">
        <div className="pointer-events-none absolute inset-2 border border-gold-bright/30" />
        <Corner className="left-3.5 top-3.5" />
        <Corner className="right-3.5 top-3.5 rotate-90" />
        <Corner className="bottom-3.5 left-3.5 -rotate-90" />
        <Corner className="bottom-3.5 right-3.5 rotate-180" />

        <Wordmark className="text-[clamp(1.4rem,3.6vh,2.1rem)]" />
        <p className="mt-[1vh] text-[0.6rem] font-semibold uppercase tracking-[0.4em] text-muted">
          Bar · Events · Experiences
        </p>

        <p className="mt-[2.4vh] text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold">
          Wedding quotation<span className="hidden sm:inline"> · {p.packageName}</span>
        </p>
        <h1 className="mt-[1.2vh] font-display text-[clamp(2.2rem,min(7.4vh,10.5vw),4.6rem)] leading-[0.95] text-ink">
          An open bar,
          <br />
          <em className="text-gold">beautifully poured</em>
        </h1>
        {p.preparedFor && (
          <div className="mt-[1.4vh]">
            <p className="text-[0.6rem] font-bold uppercase tracking-[0.35em] text-muted">Prepared for</p>
            <p className="mt-[0.4vh] font-display text-[clamp(1.5rem,3.6vh,2.3rem)] italic leading-tight text-ink">
              {p.preparedFor}
            </p>
          </div>
        )}
        <Ornament className="mx-auto mt-[2.2vh]" />
        <p className="mx-auto mt-[1.8vh] max-w-sm text-[0.78rem] leading-relaxed md:max-w-xl md:text-[clamp(0.85rem,1.8vh,1rem)] text-muted">
          {p.intro}
        </p>

        <dl className="mx-auto mt-[3vh] grid max-w-3xl grid-cols-2 gap-y-4 md:grid-cols-4">
          {facts.map((f, i) => (
            <div key={f.label} className={`px-2 ${i % 2 ? "border-l" : ""} ${i === 2 ? "md:border-l" : ""} border-line`}>
              <dt className="text-[0.6rem] font-bold uppercase tracking-[0.25em] text-gold">{f.label}</dt>
              <dd className="mt-1 font-display text-[clamp(1.05rem,2.6vh,1.5rem)] leading-tight md:whitespace-nowrap text-ink">
                {f.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-[3vh] inline-flex items-center gap-3 rounded-full border border-gold-bright/50 bg-cream px-5 py-[0.9vh]">
          <span className="text-[0.68rem] uppercase tracking-[0.2em] text-muted">Event package</span>
          <span className="font-display text-[clamp(1.25rem,3vh,1.6rem)] font-semibold text-ink">
            {formatMoney(basePrice(p))}
          </span>
        </div>
        <p className="mt-[1vh] text-[0.68rem] tracking-[0.08em] text-muted">
          One price for the evening · {guestRangeLabel(p)}
        </p>
        <p className="mt-[1.6vh] text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-muted/80">
          Ref. {p.reference} · Issued {formatDate(p.issuedOn)} · Valid until {formatDate(validUntil(p))}
        </p>
      </div>
    </section>
  );
}
