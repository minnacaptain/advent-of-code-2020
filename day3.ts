const decoder = new TextDecoder("utf-8");
const input = decoder.decode(Deno.readFileSync("./day3_input.ts"));
const treeRowStubs = input.split(`
`);

const getAtIndex = (index: number, mapString: string) =>
  mapString.charAt(index % mapString.length);
const isTree = (char: string) => char === "#";

const countTrees = (stepX: number, stepY: number) =>
  treeRowStubs.reduce(
    (acc: [number, number, number], curr) =>
      stepY > 1 && Boolean(acc[1] % 2)
        ? ([acc[0], acc[1] + 1, acc[2]] as [number, number, number])
        : ([
            acc[0] + stepX,
            acc[1] + 1,
            acc[2] + (isTree(getAtIndex(acc[0], curr)) ? 1 : 0),
          ] as [number, number, number]),
    [0, 0, 0] // [x_index, y_index, treeCount]
  )[2];

console.log("Part 1: ", countTrees(3, 1));
console.log(
  "Part 2: ",
  ([
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ] as [number, number][])
    .map((x) => countTrees(...x))
    .reduce((a, c) => a * c, 1)
);
