const { readFileSync } = require("fs");

const lines = readFileSync("./input")
  .toString()
  .split("\n")
  .map(l => l.replace(/\s*/g, ""))
  .filter(Boolean);

const isTree = (x, y) => {
  if (y >= lines.length) {
    return false;
  }
  const line = lines[y];

  const idx = x % line.length;

  console.debug({ x, y, idx });

  return line[idx] === "#";
};

const checkSlope = slope => {
  const coordinates = Array.from(
    { length: Math.floor(lines.length / slope.y) },
    (_, i) => ({
      y: (i + 1) * slope.y,
      x: (i + 1) * slope.x
    })
  );

  const count = coordinates.reduce(
    (treesEncountered, { x, y }) => treesEncountered + Number(isTree(x, y)),
    0
  );

  console.log(`Found ${count} for slope ${slope.x} / ${slope.y}`);

  return count;
};

const isPt2 = process.argv[2] === "pt2";

if (isPt2) {
  const totals = [
    {
      x: 1,
      y: 1
    },
    {
      x: 3,
      y: 1
    },
    {
      x: 5,
      y: 1
    },
    {
      x: 7,
      y: 1
    },
    {
      x: 1,
      y: 2
    }
  ].map(checkSlope);
  let total = totals[0];
  for (let i = 1; i < totals.length; i++) {
    total *= totals[i];
  }
  console.log(`Total: ${total}`);
} else {
  checkSlope({ x: 3, y: 1 });
}
