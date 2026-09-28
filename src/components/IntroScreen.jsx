// src/components/IntroScreen.jsx
// Intro Screen for NthQuest (Grade 7 · Simple Nth Term)
import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';

const JOURNEY = [
  { num: '01', icon: '🔍', label: 'Wonder',   desc: 'The Stall 50 Challenge' },
  { num: '02', icon: '📖', label: 'Story',    desc: "Jun Kai & Meera's quest" },
  { num: '03', icon: '🧪', label: 'Simulate', desc: '4 interactive labs' },
  { num: '04', icon: '🎮', label: 'Practice', desc: '10 worlds & bosses' },
  { num: '05', icon: '📓', label: 'Reflect',  desc: 'Review & scorecard' },
];

export default function IntroScreen({ state, dispatch }) {
  const hasSaved = state?.phaseComplete && Object.values(state.phaseComplete).some(Boolean);

  function startFresh() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  function resumeSession() {
    dispatch({ type: 'SET_PHASE', payload: state.savedPhase || 'wonder' });
  }

  return (
    <div className="intro-wrap">
      {/* Top Badge */}
      <div className="intro-top-badge">
        🏮 Secondary 1 Math · Simple Nth Term (Grade 7)
      </div>

      {/* Main Title */}
      <h1 className="intro-title">
        <span className="text-orange">Nth</span> <span className="text-white">Quest</span>
      </h1>
      <h2 className="intro-subtitle">NthQuest · Master Position-to-Term &amp; Signboard Formulas</h2>

      {/* Mascot Row */}
      <div className="intro-mascot-row">
        <div className="intro-mascot-circle">🦁</div>
        <div className="intro-speech-bubble">
          Hi! I'm Singa the Lion Cub. Ready to explore the night market<br />
          and decode the signboard formulas? 🏮🍢
        </div>
      </div>

      {/* Description */}
      <p className="intro-desc">
        Discover what <em>n</em> actually means (the stall position!), read and substitute into signboards, and build linear nth-term expressions using the times-table-shift method!
      </p>

      {/* Journey Card */}
      <div className="journey-card">
        <div className="journey-card-title">YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START</div>

        <div className="journey-steps-container">
          <div className="journey-row top-row">
            {JOURNEY.slice(0, 3).map((j, i) => (
              <React.Fragment key={j.num}>
                <div
                  className="journey-step-item clickable-step"
                  onClick={() => dispatch({ type: 'SET_PHASE', payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase() })}
                  role="button"
                  tabIndex={0}
                  title={`Click to open ${j.label} phase`}
                >
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                <span className={`journey-arrow ${i === 2 ? 'fade-arrow' : ''}`}>→</span>
              </React.Fragment>
            ))}
          </div>

          <div className="journey-row bottom-row">
            {JOURNEY.slice(3, 5).map((j, i) => (
              <React.Fragment key={j.num}>
                <div
                  className="journey-step-item clickable-step"
                  onClick={() => dispatch({ type: 'SET_PHASE', payload: j.label.toLowerCase() === 'practice' ? 'play' : j.label.toLowerCase() })}
                  role="button"
                  tabIndex={0}
                  title={`Click to open ${j.label} phase`}
                >
                  <span className="journey-icon-circle">{j.icon}</span>
                  <div className="journey-text-col">
                    <span className="journey-item-title">{j.label}</span>
                    <span className="journey-item-desc">{j.desc}</span>
                  </div>
                </div>
                {i === 0 && <span className="journey-arrow">→</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="intro-actions">
        {hasSaved ? (
          <>
            <button className="btn btn-primary btn-lg" onClick={resumeSession}>
              Resume Journey 🚀
            </button>
            <button className="btn btn-outline btn-lg" onClick={startFresh}>
              Start Fresh 🔄
            </button>
          </>
        ) : (
          <button className="btn btn-primary btn-lg" onClick={startFresh}>
            Begin Market Adventure 🏮
          </button>
        )}
      </div>
    </div>
  );
}
