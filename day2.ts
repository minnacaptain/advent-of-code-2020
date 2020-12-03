const decoder = new TextDecoder("utf-8");
const input = decoder.decode(Deno.readFileSync("./day2_input"));
const rows = input.split(`
`);
type P = { min: number; max: number; policy: string; password: string };
const passwordsAndPolicies: P[] = rows.map((x) => {
  let z = x.split("-");
  const min = Number(z[0]);
  z = z[1].split(" ");
  return {
    min,
    max: Number(z[0]),
    policy: z[1].replace(":", ""),
    password: z[2],
  };
});

const calculatePart1 = () =>
  passwordsAndPolicies.reduce((a: number, c: P) => {
    const match = c.password.match(new RegExp(c.policy, "g"));
    const isValid =
      (match?.length || 0) >= c.min && (match?.length || 0) <= c.max;
    return a + (isValid ? 1 : 0);
  }, 0);

console.log("Part 1: ", calculatePart1());

const calculatePart2 = () =>
  passwordsAndPolicies.reduce(
    (a: number, c: P) =>
      a +
      (Number(c.password[c.min - 1] === c.policy) +
        Number(c.password[c.max - 1] === c.policy) ===
      1
        ? 1
        : 0),
    0
  );

console.log("Part 2: ", calculatePart2());
