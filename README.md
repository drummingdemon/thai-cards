# อวัยวะ — Thai Body Parts Flashcards

**Live:** https://drummingdemon.github.io/thai-cards/

A zero-dependency flashcard web app for learning Thai body-part vocabulary. No build step, no framework, no CDNs at runtime — everything (scripts, styles, fonts) is served from the repo itself.

The exact romanization system follows the L2 whiteboard set conventions (c, ɯ, w, y, k…).

## Features

- **Two study directions.** Toggle between EN → TH (English prompt, Thai reveal) and TH → EN. In TH-first mode the romanization is shown alongside the Thai so you can build sound recognition before reading.
- **Anatomical highlight.** Each English prompt is paired with a glowing dot/ring on a stick-figure SVG pointing to the body part in question.
- **Smooth flip & slide transitions.** Card flips on a 3D Y-axis; NEXT slides the old card out and glides the new one in from the right.
- **Dark / light theme.** Subtle warm-cream palette by day, deep-warm dark by night. Respects `prefers-color-scheme` on first load and persists your choice in `localStorage`.
- **Keyboard support.** `Space` / `Enter` to flip, `→` or `n` to advance.
- **iOS-safe layout.** Bottom padding tuned for iOS 26 Safari's default URL bar so controls stay reachable.

## Vocabulary

| #  | English      | ภาษาไทย   | Romanization |
|----|--------------|-----------|--------------|
| 01 | eye          | ตา        | tāa          |
| 02 | ear          | หู         | hǔu          |
| 03 | mouth        | ปาก       | pàak         |
| 04 | nose         | จมูก      | càmùuk       |
| 05 | foot         | เท้า       | tháaw        |
| 06 | arm          | แขน       | khɛ̌ɛn        |
| 07 | leg          | ขา        | khǎa         |
| 08 | head         | หัว       | hǔa          |
| 09 | eyebrow      | คิ้ว       | khíw         |
| 10 | eyelash      | ขนตา      | khǒntāa      |
| 11 | tooth        | ฟัน        | fān          |
| 12 | tongue       | ลิ้น        | lín          |
| 13 | face         | หน้า      | nâa          |
| 14 | neck         | คอ        | khɔ̄ɔ         |
| 15 | shoulder     | ไหล่      | lày          |
| 16 | hand         | มือ        | mʉ̄ʉ          |
| 17 | finger       | นิ้วมือ    | níwmʉ̄ʉ       |
| 18 | fingernail   | เล็บมือ    | lépmʉ̄ʉ       |
| 19 | stomach      | ท้อง       | thɔ́ɔŋ        |
| 20 | knee         | เข่า       | khàw         |
| 21 | elbow        | ศอก       | sɔ̀ɔk         |

Tone marks: unmarked = mid, à = low, â = falling, á = high, ǎ = rising; macron (ā) marks a long mid-tone vowel.

## Running it

Open `index.html` directly in any modern browser, or serve the folder with any static-file server, e.g.:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

A static server avoids any `file://` font-loading quirks and matches the deployed GitHub Pages environment.

## Project structure

```
thai-cards/
├── index.html      # markup (header, card faces, SVG figure, controls)
├── styles.css      # all styles, including light + dark theme variables
├── fonts.css       # @font-face declarations pointing at fonts/
├── app.js          # word list, highlight positions, render + interaction logic
├── fonts/          # 15 woff2 files (~408K) + OFL license texts
└── README.md
```

Edit `WORDS` in `app.js` to extend the deck; add a matching entry in `HIGHLIGHTS` to place the anatomical dot on the figure.

## Fonts

All three typefaces are self-hosted from `fonts/` and ship under the **SIL Open Font License 1.1**. The full license text plus each font's upstream copyright notice lives alongside the `.woff2` files:

- **Fraunces** — Copyright 2018 The Fraunces Project Authors. See `fonts/Fraunces-OFL.txt`.
- **Noto Serif Thai** — Copyright 2022 The Noto Project Authors. See `fonts/NotoSerifThai-OFL.txt`.
- **JetBrains Mono** — Copyright 2020 The JetBrains Mono Project Authors. See `fonts/JetBrainsMono-OFL.txt`.
