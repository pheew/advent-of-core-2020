#!/usr/bin/env node

const fs = require("fs");
const childProcess = require("child_process");
const path = require("path");

const day = Number(process.argv[2]);

const fail = (message, code = -1) => {
  console.error(message);
  process.exit(code);
};

if (typeof day !== "number" || isNaN(day)) {
  fail(`Make sure you pass a day number, got ${process.argv[2]} instead`);
  // todo: possibly just increment day by 1
}

if (fs.existsSync(path.resolve(__dirname, "../days", String(day)))) {
  fail(`Day ${day} already exists, exiting`);
}

const source = path.resolve(__dirname, "../new-day");
const destination = path.resolve(__dirname, `../days/${day}`);
const cp = childProcess.spawn("cp", ["-r", source, destination]);

cp.stderr.pipe(process.stderr);
cp.stdout.pipe(process.stdout);

cp.on("close", code => {
  if (code != 0) {
    process.exit(code);
  }

  const packageJsonLocation = path.resolve(destination, "package.json");
  const packageJson = JSON.parse(fs.readFileSync(packageJsonLocation));
  fs.writeFileSync(
    packageJsonLocation,
    JSON.stringify(
      {
        ...packageJson,
        name: `day-${day}`
      },
      null,
      2
    )
  );

  console.log(`Welcome to day ${day}`);
});
