// src/components/shared/SignboardVisual.jsx
// Visual component for NthQuest (Grade 7 · Simple Nth Term)
// Supports: 'signboard', 'stall-row', 'times-table-ghost', 'position-term-table'
// Strictly follows NthQuest_Grade7_TRD.md §5.1

import React from 'react';
import './SignboardVisual.css';
import { formatNthTermString } from '../../utils/nthTermMath.js';

export default function SignboardVisual({ type, data = {}, compact = false }) {
  if (!type) return null;

  const containerClass = `sb-container ${compact ? 'compact' : ''}`;

  switch (type) {
    case 'signboard': {
      const a = data.a !== undefined ? data.a : 3;
      const b = data.b !== undefined ? data.b : 2;
      const hasCoeff = a !== 1;
      const hasConst = b !== 0;
      const isPositiveB = b > 0;
      const absB = Math.abs(b);

      return (
        <div className={containerClass}>
          <div className="signboard-frame">
            <div className="signboard-lanterns" aria-hidden="true">
              <span>🏮</span>
              <span>🏮</span>
            </div>

            <div className="signboard-header-tag">
              <span>🏮 Pasar Malam Signboard</span>
            </div>

            <div className="signboard-expression-row">
              <span className="signboard-prefix">nth term</span>
              <span className="signboard-equals">=</span>

              {/* Coefficient and Variable */}
              <div className="signboard-coeff-wrap">
                <span className="signboard-term">
                  {hasCoeff && <span className="signboard-coeff">{a}</span>}
                  <span className="signboard-var">n</span>
                </span>
              </div>

              {/* Operator and Constant */}
              {hasConst && (
                <>
                  <span className="signboard-operator">{isPositiveB ? '+' : '−'}</span>
                  <div className="signboard-constant-wrap">
                    <span className="signboard-constant">{absB}</span>
                  </div>
                </>
              )}
            </div>

            {/* Explanatory color key & labels */}
            <div className="signboard-legend-row">
              <div className="signboard-legend-item">
                <span className="legend-dot coeff"></span>
                <span>{a === 1 ? '1× table' : `${a}× times table (step)`}</span>
              </div>
              <div className="signboard-legend-item">
                <span className="legend-dot variable"></span>
                <span>n = stall position</span>
              </div>
              {hasConst && (
                <div className="signboard-legend-item">
                  <span className="legend-dot constant"></span>
                  <span>{isPositiveB ? `+${absB} offset` : `−${absB} offset`}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      );
    }

    case 'stall-row': {
      const stalls = data.stalls || (data.sequence || []).map((term, i) => ({
        n: i + 1,
        stock: term,
      }));
      const targetN = data.targetN;
      const itemEmoji = data.itemEmoji || '🍢';
      const unit = data.unit || 'items';

      return (
        <div className={containerClass}>
          <div className="stall-row-wrapper">
            {stalls.slice(0, compact ? 5 : 8).map((st) => {
              const isTarget = targetN && st.n === targetN;
              return (
                <div
                  key={st.n}
                  className={`stall-card ${isTarget ? 'highlighted' : ''}`}
                >
                  <span className="stall-awning">{itemEmoji}</span>
                  <span className="stall-number-badge">Stall {st.n}</span>
                  <div className="stall-stock-display">
                    <span className="stall-stock-num">{st.stock}</span>
                    <span className="stall-stock-label">{unit}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    case 'times-table-ghost': {
      const a = data.a || 3;
      const b = data.b !== undefined ? data.b : 1;
      const count = data.count || (compact ? 4 : 5);
      const cols = [];

      for (let n = 1; n <= count; n++) {
        const tableVal = a * n;
        const actualVal = tableVal + b;
        cols.push({ n, tableVal, offset: b, actualVal });
      }

      return (
        <div className={containerClass}>
          <div className="times-table-ghost-wrap">
            <div className="ghost-grid">
              {cols.map((c) => (
                <div key={c.n} className="ghost-col">
                  <span className="ghost-col-stall">Stall {c.n}</span>
                  <span className="ghost-table-val" title={`${a} times table value`}>
                    {c.tableVal}
                  </span>
                  <span className={`ghost-offset-val ${c.offset >= 0 ? 'positive' : 'negative'}`}>
                    {c.offset >= 0 ? `+${c.offset}` : c.offset}
                  </span>
                  <span className="ghost-actual-val" title="Actual stall stock">
                    {c.actualVal}
                  </span>
                </div>
              ))}
            </div>
            {!compact && (
              <div className="signboard-legend-row" style={{ marginTop: 2 }}>
                <span className="signboard-legend-item">
                  <span className="legend-dot coeff"></span> Faded ghost: {a}× table
                </span>
                <span className="signboard-legend-item">
                  <span className="legend-dot constant"></span> Offset: {b >= 0 ? `+${b}` : b}
                </span>
                <span className="signboard-legend-item">
                  <span className="legend-dot variable"></span> Solid: Stock
                </span>
              </div>
            )}
          </div>
        </div>
      );
    }

    case 'position-term-table': {
      let items = data.rows;
      if (!items && data.sequence) {
        items = data.sequence.map((term, i) => ({
          n: i + 1,
          term,
        }));
      }
      items = items || [];
      const blankN = data.blankN;

      return (
        <div className={containerClass}>
          <div className="pt-table-wrap">
            <table className="pt-table">
              <thead>
                <tr>
                  <th>Position (n)</th>
                  {items.map((it) => (
                    <th key={it.n}>Stall {it.n}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ color: 'var(--gold)' }}>Term (Stock)</td>
                  {items.map((it) => {
                    const isBlank = blankN !== undefined && it.n === blankN;
                    return (
                      <td
                        key={it.n}
                        className={isBlank ? 'missing-cell' : ''}
                      >
                        {isBlank ? '?' : it.term}
                      </td>
                    );
                  })}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
