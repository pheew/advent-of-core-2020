const { readFileSync } = require("fs");

const input = readFileSync("./input");

const numbers = input
  .toString()
  .split("\n")
  .filter(Boolean)
  .map(Number)
  .filter(n => typeof n === "number");

for (let x = 0; x < numbers.length; x++) {
  const num1 = numbers[x];
  for (let y = x + 1; y < numbers.length; y++) {
    const num2 = numbers[y];
    for (let z = y + 1; z < numbers.length; z++) {
      const num3 = numbers[z];
      if (num1 + num2 + num3 === 2020) {
        console.log(`Found ${num1}[${x}] + ${num2}[${y}] + ${num3}[${z}]`);
        console.log(`Answer is: ${num1 * num2 * num3}`);

        return;
      }
    }
  }
}
