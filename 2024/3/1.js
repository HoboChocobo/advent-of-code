import { sum } from "../lib/index.js";

export default function(input) {
    const instructions = [...input.join(' ').matchAll(/mul\((\d{1,3}),(\d{1,3})\)/g)].map(match => match.slice(1).map(Number));
    return instructions.map(([x, y]) => x * y).reduce(sum);
}