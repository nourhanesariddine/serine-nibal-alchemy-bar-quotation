// All proposal content lives here. To make a proposal for a new client,
// change the values below (later this can come from a database / admin form).

export type PackageItem = {
  category: string;
  selection: string;
  /** small badge next to the item */
  tag?: { label: string; kind: "included" | "extra" };
  note?: string;
};

export type Touch = {
  id: "cups" | "surprise" | "theme" | "outfit";
  title: string;
  body: string;
};

export type AddOn = {
  id: string;
  name: string;
  description: string;
  ratePerGuest: number;
  preselected?: boolean;
};

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  /** grid placement (Tailwind classes) */
  span?: string;
};

export type Proposal = {
  id: string;
  reference: string;
  title: string;
  packageName: string;
  event: {
    type: string;
    /** ISO date, or null if not confirmed yet */
    date: string | null;
    venue: string | null;
    guests: number;
  };
  preparedFor: string | null;
  issuedOn: string;
  intro: string;
  currency: "USD";
  baseRatePerGuest: number;
  packageItems: PackageItem[];
  /** Personal touches included with the package */
  touches: Touch[];
  /** Final step: what we ask the couple to send on WhatsApp */
  personalization: {
    photos: number;
    sampleLine: string;
  };
  addOns: AddOn[];
  gallery: GalleryItem[];
  pillars: { title: string; body: string }[];
  notes: string[];
  contact: {
    // TODO: fill in real contact details — the WhatsApp button uses them.
    whatsapp: string | null; // international format, digits only, e.g. "9613123456"
    email: string | null;
    instagram: string | null;
  };
};

export const proposal: Proposal = {
  id: "wedding-open-bar-200",
  reference: "ALC-2026-001",
  title: "Wedding Reception",
  packageName: "Open Bar Package",
  event: {
    type: "Wedding Reception",
    date: null, // TODO: event date, e.g. "2026-11-21"
    venue: null, // TODO: venue name
    guests: 200,
  },
  preparedFor: null, // TODO: client name, e.g. "Maya & Karim"
  issuedOn: "2026-10-15",
  intro:
    "A full open bar for your evening, set up, poured and served by the Alchemy team. Choose the add-ons you want and the total updates as you go.",
  currency: "USD",
  baseRatePerGuest: 8,
  packageItems: [
    { category: "Vodka", selection: "Peak Hills" },
    { category: "Gin", selection: "Peak Hills" },
    { category: "Whiskey", selection: "Johnnie Walker Red Label" },
    {
      category: "Shots",
      selection: "Vodka, gin & whiskey shots",
      tag: { label: "Included", kind: "included" },
    },
    {
      category: "Tequila",
      selection: "Tequila shots & rounds",
      tag: { label: "+$1 / guest", kind: "extra" },
      note: "Optional add-on",
    },
  ],
  touches: [
    {
      id: "cups",
      title: "Customized premium cups",
      body: "Premium plastic cups fully designed for you: Bride & Groom × Alchemy Bar.",
    },
    {
      id: "surprise",
      title: "A surprise in the drinks",
      body: "A special surprise on the drinks for you and your guests. We're keeping this one a secret.",
    },
    {
      id: "theme",
      title: "Themed to your wedding",
      body: "The bar is styled to match your wedding's colours and theme.",
    },
    {
      id: "outfit",
      title: "Customized outfits",
      body: "Our bartenders wear outfits customized to your wedding's look.",
    },
  ],
  personalization: {
    photos: 2,
    sampleLine: "You found your perfect match. Now let us pour the perfect drink.",
  },
  addOns: [
    {
      id: "welcome-drinks",
      name: "Welcome Drinks",
      description:
        "Drinks served to guests as they arrive. Not included in the standard package.",
      ratePerGuest: 1,
    },
    {
      id: "tequila",
      name: "Tequila Shots & Rounds",
      description:
        "Shots are already included in your bar. This adds tequila shots and rounds on top.",
      ratePerGuest: 1,
    },
    {
      id: "premium-bar",
      name: "Premium Bar Upgrade",
      description:
        "An upgraded bar setup and presentation, including wine service alongside the existing package. It changes the bar's design and presentation, not the spirits.",
      ratePerGuest: 1,
    },
  ],
  gallery: [
    { src: "/images/event-toast.webp", alt: "Couple raising a toast beside their wedding cake", caption: "The toast" },
    { src: "/images/bartenders.webp", alt: "Two Alchemy bartenders shaking cocktails", caption: "Behind the bar" },
    { src: "/images/event-dance.webp", alt: "Guests dancing under string lights", caption: "On the dance floor" },
    { src: "/images/cocktail-strawberry.webp", alt: "Strawberry cocktail in a coupe glass", caption: "Strawberry, shaken" },
    { src: "/images/bar-setup.webp", alt: "The Alchemy bar lit up at night", caption: "Our bar, lit up" },
    { src: "/images/cocktail-watermelon.webp", alt: "Watermelon cocktail with a sugar rim", caption: "Watermelon, chilled" },
  ],
  pillars: [
    {
      title: "Our own bar",
      body: "We bring the bar itself: wood counter, warm lighting and greenery, set up at your venue.",
    },
    {
      title: "Bartenders who perform",
      body: "Our team mixes, shakes and serves in front of your guests, all night.",
    },
    {
      title: "Fresh on the night",
      body: "Fruit and garnishes are cut and prepared on site.",
    },
  ],
  notes: [
    "The standard open bar package is priced at $8 per guest, for a total of $1,600 based on 200 guests.",
    "Shots (vodka, gin and whiskey) are included in the standard package. Tequila shots and rounds are an optional add-on at $1 per guest.",
    "The customized cups, the drinks surprise, the event theme and the bartenders' customized outfits are included in the package.",
    "Welcome drinks, tequila shots and rounds, and the premium bar upgrade are optional. Each selected add-on is charged at $1 per guest ($200 for 200 guests).",
    "The premium bar upgrade includes wine service and an enhanced bar setup and design. It does not change the quality or brands of the spirits in the standard package.",
    "Final pricing depends on the add-ons you select. The maximum total includes all three optional add-ons.",
  ],
  contact: {
    whatsapp: null,
    email: null,
    instagram: null,
  },
};
