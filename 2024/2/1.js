import { ascending, descending } from "../lib/index.js";

export default function(input) {
    const reports = input.map(line => line.split(/\s+/).map(Number));
    const safe = reports.filter(levels => {
        const direction = levels[0] - levels[1];
        const sorted = [...levels].sort(direction < 0 ? ascending : descending);
        if (sorted.join(",") !== levels.join(",")) return false;
        for (let i = 0; i < levels.length - 1; i++) {
            const diff = Math.abs(levels[i] - Math.abs(levels[i + 1]));
            if (diff > 3 || diff === 0) return false;
        }
        return true;
    });
    return safe.length;
}