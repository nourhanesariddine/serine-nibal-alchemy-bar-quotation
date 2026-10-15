"use client";

import { useState } from "react";
import type { Proposal } from "@/data/proposal";
import { computeTotal, formatMoney } from "@/lib/pricing";
import { useSelection } from "./selection";
import { SectionHeading } from "./ui";

type Choice = "approve" | "revise";

const options: { id: Choice; title: string; body: string }[] = [
  {
    id: "approve",
    title: "Approve proposal",
    body: "Everything looks right. Lock in the package and the add-ons you selected.",
  },
  {
    id: "revise",
    title: "Request a change",
    body: "You're interested, but something needs adjusting before you approve.",
  },
];

export function Decision({ p }: { p: Proposal }) {
  const { selected } = useSelection();
  const { lines, total } = computeTotal(p, selected);
  const [choice, setChoice] = useState<Choice | null>(null);
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const message = [
    choice === "approve" ? "Hi Alchemy, we'd like to APPROVE our proposal." : "Hi Alchemy, we'd like to REQUEST A CHANGE to our proposal.",
    `Ref: ${p.reference} · ${p.event.type} · ${p.event.guests} guests`,
    `Add-ons: ${lines.length ? lines.map((l) => l.name).join(", ") : "none"}`,
    `Total: ${formatMoney(total)}`,
    note ? `Note: ${note}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  const href = p.contact.whatsapp
    ? `https://wa.me/${p.contact.whatsapp}?text=${encodeURIComponent(message)}`
    : p.contact.email
      ? `mailto:${p.contact.email}?subject=${encodeURIComponent(`Proposal ${p.reference}`)}&body=${encodeURIComponent(message)}`
      : null;

  return (
    <section id="decision" className="no-print mx-auto max-w-3xl">
      <SectionHeading
        index="06"
        eyebrow="Your decision"
        title={
          <>
            Shall we <em className="text-gold">raise a glass?</em>
          </>
        }
        lead="Choose an option. You can add a note before anything is sent."
      />

      {sent ? (
        <div className="pop rounded-2xl border border-gold-bright bg-cream p-8 text-center">
          <p className="font-display text-4xl italic text-ink">Thank you!</p>
          <p className="mt-2 text-sm text-muted">
            We&apos;ve received your response and will be in touch shortly.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2">
            {options.map((o) => {
              const on = choice === o.id;
              return (
                <button
                  key={o.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setChoice(o.id)}
                  className={`flex gap-4 rounded-2xl border p-5 text-left transition ${
                    on ? "border-gold-bright bg-cream shadow-[0_20px_40px_-28px_rgba(156,116,44,0.8)]" : "border-line bg-paper hover:border-gold-bright/60"
                  }`}
                >
                  <span
                    className={`mt-1 h-5 w-5 shrink-0 rounded-full border-2 transition ${
                      on ? "border-gold-bright bg-gold-bright shadow-[inset_0_0_0_3px_var(--color-cream)]" : "border-line"
                    }`}
                  />
                  <span>
                    <span className="block font-display text-2xl text-ink">{o.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{o.body}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {choice && (
            <div className="rise mt-4 rounded-2xl border border-line bg-paper p-5">
              <p className="text-sm text-muted">
                {lines.length} add-on{lines.length === 1 ? "" : "s"} selected · Total{" "}
                <span className="font-semibold text-ink">{formatMoney(total)}</span>
              </p>
              <label className="mt-4 block text-[0.68rem] font-bold uppercase tracking-[0.2em] text-gold" htmlFor="note">
                {choice === "approve" ? "Anything we should know? (optional)" : "What would you like to change?"}
              </label>
              <textarea
                id="note"
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="mt-2 w-full resize-none rounded-xl border border-line bg-ivory p-3 text-sm outline-none placeholder:text-muted/60 focus:border-gold-bright"
                placeholder={choice === "approve" ? "e.g. the bar should be ready by 7pm" : "e.g. we'd like a quote for 250 guests"}
              />
              {href ? (
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setSent(true)}
                  className="mt-3 block rounded-full bg-gold-bright py-3.5 text-center text-sm font-semibold text-white transition hover:bg-gold"
                >
                  {choice === "approve" ? "Send approval" : "Send request"}
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => setSent(true)}
                  className="mt-3 w-full rounded-full bg-gold-bright py-3.5 text-sm font-semibold text-white transition hover:bg-gold"
                >
                  {choice === "approve" ? "Send approval" : "Send request"}
                </button>
              )}
            </div>
          )}
        </>
      )}

      <button
        type="button"
        onClick={() => window.print()}
        className="mt-4 w-full rounded-full border border-ink/15 bg-paper py-3.5 text-sm font-semibold transition hover:border-gold-bright"
      >
        Download PDF
      </button>
    </section>
  );
}
