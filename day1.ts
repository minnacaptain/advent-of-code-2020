import { input } from "./day1_input.ts";

export const day1_part1 = () =>
  input
    .map(
      (a) => [a, input.map((b) => a + b).includes(2020)] as [number, boolean]
    )
    .filter((x) => x[1])
    .reduce((a, c) => a * c[0], 1);

console.log("Part 1: " + day1_part1());

export const day1_part2 = () =>
  (input.map((a) => [a, input.map((b) => a + b)]) as [number, number[]][])
    .map(
      (ab) =>
        [
          ab[0],
          ab[1].map((ab1) => input.map((c) => c + ab1).includes(2020)),
        ] as [number, boolean[]]
    )
    .map((x) => [x[0], x[1].reduce((a, c) => a || c)] as [number, boolean])
    .filter((x) => x[1])
    .reduce((a, c) => a * c[0], 1);

console.log("Part 2: " + day1_part2());
