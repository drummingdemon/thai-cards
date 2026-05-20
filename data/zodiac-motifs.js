// Zodiac motif registry — keyed by month number (1..12).
//
// Each motif is single-weight line art on a 400×400 viewBox, drawn so the
// creature's focal point (head, beak, snout, opening) sits in the upper-left
// of its bbox and the visual mass leans toward the lower-right. When the
// watermark crops at the card's bottom-right edge, what's lost is tails /
// limbs / flourishes, never the recognisable face.
//
// Rules baked into every entry:
//   - viewBox="0 0 400 400"
//   - fill: none; stroke: currentColor;  (theme + opacity controlled by CSS)
//   - stroke-width="14" (chosen to read at ~10% opacity)
//   - stroke-linecap/linejoin: round
//
// Substitution pattern — to redraw any motif, edit just its `svg` string;
// the rendering layer dispatches on `type` so a glyph fallback would still
// work if a slot is left as { type: 'glyph', value: '♑' }.
//
// Makara (1) is the Thai/Hindu sea-dragon, not a Western goat.
// Singha (8) is the Thai temple lion, drawn with a stylised mane.

const SVG_ATTRS =
  'viewBox="0 0 400 400" fill="none" stroke="currentColor" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"';

const MOTIFS = {

  // ── 1 · Capricorn / makara · sea-dragon ──
  // Crocodile-snouted head upper-left, sinuous body curving down, fish-fluke
  // tail bleeding off bottom-right. A spiraling horn marks the focal point.
  1: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 60 130 Q 100 90 165 105 Q 200 115 195 150 Q 180 175 135 175 Q 75 168 60 130 Z"/>
    <path d="M 130 95 Q 105 55 145 40 Q 180 50 165 90"/>
    <circle cx="125" cy="135" r="7"/>
    <path d="M 60 145 L 50 165 M 75 168 L 65 188"/>
    <path d="M 195 155 Q 260 175 295 220 Q 320 260 315 315"/>
    <path d="M 175 175 Q 220 215 250 260 Q 275 295 280 335"/>
    <path d="M 205 195 L 220 220 M 240 230 L 255 255 M 270 260 L 285 285"/>
    <path d="M 315 315 Q 360 285 385 305 M 315 315 Q 360 350 380 335 M 290 335 Q 320 360 305 390"/>
  </svg>` },

  // ── 2 · Aquarius / kumbha · water pitcher ──
  // Pot with handle upper-left, mouth open right, water cascading in wavy
  // streams down to the bottom-right corner.
  2: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 95 130 Q 100 110 130 110 L 200 110 Q 220 110 220 130 L 215 200 Q 215 230 185 235 L 140 235 Q 110 230 105 200 Z"/>
    <path d="M 100 130 Q 60 130 60 160 Q 60 190 100 190"/>
    <path d="M 220 135 L 250 130"/>
    <path d="M 130 100 L 195 100"/>
    <path d="M 230 175 Q 250 200 270 215 Q 295 235 310 270 Q 320 305 305 340"/>
    <path d="M 195 240 Q 220 270 235 305 Q 245 340 230 375"/>
    <path d="M 265 245 Q 290 275 305 310"/>
    <path d="M 230 220 L 240 215 M 270 250 L 280 245 M 295 295 L 305 290 M 230 280 L 240 275 M 260 320 L 270 315"/>
  </svg>` },

  // ── 3 · Pisces · two fish ──
  // Yin-yang of two fish curving past each other, the upper-left fish
  // pointing back, the lower-right fish bleeding off the corner.
  3: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 70 120 Q 110 80 180 100 Q 220 120 210 165 Q 195 200 150 200 Q 95 195 70 160 Q 60 140 70 120 Z"/>
    <path d="M 65 140 Q 35 120 30 145 Q 35 175 65 155"/>
    <circle cx="115" cy="130" r="6"/>
    <path d="M 95 165 Q 110 175 145 175 M 165 170 Q 180 170 195 160"/>
    <path d="M 220 195 Q 230 230 220 250"/>
    <path d="M 170 215 Q 200 250 250 270 Q 320 290 360 270 Q 390 250 385 220 Q 375 195 340 195 Q 280 200 230 230"/>
    <path d="M 385 235 Q 395 250 385 270"/>
    <circle cx="345" cy="240" r="6"/>
    <path d="M 280 240 Q 295 250 320 250 M 245 260 Q 265 275 290 275"/>
  </svg>` },

  // ── 4 · Aries · ram ──
  // Ram head profile facing upper-left, twin spiraling horns dominating; neck
  // and shoulder taper off lower-right.
  4: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 100 130 Q 95 95 135 90 Q 180 90 195 130 Q 195 165 185 195 Q 170 230 135 230 Q 100 225 95 195 Q 90 165 100 130 Z"/>
    <circle cx="135" cy="155" r="6"/>
    <path d="M 105 195 Q 95 205 105 215 L 130 215"/>
    <path d="M 100 120 Q 60 100 50 60 Q 60 30 100 35 Q 130 50 130 85"/>
    <path d="M 195 125 Q 235 105 250 65 Q 240 30 200 30 Q 170 35 170 75"/>
    <path d="M 185 225 Q 240 240 280 280 Q 320 320 330 365"/>
    <path d="M 160 240 Q 200 270 230 310 Q 255 345 260 385"/>
    <path d="M 215 285 Q 240 285 260 295"/>
  </svg>` },

  // ── 5 · Taurus · bull ──
  // Bull head front-on with prominent curved horns. Snout/neck mass biased
  // toward the lower-right. Nose ring as a small focal detail.
  5: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 110 175 Q 100 130 145 120 Q 200 115 215 160 Q 220 200 200 230 Q 175 260 135 250 Q 105 235 110 175 Z"/>
    <circle cx="130" cy="170" r="6"/>
    <circle cx="180" cy="175" r="6"/>
    <path d="M 145 220 Q 165 230 185 220"/>
    <circle cx="165" cy="245" r="8"/>
    <path d="M 110 155 Q 60 120 40 70 Q 65 55 100 90 Q 120 110 125 140"/>
    <path d="M 215 155 Q 280 140 320 90 Q 305 60 265 75 Q 230 100 215 135"/>
    <path d="M 175 260 Q 220 280 260 325 Q 295 365 305 400"/>
    <path d="M 140 270 Q 175 305 200 350 Q 215 380 215 400"/>
    <path d="M 220 320 Q 250 320 270 335"/>
  </svg>` },

  // ── 6 · Gemini · twins ──
  // Two stylised mirrored figures, heads at top, arms linked. Mass lower-right
  // by tilting the right twin's body further into the corner.
  6: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <circle cx="135" cy="100" r="32"/>
    <circle cx="260" cy="115" r="32"/>
    <path d="M 135 132 L 130 220 Q 130 260 110 290 L 90 360"/>
    <path d="M 135 132 L 165 200 Q 175 225 175 260 L 175 360"/>
    <path d="M 260 147 L 270 235 Q 275 270 295 305 L 320 380"/>
    <path d="M 260 147 L 230 215 Q 220 245 220 285 L 220 380"/>
    <path d="M 165 200 Q 200 195 230 215"/>
    <path d="M 175 360 L 220 360"/>
    <path d="M 135 100 L 135 75 M 260 115 L 260 90"/>
  </svg>` },

  // ── 7 · Cancer · crab ──
  // Round shell-body offset upper-left; one big claw rises top-left toward
  // the eye, the other extends boldly into the bottom-right corner.
  7: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 110 175 Q 110 120 175 115 Q 230 115 240 160 Q 245 195 225 225 Q 200 250 165 250 Q 115 245 110 175 Z"/>
    <circle cx="145" cy="165" r="5"/>
    <circle cx="200" cy="170" r="5"/>
    <path d="M 145 145 L 125 110 M 200 145 L 220 110"/>
    <path d="M 115 195 Q 75 175 60 130 Q 75 105 105 115"/>
    <path d="M 95 145 Q 70 145 60 165"/>
    <path d="M 245 195 Q 305 220 340 270 Q 370 315 365 365"/>
    <path d="M 340 250 Q 380 270 380 310"/>
    <path d="M 220 245 L 180 305 M 170 245 L 130 305 M 195 250 L 155 350"/>
  </svg>` },

  // ── 8 · Leo / singha · Thai temple lion ──
  // Maned head front-facing in upper-left; ornate mane curls extend down and
  // right to fill the corner, in the spirit of temple guardian sculpture.
  8: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 110 165 Q 105 130 140 120 Q 180 115 200 145 Q 210 175 195 205 Q 170 230 140 225 Q 115 215 110 165 Z"/>
    <circle cx="135" cy="160" r="5"/>
    <circle cx="175" cy="165" r="5"/>
    <path d="M 150 195 Q 160 205 170 195"/>
    <path d="M 145 200 L 140 215 M 165 200 L 170 215"/>
    <path d="M 100 145 Q 60 120 65 80 Q 90 70 110 100"/>
    <path d="M 205 130 Q 240 95 280 95 Q 290 130 250 145"/>
    <path d="M 100 195 Q 65 220 60 270 Q 90 280 115 245"/>
    <path d="M 205 215 Q 250 240 270 290 Q 280 335 250 365"/>
    <path d="M 230 245 Q 285 260 320 305 Q 345 350 320 390"/>
    <path d="M 180 245 Q 220 295 215 360 Q 200 390 175 380"/>
    <path d="M 260 230 Q 320 240 360 280 Q 385 320 365 360"/>
  </svg>` },

  // ── 9 · Virgo · maiden ──
  // Profile of a robed figure; head with hair flowing over shoulder, robes
  // cascading down to the lower-right. A wheat sheaf held against the body.
  9: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <circle cx="135" cy="115" r="38"/>
    <path d="M 130 80 Q 95 70 90 100 Q 100 130 130 130"/>
    <path d="M 100 115 Q 70 130 75 175 Q 90 210 130 215"/>
    <path d="M 135 153 Q 135 200 155 245 Q 175 295 195 335 Q 215 375 215 400"/>
    <path d="M 135 153 Q 160 175 200 200 Q 250 230 290 275 Q 325 320 335 380"/>
    <path d="M 165 220 Q 220 235 270 280 Q 305 320 315 370"/>
    <path d="M 185 270 Q 230 290 265 335 Q 285 365 285 395"/>
    <path d="M 235 235 L 245 220 M 265 250 L 280 235 M 290 285 L 305 270 M 250 300 L 265 285 M 280 330 L 295 315"/>
  </svg>` },

  // ── 10 · Libra · scales ──
  // Geometric: central column upper-left, horizontal beam, two pans hanging
  // from chains — the right pan dropping further into the corner.
  10: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 100 80 L 100 250"/>
    <path d="M 75 250 L 125 250"/>
    <path d="M 80 80 L 120 80"/>
    <circle cx="100" cy="70" r="10"/>
    <path d="M 100 105 L 55 150"/>
    <path d="M 100 105 L 270 165"/>
    <path d="M 35 150 L 45 215 L 80 215 L 75 150 Z"/>
    <path d="M 40 175 L 75 175"/>
    <path d="M 250 165 L 240 245"/>
    <path d="M 290 165 L 300 245"/>
    <path d="M 220 245 L 320 270 L 335 360 L 230 340 Z"/>
    <path d="M 230 280 L 325 295"/>
  </svg>` },

  // ── 11 · Scorpio · scorpion ──
  // Pincers reaching up-left, segmented body curving across, stinger tail
  // raised then arcing back down into the bottom-right corner.
  11: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 60 130 Q 80 100 115 110 Q 130 130 115 145 Q 95 150 80 140"/>
    <path d="M 115 70 Q 145 60 165 90 Q 165 120 140 130 Q 120 125 115 110"/>
    <path d="M 130 140 Q 175 165 215 175"/>
    <path d="M 215 175 L 230 200 L 215 220 L 235 240 L 215 260 L 245 280"/>
    <path d="M 245 280 Q 290 285 330 270"/>
    <path d="M 330 270 Q 360 250 365 220 Q 360 195 335 195"/>
    <path d="M 335 195 Q 320 200 325 220"/>
    <path d="M 325 220 L 345 240 L 365 220"/>
    <path d="M 175 195 L 165 230 M 205 215 L 195 250 M 235 240 L 230 280"/>
  </svg>` },

  // ── 12 · Sagittarius / dhanu · bow ──
  // A drawn bow with arrow nocked. Bow arc rises in the upper-left, string
  // taut, arrow launching down toward the lower-right corner.
  12: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" ${SVG_ATTRS}>
    <path d="M 90 80 Q 60 200 140 320"/>
    <path d="M 90 80 L 70 60 M 90 80 L 110 95"/>
    <path d="M 140 320 L 125 345 M 140 320 L 160 320"/>
    <path d="M 90 80 L 380 360"/>
    <path d="M 105 200 L 360 340"/>
    <path d="M 360 340 L 320 330 M 360 340 L 350 305 M 360 340 L 385 320 M 360 340 L 380 365"/>
    <path d="M 105 200 L 90 185 L 105 175 L 115 195 Z"/>
    <path d="M 105 200 L 90 215 L 105 220"/>
  </svg>` }
};

// Home-tile signature watermarks — one per deck. Same line-art language but a
// single emblem rather than a per-card creature.

const HOME_MARKS = {
  // Body parts — a simplified standing figure, head upper-left, body lower-right.
  'body-parts': `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="135" cy="90" r="34"/>
    <path d="M 135 124 L 135 240"/>
    <path d="M 135 145 L 75 200 M 135 145 L 245 220"/>
    <path d="M 135 240 L 100 360 M 135 240 L 195 360"/>
    <path d="M 75 200 L 60 250 M 245 220 L 290 280 L 320 320"/>
    <path d="M 90 360 L 115 360 M 185 360 L 215 360"/>
  </svg>`,

  // Months — zodiac wheel: outer circle with 12 spokes, a small sun at centre.
  months: `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="200" cy="200" r="160"/>
    <circle cx="200" cy="200" r="115"/>
    <circle cx="200" cy="200" r="18"/>
    <path d="M 200 40 L 200 85 M 200 315 L 200 360"/>
    <path d="M 40 200 L 85 200 M 315 200 L 360 200"/>
    <path d="M 87 87 L 119 119 M 281 281 L 313 313"/>
    <path d="M 313 87 L 281 119 M 119 281 L 87 313"/>
    <path d="M 200 40 L 215 70 L 200 85 L 185 70 Z"/>
    <path d="M 360 200 L 330 215 L 315 200 L 330 185 Z"/>
  </svg>`
};
