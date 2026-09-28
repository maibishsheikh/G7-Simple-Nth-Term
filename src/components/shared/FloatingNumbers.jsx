// src/components/shared/FloatingNumbers.jsx
import React, { useMemo } from 'react';
import './FloatingNumbers.css';

const NTH_SYMBOLS = [
  '3n+2', '4n', 'n+1', '5n−3', '🏮', '🦁', '🍢', '🥟', '🧋', '🍡',
  'Stall 1', 'Stall 50', '2n+1', '7n', '✨', '⭐', '3n+1', '6n−2', 'an+b', 'Stall n'
];

export default function FloatingNumbers() {
  const items = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      id: i,
      symbol: NTH_SYMBOLS[i % NTH_SYMBOLS.length],
      left: `${(i * 5.6 + 3) % 94}%`,
      delay: `${(i * 1.3) % 15}s`,
      duration: `${18 + (i % 5) * 4}s`,
      size: `${1.1 + (i % 4) * 0.4}rem`,
    }));
  }, []);

  return (
    <div className="floating-symbols-container" aria-hidden="true">
      {items.map((item) => (
        <span
          key={item.id}
          className="floating-money-symbol"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
            fontSize: item.size,
          }}
        >
          {item.symbol}
        </span>
      ))}
    </div>
  );
}
