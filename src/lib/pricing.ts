import type { AddOn, Proposal } from "@/data/proposal";

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** The fixed event package price — the same for any guest count within the range. */
export function basePrice(p: Proposal) {
  return p.packagePrice;
}

export function guestRangeLabel(p: Proposal) {
  return `${p.event.guestRange.min}\u2013${p.event.guestRange.max} guests`;
}

/** Add-ons are flat for the whole event, like the package. */
export function addOnPrice(a: AddOn) {
  return a.price;
}

export function computeTotal(p: Proposal, selected: Iterable<string>) {
  const ids = new Set(selected);
  const lines = p.addOns
    .filter((a) => ids.has(a.id))
    .map((a) => ({ id: a.id, name: a.name, amount: addOnPrice(a) }));
  const base = basePrice(p);
  const total = base + lines.reduce((s, l) => s + l.amount, 0);
  const max = base + p.addOns.reduce((s, a) => s + addOnPrice(a), 0);
  return { base, lines, total, max };
}

/** ISO date on which the quotation expires: issuedOn + validForDays */
export function validUntil(p: Proposal) {
  const d = new Date(p.issuedOn + "T12:00:00");
  d.setDate(d.getDate() + p.validForDays);
  return d.toISOString().slice(0, 10);
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
