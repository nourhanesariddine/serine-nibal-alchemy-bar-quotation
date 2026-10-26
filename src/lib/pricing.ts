import type { Proposal } from "@/data/proposal";

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function basePrice(p: Proposal) {
  return p.baseRatePerGuest * p.event.guests;
}

export function addOnPrice(p: Proposal, ratePerGuest: number) {
  return ratePerGuest * p.event.guests;
}

export function computeTotal(p: Proposal, selected: Iterable<string>) {
  const ids = new Set(selected);
  const lines = p.addOns
    .filter((a) => ids.has(a.id))
    .map((a) => ({ id: a.id, name: a.name, amount: addOnPrice(p, a.ratePerGuest) }));
  const base = basePrice(p);
  const total = base + lines.reduce((s, l) => s + l.amount, 0);
  const max = base + p.addOns.reduce((s, a) => s + addOnPrice(p, a.ratePerGuest), 0);
  return { base, lines, total, max };
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
