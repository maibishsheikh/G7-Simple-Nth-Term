# NthQuest — Module TRD
**Grade 7 · Simple Nth Term**
*(Technical companion to `NthQuest_Grade7_PRD.md`, produced from `Intellia_Module_Blueprint_TRD.md`. Repo: `nth-quest-main`. Default clone source: `G2-Money-Money-main`, unless a more recent sibling — `equation-quest-main`, `pattern-quest-main`, `mosaic-quest-main`, `progression-quest-main`, `rule-quest-main`, or `scroll-quest-main` — is designated as the actual clone source at build time.)*

---

## 1. Reference Analysis Notes — Gotcha Check

Check each fresh against whichever repo is actually cloned from, per platform blueprint §1:

1. **Dead/duplicate `src/features/*` folder.** Confirm `App.jsx`'s actual imports before copying anything.
2. **Hardcoded story-panel count.** This module uses the default **4 panels** — likely a no-op, but confirm against the actual clone source.
3. **Static vs. procedural question bank.** Build `data/questionBank.js` procedurally across the 10 concept generators in §4.1. The generators overlap in *idea* with `pattern-quest-main`'s `patternMath.js`, but each module ships as an independent, self-contained repo, so re-derive the needed functions locally in `nthTermMath.js` (§4.4) rather than attempting a cross-repo import.
4. **Viewport-clipping bug.** Proactively apply the `100dvh` + `ResizeObserver` header-height fix.
5. **Leftover branding strings.** Check `index.html`'s `<title>` and `README.md` for stale references from whichever module was cloned, including leftover mascot/character references from any of the six prior Grade 7 modules.
6. **Multi-tab/multi-round scaffolding.** If cloning from `progression-quest-main`, strip its 5th Simulate tab and multi-round station state back to the standard 4-tab single-pass architecture (as noted in `rule-quest-main`'s TRD).

**Module-specific risks to add:**
- **Notation must match PatternQuest exactly** (`nth term = an + b`, `n` starts at 1). A notation mismatch between two sibling modules is a silent teaching bug; keep the formatter in §4.4 the single source of truth.
- **The "simple" bounds (PRD §3) must be enforced in code**, not just described in the PRD — see `SIMPLE_BOUNDS` in §4.4.

## 2. Tech Stack

Unchanged from platform blueprint §2.1 — reuse verbatim (same dependency versions as the six prior Grade 7 TRDs). `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `vercel.json` — reuse as-is.

## 3. Folder Structure

```
nth-quest-main/
├── public/assets/{audio/, story/}
├── scripts/
│   ├── generate_audio.js         # MODIFY: new `phrases` array (§8)
│   └── clean_audio.js            # reuse as-is
├── src/
│   ├── assets/story/             # story_1.png ... story_4.png
│   ├── components/
│   │   ├── IntroScreen.jsx/.css  # MODIFY: title/copy only
│   │   ├── ProgressMap.jsx/.css  # reuse as-is
│   │   ├── shared/
│   │   │   ├── Mascot.jsx/.css              # reuse as-is (props swap to Singa the Lion Cub)
│   │   │   ├── FeedbackOverlay.jsx/.css     # reuse as-is
│   │   │   ├── FloatingNumbers.jsx/.css     # reuse as-is
│   │   │   └── SignboardVisual.jsx          # NEW — §5.1
│   │   ├── gamification/
│   │   │   ├── KingdomMap.jsx/.css  # reuse as-is
│   │   │   └── StarRating.jsx       # reuse as-is
│   │   ├── quiz/
│   │   │   ├── QuestionRenderer.jsx/.css  # MODIFY: import SignboardVisual
│   │   │   └── BossBattleModal.jsx/.css   # reuse as-is
│   │   ├── phases/
│   │   │   ├── WonderPhase.jsx/.css    # MODIFY: content only
│   │   │   ├── StoryPhase.jsx/.css     # MODIFY: content only
│   │   │   ├── SimulatePhase.jsx/.css  # MODIFY: 4 new station imports/labels (standard 4-tab architecture)
│   │   │   ├── PlayPhase.jsx/.css      # reuse as-is
│   │   │   └── ReflectPhase.jsx/.css   # MODIFY: 3 new recap questions (§6.3)
│   │   └── simulations/
│   │       ├── TheSignboardWorkshop.jsx  # NEW — Concept Discovery Lab — §6
│   │       ├── StockTheStalls.jsx        # NEW — Build-to-Target Challenge — §6
│   │       ├── OpenTheMarket.jsx         # NEW — Multi-Step/Composite Construction — §6
│   │       ├── TheWrongSignboard.jsx     # NEW — Error-Detective — §6
│   │       └── Stations.css              # MODIFY: extend with stall-row, times-table-ghost, and stepper visual classes
│   ├── config/
│   │   ├── worlds.config.js       # MODIFY: 10 topic-themed worlds — §4.1
│   │   ├── characters.config.js   # MODIFY: Jun Kai / Meera / Singa — §4.2
│   │   └── audio.config.js        # reuse as-is
│   ├── core/hooks/useViewport.js  # reuse as-is
│   ├── hooks/useAudio.js          # reuse as-is
│   ├── data/
│   │   ├── storyContent.js        # MODIFY: 4 story panels — §4.3
│   │   └── questionBank.js        # MODIFY: procedurally generated 100 Qs — §4.4
│   ├── utils/
│   │   ├── audio.js               # reuse as-is
│   │   ├── audioMap.js            # auto-generated — do not hand-edit
│   │   ├── narration.js           # MODIFY: topic-specific phase scripts — §8
│   │   ├── badgeEngine.js         # MODIFY: relabelled BADGES array only — §7
│   │   ├── scoring.js             # reuse as-is
│   │   ├── shuffle.js             # reuse as-is
│   │   └── nthTermMath.js         # NEW — §4.4
│   ├── styles/
│   │   ├── design-tokens.css      # MODIFY: 10 new --world-N accent colors — §9
│   │   └── globals.css            # reuse as-is (apply viewport fix from §1.4 proactively)
│   ├── App.jsx                    # MODIFY only if the clone source's panel-count logic differs from 4 (§1.2)
│   ├── App.css / main.jsx / index.css   # reuse as-is
├── index.html / package.json / vite.config.js / tailwind.config.js / postcss.config.js / vercel.json / .oxlintrc.json / .gitignore
└── README.md                      # MODIFY: module-specific + art-brief (PRD §13)
```

## 4. Data Layer

### 4.1 `config/worlds.config.js`
Ten entries in the fixed shape, populated from PRD §9:

```js
export const WORLDS = [
  { id: 0, name: "Which Stall Is This?", emoji: "🚶", accent: "var(--world-0)",
    description: "n as position; read a position–term table both ways",
    conceptFocus: "position-and-term",
    boss: { name: "The Confused Queue", emoji: "🚶", reward: "Position Badge" } },
  { id: 1, name: "Read the Signboard", emoji: "🪧", accent: "var(--world-1)",
    description: "Substitute into an and n + b",
    conceptFocus: "substitute-simple",
    boss: { name: "The Smudged Signboard", emoji: "🪧", reward: "Reader's Badge" } },
  { id: 2, name: "Two-Part Signboards", emoji: "➕", accent: "var(--world-2)",
    description: "Substitute into an + b and an − b",
    conceptFocus: "substitute-two-part",
    boss: { name: "The Two-Part Trickster", emoji: "➕", reward: "Substitution Badge" } },
  { id: 3, name: "Far Down the Street", emoji: "🛣️", accent: "var(--world-3)",
    description: "Find far terms (stall 50, 100) from a given nth term",
    conceptFocus: "evaluate-large-n",
    boss: { name: "The Endless Street", emoji: "🛣️", reward: "Long-Range Badge" } },
  { id: 4, name: "Match the Signboard", emoji: "🎭", accent: "var(--world-4)",
    description: "Choose the right nth term by testing several positions",
    conceptFocus: "match-sequence-to-nth-term",
    boss: { name: "The Mix-Up Merchant", emoji: "🎭", reward: "Matcher's Badge" } },
  { id: 5, name: "The Times-Table Trick", emoji: "🐯", accent: "var(--world-5)",
    description: "Nth term of pure-multiples sequences (an)",
    conceptFocus: "nth-term-of-multiples",
    boss: { name: "The Times-Table Tiger", emoji: "🐯", reward: "Multiples Badge" } },
  { id: 6, name: "Off by a Little", emoji: "🦝", accent: "var(--world-6)",
    description: "Build an ± b by comparing with the times table",
    conceptFocus: "nth-term-times-table-offset",
    boss: { name: "The Off-By-One Bandit", emoji: "🦝", reward: "Offset Badge" } },
  { id: 7, name: "Price Signboards", emoji: "💰", accent: "var(--world-7)",
    description: "Write a simple nth term from a price-plus-fee context",
    conceptFocus: "context-to-nth-term",
    boss: { name: "The Haggling Hawker", emoji: "💰", reward: "Price Badge" } },
  { id: 8, name: "Spot the Wrong Signboard", emoji: "✏️", accent: "var(--world-8)",
    description: "Verify with several positions; correct a wrong formula",
    conceptFocus: "verify-and-correct-nth-term",
    boss: { name: "The Forger of Signs", emoji: "✏️", reward: "Inspector's Badge" } },
  { id: 9, name: "The Grand Night Market", emoji: "🏮", accent: "var(--world-9)",
    description: "Mixed review of every concept above",
    conceptFocus: "mixed-review",
    boss: { name: "The Night Market Master", emoji: "🏮", reward: "Market Champion Trophy" } },
];
```

### 4.2 `config/characters.config.js`
```js
export const CHARACTERS = {
  junKai: { name: "Jun Kai", role: "Reads a signboard like a story", emoji: "🧑🏻", colour: "var(--char-1)", mascotEmoji: "🦁" },
  meera:  { name: "Meera",   role: "Tests before trusting",          emoji: "👧🏽", colour: "var(--char-2)", mascotEmoji: "🦁" },
  singa:  { name: "Singa the Lion Cub", role: "Mascot & mentor", emoji: "🦁", colour: "var(--mascot)", mascotEmoji: "🦁" },
};
export const MASCOT = { name: "Singa the Lion Cub", emoji: "🦁" };
```

### 4.3 `data/storyContent.js`
`STORY_PANELS` array, length 4, per PRD §8.2, fixed shape `{ panel, title, text, highlight, character, characterEmoji, imageBg, imageEmoji }`. Titles: "Stall Number Fifty," "*n* Is the Stall Number," "Building a Signboard," "Stall Fifty, Solved."

### 4.4 Question Bank — Procedural Generation

**`utils/nthTermMath.js`** — pure helper functions shared by the question generator and the Simulate stations:

| Function | Purpose |
|---|---|
| `SIMPLE_BOUNDS` | A single named constant enforcing PRD §3: `{ aMin: 1, aMax: 9, bMin: -8, bMax: 12, visibleN: 10, farNMax: 100 }`. The only place these numbers live; every generator reads from it, and `pickSimpleNthTerm` rejects any `(a, b)` for which `a + b < 1` so all visible terms are positive whole numbers. |
| `pickSimpleNthTerm()` | Draws `{a, b}` within `SIMPLE_BOUNDS`. Always increasing (`a > 0`). |
| `evaluateNthTerm(a, b, n)` | Returns `a·n + b`. The **single source of truth** for every correct substitution answer. |
| `generateSequenceFromNthTerm(a, b, count)` | Returns terms for `n = 1..count`. Position always starts at 1. |
| `deriveNthTerm(sequence)` | Returns `{ a: d, b: t1 − d }` for a simple increasing linear sequence. The **canonical derivation** used for every "correct answer" key, so the common-difference-as-constant error can never leak into an answer key; give it isolated unit tests beyond the stress test. |
| `timesTableOffsets(sequence, a)` | Returns `sequence[i] − a·(i+1)` for each position; used by the times-table-ghost overlay and World 6 explanations. If every offset is equal, that value is `b`. |
| `verifyNthTerm(sequence, a, b, positions)` | Substitutes each requested position and returns `{ valid, failsAtN }`. |
| `generateFalseFriend(sequence)` | Returns a wrong `(a', b')` that **matches at `n = 1` but fails at `n = 2`** (e.g. for 6, 9, 12: `4n + 2`), so "test more than one position" is required. Used in Worlds 4 and 8 and the Error-Detective station. |
| `misconception.concatenation(a, n, b)` | Returns the digit-concatenation error (`a` and `n` read as digits, then `+ b`), e.g. `4n` at 6 → 46. |
| `misconception.termToTermLeak(d)` | Returns the `n + d` form written instead of `dn`. |
| `misconception.differenceAsConstant(sequence)` | Returns `dn + t1` (e.g. `3n + 4` for 4, 7, 10, 13). |
| `misconception.dropConstant(a, b)` | Returns `an` (constant omitted). |
| `misconception.groupedBracket(a, b)` | Returns `a(n + b)` in place of `an + b`. |
| `generateContextNthTerm(scenario)` | Builds a price-per-item-plus-fixed-fee night-market scenario, returning narrative text and `{a, b}`; whole-dollar amounts only. |
| `formatNthTermString(a, b)` | Renders to display string (`3n + 2`, `n + 4`, `5n − 3`) and to the narration-ready spoken form per PRD §11 ("three times *n*, plus two"). The single formatter used everywhere, so notation matches PatternQuest exactly. |

Every wrong option generated for a substitution or derivation question is produced by calling the matching `misconception.*` function, never hand-authored, so each distractor corresponds to a real documented error and can be audited.

**"Clean number" constraints (hard requirements, not inline magic numbers):**
- Every generated nth term respects `SIMPLE_BOUNDS`; all visible terms are positive whole numbers.
- Far-position answers (World 3) stay modest and hand-computable (`farNMax` of 100 with `a ≤ 9` keeps results under about 920).
- No distractor may equal the correct answer, and no two options may be equal.
- `generateFalseFriend` is only used when the wrong formula genuinely matches at `n = 1` and genuinely differs at `n = 2`; assert both in code.
- World 0 tables always start at position 1.

**`data/questionBank.js` generation:**
One or more template functions per `conceptFocus` (10 concept slugs from §4.1), each producing exactly 4 options — 1 correct + 3 distractors drawn from the `misconception.*` functions and the false-friend generator. Fixed output schema (unchanged): `{ id, districtId, category, visual, questionText, options, correctAnswer, explanation, hint1, hint2, visualData }`. Also export `DISTRICTS` (derived from `WORLDS`) so `PlayPhase.jsx`'s existing import is unmodified.

## 5. Component Specs

### 5.1 `SignboardVisual.jsx`
Replaces the reference's domain visual component. Takes `{ type, data, compact }`. Supported `type` values:
- `"signboard"` — a market signboard showing the nth-term expression with the coefficient and constant colour-coded **and text-labelled**.
- `"stall-row"` — a row of numbered stalls, each showing its stock count, used for Worlds 0–3.
- `"times-table-ghost"` — stall stock overlaid on faded `a·n` stacks, with the constant shown as the extra offset, used for Worlds 5–6 and the workshop station.
- `"position-term-table"` — a position/term table with optional blank cells, every cell text-labelled.

`compact` prop shrinks rendering for inline use inside `QuestionRenderer.jsx`.

## 6. Simulate Station Specs

All 4 follow the fixed per-station contract: `<StationComponent onComplete={fn} audioEnabled={bool} />`, self-contained internal state, live SVG visuals themed with `design-tokens.css` variables, a `station-success` panel with a "Complete Station ✓" CTA, and keyboard-operable +/− controls alongside any slider/drag interaction. Standard single-pass architecture (a station may keep an internal step index; the platform completion gate is unchanged).

| Component | Archetype | Student manipulates | Live feedback | Completion gate |
|---|---|---|---|---|
| `TheSignboardWorkshop.jsx` | Concept Discovery Lab | Coefficient and constant steppers (within `SIMPLE_BOUNDS`) | Ten stalls restock live via `evaluateNthTerm`; the times-table ghost overlay shows `a·n` stacks plus the constant offset | Free exploration across several `(a, b)` settings, **plus one confirmation question** ("what changes when you raise the constant by 1?") per the platform's default archetype, as in RuleQuest and ScrollQuest |
| `StockTheStalls.jsx` | Build-to-Target Challenge | Coefficient and constant steppers, aiming at two target `(n, value)` pairs | A live check marks each visible stall matched/unmatched with a text label (not colour-only) | Both targets met **and** all visible stalls consistent; a "try another round" loop offers fresh targets |
| `OpenTheMarket.jsx` | Multi-Step/Composite Construction | Four chained steps: (1) fill a partly blank position–term table, (2) read the times-table offset via `timesTableOffsets`, (3) write the signboard, (4) use it to stock a far stall (e.g. stall 40) | The table, offset overlay, and signboard all update live as each step completes | All four steps completed correctly, including a multi-position check on the built formula — targets PRD LOs 5–8 |
| `TheWrongSignboard.jsx` | Error-Detective | Taps the line of a rival vendor's multi-line working that contains the seeded mistake, then supplies the correction | The tapped line highlights; the mistake pool is generated from the `misconception.*` functions and `generateFalseFriend`, never hand-authored | Correctly identifying the erroneous line and supplying the fix |

Wire all 4 into `SimulatePhase.jsx`'s `STATIONS` array and station-index render switch; tab bar, footer navigation, progress dots, and `COMPLETE_SIM_STATION`/`ADVANCE_SIM_STATION` gating logic are reused verbatim from the reference.

### 6.3 `ReflectPhase.jsx` Recap Questions
Replace the 3 hard-coded recap questions with 3 targeting (1) misreading/mis-substituting an nth term, (2) common-difference-as-constant / `n + d`, and (3) trusting a formula that only matches at `n = 1` (PRD §8.5), matching the Error-Detective station's focus.

## 7. Gamification

`utils/scoring.js` (`calcXP`, `calcStars`) — reuse formulas as-is. `utils/badgeEngine.js` — reuse `checkBadges(state)` trigger logic as-is; only the `BADGES` array's display strings change, per PRD §10's rename table (First Stall Visited, Busy Browsing, Market Regular Streak, Full Stall Kit, Stall Sold Out, Signboard Fixed, Seasoned Shopper, Night Market Master Badge).

## 8. Audio Pipeline

`config/audio.config.js`, `utils/audio.js`, `hooks/useAudio.js`, `utils/audioMap.js` — reuse mechanics as-is.

Rewrite `utils/narration.js` function *bodies* (signatures unchanged, same list as prior modules' TRDs) and `scripts/generate_audio.js`'s `phrases` array using PRD §11's rules: "times" always spoken in `3n`; *n* always "the position number"; substitution narrated as "replace *n* with…" then the arithmetic in order; never a position zero; table entries always read with position and term both stated. After content lock: `npm run generate-audio` then `npm run clean-audio`.

## 9. Design Tokens

`styles/design-tokens.css` — reuse core palette/type/radii/shadows/transitions as-is. Regenerate only the `--world-0` through `--world-9` accent block, using a night-market lantern palette distinct from the six prior modules' palettes:

| World | Accent (indicative) |
|---|---|
| 0 — Which Stall Is This? | `#E63946` (lantern red) |
| 1 — Read the Signboard | `#F77F00` (fried-snack orange) |
| 2 — Two-Part Signboards | `#FCBF49` (bulb yellow) |
| 3 — Far Down the Street | `#06D6A0` (pandan green) |
| 4 — Match the Signboard | `#118AB2` (night-sky blue) |
| 5 — The Times-Table Trick | `#9B5DE5` (taro purple) |
| 6 — Off by a Little | `#F15BB5` (neon pink) |
| 7 — Price Signboards | `#00BBF9` (neon cyan) |
| 8 — Spot the Wrong Signboard | `#8D6E63` (wooden-signboard brown) |
| 9 — The Grand Night Market | `#1B1B3A` (deep night navy — most dramatic, for the finale) |

## 10. Build, QA, and Delivery

1. **Question bank stress test** — ≥300 randomized generations (30,000 questions) across all 10 concept categories; assert no duplicate options, no malformed/`NaN`/`undefined` fields, and every `(a, b)` within `SIMPLE_BOUNDS` with all visible terms positive whole numbers.
2. **Derivation and substitution correctness audit (module-specific)** — for every derivation question, re-run `deriveNthTerm` and confirm the answer key matches; for every substitution question, re-run `evaluateNthTerm`; confirm every distractor differs from the correct answer. Give `deriveNthTerm` and `evaluateNthTerm` isolated unit tests.
3. **False-friend audit** — confirm every `generateFalseFriend` output truly matches at `n = 1` and truly differs at `n = 2`, and that Worlds 4 and 8 contain them at a healthy proportion.
4. **Notation consistency audit** — confirm every rendered and narrated nth term goes through `formatNthTermString` and matches PatternQuest's `nth term = an + b` notation; confirm no position zero appears anywhere.
5. **Misconception audit** — spot-check that distractors come from the `misconception.*` set (concatenation, `n + d`, difference-as-constant, dropped constant, grouped bracket) rather than arbitrary numbers.
6. **Audio parity check** — every string passed to a narration helper has an exact match in `audioMap.js`, or is intentionally dynamic; confirm "times" is spoken in every `an` read-out.
7. **Full user-journey walkthrough** — Wonder → Story (all 4 panels) → Simulate (all 4 stations completable, tab-gating correct) → Practice (World Map, all 4 modes, all 10 Boss Battles, badges) → Reflect — zero console/page errors.
8. **Production build check** — `npm install && npm run build` succeeds from a clean extract.
9. **Accessibility spot-check** — fonts/touch targets at Secondary-appropriate sizing; stall row and ghost overlay numerically labelled; steppers keyboard-operable.
10. **Delivery checklist** — zip excludes `node_modules/`/`dist/`; 4 story image placeholders with art-brief README; `README.md` updated and checked for leftover branding; `.env.local.example` documents `VITE_ELEVENLABS_API_KEY` with no real key committed.

## 11. Risks

- **Overlap risk is a product risk, not just a technical one** (PRD §15.1). Building a full five-phase module for content that PatternQuest partly covers is a real time investment; resolve the standalone-vs-merged question, ideally in one review across all seven modules, before build.
- **Notation drift between siblings.** If PatternQuest or ProgressionQuest ever changes its nth-term notation, this module must change with it; the single `formatNthTermString` is the intended one-place fix, but there is no automated cross-repo check.
- **`SIMPLE_BOUNDS` is a pedagogical judgment encoded as a constant.** If stakeholders later widen "simple" (for example to allow negative coefficients), that overlaps ProgressionQuest's territory and would regenerate much of the bank; confirm the bounds (PRD §15.2) before the first stress test.
- **Misconception coverage depends on the `misconception.*` functions being right.** A bug in, say, the concatenation generator would ship a distractor that doesn't correspond to any real error; the audit in §10.5 should not be skipped.
- **Concept Discovery Lab tension, unresolved for this module** (PRD §15.4), consistent with RuleQuest and ScrollQuest rather than ProgressionQuest.
