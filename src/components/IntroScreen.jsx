// src/components/IntroScreen.jsx
// Pixel-faithful IntroScreen matching reference Image 1 exactly:
// Large uncompromised fonts, single-row 5-phase journey, zero scrolling on any screen.

import React from 'react';
import './IntroScreen.css';
import { generateSessionQuestions } from '../utils/shuffle.js';
import questionBank from '../data/questionBank.js';

const JOURNEY_STEPS = [
  { key: 'wonder',   icon: '🔍', title: 'Wonder',   desc: 'Telemetry signal alert' },
  { key: 'story',    icon: '📖', title: 'Story',    desc: 'Ishaan, Xin Yi & Orbit' },
  { key: 'simulate', icon: '🧪', title: 'Simulate', desc: '4 interactive labs' },
  { key: 'play',     icon: '🎮', title: 'Practice', desc: '10 worlds & bosses' },
  { key: 'reflect',  icon: '📓', title: 'Reflect',  desc: 'Review & scorecard' },
];

export default function IntroScreen({ state, dispatch }) {
  function startJourney() {
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'wonder' });
  }

  return (
    <div className="intro-viewport-root">
      {/* 1. Top Curriculum Pill */}
      <div className="intro-curriculum-badge">
        ✨ Curriculum · Arithmetic Progression &amp; Sequences Grade 7
      </div>

      {/* 2. Main Title */}
      <h1 className="intro-hero-title">
        <span className="title-part-orange">Progression</span> <span className="title-part-white">Quest</span>
      </h1>

      {/* 3. Subtitle */}
      <h2 className="intro-hero-subtitle">
        Master First Terms (a), Common Differences (d), and Trajectory Formulas
      </h2>

      {/* 4. Mascot Row: Avatar + Speech Bubble */}
      <div className="intro-mascot-container">
        <div className="mascot-orbit-circle" title="Orbit the AI Companion">
          🤖
        </div>
        <div className="mascot-dialogue-bubble">
          Hi! I'm Orbit. Nova-7's telemetry stream is corrupted! Check every gap, formulate general terms with <span className="bubble-highlight">T_n = a + (n - 1)d</span>, and calibrate trajectories to save the mission! 🚀 📡
        </div>
      </div>

      {/* 5. Learning Journey Card (Single Horizontal Row) */}
      <div className="intro-journey-card-frame">
        <div className="journey-card-caption">
          YOUR LEARNING JOURNEY · CLICK ANY PHASE TO START
        </div>

        <div className="journey-single-row">
          {JOURNEY_STEPS.map((step, idx) => (
            <React.Fragment key={step.key}>
              <div
                className="journey-node-item"
                onClick={() => dispatch({ type: 'SET_PHASE', payload: step.key })}
                role="button"
                tabIndex={0}
                title={`Open ${step.title} phase`}
              >
                <div className="node-icon-circle">
                  {step.icon}
                </div>
                <div className="node-text-col">
                  <span className="node-title">{step.title}</span>
                  <span className="node-desc">{step.desc}</span>
                </div>
              </div>

              {idx < JOURNEY_STEPS.length - 1 && (
                <span className="journey-row-arrow" aria-hidden="true">→</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 6. Big Golden / Amber CTA Button */}
      <button className="intro-journey-cta-btn" onClick={startJourney}>
        <span className="cta-icon">🚀</span>
        <span>Begin Your Journey!</span>
      </button>

      {/* 7. Bottom 3 Feature Pills */}
      <div className="intro-feature-pills-row">
        <div className="intro-feat-pill">
          <span className="feat-icon">🎯</span> 100 Questions
        </div>
        <div className="intro-feat-pill">
          <span className="feat-icon">📈</span> Sequences &amp; AP
        </div>
        <div className="intro-feat-pill">
          <span className="feat-icon">✨</span> Badges &amp; XP
        </div>
      </div>
    </div>
  );
}
