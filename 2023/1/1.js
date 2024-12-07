import { firstAndLast, sum } from "../lib/index.js";

function numbersOnly(line) {
    return line.replace(/[^\d]/g, "").split("");
}

export default function(input) {
    return input
        .map(numbersOnly)
        .map(firstAndLast)
        .map(x => x.join(""))
        .map(Number)
        .reduce(sum, 0);
}