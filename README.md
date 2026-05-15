# อวัยวะ — Thai Body Parts Flashcards

**Live:** https://drummingdemon.github.io/thai-cards/

A single-file, zero-dependency flashcard web app for learning Thai body-part vocabulary. Built around L2 whiteboard set, with the exact romanization system used (c, ɯ, w, y, k…).

Open `index.html` in any modern browser — that's the whole thing.

## Features

- **Two study directions.** Toggle between EN → TH (English prompt, Thai reveal) and TH → EN. In TH-first mode the romanization is shown alongside the Thai so you can build sound recognition before reading.
- **Anatomical highlight.** Each English prompt is paired with a glowing dot/ring on a stick-figure SVG pointing to the body part in question.
- **Smooth flip & swipe transitions.** Card flips on a 3D rotateY axis; NEXT slides the old card out and glides the new one in.
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

Tone marks above the vowels are: unmarked = mid, à = low, â = falling, á = high, ǎ = rising; macron (ā) marks long mid-tone vowels.

## File layout

```
thai-cards/
├── index.html   # everything — HTML, CSS, JS, SVG figure, word list
└── README.md
```

No build step, no package manager, no server required. Edit `WORDS` in `index.html` to extend the deck; add a matching entry in `HIGHLIGHTS` to place the anatomical dot.
