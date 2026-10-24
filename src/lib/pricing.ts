import type { AddOn, Proposal } from "@/data/proposal";

export function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function basePrice(p: Proposal) {
  return p.packagePrice;
}

export function addOnPrice(a: AddOn) {
  return a.price;
}

export function fixedFeesTotal(p: Proposal) {
  return (p.fixedFees ?? []).reduce((s, f) => s + f.amount, 0);
}

/** Lowest possible total: package + flat fees, no add-ons */
export function startingPrice(p: Proposal) {
  return basePrice(p) + fixedFeesTotal(p);
}

export function computeTotal(p: Proposal, selected: Iterable<string>) {
  const ids = new Set(selected);
  const lines = p.addOns
    .filter((a) => ids.has(a.id))
    .map((a) => ({ id: a.id, name: a.name, amount: addOnPrice(a) }));
  const base = basePrice(p);
  const fees = p.fixedFees ?? [];
  const feesTotal = fixedFeesTotal(p);
  const total = base + feesTotal + lines.reduce((s, l) => s + l.amount, 0);
  const max = base + feesTotal + p.addOns.reduce((s, a) => s + addOnPrice(a), 0);
  return { base, fees, feesTotal, lines, total, max };
}

export function formatDate(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
