const {readFileSync} = require('fs')

export const readLines = (path) => readFileSync(path)
  .toString()
  .split("\n")
  .map(l => l.replace(/\s*/g, ""))
  .filter(Boolean);
