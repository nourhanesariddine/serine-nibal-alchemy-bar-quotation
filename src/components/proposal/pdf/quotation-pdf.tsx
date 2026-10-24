// The downloadable PDF version of the quotation (A4), built with @react-pdf/renderer.
// It uses the same data as the web page, plus the add-ons the client has ticked.
import { Document, Font, Image as PdfImage, Page, Path, StyleSheet, Svg, Text, View } from "@react-pdf/renderer";
import type { Proposal } from "@/data/proposal";
import { addOnPrice, basePrice, computeTotal, formatDate, formatMoney } from "@/lib/pricing";

const C = {
  ivory: "#fbf7f0",
  cream: "#f4ecdd",
  paper: "#fffdf9",
  ink: "#2a241d",
  muted: "#7a6f60",
  line: "#e6dccb",
  gold: "#9c742c",
  goldBright: "#c9a14a",
  sage: "#6f7d5c",
};

let registered = false;
export function registerPdfFonts(origin: string) {
  if (registered) return;
  Font.register({
    family: "Cormorant",
    fonts: [
      { src: `${origin}/fonts/cormorant-garamond-latin-500-normal.woff`, fontWeight: 500 },
      { src: `${origin}/fonts/cormorant-garamond-latin-500-italic.woff`, fontWeight: 500, fontStyle: "italic" },
      { src: `${origin}/fonts/cormorant-garamond-latin-600-normal.woff`, fontWeight: 600 },
    ],
  });
  Font.register({
    family: "Manrope",
    fonts: [
      { src: `${origin}/fonts/manrope-latin-400-normal.woff`, fontWeight: 400 },
      { src: `${origin}/fonts/manrope-latin-600-normal.woff`, fontWeight: 600 },
      { src: `${origin}/fonts/manrope-latin-700-normal.woff`, fontWeight: 700 },
    ],
  });
  Font.registerHyphenationCallback((word) => [word]);
  registered = true;
}

const s = StyleSheet.create({
  page: {
    backgroundColor: C.ivory,
    paddingTop: 46,
    paddingBottom: 56,
    paddingHorizontal: 48,
    fontFamily: "Manrope",
    fontSize: 8.5,
    color: C.ink,
  },
  frameOuter: { position: "absolute", top: 16, left: 16, right: 16, bottom: 16, borderWidth: 0.8, borderColor: C.goldBright },
  frameInner: { position: "absolute", top: 20, left: 20, right: 20, bottom: 20, borderWidth: 0.4, borderColor: C.goldBright, opacity: 0.5 },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 6.5,
    letterSpacing: 1.2,
    color: C.muted,
  },
  center: { alignItems: "center" },
  wordmark: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 26, letterSpacing: 5, color: C.ink },
  barRow: { flexDirection: "row", alignItems: "center", marginTop: 2 },
  barLine: { width: 46, height: 0.7, backgroundColor: C.goldBright },
  barText: { fontWeight: 700, fontSize: 7.5, letterSpacing: 4, color: C.gold, marginHorizontal: 6 },
  tagline: { fontSize: 6, letterSpacing: 3, color: C.muted, marginTop: 6 },
  eyebrow: { fontWeight: 700, fontSize: 7, letterSpacing: 2.5, color: C.gold },
  title: { fontFamily: "Cormorant", fontWeight: 500, fontSize: 32, lineHeight: 1, color: C.ink, textAlign: "center" },
  titleItalic: { fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.05, color: C.gold, textAlign: "center" },
  intro: { fontSize: 8.5, lineHeight: 1.55, color: C.muted, textAlign: "center", maxWidth: 360, marginTop: 8 },
  facts: { flexDirection: "row", marginTop: 12, borderWidth: 0.6, borderColor: C.line, backgroundColor: C.paper, borderRadius: 4 },
  fact: { flex: 1, paddingVertical: 9, alignItems: "center" },
  factLabel: { fontWeight: 700, fontSize: 6, letterSpacing: 1.8, color: C.gold },
  factValue: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 13, marginTop: 3 },
  sectionHead: { alignItems: "center", marginTop: 15, marginBottom: 8 },
  sectionEyebrow: { fontWeight: 700, fontSize: 6.5, letterSpacing: 2.2, color: C.gold },
  sectionTitle: { fontFamily: "Cormorant", fontWeight: 500, fontSize: 19, marginTop: 2 },
  card: { backgroundColor: C.paper, borderWidth: 0.6, borderColor: C.line, borderRadius: 6, padding: 12 },
  menuRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 5 },
  menuCat: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 14 },
  leader: { flex: 1, borderBottomWidth: 0.8, borderBottomColor: C.goldBright, borderStyle: "dotted", marginHorizontal: 6, marginBottom: 3.5, opacity: 0.7 },
  menuVal: { fontWeight: 600, fontSize: 8.5 },
  pill: { fontWeight: 700, fontSize: 5.8, letterSpacing: 1, paddingVertical: 2, paddingHorizontal: 5, borderRadius: 6 },
  included: { color: C.sage, backgroundColor: "#e9ece3" },
  extra: { color: "#ffffff", backgroundColor: C.goldBright },
  baseBox: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 6, backgroundColor: C.cream, borderRadius: 4, paddingVertical: 7, paddingHorizontal: 10 },
  grid2: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  touch: { width: "49%", backgroundColor: C.paper, borderWidth: 0.6, borderColor: C.line, borderRadius: 6, padding: 9, marginBottom: 6 },
  touchTitle: { fontFamily: "Cormorant", fontWeight: 600, fontSize: 12.5 },
  body: { fontSize: 7.8, lineHeight: 1.5, color: C.muted, marginTop: 3 },
  addRow: { flexDirection: "row", alignItems: "center", paddingVertical: 8, paddingHorizontal: 10, borderBottomWidth: 0.6, borderBottomColor: C.line },
  check: { width: 11, height: 11, borderRadius: 2, borderWidth: 1, marginRight: 9, alignItems: "center", justifyContent: "center" },
  receipt: { backgroundColor: C.paper, borderWidth: 0.6, borderColor: C.line, borderRadius: 4, paddingVertical: 14, paddingHorizontal: 22, width: 300, alignSelf: "center" },
  dash: { borderBottomWidth: 0.7, borderBottomColor: C.ink, borderStyle: "dashed", opacity: 0.3, marginVertical: 8 },
  tabRow: { flexDirection: "row", alignItems: "flex-end", marginBottom: 5, fontSize: 8 },
  polaroid: { width: "31.5%", backgroundColor: "#ffffff", padding: 5, paddingBottom: 0, borderWidth: 0.4, borderColor: C.line },
  caption: { fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 10, textAlign: "center", paddingVertical: 5 },
  note: { flexDirection: "row", marginBottom: 5 },
  roman: { fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 11, color: C.goldBright, width: 22 },
});

function Ornament() {
  return (
    <Svg width={110} height={8} viewBox="0 0 160 12" style={{ marginTop: 8 }}>
      <Path d="M0 6h62M98 6h62" stroke={C.goldBright} strokeWidth={1} />
      <Path d="M80 1l5 5-5 5-5-5z" fill={C.goldBright} />
      <Path d="M68 6l3-3 3 3-3 3zM86 6l3-3 3 3-3 3z" stroke={C.goldBright} fill="none" />
    </Svg>
  );
}

function Section({ no, eyebrow, title }: { no: string; eyebrow: string; title: string }) {
  return (
    <View style={s.sectionHead} wrap={false}>
      <Text style={s.sectionEyebrow}>
        NO. {no} · {eyebrow.toUpperCase()}
      </Text>
      <Text style={s.sectionTitle}>{title}</Text>
      <Ornament />
    </View>
  );
}

function Frame() {
  return (
    <>
      <View style={s.frameOuter} fixed />
      <View style={s.frameInner} fixed />
      <View style={s.footer} fixed>
        <Text>ALCHEMY BAR  |  WEDDING OPEN BAR QUOTATION</Text>
        <Text render={({ pageNumber, totalPages }) => `PAGE ${pageNumber} / ${totalPages}`} />
      </View>
    </>
  );
}

export function QuotationPdf({ p, selected, origin }: { p: Proposal; selected: string[]; origin: string }) {
  const { base, fees, lines, total, max } = computeTotal(p, selected);
  const facts = [
    ["EVENT", p.event.type],
    ["GUESTS", String(p.event.guests)],
    ["BASE RATE", `${formatMoney(p.baseRatePerGuest)} / guest`],
    ["DATE", p.event.date ? formatDate(p.event.date) : "To be confirmed"],
  ];
  const photos = [
    ["event-toast", "The toast"],
    ["bartenders", "Behind the bar"],
    ["event-dance", "On the dance floor"],
  ];
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII"];

  return (
    <Document title={`Alchemy Bar · ${p.preparedFor ? p.preparedFor + " · " : ""}${p.event.type} quotation`} author="Alchemy Bar">
      {/* PAGE 1 — cover, bar menu, included touches */}
      <Page size="A4" style={s.page}>
        <Frame />
        <View style={s.center}>
          <Text style={s.wordmark}>ALCHEMY</Text>
          <View style={s.barRow}>
            <View style={s.barLine} />
            <Text style={s.barText}>BAR</Text>
            <View style={s.barLine} />
          </View>
          <Text style={s.tagline}>BAR · EVENTS · EXPERIENCES</Text>

          <Text style={[s.eyebrow, { marginTop: 14 }]}>WEDDING QUOTATION · {p.packageName.toUpperCase()}</Text>
          <Text style={[s.title, { marginTop: 8 }]}>An open bar,</Text>
          <Text style={s.titleItalic}>beautifully poured</Text>
          {p.preparedFor && (
            <View style={{ alignItems: "center", marginTop: 8 }}>
              <Text style={{ fontWeight: 700, fontSize: 6.5, letterSpacing: 2.5, color: C.muted }}>PREPARED FOR</Text>
              <Text style={{ fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 22, color: C.ink, marginTop: 2 }}>
                {p.preparedFor}
              </Text>
            </View>
          )}
          <Ornament />
          <Text style={s.intro}>
            A full open bar for your evening, set up, poured and served by the Alchemy team.
          </Text>
        </View>

        <View style={s.facts}>
          {facts.map(([label, value], i) => (
            <View key={label} style={[s.fact, i > 0 ? { borderLeftWidth: 0.6, borderLeftColor: C.line } : {}]}>
              <Text style={s.factLabel}>{label}</Text>
              <Text style={s.factValue}>{value}</Text>
            </View>
          ))}
        </View>

        <Section no="01" eyebrow="Standard package" title="The bar menu" />
        <View style={s.card}>
          {p.packageItems.map((item) => (
            <View key={item.category} wrap={false}>
              <View style={s.menuRow}>
                <Text style={s.menuCat}>{item.category}</Text>
                <View style={s.leader} />
                <Text style={s.menuVal}>{item.selection}</Text>
                {item.tag && (
                  <Text style={[s.pill, item.tag.kind === "extra" ? s.extra : s.included, { marginLeft: 6, marginBottom: 1 }]}>
                    {item.tag.label.toUpperCase()}
                  </Text>
                )}
              </View>
            </View>
          ))}
          <View style={s.baseBox}>
            <Text style={{ color: C.muted }}>
              {formatMoney(p.baseRatePerGuest)} per guest × {p.event.guests} guests
            </Text>
            <Text style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 16 }}>{formatMoney(basePrice(p))}</Text>
          </View>
        </View>

        <Section no="02" eyebrow="Included in your package" title="The Alchemy touch" />
        <View style={s.grid2}>
          {p.touches.map((t) => (
            <View key={t.id} style={s.touch} wrap={false}>
              <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <Text style={s.touchTitle}>{t.title}</Text>
                <Text style={[s.pill, s.included]}>INCLUDED</Text>
              </View>
              <Text style={s.body}>{t.body}</Text>
            </View>
          ))}
        </View>
      </Page>

      {/* PAGE 2 — add-ons, bar tab, events, terms, last step */}
      <Page size="A4" style={s.page}>
        <Frame />
        <Section no="03" eyebrow="Optional add-ons & upgrades" title="Make it yours" />
        <View style={[s.card, { padding: 0 }]}>
          {p.addOns.map((a, i) => {
            const on = selected.includes(a.id);
            return (
              <View
                key={a.id}
                style={[s.addRow, on ? { backgroundColor: C.cream } : {}, i === p.addOns.length - 1 ? { borderBottomWidth: 0 } : {}]}
                wrap={false}
              >
                <View style={[s.check, { borderColor: on ? C.goldBright : C.line, backgroundColor: on ? C.goldBright : "#fff" }]}>
                  {on && (
                    <Svg width={7} height={7} viewBox="0 0 10 10">
                      <Path d="M1.5 5.2l2.3 2.3L8.5 2.5" stroke="#fff" strokeWidth={1.6} fill="none" />
                    </Svg>
                  )}
                </View>
                <View style={{ flex: 1, paddingRight: 10 }}>
                  <Text style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 12.5 }}>{a.name}</Text>
                  <Text style={[s.body, { marginTop: 1 }]}>{a.description}</Text>
                </View>
                <View style={{ alignItems: "flex-end", width: 70 }}>
                  <Text style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 13 }}>+{formatMoney(addOnPrice(p, a.ratePerGuest))}</Text>
                  <Text style={{ fontSize: 6.5, color: C.muted }}>{formatMoney(a.ratePerGuest)} × {p.event.guests} guests</Text>
                  <Text style={{ fontSize: 6, fontWeight: 700, letterSpacing: 0.8, marginTop: 2, color: on ? C.gold : C.muted }}>
                    {on ? "SELECTED" : "NOT SELECTED"}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={[s.receipt, { marginTop: 14 }]} wrap={false}>
          <Text style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 17, textAlign: "center" }}>Your bar tab</Text>
          <View style={s.dash} />
          <View style={s.tabRow}>
            <Text>Open bar package ({formatMoney(p.baseRatePerGuest)} × {p.event.guests})</Text>
            <View style={s.leader} />
            <Text style={{ fontWeight: 600 }}>{formatMoney(base)}</Text>
          </View>
          {["Shots", "The Alchemy touch"].map((l) => (
            <View key={l} style={s.tabRow}>
              <Text>{l}</Text>
              <View style={s.leader} />
              <Text style={{ fontWeight: 700, fontSize: 6.5, color: C.sage }}>INCLUDED</Text>
            </View>
          ))}
          {fees.map((f) => (
            <View key={f.id} style={s.tabRow}>
              <Text>{f.name}</Text>
              <View style={s.leader} />
              <Text style={{ fontWeight: 600 }}>{formatMoney(f.amount)}</Text>
            </View>
          ))}
          {lines.map((l) => (
            <View key={l.id} style={s.tabRow}>
              <Text>{l.name}</Text>
              <View style={s.leader} />
              <Text style={{ fontWeight: 600 }}>{formatMoney(l.amount)}</Text>
            </View>
          ))}
          <View style={s.dash} />
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end" }}>
            <View>
              <Text style={{ fontWeight: 700, fontSize: 7, letterSpacing: 1.8 }}>TOTAL</Text>
              <Text style={{ fontSize: 6.5, color: C.muted, marginTop: 2 }}>
                {lines.length} of {p.addOns.length} add-ons · all add-ons: {formatMoney(max)}
              </Text>
            </View>
            <Text style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 28 }}>{formatMoney(total)}</Text>
          </View>
        </View>

        <Section no="04" eyebrow="Notes & terms" title="The fine print" />
        <View>
          {p.notes.map((n, i) => (
            <View key={i} style={s.note} wrap={false}>
              <Text style={s.roman}>{roman[i]}</Text>
              <Text style={{ flex: 1, fontSize: 7.8, lineHeight: 1.5, color: C.ink }}>{n}</Text>
            </View>
          ))}
        </View>

      </Page>

      {/* PAGE 3 — our events + last step */}
      <Page size="A4" style={s.page}>
        <Frame />
        <Section no="05" eyebrow="Our events" title="Nights we've poured" />
        <View style={{ flexDirection: "row", justifyContent: "space-between" }} wrap={false}>
          {photos.map(([file, caption]) => (
            <View key={file} style={s.polaroid}>
              <PdfImage src={`${origin}/images/pdf/${file}.jpg`} style={{ width: "100%", aspectRatio: 1 }} />
              <Text style={s.caption}>{caption}</Text>
            </View>
          ))}
        </View>

        <View style={[s.polaroid, { width: "100%", marginTop: 10 }]} wrap={false}>
          <PdfImage src={`${origin}/images/pdf/bar-setup.jpg`} style={{ width: "100%", height: 212, objectFit: "cover" }} />
          <Text style={s.caption}>Our bar, lit up</Text>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 14 }} wrap={false}>
          {p.pillars.map((pl, i) => (
            <View key={pl.title} style={{ width: "31.5%", alignItems: "center" }}>
              <Text style={[s.roman, { width: "auto" }]}>{["i", "ii", "iii"][i]}</Text>
              <Text style={{ fontFamily: "Cormorant", fontWeight: 600, fontSize: 12.5 }}>{pl.title}</Text>
              <Text style={[s.body, { textAlign: "center" }]}>{pl.body}</Text>
            </View>
          ))}
        </View>

        <View style={[s.card, { marginTop: 12, borderColor: C.goldBright, alignItems: "center" }]} wrap={false}>
          <Text style={s.sectionEyebrow}>ONE LAST THING</Text>
          <Text style={{ fontFamily: "Cormorant", fontStyle: "italic", fontSize: 16, color: C.gold, marginTop: 3 }}>
            Make it about you two
          </Text>
          <Text style={[s.body, { textAlign: "center", marginTop: 5 }]}>
            Please send us on WhatsApp {p.personalization.photos} photos of the two of you and 1 caption or sentence you love.
          </Text>
        </View>

        <View style={[s.center, { marginTop: 12 }]} wrap={false}>
          <Text style={{ fontFamily: "Cormorant", fontStyle: "italic", fontWeight: 500, fontSize: 18, color: C.gold }}>Cheers!</Text>
          <Text style={[s.wordmark, { fontSize: 16, letterSpacing: 4, marginTop: 6 }]}>ALCHEMY</Text>
          <View style={s.barRow}>
            <View style={[s.barLine, { width: 30 }]} />
            <Text style={[s.barText, { fontSize: 6 }]}>BAR</Text>
            <View style={[s.barLine, { width: 30 }]} />
          </View>
        </View>
      </Page>
    </Document>
  );
}
