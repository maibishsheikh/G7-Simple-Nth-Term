// src/utils/badgeEngine.js
// Badge definitions and unlock triggers for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_PRD.md §10 and NthQuest_Grade7_TRD.md §7

export const BADGES = [
  {
    id: 'first_stall',
    icon: '🏮',
    label: 'First Stall Visited',
    description: 'Answered your very first nth-term question correctly!',
  },
  {
    id: 'busy_browsing',
    icon: '🛍️',
    label: 'Busy Browsing',
    description: 'Achieved a streak of 5 correct answers across the market!',
  },
  {
    id: 'market_regular',
    icon: '🔥',
    label: 'Market Regular Streak',
    description: 'Achieved an unstoppable 10-question winning streak!',
  },
  {
    id: 'stall_kit',
    icon: '🧰',
    label: 'Full Stall Kit',
    description: 'Mastered all 4 interactive simulation workshop stations!',
  },
  {
    id: 'stall_sold_out',
    icon: '⭐',
    label: 'Stall Sold Out',
    description: 'Scored 3 stars in a Practice World!',
  },
  {
    id: 'signboard_fixed',
    icon: '🪧',
    label: 'Signboard Fixed',
    description: 'Defeated a World Boss in battle with your formula skills!',
  },
  {
    id: 'seasoned_shopper',
    icon: '🧺',
    label: 'Seasoned Shopper',
    description: 'Answered over 20 questions in Practice!',
  },
  {
    id: 'night_market_master',
    icon: '🏆',
    label: 'Night Market Master Badge',
    description: 'Completed the entire 5-phase NthQuest journey!',
  },
];

export function checkBadges(state) {
  const unlocked = [];

  // First correct answer
  const totalCorrect = state.districtCorrect?.reduce((s, c) => s + (c || 0), 0) || 0;
  if (totalCorrect >= 1) unlocked.push('first_stall');

  // Streak checks
  if (state.maxStreak >= 5) unlocked.push('busy_browsing');
  if (state.maxStreak >= 10) unlocked.push('market_regular');

  // Simulation completion (all 4 stations)
  if (state.simStationsComplete && state.simStationsComplete.every(Boolean)) {
    unlocked.push('stall_kit');
  }

  // 3-star district check
  if (state.districtScores && state.districtScores.some((score) => score !== null && score >= 9)) {
    unlocked.push('stall_sold_out');
  }

  // Seasoned shopper (20+ questions answered)
  if (state.currentQuestion >= 20 || totalCorrect >= 20) {
    unlocked.push('seasoned_shopper');
  }

  // Boss battle won
  if (state.bossDefeated) {
    unlocked.push('signboard_fixed');
  }

  // Full journey complete
  if (state.phaseComplete && Object.values(state.phaseComplete).every(Boolean)) {
    unlocked.push('night_market_master');
  }

  return unlocked;
}
