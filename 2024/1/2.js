import { sum } from "../lib/index.js";

export default function(input) {
    const left = [], right = [];
    for (const line of input) {
        const [a, b] = line.split(/\s+/).map(Number);
        left.push(a);
        right.push(b);
    }
    return left.map(value => value * right.filter(x => x === value).length).reduce(sum);
}