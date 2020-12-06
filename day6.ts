const rows = new TextDecoder("utf-8")
  .decode(Deno.readFileSync("./day6_input"))
  .split("\n");

type X = [string[], string[][]];
const groups = [...rows, ""].reduce(
  (a: X, c: string) =>
    (c.length === 0 ? [[], [...a[1], a[0]]] : [[...a[0], c], a[1]]) as X,
  [[], []]
)[1];

const do1 = () =>
  groups
    .reduce((a, c) => [...a, c.join("")], [])
    .map((z) => [...new Set(z.split(""))])
    .map((x) => x.join(""))
    .reduce((a, c) => a + c.length, 0);
console.log("Part 1: ", do1());

const do2 = () =>
  groups
    .map((group) =>
      [...new Set(group.join("").split(""))].reduce(
        (a, c) =>
          group.filter((gs) => gs.indexOf(c) > -1).length === group.length
            ? a + 1
            : a,
        0
      )
    )
    .reduce((a, c) => a + c);
console.log("Part 2: ", do2());
