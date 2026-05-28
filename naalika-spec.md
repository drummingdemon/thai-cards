# `naalika` — Thai Time-Telling Drill Module

A drill module for the Thai **six-hour clock** system (ระบบเวลาแบบ ๖ ชั่วโมง). Cards pair a vector analog clock face with the spoken Thai time, drilled in multiple directions. Slots into `thai-file` as a module, or stands alone — same `thai-cards` design system either way.

**Why this is its own module, not just vocab:** Thai time isn't a word list, it's a *conversion system*. The number you say depends on which of the day's periods the hour falls in, and it rarely matches the clock-face number. Telling time = running the conversion. So the drill trains the mapping `clock face ↔ spoken Thai`, both directions, not flashcard recall.

---

## The system being drilled (reference — bake into the module's data + a help panel)

Thai splits the 24-hour day into chunks, each with its own counting rule:

| Period | Clock range | Thai pattern | Notes |
|--------|-------------|--------------|-------|
| ตี (tii) | 1–5 AM | ตี + [1–5] | ตีหนึ่ง = 1 AM, ตีห้า = 5 AM |
| เช้า (cháao) | 6–11 AM | [6–11] + โมงเช้า | หกโมงเช้า = 6 AM, สิบเอ็ดโมงเช้า = 11 AM |
| เที่ยง (thîaŋ) | 12 PM | เที่ยง / เที่ยงวัน | noon |
| บ่าย (bàai) | 1–3 PM | บ่าย + [1–3] + โมง | บ่ายโมง = 1 PM, บ่ายสองโมง = 2 PM, บ่ายสามโมง = 3 PM |
| เย็น (yen) | 4–6 PM | [4–6] + โมงเย็น | สี่โมงเย็น = 4 PM, หกโมงเย็น = 6 PM |
| ทุ่ม (thûm) | 7–11 PM | [1–5] + ทุ่ม | หนึ่งทุ่ม = 7 PM, ห้าทุ่ม = 11 PM (count restarts!) |
| เที่ยงคืน (thîaŋ-kʉʉn) | 12 AM | เที่ยงคืน | midnight |

**Minutes:** [hour phrase] + [minutes] + นาที (naathii). Half past = ครึ่ง (khrʉ̂ŋ). E.g. บ่ายสองโมงครึ่ง = 2:30 PM. โมง (moong) = the "o'clock" bell-word for daytime hours.

**The traps (flag these explicitly in a help/notes panel):**
- ทุ่ม restarts counting at 7 PM: 7 PM = *one* ทุ่ม, not seven of anything.
- บ่าย and เย็น both cover afternoon but split at 4 PM, and บ่ายโมง drops the number for 1 PM.
- โมงเช้า vs โมงเย็น — same โมง, different half of the day.
- The clock face shows 7; the mouth says หนึ่งทุ่ม. That gap is the whole difficulty.

---

## The clock graphic

Each card centres a **vector analog clock** — clean, in the thai-cards aesthetic, the watermark/line-art register but here it's the *foreground hero*, not a faint motif.

- **SVG**, `viewBox="0 0 200 200"`. Single-weight strokes, `currentColor` so it themes light/dark and picks up the accent.
- Face: outer ring, 12 tick marks (or numerals — see below), centre dot.
- **Hands positioned at the actual angle** for the card's time: hour hand `(hour%12)*30 + minutes*0.5` degrees, minute hand `minutes*6` degrees, both from 12-o'clock, clockwise. Hour hand shorter/thicker, minute hand longer/thinner. No second hand.
- Two numeral modes (user setting): **Arabic 1–12**, or **Thai numerals ๑–๑๒** for extra script practice. Default Arabic.
- Optional faint AM/PM or period tint behind the face (e.g. warm tint for ทุ่ม/evening, cool for ตี/early-morning) — subtle, helps anchor which period the time sits in. Off by default; toggle in settings.
- Render the clock from a single function `drawClock(hour, minute, opts)` returning the SVG — reused across all modes and card faces.

---

## Card data shape

```js
// data/times.js — the drill bank
const TIMES = [
  { h: 1,  m: 0,  period: "tii",        th: "ตีหนึ่ง",            rom: "tii nʉ̀ng",              en: "1:00 AM" },
  { h: 7,  m: 0,  period: "thum",       th: "หนึ่งทุ่ม",          rom: "nʉ̀ng thûm",            en: "7:00 PM" },
  { h: 14, m: 30, period: "baai",       th: "บ่ายสองโมงครึ่ง",     rom: "bàai sɔ̌ɔŋ moong khrʉ̂ŋ", en: "2:30 PM" },
  { h: 12, m: 0,  period: "thiang",     th: "เที่ยง",             rom: "thîaŋ",                 en: "12:00 PM" }
  // …seed a solid bank: every on-the-hour across all periods, plus a spread of :15 :30 :45 and odd minutes
];
```

`h` is 24-hour (the source of truth for drawing the clock + computing the period); `th`/`rom`/`en` are the spoken answer. **Romanisation faithful to ครู's system — do not auto-normalise** (same rule as the rest of the project).

**Seed bank:** at minimum every on-the-hour time across all seven periods (covers the core conversion), plus a generous spread of half-pasts and quarter/odd minutes so the minute-pattern drills too. A generator function `makeTime(h, m)` that computes `period` + assembles `th`/`rom`/`en` from the rules above would let the bank be produced programmatically rather than hand-typed — recommended, with a hand-checked sample to validate the generator.

---

## Modes (segmented control, same pattern as months deck)

1. **See clock → say time** (default, the core skill). Front: clock face only. Tap to reveal the Thai reading (th + rom + en) on the back. This is the real-world skill — you look at a นาฬิกา and produce the Thai.

2. **Hear/read Thai → set the clock.** Front: the Thai time (script + rom). The user mentally places the hands; tap reveals the clock face with hands at the right angle. Reverse direction — trains comprehension.

3. **Multiple choice.** Front: a clock face + four Thai options (one correct, three plausible distractors — ideally same-period near-misses, e.g. หนึ่งทุ่ม vs สองทุ่ม, to drill the exact confusion). Tap an option → immediate right/wrong feedback, then the rule that applies. Good for fast reps and for surfacing the traps.

4. **Period focus** (filter, combinable with the above). Drill only one period at a time — just ทุ่ม, just บ่าย/เย็น — to grind the specific chunk that keeps beating you. A period selector chip row.

All modes: shuffle by default; TTS speaker reads the Thai time aloud (th-TH). Card flip / counter / keyboard shortcuts inherit from the thai-file/thai-cards card behaviour (reimplemented in `drill.js`, per the build spec — not an imported module).

---

## Help / reference panel

A tappable ⓘ that opens the period table above as an always-available cheat-sheet, with the traps called out. Reference, never hidden behind a quiz. The user is fighting a *system*; let them see the system.

---

## Files / integration

```
naalika/                      (or thai-file/modules/naalika/)
├── data/times.js             # the drill bank (generated + hand-checked)
├── clock.js                  # drawClock(hour, minute, opts) → SVG
├── naalika.js                # modes, card flow, MC logic, period filter
└── (styles inherited from thai-cards design tokens)
```

If inside `thai-file`: add it as a third top-level mode alongside Reference and Drill — "Clock / นาฬิกา" — routed at `#naalika`. If standalone: same shell as thai-cards, single-purpose.

---

## Phasing

**v0.1** — `drawClock()` + Mode 1 (clock → reveal Thai), on-the-hour bank across all periods. Ship; this alone is the core fight.
**v0.2** — Minutes (half/quarter/odd) + Mode 2 (Thai → clock).
**v0.3** — Mode 3 multiple-choice with same-period distractors + the rule-reveal feedback.
**v0.4** — Period-focus filter, Thai-numeral clock face option, period tint, help panel.

---

## Notes & lessons

- **The clock hand angles must be computed, not faked** — `(h%12)*30 + m*0.5` for the hour hand is the bit that makes the card honest. A clock showing the wrong angle teaches the wrong thing.
- **Distractors should be same-period near-misses**, not random — the learning is in distinguishing หนึ่งทุ่ม from สองทุ่ม, not from เที่ยง.
- **Romanisation faithful, never auto-normalised** — ครู's system throughout (the recurring project rule).
- **Drive everything off 24-hour `h`** — period, clock angle, and the spoken phrase all derive from it; one source of truth per card.
- **Reuse card behaviour from reference** (thai-cards `app.js`), don't expect an importable module — same as the thai-file build spec.

---

*Hand to Claude Code. Reuse the thai-file/thai-cards design tokens and card behaviour. Build `drawClock()` first and eyeball a few times for correct hand angles before wiring the modes.*
