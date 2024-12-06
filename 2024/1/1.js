import { ascending, sum } from "../lib/index.js";

export default function(input) {
    const left = [], right = [];
    for (const line of input) {
        const [a, b] = line.split(/\s+/).map(Number);
        left.push(a);
        right.push(b);
    }
    left.sort(ascending);
    right.sort(ascending);
    return left.map((value, i) => Math.abs(value - right[i])).reduce(sum);
}