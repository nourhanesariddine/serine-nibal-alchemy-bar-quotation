import { Wordmark } from "./ui";

export function Nav() {
  return (
    <nav className="no-print sticky top-0 z-40 border-b border-line/70 bg-ivory/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <a href="#top" aria-label="Back to top" className="text-sm">
          <Wordmark />
        </a>
        <div className="flex items-center gap-4 text-sm text-muted md:gap-7">
          <a href="#package" className="hidden hover:text-ink md:inline">The bar</a>
          <a href="#touches" className="hidden hover:text-ink md:inline">Included</a>
          <a href="#build" className="hover:text-ink">Add-ons</a>
          <a href="#events" className="hidden hover:text-ink md:inline">Our events</a>
          <a href="#terms" className="hidden hover:text-ink md:inline">Terms</a>
        </div>
      </div>
    </nav>
  );
}
