import type { Proposal } from "@/data/proposal";
import { SectionHeading } from "./ui";

function PhotoSlot({ n, tilt }: { n: number; tilt: string }) {
  return (
    <div className={`${tilt} w-24 bg-white p-1.5 pb-5 shadow-[0_14px_30px_-16px_rgba(60,45,20,0.55)] md:w-28`}>
      <div className="flex aspect-[4/5] flex-col items-center justify-center gap-1 border border-dashed border-gold-bright/70 bg-cream text-gold">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
          <path d="M4 8h3l1.5-2h7L17 8h3v11H4z" strokeLinejoin="round" />
          <circle cx="12" cy="13" r="3.2" />
        </svg>
        <span className="text-[0.6rem] font-bold uppercase tracking-[0.15em]">Photo {n}</span>
      </div>
    </div>
  );
}

export function CoupleSection({ p, index }: { p: Proposal; index: string }) {
  const { photos, sampleLine } = p.personalization;
  const wa = p.contact.whatsapp
    ? `https://wa.me/${p.contact.whatsapp}?text=${encodeURIComponent(
        `Hi Alchemy! Here are our ${photos} photos and our sentence for the wedding (Ref. ${p.reference}):`,
      )}`
    : null;

  return (
    <section id="photos" className="mx-auto max-w-3xl">
      <SectionHeading
        index={index}
        eyebrow="One last thing"
        title={
          <>
            Make it <em className="text-gold">about you two</em>
          </>
        }
        lead="To personalize your bar, please send us the following on WhatsApp."
      />

      <div className="rounded-2xl border border-gold-bright/50 bg-paper p-5 shadow-[0_20px_60px_-40px_rgba(90,70,30,0.5)] md:p-10">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center">
          <div className="flex shrink-0 items-start">
            <PhotoSlot n={1} tilt="-rotate-6" />
            <PhotoSlot n={2} tilt="rotate-6 -ml-3 mt-2" />
          </div>

          <ol className="w-full space-y-4">
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-bright text-sm font-bold text-white">
                1
              </span>
              <p className="pt-0.5 text-sm leading-relaxed text-ink md:text-base">
                <strong>{photos} photos</strong> of the two of you
              </p>
            </li>
            <li className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-bright text-sm font-bold text-white">
                2
              </span>
              <div className="pt-0.5 text-sm leading-relaxed text-ink md:text-base">
                <p>
                  <strong>1 caption or sentence</strong> you love
                </p>
                <p className="mt-2 border-l-2 border-gold-bright/60 pl-3 font-display text-lg italic text-muted">
                  For example: &ldquo;{sampleLine}&rdquo;
                </p>
              </div>
            </li>
          </ol>
        </div>

        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noreferrer"
            className="no-print mt-8 flex items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Send on WhatsApp
          </a>
        ) : (
          <p className="mt-8 rounded-xl bg-cream px-4 py-3 text-center text-sm text-muted">
            Just reply to the WhatsApp chat this quotation came from.
          </p>
        )}
      </div>
    </section>
  );
}
