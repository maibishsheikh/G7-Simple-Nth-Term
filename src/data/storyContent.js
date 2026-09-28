// src/data/storyContent.js
// 4 Widescreen Story Panels for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_PRD.md §8.2 and NthQuest_Grade7_TRD.md §4.3

export const STORY_PANELS = [
  {
    panel: 0,
    title: "Stall Number Fifty 🚶",
    text: "Jun Kai and Meera were helping at the bustling Singapore night market (pasar malam). Long rows of food stalls were numbered neatly down the street: stall 1 stocked 5 satay sticks, stall 2 stocked 8, and stall 3 stocked 11. Suddenly, a customer hurried up: \"Excuse me! How many satay sticks are stocked at stall fifty?\" Jun Kai scratched his head: \"Stall 50 is all the way at the other end of the market! Walking down fifty stalls would take all night!\" Meera smiled confidently: \"We don't need to walk 50 stalls. There must be an algebraic formula to calculate stall 50 right from where we stand!\"",
    highlight: "🍢 Stall 1: 5 sticks · Stall 2: 8 sticks · Stall 3: 11 sticks · How many at Stall 50?",
    character: "Jun Kai & Meera",
    characterEmoji: "🧑🏻",
    imageBg: "radial-gradient(circle, #e63946 0%, #780000 100%)",
    imageEmoji: "🍢",
  },
  {
    panel: 1,
    title: "n Is the Stall Number 🪧",
    text: "Singa the Lion Cub trotted over, pointing up at a glowing market signboard: \"nth term = 3n + 2\". \"In algebra,\" Singa explained with a cheerful roar, \"n is the position number! In our night market, n is simply the stall number!\" Jun Kai read the sign aloud: \"So does 3n + 2 mean start at 3 and add 2?\" \"Not at all!\" laughed Meera. \"3n means 3 times n! To read any signboard, replace n with the stall number: for stall 1, replace n with 1. Three times 1 is 3, plus 2 gives 5 satay sticks! That matches stall 1 perfectly!\"",
    highlight: "🪧 n = position number (stall #) · 3n means 3 × n, not 'starts at 3'!",
    character: "Singa the Lion Cub",
    characterEmoji: "🦁",
    imageBg: "radial-gradient(circle, #f77f00 0%, #b23b00 100%)",
    imageEmoji: "🦁",
  },
  {
    panel: 2,
    title: "Building a Signboard 📐",
    text: "Jun Kai asked: \"How do we build our own signboard from scratch for any stall line?\" Meera laid out the stock count: 4, 7, 10, 13… \"First, look at the common difference: the stock goes up by 3 each time. That means it is built on the 3 times table: 3, 6, 9, 12! Next, compare the stock to the times table: 4 is 3 + 1, 7 is 6 + 1. Every stall is the 3 times table shifted up by 1! So the formula is 3n + 1!\" Singa gave an important reminder: \"Never trust a formula after checking only stall 1! Always check at least two stalls: 3(1) + 1 = 4, and 3(2) + 1 = 7! Both check out!\"",
    highlight: "📐 Times-table-shift: Common difference gives 3n · Offset gives +1 · Always check stalls 1 AND 2!",
    character: "Meera",
    characterEmoji: "👧🏽",
    imageBg: "radial-gradient(circle, #fcbf49 0%, #d48b00 100%)",
    imageEmoji: "📊",
  },
  {
    panel: 3,
    title: "Stall Fifty, Solved! 🏆",
    text: "Now the pair returned to the customer's question about stall 50. For their sequence 5, 8, 11, 14…, the stock increases by 3 each time, giving 3n. At stall 1, 3 × 1 = 3, but we need 5 satay sticks, so we shift up by 2: \"nth term = 3n + 2\". Double-checking stall 2: 3 × 2 + 2 = 8, which matches! \"Now find stall 50 without walking: replace n with 50!\" Jun Kai calculated with a grin: 3 times 50 is 150, plus 2 makes 152 satay sticks! The customer cheered in amazement, and Singa stamped the signboard approved!",
    highlight: "🏆 Stall 50 = 3 × 50 + 2 = 152 satay sticks! Solved in seconds without walking! 🎉",
    character: "Jun Kai, Meera & Singa",
    characterEmoji: "🌟",
    imageBg: "radial-gradient(circle, #06d6a0 0%, #007f5f 100%)",
    imageEmoji: "🏆",
  },
];
