// src/utils/nthTermMath.js
// Pure mathematical helper functions for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_PRD.md and NthQuest_Grade7_TRD.md

export const SIMPLE_BOUNDS = {
  aMin: 1,
  aMax: 9,
  bMin: -8,
  bMax: 12,
  visibleN: 10,
  farNMax: 100,
};

/**
 * Evaluates an nth-term expression: an + b at position n.
 * Position n starts at 1.
 * This is the SINGLE SOURCE OF TRUTH for substitution.
 */
export function evaluateNthTerm(a, b, n) {
  return a * n + b;
}

/**
 * Random integer helper in [min, max] inclusive
 */
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Draws {a, b} within SIMPLE_BOUNDS.
 * Guaranteed: a in [1, 9] (increasing sequence, a > 0)
 * All visible terms for n=1..10 are positive whole numbers (a*1 + b >= 1).
 */
export function pickSimpleNthTerm(options = {}) {
  const {
    pureMultiple = false,
    positiveBOnly = false,
    forceNonZeroB = false,
    aMin = SIMPLE_BOUNDS.aMin,
    aMax = SIMPLE_BOUNDS.aMax,
  } = options;

  let a = randomInt(aMin, aMax);
  let b = 0;

  if (pureMultiple) {
    b = 0;
  } else {
    let minB = positiveBOnly ? 1 : SIMPLE_BOUNDS.bMin;
    let maxB = SIMPLE_BOUNDS.bMax;
    let attempts = 0;
    do {
      b = randomInt(minB, maxB);
      if (forceNonZeroB && b === 0) continue;
      attempts++;
    } while ((a + b < 1) && attempts < 100);

    // Fallback if bounds caused loop
    if (a + b < 1) {
      b = randomInt(1, maxB);
    }
  }

  return { a, b };
}

/**
 * Generates the sequence array for n = 1 .. count
 */
export function generateSequenceFromNthTerm(a, b, count = 10) {
  const seq = [];
  for (let n = 1; n <= count; n++) {
    seq.push(evaluateNthTerm(a, b, n));
  }
  return seq;
}

/**
 * Canonical derivation of nth-term from an increasing linear sequence.
 * d = seq[1] - seq[0] (common difference, coefficient a)
 * b = seq[0] - d (constant offset)
 * Single source of truth for answer keys.
 */
export function deriveNthTerm(sequence) {
  if (!sequence || sequence.length < 2) {
    throw new Error('Sequence must have at least 2 terms to derive nth term');
  }
  const d = sequence[1] - sequence[0];
  const t1 = sequence[0];
  const b = t1 - d;
  return { a: d, b };
}

/**
 * Returns sequence[i] - a * (i + 1) for each position (n = 1..length).
 * Used by times-table-ghost overlay and World 6.
 * If every offset is equal, that constant is b.
 */
export function timesTableOffsets(sequence, a) {
  return sequence.map((term, idx) => {
    const n = idx + 1;
    return term - a * n;
  });
}

/**
 * Verifies if a proposed formula (a, b) matches sequence at specified positions.
 * Returns { valid: boolean, failsAtN: number | null, results: [...] }
 */
export function verifyNthTerm(sequence, a, b, positions = [1, 2, 3]) {
  const results = [];
  let failsAtN = null;
  let valid = true;

  for (const n of positions) {
    const expected = sequence[n - 1];
    const computed = evaluateNthTerm(a, b, n);
    const matches = computed === expected;
    results.push({ n, expected, computed, matches });
    if (!matches && failsAtN === null) {
      failsAtN = n;
      valid = false;
    }
  }

  return { valid, failsAtN, results };
}

/**
 * Generates a "false friend" formula (a', b') that:
 * 1. Matches at n = 1: a'*1 + b' === sequence[0]
 * 2. FAILS at n = 2: a'*2 + b' !== sequence[1]
 * Crucial for testing students' habit of testing more than one position!
 */
export function generateFalseFriend(sequence) {
  const { a, b } = deriveNthTerm(sequence);
  const t1 = sequence[0];
  const t2 = sequence[1];

  // Candidates for a' that are not equal to a
  const candidateDeltas = [1, -1, 2, -2, 3, -3];
  for (const delta of candidateDeltas) {
    const altA = a + delta;
    if (altA >= 1 && altA <= 12 && altA !== a) {
      const altB = t1 - altA;
      // Double check assertion: matches at n=1, fails at n=2
      const val1 = altA * 1 + altB;
      const val2 = altA * 2 + altB;
      if (val1 === t1 && val2 !== t2) {
        return { a: altA, b: altB };
      }
    }
  }

  // Fallback false friend
  const altA = a !== 2 ? 2 : 3;
  const altB = t1 - altA;
  return { a: altA, b: altB };
}

/**
 * Pedagogical misconception generators targeting documented errors
 */
export const misconception = {
  /**
   * Digit concatenation error: 'an' read as digits (e.g. 4n at n=6 -> 46 + b)
   */
  concatenation(a, n, b = 0) {
    const concatVal = parseInt(`${a}${n}`, 10);
    return isNaN(concatVal) ? (a * 10 + n + b) : concatVal + b;
  },

  /**
   * Term-to-term leak: writing 'n + d' instead of 'dn'
   */
  termToTermLeak(d) {
    return { a: 1, b: d, display: `n + ${d}` };
  },

  /**
   * Common difference used as constant: dn + t1 (e.g. 3n + 4 for 4, 7, 10...)
   */
  differenceAsConstant(sequence) {
    const d = sequence[1] - sequence[0];
    const t1 = sequence[0];
    return { a: d, b: t1, display: `${d}n + ${t1}` };
  },

  /**
   * Dropped constant: forgetting + b, giving just an
   */
  dropConstant(a) {
    return { a, b: 0, display: a === 1 ? 'n' : `${a}n` };
  },

  /**
   * Grouped brackets: a(n + b) instead of an + b
   */
  groupedBracket(a, b, n) {
    return a * (n + b);
  },

  /**
   * Starts at a and adds b: interpreting 'an + b' as first term is a and adds b
   */
  startsAtAAddsB(a, b, n) {
    return a + (n - 1) * b;
  },
};

/**
 * Formats an nth-term expression for visual UI display and narration.
 * Matches PatternQuest house style: "nth term = an + b"
 */
export function formatNthTermString(a, b) {
  let expr = '';
  if (b === 0) {
    expr = a === 1 ? 'n' : `${a}n`;
  } else if (b > 0) {
    expr = a === 1 ? `n + ${b}` : `${a}n + ${b}`;
  } else {
    // b < 0: use minus sign
    const absB = Math.abs(b);
    expr = a === 1 ? `n − ${absB}` : `${a}n − ${absB}`;
  }

  // Spoken narration version adhering strictly to PRD §11:
  // "3n" -> "three times n"
  // "3n + 2" -> "three times n, plus two"
  // "n + 4" -> "n plus four"
  const numNames = {
    1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five',
    6: 'six', 7: 'seven', 8: 'eight', 9: 'nine', 10: 'ten',
    11: 'eleven', 12: 'twelve',
  };

  const aWord = numNames[a] || `${a}`;
  let spoken = '';

  if (b === 0) {
    spoken = a === 1 ? 'n' : `${aWord} times n`;
  } else if (b > 0) {
    const bWord = numNames[b] || `${b}`;
    spoken = a === 1 ? `n plus ${bWord}` : `${aWord} times n, plus ${bWord}`;
  } else {
    const absB = Math.abs(b);
    const bWord = numNames[absB] || `${absB}`;
    spoken = a === 1 ? `n minus ${bWord}` : `${aWord} times n, minus ${bWord}`;
  }

  return {
    expr,
    full: `nth term = ${expr}`,
    spoken,
    spokenFull: `the nth term is ${spoken}`,
  };
}

/**
 * Generates Night Market real-world context questions (World 7)
 */
export const NIGHT_MARKET_SCENARIOS = [
  {
    item: 'satay stick',
    pluralItem: 'satay sticks',
    price: 2,
    feeName: 'a paper serving box',
    fee: 3,
    emoji: '🍢',
  },
  {
    item: 'bubble tea',
    pluralItem: 'cups of bubble tea',
    price: 4,
    feeName: 'an insulated carrier bag',
    fee: 1,
    emoji: '🧋',
  },
  {
    item: 'steamed kueh',
    pluralItem: 'pieces of kueh',
    price: 3,
    feeName: 'a decorative bamboo platter',
    fee: 2,
    emoji: '🍡',
  },
  {
    item: 'dragon fruit cup',
    pluralItem: 'fruit cups',
    price: 5,
    feeName: 'a souvenir market bowl',
    fee: 4,
    emoji: '🍧',
  },
  {
    item: 'crispy spring roll',
    pluralItem: 'spring rolls',
    price: 2,
    feeName: 'a sweet chilli dip box',
    fee: 1,
    emoji: '🥟',
  },
  {
    item: 'skewered meatball',
    pluralItem: 'meatball skewers',
    price: 3,
    feeName: 'a signature seasoning bag',
    fee: 1,
    emoji: '🍢',
  },
];

export function generateContextNthTerm(scenarioIndex) {
  const scenario = NIGHT_MARKET_SCENARIOS[scenarioIndex % NIGHT_MARKET_SCENARIOS.length];
  const a = scenario.price;
  const b = scenario.fee;
  const prompt = `A night market stall sells ${scenario.pluralItem} for $${a} each and charges $${b} for ${scenario.feeName}. What is the total cost in dollars for n ${scenario.pluralItem}?`;
  return {
    scenario,
    a,
    b,
    prompt,
    correctFormula: formatNthTermString(a, b).expr,
  };
}
