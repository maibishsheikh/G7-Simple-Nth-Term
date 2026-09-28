// src/data/questionBank.js
// Procedural question generator for NthQuest (Grade 7 · Simple Nth Term)
// 10 Worlds × 10 Questions = 100 Questions
// Strictly follows NthQuest_Grade7_PRD.md §9 and NthQuest_Grade7_TRD.md §4.4

import { WORLDS } from '../config/worlds.config.js';
import {
  SIMPLE_BOUNDS,
  evaluateNthTerm,
  generateSequenceFromNthTerm,
  deriveNthTerm,
  timesTableOffsets,
  generateFalseFriend,
  misconception,
  formatNthTermString,
  generateContextNthTerm,
} from '../utils/nthTermMath.js';
import { shuffle } from '../utils/shuffle.js';

/**
 * Helper to ensure 4 unique options including the correct answer
 */
function buildOptions(correctAnswer, distractors) {
  const correctStr = String(correctAnswer).trim();
  const uniqueDistractors = [];

  for (const d of distractors) {
    const s = String(d).trim();
    if (s !== correctStr && !uniqueDistractors.includes(s)) {
      uniqueDistractors.push(s);
    }
    if (uniqueDistractors.length === 3) break;
  }

  // Fallbacks if not enough unique distractors
  let seed = 1;
  while (uniqueDistractors.length < 3) {
    let fallback = '';
    if (!isNaN(Number(correctAnswer))) {
      const num = Number(correctAnswer);
      const cand1 = String(num + seed * 2);
      const cand2 = String(Math.max(1, num - seed * 2));
      fallback = !uniqueDistractors.includes(cand1) && cand1 !== correctStr ? cand1 : cand2;
    } else {
      fallback = `Option ${seed}`;
    }
    if (fallback !== correctStr && !uniqueDistractors.includes(fallback)) {
      uniqueDistractors.push(fallback);
    }
    seed++;
  }

  return shuffle([correctStr, ...uniqueDistractors.slice(0, 3)]);
}

/**
 * Generate 100 Questions (10 per World)
 */
export function generateQuestionBank() {
  const bank = [];

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 0: Which Stall Is This? (position-and-term)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 2; // 2, 3, 4, 5
    const b = (q % 3) + 1; // 1, 2, 3
    const seq = generateSequenceFromNthTerm(a, b, 6);
    const targetIdx = (q % 5) + 1; // 1 to 5 (0-indexed position)
    const targetN = targetIdx + 1; // stall position 2..6
    const termValue = seq[targetIdx];

    const askForPosition = q % 2 === 0;

    let questionText = '';
    let correctAnswer = '';
    let distractors = [];
    let explanation = '';
    let hint1 = '';
    let hint2 = '';

    if (askForPosition) {
      questionText = `In the market stall sequence ${seq.join(', ')}, which stall position (n) holds the term ${termValue}?`;
      correctAnswer = String(targetN);
      distractors = [
        String(termValue), // common swap distractor
        String(targetN + 1),
        String(Math.max(1, targetN - 1)),
        String(termValue - a),
      ];
      explanation = `Count the positions starting from Stall 1: ${termValue} is at position ${targetN}. Remember: n is the stall position number, not the stock value!`;
      hint1 = `Start counting from the first stall: Stall 1 = ${seq[0]}, Stall 2 = ${seq[1]}...`;
      hint2 = `Find the term ${termValue} in the list and see which place it holds.`;
    } else {
      questionText = `In the market stall sequence ${seq.join(', ')}, what is the term (stock) at stall position n = ${targetN}?`;
      correctAnswer = String(termValue);
      distractors = [
        String(targetN), // swap distractor
        String(seq[targetIdx - 1] || termValue + a),
        String(seq[targetIdx + 1] || termValue - a),
        String(targetN * a),
      ];
      explanation = `Looking along the street at position n = ${targetN}, the stock count is ${termValue}.`;
      hint1 = `n is the stall number! Look at Stall ${targetN}.`;
      hint2 = `Count to position ${targetN} in the sequence.`;
    }

    bank.push({
      id: `w0_q${q}`,
      districtId: 0,
      category: 'Position & Term',
      visual: 'position-term-table',
      questionText,
      options: buildOptions(correctAnswer, distractors),
      correctAnswer,
      explanation,
      hint1,
      hint2,
      visualData: { sequence: seq.slice(0, 5), blankN: askForPosition ? targetN : undefined },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 1: Read the Signboard (substitute-simple: an and n + b)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const isPureMultiple = q % 2 === 0;
    const a = isPureMultiple ? (q % 5) + 3 : 1; // 3, 4, 5, 6, 7 or 1
    const b = isPureMultiple ? 0 : (q % 6) + 2; // 2..7
    const n = (q % 4) + 3; // n = 3, 4, 5, 6

    const formula = formatNthTermString(a, b);
    const correctVal = evaluateNthTerm(a, b, n);
    const correctAnswer = String(correctVal);

    let distractors = [];
    if (isPureMultiple) {
      // Misconceptions: concatenation 4n at 6 -> 46; addition n + a -> n + a
      distractors = [
        String(misconception.concatenation(a, n, 0)),
        String(a + n),
        String(correctVal + a),
        String(correctVal - a),
      ];
    } else {
      // n + b: multiplication an + b, off-by-one
      distractors = [
        String(b * n),
        String(n + b + 1),
        String(Math.max(1, n + b - 1)),
        String(n * 10 + b),
      ];
    }

    const questionText = `A night market signboard reads: "${formula.full}". Find the stock at stall position n = ${n}.`;
    const explanation = isPureMultiple
      ? `Replace n with ${n}: ${a} × ${n} = ${correctVal}. In algebra, ${a}n means ${a} multiplied by n, never the digits written together!`
      : `Replace n with ${n}: ${n} + ${b} = ${correctVal}.`;

    bank.push({
      id: `w1_q${q}`,
      districtId: 1,
      category: 'Simple Substitution',
      visual: 'signboard',
      questionText,
      options: buildOptions(correctAnswer, distractors),
      correctAnswer,
      explanation,
      hint1: `Substitute ${n} wherever you see the letter n.`,
      hint2: isPureMultiple ? `Remember that ${a}n means ${a} × n!` : `Calculate ${n} + ${b}.`,
      visualData: { a, b },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 2: Two-Part Signboards (substitute-two-part: an + b and an − b)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 2; // 2, 3, 4, 5
    const isSubtraction = q % 3 === 2;
    const b = isSubtraction ? -((q % 3) + 1) : (q % 5) + 1; // +1..+5 or -1..-3
    const n = (q % 4) + 4; // n = 4, 5, 6, 7

    const formula = formatNthTermString(a, b);
    const correctVal = evaluateNthTerm(a, b, n);
    const correctAnswer = String(correctVal);

    // Misconceptions:
    // 1. Concatenation: 'an' as digits + b
    const concatErr = misconception.concatenation(a, n, b);
    // 2. Grouped bracket: a(n + b)
    const groupedErr = misconception.groupedBracket(a, b, n);
    // 3. Starts at a and adds b
    const startsErr = misconception.startsAtAAddsB(a, b, n);
    // 4. Drop constant: an
    const dropErr = a * n;

    const distractors = [String(concatErr), String(groupedErr), String(startsErr), String(dropErr)];

    const questionText = `The signboard displays: "${formula.full}". What is the term at stall n = ${n}?`;
    const explanation = `Substitute n = ${n}: calculate ${a} × ${n} = ${a * n} first, then ${b >= 0 ? `add ${b}` : `subtract ${Math.abs(b)}`} = ${correctVal}.`;

    bank.push({
      id: `w2_q${q}`,
      districtId: 2,
      category: 'Two-Part Substitution',
      visual: 'signboard',
      questionText,
      options: buildOptions(correctAnswer, distractors),
      correctAnswer,
      explanation,
      hint1: `First multiply ${a} by the stall position ${n}.`,
      hint2: `Then apply the offset: ${b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`}.`,
      visualData: { a, b },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 3: Far Down the Street (evaluate-large-n: 20, 40, 50, 100)
  // ═════════════════════════════════════════════════════════════════════════
  const farPositions = [20, 25, 30, 40, 50, 60, 75, 80, 50, 100];
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 2; // 2, 3, 4, 5
    const b = (q % 5) - 2; // -2, -1, 0, 1, 2
    const n = farPositions[q];

    const formula = formatNthTermString(a, b);
    const correctVal = evaluateNthTerm(a, b, n);
    const correctAnswer = String(correctVal);

    // Misconceptions: dropped constant (a*n), off by a, off by 10
    const distractors = [
      String(a * n),
      String(correctVal + a),
      String(correctVal - a),
      String(correctVal + 10),
    ];

    const questionText = `A vendor uses the formula "${formula.full}". How many items are stocked far down the road at stall ${n}?`;
    const explanation = `Substitute n = ${n}: ${a} × ${n} = ${a * n}, then ${b >= 0 ? `+ ${b}` : `− ${Math.abs(b)}`} = ${correctVal} items. You solved stall ${n} without walking down the street!`;

    bank.push({
      id: `w3_q${q}`,
      districtId: 3,
      category: 'Far-Term Evaluation',
      visual: 'stall-row',
      questionText,
      options: buildOptions(correctAnswer, distractors),
      correctAnswer,
      explanation,
      hint1: `Calculate ${a} × ${n} first.`,
      hint2: `Don't forget to ${b >= 0 ? `add ${b}` : `subtract ${Math.abs(b)}`} at the end!`,
      visualData: { sequence: generateSequenceFromNthTerm(a, b, 4), targetN: n },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 4: Match the Signboard (match-sequence-to-nth-term, with FALSE FRIENDS!)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 2; // 2, 3, 4, 5
    const b = (q % 3) + 1; // 1, 2, 3
    const seq = generateSequenceFromNthTerm(a, b, 5);
    const correctFormula = formatNthTermString(a, b).expr;

    // False friend matches at n=1, fails at n=2
    const ff = generateFalseFriend(seq);
    const falseFriendFormula = formatNthTermString(ff.a, ff.b).expr;

    // Common difference as constant misconception: dn + t1
    const diffAsConst = misconception.differenceAsConstant(seq).display;
    // Term to term leak: n + d
    const termToTerm = misconception.termToTermLeak(a).display;

    const distractors = [falseFriendFormula, diffAsConst, termToTerm];

    const questionText = `Which is the correct nth term for the stall stock sequence: ${seq.slice(0, 4).join(', ')}…?`;
    const explanation = `The stock grows by +${a} each stall, giving ${a}n. Comparing with the ${a} times table: at stall 1, ${a}(1) = ${a}, but stock is ${seq[0]}, so add ${b}: ${correctFormula}. Always check stall 2: ${a}(2) + ${b} = ${seq[1]}! Watch out for false friends like ${falseFriendFormula} that only match at stall 1!`;

    bank.push({
      id: `w4_q${q}`,
      districtId: 4,
      category: 'Sequence Matching',
      visual: 'stall-row',
      questionText,
      options: buildOptions(correctFormula, distractors),
      correctAnswer: correctFormula,
      explanation,
      hint1: `Find the common difference between consecutive stalls first.`,
      hint2: `Check your formula at BOTH stall 1 and stall 2 to rule out false friends!`,
      visualData: { sequence: seq },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 5: The Times-Table Trick (nth-term-of-multiples: pure 'an')
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = q + 2; // 2 to 11
    const seq = generateSequenceFromNthTerm(a, 0, 4);
    const correctFormula = formatNthTermString(a, 0).expr;

    // Misconceptions: n + a, an + a, a(n + 1)
    const distractors = [
      `n + ${a}`,
      `${a}n + ${a}`,
      `${a}n − ${a}`,
      `${a + 1}n`,
    ];

    const questionText = `Stalls stock ${seq.join(', ')}… satay skewers. Find the nth term of this pure-multiples sequence.`;
    const explanation = `This sequence is exactly the ${a} times table! Position 1 is ${a}, position 2 is ${a * 2}, position 3 is ${a * 3}. The nth term is simply ${correctFormula}.`;

    bank.push({
      id: `w5_q${q}`,
      districtId: 5,
      category: 'Times-Table Multiples',
      visual: 'times-table-ghost',
      questionText,
      options: buildOptions(correctFormula, distractors),
      correctAnswer: correctFormula,
      explanation,
      hint1: `Notice this matches a standard times table starting at ${a}.`,
      hint2: `Since the offset is 0, the formula is just the multiplier times n.`,
      visualData: { a, b: 0 },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 6: Off by a Little (nth-term-times-table-offset: an ± b)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 3; // 3, 4, 5, 6
    const isNegative = q % 3 === 2;
    const b = isNegative ? -((q % 2) + 1) : (q % 4) + 1; // +1..+4 or -1..-2
    const seq = generateSequenceFromNthTerm(a, b, 4);
    const correctFormula = formatNthTermString(a, b).expr;

    // Misconceptions:
    // 1. dn + t1 (difference as constant)
    const diffAsConst = misconception.differenceAsConstant(seq).display;
    // 2. Flipped sign on offset
    const flippedOffset = formatNthTermString(a, -b).expr;
    // 3. n + d
    const termToTerm = `n + ${a}`;

    const distractors = [diffAsConst, flippedOffset, termToTerm];

    const questionText = `Stock counts: ${seq.join(', ')}… Compare this with the ${a} times table to find the nth term.`;
    const explanation = `The ${a} times table is ${a}, ${a * 2}, ${a * 3}, ${a * 4}. The actual stock is shifted by ${b >= 0 ? `+${b}` : b}. Therefore, the nth term is ${correctFormula}. Testing stall 2: ${a}(2) + (${b}) = ${seq[1]} ✓!`;

    bank.push({
      id: `w6_q${q}`,
      districtId: 6,
      category: 'Times-Table Offset',
      visual: 'times-table-ghost',
      questionText,
      options: buildOptions(correctFormula, distractors),
      correctAnswer: correctFormula,
      explanation,
      hint1: `Write out the ${a} times table and subtract it from the stock at each stall.`,
      hint2: `At stall 1: ${seq[0]} − ${a} gives the constant offset!`,
      visualData: { a, b },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 7: Price Signboards (context-to-nth-term: night-market pricing)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const ctx = generateContextNthTerm(q);
    const correctFormula = ctx.correctFormula;

    // Misconceptions:
    // 1. Swapped multiplier and fee: bn + a
    const swapped = formatNthTermString(ctx.b, ctx.a).expr;
    // 2. Just an (forgotten fixed fee)
    const dropped = formatNthTermString(ctx.a, 0).expr;
    // 3. (a + b)n
    const combined = formatNthTermString(ctx.a + ctx.b, 0).expr;

    const distractors = [swapped, dropped, combined];

    const questionText = ctx.prompt;
    const explanation = `Each ${ctx.scenario.item} costs $${ctx.a}, so n items cost $${ctx.a}n. The fixed fee for ${ctx.scenario.feeName} is $${ctx.b}. Total cost = ${correctFormula}.`;

    bank.push({
      id: `w7_q${q}`,
      districtId: 7,
      category: 'Night Market Pricing',
      visual: 'signboard',
      questionText,
      options: buildOptions(correctFormula, distractors),
      correctAnswer: correctFormula,
      explanation,
      hint1: `The price per item ($${ctx.a}) multiplies with n.`,
      hint2: `The one-time packaging fee ($${ctx.b}) is added as a constant.`,
      visualData: { a: ctx.a, b: ctx.b },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 8: Spot the Wrong Signboard (verify-and-correct-nth-term)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 3) + 3; // 3, 4, 5
    const b = (q % 3) + 1; // 1, 2, 3
    const seq = generateSequenceFromNthTerm(a, b, 4);
    const correctFormula = formatNthTermString(a, b).expr;

    // Seeded wrong formula: dn + t1 (common difference as constant)
    const wrongFormula = `${a}n + ${seq[0]}`;
    const ff = generateFalseFriend(seq);
    const falseFriend = formatNthTermString(ff.a, ff.b).expr;

    const questionText = `A rival vendor claims the sequence ${seq.join(', ')}… has the formula "${wrongFormula}". What is the true corrected nth term?`;
    const distractors = [wrongFormula, falseFriend, `n + ${a}`];

    const explanation = `Testing stall 1 with the vendor's formula gives ${a}(1) + ${seq[0]} = ${a + seq[0]}, which does NOT equal ${seq[0]}! The vendor used the first term as the constant. The true offset is ${seq[0]} − ${a} = ${b}, so the correct formula is ${correctFormula}.`;

    bank.push({
      id: `w8_q${q}`,
      districtId: 8,
      category: 'Verify & Correct',
      visual: 'stall-row',
      questionText,
      options: buildOptions(correctFormula, distractors),
      correctAnswer: correctFormula,
      explanation,
      hint1: `Test stall 1 (n = 1) in the vendor's formula to see why it fails.`,
      hint2: `Find the real offset by comparing the sequence to the ${a} times table.`,
      visualData: { sequence: seq },
    });
  }

  // ═════════════════════════════════════════════════════════════════════════
  // WORLD 9: The Grand Night Market (mixed-review grand finale)
  // ═════════════════════════════════════════════════════════════════════════
  for (let q = 0; q < 10; q++) {
    const a = (q % 4) + 3; // 3, 4, 5, 6
    const b = (q % 3) + 2; // 2, 3, 4
    const seq = generateSequenceFromNthTerm(a, b, 5);
    const farN = 50;
    const farVal = evaluateNthTerm(a, b, farN);

    // Combination item: build formula AND find stall 50!
    const questionText = `Grand Finale Challenge: A stall sequence begins ${seq.slice(0, 4).join(', ')}… Build the signboard formula and find the stock at stall ${farN}!`;
    const correctAnswer = `${formatNthTermString(a, b).expr}, Stall 50 = ${farVal}`;

    const dist1 = `${formatNthTermString(a, b).expr}, Stall 50 = ${a * farN}`; // forgot offset
    const dist2 = `${formatNthTermString(a, seq[0]).expr}, Stall 50 = ${a * farN + seq[0]}`; // difference as constant
    const dist3 = `${formatNthTermString(a, b).expr}, Stall 50 = ${farVal + 10}`;

    const distractors = [dist1, dist2, dist3];
    const explanation = `Step 1: The step is +${a}, so start with ${a}n. At stall 1, ${a}(1) = ${a}, but stock is ${seq[0]}, so offset is +${b} -> formula is ${formatNthTermString(a, b).expr}.\nStep 2: At stall 50, replace n with 50: ${a}(50) + ${b} = ${a * 50} + ${b} = ${farVal} satay sticks!`;

    bank.push({
      id: `w9_q${q}`,
      districtId: 9,
      category: 'Grand Mixed Review',
      visual: 'stall-row',
      questionText,
      options: buildOptions(correctAnswer, distractors),
      correctAnswer,
      explanation,
      hint1: `First find the nth-term formula (an + b).`,
      hint2: `Then replace n with 50 to compute the stock for stall 50.`,
      visualData: { sequence: seq },
    });
  }

  return bank;
}

// Derive DISTRICTS mapping for KingdomMap & PlayPhase from WORLDS
export const DISTRICTS = WORLDS.map((w) => ({
  id: w.id,
  name: w.name,
  icon: w.emoji,
  accent: w.accent,
  description: w.description,
  conceptFocus: w.conceptFocus,
  boss: w.boss,
}));

export const questionBank = generateQuestionBank();
export default questionBank;
