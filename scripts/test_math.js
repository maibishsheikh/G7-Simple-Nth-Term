// scripts/test_math.js
// Unit tests and stress testing for nthTermMath.js and question generator
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

console.log('--- Testing nthTermMath.js ---');

// Test 1: evaluateNthTerm
assert(evaluateNthTerm(3, 2, 1) === 5, 'evaluateNthTerm(3, 2, 1) === 5');
assert(evaluateNthTerm(3, 2, 5) === 17, 'evaluateNthTerm(3, 2, 5) === 17');
assert(evaluateNthTerm(5, -3, 40) === 197, 'evaluateNthTerm(5, -3, 40) === 197');
assert(evaluateNthTerm(4, 0, 6) === 24, 'evaluateNthTerm(4, 0, 6) === 24');

// Test 2: generateSequenceFromNthTerm
const seq = generateSequenceFromNthTerm(3, 1, 4);
assert(JSON.stringify(seq) === JSON.stringify([4, 7, 10, 13]), 'generateSequence [4, 7, 10, 13]');

// Test 3: deriveNthTerm
const derived1 = deriveNthTerm([4, 7, 10, 13]);
assert(derived1.a === 3 && derived1.b === 1, 'deriveNthTerm([4, 7, 10, 13]) is a=3, b=1');

const derived2 = deriveNthTerm([7, 14, 21, 28]);
assert(derived2.a === 7 && derived2.b === 0, 'deriveNthTerm([7, 14, 21, 28]) is a=7, b=0');

const derived3 = deriveNthTerm([2, 7, 12, 17]);
assert(derived3.a === 5 && derived3.b === -3, 'deriveNthTerm([2, 7, 12, 17]) is a=5, b=-3');

// Test 4: timesTableOffsets
const offsets = timesTableOffsets([4, 7, 10, 13], 3);
assert(JSON.stringify(offsets) === JSON.stringify([1, 1, 1, 1]), 'offsets for 4, 7, 10, 13 against 3x table are all 1');

// Test 5: verifyNthTerm
const ver1 = verifyNthTerm([4, 7, 10, 13], 3, 1, [1, 2, 3]);
assert(ver1.valid === true, 'verifyNthTerm is true for correct formula');

const ver2 = verifyNthTerm([4, 7, 10, 13], 2, 2, [1, 2, 3]);
assert(ver2.valid === false && ver2.failsAtN === 2, 'verifyNthTerm fails at n=2 for false friend');

// Test 6: False Friend generation
for (let i = 0; i < 50; i++) {
  const { a, b } = pickSimpleNthTerm({ positiveBOnly: true });
  const s = generateSequenceFromNthTerm(a, b, 4);
  const ff = generateFalseFriend(s);
  // Match at n=1
  assert(evaluateNthTerm(ff.a, ff.b, 1) === s[0], `False friend matches at n=1 for a=${a}, b=${b}`);
  // Fails at n=2
  assert(evaluateNthTerm(ff.a, ff.b, 2) !== s[1], `False friend fails at n=2 for a=${a}, b=${b}`);
}

// Test 7: formatNthTermString
assert(formatNthTermString(3, 2).expr === '3n + 2', 'format 3n + 2');
assert(formatNthTermString(5, -3).expr === '5n − 3', 'format 5n - 3');
assert(formatNthTermString(4, 0).expr === '4n', 'format 4n');
assert(formatNthTermString(1, 4).expr === 'n + 4', 'format n + 4');
assert(formatNthTermString(3, 2).spoken.includes('three times n, plus two'), 'spoken has "times"');

// Test 8: Simple bounds 500-run stress test
for (let i = 0; i < 500; i++) {
  const { a, b } = pickSimpleNthTerm();
  assert(a >= SIMPLE_BOUNDS.aMin && a <= SIMPLE_BOUNDS.aMax, `a=${a} in bounds`);
  assert(a > 0, 'a is strictly positive');
  assert(a + b >= 1, `n=1 term is positive integer: a=${a}, b=${b}`);
  const seq5 = generateSequenceFromNthTerm(a, b, 5);
  for (let t of seq5) {
    assert(Number.isInteger(t) && t > 0, `All visible terms are positive whole numbers: ${t}`);
  }
}

console.log(`Results: ${passed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
