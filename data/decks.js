// Deck registry — single source of truth for what decks exist.
//
// Each deck binds its data array, the supported modes, and the motif kind so
// the renderer can dispatch on `id` rather than special-casing per deck.

const DECKS = {
  'body-parts': {
    id: 'body-parts',
    name: 'Body Parts',
    nameThai: 'อวัยวะ',
    items: typeof WORDS !== 'undefined' ? WORDS : [],
    modes: ['random'],
    defaultMode: 'random',
    motif: 'figure'   // anatomical figure SVG (built into the markup)
  },
  'months': {
    id: 'months',
    name: 'Months',
    nameThai: 'เดือน',
    items: typeof MONTHS !== 'undefined' ? MONTHS : [],
    modes: ['sequential', 'random', 'numbers', 'list'],
    defaultMode: 'sequential',
    motif: 'zodiac'   // per-item motif lookup via MOTIFS[item.num]
  },
  'naalika': {
    id: 'naalika',
    name: 'Clock',
    nameThai: 'นาฬิกา',
    items: typeof TIMES !== 'undefined' ? TIMES : [],
    modes: ['clock', 'thai', 'mc'],
    defaultMode: 'clock',
    motif: 'clock'    // analog clock face drawn per card via drawClock()
  }
};

// Ordered list for the home screen.
const DECK_ORDER = ['body-parts', 'months', 'naalika'];
