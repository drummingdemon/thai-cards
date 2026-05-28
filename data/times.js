// Thai six-hour-clock drill bank — generated, with a hand-checked sample.
//
// Thai time is a CONVERSION SYSTEM, not a word list: the number you say
// depends on which of the day's periods the hour falls in, and it rarely
// matches the clock-face number (the clock shows 7, the mouth says
// หนึ่งทุ่ม). makeTime(h, m) runs that conversion from a single source of
// truth — the 24-hour `h` — so every card is internally consistent.
//
// Romanisation follows ครู's system; spaces between words, hyphens inside a
// multi-syllable number. Do not auto-normalise.

// Cardinal number words 0–9.
const TH_DIGITS = {
  0: { th: 'ศูนย์', rom: 'sǔun' },
  1: { th: 'หนึ่ง', rom: 'nʉ̀ng' },
  2: { th: 'สอง',  rom: 'sɔ̌ɔng' },
  3: { th: 'สาม',  rom: 'sǎam' },
  4: { th: 'สี่',   rom: 'sìi' },
  5: { th: 'ห้า',   rom: 'hâa' },
  6: { th: 'หก',   rom: 'hòk' },
  7: { th: 'เจ็ด', rom: 'jèt' },
  8: { th: 'แปด', rom: 'pɛ̀ɛt' },
  9: { th: 'เก้า', rom: 'kâo' }
};

// Thai number 0–59. Tens use ยี่ for 20 and เอ็ด for a trailing 1.
function thaiNumber(n) {
  if (n < 10) return { th: TH_DIGITS[n].th, rom: TH_DIGITS[n].rom };
  const tens = Math.floor(n / 10);
  const unit = n % 10;
  let th, rom;
  if (tens === 1)      { th = 'สิบ';   rom = 'sìp'; }
  else if (tens === 2) { th = 'ยี่สิบ'; rom = 'yîi-sìp'; }
  else                 { th = TH_DIGITS[tens].th + 'สิบ'; rom = TH_DIGITS[tens].rom + '-sìp'; }
  if (unit === 1)      { th += 'เอ็ด'; rom += '-èt'; }
  else if (unit > 0)   { th += TH_DIGITS[unit].th; rom += '-' + TH_DIGITS[unit].rom; }
  return { th, rom };
}

// Period reference — drives the data, the help panel, and the MC rule-reveal.
const PERIODS = {
  'tii':         { th: 'ตี',        rom: 'tii',         range: '1–5 AM',  rule: 'ตี + number. ตีหนึ่ง = 1 AM, ตีห้า = 5 AM.' },
  'chao':        { th: 'เช้า',      rom: 'cháao',       range: '6–11 AM', rule: 'number + โมงเช้า. หกโมงเช้า = 6 AM.' },
  'thiang':      { th: 'เที่ยง',    rom: 'thîaŋ',       range: '12 PM',   rule: 'เที่ยง = noon.' },
  'baai':        { th: 'บ่าย',      rom: 'bàai',        range: '1–3 PM',  rule: 'บ่าย + number + โมง. บ่ายโมง = 1 PM — the number drops.' },
  'yen':         { th: 'เย็น',      rom: 'yen',         range: '4–6 PM',  rule: 'number + โมงเย็น. สี่โมงเย็น = 4 PM.' },
  'thum':        { th: 'ทุ่ม',      rom: 'thûm',        range: '7–11 PM', rule: 'number + ทุ่ม — the count RESTARTS. 7 PM = หนึ่งทุ่ม (one ทุ่ม), not seven.' },
  'thiang-kuun': { th: 'เที่ยงคืน', rom: 'thîaŋ-kʉʉn',  range: '12 AM',   rule: 'เที่ยงคืน = midnight.' }
};

const PERIOD_ORDER = ['tii', 'chao', 'thiang', 'baai', 'yen', 'thum', 'thiang-kuun'];

function periodFor(h) {
  if (h === 0)            return 'thiang-kuun';
  if (h >= 1 && h <= 5)   return 'tii';
  if (h >= 6 && h <= 11)  return 'chao';
  if (h === 12)           return 'thiang';
  if (h >= 13 && h <= 15) return 'baai';
  if (h >= 16 && h <= 18) return 'yen';
  return 'thum'; // 19–23
}

function enLabel(h, m) {
  const ampm = h < 12 ? 'AM' : 'PM';
  let hr = h % 12; if (hr === 0) hr = 12;
  return `${hr}:${String(m).padStart(2, '0')} ${ampm}`;
}

// Build one card from a 24-hour time.
function makeTime(h, m) {
  const period = periodFor(h);
  let hourTh, hourRom;

  switch (period) {
    case 'thiang-kuun': hourTh = 'เที่ยงคืน'; hourRom = 'thîaŋ-kʉʉn'; break;
    case 'thiang':      hourTh = 'เที่ยง';    hourRom = 'thîaŋ'; break;
    case 'tii': {
      const n = thaiNumber(h);
      hourTh = 'ตี' + n.th; hourRom = 'tii ' + n.rom; break;
    }
    case 'chao': {
      const n = thaiNumber(h);
      hourTh = n.th + 'โมงเช้า'; hourRom = n.rom + ' moong cháao'; break;
    }
    case 'baai': {
      const num = h - 12;
      if (num === 1) { hourTh = 'บ่ายโมง'; hourRom = 'bàai moong'; }
      else { const n = thaiNumber(num); hourTh = 'บ่าย' + n.th + 'โมง'; hourRom = 'bàai ' + n.rom + ' moong'; }
      break;
    }
    case 'yen': {
      const n = thaiNumber(h - 12);
      hourTh = n.th + 'โมงเย็น'; hourRom = n.rom + ' moong yen'; break;
    }
    case 'thum': {
      const n = thaiNumber(h - 18);
      hourTh = n.th + 'ทุ่ม'; hourRom = n.rom + ' thûm'; break;
    }
  }

  let th = hourTh, rom = hourRom;
  if (m === 30) {
    th += 'ครึ่ง'; rom += ' khrʉ̂ŋ';
  } else if (m > 0) {
    const mn = thaiNumber(m);
    th += mn.th + 'นาที'; rom += ' ' + mn.rom + ' naathii';
  }

  return { h, m, period, th, rom, en: enLabel(h, m) };
}

// Seed bank: every on-the-hour time (all seven periods), plus a spread of
// half-pasts, quarters and odd minutes so the minute pattern drills too.
const TIMES = (() => {
  const bank = [];
  for (let h = 0; h < 24; h++) bank.push(makeTime(h, 0));
  const withMinutes = [
    [1, 15], [3, 30], [7, 30], [9, 45], [10, 20],
    [13, 30], [14, 15], [15, 50], [17, 15], [19, 30],
    [20, 45], [22, 10], [6, 5], [8, 40]
  ];
  withMinutes.forEach(([h, m]) => bank.push(makeTime(h, m)));
  return bank;
})();
