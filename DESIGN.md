# Design System Specification: The Chromatic Editorial

## 1. Overview & Creative North Star: "The Plum Gallery"
This design system rejects the "boxed-in" nature of traditional SaaS interfaces. Our Creative North Star is **The Plum Gallery**—an approach that treats digital space like a high-end editorial spread. We prioritize vibrant tonal depth over structural lines, using the rich plum palette to create a sense of professional luxury.

To break the "template" look, designers must embrace **Intentional Asymmetry**. Hero sections should balance large-scale `display-lg` typography against generous white space, using overlapping elements (e.g., an image bleeding off-grid or a floating `surface-container` card) to create a sense of motion. The goal is an interface that feels curated and "breathes," rather than one that is merely "filled."

---

## 2. Colors & Surface Philosophy
The palette is rooted in `#903373`, but its power lies in the interaction between the deep plum and the "Tinted Snow" neutrals.

### The "No-Line" Rule
**Explicit Instruction:** Prohibit the use of 1px solid borders for sectioning. Structural boundaries must be defined solely through background color shifts. 
*   *Example:* A `surface-container-low` section sitting on a `surface` background provides enough contrast to denote a change in context without the visual "noise" of a line.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—stacked sheets of fine, semi-translucent paper.
*   **Base:** `surface` (#fff3f9) for global backgrounds.
*   **Level 1 (Subtle Inset):** `surface-container-low` (#ffebf9) for secondary content areas.
*   **Level 2 (Active Cards):** `surface-container` (#ffdff9) for primary interactive components.
*   **Level 3 (High Prominence):** `surface-container-highest` (#ffcef9) for modals or floating menus.

### The "Glass & Gradient" Rule
To avoid a flat, "out-of-the-box" feel:
*   **Glassmorphism:** For floating navigation or overlays, use `surface` at 80% opacity with a `24px` backdrop-blur. 
*   **Signature Textures:** Main CTAs and Hero backgrounds should utilize a subtle linear gradient (135°) from `primary` (#a61c82) to `primary-container` (#fc69cd) to add "soul" and dimension.

---

## 3. Typography: Editorial Authority
We pair the geometric sophistication of **Manrope** for headers with the high-legibility "workhorse" **Inter** for utility and body.

*   **Display (Manrope):** Use `display-lg` (3.5rem) with tight letter-spacing (-0.02em) for high-impact editorial moments. This is your "voice."
*   **Headline (Manrope):** `headline-md` (1.75rem) should be used for section starts, always paired with generous `top-margin` (spacing scale 16) to ensure the layout feels premium.
*   **Body (Inter):** `body-lg` (1rem) is the standard. Use `on-surface-variant` (#744f71) for secondary descriptions to reduce visual weight while maintaining accessibility.
*   **Labels (Inter):** `label-md` (0.75rem) must always be uppercase with +0.05em tracking when used for categories or overlines.

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are a fallback, not a foundation. We achieve depth through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` section. The slight shift in value creates a "soft lift" that feels more integrated than a shadow.
*   **Ambient Shadows:** When an element must float (e.g., a dropdown), use a shadow with a `40px` blur at 6% opacity. The shadow color must be `on-background` (#432342), not pure black, to mimic natural light passing through plum-tinted glass.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use `outline-variant` (#cba0c6) at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary-container`), `full` roundedness, and `on-primary` text. Use `spacing-6` for horizontal padding.
*   **Secondary:** No fill. Use a "Ghost Border" and `primary` text.
*   **Tertiary:** No fill, no border. `primary` text with an underline that appears only on hover.

### Cards & Lists
*   **The Divider Ban:** Do not use line dividers. Separate list items using `spacing-4` vertical gaps or alternating subtle background tints (`surface` to `surface-container-low`).
*   **Shape:** Use `rounded-lg` (1rem) for content cards to maintain a modern, friendly professional look.

### Input Fields
*   **State:** Default state uses `surface-container-low` with no border. On focus, transition to `surface-container-highest` with a 2px "Ghost Border" in `primary`.
*   **Label:** Use `label-md` floating above the field, never inside as placeholder text.

### Interactive Chips
*   Use `surface-container-high` for unselected states. On selection, transition to `primary` with `on-primary` text. This high-contrast shift provides clear feedback.

---

## 6. Do’s and Don'ts

### Do:
*   **Do** use `tertiary` (#3255b7) sparingly as a "spark" color for links or success indicators to provide relief from the plum-heavy palette.
*   **Do** embrace white space. If a layout feels "crowded," double the spacing scale value (e.g., move from `spacing-8` to `spacing-16`).
*   **Do** use `rounded-full` for small UI elements like tags and avatars to contrast against the `rounded-lg` containers.

### Don't:
*   **Don't** use pure black (#000000) for text. Use `on-surface` (#432342) to maintain the tonal warmth of the system.
*   **Don't** use standard Material shadows. They are too "heavy" for this editorial aesthetic.
*   **Don't** place `primary` text on `secondary-container` backgrounds; the vibration is too high. Stick to the established surface hierarchy.