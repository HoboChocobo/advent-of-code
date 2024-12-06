import { sum, product } from "../lib/index.js";

export default function(input) {
    const schematic = input.map(x => x.split(""));
    const partNumbers = [];
    const usedGears = new Map();

    for (let row = 0; row < schematic.length; row++) {
        let numberStart = null, numberEnd = null;

        for (let column = 0; column < schematic[0].length; column++) {
            const value = schematic[row][column];
            if (!isNaN(Number(value))) {
                if (numberStart == null) {
                    numberStart = column;
                }
            } else {
                if (numberStart != null) {
                    numberEnd = column - 1;
                }
            }

            if (numberStart != null && column === schematic[0].length - 1) {
                numberEnd = column;
            }

            if (numberStart != null && numberEnd != null) {
                let number = Number(schematic[row].slice(numberStart, numberEnd + 1).join(""));
                let isPartNumber = false;
                for (let siftRow = row - 1; siftRow <= row + 1; siftRow++) {
                    for (let siftColumn = numberStart - 1; siftColumn <= numberEnd + 1; siftColumn++) {
                        const siftValue = schematic[siftRow]?.[siftColumn];
                        if (siftValue === "*") {
                            isPartNumber = true;
                            const gear = [siftColumn, siftRow].join("-");
                            if (!usedGears.has(gear)) usedGears.set(gear, []);
                            usedGears.get(gear).push(number);
                        }
                    }
                } 
                if (isPartNumber) {
                    partNumbers.push(number);
                }

                numberStart = null, numberEnd = null;
            } 
        }
    }

    return Array.from(usedGears.values())
        .map(parts => parts.length == 2 && parts.reduce(product, 1))
        .filter(Boolean)
        .reduce(sum, 0);
}