import fs from "fs";
import { getArgs, getYear, getDay } from "./lib/index.js";

const args = getArgs();
const year = args.year || await getYear();
const day = args.day || await getDay(year);
const part = args.part || 1;
const input = fs.readFileSync(`./${year}/${day}/input.txt`).toString("utf-8").replaceAll("\r", "").split("\n");
const solver = (await import(`../${year}/${day}/${part}.js`))?.default;
const solution = solver(input);
console.log(`Year ${year} Day ${day} Part ${part} solution: ${solution}`);