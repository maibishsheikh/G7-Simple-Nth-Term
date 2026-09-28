// src/components/simulations/StockTheStalls.jsx
// Station B: Stock the Stalls (Build-to-Target Challenge)
// Strictly follows NthQuest_Grade7_TRD.md §6 and PRD §8.3

import React, { useState } from 'react';
import './Stations.css';
import SignboardVisual from '../shared/SignboardVisual.jsx';
import {
  evaluateNthTerm,
  formatNthTermString,
  SIMPLE_BOUNDS,
} from '../../utils/nthTermMath.js';
import { useAudio } from '../../hooks/useAudio.js';

const TARGET_CHALLENGES = [
  {
    id: 1,
    title: 'Satay Stick Stocking Challenge',
    target1: { n: 2, stock: 8 },
    target2: { n: 5, stock: 17 },
    solution: { a: 3, b: 2 },
    hint: 'Difference between stall 2 and stall 5 is 9 items over 3 steps -> multiplier is 3!',
  },
  {
    id: 2,
    title: 'Bubble Tea Demand Match',
    target1: { n: 1, stock: 5 },
    target2: { n: 4, stock: 17 },
    solution: { a: 4, b: 1 },
    hint: 'Check stall 1: 4(1) + 1 = 5, and stall 4: 4(4) + 1 = 17!',
  },
  {
    id: 3,
    title: 'Steamed Kueh Supply Line',
    target1: { n: 3, stock: 14 },
    target2: { n: 6, stock: 26 },
    solution: { a: 4, b: 2 },
    hint: 'Stock grows by 12 over 3 stalls -> multiplier 4. Then adjust offset!',
  },
  {
    id: 4,
    title: 'Grand Night Market Stock',
    target1: { n: 2, stock: 11 },
    target2: { n: 4, stock: 21 },
    solution: { a: 5, b: 1 },
    hint: 'Grows by 10 over 2 stalls -> multiplier 5. 5(2) + 1 = 11!',
  },
];

export default function StockTheStalls({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [roundIdx, setRoundIdx] = useState(0);
  const [a, setA] = useState(2);
  const [b, setB] = useState(1);
  const [completed, setCompleted] = useState(false);

  const challenge = TARGET_CHALLENGES[roundIdx] || TARGET_CHALLENGES[0];

  function changeA(delta) {
    const nextA = Math.max(1, Math.min(9, a + delta));
    if (nextA + b >= 1) {
      sounds.click();
      setA(nextA);
    }
  }

  function changeB(delta) {
    const nextB = b + delta;
    if (nextB >= -6 && nextB <= 10 && a + nextB >= 1) {
      sounds.click();
      setB(nextB);
    }
  }

  // Live checks for targets
  const currentStall1 = evaluateNthTerm(a, b, challenge.target1.n);
  const currentStall2 = evaluateNthTerm(a, b, challenge.target2.n);

  const match1 = currentStall1 === challenge.target1.stock;
  const match2 = currentStall2 === challenge.target2.stock;
  const allMatched = match1 && match2;

  function handleCheckTargets() {
    if (allMatched) {
      sounds.correct();
      setCompleted(true);
      narrate([
        {
          text: `Target met! Formula ${formatNthTermString(a, b).spoken} stocks both stall ${challenge.target1.n} and stall ${challenge.target2.n} accurately!`,
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: challenge.hint,
          style: 'encouragement',
        },
      ]);
    }
  }

  function handleNextRound() {
    sounds.click();
    setRoundIdx((prev) => (prev + 1) % TARGET_CHALLENGES.length);
    setA(2);
    setB(1);
    setCompleted(false);
  }

  // Generate 7 stalls
  const stalls = [];
  for (let n = 1; n <= 7; n++) {
    const stock = evaluateNthTerm(a, b, n);
    const isTarget1 = n === challenge.target1.n;
    const isTarget2 = n === challenge.target2.n;
    let matchStatus = 'neutral';
    if (isTarget1) matchStatus = stock === challenge.target1.stock ? 'match-yes' : 'match-no';
    if (isTarget2) matchStatus = stock === challenge.target2.stock ? 'match-yes' : 'match-no';

    stalls.push({
      n,
      stock,
      isTarget: isTarget1 || isTarget2,
      matchStatus,
    });
  }

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <h3 className="station-title">🎯 Station B: Stock the Stalls Challenge</h3>
        <div className="station-target-box">
          <span className="station-target-label">Challenge:</span>
          <span className="station-target-num">{challenge.title}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Signboard Builder & Targets Status */}
        <div className="station-col-left">
          <SignboardVisual type="signboard" data={{ a, b }} compact={true} />

          {/* Steppers */}
          <div className="stepper-panel">
            <div className="stepper-row">
              <div className="stepper-info">
                <span className="stepper-title">Multiplier (a)</span>
                <span className="stepper-hint">Rate of stock growth per stall</span>
              </div>
              <div className="stepper-controls">
                <button
                  className="stepper-btn"
                  onClick={() => changeA(-1)}
                  disabled={a <= 1 || a - 1 + b < 1}
                >
                  −
                </button>
                <span className="stepper-val">{a}</span>
                <button
                  className="stepper-btn"
                  onClick={() => changeA(1)}
                  disabled={a >= 9}
                >
                  +
                </button>
              </div>
            </div>

            <div className="stepper-row">
              <div className="stepper-info">
                <span className="stepper-title">Offset (b)</span>
                <span className="stepper-hint">Starting shift added to all stalls</span>
              </div>
              <div className="stepper-controls">
                <button
                  className="stepper-btn"
                  onClick={() => changeB(-1)}
                  disabled={a + (b - 1) < 1 || b <= -6}
                >
                  −
                </button>
                <span className="stepper-val">{b >= 0 ? `+${b}` : b}</span>
                <button
                  className="stepper-btn"
                  onClick={() => changeB(1)}
                  disabled={b >= 10}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Target Goals Summary Box */}
          <div className="targets-summary-box">
            <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#fed7aa', textTransform: 'uppercase' }}>
              🎯 Target Stall Requirements
            </span>
            <div className="target-item-row">
              <span className="target-label">
                Stall {challenge.target1.n} Goal: <strong>{challenge.target1.stock} items</strong>
              </span>
              <span className="target-status" style={{ color: match1 ? '#06d6a0' : '#e63946' }}>
                Current: {currentStall1} {match1 ? '✓ MATCHED' : '✗ NOT YET'}
              </span>
            </div>
            <div className="target-item-row">
              <span className="target-label">
                Stall {challenge.target2.n} Goal: <strong>{challenge.target2.stock} items</strong>
              </span>
              <span className="target-status" style={{ color: match2 ? '#06d6a0' : '#e63946' }}>
                Current: {currentStall2} {match2 ? '✓ MATCHED' : '✗ NOT YET'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Live Stalls & Feedback Action */}
        <div className="station-col-right">
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fed7aa', textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
              🏪 Visible Stalls Status (Stalls 1 to 7)
            </span>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {stalls.map((st) => (
                <div
                  key={st.n}
                  className={`live-stall-card ${st.isTarget ? 'target-stall' : ''} ${st.matchStatus}`}
                >
                  <span className="live-stall-n">
                    Stall {st.n} {st.isTarget ? '⭐' : ''}
                  </span>
                  <span className="live-stall-stock">{st.stock}</span>
                  {st.isTarget && (
                    <span className={`match-tag ${st.matchStatus === 'match-yes' ? 'success' : 'pending'}`}>
                      {st.matchStatus === 'match-yes' ? 'Matched ✓' : 'Target'}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {!completed ? (
              <button
                className="btn btn-primary"
                onClick={handleCheckTargets}
              >
                Validate Signboard Targets 🎯
              </button>
            ) : (
              <div className="station-success-panel">
                <div className="station-success-content">
                  <span className="station-success-icon">🏆</span>
                  <div>
                    <div className="station-success-title">Both Targets Solved!</div>
                    <div className="station-success-desc">
                      Signboard {formatNthTermString(a, b).expr} fits the entire market perfectly!
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <button className="btn btn-outline btn-sm" onClick={handleNextRound}>
                    Try Another Round 🔄
                  </button>
                  <button className="btn btn-primary btn-sm" onClick={onComplete}>
                    Complete Station ✓
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
