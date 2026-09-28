// scripts/generate_audio.js
// Offline pre-generation script for ElevenLabs narration audio files in NthQuest.
// Strictly follows audio_generation_pipeline (5).md and PRD §11 specifications.

import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf-8');
      for (const line of content.split('\n')) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...rest] = trimmed.split('=');
          const val = rest.join('=').replace(/^["']|["']$/g, '').trim();
          if (!process.env[key.trim()]) {
            process.env[key.trim()] = val;
          }
        }
      }
    }
  }
}

loadEnv();

const apiKey = process.env.VITE_ELEVENLABS_API_KEY || process.env.ELEVENLABS_API_KEY;

const VOICE_ID = 'Xb7hH8MSUJpSbSDYk0k2'; // Alice — Clear, Engaging Educator
const VOICE_MODEL = 'eleven_multilingual_v2';

const VOICE_SETTINGS = {
  statement:     { stability: 0.65, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true },
  instruction:   { stability: 0.65, similarity_boost: 0.80, style: 0.30, use_speaker_boost: true },
  question:      { stability: 0.55, similarity_boost: 0.75, style: 0.50, use_speaker_boost: true },
  encouragement: { stability: 0.50, similarity_boost: 0.85, style: 0.60, use_speaker_boost: true },
  emphasis:      { stability: 0.75, similarity_boost: 0.90, style: 0.20, use_speaker_boost: true },
  thinking:      { stability: 0.70, similarity_boost: 0.78, style: 0.40, use_speaker_boost: true },
  celebration:   { stability: 0.45, similarity_boost: 0.85, style: 0.80, use_speaker_boost: true },
};

const phrases = [
  // ─── INTRO ────────────────────────────────────────────────────────────────
  { text: "Welcome to NthQuest! Let's explore the Singapore Night Market!", style: 'celebration' },

  // ─── WONDER PHASE ────────────────────────────────────────────────────────
  { text: "A customer asks how many satay sticks are at stall fifty. The first stalls stock five, eight, eleven…", style: 'statement' },
  { text: "Walking down fifty stalls would take all night! Can you work it out from here?", style: 'question' },
  { text: "Let's investigate how signboards and position numbers tell us what's at any stall!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 1 ────────────────────────────────────────────────
  { text: "Jun Kai and Meera were helping at the bustling Singapore night market when a hungry customer walked up.", style: 'statement' },
  { text: "Excuse me! How many satay sticks are stocked at stall number fifty? the customer asked.", style: 'question' },
  { text: "Stall one has five sticks, stall two has eight sticks, and stall three has eleven sticks, Meera noticed. It keeps growing by three!", style: 'statement' },
  { text: "Jun Kai sighed. Stall fifty is all the way down the street. Walking down fifty stalls would take all night!", style: 'statement' },
  { text: "There must be a mathematical shortcut to calculate stall fifty right now, Meera smiled.", style: 'celebration' },

  // ─── STORY PHASE: PANEL 2 ────────────────────────────────────────────────
  { text: "Singa the Lion Cub trotted over with a glowing signboard showing three times n, plus two.", style: 'statement' },
  { text: "Look at the letter n, Singa purred. The letter n is the position number! Here, n means the stall number!", style: 'statement' },
  { text: "Jun Kai squinted at the board. So three times n plus two means start at three and add two?", style: 'question' },
  { text: "Not quite, laughed Meera! To read the signboard, replace n with the stall number and calculate in order.", style: 'statement' },
  { text: "For stall one, replace n with one: three times one is three, plus two is five! That matches stall one exactly!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 3 ────────────────────────────────────────────────
  { text: "How do we build our own signboard from scratch? asked Jun Kai.", style: 'question' },
  { text: "Meera wrote down the stock numbers: four, seven, ten, thirteen. Notice they go up by three each time!", style: 'statement' },
  { text: "That means it is connected to the three times table: three, six, nine, twelve!", style: 'statement' },
  { text: "Meera overlaid the stock numbers on the three times table. Four is three plus one. Seven is six plus one. Every stall is the three times table shifted up by one!", style: 'statement' },
  { text: "Singa cheered: Always check more than one stall! At stall one, three times one plus one is four. At stall two, three times two plus one is seven! Both check out!", style: 'celebration' },

  // ─── STORY PHASE: PANEL 4 ────────────────────────────────────────────────
  { text: "Now we can easily answer the customer's question for stall fifty without walking down the street!", style: 'statement' },
  { text: "Our rule adds three each time, so start with three times n. At stall one, three times one is three, but we need five satay sticks. So add two: three times n, plus two!", style: 'statement' },
  { text: "Let's check stall two: three times two is six, plus two is eight. It matches!", style: 'statement' },
  { text: "Now substitute stall fifty: replace n with fifty. Three times fifty is one hundred and fifty, plus two is one hundred and fifty-two!", style: 'statement' },
  { text: "Stall fifty stocks one hundred and fifty-two satay sticks! The customer cheered, and Singa stamped the signboard approved!", style: 'celebration' },

  // ─── SIMULATE STATION INTROS ─────────────────────────────────────────────
  { text: "Welcome to Station A — The Signboard Workshop!", style: 'instruction' },
  { text: "Adjust the multiplier and offset to build your signboard, and watch the row of numbered stalls restock live! Notice how the ghost stacks show the times table.", style: 'instruction' },
  { text: "Welcome to Station B — Stock the Stalls Challenge!", style: 'instruction' },
  { text: "Your goal is to stock two target stalls with exact quantities. Tune the signboard multiplier and offset until both target stalls match!", style: 'instruction' },
  { text: "Welcome to Station C — Open the Market Construction!", style: 'instruction' },
  { text: "Fill in the missing values in the position table, find the times-table offset, craft the signboard, and calculate the stock for a far-away stall!", style: 'instruction' },
  { text: "Welcome to Station D — The Wrong Signboard Detective!", style: 'instruction' },
  { text: "A rival vendor made a mistake in their signboard calculations. Tap the faulty line to find the error, and enter the correct signboard!", style: 'instruction' },

  // ─── FEEDBACK & HINTS ────────────────────────────────────────────────────
  { text: "Spot on! That formula is correct! 🎉", style: 'celebration' },
  { text: "Awesome! Three in a row! ⭐", style: 'celebration' },
  { text: "Incredible streak! You are an unstoppable night market master! 🔥", style: 'celebration' },
  { text: "Not quite — check the hint, test both stalls carefully, and try again! 💡", style: 'thinking' },
  { text: "Here is your first hint! Look at the pattern or common difference between stalls.", style: 'encouragement' },
  { text: "Here is your second hint! Substitute the position number into the formula.", style: 'encouragement' },

  // ─── GAMIFICATION & BOSS NARRATIONS ──────────────────────────────────────
  { text: "World Complete! You conquered all the stalls in this district! 🏆", style: 'celebration' },
  { text: "A rival vendor challenges your signboard knowledge! Solve all questions to win! ⚔️", style: 'emphasis' },
  { text: "Incredible victory! You defeated the boss and claimed your new Market Badge! 🏆", style: 'celebration' },

  // ─── REFLECT PHASE ───────────────────────────────────────────────────────
  { text: "Welcome to the Reflection Phase!", style: 'statement' },
  { text: "Let's review the key signboard concepts, check your misconceptions, and view your final market scorecard!", style: 'statement' },
  { text: "Congratulations! You have completed the entire NthQuest journey and mastered simple nth-term algebra! 🏮🏆", style: 'celebration' },
];

function cleanString(str) {
  return str
    .toLowerCase()
    .replace(/[^\w\s]/gi, '')
    .trim()
    .replace(/\s+/g, '_')
    .substring(0, 48);
}

async function main() {
  const outputDir = path.resolve('public/assets/audio');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const mapping = {};

  for (let i = 0; i < phrases.length; i++) {
    const { text, style } = phrases[i];
    const cleanText = cleanString(text);
    const fileName = `audio_${cleanText}_${i}.mp3`;
    const destPath = path.join(outputDir, fileName);

    const relativeWebPath = `/assets/audio/${fileName}`;
    mapping[text] = relativeWebPath;

    if (fs.existsSync(destPath)) {
      continue;
    }

    if (!apiKey) {
      continue;
    }

    console.log(`[${i + 1}/${phrases.length}] 🔊 Generating: "${text.substring(0, 40)}..." -> ${fileName}`);

    const settings = VOICE_SETTINGS[style] || VOICE_SETTINGS.statement;

    try {
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`, {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          model_id: VOICE_MODEL,
          voice_settings: settings,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`HTTP ${response.status}: ${errBody}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(destPath, buffer);
      console.log(`   ✅ Saved: ${destPath}`);
    } catch (e) {
      console.error(`   ❌ Failed to generate phrase "${text}":`, e.message);
    }
  }

  // Write mapping to src/utils/audioMap.js
  const mapContent = `// Auto-generated by generate_audio.js\n// Static asset mapping for offline generated narration phrases in NthQuest\n\nexport const audioMap = ${JSON.stringify(mapping, null, 2)};\n\nexport default audioMap;\n`;
  fs.writeFileSync('./src/utils/audioMap.js', mapContent);
  console.log("\n✨ Audio mapping updated in src/utils/audioMap.js!");
}

main().catch(console.error);
