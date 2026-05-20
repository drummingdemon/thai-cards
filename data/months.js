// Thai months — single source of truth.
//
// Thai script + English are definitive. Romanisations (rom) are per the spec's
// best-guess in ครู's system and must be verified against the Wednesday
// whiteboard before publishing. The `ending` field encodes day-count:
//   -khom (-คม)  = 31 days
//   -yon  (-ยน)  = 30 days
//   -phan (-พันธ์) = February alone
// Zodiac fields are etymologically solid; the root (e.g. มกร in มกราคม)
// literally lives inside each name.

const MONTHS = [
  {
    num: 1,  numThai: "๑",  en: "January",   th: "มกราคม",       rom: "mák-rāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Capricorn",   glyph: "♑", root: "makara",     rootThai: "มกร",
      creature: "sea-dragon (makara)",
      note: "Mythical sea-creature — part crocodile, elephant, serpent. Thai/Hindu, not the Western goat." }
  },
  {
    num: 2,  numThai: "๒",  en: "February",  th: "กุมภาพันธ์",     rom: "kūm-phāa-phān",
    days: 28, ending: "-phan",
    zodiac: { sign: "Aquarius",    glyph: "♒", root: "kumbha",     rootThai: "กุมภ์",
      creature: "water pot / pitcher",
      note: "kumbha = pitcher. Only -พันธ์ month (Sanskrit bandha, 'bound')." }
  },
  {
    num: 3,  numThai: "๓",  en: "March",     th: "มีนาคม",         rom: "mīi-nāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Pisces",      glyph: "♓", root: "mina",       rootThai: "มีน",
      creature: "fish (a pair)",
      note: "mina = fish." }
  },
  {
    num: 4,  numThai: "๔",  en: "April",     th: "เมษายน",         rom: "mēe-sǎa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Aries",       glyph: "♈", root: "mesha",      rootThai: "เมษ",
      creature: "ram",
      note: "mesha = ram. Songkran sits here — sun enters Aries." }
  },
  {
    num: 5,  numThai: "๕",  en: "May",       th: "พฤษภาคม",       rom: "phrʉ́t-sà-phāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Taurus",      glyph: "♉", root: "vrishabha",  rootThai: "พฤษภ",
      creature: "bull",
      note: "vrishabha = bull." }
  },
  {
    num: 6,  numThai: "๖",  en: "June",      th: "มิถุนายน",       rom: "mí-thù-nāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Gemini",      glyph: "♊", root: "mithuna",    rootThai: "มิถุน",
      creature: "twins / a pair",
      note: "mithuna = a pair." }
  },
  {
    num: 7,  numThai: "๗",  en: "July",      th: "กรกฎาคม",       rom: "kà-rá-kà-dāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Cancer",      glyph: "♋", root: "karkata",    rootThai: "กรกฎ",
      creature: "crab",
      note: "karkata = crab." }
  },
  {
    num: 8,  numThai: "๘",  en: "August",    th: "สิงหาคม",        rom: "sǐng-hǎa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Leo",         glyph: "♌", root: "singha",     rootThai: "สิงห์",
      creature: "lion",
      note: "singha = lion. The Singha Beer lion. Buddha's protector." }
  },
  {
    num: 9,  numThai: "๙",  en: "September", th: "กันยายน",        rom: "kān-yāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Virgo",       glyph: "♍", root: "kanya",      rootThai: "กันย์",
      creature: "maiden",
      note: "kanya = girl / maiden." }
  },
  {
    num: 10, numThai: "๑๐", en: "October",   th: "ตุลาคม",         rom: "tù-lāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Libra",       glyph: "♎", root: "tula",       rootThai: "ตุล",
      creature: "scales / balance",
      note: "tula = balance." }
  },
  {
    num: 11, numThai: "๑๑", en: "November",  th: "พฤศจิกายน",     rom: "phrʉ́t-sà-jì-kāa-yōn",
    days: 30, ending: "-yon",
    zodiac: { sign: "Scorpio",     glyph: "♏", root: "vrishchika", rootThai: "พฤศจิก",
      creature: "scorpion",
      note: "vrishchika = scorpion (แมงป่อง)." }
  },
  {
    num: 12, numThai: "๑๒", en: "December",  th: "ธันวาคม",        rom: "than-wāa-khōm",
    days: 31, ending: "-khom",
    zodiac: { sign: "Sagittarius", glyph: "♐", root: "dhanu",      rootThai: "ธนู",
      creature: "bow / archer",
      note: "dhanu = bow." }
  }
];
