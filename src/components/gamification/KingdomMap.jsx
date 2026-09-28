// src/components/gamification/KingdomMap.jsx
// Pixel-matched 10-world grid (2 rows × 5 columns) matching reference Image 2
import React from 'react';
import './KingdomMap.css';
import { calcStars } from '../../utils/scoring.js';
import { DISTRICTS } from '../../data/questionBank.js';

export default function KingdomMap({
  districtScores,
  districtCorrect,
  currentDistrict,
  onSelectDistrict,
}) {
  return (
    <div className="kingdom-grid-5x2">
      {DISTRICTS.map((dist, idx) => {
        const isCurrent = idx === currentDistrict;
        const isCompleted = districtScores?.[idx] !== null && districtScores?.[idx] !== undefined;
        const isUnlocked = idx <= currentDistrict || isCompleted;
        const correct = districtCorrect?.[idx] || 0;
        const stars = isCompleted ? calcStars(districtScores[idx]) : 0;

        const qStart = idx * 10 + 1;
        const qEnd = idx * 10 + 10;

        return (
          <div
            key={dist.id}
            className={`world-card-node ${isCurrent ? 'active-world' : ''} ${isCompleted ? 'completed-world' : ''} ${!isUnlocked ? 'locked-world' : ''}`}
            onClick={() => isUnlocked && onSelectDistrict && onSelectDistrict(idx)}
            role="button"
            tabIndex={isUnlocked ? 0 : -1}
            aria-label={`World ${idx + 1}: ${dist.name} (${isUnlocked ? 'Unlocked' : 'Locked'})`}
          >
            {/* Top row: W{idx+1} and Q range */}
            <div className="card-top-row">
              <span className="world-pill-badge">W{idx + 1}</span>
              <span className="world-q-range">Q{qStart}–{qEnd}</span>
            </div>

            {/* Center icon */}
            <div className="world-center-icon-wrap">
              {isCompleted ? (
                <span className="world-done-icon">⭐</span>
              ) : isCurrent ? (
                <div className="world-target-ring" title="Active World">
                  <span className="target-core-dot">◎</span>
                </div>
              ) : isUnlocked ? (
                <span className="world-open-icon">{dist.icon}</span>
              ) : (
                <span className="world-lock-icon">🔒</span>
              )}
            </div>

            {/* World Name */}
            <div className="world-title-text" title={dist.name}>
              {dist.name}
            </div>

            {/* Bottom status */}
            <div className="world-bottom-status">
              {isCompleted ? (
                <span className="status-completed-text">{correct}/10 ⭐</span>
              ) : isCurrent ? (
                <span className="status-play-text">Play →</span>
              ) : isUnlocked ? (
                <span className="status-ready-text">Ready</span>
              ) : (
                <span className="status-locked-text">Locked</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
