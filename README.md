# NthQuest — Grade 7 · Simple Nth Term

[![Vite](https://img.shields.io/badge/Vite-8.1.0-646CFF?logo=vite)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19.2.7-61DAFB?logo=react)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

**NthQuest** is the slow, careful on-ramp to position-to-term thinking for Grade 7 (Secondary 1) students. Set in a lively Singapore night market (pasar malam), stalls are numbered sequentially along the street ($n$), and each signboard displays an algebraic formula for stock quantities.

---

## 🌟 Pedagogical Design

1. **Meaning of $n$:** $n$ is introduced physically as the stall position number ($n \ge 1$), never a bare variable or position 0.
2. **Reading vs. Misreading:** Prevents the persistent misconception of reading `3n + 2` as "starts at 3 and adds 2" or reading `3n` at $n = 5$ as 35.
3. **Times-Table-Shift Method:** Builds formulas ($an \pm b$) by comparing the sequence with the $a$ times table and identifying the constant offset shift.
4. **Multi-Position Verification:** Teaches the essential habit of testing at least **two** positions ($n = 1$ and $n = 2$) to guard against false-friend formulas.

---

## 🧭 Five-Phase Learning Journey

1. **Wonder:** The Stall 50 Challenge — *"A customer asks how many satay sticks are at stall 50. Can you work it out without walking 50 stalls?"*
2. **Story (4 Widescreen Panels):** Jun Kai, Meera, and Singa the Lion Cub 🦁 explore stall numbering, signboard reading, and formula derivation.
3. **Simulate (4 Archetype-Mapped Stations):**
   - **Station A (Concept Discovery Lab):** *The Signboard Workshop* — Live interactive steppers with ghost times-table overlay.
   - **Station B (Build-to-Target Challenge):** *Stock the Stalls* — Match specified target stall quantities.
   - **Station C (Multi-Step Construction):** *Open the Market* — Table completion $\to$ offset derivation $\to$ signboard build $\to$ far-stall evaluation.
   - **Station D (Error Detective):** *The Wrong Signboard* — Spot and fix seeded misconceptions in rival vendor signboards.
4. **Practice (Play Phase):** 10 Topic-Themed Worlds $\times$ 10 procedurally generated questions = 100 questions, with 10 World Boss Battles.
5. **Reflect:** 3 misconception-targeting recap questions, reflective journal prompt, and final trophy scorecard.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** React 19 + Vite 8
- **Styling:** CSS Design Tokens + TailwindCSS + Glassmorphic UI
- **Animations:** Framer Motion + Tone-based Web Audio Synthesizer
- **Voice Narration:** ElevenLabs pipeline (Alice voice `eleven_multilingual_v2`) with static pre-generation and fallback

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run comprehensive math engine & question bank stress test
npm test

# Build production bundle
npm run build
```

---

## 🎨 Story Art Brief Summary

- **Setting:** Singapore night market (pasar malam), warm lanterns, generic culturally inclusive foods (satay, kueh, bubble tea). Strictly no pork or alcohol.
- **Characters:** Jun Kai (Singaporean Chinese), Meera (Singaporean Indian), Singa the Lion Cub (mascot & mentor).
- Full specifications in [`src/assets/story/README.md`](./src/assets/story/README.md).
