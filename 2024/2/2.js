import { ascending, descending } from "../lib/index.js";

function isSafe(levels, removeIndex) {
    levels = [...levels];
    if (removeIndex != null) levels.splice(removeIndex, 1);
    const direction = levels[0] - levels[1];
    const sorted = [...levels].sort(direction < 0 ? ascending : descending);
    if (sorted.join(',') !== levels.join(',')) return false;
    for (let i = 0; i < levels.length - 1; i++) {
        const diff = Math.abs(levels[i] - Math.abs(levels[i + 1]));
        if (diff > 3 || diff === 0) return false;
    }
    return true;
}

export default function(input) {
    const reports = input.map(line => line.split(/\s+/).map(Number));
    const safe = reports.filter(levels => {
        if (isSafe(levels, null)) return true;
        for (let i = 0; i < levels.length; i++) {
            if (isSafe(levels, i)) return true;
        }
        return false;
    });
    return safe.length;
}