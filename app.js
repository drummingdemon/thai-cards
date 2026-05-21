// thai-cards — multi-deck flashcard app.
//
// Two views: a home/deck-selector and a drill view. The drill view is
// deck-aware: it hosts one DOM tree per deck (body-parts faces + months faces
// stay mounted side-by-side, toggled by CSS on `data-deck`). Routing is
// hash-based:
//   #                  → home
//   #body-parts        → body parts (random, the only mode it has)
//   #months            → months, sequential mode (default — test part 1)
//   #months/random     → months, shuffled (no repeats until exhausted)
//   #months/numbers    → number-prompt drill (test part 2)
//
// State lives in `state` below. Each render dispatches on `state.deck` to
// either renderBodyParts() or renderMonth(). The body-parts code path mirrors
// v1 exactly; the months path is new.

// ---- DOM refs (shared shell) ----
const appEl       = document.getElementById('app');
const homeScreen  = document.getElementById('homeScreen');
const homeDecks   = document.getElementById('homeDecks');
const deckView    = document.getElementById('deckView');
const homeBtn     = document.getElementById('homeBtn');
const deckTitleThai = document.getElementById('deckTitleThai');
const deckTitleEn   = document.getElementById('deckTitleEn');
const cardStage   = document.getElementById('cardStage');
const card        = document.getElementById('card');
const counter     = document.getElementById('counter');
const modeSelector = document.getElementById('modeSelector');
const dirToggle   = document.getElementById('dirToggle');
const modeLabel   = document.getElementById('modeLabel');
const themeToggle = document.getElementById('themeToggle');
const themeLabel  = document.getElementById('themeLabel');
const homeThemeToggle = document.getElementById('homeThemeToggle');
const homeThemeLabel  = document.getElementById('homeThemeLabel');
const metaThemeColor  = document.getElementById('metaThemeColor');

// body-parts refs (v1 — leave behaviour untouched)
const frontBadge = document.getElementById('frontBadge');
const backBadge  = document.getElementById('backBadge');
const frontWord  = document.getElementById('frontWord');
const frontRom   = document.getElementById('frontRom');
const backThai   = document.getElementById('backThai');
const backRom    = document.getElementById('backRom');
const backEn     = document.getElementById('backEn');
const speakBtn   = document.getElementById('speakBtn');
const ring       = document.querySelector('#highlight .ring');
const dot        = document.querySelector('#highlight .dot');

// months refs
const moFrontBadge = document.getElementById('moFrontBadge');
const moBackBadge  = document.getElementById('moBackBadge');
const moMotifFront = document.getElementById('moMotifFront');
const moMotifBack  = document.getElementById('moMotifBack');
const moNumberBlock = document.getElementById('moNumberBlock');
const moNumArabic  = document.getElementById('moNumArabic');
const moFrontEn    = document.getElementById('moFrontEn');
const moBackThai   = document.getElementById('moBackThai');
const moBackRom    = document.getElementById('moBackRom');
const moBackEn     = document.getElementById('moBackEn');
const moBackDays   = document.getElementById('moBackDays');
const moBackEnding = document.getElementById('moBackEnding');
const moBackSign   = document.getElementById('moBackSign');
const moBackRootTh = document.getElementById('moBackRootTh');
const moBackRootEn = document.getElementById('moBackRootEn');
const moBackCreature = document.getElementById('moBackCreature');
const moSpeakBtn   = document.getElementById('moSpeakBtn');

// controls
const nextBtn    = document.getElementById('nextBtn');
const flipBtn    = document.getElementById('flipBtn');
const backBtn    = document.getElementById('backBtn');
const prevBtn    = document.getElementById('prevBtn');
const sideNextBtn = document.getElementById('sideNextBtn');
const listBtn       = document.getElementById('listBtn');
const wordListModal = document.getElementById('wordListModal');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalClose    = document.getElementById('modalClose');
const modalTitle    = document.getElementById('modalTitle');
const modalBanner   = document.getElementById('modalBanner');
const modalBannerToggle = document.getElementById('modalBannerToggle');
const modalBannerBody   = document.getElementById('modalBannerBody');
const listGrid      = document.getElementById('listGrid');
const modalList     = document.getElementById('modalList');

// ---- State ----
let state = {
  view: 'home',      // 'home' | 'deck'
  deck: null,        // 'body-parts' | 'months'
  mode: null,        // 'random' | 'sequential' | 'numbers'
  direction: 'en2th',// body-parts only
  queue: [],
  index: 0,
  current: null,
  pendingStep: 1
};

// ---- Helpers ----
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pad(n) { return String(n).padStart(2, '0'); }

// ---- Routing ----
function parseHash() {
  // "#months/numbers" → { deck: 'months', mode: 'numbers' }
  // "#months"         → { deck: 'months', mode: <default> }
  // "#body-parts"     → { deck: 'body-parts', mode: 'random' }
  // ""                → { deck: null, mode: null }
  const raw = (location.hash || '').replace(/^#/, '').trim();
  if (!raw) return { deck: null, mode: null };
  const [deckId, modeId] = raw.split('/');
  const deck = DECKS[deckId];
  if (!deck) return { deck: null, mode: null };
  let mode = modeId && deck.modes.includes(modeId) ? modeId : deck.defaultMode;
  return { deck: deckId, mode };
}

function setHash(deckId, modeId) {
  if (!deckId) { location.hash = ''; return; }
  const deck = DECKS[deckId];
  // Only include the mode segment when it differs from the deck's default,
  // so URLs stay clean (#months → sequential implicitly).
  if (modeId && modeId !== deck.defaultMode) {
    location.hash = `${deckId}/${modeId}`;
  } else {
    location.hash = deckId;
  }
}

function handleRoute() {
  const { deck, mode } = parseHash();
  if (!deck) {
    enterHome();
  } else {
    enterDeck(deck, mode);
  }
}

// ---- Views ----
function enterHome() {
  state.view = 'home';
  state.deck = null;
  state.mode = null;
  state.current = null;
  appEl.setAttribute('data-view', 'home');
  appEl.removeAttribute('data-deck');
  appEl.removeAttribute('data-mode');
  if (listGrid) { listGrid.hidden = true; listGrid.innerHTML = ''; }
  deckView.hidden = true;
  homeScreen.hidden = false;
  closeWordList();
  syncThemeToggleLabels();
}

function enterDeck(deckId, mode) {
  const deck = DECKS[deckId];
  if (!deck) { enterHome(); return; }

  const reset = (state.deck !== deckId) || (state.mode !== mode);
  state.view = 'deck';
  state.deck = deckId;
  state.mode = mode;

  appEl.setAttribute('data-view', 'deck');
  appEl.setAttribute('data-deck', deckId);
  appEl.setAttribute('data-mode', mode);
  cardStage.setAttribute('data-deck', deckId);
  cardStage.setAttribute('data-mode', mode);
  deckView.hidden = false;
  homeScreen.hidden = true;
  listGrid.hidden = (mode !== 'list');

  deckTitleThai.textContent = deck.nameThai;
  deckTitleEn.textContent = deck.name + (deckId === 'body-parts' ? ' · รักภาษาไทย L2' : '');

  // Mode selector only shown when the deck offers a choice.
  if (deck.modes.length > 1) {
    modeSelector.hidden = false;
    modeSelector.querySelectorAll('.mode-btn').forEach(btn => {
      const isMine = deck.modes.includes(btn.dataset.mode);
      btn.style.display = isMine ? '' : 'none';
      btn.setAttribute('aria-selected', btn.dataset.mode === mode ? 'true' : 'false');
    });
  } else {
    modeSelector.hidden = true;
  }

  // Direction toggle: body-parts only. (Numbers mode handles direction in its layout.)
  dirToggle.style.display = deckId === 'body-parts' ? '' : 'none';

  if (mode === 'list') {
    renderList(deck);
    return;
  }

  if (reset) {
    buildQueue(deck, mode);
    state.index = 0;
    state.current = null;
  }
  render();
}

function renderList(deck) {
  listGrid.innerHTML = '';
  const frag = document.createDocumentFragment();
  deck.items.forEach(m => {
    const tile = document.createElement('button');
    tile.className = 'list-tile';
    tile.type = 'button';
    tile.setAttribute('aria-label', `speak ${m.en} in Thai`);

    // Zodiac silhouette watermark, same SVG asset the cards use.
    const motif = (typeof MOTIFS !== 'undefined' && MOTIFS[m.num]) || null;
    const motifWrap = document.createElement('div');
    motifWrap.className = 'motif-wrap';
    motifWrap.setAttribute('aria-hidden', 'true');
    setMotif(motifWrap, motif);

    const num = document.createElement('span'); num.className = 'num'; num.textContent = String(m.num);
    const rom = document.createElement('span'); rom.className = 'rom';
    // Split the romanization at its day-count suffix so the zodiac root can
    // carry a subtle accent tint — e.g. "makaraa" | "khōm".
    const romMatch = m.rom.match(/^(.+?)(khōm|yōn|phān)$/);
    if (romMatch) {
      const root   = document.createElement('span'); root.className   = 'rom-root';   root.textContent   = romMatch[1];
      const suffix = document.createElement('span'); suffix.className = 'rom-suffix'; suffix.textContent = romMatch[2];
      rom.append(root, suffix);
    } else {
      rom.textContent = m.rom;
    }
    tile.append(motifWrap, num, rom);
    tile.addEventListener('click', () => speakThai(m.th, tile));
    frag.appendChild(tile);
  });
  listGrid.appendChild(frag);
}

// ---- Queue construction per (deck, mode) ----
function buildQueue(deck, mode) {
  if (mode === 'sequential') {
    state.queue = deck.items.slice();      // 1→12 order
  } else if (mode === 'random' || mode === 'numbers') {
    state.queue = shuffle(deck.items);
    // Numbers mode is just "random with a different front layout".
  } else {
    state.queue = deck.items.slice();
  }
}

function reshuffleSameMode() {
  const deck = DECKS[state.deck];
  buildQueue(deck, state.mode);
  // Avoid showing the same card immediately after a reshuffle.
  if (state.current && state.queue[0] === state.current && state.queue.length > 1) {
    [state.queue[0], state.queue[1]] = [state.queue[1], state.queue[0]];
  }
  state.index = 0;
}

// ---- Rendering ----
function render() {
  if (state.deck === 'body-parts') renderBodyParts();
  else if (state.deck === 'months') renderMonth();
}

function renderBodyParts() {
  if (state.index >= state.queue.length) reshuffleSameMode();
  state.current = state.queue[state.index];
  const w = state.current;
  if (state.direction === 'en2th') {
    frontBadge.textContent = 'English';
    backBadge.textContent  = 'ภาษาไทย';
    frontWord.textContent  = w.en;
    frontWord.classList.remove('thai-mode');
    frontRom.textContent   = '';
    frontRom.classList.remove('visible');
    backThai.textContent   = w.th;
    backRom.textContent    = w.rom;
    backEn.textContent     = w.en;
    backThai.style = '';
    backEn.style   = '';
  } else {
    frontBadge.textContent = 'ภาษาไทย';
    backBadge.textContent  = 'English';
    frontWord.textContent  = w.th;
    frontWord.classList.add('thai-mode');
    frontRom.textContent   = w.rom;
    frontRom.classList.add('visible');
    backThai.textContent   = w.en;
    backThai.style.fontFamily = "'Fraunces', serif";
    backThai.style.fontWeight = '300';
    backThai.style.color = 'var(--ink)';
    backRom.textContent    = w.rom;
    backEn.textContent     = '— ' + w.th;
    backEn.style.fontFamily = "'Noto Serif Thai', serif";
    backEn.style.fontStyle  = 'normal';
  }
  setHighlight(w);
  counter.textContent = `${pad(state.index + 1)} / ${pad(state.queue.length)}`;
  reanimateCard();
}

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
  const group = document.getElementById('highlight');
  group.style.animation = 'none';
  void group.offsetWidth;
  group.style.animation = '';
}

function renderMonth() {
  if (state.index >= state.queue.length) reshuffleSameMode();
  state.current = state.queue[state.index];
  const m = state.current;

  // Front content
  moFrontBadge.textContent = state.mode === 'numbers' ? 'เดือนที่' : 'Month';
  if (state.mode === 'numbers') {
    moNumberBlock.hidden = false;
    moNumArabic.textContent = m.num;
    moFrontEn.textContent   = m.en;
  } else {
    moNumberBlock.hidden = true;
    moFrontEn.textContent = m.en;
  }

  // Counter — for sequential, the index IS the calendar month; otherwise position in deck.
  if (state.mode === 'sequential') {
    // Spec format: "MAR · 03 / 12"
    const abbr = m.en.slice(0, 3).toUpperCase();
    counter.textContent = `${abbr} · ${pad(m.num)} / 12`;
  } else {
    counter.textContent = `${pad(state.index + 1)} / ${pad(state.queue.length)}`;
  }

  // Watermark motif — SVG silhouette from MOTIFS[n]. (Unicode glyphs are
  // intentionally NOT used as a fallback any more: on iOS they render as
  // purple emoji, which clashes with the house style.)
  const motif = (typeof MOTIFS !== 'undefined' && MOTIFS[m.num]) || null;
  setMotif(moMotifFront, motif);
  setMotif(moMotifBack,  motif);

  // Back content
  moBackThai.textContent   = m.th;
  moBackRom.textContent    = m.rom;
  moBackEn.textContent     = m.en;
  moBackDays.textContent   = `${m.days} days`;
  moBackEnding.textContent = m.ending;
  moBackSign.textContent   = m.zodiac.sign;
  // Accent-colour just the root substring living inside the Thai name (the
  // "money line" — show the connection at a glance).
  moBackRootTh.textContent = m.zodiac.rootThai;
  moBackRootEn.textContent = m.zodiac.root;
  moBackCreature.textContent = m.zodiac.creature;

  reanimateCard();
}

function setMotif(host, motif) {
  if (!host) return;
  host.innerHTML = '';
  if (!motif) return;
  if (motif.type === 'svg') {
    host.innerHTML = motif.value;
  }
  // Note: glyph rendering was removed intentionally — iOS turned Unicode
  // zodiac chars into purple emoji that broke the visual language.
}

function reanimateCard() {
  card.classList.remove('flipped');
  card.classList.remove('enter');
  void card.offsetWidth;
  card.classList.add('enter');
}

// ---- Card actions ----
function flip() {
  if (card.classList.contains('exit')) return;
  card.classList.toggle('flipped');
}
function next() {
  if (card.classList.contains('exit')) return;
  state.pendingStep = 1;
  card.classList.remove('enter');
  card.classList.add('exit');
}
function prev() {
  if (card.classList.contains('exit')) return;
  state.pendingStep = -1;
  card.classList.remove('enter');
  card.classList.add('exit');
}

card.addEventListener('animationend', (e) => {
  if (e.target !== card) return;
  if (e.animationName === 'cardExit') {
    card.classList.add('no-transition');
    card.classList.remove('exit');
    state.index += state.pendingStep;
    if (state.index < 0) state.index = state.queue.length - 1;
    render();
  } else if (e.animationName === 'cardEnter') {
    card.classList.remove('enter');
    card.classList.remove('no-transition');
  }
});

// ---- Speech ----
const speechAvailable = 'speechSynthesis' in window;
let cachedThaiVoice = null;
function pickThaiVoice() {
  if (!speechAvailable) return null;
  const voices = window.speechSynthesis.getVoices();
  cachedThaiVoice =
    voices.find(v => v.lang === 'th-TH') ||
    voices.find(v => v.lang && v.lang.toLowerCase().startsWith('th')) ||
    null;
  return cachedThaiVoice;
}
if (speechAvailable) {
  pickThaiVoice();
  if (typeof speechSynthesis.onvoiceschanged !== 'undefined') {
    speechSynthesis.addEventListener('voiceschanged', pickThaiVoice);
  }
  const hint = document.getElementById('modalHint');
  if (hint) hint.hidden = false;
}
function speakThai(text, btn) {
  if (!speechAvailable || !text) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'th-TH';
  u.rate = 0.85;
  const v = cachedThaiVoice || pickThaiVoice();
  if (v) u.voice = v;
  if (btn) {
    btn.classList.add('speaking');
    const clear = () => btn.classList.remove('speaking');
    u.onend = clear;
    u.onerror = clear;
  }
  window.speechSynthesis.speak(u);
}

// ---- Wire controls ----
card.addEventListener('click', flip);
flipBtn.addEventListener('click', (e) => { e.stopPropagation(); flip(); });
if (speakBtn) {
  if (!speechAvailable) {
    speakBtn.style.display = 'none';
    if (moSpeakBtn) moSpeakBtn.style.display = 'none';
  } else {
    speakBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (state.current && state.deck === 'body-parts') speakThai(state.current.th, speakBtn);
    });
    if (moSpeakBtn) {
      moSpeakBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (state.current && state.deck === 'months') speakThai(state.current.th, moSpeakBtn);
      });
    }
  }
}
nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
if (backBtn) backBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
if (sideNextBtn) sideNextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); });
if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); });

homeBtn.addEventListener('click', () => setHash(null));

dirToggle.addEventListener('click', () => {
  if (state.deck !== 'body-parts') return;
  state.direction = state.direction === 'en2th' ? 'th2en' : 'en2th';
  modeLabel.textContent = state.direction === 'en2th' ? 'EN → TH' : 'TH → EN';
  state.current = null;
  reshuffleSameMode();
  render();
});

// Mode selector for months.
modeSelector.querySelectorAll('.mode-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!state.deck) return;
    const newMode = btn.dataset.mode;
    if (newMode === state.mode) return;
    setHash(state.deck, newMode);
  });
});

// ---- Theme ----
function applyTheme(mode) {
  document.documentElement.setAttribute('data-theme', mode);
  if (metaThemeColor) metaThemeColor.setAttribute('content', mode === 'dark' ? '#181410' : '#F2E8D0');
  try { localStorage.setItem('theme', mode); } catch (e) {}
  syncThemeToggleLabels();
}
function syncThemeToggleLabels() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (themeLabel) themeLabel.textContent = isDark ? 'Dark' : 'Light';
  if (homeThemeLabel) homeThemeLabel.textContent = isDark ? 'Dark' : 'Light';
}
applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');
function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}
themeToggle.addEventListener('click', toggleTheme);
if (homeThemeToggle) homeThemeToggle.addEventListener('click', toggleTheme);

// ---- Home — deck tiles ----
function buildHomeDecks() {
  homeDecks.innerHTML = '';
  DECK_ORDER.forEach(deckId => {
    const d = DECKS[deckId];
    if (!d) return;
    const tile = document.createElement('div');
    tile.className = 'home-deck';
    tile.setAttribute('role', 'button');
    tile.setAttribute('aria-label', `${d.name} deck — ${d.items.length} cards`);
    tile.dataset.deck = deckId;
    const mark = (typeof HOME_MARKS !== 'undefined' && HOME_MARKS[deckId]) || '';
    tile.innerHTML = `
      <div class="home-deck-mark" aria-hidden="true">${mark}</div>
      <div class="home-deck-thai">${d.nameThai}</div>
      <div class="home-deck-en">${d.name}</div>
      <div class="home-deck-meta">
        <span class="home-deck-count">${d.items.length} cards</span>
        <span class="home-deck-modes">${d.modes.join(' · ')}</span>
      </div>
    `;
    tile.addEventListener('click', () => setHash(deckId, null));
    homeDecks.appendChild(tile);
  });
}

// ---- Word list modal ----
const BANNER_COLLAPSED_KEY = 'monthsInfoCollapsed';
function applyBannerCollapsedState() {
  let collapsed = false;
  try { collapsed = localStorage.getItem(BANNER_COLLAPSED_KEY) === '1'; } catch (e) {}
  modalBanner.classList.toggle('collapsed', collapsed);
  if (modalBannerToggle) modalBannerToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
}
if (modalBannerToggle) {
  modalBannerToggle.addEventListener('click', () => {
    const nowCollapsed = !modalBanner.classList.contains('collapsed');
    modalBanner.classList.toggle('collapsed', nowCollapsed);
    modalBannerToggle.setAttribute('aria-expanded', nowCollapsed ? 'false' : 'true');
    try { localStorage.setItem(BANNER_COLLAPSED_KEY, nowCollapsed ? '1' : '0'); } catch (e) {}
  });
}

function buildModalForBodyParts() {
  modalTitle.innerHTML = 'อวัยวะ <span class="modal-subtitle">All Words</span>';
  modalBanner.hidden = true;
  modalBannerBody.innerHTML = '';
  modalList.innerHTML = '';
  const frag = document.createDocumentFragment();
  const sorted = WORDS.slice().sort((a, b) => a.en.localeCompare(b.en));
  sorted.forEach(w => {
    const row = document.createElement('div');
    row.className = 'word-row';
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', `speak ${w.en} in Thai`);
    const en = document.createElement('span');  en.className = 'en';  en.textContent = w.en;
    const th = document.createElement('span');  th.className = 'th';  th.textContent = w.th;
    const rom = document.createElement('span'); rom.className = 'rom'; rom.textContent = w.rom;
    row.append(en, th, rom);
    row.addEventListener('click', () => speakThai(w.th));
    frag.appendChild(row);
  });
  modalList.appendChild(frag);
}
function buildModalForMonths() {
  modalTitle.innerHTML = 'เดือน <span class="modal-subtitle">All Months</span>';
  modalBanner.hidden = false;
  // The "one system, not three tasks" framing from spec § "The learning framing".
  modalBannerBody.innerHTML = `
    Thai months = zodiac signs. <strong>Capricorn → Sagittarius</strong> maps onto
    January → December. Learn the creatures in order and you've learned the months
    in order. The suffix gives the length: <code>-คม</code> = 31 days,
    <code>-ยน</code> = 30 days, <code>-พันธ์</code> = February.
  `;
  applyBannerCollapsedState();
  modalList.innerHTML = '';
  const frag = document.createDocumentFragment();
  MONTHS.forEach(m => {
    const row = document.createElement('div');
    row.className = 'month-row';
    row.setAttribute('role', 'button');
    row.setAttribute('aria-label', `speak ${m.en} in Thai`);
    row.innerHTML = `
      <span class="num">${pad(m.num)}</span>
      <span class="th">${m.th}</span>
      <span class="rom">${m.rom}</span>
      <span class="meta">
        ${m.en} · ${m.days} days · ${m.ending} ·
        ${m.zodiac.rootThai} ${m.zodiac.root} — ${m.zodiac.creature}
      </span>
    `;
    row.addEventListener('click', () => speakThai(m.th));
    frag.appendChild(row);
  });
  modalList.appendChild(frag);
}
function openWordList() {
  if (state.deck === 'months') buildModalForMonths();
  else buildModalForBodyParts();
  wordListModal.classList.add('open');
  wordListModal.setAttribute('aria-hidden', 'false');
}
function closeWordList() {
  wordListModal.classList.remove('open');
  wordListModal.setAttribute('aria-hidden', 'true');
}
function isModalOpen() { return wordListModal.classList.contains('open'); }

listBtn.addEventListener('click', (e) => { e.stopPropagation(); openWordList(); });
modalClose.addEventListener('click', closeWordList);
modalBackdrop.addEventListener('click', closeWordList);

// ---- Keyboard ----
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (isModalOpen()) { closeWordList(); return; }
    if (state.view === 'deck') { setHash(null); return; }
  }
  if (isModalOpen()) return;
  if (state.view !== 'deck') return;
  if (state.mode === 'list') return;
  if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flip(); }
  if (e.key === 'ArrowRight' || e.key === 'n') { next(); }
  if (e.key === 'ArrowLeft' || e.key === 'p') { prev(); }
});

// ---- Boot ----
window.addEventListener('hashchange', handleRoute);
buildHomeDecks();
handleRoute();
