export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex flex-col items-center leading-none ${className}`}>
      <span className="font-display text-[1.35em] font-semibold tracking-[0.14em] text-ink">
        ALCHEMY
      </span>
      <span className="mt-1 flex w-full items-center gap-2 text-[0.5em] font-semibold tracking-[0.4em] text-gold">
        <span className="h-px flex-1 bg-gold-bright" />
        BAR
        <span className="h-px flex-1 bg-gold-bright" />
      </span>
    </span>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 160 12" className={`h-3 w-40 text-gold-bright ${className}`} aria-hidden>
      <path d="M0 6h62M98 6h62" stroke="currentColor" strokeWidth="1" />
      <path d="M80 1l5 5-5 5-5-5z" fill="currentColor" />
      <path d="M68 6l3-3 3 3-3 3zM86 6l3-3 3 3-3 3z" fill="none" stroke="currentColor" />
    </svg>
  );
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
}: {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
}) {
  return (
    <header className="mb-6 text-center md:mb-8">
      <p className="text-[0.68rem] font-bold uppercase tracking-[0.3em] text-gold">
        No. {index} · {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-[2.1rem] leading-tight text-ink sm:text-4xl md:text-5xl">{title}</h2>
      <Ornament className="mx-auto mt-3" />
      {lead && (
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted md:text-base">{lead}</p>
      )}
    </header>
  );
}
