// src/components/simulations/TheWrongSignboard.jsx
// Station D: The Wrong Signboard (Error-Detective)
// Strictly follows NthQuest_Grade7_TRD.md §6 and PRD §8.3

import React, { useState } from 'react';
import './Stations.css';
import { useAudio } from '../../hooks/useAudio.js';
import { misconception, generateFalseFriend, deriveNthTerm } from '../../utils/nthTermMath.js';

const ERROR_CASES = [
  {
    id: 1,
    title: 'Case 1: The First-Term Constant Slip',
    scenario: 'Sequence: 6, 11, 16, 21… (Satay Stall Stock)',
    lines: [
      { text: 'Line 1: The stock grows by +5 each stall, so the multiplier is 5n.', isError: false },
      { text: 'Line 2: Since stall 1 has 6 items, the vendor writes the formula as 5n + 6.', isError: true, reason: 'Common difference as constant misconception! At n=1, 5(1)+6 = 11, not 6!' },
      { text: 'Line 3: Testing stall 1 gives 5(1) + 6 = 11, which does NOT match the first stall.', isError: false },
    ],
    correctExplanation: 'The vendor used the first term (6) as the constant instead of finding the offset! The offset is 6 − 5 = +1, so the correct formula is 5n + 1.',
    fixOptions: [
      { text: 'nth term = 5n + 1', correct: true },
      { text: 'nth term = n + 5', correct: false },
      { text: 'nth term = 6n + 5', correct: false },
      { text: 'nth term = 5n + 6', correct: false },
    ],
  },
  {
    id: 2,
    title: 'Case 2: The Concatenation Trap',
    scenario: 'Signboard: nth term = 4n. Finding stall 6 stock.',
    lines: [
      { text: 'Line 1: The signboard formula is 4n, where n is the stall number.', isError: false },
      { text: 'Line 2: To evaluate at stall 6, the vendor writes 4 and 6 together to get 46.', isError: true, reason: 'Digit concatenation error! 4n means 4 times n (4 × 6 = 24), not 46!' },
      { text: 'Line 3: The vendor claims stall 6 has 46 items.', isError: false },
    ],
    correctExplanation: 'In algebra, 4n means 4 multiplied by n! At stall 6: 4 × 6 = 24 items, not 46!',
    fixOptions: [
      { text: '4 × 6 = 24 items', correct: true },
      { text: '46 items', correct: false },
      { text: '4 + 6 = 10 items', correct: false },
      { text: '40 items', correct: false },
    ],
  },
  {
    id: 3,
    title: 'Case 3: The Single-Stall False Friend',
    scenario: 'Sequence: 4, 7, 10, 13… Checking a proposed formula.',
    lines: [
      { text: 'Line 1: A rival vendor proposes the formula: nth term = 2n + 2.', isError: false },
      { text: 'Line 2: Checking stall 1: 2(1) + 2 = 4. It matches stall 1!', isError: false },
      { text: 'Line 3: The vendor approves the formula immediately after checking only stall 1.', isError: true, reason: 'Never check only stall 1! At stall 2, 2(2)+2 = 6, but stall 2 has 7! The true formula is 3n + 1.' },
    ],
    correctExplanation: 'False friends match at stall 1 but fail at stall 2! You must always check at least two stalls. The real formula is 3n + 1.',
    fixOptions: [
      { text: 'Formula fails at stall 2! Correct is 3n + 1', correct: true },
      { text: '2n + 2 is completely correct', correct: false },
      { text: 'Correct formula is n + 3', correct: false },
      { text: 'Correct formula is 4n', correct: false },
    ],
  },
];

export default function TheWrongSignboard({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [caseIdx, setCaseIdx] = useState(0);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lineIdentified, setLineIdentified] = useState(false);
  const [selectedFix, setSelectedFix] = useState(null);
  const [completed, setCompleted] = useState(false);

  const currentCase = ERROR_CASES[caseIdx] || ERROR_CASES[0];

  function handleSelectLine(idx) {
    if (lineIdentified) return;
    sounds.click();
    setSelectedLine(idx);

    if (currentCase.lines[idx].isError) {
      sounds.correct();
      setLineIdentified(true);
      narrate([
        {
          text: "Spot on! You found the faulty calculation line. Now choose the correct mathematical fix!",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "That line is mathematically sound! Inspect the vendor's other lines carefully.",
          style: 'encouragement',
        },
      ]);
    }
  }

  function handleSelectFix(idx) {
    if (completed) return;
    sounds.click();
    setSelectedFix(idx);

    if (currentCase.fixOptions[idx].correct) {
      sounds.correct();
      setCompleted(true);
      narrate([
        {
          text: `Case closed! ${currentCase.correctExplanation}`,
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "Not quite the right fix — check the algebra carefully!",
          style: 'encouragement',
        },
      ]);
    }
  }

  function handleNextCase() {
    sounds.click();
    setCaseIdx((c) => (c + 1) % ERROR_CASES.length);
    setSelectedLine(null);
    setLineIdentified(false);
    setSelectedFix(null);
    setCompleted(false);
  }

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <h3 className="station-title">🔍 Station D: The Wrong Signboard Detective</h3>
        <div className="station-target-box">
          <span className="station-target-label">Investigation:</span>
          <span className="station-target-num">{currentCase.title}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Vendor's faulty working sheet */}
        <div className="station-col-left">
          <div className="targets-summary-box">
            <span style={{ fontWeight: 800, color: 'var(--gold)', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              📋 Vendor's Working Note Under Inspection
            </span>
            <p style={{ margin: '4px 0', fontSize: '0.92rem', color: '#e2e8f0', fontWeight: 700 }}>
              {currentCase.scenario}
            </p>
          </div>

          <p style={{ fontSize: '0.82rem', color: '#fed7aa', margin: '4px 0 0', fontWeight: 700 }}>
            Tap the line with the <strong>mathematical mistake</strong>:
          </p>

          <div className="error-lines-list">
            {currentCase.lines.map((l, idx) => {
              const isSelected = selectedLine === idx;
              return (
                <div
                  key={idx}
                  className={`error-line-card ${isSelected && l.isError ? 'selected-error' : ''} ${isSelected && !l.isError ? 'selected-correct' : ''}`}
                  onClick={() => handleSelectLine(idx)}
                  role="button"
                  tabIndex={0}
                >
                  <span className="error-line-num">{idx + 1}</span>
                  <span className="error-line-text">{l.text}</span>
                  {isSelected && l.isError && <span style={{ color: '#f72585', fontWeight: 800 }}>⚠️ Mistake!</span>}
                </div>
              );
            })}
          </div>

          {lineIdentified && (
            <div style={{ background: 'rgba(230, 57, 70, 0.2)', border: '1px solid #e63946', borderRadius: 10, padding: '8px 12px', marginTop: 4 }}>
              <span style={{ fontSize: '0.82rem', color: '#ffd54f', fontWeight: 800 }}>
                Detective Finding:
              </span>
              <p style={{ fontSize: '0.85rem', color: '#f8fafc', margin: '2px 0 0' }}>
                {currentCase.lines.find((l) => l.isError)?.reason}
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Supply the Fix & Complete */}
        <div className="station-col-right">
          <div className="targets-summary-box">
            <span style={{ fontWeight: 800, color: '#06d6a0', textTransform: 'uppercase', fontSize: '0.85rem' }}>
              🛠️ Detective's Correction
            </span>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', margin: '4px 0 0' }}>
              {lineIdentified
                ? 'Great! Now select the correct mathematical calculation to fix this signboard:'
                : 'Identify the incorrect line on the left first to unlock the correction choices!'}
            </p>
          </div>

          {lineIdentified ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {currentCase.fixOptions.map((opt, i) => (
                <button
                  key={i}
                  className={`btn ${selectedFix === i ? (opt.correct ? 'btn-green' : 'btn-primary') : 'btn-outline'}`}
                  style={{ textAlign: 'left', padding: '10px 14px', fontSize: '0.9rem' }}
                  onClick={() => handleSelectFix(i)}
                  disabled={completed}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1, color: '#64748b' }}>
              <span>🔒 Line detection required...</span>
            </div>
          )}

          {/* Completion Row */}
          {completed && (
            <div className="station-success-panel" style={{ marginTop: 'auto' }}>
              <div className="station-success-content">
                <span className="station-success-icon">🔎</span>
                <div>
                  <div className="station-success-title">Signboard Corrected!</div>
                  <div className="station-success-desc">
                    You spotted the misconception and proved the true nth-term formula!
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-outline btn-sm" onClick={handleNextCase}>
                  Inspect Another 🔄
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
  );
}
