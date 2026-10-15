import Image from "next/image";
import type { Proposal } from "@/data/proposal";
import { SectionHeading } from "./ui";

const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-[1.5deg]"];

export function EventsSection({ p }: { p: Proposal }) {
  return (
    <section id="events">
      <SectionHeading
        index="04"
        eyebrow="Our events"
        title={
          <>
            Nights we&apos;ve <em className="text-gold">poured</em>
          </>
        }
        lead="A few moments from weddings and celebrations we've served."
      />

      <div className="grid grid-cols-2 gap-x-4 gap-y-6 md:grid-cols-3 md:gap-x-8 md:gap-y-10">
        {p.gallery.map((g, i) => (
          <figure
            key={g.src}
            className={`${tilts[i % tilts.length]} bg-white p-2 pb-0 shadow-[0_18px_40px_-20px_rgba(60,45,20,0.5)] transition duration-500 hover:z-10 hover:rotate-0 hover:scale-[1.04] md:p-3 md:pb-0`}
          >
            <div className="relative aspect-square overflow-hidden bg-cream">
              <Image src={g.src} alt={g.alt} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover" />
            </div>
            <figcaption className="py-2.5 text-center font-display text-base italic text-ink md:py-4 md:text-xl">
              {g.caption}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-10 grid gap-5 text-center sm:grid-cols-3">
        {p.pillars.map((pl, i) => (
          <div key={pl.title}>
            <p className="font-display text-3xl italic text-gold-bright">{["i", "ii", "iii"][i]}</p>
            <h3 className="mt-1 font-display text-2xl text-ink">{pl.title}</h3>
            <p className="mx-auto mt-1 max-w-xs text-sm leading-relaxed text-muted">{pl.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
