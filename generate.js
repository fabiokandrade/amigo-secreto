// eslint-disable-next-line @typescript-eslint/no-require-imports
const fs = require("fs");

// type Person = {
//   name: string;
//   pin: string;
//   assignedTo: string;
// };

function generateList(names) {
  // Generate a random 4-digit pin
  const generatePin = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
  };

  // Shuffle the list of names
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Create unique pairings without self-referencing or cycles
  const shuffledNames = shuffleArray([...names]);
  const pairings = shuffledNames.map((name, index) => ({
    name,
    friend: shuffledNames[(index + 1) % shuffledNames.length], // Circular pairing to avoid cycles
  }));

  // Generate the list
  const result = pairings.map(({ name, friend }) => ({
    name,
    pin: generatePin(),
    assignedTo: friend,
  }));

  return result;
}

// Example usage
const names = [
  "Caetano",
  "Fabio",
  "Ana",
  "Arthur",
  "Roberta",
  "Serena",
  "Moreno",
  "Tito",
  "Marcia",
  "Francildo",
  "Mariana",
  "Bruno",
  "Camila",
  "Marcela",
];

const list = generateList(names);

// Write the list to a file
fs.writeFileSync(
  "./src/data/list.ts",
  `export const list = ${JSON.stringify(list)};`
);
