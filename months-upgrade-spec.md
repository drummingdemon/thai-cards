# `thai-cards` v2 — Multi-Deck + Months + Zodiac Motifs

**Context:** The app currently drills 21 body parts. A test on **Thai months** is Friday — two days out. This spec extends the app to a multi-deck system, adds Months as the second deck, builds the two drill modes the test format requires, and introduces a zodiac-creature watermark motif as a new house-style element.

Hand this whole file to Claude Code as `MONTHS-UPGRADE.md`. Reference `thai-cards` v1 in the same repo for any UX pattern not spelled out here.

---

## The test

Two-part oral exam:

1. **Recite all 12 month names in order**, January → December. ครู listens.
2. **Number → month.** ครู says a number (1–12) in Thai; student responds with the month name.

These need two different drill modes — sequential recall and number-prompt recall. Build both.

---

## What's new (summary)

1. **Deck selector / home screen** — choose Body Parts or Months (and future decks).
2. **Months deck** — 12 cards, same card mechanics as body parts.
3. **Sequential mode** — cards advance in calendar order 1→12. For test part 1.
4. **Numbers mode** — front shows a number, back reveals the month. For test part 2.
5. **Random mode** — existing shuffle, also available for months.
6. **Zodiac watermark motif** — each month carries its zodiac creature as a faint, near-full-card line-art motif behind the text. New element of the house style (see Visual Language).

Body parts deck stays exactly as it is. Don't break what works.

---

## Architecture

Multi-deck system. Each deck is a data object with metadata + items.

```js
// data/decks.js
const DECKS = {
  'body-parts': {
    id: 'body-parts',
    name: 'Body Parts',
    nameThai: 'อวัยวะ',
    count: 21,
    items: BODY_PARTS,        // existing array
    modes: ['random'],
    motif: 'figure'           // anatomical figure watermark
  },
  'months': {
    id: 'months',
    name: 'Months',
    nameThai: 'เดือน',
    count: 12,
    items: MONTHS,
    modes: ['sequential', 'random', 'numbers'],
    motif: 'zodiac'           // zodiac creature watermark per item
  }
};
```

### Routing

URL hash based, same pattern as v1:

- `#` / empty → home / deck selector
- `#body-parts` → body parts, random mode
- `#months` → months, defaults to **sequential** (what test part 1 needs)
- `#months/random` → shuffle
- `#months/numbers` → number-prompt quiz

Back arrow (←) in the deck header returns to home. Persist last-used deck in `localStorage` (optional).

---

## Home screen

Two large tappable cards stacked vertically (side-by-side on wide screens), in the existing card aesthetic — warm ground, gold corner brackets, Fraunces for English, Noto Serif Thai for Thai:

```
┌──────────────────────────────┐
│  อวัยวะ                       │
│  BODY PARTS         21 cards │
└──────────────────────────────┘

┌──────────────────────────────┐
│  เดือน                        │
│  MONTHS             12 cards │
└──────────────────────────────┘
```

Tapping routes into the deck. Theme toggle and any global controls stay in the header.

---

## Months deck

12 cards. Default front shows the English month name; back shows Thai script + romanisation + English + days count + ending + the zodiac root line.

### Mode selector

Inside the Months deck, a segmented control at the top:

```
[ Sequential ]  [ Random ]  [ Numbers ]
```

- **Sequential** (default): order 1→12, "Next" advances chronologically, loops after December. Counter: `MAR · 03 / 12`.
- **Random**: shuffle, no repeats until the deck clears (reuse body-parts logic).
- **Numbers**: front shows the number, back shows the month. Order randomised.

### Numbers mode card layout

**Front:** large Thai numeral, smaller Arabic, tiny English label (English on the front is fine for this mode, as requested):

```
   เดือนที่
    ๓ · 3
   March
```

**Back:** full month reveal (same as other modes).

---

## Months data (single source of truth)

Thai script + English are **definitive**. The `rom` column is my **best guess in ครู's romanisation system** — verify every entry against the Wednesday whiteboard before drilling or publishing. The `zodiac` fields are etymologically solid and can be trusted.

```js
// data/months.js
const MONTHS = [
  {
    num: 1, numThai: "๑", en: "January", th: "มกราคม", rom: "mák-rāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Capricorn", glyph: "♑", root: "makara", rootThai: "มกร",
      creature: "sea-dragon (makara)",
      note: "Mythical sea-creature — part crocodile, elephant, serpent. Your 'dragon'." }
  },
  {
    num: 2, numThai: "๒", en: "February", th: "กุมภาพันธ์", rom: "kūm-phāa-phān",
    days: 28, ending: "-phan",
    zodiac: { sign: "Aquarius", glyph: "♒", root: "kumbha", rootThai: "กุมภ์",
      creature: "water pot / pitcher",
      note: "kumbha = pitcher. Only -พันธ์ month (Sanskrit bandha, 'bound')." }
  },
  {
    num: 3, numThai: "๓", en: "March", th: "มีนาคม", rom: "mīi-nāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Pisces", glyph: "♓", root: "mina", rootThai: "มีน",
      creature: "fish (a pair)", note: "mina = fish." }
  },
  {
    num: 4, numThai: "๔", en: "April", th: "เมษายน", rom: "mēe-sǎa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Aries", glyph: "♈", root: "mesha", rootThai: "เมษ",
      creature: "ram", note: "mesha = ram. Songkran sits here — sun enters Aries." }
  },
  {
    num: 5, numThai: "๕", en: "May", th: "พฤษภาคม", rom: "phrʉ́t-sà-phāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Taurus", glyph: "♉", root: "vrishabha", rootThai: "พฤษภ",
      creature: "bull", note: "vrishabha = bull." }
  },
  {
    num: 6, numThai: "๖", en: "June", th: "มิถุนายน", rom: "mí-thù-nāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Gemini", glyph: "♊", root: "mithuna", rootThai: "มิถุน",
      creature: "twins / a pair", note: "mithuna = a pair." }
  },
  {
    num: 7, numThai: "๗", en: "July", th: "กรกฎาคม", rom: "kà-rá-kà-dāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Cancer", glyph: "♋", root: "karkata", rootThai: "กรกฎ",
      creature: "crab", note: "karkata = crab." }
  },
  {
    num: 8, numThai: "๘", en: "August", th: "สิงหาคม", rom: "sǐng-hǎa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Leo", glyph: "♌", root: "singha", rootThai: "สิงห์",
      creature: "lion", note: "singha = lion. Yes — the Singha Beer lion. Buddha's protector." }
  },
  {
    num: 9, numThai: "๙", en: "September", th: "กันยายน", rom: "kān-yāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Virgo", glyph: "♍", root: "kanya", rootThai: "กันย์",
      creature: "maiden", note: "kanya = girl / maiden." }
  },
  {
    num: 10, numThai: "๑๐", en: "October", th: "ตุลาคม", rom: "tù-lāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Libra", glyph: "♎", root: "tula", rootThai: "ตุล",
      creature: "scales / balance", note: "tula = balance." }
  },
  {
    num: 11, numThai: "๑๑", en: "November", th: "พฤศจิกายน", rom: "phrʉ́t-sà-jì-kāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Scorpio", glyph: "♏", root: "vrishchika", rootThai: "พฤศจิก",
      creature: "scorpion", note: "vrishchika = scorpion (แมงป่อง)." }
  },
  {
    num: 12, numThai: "๑๒", en: "December", th: "ธันวาคม", rom: "than-wāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Sagittarius", glyph: "♐", root: "dhanu", rootThai: "ธนู",
      creature: "bow / archer", note: "dhanu = bow." }
  }
];
```

### The suffix pattern (surface this in the UI)

Month endings encode length: **-คม** (`-khom`) = 31 days, **-ยน** (`-yon`) = 30 days, **-พันธ์** (`-phan`) = February alone. Show `ending · days` on the card back as a small caption — once internalised, day-counts come free.

---

## Zodiac motif — visual treatment

Each month card carries its zodiac creature as a large, faint, near-full-card motif — **tattoo flash / tarot watermark, not a clip-art icon in a box.** The creature is the soul of the card; the vocabulary sits on top of it.

### Rules

- **Scale & anchor:** motif is anchored to the **lower-right corner** (`transform-origin: bottom right`, positioned `bottom`/`right` with a slight negative offset so it bleeds gently off both edges). It still occupies ~80–90% of the card, but its visual weight sits in the lower-right and the densest part crops off-card. This deliberately clears the upper-left / centre — where the vocabulary lives — so the creature can be large without crowding the text. Asymmetric on purpose; reads as editorial, not a centred sticker.
- **Opacity:** watermark-level. Roughly **7–9% in light theme, 10–13% in dark theme.** Text always dominates; the motif is felt before it's consciously noticed. Tune by eye against the existing paper grain.
- **Style:** single-weight **line art** — stylised, decorative, emblematic. Tattoo-flash / celestial-line-art register. No gradients, no solid fills, no fine detail noise. Confident strokes, slightly abstracted.
- **Colour:** `currentColor`, inheriting the card's ink/accent. Light theme: ink or accent at low opacity with `mix-blend-mode: multiply` so it reads as pressed into the paper. Dark theme: warm cream/accent at low opacity, `normal` or `screen` blend. It should sit in the same material layer as the grain texture.
- **Consistency:** all 12 normalised to the same stroke weight, same visual density, same viewBox (suggest `0 0 400 400`). They must feel like one artist's flash sheet, not twelve scavenged icons. This is the single most important rule — cohesion over individual fidelity. Compose each one so its **visual mass leans toward the lower-right** and survives being cropped at the bottom-right edges — the head/focal point of the creature should fall in the upper-left of its own bounding box so it stays visible after the corner crop, while tails/limbs/flourishes are what bleed off.
- **Layering (z-order):** card background → grain texture → **zodiac motif** → vocabulary text → gold corner brackets. The motif joins the texture conceptually: part of the card's material, not its content.

### Figurative vs abstract — my call

Keep them **figurative but stylised.** A stylised lion is still unmistakably a lion (you need that for recall), but drawn as a crest/emblem it reads as decoration rather than illustration. Lean abstract/geometric only where a sign is naturally symbolic — Libra's scales, Aquarius' water, Gemini's mirrored pair — where a motif beats a literal object. The strong animals (Leo, Scorpio, Cancer, Taurus, Aries, Pisces) stay recognisably themselves; that recognisability is the whole mnemonic.

### Sourcing

- **Best result = one consistent line-art zodiac set**, single artist/style, rather than mixing icon sources. Search "zodiac line art SVG" / "celestial tattoo zodiac"; verify the licence (want CC0 / CC-BY) before using in a public repo.
- **game-icons.net** (CC-BY 3.0) has every creature, but they're solid silhouettes — too heavy as watermarks unless converted to outline/stroke. Possible, but extra work.
- **Cleanest path: generate 12 custom line-art motifs in one pass** (Claude Code can produce consistent SVG line drawings), then normalise stroke weight + viewBox. Total control over the tattoo aesthetic, zero licensing concern, and guaranteed cohesion.

**Recommend the custom-generated route.** Note the **makara** especially has no clean stock equivalent — it's a Thai/Hindu sea-dragon, not the Western Capricorn goat. Draw the sea-dragon to honour the actual creature rather than defaulting to a goat. Same spirit for **singha** — the Thai temple lion, not a generic Leo cat.

```js
// data/zodiac-motifs.js — keyed by month number
const MOTIFS = {
  1:  `<svg viewBox="0 0 400 400">...makara / sea-dragon line art...</svg>`,
  8:  `<svg viewBox="0 0 400 400">...singha / lion line art...</svg>`,
  // ...all 12, same stroke weight + viewBox
};
```

Render with `fill: none; stroke: currentColor;` so theme + accent colours and opacity are controlled entirely by CSS.

---

## Card layout

**Front (all month modes):**
```
┌────────────────────────────┐
│ ⌐                          │  ← gold bracket
│   January                  │  ← text sits in the cleared upper-left
│   (Numbers mode: ๓ · 3      │     space the corner motif leaves open
│    above the name)         │
│                  ╱▔▔▔╲      │
│                 │ faint │   │  ← zodiac motif anchored bottom-right,
│                  ╲ ___ ╱  ¬ │     bleeding off the lower + right edges
└────────────────────────────┘
```
The bottom-right gold bracket sits *on top* of the motif — it frames the corner the creature emerges from, which reads as intentional rather than a clash.

**Back:**
```
มกราคม
mák-rāa-khōm
January · 31 days · -khom

♑ Capricorn · มกร makara — the sea-dragon
```

The last line is the money line: it shows the zodiac root **embedded in the Thai name** (มกร lives inside มกราคม), proving the connection at a glance. Accent-colour the embedded root so it pops. The faint motif can persist on the back too, fainter still.

---

## Visual Language (carry forward to all decks + thai-script)

Codified so every future deck and the upcoming `thai-script` app inherit one identity. This is the house style now.

- **Palette:** warm cream ground `#F2E8D0` (dark theme: deep warm brown-black); chili-red accent `#C13F1F`; jade secondary `#1F4A3F`; gold `#B8923D` for corner brackets and hairline rules.
- **Type:** **Fraunces** (display / English), **Noto Serif Thai** (Thai script), **JetBrains Mono** (romanisation, labels, counters). All OFL, self-hosted with licence texts.
- **Card construction:** rounded corners, soft long shadow, paper-grain texture overlay, gold L-brackets at two opposing corners, generous internal padding.
- **Motion:** flip on reveal, slide on next, fade-in on content. Reuse v1 easing.
- **Motif layer (the new primitive):** any card type may carry a faint, near-full-card line-art watermark in the treatment above — zodiac creatures for months, the anatomical figure for body parts, and forward, Thai consonant-class sigils or stroke ghosts for `thai-script`. The watermark is now part of the system, applied identically everywhere: line art, `currentColor`, low opacity, behind text, in the material layer.

Document this section in the repo README (or a `DESIGN.md`) so the identity survives future contributors and the sibling app.

---

## File structure

Minimal restructure; existing files stay.

```
thai-cards/
├── index.html
├── styles.css
├── fonts.css
├── data/
│   ├── body-parts.js        ← renamed from data.js
│   ├── months.js            ← new
│   ├── zodiac-motifs.js     ← new, 12 SVG motifs
│   └── decks.js             ← deck registry
├── app.js                   ← extend: router + home screen + mode selector
├── modules/                 ← optional split if app.js gets fat
│   ├── home.js
│   ├── flashcards.js
│   └── modes.js
├── fonts/
├── screenshots/
├── DESIGN.md                ← the Visual Language section
└── README.md
```

`screenshots/` grows to cover the home screen and Numbers mode in both themes (same six-shot light/dark pattern as v1).

---

## Phased delivery (against the Friday deadline)

**v0.1 — tonight (Wed):** Home screen + months deck, sequential mode, romanisations from data above (placeholder until verified). Zodiac as the simple Unicode glyph (♑) for now — no custom art needed yet. Ship to GitHub Pages so drilling starts Thursday morning regardless.

**v0.2 — Thursday day:** Numbers mode + random mode for months. Romanisations corrected against Wednesday's whiteboard. Suffix/days caption on the back.

**v0.3 — Thursday night:** Zodiac watermark motifs land (custom line art, normalised). Updated screenshots. README + DESIGN.md. Word-list modal generalised. Send to classmates.

**Friday:** Test. Don't touch the code. Drill.

Function ships first so the test is covered; the motifs are the beauty pass and can follow once names and modes are solid.

---

## Hard lessons applied (from the body-parts build)

- **Verify romanisations with ครู before publishing.** The `rom` column is my guess. Build v0.1 with it, correct after Wednesday's class. Classmates' eyes will be on the repo.
- **Don't add Thai script Commander hasn't approved.** Header/subtitle: if it contains Thai, confirm it first or keep it bare English. (The "รัก ไทย" → should be "รักภาษาไทย" / RTL header lesson is fresh.)
- **Mid-tone macron pattern carries over:** macron on the first vowel of the syllable, single mark, never doubled.
- **Sequential is the months default**, not random — part 1 of the test is recite-in-order.

---

## The learning framing (one system, not three tasks)

Surface this somewhere — months home banner or All-Months modal:

> Thai months = zodiac signs. Capricorn → Sagittarius maps onto January → December. Learn the creatures in order and you've learned the months in order. The suffix gives you the length: **-คม** = 31 days, **-ยน** = 30 days, **-พันธ์** = February.

The zodiac root lives *inside* each name — มกร**าคม**, สิงห**าคม** — so the creature, the order, and the day-count collapse into a single connected picture instead of twelve isolated Sanskrit words.

---

*Single source of truth. Supersedes the earlier two-file split. Hand to Claude Code; reference `thai-cards` v1 for unspecified patterns; ship v0.1 tonight.*
