# NthQuest — Module PRD
**Grade 7 · Simple Nth Term**
*(Produced from `Intellia_Module_Blueprint_PRD.md` — {{GRADE}} = Grade 7, {{TOPIC}} = Simple Nth Term, {{SPECIAL_INSTRUCTIONS}} = none supplied, defaults assumed throughout)*

---

## 1. Overview

NthQuest is the slow, careful on-ramp to position-to-term thinking. It teaches what *n* actually means (a position number), how to **read and substitute into** a given nth-term expression, and how to **build** the nth term of a simple increasing linear sequence by comparing it to a times table and finding the offset (e.g. 4, 7, 10, 13… is the 3 times table shifted up by 1, so `3n + 1`). It is framed as a night market: every stall has a number, every signboard shows a formula, and the throughline question is "how many items are at stall 50 — without walking 50 stalls?"

"Simple" is deliberate and bounded: positive whole-number coefficients, increasing sequences, small constants (see §3). Everything richer belongs to a sibling module.

## 2. Background

This is the seventh Grade 7 (Secondary 1) module built against the platform blueprint's reference architecture, following **EquationQuest**, **PatternQuest**, **MosaicQuest**, **ProgressionQuest**, **RuleQuest**, and **ScrollQuest**. It reuses `G2-Money-Money-main`'s five-phase architecture per platform convention.

**Family scope map (updated for seven modules):**

| Module | Owns |
|---|---|
| RuleQuest | The term-to-term (generative) rule: single-step and compound rules, working backwards, rule-type classification, Fibonacci-type sequences |
| **NthQuest (this module)** | **The gentle on-ramp to position-to-term:** what *n* means, reading and substituting into a given nth term, and building simple `an`, `n + b`, `an ± b` nth terms via the times-table-shift method. Simple forms only |
| PatternQuest | The full Number Patterns chapter: special named sequences, figure patterns, deriving `an + b` at broader range, far-term and membership use, applied multi-step problems |
| ScrollQuest | Strategy and application: choosing between term-to-term and the general term for a missing term, gap formats, cross-verification |
| ProgressionQuest | The formal arithmetic-progression treatment (enrichment): `a`, `d`, `Tn = a + (n−1)d`, interpolation, means, sums |
| MosaicQuest | The spatial/geometric side: repeating vs. growing, rotation, reflection, symmetry |
| EquationQuest | Solving linear equations from word problems |

**Suggested learning order (a proposal, not a platform rule):** RuleQuest → **NthQuest** → PatternQuest → ScrollQuest → ProgressionQuest, with MosaicQuest and EquationQuest alongside. NthQuest's placement follows from its content: PatternQuest's stated soft prerequisite is "writing an expression involving *n*," which is exactly what NthQuest builds.

## 3. Standards Alignment

**Source:** Singapore MOE Secondary 1 Mathematics, *Number and Algebra* — the "Number Patterns" chapter's general-term-of-a-linear-pattern content (PatternQuest's source), plus the algebraic-expression substitution skill it depends on. The closest fine-grained sequencing reference found is the UK/Cambridge Checkpoint KS3 sequences strand, which places "begin to find the nth term for straightforward cases" in Year 7 (≈ Grade 7) and fuller use of the nth term in Year 8. **This module sits squarely at grade level — no scope-jump flag applies.** The only flag is overlap with siblings, addressed below.

**Honest overlap statement (third module on this skill cluster):** PatternQuest (Worlds 3–4) already derives and applies `an + b`, and ScrollQuest already applies the general term to missing terms. NthQuest does not introduce a new concept; it **slows down and deepens the part PatternQuest compresses**. What is genuinely different here:
- **Reading and substituting into a *given* nth term is its own skill and its own worlds** (0–3) — no sibling grades it separately. Research documents a real misconception here: reading `3n + 2` as "starts at 3 and adds 2" (or "starts at 2 and adds 3"), and reading `3n` at `n = 5` as 35.
- **The times-table-shift method** ("4, 7, 10, 13… is the 3 times table shifted up 1") is this module's signature way to *build* an nth term, rather than the compute-difference-then-check-`n = 1` route PatternQuest uses. Same mathematics, different scaffold, aimed at students who need the on-ramp.
- **"Test more than one term" as a graded habit** using deliberately constructed *false friends* — wrong formulas that happen to match at `n = 1` — which no sibling generates.

**In-scope skills (all "simple" forms only):**
- Understanding *n* as a position number (starting at 1) and a term as the value at that position; reading a position–term table in both directions.
- Substituting into a given nth term: `an`, `n + b`, `an + b`, `an − b`, for small and for large *n* (e.g. 50, 100).
- Matching a sequence to its nth term by testing several positions.
- Finding the nth term of a sequence that is a pure multiple of *a* (`an`).
- Finding `an + b` / `an − b` by comparing with the *a* times table and finding the constant offset.
- Writing a simple nth term from a real-world context (price per item plus a fixed fee).
- Verifying a proposed nth term by substituting **more than one** position, and correcting it.

**"Simple" boundaries (stated so the question bank cannot sprawl):** coefficient `a` is a whole number from 1 to 9; sequences are **increasing** (`a > 0`); constants are small whole numbers (positive or negative) chosen so every visible term is a positive whole number; visible positions run 1 to 10 with far positions up to 100.

**Adjacent skills treated as bridge only, not tested:**
- **Decreasing sequences / negative coefficients** (`b − an`) — ProgressionQuest owns negative common differences.
- **Figure/diagram patterns → nth term** — PatternQuest (numeric/algebraic) and MosaicQuest (spatial) own these.
- **Membership testing** ("is 171 in the sequence?") — requires solving `an + b = target`, which is PatternQuest/ScrollQuest/EquationQuest territory.
- **Special named sequences, geometric and quadratic nth terms** — out of scope (PatternQuest bridge notes apply).

**Domain conventions to encode as house style:**
- Notation is **"nth term = *a*n + *b*"**, matching PatternQuest exactly, so the two modules never teach conflicting notation.
- *n* is always called **"the position number,"** and the first position is always `n = 1` (never 0).
- Every worked example that builds a formula ends with a **multi-position check** (at least `n = 1` and `n = 2`), never a single-position check.

## 4. Learning Objectives

By the end of this module, a student should be able to:
1. Explain *n* as a position number and read a position–term table in both directions.
2. Substitute a position number into `an` and `n + b` to find a term.
3. Substitute into `an + b` and `an − b`, correctly reading the expression (not "starts at *a* and adds *b*").
4. Use a given nth term to find a far-away term (e.g. the 50th or 100th).
5. Match a sequence to its nth term by testing more than one position.
6. Find the nth term of a pure-multiples sequence (`an`).
7. Find `an ± b` by comparing a sequence with the *a* times table and identifying the offset.
8. Write a simple nth term from a real-world context, and verify or correct a proposed nth term using several positions.

Ordering runs foundational → applied (position and term → substitute simple → substitute two-part → far terms → match → multiples → build with offset → context, verify), and drives the world sequence in §9.

## 5. Inherited Standards *(Section A of the platform blueprint — copied verbatim, unchanged)*

- **Five-phase architecture:** Wonder → Story → Simulate → Play ("Practice" in-UI) → Reflect.
- **Gamification:** XP per question, 0–3 stars per world, streak tracking, 8 fixed badge triggers (relabelled §10), 10 Boss Battles (5Q/3 lives).
- **Practice modes:** Guided (5Q, hints, untimed), Independent (10Q, no hints), Timed Challenge (8Q, 60s), Boss Battle (5Q, 3 lives).
- **Audio pipeline:** ElevenLabs Alice voice only, 6 emotional presets, pre-generated + dynamic narration, no browser TTS fallback, strict 1:1 narration/on-screen-text parity (relaxed only for formula read-outs per §11, as in PatternQuest).
- **Question bank shape:** 10 worlds × 10 questions = 100, procedurally generated, ≥300-run stress test, fixed schema, World 9 (last, 0-indexed) is the mixed-review grand finale.
- **Product standards:** React/Vite/Tailwind/Framer Motion, pixel-faithful `design-tokens.css` reuse, enlarged Simulate/Practice fonts and touch targets, zip delivery with placeholder story art + art-brief README.
- **Simulate phase:** the standard 4 required, archetype-mapped stations.

## 6. Enhancement Requests / Special Instructions

None supplied. Defaults applied: 4-panel Story (justified §8.2), Singaporean-multicultural naming (§7), theme-specific mascot override with rationale (§7), and the standard 4-station Simulate design (§8.3). The Concept Discovery Lab confirmation-question tension is **not** re-resolved here (see §15.4).

## 7. Module Identity

- **Module name:** **NthQuest**
- **Story theme:** a Singapore-flavoured night market (pasar malam). Stalls are numbered along the street; each stall's signboard shows a formula for how many items it stocks; the throughline is "the signboard tells you what's at *any* stall number." Stall number = position *n*, which makes "position" physical and concrete — well suited to a gentle on-ramp. Goods are kept generic and inclusive (fruit cups, kueh, bubble tea, satay sticks) with no pork or alcohol.
- **Named characters** (Singaporean-multicultural convention, first names only, distinct from all six sibling modules' pairs):
  - **Jun Kai** — reads a signboard like a story ("starts at 3 and adds 2"), which the module gently corrects.
  - **Meera** — tests every formula at more than one stall before trusting it.
- **Mascot: Singa the Lion Cub 🦁** *(override, with rationale)* — "singa" is Malay for lion, a friendly local touch that suits a Singapore night-market setting, and is distinct from the owl, fox, chameleon, robot, beaver, and tortoise already used.

## 8. Five-Phase Journey Detail

### 8.1 Wonder
Single hook screen: *"A customer asks how many satay sticks are at stall 50. The first stalls stock 5, 8, 11… Walking down 50 stalls would take all night. Can you work it out from here?"*

### 8.2 Story — 4 panels (default, not exceeded)

| # | Title | Concept delivered | Narrative beat |
|---|---|---|---|
| 1 | Stall Number Fifty | Hook: a far-away stall and a growing pattern | Jun Kai and Meera help at the market when a customer asks about stall 50. |
| 2 | *n* Is the Stall Number | *n* as the position number; reading and substituting into a signboard like `3n + 2` | Singa the Lion Cub shows that Jun Kai's "starts at 3 and adds 2" reading is wrong, and substitution settles it. |
| 3 | Building a Signboard | The times-table-shift method and the multi-position check | Meera overlays the stock numbers on the 3 times table, spots the offset, and checks stalls 1 *and* 2. |
| 4 | Stall Fifty, Solved | Worked application: build the formula, check it, use it at stall 50 | The pair answers the customer, and Singa approves the signboard. |

### 8.3 Simulate — 4 stations (archetype-mapped)
Summary (full technical spec in the companion TRD):

| Station | Archetype | Premise |
|---|---|---|
| The Signboard Workshop | Concept Discovery Lab | Student edits a signboard's coefficient and constant with steppers and watches a row of ten numbered stalls restock live; a faded "times-table ghost" overlay shows the `an` stacks with the constant as the extra offset — builds felt intuition for what each part of `an + b` does. |
| Stock the Stalls | Build-to-Target Challenge | Student sets the signboard so two specified stalls hold exact target quantities (e.g. stall 2 → 8, stall 5 → 17), with a live check across all visible stalls and a retry loop. |
| Open the Market | Multi-Step/Composite Construction | Given a partly filled position–term table, the student fills the rows, finds the times-table offset, writes the signboard, then uses it to stock a far stall (e.g. stall 40) — a chained build-and-apply challenge combining LOs 5–8. |
| The Wrong Signboard | Error-Detective | A rival vendor's signboard working contains one seeded mistake (using the common difference as the constant, writing `n + 3` for `3n`, reading `3n` at `n = 5` as 35, or checking only stall 1); the student finds and fixes it. |

### 8.4 Play / Practice
Standard, unchanged mechanics (10 worlds × 10 questions, 4 modes). See world table in §9.

### 8.5 Reflect
3 new recap questions targeting the module's headline misconceptions: **misreading or mis-substituting into an nth term** (e.g. "starts at 3 and adds 2"; 35 for `3n` at `n = 5`), **using the common difference as the constant or writing `n + d` for `dn`**, and **trusting a formula that only matches at `n = 1`**. Followed by the standard scorecard and a reflection prompt ("Which stall did you test your signboard on, and why that one?").

## 9. World & Question Bank Table

*Shape: `{ id, name, emoji, accent, description, conceptFocus, boss: { name, emoji, reward } }`. World 9 (last) is the mixed-review grand finale per platform standard.*

| id | World | conceptFocus | Description | Boss | Reward |
|---|---|---|---|---|---|
| 0 | Which Stall Is This? | `position-and-term` | *n* as position; read a position–term table both ways | The Confused Queue 🚶 | Position Badge |
| 1 | Read the Signboard | `substitute-simple` | Substitute into `an` and `n + b` | The Smudged Signboard 🪧 | Reader's Badge |
| 2 | Two-Part Signboards | `substitute-two-part` | Substitute into `an + b` and `an − b` | The Two-Part Trickster ➕ | Substitution Badge |
| 3 | Far Down the Street | `evaluate-large-n` | Find far terms (stall 50, 100) from a given nth term | The Endless Street 🛣️ | Long-Range Badge |
| 4 | Match the Signboard | `match-sequence-to-nth-term` | Choose the right nth term by testing several positions | The Mix-Up Merchant 🎭 | Matcher's Badge |
| 5 | The Times-Table Trick | `nth-term-of-multiples` | Nth term of pure-multiples sequences (`an`) | The Times-Table Tiger 🐯 | Multiples Badge |
| 6 | Off by a Little | `nth-term-times-table-offset` | Build `an ± b` by comparing with the times table | The Off-By-One Bandit 🦝 | Offset Badge |
| 7 | Price Signboards | `context-to-nth-term` | Write a simple nth term from a price-plus-fee context | The Haggling Hawker 💰 | Price Badge |
| 8 | Spot the Wrong Signboard | `verify-and-correct-nth-term` | Verify with several positions; correct a wrong formula | The Forger of Signs ✏️ | Inspector's Badge |
| 9 | The Grand Night Market | `mixed-review` | Mixed review of every concept above; hardest boss | The Night Market Master 🏮 | Market Champion Trophy |

**Sample questions (illustrative, not the full 100):**

- **World 0:** *"In 5, 8, 11, 14, 17, 20, which position has the term 20?"* → position `6` ✓ (distractor `20`, swapping position and term)
- **World 1:** *"The nth term is `4n`. Find the 6th term."* → `24` ✓ (headline distractor `46`, reading `4n` as "4 then 6")
- **World 2:** *"The nth term is `3n + 2`. Find the 5th term."* → `17` ✓ (distractors `37`, `21` from `3(n + 2)`, `10`)
- **World 3:** *"The nth term is `5n − 3`. Find the 40th term."* → `197` ✓ (distractor `200`, forgetting the `− 3`)
- **World 4:** *"Which is the nth term of 5, 8, 11, 14, …?"* → `3n + 2` ✓ (distractors `n + 3`, `3n`, `3n + 5`)
- **World 5:** *"7, 14, 21, 28, … Find the nth term."* → `7n` ✓ (distractor `n + 7`)
- **World 6:** *"4, 7, 10, 13, … Find the nth term."* → `3n + 1` ✓ (headline distractor `3n + 4`)
- **World 7:** *"A stall sells satay sticks at $2 each and charges $3 for a box. What is the cost of *n* sticks?"* → `2n + 3` ✓ (distractor `3n + 2`)
- **World 8:** *"A vendor says the nth term of 6, 11, 16, 21 is `5n + 6`. Is she right?"* → "No — at `n = 1` it gives 11, not 6; the correct nth term is `5n + 1`" ✓
- **World 9:** mixed-type item combining a far-term substitution (World 3) with a times-table-offset build (World 6).

## 10. Gamification — Badge Renames

| Fixed trigger | Badge name |
|---|---|
| First correct answer | First Stall Visited 🏮 |
| 5-answer streak | Busy Browsing 🛍️ |
| 10-answer streak | Market Regular Streak 🔥 |
| All 4 Simulate stations complete | Full Stall Kit 🧰 |
| Any world scores 3 stars | Stall Sold Out ⭐⭐⭐ |
| Any Boss Battle won | Signboard Fixed 🪧 |
| 20+ questions answered in Practice | Seasoned Shopper 🧺 |
| Full 5-phase journey complete | Night Market Master Badge 🏆 |

## 11. Audio & Narration Content Rules

- `3n` is always spoken as "three **times** *n*," never "three *n*," so it can't be heard as the digits 3 and *n* run together. `3n + 2` is "three times *n*, plus two."
- *n* is always introduced as "the position number." "nth term" is spoken as "the *en*-th term."
- Substitution is narrated as "replace *n* with five," then the arithmetic in order ("three times five is fifteen, plus two is seventeen") — never a bare result.
- The first position is always "position one"; narration never says or implies position zero.
- Position–term tables are read with both parts stated ("position four, term fourteen").
- Formula read-outs are a deliberate, noted relaxation of strict 1:1 narration/on-screen-text parity, consistent with PatternQuest.

## 12. Accessibility

Standard enlarged fonts/touch targets in Simulate and Practice, calibrated toward the platform's Secondary-1 sizing precedent. The stall row and times-table ghost overlay carry numeric labels for every stall (never relying on stack height alone). Stepper controls for coefficient and constant require keyboard +/− operation, not drag-only.

## 13. Assets Required

4 story images at the reference's standard placeholder dimensions, delivered as blank CSS-framed placeholders, with an art-brief README describing each panel (food kept generic and inclusive — no pork or alcohol):
1. The night-market street with numbered stalls, Jun Kai and Meera fielding the "stall 50" question.
2. Singa the Lion Cub at a signboard, correcting the "starts at 3 and adds 2" reading.
3. Meera overlaying stall stock on the 3 times table to find the offset.
4. The pair at the finished signboard, Singa approving.

## 14. Success Metrics / Acceptance Criteria

Standard fixed criteria (question-bank stress test, audio parity, clean build, full-journey walkthrough) plus module-specific:
- Every generated nth term stays within the "simple" bounds in §3 (`a` from 1 to 9, increasing, every visible term a positive whole number).
- World 4 and World 8 include **false-friend** formulas that match at `n = 1` but fail at `n = 2`, so "test more than one position" is genuinely required rather than optional.
- Distractors are dominated by the documented misconceptions: concatenation misreading (`4n` at 6 → 46), `n + d` for `dn`, common difference as the constant, dropped constant, and grouping `a(n + b)`; not arbitrary numbers.
- Every worked example and explanation uses `n = 1` as the first position.
- All 4 Simulate stations are genuinely interactive, not static reveal-and-answer screens.

## 15. Assumptions & Open Questions

1. **Standalone vs. merged (the central open question, third time in this family):** PatternQuest, ScrollQuest, and now NthQuest all cluster on deriving/using an nth term. NthQuest's case for standing alone is that it is the on-ramp (reading and substituting, the times-table-shift method, the false-friend habit) and that its worlds 0–3 have no sibling equivalent. Recommend one consolidated catalogue review of all seven Grade 7 modules — including whether NthQuest should become "Part 1" of PatternQuest — before more overlapping topics are added, rather than answering this module by module.
2. **"Simple" bounds (§3):** `a` from 1 to 9, increasing only, small constants — confirm these match what your target schools consider "simple," since some introduce negative coefficients earlier.
3. **Character names and mascot** (Jun Kai, Meera, Singa the Lion Cub) are proposed defaults, not yet stakeholder-approved.
4. **Concept Discovery Lab tension — not re-resolved.** With no special instruction this time, The Signboard Workshop defaults to the blueprint's standard archetype (free exploration plus one light confirmation question), consistent with RuleQuest and ScrollQuest rather than ProgressionQuest. This is now open across most of the family; one decision would settle it everywhere.
5. **Night-market content review:** the theme is Singapore-flavoured; a quick check that the goods, names, and art brief read as inclusive to your audience is worthwhile before art is commissioned.
