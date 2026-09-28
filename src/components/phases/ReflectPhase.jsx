// src/components/phases/ReflectPhase.jsx
// Reflect Phase for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_TRD.md §6.3 and PRD §8.5

import React, { useState, useEffect, useRef } from 'react';
import './ReflectPhase.css';
import Mascot from '../shared/Mascot.jsx';
import { BADGES } from '../../utils/badgeEngine.js';
import { calcStars } from '../../utils/scoring.js';
import { useAudio } from '../../hooks/useAudio.js';
import { reflectNarration, reflectCompleteNarration } from '../../utils/narration.js';
import { generateSessionQuestions } from '../../utils/shuffle.js';
import questionBank from '../../data/questionBank.js';

const REFLECT_QUESTIONS = [
  {
    q: "1. What does the signboard expression '3n + 2' mean when calculating stock at stall 5?",
    options: [
      "Replace n with 5 and multiply in order: 3 × 5 + 2 = 17",
      "Write 3 and 5 side by side to get 35, then add 2 = 37",
      "Start at 3 and add 2 repeatedly",
    ],
    correct: 0,
  },
  {
    q: "2. A sequence begins: 4, 7, 10, 13… Which is the correct nth term?",
    options: [
      "3n + 1 (The 3 times table shifted up by 1)",
      "3n + 4 (Using the first term 4 as the constant)",
      "n + 3 (Writing n + difference instead of 3n)",
    ],
    correct: 0,
  },
  {
    q: "3. Why is it vital to test at least TWO positions (e.g. n = 1 AND n = 2) before trusting a formula?",
    options: [
      "A 'false friend' formula can match at stall 1 but fail at stall 2",
      "Testing stall 1 is already sufficient proof for any formula",
      "Because stall 2 always has twice the stock of stall 1",
    ],
    correct: 0,
  },
];

export default function ReflectPhase({ state, dispatch }) {
  const [answers, setAnswers] = useState({});
  const [journal, setJournal] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { narrate, stopAll, sounds } = useAudio(state?.audioEnabled ?? true);
  const narrated = useRef(false);

  const totalCorrect = state?.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  const totalStars = state?.districtScores?.reduce((s, sc) => {
    if (sc === null || sc === undefined) return s;
    return s + calcStars(sc);
  }, 0) || 0;

  useEffect(() => {
    if (!narrated.current) {
      narrated.current = true;
      narrate(reflectNarration());
    }
    dispatch({ type: 'COMPLETE_PHASE', payload: 'reflect' });
    return () => stopAll();
  }, [dispatch, narrate, stopAll]);

  function handleSelectOption(qIdx, optIdx) {
    sounds.click();
    setAnswers((prev) => ({ ...prev, [qIdx]: optIdx }));
  }

  function handleSubmit() {
    setSubmitted(true);
    stopAll();
    sounds.badge();
    narrate(reflectCompleteNarration());
  }

  function playAgain() {
    dispatch({ type: 'RESET_SESSION' });
    dispatch({ type: 'LOAD_QUESTIONS', payload: generateSessionQuestions(questionBank) });
    dispatch({ type: 'SET_PHASE', payload: 'intro' });
  }

  const earnedBadges = BADGES.filter((b) => state?.badges?.includes(b.id));

  if (submitted) {
    return (
      <div className="reflect-wrap">
        <div className="trophy-card glass-card anim-bounce-in">
          <div className="trophy-icon">🏆</div>
          <h1 className="trophy-title headline">You're a Night Market Master!</h1>
          <p className="trophy-sub subheadline" style={{ color: 'var(--gold)' }}>
            Simple Nth Term Mastery Complete ✅
          </p>

          {/* Stats Breakdown */}
          <div className="trophy-stats">
            <div className="trophy-stat">
              <span className="stat-value number-display">{totalCorrect}</span>
              <span className="stat-label label-text">/ 100 Questions</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state?.xp || 0}</span>
              <span className="stat-label label-text">XP Earned ⭐</span>
            </div>
            <div className="trophy-stat">
              <span className="stat-value number-display">{state?.maxStreak || 0}</span>
              <span className="stat-label label-text">Best Streak 🔥</span>
            </div>
          </div>

          {/* Stars */}
          <div className="trophy-stars">
            {[...Array(Math.min(Math.max(totalStars, 3), 30))].map((_, i) => (
              <span
                key={i}
                style={{ fontSize: '1.3rem', animationDelay: `${i * 0.05}s` }}
                className="anim-bounce-in"
              >
                ⭐
              </span>
            ))}
          </div>

          {/* Badges */}
          {earnedBadges.length > 0 && (
            <div className="trophy-badges">
              <p
                className="label-text"
                style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '6px' }}
              >
                Night Market Badges Unlocked
              </p>
              <div className="badge-list">
                {earnedBadges.map((b) => (
                  <div key={b.id} className="badge-pill">
                    <span style={{ fontSize: '1.3rem' }}>{b.icon}</span>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                      <span style={{ fontWeight: 800 }}>{b.label}</span>
                      <span className="badge-desc label-text">{b.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="trophy-actions">
            <button className="btn btn-primary trophy-cta" onClick={playAgain}>
              🔄 Play Again
            </button>
            <button
              className="btn btn-outline"
              onClick={() => dispatch({ type: 'SET_PHASE', payload: 'intro' })}
            >
              🏠 Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="reflect-wrap">
      <div className="reflect-card glass-card anim-slide-up">
        <div className="reflect-header">
          <span className="reflect-badge">📓 Learning Reflection &amp; Scorecard</span>
          <h2 className="reflect-title subheadline">Reflect on Your Nth-Term Journey</h2>
        </div>

        <Mascot
          mood="curious"
          message="Let's review our key signboard rules and check your market scorecard!"
          size="sm"
        />

        {/* Self-assessment Concept Check */}
        <div className="reflect-quiz-container">
          <p className="body-text" style={{ color: 'var(--gold)', fontWeight: 800 }}>
            🧠 Nth-Term Misconception Check:
          </p>
          {REFLECT_QUESTIONS.map((qObj, qIdx) => (
            <div key={qIdx} className="reflect-q-item">
              <p className="reflect-q-text">{qObj.q}</p>
              <div className="reflect-opt-row">
                {qObj.options.map((opt, oIdx) => {
                  const isSelected = answers[qIdx] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      className={`option-btn ${isSelected ? 'selected' : ''}`}
                      onClick={() => handleSelectOption(qIdx, oIdx)}
                      style={{ textAlign: 'left', minHeight: '44px', fontSize: '1rem', padding: '10px 14px' }}
                    >
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Journal Entry */}
        <div className="reflect-journal">
          <label className="reflect-label body-text" htmlFor="journal-input">
            Which stall did you test your signboard on, and why that one?
          </label>
          <textarea
            id="journal-input"
            className="reflect-textarea"
            placeholder="e.g. I tested stall 1 and stall 2 to make sure a false friend didn't trick me!"
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            rows={2}
            aria-label="Learning journal entry"
          />

          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
            <span style={{ fontSize: '0.8rem', color: '#a0a0b8', alignSelf: 'center' }}>Quick insert:</span>
            {[
              'I tested stalls 1 AND 2 to avoid false friends!',
              'I found the offset by comparing to the times table.',
              'I evaluated stall 50 directly: 3(50) + 2 = 152!',
            ].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setJournal(ex)}
                className="quick-insert-btn"
              >
                ✨ {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Snapshot */}
        <div className="reflect-stats">
          <div className="reflect-stat-pill">⭐ {state?.xp || 0} XP Earned</div>
          <div className="reflect-stat-pill">✅ {totalCorrect}/100 Correct</div>
          <div className="reflect-stat-pill">🔥 Best Streak: {state?.maxStreak || 0}</div>
        </div>

        <div className="reflect-actions">
          <button className="btn btn-primary btn-lg" onClick={handleSubmit}>
            🌟 Submit Reflection &amp; View Trophy Scorecard!
          </button>
        </div>
      </div>
    </div>
  );
}
