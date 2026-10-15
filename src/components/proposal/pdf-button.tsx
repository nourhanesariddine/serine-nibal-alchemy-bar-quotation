"use client";

export function PdfButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print rounded-full border border-ink/15 bg-paper px-8 py-3 text-sm font-semibold transition hover:border-gold-bright"
    >
      Download as PDF
    </button>
  );
}
