const decoder = new TextDecoder("utf-8");
const input = decoder.decode(Deno.readFileSync("./day4_input"));
const rows = input.split(`
`);
let passports = [] as string[];
let current = "" as string;
rows.forEach((row) => {
  if (row !== "") {
    current = current + " " + row;
  } else {
    passports = [...passports, current];
    current = "";
  }
});
passports = [...passports, current];

const isBetween = (min: number, max: number) => (x: string) =>
  Number(x) >= min && Number(x) <= max;

const isValidHairColor = (x: string) =>
  Boolean(x.match(/^#{1}[a-f0-9]{6}$/)?.length);

const isValidEyeColor = (x: string) =>
  ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(x);

const isValidPassportId = (x: string) => Boolean(x.match(/^[0-9]{9}$/)?.length);

const isValidHeight = (x: string) =>
  (x.endsWith("cm") && isBetween(150, 193)(x.replace("cm", ""))) ||
  (x.endsWith("in") && isBetween(59, 76)(x.replace("in", "")));

const validationRules = {
  byr: isBetween(1920, 2002),
  iyr: isBetween(2010, 2020),
  eyr: isBetween(2020, 2030),
  hgt: isValidHeight,
  hcl: isValidHairColor,
  ecl: isValidEyeColor,
  pid: isValidPassportId,
};

// Part 1
const requiredFields = Object.keys(validationRules);
const passportsWithAllRequiredFields = passports.filter(
  (p) =>
    p
      .split(" ")
      .filter((x) => x != "")
      .filter((p) => requiredFields.includes(p.substr(0, 3))).length ===
    requiredFields.length
);
console.log("Part 1: ", passportsWithAllRequiredFields.length);

// Part 2
const passportsPassingAllValidation = passportsWithAllRequiredFields.filter(
  (p) =>
    p
      .split(" ")
      .filter((x) => x != "")
      .map((x) => x.split(":"))
      .map(
        (x) =>
          x[0] === "cid" ||
          Boolean(
            (validationRules as any)[x[0]] &&
              (validationRules as any)[x[0]](x[1])
          )
      )
      .reduce((a, c) => a && c)
);
console.log("Part 2: ", passportsPassingAllValidation.length);
