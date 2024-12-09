import { sum } from "../lib/index.js";

export default function([input]) {
    const disk = [];
    for (let i = 0; i < input.length; i++) {
        const digit = Number(input[i]);
        const value = i % 2 ? null : i / 2;
        for (let j = 0; j < digit; j++) {
            disk.push(value);
        }
    }
    while (true) {
        const firstEmpty = disk.findIndex(x => x === null);
        const lastNumber = disk.findLastIndex(x => x !== null);
        if (firstEmpty > lastNumber) break;
        [disk[firstEmpty], disk[lastNumber]] = [disk[lastNumber], disk[firstEmpty]];
    }
    return disk.map((id, i) => Number(id) * i || 0).reduce(sum);
}