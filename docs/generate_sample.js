const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.title = "SunnyPlaste – Sample Presentation";

// Palette: Warm Terracotta
const C = {
  terracotta: "B85042",
  sand:       "E7E8D1",
  sage:       "A7BEAE",
  dark:       "2E1B18",
  white:      "FFFFFF",
  muted:      "7A6360",
};

// ─────────────────────────────────────────────
// SLIDE 1 – Title (dark background)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  // Left accent bar
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  // Company name
  s.addText("SunnyPlaste", {
    x: 0.45, y: 1.5, w: 6, h: 0.85,
    fontSize: 48, bold: true, color: C.sand,
    fontFace: "Georgia", margin: 0,
  });

  // Tagline
  s.addText("Sustainable Plastics. Brighter Future.", {
    x: 0.45, y: 2.45, w: 7, h: 0.5,
    fontSize: 18, color: C.sage,
    fontFace: "Calibri", margin: 0,
  });

  // Date bottom-right
  s.addText("March 2026", {
    x: 7.5, y: 5.0, w: 2.2, h: 0.4,
    fontSize: 11, color: C.muted, align: "right", margin: 0,
  });

  // Decorative circle
  s.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 0.8, w: 2.2, h: 2.2,
    fill: { color: C.terracotta, transparency: 70 },
    line: { color: C.terracotta, width: 2 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 7.9, y: 1.2, w: 1.4, h: 1.4,
    fill: { color: C.terracotta, transparency: 40 },
    line: { color: C.terracotta, width: 0 },
  });
}

// ─────────────────────────────────────────────
// SLIDE 2 – About Us (light background)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.sand };

  // Top accent strip
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.12,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  // Slide title
  s.addText("Who We Are", {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 36, bold: true, color: C.dark,
    fontFace: "Georgia", margin: 0,
  });

  // Two column layout
  // Left – text block
  s.addText([
    { text: "Founded in 2015", options: { bold: true, breakLine: true } },
    { text: "SunnyPlaste pioneers eco-responsible plastic manufacturing, combining advanced polymer science with circular economy principles.\n", options: { breakLine: true } },
    { text: "Our Mission", options: { bold: true, breakLine: true } },
    { text: "Deliver high-performance plastic solutions with the lowest possible environmental footprint.", options: {} },
  ], {
    x: 0.5, y: 1.2, w: 4.8, h: 3.5,
    fontSize: 14, color: C.dark, fontFace: "Calibri",
    valign: "top",
  });

  // Right – stat cards
  const cards = [
    { label: "Countries Served", value: "28" },
    { label: "Products", value: "200+" },
    { label: "Recycled Content", value: "65%" },
  ];
  cards.forEach((card, i) => {
    const cx = 5.8;
    const cy = 1.2 + i * 1.35;
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 3.7, h: 1.1,
      fill: { color: C.white },
      shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
      line: { color: C.white },
    });
    // Terracotta left accent
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 0.08, h: 1.1,
      fill: { color: C.terracotta }, line: { color: C.terracotta },
    });
    s.addText(card.value, {
      x: cx + 0.2, y: cy + 0.08, w: 3.3, h: 0.5,
      fontSize: 28, bold: true, color: C.terracotta,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(card.label, {
      x: cx + 0.2, y: cy + 0.6, w: 3.3, h: 0.35,
      fontSize: 12, color: C.muted,
      fontFace: "Calibri", margin: 0,
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 3 – Product Lines (3 cards)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.white };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.12,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  s.addText("Our Product Lines", {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 36, bold: true, color: C.dark,
    fontFace: "Georgia", margin: 0,
  });

  const products = [
    {
      name: "BioFlex",
      desc: "Biodegradable flexible films for food packaging — 100% compostable within 180 days.",
      color: C.terracotta,
    },
    {
      name: "RecoBoard",
      desc: "Rigid sheets made from 80% post-consumer recycled plastic. Ideal for construction panels.",
      color: C.sage,
    },
    {
      name: "ClearCore",
      desc: "Optical-grade transparent resins for medical devices and consumer electronics.",
      color: "8D6E63",
    },
  ];

  products.forEach((p, i) => {
    const cx = 0.4 + i * 3.1;
    const cy = 1.3;

    // Card background
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 2.9, h: 3.6,
      fill: { color: C.sand },
      shadow: { type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.12 },
      line: { color: C.sand },
    });

    // Colored top bar
    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 2.9, h: 0.55,
      fill: { color: p.color }, line: { color: p.color },
    });

    // Product name
    s.addText(p.name, {
      x: cx + 0.15, y: cy + 0.08, w: 2.6, h: 0.4,
      fontSize: 20, bold: true, color: C.white,
      fontFace: "Georgia", margin: 0,
    });

    // Description
    s.addText(p.desc, {
      x: cx + 0.15, y: cy + 0.7, w: 2.6, h: 2.6,
      fontSize: 13, color: C.dark,
      fontFace: "Calibri", valign: "top",
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 4 – Key Metrics (big stat callouts)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.sand };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.12,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  s.addText("Impact at a Glance", {
    x: 0.5, y: 0.35, w: 9, h: 0.65,
    fontSize: 36, bold: true, color: C.dark,
    fontFace: "Georgia", margin: 0,
  });

  const stats = [
    { num: "12,000+", label: "Tonnes of plastic\nrecycled annually" },
    { num: "40%",     label: "Carbon footprint\nreduction since 2018" },
    { num: "€85M",    label: "Annual revenue\n(FY 2025)" },
    { num: "98.6%",   label: "Customer satisfaction\nrate" },
  ];

  stats.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const cx = 0.7 + col * 4.8;
    const cy = 1.4 + row * 1.85;

    s.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 4.2, h: 1.55,
      fill: { color: C.white },
      shadow: { type: "outer", blur: 6, offset: 2, angle: 135, color: "000000", opacity: 0.1 },
      line: { color: C.white },
    });

    s.addText(st.num, {
      x: cx + 0.2, y: cy + 0.1, w: 3.8, h: 0.75,
      fontSize: 40, bold: true, color: C.terracotta,
      fontFace: "Georgia", margin: 0,
    });
    s.addText(st.label, {
      x: cx + 0.2, y: cy + 0.85, w: 3.8, h: 0.55,
      fontSize: 12, color: C.muted,
      fontFace: "Calibri", margin: 0,
    });
  });
}

// ─────────────────────────────────────────────
// SLIDE 5 – Closing CTA (dark)
// ─────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };

  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 0.12, h: 5.625,
    fill: { color: C.terracotta }, line: { color: C.terracotta },
  });

  s.addText("Let's Build a\nSustainable Tomorrow", {
    x: 0.45, y: 1.0, w: 7.5, h: 2.2,
    fontSize: 40, bold: true, color: C.sand,
    fontFace: "Georgia", margin: 0,
  });

  s.addText("Contact us at hello@sunnyplaste.com", {
    x: 0.45, y: 3.35, w: 6, h: 0.45,
    fontSize: 16, color: C.sage,
    fontFace: "Calibri", margin: 0,
  });

  s.addText("www.sunnyplaste.com", {
    x: 0.45, y: 3.85, w: 4, h: 0.4,
    fontSize: 14, color: C.muted,
    fontFace: "Calibri", margin: 0,
  });

  // Decorative circles bottom-right
  s.addShape(pres.shapes.OVAL, {
    x: 8.0, y: 3.5, w: 2.2, h: 2.2,
    fill: { color: C.terracotta, transparency: 75 },
    line: { color: C.terracotta, width: 1 },
  });
  s.addShape(pres.shapes.OVAL, {
    x: 8.5, y: 4.0, w: 1.2, h: 1.2,
    fill: { color: C.terracotta, transparency: 50 },
    line: { color: C.terracotta, width: 0 },
  });
}

// ─────────────────────────────────────────────
// Save
// ─────────────────────────────────────────────
pres.writeFile({ fileName: "/home/vishal/tech/sunnyPlaste/docs/sunnyplaste_sample.pptx" })
  .then(() => console.log("✅ Saved: docs/sunnyplaste_sample.pptx"))
  .catch(err => console.error("❌ Error:", err));
