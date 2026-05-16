const WORDS = [
  { en: "eye",         th: "ตา",       rom: "tāa" },
  { en: "ear",         th: "หู",       rom: "hǔu" },
  { en: "mouth",       th: "ปาก",      rom: "pàak" },
  { en: "nose",        th: "จมูก",     rom: "càmùuk" },
  { en: "foot",        th: "เท้า",      rom: "tháaw" },
  { en: "arm",         th: "แขน",      rom: "khɛ̌ɛn" },
  { en: "leg",         th: "ขา",       rom: "khǎa" },
  { en: "head",        th: "หัว",      rom: "hǔa" },
  { en: "eyebrow",     th: "คิ้ว",      rom: "khíw" },
  { en: "eyelash",     th: "ขนตา",     rom: "khǒntāa" },
  { en: "tooth",       th: "ฟัน",       rom: "fān" },
  { en: "tongue",      th: "ลิ้น",      rom: "lín" },
  { en: "face",        th: "หน้า",     rom: "nâa" },
  { en: "neck",        th: "คอ",       rom: "khɔ̄ɔ" },
  { en: "shoulder",    th: "ไหล่",     rom: "lày" },
  { en: "hand",        th: "มือ",       rom: "mʉ̄ʉ" },
  { en: "finger",      th: "นิ้วมือ",   rom: "níwmʉ̄ʉ" },
  { en: "fingernail",  th: "เล็บมือ",   rom: "lépmʉ̄ʉ" },
  { en: "stomach",     th: "ท้อง",      rom: "thɔ́ɔŋ" },
  { en: "knee",        th: "เข่า",      rom: "khàw" },
  { en: "elbow",       th: "ศอก",      rom: "sɔ̀ɔk" }
];

// Anatomical highlight positions on the figure (viewBox 100 x 145)
const HIGHLIGHTS = {
  "eye":        { cx: 45,   cy: 20,    rx: 2,    ry: 1.4 },
  "ear":        { cx: 38.5, cy: 22.5,  rx: 1.8,  ry: 2.2 },
  "mouth":      { cx: 50,   cy: 29,    rx: 3.2,  ry: 1.6 },
  "nose":       { cx: 50,   cy: 24.5,  rx: 1.5,  ry: 2 },
  "foot":       { cx: 40,   cy: 136,   rx: 7,    ry: 3 },
  "arm":        { cx: 28,   cy: 60,    rx: 3.5,  ry: 11 },
  "leg":        { cx: 40,   cy: 110,   rx: 3.5,  ry: 18 },
  "head":       { cx: 50,   cy: 20,    rx: 12,   ry: 14 },
  "eyebrow":    { cx: 45,   cy: 16.3,  rx: 2.5,  ry: 1 },
  "eyelash":    { cx: 45,   cy: 18.7,  rx: 2.5,  ry: 0.8 },
  "tooth":      { cx: 50,   cy: 29,    rx: 2,    ry: 1.2 },
  "tongue":     { cx: 50,   cy: 30,    rx: 2,    ry: 1.5 },
  "face":       { cx: 50,   cy: 23,    rx: 9.5,  ry: 11 },
  "neck":       { cx: 50,   cy: 36,    rx: 4,    ry: 2.5 },
  "shoulder":   { cx: 36,   cy: 41.5,  rx: 3,    ry: 2.5 },
  "hand":       { cx: 24,   cy: 87,    rx: 4,    ry: 5 },
  "finger":     { cx: 24,   cy: 91.5,  rx: 3,    ry: 2 },
  "fingernail": { cx: 24,   cy: 93,    rx: 3,    ry: 1 },
  "stomach":    { cx: 50,   cy: 70,    rx: 8,    ry: 7 },
  "knee":       { cx: 40,   cy: 110,   rx: 3.5,  ry: 2.5 },
  "elbow":      { cx: 26,   cy: 64,    rx: 2.5,  ry: 2.5 }
};

const card       = document.getElementById('card');
const counter    = document.getElementById('counter');
const frontBadge = document.getElementById('frontBadge');
const backBadge  = document.getElementById('backBadge');
const frontWord  = document.getElementById('frontWord');
const frontRom   = document.getElementById('frontRom');
const backThai   = document.getElementById('backThai');
const backRom    = document.getElementById('backRom');
const backEn     = document.getElementById('backEn');
const nextBtn    = document.getElementById('nextBtn');
const flipBtn    = document.getElementById('flipBtn');
const prevBtn    = document.getElementById('prevBtn');
const sideNextBtn = document.getElementById('sideNextBtn');
const dirToggle  = document.getElementById('dirToggle');
const modeLabel  = document.getElementById('modeLabel');
const themeToggle = document.getElementById('themeToggle');
const themeLabel  = document.getElementById('themeLabel');
const metaThemeColor = document.getElementById('metaThemeColor');
const ring       = document.querySelector('#highlight .ring');
const dot        = document.querySelector('#highlight .dot');

let queue = [];
let index = 0;
let direction = 'en2th';
let current = null;
let pendingStep = 1;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function reshuffle() {
  queue = shuffle(WORDS);
  if (current && queue[0] && queue[0].en === current.en && queue.length > 1) {
    [queue[0], queue[1]] = [queue[1], queue[0]];
  }
  index = 0;
}

function pad(n) { return String(n).padStart(2, '0'); }

function setHighlight(word) {
  const h = HIGHLIGHTS[word.en];
  if (!h) return;
  ring.setAttribute('cx', h.cx);
  ring.setAttribute('cy', h.cy);
  ring.setAttribute('rx', h.rx);
  ring.setAttribute('ry', h.ry);
  const isLarge = h.rx > 5 || h.ry > 5;
  if (isLarge) {
    dot.style.display = 'none';
  } else {
    dot.style.display = '';
    dot.setAttribute('cx', h.cx);
    dot.setAttribute('cy', h.cy);
    dot.setAttribute('r', Math.min(Math.min(h.rx, h.ry) * 0.55, 1.4));
  }
  // re-trigger fadeIn animation
  const group = document.getElementById('highlight');
  group.style.animation = 'none';
  void group.offsetWidth;
  group.style.animation = '';
}

function render() {
  if (index >= queue.length) reshuffle();
  current = queue[index];

  if (direction === 'en2th') {
    frontBadge.textContent = 'English';
    backBadge.textContent  = 'ภาษาไทย';
    frontWord.textContent  = current.en;
    frontWord.classList.remove('thai-mode');
    frontRom.textContent   = '';
    frontRom.classList.remove('visible');
    backThai.textContent   = current.th;
    backRom.textContent    = current.rom;
    backEn.textContent     = current.en;
    backThai.style = '';
    backEn.style   = '';
  } else {
    frontBadge.textContent = 'ภาษาไทย';
    backBadge.textContent  = 'English';
    frontWord.textContent  = current.th;
    frontWord.classList.add('thai-mode');
    frontRom.textContent   = current.rom;
    frontRom.classList.add('visible');
    backThai.textContent   = current.en;
    backThai.style.fontFamily = "'Fraunces', serif";
    backThai.style.fontWeight = '300';
    backThai.style.color = 'var(--ink)';
    backRom.textContent    = current.rom;
    backEn.textContent     = '— ' + current.th;
    backEn.style.fontFamily = "'Noto Serif Thai', serif";
    backEn.style.fontStyle  = 'normal';
  }

  setHighlight(current);
  counter.textContent = `${pad(index + 1)} / ${pad(queue.length)}`;

  card.classList.remove('flipped');
  card.classList.remove('enter');
  void card.offsetWidth;
  card.classList.add('enter');
}

function flip() {
  if (card.classList.contains('exit')) return;
  card.classList.toggle('flipped');
}
function next() {
  if (card.classList.contains('exit')) return;
  pendingStep = 1;
  card.classList.remove('enter');
  card.classList.add('exit');
}
function prev() {
  if (card.classList.contains('exit')) return;
  pendingStep = -1;
  card.classList.remove('enter');
  card.classList.add('exit');
}

card.addEventListener('click', flip);
flipBtn.addEventListener('click', (e) => { e.stopPropagation(); flip(); });
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
if (sideNextBtn) sideNextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

card.addEventListener('animationend', (e) => {
  if (e.target !== card) return;
  if (e.animationName === 'cardExit') {
    card.classList.add('no-transition');
    card.classList.remove('exit');
    index += pendingStep;
    if (index < 0) index = queue.length - 1;
    render();
  } else if (e.animationName === 'cardEnter') {
    card.classList.remove('enter');
    card.classList.remove('no-transition');
  }
});

dirToggle.addEventListener('click', () => {
  direction = direction === 'en2th' ? 'th2en' : 'en2th';
  modeLabel.textContent = direction === 'en2th' ? 'EN → TH' : 'TH → EN';
  current = null;
  reshuffle();
  render();
});

function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  themeLabel.textContent = mode === 'dark' ? 'Dark' : 'Light';
  if (metaThemeColor) metaThemeColor.setAttribute('content', mode === 'dark' ? '#181410' : '#F2E8D0');
  try { localStorage.setItem('theme', mode); } catch (e) {}
}
applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
themeToggle.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
});

window.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  if (e.key === 'ArrowRight' || e.key === 'n') { next(); }
  if (e.key === 'ArrowLeft' || e.key === 'p') { prev(); }
});

reshuffle();
render();
