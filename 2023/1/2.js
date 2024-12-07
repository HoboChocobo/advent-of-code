import { firstAndLast, sum } from "../lib/index.js";

const numberStrings = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
function numbersOnly(line) {
    const numbers = [];
    for (let i = 0; i < line.length; i++) {
        if (!isNaN(Number(line[i]))) numbers.push(line[i]);
        else {
            for (let j = 0; j < numberStrings.length; j++) {
                const numberString = numberStrings[j];
                const word = line.slice(i, i + numberString.length);
                if (word === numberString) {
                    numbers.push(String(j + 1));
                }
            }
        }
    }
    return numbers;
}

export default function(input) {
    return input
        .map(numbersOnly)
        .map(firstAndLast)
        .map(x => x.join(""))
        .map(Number)
        .reduce(sum, 0);
}