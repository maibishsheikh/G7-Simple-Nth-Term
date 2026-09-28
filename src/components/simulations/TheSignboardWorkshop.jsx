// src/components/simulations/TheSignboardWorkshop.jsx
// Station A: The Signboard Workshop (Concept Discovery Lab)
// Strictly follows NthQuest_Grade7_TRD.md §6 and PRD §8.3

import React, { useState } from 'react';
import './Stations.css';
import SignboardVisual from '../shared/SignboardVisual.jsx';
import {
  SIMPLE_BOUNDS,
  evaluateNthTerm,
  formatNthTermString,
} from '../../utils/nthTermMath.js';
import { useAudio } from '../../hooks/useAudio.js';

export default function TheSignboardWorkshop({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [a, setA] = useState(3);
  const [b, setB] = useState(2);
  const [exploreCount, setExploreCount] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Stepper handlers
  function changeA(delta) {
    if (completed) return;
    const nextA = Math.max(SIMPLE_BOUNDS.aMin, Math.min(SIMPLE_BOUNDS.aMax, a + delta));
    // Ensure all visible terms are positive (a + b >= 1)
    if (nextA + b >= 1) {
      sounds.click();
      setA(nextA);
      setExploreCount((c) => c + 1);
    }
  }

  function changeB(delta) {
    if (completed) return;
    const nextB = b + delta;
    if (nextB >= -6 && nextB <= 10 && a + nextB >= 1) {
      sounds.click();
      setB(nextB);
      setExploreCount((c) => c + 1);
    }
  }

  // Confirmation quiz options
  const quizOptions = [
    { text: "Every stall's stock increases by 1", correct: true },
    { text: "Only stall 1 increases by 1", correct: false },
    { text: "The step between consecutive stalls increases", correct: false },
    { text: "Nothing changes", correct: false },
  ];

  function handleSelectQuiz(idx) {
    if (quizSubmitted) return;
    sounds.click();
    setQuizAnswer(idx);
  }

  function handleSubmitQuiz() {
    if (quizAnswer === null) return;
    setQuizSubmitted(true);
    if (quizOptions[quizAnswer].correct) {
      sounds.correct();
      setCompleted(true);
      narrate([
        {
          text: "Brilliant! Raising the constant shifts every stall up by that exact amount. You've mastered The Signboard Workshop!",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "Look closely at the stalls as you change the constant: each stall shifts up together!",
          style: 'encouragement',
        },
      ]);
      setTimeout(() => {
        setQuizSubmitted(false);
        setQuizAnswer(null);
      }, 1800);
    }
  }

  // 10 Stalls data
  const stallsData = [];
  for (let n = 1; n <= 10; n++) {
    stallsData.push({
      n,
      stock: evaluateNthTerm(a, b, n),
      ghost: a * n,
    });
  }

  const signboardStr = formatNthTermString(a, b).expr;

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <h3 className="station-title">🪧 Station A: The Signboard Workshop</h3>
        <div className="station-target-box">
          <span className="station-target-label">Current Formula:</span>
          <span className="station-target-num">{signboardStr}</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Signboard & Ghost Overlay */}
        <div className="station-col-left">
          <SignboardVisual type="signboard" data={{ a, b }} compact={true} />

          {/* Stepper Controls */}
          <div className="stepper-panel">
            {/* Multiplier / Coefficient a */}
            <div className="stepper-row">
              <div className="stepper-info">
                <span className="stepper-title">Multiplier / Times Table (a)</span>
                <span className="stepper-hint">Step size between stalls</span>
              </div>
              <div className="stepper-controls">
                <button
                  className="stepper-btn"
                  onClick={() => changeA(-1)}
                  disabled={a <= SIMPLE_BOUNDS.aMin || a - 1 + b < 1}
                  aria-label="Decrease multiplier"
                >
                  −
                </button>
                <span className="stepper-val">{a}</span>
                <button
                  className="stepper-btn"
                  onClick={() => changeA(1)}
                  disabled={a >= SIMPLE_BOUNDS.aMax}
                  aria-label="Increase multiplier"
                >
                  +
                </button>
              </div>
            </div>

            {/* Constant Offset b */}
            <div className="stepper-row">
              <div className="stepper-info">
                <span className="stepper-title">Offset Shift (b)</span>
                <span className="stepper-hint">Shifts all stalls up or down</span>
              </div>
              <div className="stepper-controls">
                <button
                  className="stepper-btn"
                  onClick={() => changeB(-1)}
                  disabled={a + (b - 1) < 1 || b <= -6}
                  aria-label="Decrease offset"
                >
                  −
                </button>
                <span className="stepper-val">{b >= 0 ? `+${b}` : b}</span>
                <button
                  className="stepper-btn"
                  onClick={() => changeB(1)}
                  disabled={b >= 10}
                  aria-label="Increase offset"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Times Table Ghost Overlay */}
          <SignboardVisual
            type="times-table-ghost"
            data={{ a, b, count: 5 }}
            compact={true}
          />
        </div>

        {/* Right Column: Live 10 Stalls & Discovery Question */}
        <div className="station-col-right">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#fed7aa', textTransform: 'uppercase' }}>
                🏪 Live Stalls Restocking (1 to 10)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
                Explorations: <strong>{exploreCount}</strong>
              </span>
            </div>

            {/* 10 Stalls Grid */}
            <div className="live-stalls-container">
              {stallsData.map((st) => (
                <div key={st.n} className="live-stall-card">
                  <span className="live-stall-n">Stall {st.n}</span>
                  <span className="live-stall-stock">{st.stock}</span>
                  <span className="live-stall-ghost">{a}×{st.n} = {st.ghost}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Discovery Confirmation Quiz (Concept Discovery Lab Archetype) */}
          <div className="targets-summary-box" style={{ marginTop: 'auto' }}>
            <span style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold)' }}>
              💡 Discovery Check: What happens when you increase the constant (b) by +1?
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: 4 }}>
              {quizOptions.map((opt, idx) => (
                <button
                  key={idx}
                  className={`btn btn-sm ${quizAnswer === idx ? 'btn-primary' : 'btn-outline'}`}
                  style={{ fontSize: '0.78rem', padding: '6px 8px', textAlign: 'left', lineHeight: 1.2 }}
                  onClick={() => handleSelectQuiz(idx)}
                  disabled={completed}
                >
                  {opt.text}
                </button>
              ))}
            </div>

            {!completed ? (
              <button
                className="btn btn-primary btn-sm"
                style={{ marginTop: 6 }}
                onClick={handleSubmitQuiz}
                disabled={quizAnswer === null || quizSubmitted}
              >
                Check Discovery Answer ✓
              </button>
            ) : (
              <div className="station-success-panel" style={{ marginTop: 6 }}>
                <div className="station-success-content">
                  <span className="station-success-icon">🎉</span>
                  <div>
                    <div className="station-success-title">Workshop Complete!</div>
                    <div className="station-success-desc">You discovered how multiplier and offset shape the sequence.</div>
                  </div>
                </div>
                <button className="btn btn-primary btn-sm" onClick={onComplete}>
                  Complete Station ✓
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
