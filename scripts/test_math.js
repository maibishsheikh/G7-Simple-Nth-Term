// scripts/test_math.js
// Comprehensive Unit Tests & Question Bank Stress Test for NthQuest (Grade 7)
import {
  SIMPLE_BOUNDS,
  pickSimpleNthTerm,
  evaluateNthTerm,
  generateSequenceFromNthTerm,
  deriveNthTerm,
  timesTableOffsets,
  verifyNthTerm,
  generateFalseFriend,
  misconception,
  formatNthTermString,
} from '../src/utils/nthTermMath.js';
import { generateQuestionBank, DISTRICTS } from '../src/data/questionBank.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
  } else {
    failed++;
    console.error(`❌ FAILED: ${message}`);
  }
}

console.log('--- 1. Testing Core Math Engine ---');
assert(evaluateNthTerm(3, 2, 1) === 5, '3(1) + 2 = 5');
assert(evaluateNthTerm(3, 2, 5) === 17, '3(5) + 2 = 17');
assert(evaluateNthTerm(5, -3, 40) === 197, '5(40) - 3 = 197');
assert(evaluateNthTerm(4, 0, 6) === 24, '4(6) = 24');

// Derivations
const der1 = deriveNthTerm([4, 7, 10, 13]);
assert(der1.a === 3 && der1.b === 1, 'Derive 4, 7, 10, 13 -> 3n + 1');
const der2 = deriveNthTerm([7, 14, 21, 28]);
assert(der2.a === 7 && der2.b === 0, 'Derive 7, 14, 21, 28 -> 7n');

// Ghost offsets
const offs = timesTableOffsets([4, 7, 10, 13], 3);
assert(JSON.stringify(offs) === JSON.stringify([1, 1, 1, 1]), 'Offsets 4, 7, 10, 13 are all 1');

// False Friend assertions
for (let i = 0; i < 50; i++) {
  const { a, b } = pickSimpleNthTerm({ positiveBOnly: true });
  const seq = generateSequenceFromNthTerm(a, b, 4);
  const ff = generateFalseFriend(seq);
  assert(evaluateNthTerm(ff.a, ff.b, 1) === seq[0], 'FF matches at n=1');
  assert(evaluateNthTerm(ff.a, ff.b, 2) !== seq[1], 'FF fails at n=2');
}

console.log('--- 2. Auditing Static & Procedural Question Bank (100 Questions) ---');
const bank = generateQuestionBank();
assert(bank.length === 100, `Question bank contains exactly 100 questions (found ${bank.length})`);
assert(DISTRICTS.length === 10, `DISTRICTS contains 10 worlds (found ${DISTRICTS.length})`);

bank.forEach((q, idx) => {
  assert(q.id && q.id.length > 0, `Q${idx} has valid id`);
  assert(q.districtId >= 0 && q.districtId <= 9, `Q${idx} has valid districtId (0..9)`);
  assert(q.questionText && q.questionText.length > 5, `Q${idx} has descriptive questionText`);
  assert(q.options && q.options.length === 4, `Q${idx} has exactly 4 options`);
  assert(new Set(q.options).size === 4, `Q${idx} has 4 UNIQUE options with no duplicates: [${q.options.join(', ')}]`);
  assert(q.options.includes(q.correctAnswer), `Q${idx} includes correctAnswer '${q.correctAnswer}' in options`);
  assert(!q.questionText.includes('NaN') && !q.questionText.includes('undefined'), `Q${idx} has no NaN/undefined`);
  assert(!q.correctAnswer.includes('NaN') && !q.correctAnswer.includes('undefined'), `Q${idx} answer has no NaN/undefined`);
  assert(!q.questionText.includes('Stall 0') && !q.questionText.includes('position 0') && !q.questionText.includes('n = 0'), `Q${idx} strictly avoids position zero`);
});

console.log('--- 3. Stress Testing Question Bank (300 Generations = 30,000 Questions) ---');
for (let run = 0; run < 300; run++) {
  const qSet = generateQuestionBank();
  for (let i = 0; i < qSet.length; i++) {
    const q = qSet[i];
    if (new Set(q.options).size !== 4) {
      assert(false, `Duplicate options in run ${run} Q${i}: ${q.options.join(', ')}`);
    }
    if (!q.options.includes(q.correctAnswer)) {
      assert(false, `Answer not in options in run ${run} Q${i}: answer='${q.correctAnswer}', options='${q.options.join(', ')}'`);
    }
  }
}

console.log(`\n========================================`);
console.log(`Tests Completed: ${passed} passed, ${failed} failed.`);
console.log(`========================================\n`);

if (failed > 0) process.exit(1);
