// drawClock — renders a vector analog clock face as an SVG string.
//
// The hand angles are COMPUTED from the time, never faked: a card that shows
// the wrong angle teaches the wrong thing (naalika-spec § Notes). Both hands
// measure clockwise from the 12-o'clock position.
//   hour hand:   (hour % 12) * 30 + minute * 0.5  degrees
//   minute hand:  minute * 6                       degrees
//
// One function, reused across every mode and card face. `currentColor` lets it
// theme light/dark and pick up the accent wherever it is placed.
//
// opts:
//   numerals: 'arabic' (default) | 'thai' | 'none'

const CLOCK_THAI_NUMERALS = ['๑', '๒', '๓', '๔', '๕', '๖', '๗', '๘', '๙', '๑๐', '๑๑', '๑๒'];

function drawClock(hour, minute, opts = {}) {
  const numerals = opts.numerals || 'arabic';
  const cx = 100, cy = 100, rOuter = 92;

  const minuteAngle = minute * 6;
  const hourAngle   = (hour % 12) * 30 + minute * 0.5;

  // Point on a ray `angleDeg` degrees clockwise from 12, `length` from centre.
  const point = (angleDeg, length) => {
    const rad = (angleDeg - 90) * Math.PI / 180;
    return { x: cx + length * Math.cos(rad), y: cy + length * Math.sin(rad) };
  };
  const f = (n) => n.toFixed(1);

  // Tick marks — heavier at the quarters.
  let ticks = '';
  for (let i = 0; i < 12; i++) {
    const a = i * 30;
    const major = i % 3 === 0;
    const o = point(a, rOuter - 2);
    const inn = point(a, rOuter - (major ? 13 : 7));
    ticks += `<line x1="${f(o.x)}" y1="${f(o.y)}" x2="${f(inn.x)}" y2="${f(inn.y)}" stroke-width="${major ? 2.4 : 1.2}"/>`;
  }

  // Numerals (optional).
  let nums = '';
  if (numerals !== 'none') {
    const isThai = numerals === 'thai';
    const fam = isThai ? "'Noto Serif Thai', serif" : "'JetBrains Mono', monospace";
    for (let i = 1; i <= 12; i++) {
      const p = point(i * 30, rOuter - 25);
      const label = isThai ? CLOCK_THAI_NUMERALS[i - 1] : String(i);
      nums += `<text x="${f(p.x)}" y="${f(p.y)}" text-anchor="middle" dominant-baseline="central" font-size="13" font-family="${fam}">${label}</text>`;
    }
  }

  const hr = point(hourAngle, 47);
  const mn = point(minuteAngle, 70);

  return `<svg class="clock-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="${cx}" cy="${cy}" r="${rOuter}" stroke-width="2.5"/>
    <g class="clock-ticks">${ticks}</g>
    <g class="clock-numerals" fill="currentColor" stroke="none">${nums}</g>
    <line class="clock-hand-hour" x1="${cx}" y1="${cy}" x2="${f(hr.x)}" y2="${f(hr.y)}" stroke-width="5"/>
    <line class="clock-hand-min"  x1="${cx}" y1="${cy}" x2="${f(mn.x)}" y2="${f(mn.y)}" stroke-width="3"/>
    <circle class="clock-center" cx="${cx}" cy="${cy}" r="3.6" fill="currentColor" stroke="none"/>
  </svg>`;
}
