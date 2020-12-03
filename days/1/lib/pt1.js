const { readFileSync } = require("fs");

const input = readFileSync("./input");

const numbers = input
  .toString()
  .split("\n")
  .map(Number)
  .filter(n => typeof n === "number");

for (let i = 0; i < numbers.length; i++) {
  for (let x = i + 1; x < numbers.length; x++) {
    if (numbers[i] + numbers[x] === 2020) {
      console.log(`Found ${numbers[i]}[${i}] + ${numbers[x]}[${x}]`);
      console.log(`Answer is: ${numbers[i] * numbers[x]}`);
    }
  }
}
