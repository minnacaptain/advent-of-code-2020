import { input } from "./day5_input.ts";

const bisect = (charArray: string[], range: [number, number], lower: string) =>
  charArray.reduce((acc, curr) => {
    const diff = acc[1] - acc[0];
    return (curr === lower
      ? [acc[0], acc[0] + diff / 2]
      : [acc[0] + diff / 2, acc[1]]) as [number, number];
  }, range)[0];

const getSeatId = (row: number, col: number) => row * 8 + col;

const getExistingSeatIds = () =>
  input.map((x) => {
    const row = bisect(x.substr(0, 7).split(""), [0, 128], "F");
    const col = bisect(x.substr(7, 3).split(""), [0, 8], "L");
    return getSeatId(row, col);
  });

const do1 = () => {
  const maxSeatId = getExistingSeatIds().reduce((a, c) => (c > a ? c : a));
  console.log("Part 1: ", maxSeatId);
};
do1();

const do2 = () => {
  const existingSeatIds = getExistingSeatIds()
    .map((x) => Number(x))
    .sort();
  const min = existingSeatIds[0];
  const max = existingSeatIds.slice(-1)[0];

  let current = min;
  let allSeatIds = [] as number[];
  while (current <= max) {
    allSeatIds.push(current);
    current += 1;
  }

  const mySeat = allSeatIds
    .map((s) => [!existingSeatIds.includes(s), s])
    .filter((s) => s[0]);
  console.log("Part 2: ", mySeat);
};

do2();
