import { sum } from "../lib/index.js";

export default function([input]) {
    const arrangement = input.split(" ").map(Number);
    let stones = arrangement.reduce((stones, engraving) => (stones[engraving] = 1) && stones, {});
    for (let blink = 0; blink < 75; blink++) {
        const temp = {};
        for (const [engraving, count] of Object.entries(stones)) {
            if (engraving == 0) {
                temp[1] = (temp[1] || 0) + count;
            } else if ((engraving.length % 2) === 0) {
                const [left, right] = [engraving.slice(0, engraving.length / 2), engraving.slice(engraving.length / 2, engraving.length)].map(Number);
                temp[left] = (temp[left] || 0) + count;
                temp[right] = (temp[right] || 0) + count;
            } else {
                const newEngraving = Number(engraving) * 2024;
                temp[newEngraving] = (temp[newEngraving] || 0) + count;
            }
        }
        stones = temp;
    }
    return Object.values(stones).reduce(sum);
}