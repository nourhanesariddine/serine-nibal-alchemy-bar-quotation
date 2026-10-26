// Hand-drawn style line icons for the add-ons (no photos in the quotation part).
type P = { className?: string };
const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function CoupeIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M8 15h32c0 8.5-7 13.5-16 13.5S8 23.5 8 15z" />
      <path d="M11 19.5c3.5 1.6 8 2.4 13 2.4s9.5-.8 13-2.4" opacity=".5" />
      <path d="M24 28.5V41M17 42.5h14" />
      <path d="M33 6l1 2.2 2.2 1-2.2 1-1 2.2-1-2.2-2.2-1 2.2-1zM15 8.5l.6 1.4 1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6z" />
    </svg>
  );
}

export function ShotIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M9 14h14l-2 26h-10z" />
      <path d="M10 21.5h12" opacity=".5" />
      <path d="M25 14h14l-2 26H27z" />
      <path d="M26 21.5h12" opacity=".5" />
      <path d="M35 6.5c2.2 0 4 1.8 4 4" />
      <circle cx="35" cy="10.5" r="0.4" fill="currentColor" />
    </svg>
  );
}

export function WineIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M15 6h18c0 12-3.5 18.5-9 18.5S15 18 15 6z" />
      <path d="M15.7 13.5h16.6" opacity=".5" />
      <path d="M24 24.5V41M17 42h14" />
      <path d="M36 30c3-1 5-3.5 5-7M38.5 34.5c1.8-.4 3.3-1.4 4.3-2.8" opacity=".6" />
    </svg>
  );
}

export const addOnIcons: Record<string, (p: P) => React.ReactElement> = {
  "welcome-drinks": CoupeIcon,
  tequila: ShotIcon,
  "premium-bar": WineIcon,
};

export function CupIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M12 9h24l-3.2 31H15.2z" />
      <path d="M11 9h26" />
      <path d="M24 25.5c-2.6-2-5-3.6-5-6a2.6 2.6 0 0 1 5-1 2.6 2.6 0 0 1 5 1c0 2.4-2.4 4-5 6z" />
      <path d="M16.5 32h15" opacity=".5" />
    </svg>
  );
}

export function GiftIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M9 19h30v6H9zM11.5 25h25v16h-25zM24 19v22" />
      <path d="M24 19c-2-6-9-8-9.5-3.5C14 19 24 19 24 19zM24 19c2-6 9-8 9.5-3.5C34 19 24 19 24 19z" />
      <path d="M38 6l.9 2.1L41 9l-2.1.9L38 12l-.9-2.1L35 9l2.1-.9z" />
    </svg>
  );
}

export function ThemeIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <circle cx="24" cy="20" r="4" />
      <path d="M24 16c-1.5-5 1.5-9 0-10-1.5 1 1.5 5 0 10zM24 16c0-6 7-8 7-3s-7 3-7 3zM24 16c0-6-7-8-7-3s7 3 7 3zM28 21c5 1 7 6 2.5 7s-2.5-7-2.5-7zM20 21c-5 1-7 6-2.5 7S20 21 20 21z" />
      <path d="M24 24v18M24 34c-4-1-7-4-8-7M24 37c3.5-.5 6.5-3 7.5-6" />
    </svg>
  );
}

export function BowTieIcon({ className }: P) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden {...base}>
      <path d="M20 20.5L7 14v20l13-6.5zM28 20.5L41 14v20l-13-6.5z" />
      <rect x="20" y="19.5" width="8" height="9" rx="2" />
      <path d="M11 20v8M37 20v8" opacity=".5" />
    </svg>
  );
}

export const touchIcons: Record<string, (p: P) => React.ReactElement> = {
  cups: CupIcon,
  surprise: GiftIcon,
  theme: ThemeIcon,
  outfit: BowTieIcon,
};
