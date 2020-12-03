const { readFileSync } = require("fs");

const extractPolicy = policy => {
  const matches = policy.match(/([0-9]+)\-([0-9]+)\s([a-z]+)/);

  if (!matches.length > 4) {
    console.log(`Failed to extract policy from ${policy}, got ${matches}`);
  }

  const lower = Number(matches[1]);
  const upper = Number(matches[2]);
  const letter = matches[3];

  return { lower, upper, letter };
};

const isCompliantPt1 = ({ password, policy }) => {
  const letterAmount = [...password].filter(l => l == policy.letter).length;

  return letterAmount >= policy.lower && letterAmount <= policy.upper;
};

const isCompliantPt2 = ({ password, policy }) => {

	const valid = (
    (password[policy.lower - 1] === policy.letter) !=
    (password[policy.upper - 1] === policy.letter)
  );

	console.log({password, policy, valid})
	return valid
};

const passwordEntries = readFileSync("./input")
  .toString()
  .split("\n")
  .filter(Boolean)
  .map(line => {
    const [policyInput, password] = line.split(/:\s/);

    const policy = extractPolicy(policyInput);
    if (!policy) {
      return;
    }

    return {
      policy,
      password
    };
  });

const compliancyCheck =
  process.argv[2] === "pt2" ? isCompliantPt2 : isCompliantPt1;

const validPasswords = passwordEntries.filter(compliancyCheck);

console.log(
  `Found ${
    validPasswords.length
  } valid passwords, meaning ${passwordEntries.length -
    validPasswords.length} weren't valid`
);
