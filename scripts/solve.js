import { getArgs, getYear, getDay, solve } from "./lib/index.js";

const args = getArgs();
const year = args.year || await getYear();
const day = args.day || await getDay(year);
const part = args.part || 1;

const solution = await solve(year, day, part);
console.log(`Year ${year} Day ${day} Part ${part} solution: ${solution}`);