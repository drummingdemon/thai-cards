// Zodiac motif registry — keyed by month number (1..12).
//
// Source: Material Design Icons (MDI), Apache 2.0. Each motif is a single
// filled path rendering the abstract zodiac SYMBOL (♑ ♒ ♓ …) as a clean
// geometric silhouette — sharp edges, no creature detail, reads instantly
// at watermark opacity. Pulled via the Iconify CDN
// (https://api.iconify.design/mdi/zodiac-<sign>.svg).
//
// Each entry uses `fill="currentColor"` on a 24×24 viewBox so theme +
// opacity stay CSS-controlled. The renderer's existing svg/glyph dispatch
// works unchanged — substitute any single creature for a custom drawing by
// replacing that one `svg` string.

const MOTIFS = {
  1:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 13c-.7 0-1.39.19-2 .55V6a3 3 0 0 0-3-3c-.75 0-1.45.29-2 .78C7.45 3.28 6.74 3 6 3v2a1 1 0 0 1 1 1v10h2V6a1 1 0 0 1 1-1a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2v2c1.15 0 2.25-.5 3-1.38a3.974 3.974 0 0 0 5.64.38c1.67-1.42 1.86-3.95.4-5.62A4.01 4.01 0 0 0 15 13m0 6a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2"/></svg>` },
  2:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m15 12.41l-3-3l-3 3l-3-3l-2.29 2.3l-1.42-1.42L6 6.59l3 3l3-3l3 3l3-3l3.71 3.7l-1.42 1.42L18 9.41zm3 3l2.29 2.3l1.42-1.42l-3.71-3.7l-3 3l-3-3l-3 3l-3-3l-3.71 3.7l1.42 1.42L6 15.41l3 3l3-3l3 3z"/></svg>` },
  3:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 11h-2c.11-2.81.73-5.58 1.81-8.18L18 2.06A26 26 0 0 0 16 11H8c-.13-3.08-.81-6.1-2-8.94l-1.86.76C5.24 5.41 5.87 8.18 6 11H4v2h2a23.8 23.8 0 0 1-1.81 8.18l1.81.76C7.19 19.1 7.87 16.08 8 13h8c.13 3.08.81 6.1 2 8.94l1.86-.76c-1.1-2.59-1.73-5.36-1.86-8.18h2z"/></svg>` },
  4:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16 2c-1.05 0-2.09.27-3 .81c-.36.19-.7.45-1 .73c-.3-.28-.64-.54-1-.73C10.09 2.27 9.05 2 8 2a6 6 0 0 0-6 6a6 6 0 0 0 6 6v-2a4 4 0 0 1-4-4a4 4 0 0 1 4-4a4.03 4.03 0 0 1 3 1.36V22h2V5.36c.08-.09.16-.18.25-.26a4 4 0 0 1 5.66.15a3.997 3.997 0 0 1-.15 5.65C18 11.61 17.03 12 16 12v2a6 6 0 0 0 6-6a6 6 0 0 0-6-6"/></svg>` },
  5:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.59 9A7 7 0 0 0 19 3h-2a5 5 0 0 1-5 5a5 5 0 0 1-5-5H5c0 2.46 1.3 4.74 3.41 6C5.09 11 4 15.28 6 18.6c1.97 3.32 6.27 4.4 9.59 2.4c3.32-1.96 4.41-6.26 2.41-9.58A6.9 6.9 0 0 0 15.59 9M12 20a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5"/></svg>` },
  6:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18 5.3c1.35-.33 2.66-.76 3.94-1.3l-.76-1.86a23.75 23.75 0 0 1-18.36.03L2.06 4c1.28.54 2.59.97 3.94 1.3v13.4c-1.35.33-2.66.76-3.94 1.3l.76 1.86a23.94 23.94 0 0 1 18.36 0l.76-1.86c-1.28-.54-2.59-.97-3.94-1.3zm-10 13V5.69c1.32.2 2.66.31 4 .31s2.68-.11 4-.31v12.62a26.2 26.2 0 0 0-8 0z"/></svg>` },
  7:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4C6.5 4 2 7.58 2 12c0 2.12 1.65 3.87 3.76 4H6a4 4 0 0 0 4-4a4 4 0 0 0-4-4h-.24A8.8 8.8 0 0 1 12 5.6c1.77-.02 3.5.47 5 1.4l1.25-1.25A11.5 11.5 0 0 0 12 4m-6 6a2 2 0 0 1 2 2c0 1.11-.92 2-2 2a2 2 0 0 1-2-1.8v-.4A2 2 0 0 1 6 10m12.24-2H18a4 4 0 0 0-4 4a4 4 0 0 0 4 4h.24A8.8 8.8 0 0 1 12 18.4c-1.77.02-3.5-.47-5-1.4l-1.24 1.24C7.63 19.41 9.79 20 12 20c5.5 0 10-3.58 10-8c0-2.12-1.65-3.87-3.76-4M18 14a2 2 0 0 1-2-2c0-1.11.92-2 2-2a2 2 0 0 1 2 1.8v.4a2 2 0 0 1-2 1.8"/></svg>` },
  8:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 17a3 3 0 0 1-3 3a3.163 3.163 0 0 1-3-3c.16-1.61.5-3.2 1-4.74c.54-1.71.87-3.47 1-5.26a5.136 5.136 0 0 0-5-5a5.136 5.136 0 0 0-5 5c.15 1.53.5 3.03 1 4.5l.21.7c-2.11-.67-4.35.5-5.02 2.6c-.69 2.11.49 4.36 2.6 5.03s4.35-.5 5.02-2.61c.13-.39.19-.81.19-1.22c-.16-1.73-.5-3.44-1.09-5.08A18.8 18.8 0 0 1 8 7a3.163 3.163 0 0 1 3-3c1.62.08 2.92 1.38 3 3a22.6 22.6 0 0 1-1 4.74c-.54 1.71-.87 3.47-1 5.26a5.136 5.136 0 0 0 5 5a5 5 0 0 0 5-5zM6 18a2 2 0 0 1-2-2a2 2 0 0 1 2-2a2 2 0 0 1 2 2a2 2 0 0 1-2 2"/></svg>` },
  9:  { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.5 19.13C20 17.77 20 15.18 20 14a4 4 0 0 0-4-4c-.7 0-1.4.2-2 .56V6a3 3 0 0 0-3-3c-.75 0-1.45.29-2 .78a2.997 2.997 0 0 0-4 0C4.45 3.28 3.74 3 3 3v2a1 1 0 0 1 1 1v10h2V6a1 1 0 0 1 1-1a1 1 0 0 1 1 1v10h2V6a1 1 0 0 1 1-1a1 1 0 0 1 1 1v8c0 1.18 0 3.77 1.5 5.13c-.78.41-1.62.71-2.5.87v2c1.29 0 3.84-1.26 5-1.87c1.16.61 3.71 1.87 5 1.87v-2c-.88-.16-1.72-.46-2.5-.87M16 12a2 2 0 0 1 2 2c0 2.92-.54 4-2 4s-2-1.08-2-4a2 2 0 0 1 2-2"/></svg>` },
  10: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 16v2h-7v-2.09c3-.55 4.96-3.41 4.41-6.41S14 4.54 11 5.09C8 5.65 6.04 8.5 6.59 11.5c.41 2.24 2.17 4 4.41 4.41V18H4v-2h2.92a7.43 7.43 0 0 1-2.42-5.5A7.5 7.5 0 0 1 12 3a7.5 7.5 0 0 1 7.5 7.5c0 2.09-.87 4.09-2.42 5.5zm0 3H4v2h16z"/></svg>` },
  11: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="m17.71 15.29l-1.42 1.42l1.3 1.29H16a2 2 0 0 1-2-2V6a3 3 0 0 0-3-3c-.75 0-1.45.29-2 .78a2.997 2.997 0 0 0-4 0C4.45 3.28 3.74 3 3 3v2a1 1 0 0 1 1 1v10h2V6a1 1 0 0 1 1-1a1 1 0 0 1 1 1v10h2V6a1 1 0 0 1 1-1a1 1 0 0 1 1 1v10a4 4 0 0 0 4 4h1.59l-1.3 1.29l1.42 1.42l3.7-3.71z"/></svg>` },
  12: { type: 'svg', value: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 2v10h-2V5.41L10.41 15l2.3 2.29l-1.42 1.42L9 16.41l-5.29 5.3l-1.42-1.42L7.59 15l-2.3-2.29l1.42-1.42L9 13.59L18.59 4H12V2z"/></svg>` }
};

// Home-tile signature watermarks — one per deck.
//
// IMPORTANT — body-parts entry is the original hand-drawn standing figure.
// Locked: do not modify without explicit request.

const HOME_MARKS = {
  'body-parts': `<svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="135" cy="90" r="34"/>
    <path d="M 135 124 L 135 240"/>
    <path d="M 135 145 L 75 200 M 135 145 L 245 220"/>
    <path d="M 135 240 L 100 360 M 135 240 L 195 360"/>
    <path d="M 75 200 L 60 250 M 245 220 L 290 280 L 320 320"/>
    <path d="M 90 360 L 115 360 M 185 360 L 215 360"/>
  </svg>`,

  // Months — MDI calendar-clock as the deck signature (matches the MDI
  // language used for the per-card zodiac symbols).
  months: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15 13h1.5v2.82l2.44 1.41l-.75 1.3L15 16.69zm4-5H5v11h4.67c-.43-.91-.67-1.93-.67-3a7 7 0 0 1 7-7c1.07 0 2.09.24 3 .67zM5 21a2 2 0 0 1-2-2V5c0-1.11.89-2 2-2h1V1h2v2h8V1h2v2h1a2 2 0 0 1 2 2v6.1c1.24 1.26 2 2.99 2 4.9a7 7 0 0 1-7 7c-1.91 0-3.64-.76-4.9-2zm11-9.85A4.85 4.85 0 0 0 11.15 16c0 2.68 2.17 4.85 4.85 4.85A4.85 4.85 0 0 0 20.85 16c0-2.68-2.17-4.85-4.85-4.85"/></svg>`
};
