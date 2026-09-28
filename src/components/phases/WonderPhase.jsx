// src/components/phases/WonderPhase.jsx
// Wonder Phase for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_PRD.md §8.1

import React, { useEffect } from 'react';
import './WonderPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { useAudio } from '../../hooks/useAudio.js';
import { wonderNarration } from '../../utils/narration.js';

const PARTICLES = ['🏮', '🦁', '🍢', '🥟', '🧋', '🍡', '⭐', '🪧', '✨', '🥢'];

export default function WonderPhase({ state, dispatch }) {
  const { narrate, stopAll } = useAudio(state?.audioEnabled ?? true);

  useEffect(() => {
    const segs = wonderNarration();
    narrate(segs);
    return () => stopAll();
  }, [narrate, stopAll]);

  function handleInvestigate() {
    stopAll();
    dispatch({ type: 'COMPLETE_PHASE', payload: 'wonder' });
    dispatch({ type: 'SET_PHASE', payload: 'story' });
  }

  return (
    <div className="wonder-wrap">
      {/* Floating particles */}
      <div className="wonder-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="wonder-particle"
            style={{
              left: `${5 + (i * 9.5) % 90}%`,
              top: `${5 + (i * 7.5) % 80}%`,
              animationDelay: `${i * 0.6}s`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            }}
          >
            {p}
          </span>
        ))}
      </div>

      <div className="wonder-content anim-slide-up">
        {/* Main hook card */}
        <div className="wonder-card glass-card">
          <div className="wonder-stadium-icon" aria-hidden="true">🏮</div>
          <h1 className="wonder-title headline">The Stall 50 Challenge!</h1>

          <div className="wonder-number-display">
            <span className="number-display wonder-num">
              Stall 1: 5 ➔ Stall 2: 8 ➔ Stall 3: 11 ➔ Stall 50: ?
            </span>
          </div>

          <div className="wonder-question-card">
            <p className="body-text wonder-q">
              A customer asks how many <strong className="wonder-em">satay sticks</strong> are stocked at <strong className="wonder-em">stall 50</strong>.
            </p>
            <p className="body-text wonder-q">
              The first stalls stock <span className="wonder-highlight">5, 8, 11…</span> Walking down 50 stalls would take all night! Can you work it out right from here?
            </p>
          </div>

          {/* Mascot */}
          <div className="wonder-mascot-row">
            <Mascot
              mood="curious"
              message="Can we build a signboard formula that tells us what's at ANY stall number?"
              size="sm"
            />
          </div>

          <button className="btn btn-primary btn-lg wonder-cta" onClick={handleInvestigate}>
            Enter the Night Market Story 🍢
          </button>
        </div>
      </div>
    </div>
  );
}
