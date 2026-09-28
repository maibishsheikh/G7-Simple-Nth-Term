// src/utils/narration.js
// Narration script builder for NthQuest (Grade 7 · Simple Nth Term)
// Strictly follows NthQuest_Grade7_PRD.md §11, TRD §8, and audio_generation_pipeline (5).md

export const say       = (text) => ({ text, style: 'statement' });
export const ask       = (text) => ({ text, style: 'question' });
export const cheer     = (text) => ({ text, style: 'celebration' });
export const emphasize = (text) => ({ text, style: 'emphasis' });
export const think     = (text) => ({ text, style: 'thinking' });
export const instruct  = (text) => ({ text, style: 'instruction' });
export const encourage = (text) => ({ text, style: 'encouragement' });

export function wonderNarration() {
  return [
    say("Welcome to NthQuest! Let's explore the Singapore Night Market!"),
    say("A customer asks how many satay sticks are at stall fifty. The first stalls stock five, eight, eleven…"),
    ask("Walking down fifty stalls would take all night! Can you work it out from here?"),
    cheer("Let's investigate how signboards and position numbers tell us what's at any stall!"),
  ];
}

export function storyNarration(panel) {
  const scripts = [
    [
      say("Jun Kai and Meera were helping at the bustling Singapore night market when a hungry customer walked up."),
      ask("Excuse me! How many satay sticks are stocked at stall number fifty? the customer asked."),
      say("Stall one has five sticks, stall two has eight sticks, and stall three has eleven sticks, Meera noticed. It keeps growing by three!"),
      say("Jun Kai sighed. Stall fifty is all the way down the street. Walking down fifty stalls would take all night!"),
      cheer("There must be a mathematical shortcut to calculate stall fifty right now, Meera smiled."),
    ],
    [
      say("Singa the Lion Cub trotted over with a glowing signboard showing three times n, plus two."),
      say("Look at the letter n, Singa purred. The letter n is the position number! Here, n means the stall number!"),
      ask("Jun Kai squinted at the board. So three times n plus two means start at three and add two?"),
      say("Not quite, laughed Meera! To read the signboard, replace n with the stall number and calculate in order."),
      cheer("For stall one, replace n with one: three times one is three, plus two is five! That matches stall one exactly!"),
    ],
    [
      ask("How do we build our own signboard from scratch? asked Jun Kai."),
      say("Meera wrote down the stock numbers: four, seven, ten, thirteen. Notice they go up by three each time!"),
      say("That means it is connected to the three times table: three, six, nine, twelve!"),
      say("Meera overlaid the stock numbers on the three times table. Four is three plus one. Seven is six plus one. Every stall is the three times table shifted up by one!"),
      cheer("Singa cheered: Always check more than one stall! At stall one, three times one plus one is four. At stall two, three times two plus one is seven! Both check out!"),
    ],
    [
      say("Now we can easily answer the customer's question for stall fifty without walking down the street!"),
      say("Our rule adds three each time, so start with three times n. At stall one, three times one is three, but we need five satay sticks. So add two: three times n, plus two!"),
      say("Let's check stall two: three times two is six, plus two is eight. It matches!"),
      say("Now substitute stall fifty: replace n with fifty. Three times fifty is one hundred and fifty, plus two is one hundred and fifty-two!"),
      cheer("Stall fifty stocks one hundred and fifty-two satay sticks! The customer cheered, and Singa stamped the signboard approved!"),
    ],
  ];

  return scripts[panel] || scripts[0];
}

export function simStationIntro(stationIdx) {
  const intros = [
    [
      instruct("Welcome to Station A — The Signboard Workshop!"),
      instruct("Adjust the multiplier and offset to build your signboard, and watch the row of numbered stalls restock live! Notice how the ghost stacks show the times table."),
    ],
    [
      instruct("Welcome to Station B — Stock the Stalls Challenge!"),
      instruct("Your goal is to stock two target stalls with exact quantities. Tune the signboard multiplier and offset until both target stalls match!"),
    ],
    [
      instruct("Welcome to Station C — Open the Market Construction!"),
      instruct("Fill in the missing values in the position table, find the times-table offset, craft the signboard, and calculate the stock for a far-away stall!"),
    ],
    [
      instruct("Welcome to Station D — The Wrong Signboard Detective!"),
      instruct("A rival vendor made a mistake in their signboard calculations. Tap the faulty line to find the error, and enter the correct signboard!"),
    ],
  ];

  return intros[stationIdx] || intros[0];
}

export function playQuestionNarration(questionText) {
  return [ask(questionText)];
}

export function playCorrectNarration(streak = 1) {
  if (streak >= 5) {
    return [cheer("Incredible streak! You are an unstoppable night market master! 🔥")];
  }
  if (streak >= 3) {
    return [cheer("Awesome! Three in a row! ⭐")];
  }
  return [cheer("Spot on! That formula is correct! 🎉")];
}

export function playWrongNarration() {
  return [
    think("Not quite — check the hint, test both stalls carefully, and try again! 💡"),
  ];
}

export function playHint1Narration() {
  return [encourage("Here is your first hint! Look at the pattern or common difference between stalls.")];
}

export function playHint2Narration() {
  return [encourage("Here is your second hint! Substitute the position number into the formula.")];
}

export function districtCompleteNarration() {
  return [cheer("World Complete! You conquered all the stalls in this district! 🏆")];
}

export function bossStartNarration() {
  return [emphasize("A rival vendor challenges your signboard knowledge! Solve all questions to win! ⚔️")];
}

export function bossWinNarration() {
  return [cheer("Incredible victory! You defeated the boss and claimed your new Market Badge! 🏆")];
}

export function reflectNarration() {
  return [
    say("Welcome to the Reflection Phase!"),
    say("Let's review the key signboard concepts, check your misconceptions, and view your final market scorecard!"),
  ];
}

export function reflectCompleteNarration() {
  return [
    cheer("Congratulations! You have completed the entire NthQuest journey and mastered simple nth-term algebra! 🏮🏆"),
  ];
}
