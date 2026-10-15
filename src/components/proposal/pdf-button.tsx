"use client";

import { useState } from "react";
import type { Proposal } from "@/data/proposal";
import { useSelection } from "./selection";

export function PdfButton({ p }: { p: Proposal }) {
  const { selected } = useSelection();
  const [busy, setBusy] = useState(false);

  async function download() {
    setBusy(true);
    try {
      // Loaded only when clicked, so the page itself stays light.
      const [{ pdf }, { QuotationPdf, registerPdfFonts }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("./pdf/quotation-pdf"),
      ]);
      const origin = window.location.origin;
      registerPdfFonts(origin);
      const blob = await pdf(<QuotationPdf p={p} selected={[...selected]} origin={origin} />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Alchemy-Bar-Quotation${p.preparedFor ? "-" + p.preparedFor.replace(/[^A-Za-z]+/g, "-") : ""}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 5000);
    } catch (err) {
      console.error("PDF generation failed", err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={download}
      disabled={busy}
      className="no-print inline-flex items-center gap-2 rounded-full border border-gold-bright/60 bg-paper px-7 py-3 text-sm font-semibold text-ink transition hover:bg-gold-bright hover:text-white disabled:opacity-60"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {busy ? "Preparing your PDF…" : "Download quotation (PDF)"}
    </button>
  );
}
