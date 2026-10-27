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
  /** flat price for the whole event */
  price: number;
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
    /** confirmed guest count — used for per-guest add-ons */
    guests: number;
    /** the package price holds across this range */
    guestRange: { min: number; max: number };
  };
  preparedFor: string | null;
  issuedOn: string;
  /** ISO date until which the quotation (pricing and availability) is held */
  validUntil: string;
  /** Validity wording, shown in the terms section and the PDF */
  validity: {
    body: string;
  };
  intro: string;
  currency: "USD";
  /** Fixed price for the whole evening. Not calculated per guest. */
  packagePrice: number;
  /** How the package is priced — the "one package, one price" section */
  pricing: {
    eyebrow: string;
    /** short line shown next to the price */
    tagline: string;
    body: string[];
    /** what the price is built around */
    foundations: { title: string; body: string }[];
  };
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
  reference: "ALC-2026-001-R2",
  title: "Wedding Reception",
  packageName: "Open Bar Package",
  event: {
    type: "Wedding Reception",
    date: null, // TODO: event date, e.g. "2026-11-21"
    venue: null, // TODO: venue name
    guests: 150,
    guestRange: { min: 150, max: 200 },
  },
  preparedFor: "Serine & Nibal",
  issuedOn: "2026-10-26",
  validUntil: "2026-12-01",
  validity: {
    body:
      "To hold the package and pricing outlined here, we kindly ask that you confirm within this period. After this date, pricing and our availability for your date are subject to review, and we would be glad to issue an updated quotation on request.",
  },
  intro:
    "A full open bar for your evening, set up, poured and served by the Alchemy team. One package, priced for the night as a whole. Choose the add-ons you want and the total updates as you go.",
  currency: "USD",
  packagePrice: 1600,
  pricing: {
    eyebrow: "How your package is priced",
    tagline: "One price for the evening, for 150 to 200 guests.",
    body: [
      "Your Alchemy package is priced for the evening as a whole, not per head. What we bring to your wedding is the same whatever the final count: our own bar, built and styled at your venue; a bartending team pouring from the first toast to the last dance; the spirits, shots and fresh garnishes behind it; and the personal touches that make the night yours.",
      "Because these foundations don\u2019t change between 150 and 200 guests, neither does the price. Your package is $1,600 across that range \u2014 settled now, so the bar is one thing you never have to revisit as the guest list takes shape.",
    ],
    foundations: [
      {
        title: "The bar itself",
        body: "Our wood counter, warm lighting and greenery, brought to your venue, set up and styled for your wedding.",
      },
      {
        title: "The team behind it",
        body: "Alchemy bartenders mixing, shaking and serving in front of your guests, all night long.",
      },
      {
        title: "Everything poured",
        body: "The full spirits selection, shots, and fruit and garnishes prepared fresh on the night.",
      },
    ],
  },
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
      tag: { label: "+$200", kind: "extra" },
      note: "Optional add-on",
    },
  ],
  touches: [
    {
      id: "cups",
      title: "Customized premium cups",
      body: "Premium plastic cups fully designed for you: Serine & Nibal × Alchemy Bar.",
    },
    {
      id: "surprise",
      title: "A surprise in the drinks",
      body: "A special surprise on the drinks for you both and your guests. We're keeping this one a secret.",
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
      price: 200,
    },
    {
      id: "tequila",
      name: "Tequila Shots & Rounds",
      description:
        "Shots are already included in your bar. This adds tequila shots and rounds on top.",
      price: 200,
    },
    {
      id: "premium-bar",
      name: "Premium Bar Upgrade",
      description:
        "An upgraded bar setup and presentation, including wine service alongside the existing package. It changes the bar's design and presentation, not the spirits.",
      price: 200,
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
    "The open bar package is a fixed event package of $1,600. It is priced for the evening as a whole and remains the same for 150 to 200 guests; it is not calculated per guest.",
    "The package covers the Alchemy bar and its setup and styling at your venue, the bartending team, and the spirits, shots and garnishes listed in the bar menu, served throughout the evening.",
    "Shots (vodka, gin and whiskey) are included in the package. Tequila shots and rounds are an optional add-on at $200.",
    "The customized cups, the drinks surprise, the event theme and the bartenders' customized outfits are included in the package at no extra cost.",
    "Welcome drinks, tequila shots and rounds, and the premium bar upgrade are optional. Each selected add-on is a flat $200 for the evening, whatever the guest count.",
    "The premium bar upgrade includes wine service and an enhanced bar setup and design. It does not change the quality or brands of the spirits in the package.",
    "Final pricing depends on the add-ons you select. Should your guest count move beyond 200, we will gladly revise the quotation for you.",
    "This quotation is valid until 1 December 2026. Pricing and availability are held until that date and are subject to review thereafter.",
  ],
  contact: {
    whatsapp: null,
    email: null,
    instagram: null,
  },
};
