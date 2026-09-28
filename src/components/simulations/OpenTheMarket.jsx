// src/components/simulations/OpenTheMarket.jsx
// Station C: Open the Market (Multi-Step / Composite Construction)
// Strictly follows NthQuest_Grade7_TRD.md §6 and PRD §8.3

import React, { useState } from 'react';
import './Stations.css';
import SignboardVisual from '../shared/SignboardVisual.jsx';
import {
  evaluateNthTerm,
  formatNthTermString,
} from '../../utils/nthTermMath.js';
import { useAudio } from '../../hooks/useAudio.js';

export default function OpenTheMarket({ onComplete, audioEnabled }) {
  const { narrate, sounds } = useAudio(audioEnabled);
  const [step, setStep] = useState(1); // 1, 2, 3, 4

  // Underlying sequence: 4n + 3 -> Stall 1: 7, Stall 2: 11, Stall 3: 15, Stall 4: 19
  // Step 1: Missing Stall 3
  const [step1Input, setStep1Input] = useState('');
  const [step1Done, setStep1Done] = useState(false);

  // Step 2: Offset comparison (+3)
  const [step2Input, setStep2Input] = useState('');
  const [step2Done, setStep2Done] = useState(false);

  // Step 3: Choose correct signboard formula
  const [step3Choice, setStep3Choice] = useState(null);
  const [step3Done, setStep3Done] = useState(false);

  // Step 4: Far stall 40 evaluation
  const [step4Input, setStep4Input] = useState('');
  const [step4Done, setStep4Done] = useState(false);

  // Handlers
  function handleStep1Check() {
    if (parseInt(step1Input, 10) === 15) {
      sounds.correct();
      setStep1Done(true);
      setStep(2);
      narrate([
        {
          text: "Correct! The sequence increases by 4 each stall, so stall 3 has 15 items! Now find the times-table offset.",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "Look at the pattern: 7, 11, then add 4 again to find stall 3!",
          style: 'encouragement',
        },
      ]);
    }
  }

  function handleStep2Check() {
    if (parseInt(step2Input, 10) === 3) {
      sounds.correct();
      setStep2Done(true);
      setStep(3);
      narrate([
        {
          text: "Spot on! 7 minus 4 is 3, and 11 minus 8 is 3! The offset is positive 3. Now assemble the signboard!",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "Subtract the 4 times table from the stock: at stall 1, 7 minus 4 equals what?",
          style: 'encouragement',
        },
      ]);
    }
  }

  const formulaOptions = [
    { label: '4n + 3', correct: true },
    { label: '3n + 4', correct: false, note: 'Swapped multiplier and constant!' },
    { label: 'n + 4',  correct: false, note: 'Term-to-term leak misconception!' },
    { label: '4n',     correct: false, note: 'Forgot the +3 offset!' },
  ];

  function handleStep3Select(idx) {
    sounds.click();
    setStep3Choice(idx);
    if (formulaOptions[idx].correct) {
      sounds.correct();
      setStep3Done(true);
      setStep(4);
      narrate([
        {
          text: "Perfect! 4 times n plus 3 matches stall 1 and stall 2. Now use it to stock Stall 50!",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: formulaOptions[idx].note,
          style: 'encouragement',
        },
      ]);
    }
  }

  function handleStep4Check() {
    // Stall 40: 4 * 40 + 3 = 163
    if (parseInt(step4Input, 10) === 163) {
      sounds.correct();
      setStep4Done(true);
      narrate([
        {
          text: "Fantastic work! 4 times 40 is 160, plus 3 equals 163! You opened the market with flying colors!",
          style: 'celebration',
        },
      ]);
    } else {
      sounds.wrong();
      narrate([
        {
          text: "Multiply 4 times 40 first to get 160, then add 3!",
          style: 'encouragement',
        },
      ]);
    }
  }

  const currentSeq = [7, 11, step1Done ? 15 : '?', 19];

  return (
    <div className="station-wrap">
      {/* Header */}
      <div className="station-header">
        <h3 className="station-title">🏗️ Station C: Open the Market Construction</h3>
        <div className="station-target-box">
          <span className="station-target-label">Phase:</span>
          <span className="station-target-num">Step {step} of 4</span>
        </div>
      </div>

      <div className="station-grid-2col">
        {/* Left Column: Live Visual Construction Canvas */}
        <div className="station-col-left">
          {/* Table display */}
          <div className="pt-table-wrap">
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', padding: '4px 8px', display: 'block' }}>
              MARKET STOCK TABLE:
            </span>
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Stall Number (n)</th>
                  <th>Stall 1</th>
                  <th>Stall 2</th>
                  <th>Stall 3</th>
                  <th>Stall 4</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: 'var(--gold)', fontWeight: 800 }}>Satay Stock</td>
                  <td>7</td>
                  <td>11</td>
                  <td className={!step1Done ? 'missing-cell' : ''}>
                    {step1Done ? '15' : '?'}
                  </td>
                  <td>19</td>
                </tr>
                {step >= 2 && (
                  <tr>
                    <td style={{ color: '#4cc9f0', fontWeight: 700 }}>4× Table Ghost</td>
                    <td>4</td>
                    <td>8</td>
                    <td>12</td>
                    <td>16</td>
                  </tr>
                )}
                {step >= 3 && (
                  <tr>
                    <td style={{ color: '#06d6a0', fontWeight: 700 }}>Offset Shift</td>
                    <td>+3</td>
                    <td>+3</td>
                    <td>+3</td>
                    <td>+3</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Signboard preview */}
          {step >= 3 && (
            <SignboardVisual
              type="signboard"
              data={{ a: 4, b: 3 }}
              compact={true}
            />
          )}

          {/* Far Stall Preview */}
          {step >= 4 && (
            <div className="targets-summary-box">
              <span style={{ fontWeight: 800, color: 'var(--gold)' }}>
                🛣️ Far-Away Stall 40 Calculation:
              </span>
              <p style={{ fontSize: '0.9rem', margin: '4px 0 0', color: '#e2e8f0' }}>
                Formula: <strong>4n + 3</strong> ➔ Substitute n = 40:<br />
                <code style={{ color: '#ffd54f' }}>4 × 40 + 3 = 160 + 3 = ?</code>
              </p>
            </div>
          )}
        </div>

        {/* Right Column: Chained Wizard Steps */}
        <div className="station-col-right">
          <div className="wizard-steps-container">
            {/* Step 1 */}
            <div className={`wizard-step-box ${step === 1 ? 'active' : ''} ${step1Done ? 'completed' : ''}`}>
              <div className="wizard-step-title">
                <span>Step 1: Fill Stall 3 Stock</span>
                <span>{step1Done ? '✅ Complete' : 'Active'}</span>
              </div>
              {!step1Done ? (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="number"
                    value={step1Input}
                    onChange={(e) => setStep1Input(e.target.value)}
                    placeholder="Enter stock for stall 3"
                    className="wizard-input"
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid #fed7aa', color: '#fff' }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleStep1Check}>
                    Submit ➔
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: '0.8rem', color: '#a7f3d0', margin: 0 }}>
                  Stall 3 stock is 15 (step size is 4).
                </p>
              )}
            </div>

            {/* Step 2 */}
            <div className={`wizard-step-box ${step === 2 ? 'active' : ''} ${step2Done ? 'completed' : ''}`}>
              <div className="wizard-step-title">
                <span>Step 2: Find Times-Table Offset</span>
                <span>{step2Done ? '✅ Complete' : step > 2 ? 'Done' : step === 2 ? 'Active' : 'Locked'}</span>
              </div>
              {step === 2 && !step2Done && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Stock (7) − Table (4) = </span>
                  <input
                    type="number"
                    value={step2Input}
                    onChange={(e) => setStep2Input(e.target.value)}
                    placeholder="Offset"
                    style={{ width: 80, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid #fed7aa', color: '#fff' }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleStep2Check}>
                    Verify ➔
                  </button>
                </div>
              )}
              {step2Done && (
                <p style={{ fontSize: '0.8rem', color: '#a7f3d0', margin: 0 }}>
                  Times-table offset is +3.
                </p>
              )}
            </div>

            {/* Step 3 */}
            <div className={`wizard-step-box ${step === 3 ? 'active' : ''} ${step3Done ? 'completed' : ''}`}>
              <div className="wizard-step-title">
                <span>Step 3: Construct the Signboard</span>
                <span>{step3Done ? '✅ Complete' : step > 3 ? 'Done' : step === 3 ? 'Active' : 'Locked'}</span>
              </div>
              {step === 3 && !step3Done && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 4 }}>
                  {formulaOptions.map((opt, i) => (
                    <button
                      key={i}
                      className="btn btn-outline btn-sm"
                      onClick={() => handleStep3Select(i)}
                      style={{ fontSize: '0.9rem', fontWeight: 800 }}
                    >
                      nth term = {opt.label}
                    </button>
                  ))}
                </div>
              )}
              {step3Done && (
                <p style={{ fontSize: '0.8rem', color: '#a7f3d0', margin: 0 }}>
                  Signboard verified: nth term = 4n + 3.
                </p>
              )}
            </div>

            {/* Step 4 */}
            <div className={`wizard-step-box ${step === 4 ? 'active' : ''} ${step4Done ? 'completed' : ''}`}>
              <div className="wizard-step-title">
                <span>Step 4: Stock Far Stall 40</span>
                <span>{step4Done ? '✅ Complete' : step === 4 ? 'Active' : 'Locked'}</span>
              </div>
              {step === 4 && !step4Done && (
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="number"
                    value={step4Input}
                    onChange={(e) => setStep4Input(e.target.value)}
                    placeholder="Stock at stall 40"
                    style={{ flex: 1, padding: '8px 12px', borderRadius: 8, background: 'rgba(0,0,0,0.3)', border: '1px solid #fed7aa', color: '#fff' }}
                  />
                  <button className="btn btn-primary btn-sm" onClick={handleStep4Check}>
                    Calculate ➔
                  </button>
                </div>
              )}
              {step4Done && (
                <p style={{ fontSize: '0.8rem', color: '#a7f3d0', margin: 0 }}>
                  Stall 40 stock = 163 items!
                </p>
              )}
            </div>
          </div>

          {/* Completion Button */}
          {step4Done && (
            <div className="station-success-panel" style={{ marginTop: 'auto' }}>
              <div className="station-success-content">
                <span className="station-success-icon">🏮</span>
                <div>
                  <div className="station-success-title">Market Successfully Opened!</div>
                  <div className="station-success-desc">
                    You chained table reading, offset derivation, and far-stall prediction!
                  </div>
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
  );
}
