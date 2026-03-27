const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "Sunnyplast – UK Market Entry Strategy";
pres.author = "Digital Growth Engine";

// ── Palette ─────────────────────────────────────────────
const C = {
  navy:    "1A3A5C",
  orange:  "F97316",
  white:   "FFFFFF",
  lightbg: "F1F5F9",
  dark:    "1E293B",
  muted:   "64748B",
  green:   "10B981",
  lblue:   "DBEAFE",
  red:     "EF4444",
  navylt:  "2D5A8E",
};

// ── Helpers ──────────────────────────────────────────────
function topBar(s, color) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.1,
    fill: { color }, line: { color },
  });
}

function leftBar(s, color) {
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.1, h: 5.625,
    fill: { color }, line: { color },
  });
}

function slideTitle(s, text, x, y, w, color) {
  s.addText(text, {
    x, y, w, h: 0.65,
    fontSize: 36, bold: true, color: color || C.dark,
    fontFace: "Calibri", margin: 0,
  });
}

function card(s, x, y, w, h, opts) {
  const o = opts || {};
  s.addShape(pres.shapes.RECTANGLE, {
    x, y, w, h,
    fill: { color: o.fill || C.white },
    line: { color: o.border || "E2E8F0", width: o.borderWidth || 1 },
    shadow: o.shadow ? { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.1 } : undefined,
  });
}

function stepCircle(s, x, y, num, color) {
  s.addShape(pres.shapes.OVAL, {
    x, y, w: 0.45, h: 0.45,
    fill: { color: color || C.orange }, line: { color: color || C.orange },
  });
  s.addText(String(num), {
    x, y, w: 0.45, h: 0.45,
    fontSize: 14, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
}

function arrow(s, x, y, w) {
  s.addShape(pres.shapes.LINE, {
    x, y, w, h: 0,
    line: { color: C.orange, width: 1.5, dashType: "solid" },
  });
  s.addText(">", {
    x: x + w - 0.15, y: y - 0.12, w: 0.2, h: 0.25,
    fontSize: 10, bold: true, color: C.orange, margin: 0,
  });
}

// Adds a clickable sources footer bar at very bottom of slide
// sources = [{ label: "display text", url: "https://..." }, ...]
function addSources(s, sources, darkBg) {
  const bgColor   = darkBg ? "162D47" : "E8EFF7";
  const linkColor = darkBg ? "7EB3E0" : "1A3A5C";
  const sepColor  = darkBg ? "4A6A8A" : "94A3B8";

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.28, w: 10, h: 0.345,
    fill: { color: bgColor }, line: { color: bgColor },
  });

  // Build rich-text array: "Sources: " label then each link separated by " | "
  const runs = [
    { text: "Sources:  ", options: { fontSize: 9, bold: true, color: sepColor, fontFace: "Calibri" } },
  ];
  sources.forEach((src, i) => {
    runs.push({
      text: src.label,
      options: {
        fontSize: 9, color: linkColor, fontFace: "Calibri",
        underline: { style: "sng" },
        hyperlink: { url: src.url },
      },
    });
    if (i < sources.length - 1) {
      runs.push({ text: "   |   ", options: { fontSize: 9, color: sepColor, fontFace: "Calibri" } });
    }
  });

  s.addText(runs, {
    x: 0.3, y: 5.285, w: 9.4, h: 0.33,
    valign: "middle", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 1 – Title
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };

  leftBar(s, C.orange);

  // Big decorative circles
  s.addShape(pres.shapes.OVAL, {
    x: 7.2, y: -0.5, w: 3.5, h: 3.5,
    fill: { color: C.navylt, transparency: 40 }, line: { color: C.navylt, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.8, y: 3.0, w: 2.5, h: 2.5,
    fill: { color: C.orange, transparency: 80 }, line: { color: C.orange, width: 0 },
  });

  s.addText("SUNNYPLAST", {
    x: 0.35, y: 1.0, w: 7, h: 1.1,
    fontSize: 54, bold: true, color: C.white,
    fontFace: "Calibri", charSpacing: 4, margin: 0,
  });

  s.addText("UK Market Entry Strategy", {
    x: 0.35, y: 2.2, w: 7, h: 0.6,
    fontSize: 24, color: C.orange,
    fontFace: "Calibri", margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.35, y: 2.95, w: 5.5, h: 0,
    line: { color: C.navylt, width: 1 },
  });

  s.addText("From Unknown Entrant  →  Trusted UK Supplier  →  Scalable Brand", {
    x: 0.35, y: 3.1, w: 7.5, h: 0.45,
    fontSize: 13, color: "A0B4C8",
    fontFace: "Calibri", margin: 0,
  });

  s.addText("Powered by a Complete Digital Growth Engine  |  March 2026", {
    x: 0.35, y: 5.0, w: 7, h: 0.35,
    fontSize: 11, color: "5A7A96",
    fontFace: "Calibri", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-A – The Real Challenge
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  leftBar(s, C.orange);

  s.addText("The Real Challenge", {
    x: 0.35, y: 0.25, w: 9, h: 0.6,
    fontSize: 38, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });
  s.addText("Sunnyplast has a strong product — but without infrastructure, the UK market won't know you exist.", {
    x: 0.35, y: 0.95, w: 9.2, h: 0.4,
    fontSize: 13, color: "94A3B8", fontFace: "Calibri", margin: 0,
  });

  const challenges = [
    {
      num: "01",
      title: "Zero Brand Recognition",
      body: "UK fabricators and builders have never heard of Sunnyplast. Liniar and Aluplast have years of trust-building. Without a presence strategy, you're invisible.",
      color: C.red,
      icon: "✗",
    },
    {
      num: "02",
      title: "No Digital Infrastructure",
      body: "No UK-facing website, no Google Business Profile, no social proof. In 2026, buyers research online before they call. A blank digital footprint = a closed door.",
      color: "F59E0B",
      icon: "✗",
    },
    {
      num: "03",
      title: "No Fabricator Relationships",
      body: "The UK window market runs on fabricator loyalty. Switching suppliers carries tooling and compliance costs. Without relationships, even a better product sits on the shelf.",
      color: "8B5CF6",
      icon: "✗",
    },
  ];

  challenges.forEach((c, i) => {
    const cx = 0.35 + i * 3.2;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.55, w: 3.0, h: 3.6,
      fill: { color: "1E2D3D" }, line: { color: c.color, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.55, w: 3.0, h: 0.07,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addShape(pres.shapes.OVAL, {
      x: cx + 1.25, y: 1.75, w: 0.5, h: 0.5,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.icon, {
      x: cx + 1.25, y: 1.75, w: 0.5, h: 0.5,
      fontSize: 16, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });
    s.addText(c.num, {
      x: cx + 0.15, y: 2.4, w: 0.45, h: 0.35,
      fontSize: 11, color: c.color, bold: true, fontFace: "Calibri", margin: 0,
    });
    s.addText(c.title, {
      x: cx + 0.15, y: 2.72, w: 2.7, h: 0.55,
      fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addText(c.body, {
      x: cx + 0.15, y: 3.32, w: 2.7, h: 1.65,
      fontSize: 11, color: "94A3B8", fontFace: "Calibri", margin: 0,
    });
  });

  s.addText("That's exactly what this engagement is built to solve  →", {
    x: 0.35, y: 5.25, w: 9, h: 0.3,
    fontSize: 12, color: C.orange, bold: true, fontFace: "Calibri", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 2 – UK Market Opportunity
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, C.orange);

  slideTitle(s, "UK Market Opportunity", 0.5, 0.25, 9);

  s.addText("The UK PVC window & door market is large, growing, and open to quality-certified new entrants.", {
    x: 0.5, y: 1.0, w: 9, h: 0.4,
    fontSize: 13, color: C.muted, fontFace: "Calibri", margin: 0,
  });

  // 4 stat cards
  const stats = [
    { val: "£2.3B",     sub: "Current market\nvalue (2025)",      color: C.navy   },
    { val: "75%",       sub: "of UK windows\nare uPVC",           color: C.orange },
    { val: "1.9M",      sub: "units installed\nper year",         color: C.green  },
    { val: "~3,000",    sub: "active glazing\nbusinesses in UK",  color: C.navylt },
  ];

  stats.forEach((st, i) => {
    const cx = 0.4 + i * 2.35;
    card(s, cx, 1.55, 2.1, 1.9, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: 1.55, w: 2.1, h: 0.07,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(st.val, {
      x: cx + 0.12, y: 1.7, w: 1.86, h: 0.75,
      fontSize: 34, bold: true, color: st.color,
      fontFace: "Calibri", margin: 0,
    });
    s.addText(st.sub, {
      x: cx + 0.12, y: 2.48, w: 1.86, h: 0.85,
      fontSize: 12, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });

  // Bottom opportunity highlight
  card(s, 0.4, 3.65, 9.2, 1.55, { fill: C.navy });
  s.addText("Market Projected to Reach", {
    x: 0.7, y: 3.8, w: 3, h: 0.4,
    fontSize: 13, color: "A0B4C8", fontFace: "Calibri", margin: 0,
  });
  s.addText("£3.5 Billion by 2030", {
    x: 0.7, y: 4.1, w: 4, h: 0.55,
    fontSize: 26, bold: true, color: C.orange, fontFace: "Calibri", margin: 0,
  });
  s.addShape(pres.shapes.LINE, {
    x: 4.8, y: 3.75, w: 0, h: 1.3,
    line: { color: C.navylt, width: 1 },
  });
  const bullets = ["~5% CAGR through 2030", "Retrofits dominate (3:1 ratio)", "15–25% cost advantage for EU producers"];
  bullets.forEach((b, i) => {
    s.addText("✓  " + b, {
      x: 5.1, y: 3.8 + i * 0.38, w: 4.2, h: 0.35,
      fontSize: 12, color: C.white, fontFace: "Calibri", margin: 0,
    });
  });

  addSources(s, [
    { label: "sheerwaterglass.co.uk – Glazing Industry Statistics 2025",     url: "https://www.sheerwaterglass.co.uk/blog/window-glazing-industry-statistics-and-projections-for-2025/" },
    { label: "6wresearch.com – UK Windows & Doors Market 2025–2031",         url: "https://www.6wresearch.com/industry-report/united-kingdom-uk-windows-and-doors-market-outlook" },
    { label: "glazingtoday.com – Market Prediction Report 2026",              url: "https://glazingtoday.com/intelligence-glazing-today-market-prediction-report-2026/" },
    { label: "straitsresearch.com – PVC Window Profiles Market",              url: "https://straitsresearch.com/report/pvc-window-profiles-market" },
  ]);
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-B – Why UK? Why Now?
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, C.navy);

  slideTitle(s, "Why UK? Why Now?", 0.5, 0.25, 9);
  s.addText("Four powerful tailwinds are opening the door for a new, price-competitive entrant.", {
    x: 0.5, y: 0.96, w: 9, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: "Calibri", margin: 0,
  });

  const tailwinds = [
    {
      num: "1.5M",
      unit: "new homes",
      body: "UK government target by 2029. Every new build needs windows & doors — creating a sustained demand surge for profile suppliers.",
      color: C.navy,
      sub: "UK Housing Targets",
    },
    {
      num: "93%",
      unit: "double glazed",
      body: "Nearly all UK homes already have double glazing — meaning the market is driven by replacement cycles, not new adoption. Retrofits = repeat B2B revenue.",
      color: C.navylt,
      sub: "Retrofit Demand",
    },
    {
      num: "ECO4",
      unit: "gov scheme",
      body: "The UK Government's ECO4 energy efficiency scheme is driving mandatory window upgrades in millions of social and private homes through 2026.",
      color: C.orange,
      sub: "Energy Efficiency Push",
    },
    {
      num: "15–25%",
      unit: "price gap",
      body: "Smaller fabricators are squeezed between rising material costs and stagnant sell prices. A CE-certified EU profile at 15–25% less is a genuine lifeline.",
      color: C.green,
      sub: "Cost Pressure on Fabricators",
    },
  ];

  tailwinds.forEach((t, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const tx = 0.4 + col * 4.75;
    const ty = 1.5 + row * 1.95;

    s.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: ty, w: 4.45, h: 1.75,
      fill: { color: C.white },
      line: { color: "E2E8F0", width: 1 },
      shadow: { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.08 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: tx, y: ty, w: 0.08, h: 1.75,
      fill: { color: t.color }, line: { color: t.color },
    });
    // Big stat
    s.addText(t.num, {
      x: tx + 0.22, y: ty + 0.12, w: 1.8, h: 0.65,
      fontSize: 32, bold: true, color: t.color,
      fontFace: "Calibri", margin: 0,
    });
    s.addText(t.unit, {
      x: tx + 0.22, y: ty + 0.72, w: 1.8, h: 0.28,
      fontSize: 11, color: t.color, fontFace: "Calibri", margin: 0,
    });
    s.addShape(pres.shapes.LINE, {
      x: tx + 2.15, y: ty + 0.2, w: 0, h: 1.25,
      line: { color: "E2E8F0", width: 1 },
    });
    s.addText(t.sub, {
      x: tx + 2.35, y: ty + 0.15, w: 1.9, h: 0.3,
      fontSize: 11, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(t.body, {
      x: tx + 2.35, y: ty + 0.48, w: 1.9, h: 1.1,
      fontSize: 10, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });

  addSources(s, [
    { label: "UK Gov: 1.5M homes target – gov.uk housing delivery",          url: "https://www.gov.uk/government/collections/housing-statistics" },
    { label: "sheerwaterglass.co.uk – 93% double glazing penetration stat",  url: "https://www.sheerwaterglass.co.uk/blog/window-glazing-industry-statistics-and-projections-for-2025/" },
    { label: "gov.uk – ECO4 Energy Efficiency Scheme",                        url: "https://www.gov.uk/government/schemes/energy-company-obligation" },
  ]);
}


// ════════════════════════════════════════════════════════
// SLIDE 3 – Competitor: Aluplast
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.navy);

  s.addText("Competitor Profile", {
    x: 0.5, y: 0.2, w: 9, h: 0.35,
    fontSize: 12, color: C.orange, fontFace: "Calibri",
    bold: true, charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Aluplast  —  Premium German Engineering", 0.5, 0.5, 9);

  // Left column
  const leftSections = [
    { heading: "Products", body: "IDEAL 70, IDEAL 4000, IDEAL Neo systems. Windows, doors, SmartSlide patio. 40 foil finishes. U-values down to 0.7 W/m²K." },
    { heading: "UK Presence", body: "Dedicated UK subsidiary in Gloucestershire. Own sales, technical & distribution teams covering UK + Ireland." },
    { heading: "Key Strength", body: "7-year social housing contract (Tai Tarian). Premium positioning: 'The Designer Difference'." },
  ];

  leftSections.forEach((sec, i) => {
    const cy = 1.35 + i * 1.35;
    card(s, 0.4, cy, 4.5, 1.2, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: cy, w: 0.08, h: 1.2,
      fill: { color: C.navy }, line: { color: C.navy },
    });
    s.addText(sec.heading, {
      x: 0.65, y: cy + 0.1, w: 4.05, h: 0.3,
      fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0,
    });
    s.addText(sec.body, {
      x: 0.65, y: cy + 0.42, w: 4.05, h: 0.65,
      fontSize: 12, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });

  // Right column – stats
  card(s, 5.2, 1.35, 4.4, 3.85, { fill: "F8FAFC", shadow: true });

  s.addText("At a Glance", {
    x: 5.4, y: 1.5, w: 4.0, h: 0.35,
    fontSize: 14, bold: true, color: C.navy, fontFace: "Calibri", margin: 0,
  });

  const facts = [
    { icon: "●", label: "Founded", val: "1982 (Germany)" },
    { icon: "●", label: "Positioning", val: "Premium / Designer" },
    { icon: "●", label: "UK HQ", val: "Gloucestershire" },
    { icon: "●", label: "Coverage", val: "UK + Republic of Ireland" },
    { icon: "●", label: "Digital", val: "aluplast.co.uk + LinkedIn" },
    { icon: "●", label: "FIT Show", val: "Active exhibitor" },
    { icon: "●", label: "Investment", val: "€50M+ new EU facility" },
  ];

  facts.forEach((f, i) => {
    s.addText(f.icon + "  " + f.label, {
      x: 5.4, y: 1.95 + i * 0.43, w: 1.8, h: 0.35,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
    s.addText(f.val, {
      x: 7.25, y: 1.95 + i * 0.43, w: 2.15, h: 0.35,
      fontSize: 11, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });

  addSources(s, [
    { label: "aluplast.co.uk/products – Product range & UK presence",      url: "https://aluplast.co.uk/products/" },
    { label: "aluplast.co.uk/news – Tai Tarian contract & team updates",   url: "https://aluplast.co.uk/news/" },
    { label: "aluplast.net/uk – Global parent company data",               url: "https://www.aluplast.net/uk/" },
  ]);
}


// ════════════════════════════════════════════════════════
// SLIDE 4 – Competitor: Liniar
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.green);

  s.addText("Competitor Profile", {
    x: 0.5, y: 0.2, w: 9, h: 0.35,
    fontSize: 12, color: C.green, fontFace: "Calibri",
    bold: true, charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Liniar  —  The British Champion", 0.5, 0.5, 9);

  const leftSections = [
    { heading: "Products", body: "70mm & 90mm casement windows, flush sash (Resurgence), bi-fold doors, conservatory roofs, full outdoor range (decking, fencing, cladding)." },
    { heading: "Distribution", body: "85+ fabricators within 13 months of launch. 'Approved Fabricator' programme. 99.4% on-time delivery. Postcode supplier finder online." },
    { heading: "Brand & Awards", body: "Queen's Award for Enterprise (Innovation 2017). NFA PVCu Systems Company of the Year 2024. £100M+ turnover, 650+ employees." },
  ];

  leftSections.forEach((sec, i) => {
    const cy = 1.35 + i * 1.35;
    card(s, 0.4, cy, 4.5, 1.2, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.4, y: cy, w: 0.08, h: 1.2,
      fill: { color: C.green }, line: { color: C.green },
    });
    s.addText(sec.heading, {
      x: 0.65, y: cy + 0.1, w: 4.05, h: 0.3,
      fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(sec.body, {
      x: 0.65, y: cy + 0.42, w: 4.05, h: 0.65,
      fontSize: 12, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });

  // Right – stats
  card(s, 5.2, 1.35, 4.4, 3.85, { fill: "F0FDF4", shadow: true });

  s.addText("At a Glance", {
    x: 5.4, y: 1.5, w: 4.0, h: 0.35,
    fontSize: 14, bold: true, color: C.green, fontFace: "Calibri", margin: 0,
  });

  const facts = [
    { label: "Origin",     val: "100% British" },
    { label: "HQ",         val: "Derbyshire" },
    { label: "Employees",  val: "650+" },
    { label: "Turnover",   val: "£100M+" },
    { label: "Fabricators",val: "85+ network" },
    { label: "Delivery",   val: "99.4% on-time" },
    { label: "Parent",     val: "Quanex (US-listed)" },
  ];

  facts.forEach((f, i) => {
    s.addText("●  " + f.label, {
      x: 5.4, y: 1.95 + i * 0.43, w: 1.8, h: 0.35,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
    s.addText(f.val, {
      x: 7.25, y: 1.95 + i * 0.43, w: 2.15, h: 0.35,
      fontSize: 11, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });

  addSources(s, [
    { label: "liniar.co.uk – Product range, fabricator network & delivery KPIs", url: "https://www.liniar.co.uk/" },
    { label: "liniar.co.uk/about/awards – Queen's Award & NFA wins",             url: "https://www.liniar.co.uk/about/awards" },
    { label: "open.endole.co.uk – Liniar Ltd company financials",                url: "https://open.endole.co.uk/insight/company/03360857-liniar-limited" },
  ]);
}


// ════════════════════════════════════════════════════════
// SLIDE 5 – Comparison Table + Gap
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, C.orange);

  slideTitle(s, "Where Sunnyplast Fits  —  The Gap", 0.5, 0.25, 9);

  // Table headers
  const headers = ["Factor", "Aluplast", "Liniar", "Sunnyplast Opportunity"];
  const hColors = [C.dark, C.navy, C.green, C.orange];
  const colX = [0.4, 2.4, 4.85, 7.1];
  const colW = [1.9, 2.35, 2.15, 2.75];

  headers.forEach((h, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: colX[i], y: 1.05, w: colW[i] - 0.05, h: 0.45,
      fill: { color: hColors[i] }, line: { color: hColors[i] },
    });
    s.addText(h, {
      x: colX[i] + 0.1, y: 1.05, w: colW[i] - 0.15, h: 0.45,
      fontSize: 11, bold: true, color: C.white,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  const rows = [
    ["Origin",           "German",        "British",       "Romanian (EU)"],
    ["Price",            "Premium",        "Mid-Premium",   "Competitive Value"],
    ["Fabricators",      "Selective",      "85+",           "Building (0 → ?)"],
    ["Certifications",   "EU Compliant",   "PAS24 + Queen's","CE + ISO (UK TBD)"],
    ["Digital Presence", "Good",           "Strong",        "Minimal → Invest"],
    ["FIT Show",         "2025 Active",    "2025 Active",   "Confirmed 2027"],
    ["Price Advantage",  "None",           "None",          "15–25% vs rivals"],
  ];

  rows.forEach((row, ri) => {
    const rowY = 1.55 + ri * 0.52;
    const bg = ri % 2 === 0 ? C.white : "F8FAFC";
    row.forEach((cell, ci) => {
      s.addShape(pres.shapes.RECTANGLE, {
        x: colX[ci], y: rowY, w: colW[ci] - 0.05, h: 0.48,
        fill: { color: ci === 3 ? "FFF7ED" : bg },
        line: { color: "E2E8F0", width: 1 },
      });
      s.addText(cell, {
        x: colX[ci] + 0.1, y: rowY, w: colW[ci] - 0.2, h: 0.48,
        fontSize: 11,
        color: ci === 3 ? C.orange : C.dark,
        bold: ci === 3,
        fontFace: "Calibri", valign: "middle", margin: 0,
      });
    });
  });

  addSources(s, [
    { label: "fitshow.co.uk – Sunnyplast confirmed FIT Show 2027",      url: "https://www.fitshow.co.uk/exhibitors/sunny-plast" },
    { label: "sunnyplast.eu – Company profile & certifications",         url: "https://sunnyplast.eu/" },
    { label: "aluplast.co.uk – Competitor positioning data",             url: "https://aluplast.co.uk/" },
    { label: "liniar.co.uk – Competitor pricing & network data",         url: "https://www.liniar.co.uk/" },
  ]);
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-C – Sunnyplast's Competitive Edge
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  topBar(s, C.orange);

  s.addText("Sunnyplast's Competitive Edge", {
    x: 0.5, y: 0.2, w: 9, h: 0.6,
    fontSize: 36, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });
  s.addText("Four reasons Sunnyplast can win where others are too expensive, too slow, or too rigid.", {
    x: 0.5, y: 0.88, w: 9, h: 0.35,
    fontSize: 13, color: "94A3B8", fontFace: "Calibri", margin: 0,
  });

  const edges = [
    {
      title: "15–25% Price Advantage",
      stat: "vs German rivals",
      body: "Romanian EU production costs significantly undercut Aluplast and Rehau pricing on equivalent multi-chamber profiles — without sacrificing CE or ISO certification.",
      color: C.orange,
      icon: "£",
    },
    {
      title: "No UK Tariff Barrier",
      stat: "EU → UK under TCA",
      body: "Romania is an EU member state. Under the UK–EU Trade and Cooperation Agreement (TCA), Sunnyplast exports to UK with zero tariffs — provided rules of origin are met.",
      color: C.green,
      icon: "✓",
    },
    {
      title: "UK-Ready Certifications",
      stat: "CE + ISO compliant",
      body: "CE marking and ISO quality certifications are prerequisites for UK fabricators. Sunnyplast already holds these — removing the biggest compliance barrier for buyers.",
      color: "06B6D4",
      icon: "★",
    },
    {
      title: "FIT Show 2027 Confirmed",
      stat: "Direct UK market access",
      body: "Sunnyplast is already listed as a confirmed exhibitor at FIT Show 2027 — the UK's largest window industry trade event. This is the fastest route to fabricator relationships.",
      color: "F59E0B",
      icon: "⚡",
    },
  ];

  edges.forEach((e, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const ex = 0.4 + col * 4.75;
    const ey = 1.45 + row * 2.0;

    s.addShape(pres.shapes.RECTANGLE, {
      x: ex, y: ey, w: 4.45, h: 1.8,
      fill: { color: "1E3A56" }, line: { color: e.color, width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: ex, y: ey, w: 4.45, h: 0.07,
      fill: { color: e.color }, line: { color: e.color },
    });
    // Icon circle
    s.addShape(pres.shapes.OVAL, {
      x: ex + 0.18, y: ey + 0.22, w: 0.55, h: 0.55,
      fill: { color: e.color }, line: { color: e.color },
    });
    s.addText(e.icon, {
      x: ex + 0.18, y: ey + 0.22, w: 0.55, h: 0.55,
      fontSize: 14, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });
    s.addText(e.title, {
      x: ex + 0.87, y: ey + 0.18, w: 3.4, h: 0.38,
      fontSize: 15, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addText(e.stat, {
      x: ex + 0.87, y: ey + 0.56, w: 3.4, h: 0.28,
      fontSize: 11, color: e.color, fontFace: "Calibri", margin: 0,
    });
    s.addText(e.body, {
      x: ex + 0.18, y: ey + 0.98, w: 4.1, h: 0.72,
      fontSize: 11, color: "94A3B8", fontFace: "Calibri", margin: 0,
    });
  });

  addSources(s, [
    { label: "fitshow.co.uk – Sunnyplast FIT Show 2027 listing",         url: "https://www.fitshow.co.uk/exhibitors/sunny-plast" },
    { label: "sunnyplast.eu – CE & ISO certification details",           url: "https://sunnyplast.eu/" },
    { label: "gov.uk – UK-EU Trade and Cooperation Agreement (TCA)",     url: "https://www.gov.uk/government/publications/ukeu-and-ukeuratom-trade-and-cooperation-agreement-ts-no82021" },
  ], true);
}


// ════════════════════════════════════════════════════════
// SLIDE 6 – Our Growth Engine Overview
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  leftBar(s, C.orange);

  s.addText("Your Complete", {
    x: 0.35, y: 0.5, w: 9, h: 0.5,
    fontSize: 16, color: "A0B4C8", fontFace: "Calibri", margin: 0,
  });
  s.addText("Digital Growth Engine", {
    x: 0.35, y: 0.9, w: 9, h: 0.75,
    fontSize: 38, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });

  const steps = [
    { num: 1, label: "Google Maps\n& Presence",    color: C.orange },
    { num: 2, label: "Smart\nProspecting",         color: "F59E0B" },
    { num: 3, label: "Website +\nAdmin Panel",     color: C.green  },
    { num: 4, label: "AI Agent\nWhatsApp + Web",   color: "06B6D4" },
    { num: 5, label: "AI Calling\nAgent",           color: "8B5CF6" },
    { num: 6, label: "ERP / CRM\nSystem",           color: C.orange },
  ];

  const totalW = 9.4;
  const boxW = 1.45;
  const gap = 0.12;
  const startX = 0.35;
  const boxY = 2.1;

  steps.forEach((st, i) => {
    const cx = startX + i * (boxW + gap);

    card(s, cx, boxY, boxW, 2.7, { fill: C.navylt, border: st.color });

    // Colored top
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: boxY, w: boxW, h: 0.08,
      fill: { color: st.color }, line: { color: st.color },
    });

    // Number circle
    s.addShape(pres.shapes.OVAL, {
      x: cx + 0.48, y: boxY + 0.2, w: 0.5, h: 0.5,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(String(st.num), {
      x: cx + 0.48, y: boxY + 0.2, w: 0.5, h: 0.5,
      fontSize: 16, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });

    s.addText(st.label, {
      x: cx + 0.08, y: boxY + 0.85, w: boxW - 0.16, h: 1.0,
      fontSize: 12, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });

    // Arrow connector (not after last)
    if (i < steps.length - 1) {
      s.addText("→", {
        x: cx + boxW - 0.02, y: boxY + 1.1, w: gap + 0.14, h: 0.4,
        fontSize: 13, bold: true, color: C.orange,
        fontFace: "Calibri", align: "center", margin: 0,
      });
    }
  });

  // Bottom flow labels
  const phases = ["VISIBILITY", "LEAD GENERATION", "CONVERSION", "SCALE"];
  const phaseX = [0.35, 2.45, 5.4, 7.9];
  const phaseW = [1.9, 2.8, 2.4, 1.9];
  phases.forEach((ph, i) => {
    s.addText(ph, {
      x: phaseX[i], y: 5.05, w: phaseW[i], h: 0.35,
      fontSize: 10, color: C.orange, bold: true,
      fontFace: "Calibri", align: "center",
      charSpacing: 1, margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 7 – Step 1: Google Maps & Local Presence
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.orange);

  stepCircle(s, 0.4, 0.25, 1, C.orange);
  s.addText("Google Maps & Local Presence", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // Before column
  card(s, 0.4, 0.95, 4.2, 4.0, { fill: "FEF2F2", border: C.red });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.95, w: 4.2, h: 0.45,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("BEFORE", {
    x: 0.5, y: 0.95, w: 4.0, h: 0.45,
    fontSize: 14, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
  const before = [
    "Not found on Google Maps",
    "Zero local search visibility",
    "No product images online",
    "Builders can't discover you",
    "Trust gap with UK buyers",
  ];
  before.forEach((b, i) => {
    s.addText("✗  " + b, {
      x: 0.6, y: 1.55 + i * 0.55, w: 3.8, h: 0.45,
      fontSize: 13, color: "991B1B", fontFace: "Calibri", margin: 0,
    });
  });

  // Arrow
  s.addText("→", {
    x: 4.65, y: 2.7, w: 0.5, h: 0.5,
    fontSize: 28, bold: true, color: C.orange,
    fontFace: "Calibri", align: "center", margin: 0,
  });

  // After column
  card(s, 5.3, 0.95, 4.25, 4.0, { fill: "F0FDF4", border: C.green });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.3, y: 0.95, w: 4.25, h: 0.45,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("AFTER", {
    x: 5.4, y: 0.95, w: 4.05, h: 0.45,
    fontSize: 14, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
  const after = [
    "Verified Google Business Profile",
    "Warehouse pinned on Maps",
    "Real product photos uploaded",
    "Reviews collected & managed",
    "Rank in local builder searches",
  ];
  after.forEach((a, i) => {
    s.addText("✓  " + a, {
      x: 5.5, y: 1.55 + i * 0.55, w: 3.85, h: 0.45,
      fontSize: 13, color: "166534", fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 8 – Step 2: Smart Prospecting Tool
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, "F59E0B");

  stepCircle(s, 0.4, 0.25, 2, "F59E0B");
  s.addText("Smart Prospecting Tool", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // Funnel – left side
  const funnelSteps = [
    { label: "DATA",         sub: "UK builders, hardware\nshops scraped & mapped",  color: C.navy,   w: 3.5, x: 0.35 },
    { label: "LEADS",        sub: "Segmented by region,\nscale & decision-maker",   color: C.navylt, w: 2.9, x: 0.65 },
    { label: "PIPELINE",     sub: "Qualified B2B database\nauto-updated",           color: "F59E0B", w: 2.3, x: 0.95 },
    { label: "CONVERSION",   sub: "Outreach-ready targets\nwith contact details",   color: C.orange, w: 1.8, x: 1.2  },
  ];

  funnelSteps.forEach((f, i) => {
    const fy = 1.1 + i * 0.98;
    s.addShape(pres.shapes.RECTANGLE, {
      x: f.x, y: fy, w: f.w, h: 0.8,
      fill: { color: f.color }, line: { color: f.color },
    });
    s.addText(f.label, {
      x: f.x + 0.1, y: fy + 0.05, w: f.w - 0.2, h: 0.35,
      fontSize: 13, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", margin: 0,
    });
    s.addText(f.sub, {
      x: f.x + 0.1, y: fy + 0.38, w: f.w - 0.2, h: 0.38,
      fontSize: 9, color: "E2E8F0",
      fontFace: "Calibri", align: "center", margin: 0,
    });
  });

  // Right side – benefits
  const benefits = [
    { title: "Zero Manual Research", body: "Auto-identifies builders, window installers & hardware shops across UK regions." },
    { title: "Segmented Database",   body: "Filtered by company size, region and buying decision-makers." },
    { title: "Consistent Pipeline",  body: "Steady flow of high-intent B2B prospects, refreshed automatically." },
    { title: "Fast Market Entry",    body: "Compress months of prospecting into days — start selling faster." },
  ];

  benefits.forEach((b, i) => {
    const by = 1.05 + i * 1.1;
    card(s, 4.8, by, 5.0, 0.95, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 4.8, by, x: 4.8, y: by, w: 0.07, h: 0.95,
      fill: { color: "F59E0B" }, line: { color: "F59E0B" },
    });
    s.addText(b.title, {
      x: 5.0, y: by + 0.08, w: 4.6, h: 0.3,
      fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(b.body, {
      x: 5.0, y: by + 0.4, w: 4.6, h: 0.45,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-E – Prospecting: Without vs With
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, "F59E0B");

  s.addText("Prospecting System", {
    x: 0.5, y: 0.2, w: 9, h: 0.35,
    fontSize: 12, bold: true, color: "F59E0B",
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Random Outreach  vs  Targeted Pipeline", 0.5, 0.5, 9);

  // WITHOUT column
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.28, w: 4.45, h: 0.48,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("❌   WITHOUT Smart Prospecting", {
    x: 0.45, y: 1.28, w: 4.25, h: 0.48,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });
  const withoutItems = [
    "Cold calling random directories — 95% irrelevant",
    "No idea which businesses actually buy PVC profiles",
    "Sales team wastes days chasing gatekeepers",
    "No structured pipeline — feast or famine cycle",
    "Low conversion rate on expensive sales time",
  ];
  withoutItems.forEach((text, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: 1.82 + i * 0.58, w: 4.45, h: 0.5,
      fill: { color: i % 2 === 0 ? "FEF2F2" : "FFF5F5" },
      line: { color: "FECACA", width: 1 },
    });
    s.addText("✗  " + text, {
      x: 0.5, y: 1.82 + i * 0.58, w: 4.15, h: 0.5,
      fontSize: 11.5, color: "991B1B",
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  // WITH column
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.28, w: 4.45, h: 0.48,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("✅   WITH Smart Prospecting Tool", {
    x: 5.3, y: 1.28, w: 4.25, h: 0.48,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });
  const withItems = [
    "Auto-identifies builders, glaziers & hardware shops",
    "Database segmented by region, size & decision-maker",
    "Sales team only talks to qualified, relevant buyers",
    "Predictable B2B pipeline — 40–80 leads/month",
    "Higher conversion — better ROI on every sales hour",
  ];
  withItems.forEach((text, i) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.2, y: 1.82 + i * 0.58, w: 4.45, h: 0.5,
      fill: { color: i % 2 === 0 ? "F0FDF4" : "F7FFF9" },
      line: { color: "BBF7D0", width: 1 },
    });
    s.addText("✓  " + text, {
      x: 5.35, y: 1.82 + i * 0.58, w: 4.15, h: 0.5,
      fontSize: 11.5, color: "14532D",
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  // VS circle
  s.addShape(pres.shapes.OVAL, {
    x: 4.63, y: 2.62, w: 0.72, h: 0.72,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("VS", {
    x: 4.63, y: 2.62, w: 0.72, h: 0.72,
    fontSize: 11, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 9 – Step 3: Website + Admin Panel
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.green);

  stepCircle(s, 0.4, 0.25, 3, C.green);
  s.addText("Website + Admin Panel", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // Browser wireframe mock
  card(s, 0.4, 0.9, 5.0, 3.9, { border: "CBD5E1" });
  // Browser bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.9, w: 5.0, h: 0.38,
    fill: { color: "F1F5F9" }, line: { color: "CBD5E1" },
  });
  s.addShape(pres.shapes.OVAL, { x: 0.55, y: 1.0, w: 0.15, h: 0.15, fill: { color: C.red }, line: { color: C.red } });
  s.addShape(pres.shapes.OVAL, { x: 0.75, y: 1.0, w: 0.15, h: 0.15, fill: { color: "F59E0B" }, line: { color: "F59E0B" } });
  s.addShape(pres.shapes.OVAL, { x: 0.95, y: 1.0, w: 0.15, h: 0.15, fill: { color: C.green }, line: { color: C.green } });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 1.2, y: 0.98, w: 3.8, h: 0.22,
    fill: { color: C.white }, line: { color: "CBD5E1" },
  });
  s.addText("www.sunnyplast.co.uk", {
    x: 1.25, y: 0.98, w: 3.7, h: 0.22,
    fontSize: 9, color: C.muted, fontFace: "Calibri", valign: "middle", margin: 0,
  });
  // Hero area
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 1.28, w: 5.0, h: 1.2,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("SUNNYPLAST UK", {
    x: 0.6, y: 1.38, w: 3, h: 0.4,
    fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });
  s.addText("Premium PVC Profiles for UK Fabricators", {
    x: 0.6, y: 1.78, w: 3.5, h: 0.28,
    fontSize: 10, color: C.orange, fontFace: "Calibri", margin: 0,
  });
  // Product grid
  const prodColors = ["E2E8F0", "DBEAFE", "D1FAE5"];
  for (let pi = 0; pi < 3; pi++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.5 + pi * 1.6, y: 2.58, w: 1.45, h: 0.9,
      fill: { color: prodColors[pi] }, line: { color: "CBD5E1" },
    });
    s.addText(["BioFlex", "RecoBoard", "ClearCore"][pi], {
      x: 0.5 + pi * 1.6, y: 3.3, w: 1.45, h: 0.25,
      fontSize: 8, color: C.dark, fontFace: "Calibri", align: "center", margin: 0,
    });
  }
  // Contact form mock
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 3.6, w: 4.8, h: 0.9,
    fill: { color: "F8FAFC" }, line: { color: "E2E8F0" },
  });
  s.addText("Contact / Inquiry Form", {
    x: 0.6, y: 3.7, w: 3, h: 0.3,
    fontSize: 9, bold: true, color: C.muted, fontFace: "Calibri", margin: 0,
  });
  for (let fi = 0; fi < 2; fi++) {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.6 + fi * 2.3, y: 4.05, w: 2.1, h: 0.25,
      fill: { color: C.white }, line: { color: "CBD5E1" },
    });
  }

  // Features list
  const features = [
    { icon: "◆", title: "Professional Website",  body: "Clean UK-focused design, mobile-ready" },
    { icon: "◆", title: "Product Catalogue",      body: "Full range with specs, finishes, pricing" },
    { icon: "◆", title: "Inquiry Flow",           body: "Lead capture forms, WhatsApp integration" },
    { icon: "◆", title: "Admin Panel",            body: "Update products, manage enquiries — no dev needed" },
  ];

  features.forEach((f, i) => {
    const fy = 0.95 + i * 1.15;
    card(s, 5.65, fy, 4.1, 1.0, { shadow: true });
    s.addShape(pres.shapes.OVAL, {
      x: 5.72, y: fy + 0.28, w: 0.4, h: 0.4,
      fill: { color: C.green }, line: { color: C.green },
    });
    s.addText(f.icon, {
      x: 5.72, y: fy + 0.28, w: 0.4, h: 0.4,
      fontSize: 10, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(f.title, {
      x: 6.2, y: fy + 0.1, w: 3.4, h: 0.3,
      fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(f.body, {
      x: 6.2, y: fy + 0.45, w: 3.4, h: 0.4,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-F – Communication Problem (Manual Headache)
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  topBar(s, C.red);

  s.addText("The Communication Problem", {
    x: 0.5, y: 0.22, w: 9, h: 0.6,
    fontSize: 36, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });
  s.addText("Every missed message is a missed sale. Manual communication doesn't scale.", {
    x: 0.5, y: 0.9, w: 9, h: 0.35,
    fontSize: 13, color: "94A3B8", fontFace: "Calibri", margin: 0,
  });

  // 6 pain points in 2 columns of 3
  const pains = [
    { icon: "⏱", title: "Slow Response Time",    body: "Leads go cold in minutes. If you don't respond within the hour, competitors will." },
    { icon: "📵", title: "Missed Leads",          body: "After hours, weekends, holidays — any lead that arrives outside 9–5 is simply lost." },
    { icon: "🔀", title: "Inconsistent Replies",  body: "Different staff give different answers. Buyers lose trust. Brand feels unreliable." },
    { icon: "📋", title: "No Conversation Trail", body: "No record of what was promised, discussed or quoted. Follow-ups fall through gaps." },
    { icon: "👥", title: "Team Dependency",       body: "One sick day or staff turnover can stall your entire pipeline and lead response." },
    { icon: "📉", title: "Low Conversion",        body: "Manual processes cap how many leads can be handled. Volume = chaos." },
  ];

  pains.forEach((p, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const px = 0.35 + col * 4.8;
    const py = 1.45 + row * 1.28;

    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: py, w: 4.55, h: 1.1,
      fill: { color: "1E2D3D" }, line: { color: "374B5C", width: 1 },
    });
    s.addShape(pres.shapes.OVAL, {
      x: px + 0.15, y: py + 0.3, w: 0.5, h: 0.5,
      fill: { color: C.red }, line: { color: C.red },
    });
    s.addText(p.icon, {
      x: px + 0.15, y: py + 0.3, w: 0.5, h: 0.5,
      fontSize: 13, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(p.title, {
      x: px + 0.78, y: py + 0.1, w: 3.6, h: 0.35,
      fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });
    s.addText(p.body, {
      x: px + 0.78, y: py + 0.5, w: 3.6, h: 0.48,
      fontSize: 10.5, color: "7A9AB8", fontFace: "Calibri", margin: 0,
    });
  });

  s.addText("The solution: an AI agent that never sleeps, never forgets, and always qualifies  →", {
    x: 0.5, y: 5.27, w: 9, h: 0.28,
    fontSize: 11, color: C.orange, bold: true, fontFace: "Calibri", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 10 – Step 4: AI Agent (WhatsApp + Website)
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, "06B6D4");

  stepCircle(s, 0.4, 0.25, 4, "06B6D4");
  s.addText("AI Agent  —  WhatsApp + Website", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // Chat flow – left
  const chats = [
    { from: "user",    text: "Hi, do you supply 70mm casement profiles?" },
    { from: "bot",     text: "Yes! We stock IDEAL-equivalent 70mm multi-chamber profiles. Want specs or a quote?" },
    { from: "user",    text: "Quote please — need 200m for a project in Manchester" },
    { from: "bot",     text: "Great! I'll connect you with our sales team. Can I take your name & email?" },
    { from: "user",    text: "John Smith — j.smith@glaze.co.uk" },
    { from: "bot",     text: "Thanks John! A quote will reach you within 2 hours. Shall I also book a call?" },
  ];

  card(s, 0.35, 0.85, 4.5, 4.55, { fill: C.white, shadow: true });
  // WhatsApp header
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 0.85, w: 4.5, h: 0.48,
    fill: { color: "075E54" }, line: { color: "075E54" },
  });
  s.addText("Sunnyplast  |  WhatsApp Business", {
    x: 0.5, y: 0.85, w: 4.2, h: 0.48,
    fontSize: 11, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });

  chats.forEach((c, i) => {
    const isUser = c.from === "user";
    const msgX = isUser ? 0.5 : 0.65;
    const msgW = 3.5;
    const msgY = 1.45 + i * 0.55;
    const msgBg = isUser ? "DCF8C6" : "FFFFFF";
    const align = isUser ? "right" : "left";
    const tx = isUser ? 0.85 : 0.65;
    s.addShape(pres.shapes.RECTANGLE, {
      x: isUser ? 1.2 : 0.5, y: msgY, w: 3.0, h: 0.42,
      fill: { color: msgBg }, line: { color: "E2E8F0" },
    });
    s.addText(c.text, {
      x: isUser ? 1.25 : 0.55, y: msgY + 0.03, w: 2.9, h: 0.36,
      fontSize: 8.5, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });

  // Right side – capability cards
  const caps = [
    { title: "24/7 Availability",     body: "No missed leads — agent handles queries any time", color: "06B6D4" },
    { title: "Product Suggestions",   body: "AI recommends matching profiles based on spec input", color: C.navy },
    { title: "Lead Capture",          body: "Collects name, email, requirement before handing off", color: C.green },
    { title: "WhatsApp + Web",        body: "Same AI agent on both channels, unified lead view", color: C.orange },
  ];

  caps.forEach((c, i) => {
    const cy = 0.9 + i * 1.12;
    card(s, 5.1, cy, 4.55, 1.0, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.1, y: cy, w: 4.55, h: 0.07,
      fill: { color: c.color }, line: { color: c.color },
    });
    s.addText(c.title, {
      x: 5.25, y: cy + 0.15, w: 4.15, h: 0.3,
      fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(c.body, {
      x: 5.25, y: cy + 0.5, w: 4.15, h: 0.38,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-G – AI Lead Qualification Funnel
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, "06B6D4");

  s.addText("AI Agent", {
    x: 0.5, y: 0.2, w: 9, h: 0.32,
    fontSize: 12, bold: true, color: "06B6D4",
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Only Serious Buyers Reach Your Sales Team", 0.5, 0.48, 9);

  // Funnel stages - left side
  const stages = [
    { label: "ALL WEBSITE &\nWHATSAPP VISITORS", count: "100%",  color: "94A3B8", w: 3.8, x: 0.3 },
    { label: "ENGAGED WITH\nAI AGENT",          count: "70%",   color: "06B6D4", w: 3.1, x: 0.65 },
    { label: "PRODUCT\nINTEREST SHOWN",          count: "40%",   color: C.navylt, w: 2.4, x: 1.0  },
    { label: "QUALIFIED\nLEADS",                 count: "20%",   color: C.orange, w: 1.7, x: 1.35 },
    { label: "SENT TO YOUR\nSALES TEAM",         count: "HIGH\nINTENT", color: C.green, w: 1.1, x: 1.65 },
  ];

  stages.forEach((st, i) => {
    const sy = 1.3 + i * 0.8;
    s.addShape(pres.shapes.RECTANGLE, {
      x: st.x, y: sy, w: st.w, h: 0.65,
      fill: { color: st.color }, line: { color: st.color },
    });
    s.addText(st.label, {
      x: st.x + 0.08, y: sy + 0.05, w: st.w - 0.55, h: 0.58,
      fontSize: 9.5, bold: true, color: C.white,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
    s.addText(st.count, {
      x: st.x + st.w - 0.5, y: sy + 0.08, w: 0.45, h: 0.5,
      fontSize: 11, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });
  });

  // Key message box
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 5.22, w: 4.5, h: 0.3,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("Result: your team only speaks to people ready to buy", {
    x: 0.4, y: 5.22, w: 4.3, h: 0.3,
    fontSize: 10, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });

  // Right side — what AI does at each stage
  const actions = [
    { stage: "Entry",        action: "Greets visitor, asks what they're looking for",             color: "94A3B8" },
    { stage: "Engagement",   action: "Shows relevant products, answers spec questions",           color: "06B6D4" },
    { stage: "Interest",     action: "Asks about project type, quantity, timeline",               color: C.navylt },
    { stage: "Qualification",action: "Filters window shoppers — only captures serious intent",    color: C.orange },
    { stage: "Handoff",      action: "Passes name, email, requirement to sales team instantly",   color: C.green  },
  ];

  s.addText("What the AI Does at Each Stage", {
    x: 5.3, y: 1.18, w: 4.35, h: 0.35,
    fontSize: 12, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  actions.forEach((a, i) => {
    const ay = 1.6 + i * 0.78;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: ay, w: 4.35, h: 0.65,
      fill: { color: C.white }, line: { color: "E2E8F0", width: 1 },
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.3, y: ay, w: 0.07, h: 0.65,
      fill: { color: a.color }, line: { color: a.color },
    });
    s.addText(a.stage, {
      x: 5.48, y: ay + 0.05, w: 1.3, h: 0.25,
      fontSize: 10, bold: true, color: a.color, fontFace: "Calibri", margin: 0,
    });
    s.addText(a.action, {
      x: 5.48, y: ay + 0.32, w: 4.0, h: 0.28,
      fontSize: 10.5, color: C.dark, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 11 – Step 5: AI Calling Agent
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, "8B5CF6");

  stepCircle(s, 0.4, 0.25, 5, "8B5CF6");
  s.addText("AI Calling Agent  —  Never Miss a Lead", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // Journey flow
  const journey = [
    { step: "Lead Enters\nDatabase",    color: C.navy,   icon: "1" },
    { step: "AI Calls\nAutomatically",  color: "8B5CF6", icon: "2" },
    { step: "Qualifies &\nProbes Need", color: "8B5CF6", icon: "3" },
    { step: "Books Meeting\nor Quote",  color: C.orange, icon: "4" },
    { step: "Closes /\nHandoff to Rep", color: C.green,  icon: "5" },
  ];

  journey.forEach((j, i) => {
    const jx = 0.4 + i * 1.85;
    card(s, jx, 1.05, 1.65, 1.8, { fill: "FAFAFA", border: j.color });
    s.addShape(pres.shapes.RECTANGLE, {
      x: jx, y: 1.05, w: 1.65, h: 0.07,
      fill: { color: j.color }, line: { color: j.color },
    });
    s.addShape(pres.shapes.OVAL, {
      x: jx + 0.58, y: 1.2, w: 0.5, h: 0.5,
      fill: { color: j.color }, line: { color: j.color },
    });
    s.addText(j.icon, {
      x: jx + 0.58, y: 1.2, w: 0.5, h: 0.5,
      fontSize: 14, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });
    s.addText(j.step, {
      x: jx + 0.08, y: 1.82, w: 1.5, h: 0.9,
      fontSize: 11, bold: true, color: C.dark,
      fontFace: "Calibri", align: "center", margin: 0,
    });
    if (i < journey.length - 1) {
      s.addText("→", {
        x: jx + 1.65, y: 1.75, w: 0.2, h: 0.35,
        fontSize: 14, bold: true, color: C.orange,
        fontFace: "Calibri", align: "center", margin: 0,
      });
    }
  });

  // Impact stats row
  const impacts = [
    { val: "3x",   label: "Faster follow-up\nvs manual teams" },
    { val: "40%",  label: "Higher conversion\nrate on outbound"  },
    { val: "60%",  label: "Reduction in\nsales headcount cost"  },
    { val: "24/7", label: "Calling window\nnot limited by hours" },
  ];

  impacts.forEach((imp, i) => {
    const ix = 0.4 + i * 2.35;
    card(s, ix, 3.15, 2.15, 1.9, { fill: "F5F3FF", border: "8B5CF6" });
    s.addText(imp.val, {
      x: ix + 0.12, y: 3.25, w: 1.9, h: 0.85,
      fontSize: 42, bold: true, color: "8B5CF6",
      fontFace: "Calibri", align: "center", margin: 0,
    });
    s.addText(imp.label, {
      x: ix + 0.12, y: 4.12, w: 1.9, h: 0.75,
      fontSize: 11, color: C.muted,
      fontFace: "Calibri", align: "center", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-H – AI Calling: Manual vs AI Conversion
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, "8B5CF6");

  s.addText("AI Calling Agent", {
    x: 0.5, y: 0.2, w: 9, h: 0.32,
    fontSize: 12, bold: true, color: "8B5CF6",
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Manual Calling  vs  AI Calling Agent", 0.5, 0.48, 9);

  // Left — Manual issues
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.25, w: 4.3, h: 0.45,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("❌   Manual Calling", {
    x: 0.5, y: 1.25, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });

  const manualIssues = [
    ["Max calls/day",      "30–50",    C.red ],
    ["Follow-up speed",    "Hours/days", C.red ],
    ["Working hours",      "9am–5pm",  C.red ],
    ["Consistency",        "Variable", C.red ],
    ["Scalability",        "Hire more staff", C.red ],
    ["Conversion rate",    "~8–12%",   C.red ],
  ];
  manualIssues.forEach(([label, val, color], i) => {
    const ry = 1.76 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: ry, w: 4.3, h: 0.44,
      fill: { color: i % 2 === 0 ? "FEF2F2" : "FFF5F5" },
      line: { color: "FECACA", width: 1 },
    });
    s.addText(label, {
      x: 0.5, y: ry, w: 2.2, h: 0.44,
      fontSize: 11.5, color: C.dark, fontFace: "Calibri", valign: "middle", margin: 0,
    });
    s.addText(val, {
      x: 2.75, y: ry, w: 1.75, h: 0.44,
      fontSize: 11.5, bold: true, color: color,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  // VS divider
  s.addShape(pres.shapes.OVAL, {
    x: 4.63, y: 2.85, w: 0.72, h: 0.72,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("VS", {
    x: 4.63, y: 2.85, w: 0.72, h: 0.72,
    fontSize: 11, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });

  // Right — AI Agent
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.35, y: 1.25, w: 4.3, h: 0.45,
    fill: { color: "8B5CF6" }, line: { color: "8B5CF6" },
  });
  s.addText("✅   AI Calling Agent", {
    x: 5.5, y: 1.25, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });

  const aiStats = [
    ["Max calls/day",      "500–1,000+",   C.green   ],
    ["Follow-up speed",    "Instant",       C.green   ],
    ["Working hours",      "24 / 7 / 365", C.green   ],
    ["Consistency",        "100% scripted", C.green   ],
    ["Scalability",        "Click to scale","8B5CF6"  ],
    ["Conversion rate",    "~25–35%",       C.green   ],
  ];
  aiStats.forEach(([label, val, color], i) => {
    const ry = 1.76 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.35, y: ry, w: 4.3, h: 0.44,
      fill: { color: i % 2 === 0 ? "F5F3FF" : "FAF8FF" },
      line: { color: "DDD6FE", width: 1 },
    });
    s.addText(label, {
      x: 5.5, y: ry, w: 2.2, h: 0.44,
      fontSize: 11.5, color: C.dark, fontFace: "Calibri", valign: "middle", margin: 0,
    });
    s.addText(val, {
      x: 7.75, y: ry, w: 1.75, h: 0.44,
      fontSize: 11.5, bold: true, color: color,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  // Bottom conversion bar chart (visual)
  s.addText("Conversion Rate Improvement", {
    x: 0.35, y: 5.0, w: 4.0, h: 0.25,
    fontSize: 10, bold: true, color: C.muted, fontFace: "Calibri", margin: 0,
  });
  // Manual bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 5.28, w: 1.3, h: 0.18,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("Manual  8–12%", {
    x: 1.7, y: 5.28, w: 2.5, h: 0.18,
    fontSize: 9, color: C.muted, fontFace: "Calibri", margin: 0,
  });
  // AI bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.35, y: 5.0, w: 4.0, h: 0.25,
    fill: { color: "F5F3FF" }, line: { color: "F5F3FF" },
  });
  s.addText("Result: 2–3x more deals closed with the same (or fewer) leads", {
    x: 5.35, y: 5.0, w: 4.3, h: 0.5,
    fontSize: 10, bold: true, color: "8B5CF6", fontFace: "Calibri", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 12 – Step 6: ERP / CRM System
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, C.orange);

  stepCircle(s, 0.4, 0.25, 6, C.orange);
  s.addText("Full ERP / CRM System  —  Operations Hub", {
    x: 1.05, y: 0.25, w: 8.5, h: 0.45,
    fontSize: 28, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
  });

  // 6 module cards (2x3 grid)
  const modules = [
    { title: "Invoice Management", body: "Auto-generate & track invoices, payment status, VAT", color: C.navy   },
    { title: "Order Tracking",     body: "Real-time status from order to delivery confirmation", color: C.navylt },
    { title: "Purchase Flow",      body: "Manage supplier POs, stock levels, reorder alerts",   color: "F59E0B" },
    { title: "Customer Database",  body: "Full CRM — contacts, history, follow-up tasks",       color: C.green  },
    { title: "Analytics Dashboard",body: "Sales KPIs, conversion rates, revenue by region",    color: "8B5CF6" },
    { title: "Product Catalogue",  body: "Synced to website — one update, everywhere live",     color: C.orange },
  ];

  modules.forEach((m, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const mx = 0.35 + col * 3.2;
    const my = 1.05 + row * 2.2;
    card(s, mx, my, 3.05, 2.0, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: mx, y: my, w: 3.05, h: 0.07,
      fill: { color: m.color }, line: { color: m.color },
    });
    s.addShape(pres.shapes.OVAL, {
      x: mx + 0.15, y: my + 0.2, w: 0.45, h: 0.45,
      fill: { color: m.color }, line: { color: m.color },
    });
    s.addText("■", {
      x: mx + 0.15, y: my + 0.2, w: 0.45, h: 0.45,
      fontSize: 12, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(m.title, {
      x: mx + 0.72, y: my + 0.2, w: 2.2, h: 0.45,
      fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(m.body, {
      x: mx + 0.15, y: my + 0.8, w: 2.75, h: 0.95,
      fontSize: 11, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-I – ERP/CRM: Without vs With
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.lightbg };
  topBar(s, C.orange);

  s.addText("ERP + CRM System", {
    x: 0.5, y: 0.2, w: 9, h: 0.32,
    fontSize: 12, bold: true, color: C.orange,
    fontFace: "Calibri", charSpacing: 2, margin: 0,
  });
  slideTitle(s, "Scattered Operations  vs  Centralized Control", 0.5, 0.48, 9);

  // WITHOUT
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.35, y: 1.25, w: 4.3, h: 0.45,
    fill: { color: C.red }, line: { color: C.red },
  });
  s.addText("❌   Without ERP / CRM", {
    x: 0.5, y: 1.25, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });
  const withoutERP = [
    { area: "Invoicing",   issue: "Manual spreadsheets — errors & delays" },
    { area: "Orders",      issue: "No real-time status — customers kept waiting" },
    { area: "Stock",       issue: "Overstock or stockouts — cash flow problems" },
    { area: "Customers",   issue: "Contacts scattered across phones & emails" },
    { area: "Analytics",   issue: "No visibility into what's selling or why" },
    { area: "Scalability", issue: "Add one fabricator — add 10x admin work" },
  ];
  withoutERP.forEach((row, i) => {
    const ry = 1.76 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0.35, y: ry, w: 4.3, h: 0.44,
      fill: { color: i % 2 === 0 ? "FEF2F2" : "FFF5F5" },
      line: { color: "FECACA", width: 1 },
    });
    s.addText(row.area, {
      x: 0.5, y: ry, w: 1.1, h: 0.44,
      fontSize: 11, bold: true, color: C.red,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
    s.addText(row.issue, {
      x: 1.65, y: ry, w: 2.85, h: 0.44,
      fontSize: 11, color: "7F1D1D",
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });

  // VS
  s.addShape(pres.shapes.OVAL, {
    x: 4.63, y: 2.85, w: 0.72, h: 0.72,
    fill: { color: C.dark }, line: { color: C.dark },
  });
  s.addText("VS", {
    x: 4.63, y: 2.85, w: 0.72, h: 0.72,
    fontSize: 11, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });

  // WITH
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.35, y: 1.25, w: 4.3, h: 0.45,
    fill: { color: C.green }, line: { color: C.green },
  });
  s.addText("✅   With ERP + CRM", {
    x: 5.5, y: 1.25, w: 4.1, h: 0.45,
    fontSize: 13, bold: true, color: C.white,
    fontFace: "Calibri", valign: "middle", margin: 0,
  });
  const withERP = [
    { area: "Invoicing",   benefit: "Auto-generated, tracked, VAT-ready"      },
    { area: "Orders",      benefit: "Real-time tracking from order to delivery" },
    { area: "Stock",       benefit: "Reorder alerts — always right stock levels" },
    { area: "Customers",   benefit: "Full CRM — history, tasks, follow-ups"    },
    { area: "Analytics",   benefit: "Live dashboard — revenue, conversion, KPIs" },
    { area: "Scalability", benefit: "Add 10 fabricators — same admin effort"   },
  ];
  withERP.forEach((row, i) => {
    const ry = 1.76 + i * 0.52;
    s.addShape(pres.shapes.RECTANGLE, {
      x: 5.35, y: ry, w: 4.3, h: 0.44,
      fill: { color: i % 2 === 0 ? "F0FDF4" : "F7FFF9" },
      line: { color: "BBF7D0", width: 1 },
    });
    s.addText(row.area, {
      x: 5.5, y: ry, w: 1.1, h: 0.44,
      fontSize: 11, bold: true, color: C.green,
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
    s.addText(row.benefit, {
      x: 6.65, y: ry, w: 2.85, h: 0.44,
      fontSize: 11, color: "14532D",
      fontFace: "Calibri", valign: "middle", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 13 – Growth Journey Roadmap
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  topBar(s, C.orange);

  s.addText("Your Growth Journey", {
    x: 0.5, y: 0.2, w: 9, h: 0.6,
    fontSize: 36, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });
  s.addText("From invisible to indispensable — a complete transformation roadmap", {
    x: 0.5, y: 0.85, w: 9, h: 0.35,
    fontSize: 13, color: "A0B4C8", fontFace: "Calibri", margin: 0,
  });

  // Timeline bar
  s.addShape(pres.shapes.LINE, {
    x: 0.7, y: 2.4, w: 8.6, h: 0,
    line: { color: C.navylt, width: 3 },
  });

  const milestones = [
    { label: "VISIBILITY",       sub: "Google Maps\n+ Local SEO",           color: C.orange, x: 0.55 },
    { label: "LEAD\nGENERATION", sub: "Prospecting Tool\n+ Website Live",   color: "F59E0B", x: 2.3  },
    { label: "CONVERSION",       sub: "AI Agent\n+ Calling Bot",            color: C.green,  x: 4.1  },
    { label: "OPERATIONS",       sub: "ERP + CRM\nFully Live",              color: "06B6D4", x: 5.9  },
    { label: "SCALE",            sub: "Fabricator Network\nUK-wide",        color: "8B5CF6", x: 7.7  },
  ];

  milestones.forEach((m) => {
    // Dot on timeline
    s.addShape(pres.shapes.OVAL, {
      x: m.x + 0.55, y: 2.22, w: 0.36, h: 0.36,
      fill: { color: m.color }, line: { color: m.color },
    });
    // Vertical connector
    s.addShape(pres.shapes.LINE, {
      x: m.x + 0.73, y: 1.5, w: 0, h: 0.72,
      line: { color: m.color, width: 1.5 },
    });
    // Label above
    s.addText(m.label, {
      x: m.x, y: 1.0, w: 1.8, h: 0.5,
      fontSize: 11, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", margin: 0,
    });
    // Sub below timeline
    s.addText(m.sub, {
      x: m.x, y: 2.7, w: 1.8, h: 0.6,
      fontSize: 10, color: "A0B4C8",
      fontFace: "Calibri", align: "center", margin: 0,
    });
  });

  // Phase blocks below
  const phases = [
    { label: "Month 1–2\nQuick Wins",   color: C.orange, x: 0.35 },
    { label: "Month 2–4\nGrowth",       color: C.green,  x: 3.45 },
    { label: "Month 4–8\nScale",        color: "8B5CF6", x: 6.55 },
  ];

  phases.forEach((ph) => {
    card(s, ph.x, 3.55, 2.9, 1.7, { fill: C.navylt, border: ph.color });
    s.addShape(pres.shapes.RECTANGLE, {
      x: ph.x, y: 3.55, w: 2.9, h: 0.07,
      fill: { color: ph.color }, line: { color: ph.color },
    });
    s.addText(ph.label, {
      x: ph.x + 0.15, y: 3.65, w: 2.6, h: 1.45,
      fontSize: 14, bold: true, color: C.white,
      fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE NEW-D – Investment & Expected ROI (Short/Mid/Long Term)
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.green);

  slideTitle(s, "Investment & Expected Returns", 0.5, 0.25, 9);
  s.addText("Returns compound across three horizons — every system we build feeds the next stage.", {
    x: 0.5, y: 0.96, w: 9, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: "Calibri", margin: 0,
  });

  // Phase columns — Short / Mid / Long term
  const phases = [
    {
      phase: "Short-Term",
      period: "Month 1–3",
      label: "Visibility & Leads",
      color: C.navy,
      invest: [
        "Google Maps + local SEO live",
        "Website & product catalogue up",
        "Prospecting database: 500+ leads",
      ],
      returns: [
        "Increased visibility in UK searches",
        "Initial inbound enquiry flow starts",
        "Faster response time — no missed leads",
      ],
    },
    {
      phase: "Mid-Term",
      period: "Month 3–6",
      label: "Conversion Engine",
      color: C.orange,
      invest: [
        "AI agents on WhatsApp + website",
        "AI calling agent running campaigns",
        "First fabricator onboarding",
      ],
      returns: [
        "40–80 qualified leads/month",
        "Consistent dealer pipeline built",
        "Conversion rate up 2–3x vs manual",
      ],
    },
    {
      phase: "Long-Term",
      period: "Month 6–12",
      label: "Brand & Scale",
      color: C.green,
      invest: [
        "ERP + CRM fully operational",
        "FIT Show 2027 presence confirmed",
        "Ongoing optimisation & analytics",
      ],
      returns: [
        "Brand established in UK market",
        "Automated sales engine running",
        "Scalable ops — higher revenue",
      ],
    },
  ];

  phases.forEach((ph, i) => {
    const px = 0.35 + i * 3.2;

    // Card
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: 1.5, w: 3.05, h: 3.75,
      fill: { color: "FAFBFC" }, line: { color: "E2E8F0", width: 1 },
      shadow: { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.08 },
    });
    // Header
    s.addShape(pres.shapes.RECTANGLE, {
      x: px, y: 1.5, w: 3.05, h: 0.75,
      fill: { color: ph.color }, line: { color: ph.color },
    });
    s.addText(ph.phase + "  ·  " + ph.period, {
      x: px + 0.15, y: 1.55, w: 2.75, h: 0.28,
      fontSize: 11, color: "rgba(255,255,255,0.75)", bold: false,
      fontFace: "Calibri", color: "D0E4F7", margin: 0,
    });
    s.addText(ph.label, {
      x: px + 0.15, y: 1.8, w: 2.75, h: 0.35,
      fontSize: 17, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
    });

    // Investment section
    s.addText("What We Build", {
      x: px + 0.15, y: 2.38, w: 2.75, h: 0.3,
      fontSize: 10, bold: true, color: C.muted,
      fontFace: "Calibri", charSpacing: 1, margin: 0,
    });
    ph.invest.forEach((item, j) => {
      s.addText("→  " + item, {
        x: px + 0.15, y: 2.72 + j * 0.38, w: 2.75, h: 0.32,
        fontSize: 10.5, color: C.dark, fontFace: "Calibri", margin: 0,
      });
    });

    // Divider
    s.addShape(pres.shapes.LINE, {
      x: px + 0.15, y: 3.9, w: 2.75, h: 0,
      line: { color: "E2E8F0", width: 1 },
    });

    // Returns section
    s.addText("Expected Outcomes", {
      x: px + 0.15, y: 3.98, w: 2.75, h: 0.3,
      fontSize: 10, bold: true, color: ph.color,
      fontFace: "Calibri", charSpacing: 1, margin: 0,
    });
    ph.returns.forEach((item, j) => {
      s.addText("✓  " + item, {
        x: px + 0.15, y: 4.32 + j * 0.35, w: 2.75, h: 0.3,
        fontSize: 10.5, color: ph.color, fontFace: "Calibri", margin: 0,
      });
    });
  });

  // Bottom ROI banner
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 5.28, w: 10, h: 0.345,
    fill: { color: C.navy }, line: { color: C.navy },
  });
  s.addText("Target outcome by Month 8:  3–8 active UK fabricators  ·  40–80 qualified leads/month  ·  Full operational ERP in place", {
    x: 0.4, y: 5.285, w: 9.2, h: 0.33,
    fontSize: 10, bold: true, color: C.orange,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 14 – Key Value Proposition
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.white };
  topBar(s, C.green);

  slideTitle(s, "What Sunnyplast Gains", 0.5, 0.25, 9);
  s.addText("A complete transformation — not just services", {
    x: 0.5, y: 0.95, w: 9, h: 0.35,
    fontSize: 13, color: C.muted, fontFace: "Calibri", italic: true, margin: 0,
  });

  const values = [
    { title: "Faster UK Market Entry",       body: "Validated presence, leads and sales infrastructure in 90 days",  icon: "⚡", color: C.orange  },
    { title: "Digital + Offline Presence",   body: "Google Maps, website, WhatsApp, calling — every touchpoint covered", icon: "🌐", color: "06B6D4"  },
    { title: "Automated Lead Generation",    body: "Prospecting tool + AI agents replace manual sales effort",        icon: "🤖", color: "8B5CF6"  },
    { title: "Higher Conversion Rates",      body: "AI handles follow-up 24/7 — no lead goes cold",                  icon: "📈", color: C.green   },
    { title: "Scalable Backend Operations",  body: "ERP + CRM centralises invoices, orders and customers from day one", icon: "⚙", color: C.navy  },
  ];

  values.forEach((v, i) => {
    const col = i % 2 === 0 && i < 4 ? 0 : 1;
    const row = Math.floor(i / 2);
    let vx, vy;
    if (i < 4) {
      vx = 0.4 + (i % 2) * 4.75;
      vy = 1.45 + Math.floor(i / 2) * 1.65;
    } else {
      vx = 2.55;
      vy = 4.75;
    }

    card(s, vx, vy, 4.4, 1.45, { shadow: true });
    s.addShape(pres.shapes.RECTANGLE, {
      x: vx, y: vy, w: 4.4, h: 0.07,
      fill: { color: v.color }, line: { color: v.color },
    });
    s.addShape(pres.shapes.OVAL, {
      x: vx + 0.15, y: vy + 0.3, w: 0.5, h: 0.5,
      fill: { color: v.color }, line: { color: v.color },
    });
    s.addText(v.icon, {
      x: vx + 0.15, y: vy + 0.3, w: 0.5, h: 0.5,
      fontSize: 14, color: C.white, fontFace: "Calibri",
      align: "center", valign: "middle", margin: 0,
    });
    s.addText(v.title, {
      x: vx + 0.78, y: vy + 0.12, w: 3.45, h: 0.35,
      fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", margin: 0,
    });
    s.addText(v.body, {
      x: vx + 0.78, y: vy + 0.52, w: 3.45, h: 0.75,
      fontSize: 12, color: C.muted, fontFace: "Calibri", margin: 0,
    });
  });
}


// ════════════════════════════════════════════════════════
// SLIDE 15 – CTA / Next Steps
// ════════════════════════════════════════════════════════
{
  const s = pres.addSlide();
  s.background = { color: C.navy };
  leftBar(s, C.orange);

  // Decorative circles
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: -0.3, w: 3.0, h: 3.0,
    fill: { color: C.navylt, transparency: 50 }, line: { color: C.navylt, width: 0 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.9, y: 3.3, w: 2.2, h: 2.2,
    fill: { color: C.orange, transparency: 80 }, line: { color: C.orange, width: 0 },
  });

  s.addText("Ready to Enter", {
    x: 0.35, y: 0.7, w: 7, h: 0.55,
    fontSize: 20, color: "A0B4C8", fontFace: "Calibri", margin: 0,
  });
  s.addText("the UK Market?", {
    x: 0.35, y: 1.2, w: 7.5, h: 0.95,
    fontSize: 46, bold: true, color: C.white, fontFace: "Calibri", margin: 0,
  });

  s.addShape(pres.shapes.LINE, {
    x: 0.35, y: 2.3, w: 5.5, h: 0,
    line: { color: C.navylt, width: 1 },
  });

  const steps = [
    "Step 1  –  Discovery call to align on scope",
    "Step 2  –  Google Maps + Website sprint (Week 1–2)",
    "Step 3  –  Prospecting tool & AI agent build (Week 3–6)",
    "Step 4  –  ERP / CRM go-live (Month 2–3)",
  ];

  steps.forEach((st, i) => {
    s.addText(st, {
      x: 0.35, y: 2.5 + i * 0.48, w: 7, h: 0.4,
      fontSize: 13, color: "C8D8E8",
      fontFace: "Calibri", margin: 0,
    });
  });

  // CTA button mock
  card(s, 0.35, 4.65, 3.2, 0.65, { fill: C.orange, border: C.orange });
  s.addText("Book a Discovery Call  →", {
    x: 0.35, y: 4.65, w: 3.2, h: 0.65,
    fontSize: 14, bold: true, color: C.white,
    fontFace: "Calibri", align: "center", valign: "middle", margin: 0,
  });
}


// ════════════════════════════════════════════════════════
// Save
// ════════════════════════════════════════════════════════
pres.writeFile({ fileName: "/home/vishal/tech/sunnyPlaste/docs/sunnyplast_uk_strategy.pptx" })
  .then(() => console.log("Saved: docs/sunnyplast_uk_strategy.pptx"))
  .catch(err => console.error("Error:", err));
