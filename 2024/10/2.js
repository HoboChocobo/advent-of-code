import { sum } from "../lib/index.js";

const directions = {
    "^": { row: -1, column: 0 },
    ">": { row: 0, column: 1 },
    "v": { row: 1, column: 0 },
    "<": { row: 0, column: -1 }
};

function findTrails(row, column, map, previousHeight, startingRow, startingColumn, trailheads, path) {
    const height = map[row]?.[column];
    path.push([row, column].join("-"));
    if (height !== previousHeight + 1) return null;
    if (height === 9) {
        const id = [startingRow, startingColumn].join(":");
        if (!trailheads[id]) trailheads[id] = new Set();
        trailheads[id].add(path.join(":"));
    } else {
        for (const direction of Object.values(directions)) {
            findTrails(row + direction.row, column + direction.column, map, height, startingRow, startingColumn, trailheads, path);
        }
    }
}

export default function(input) {
    const trailheads = {};
    const map = input.map(line => line.split("").map(Number));
    for (let row = 0; row < map.length; row++) {
        for (let column = 0; column < map[row].length; column++) {
            const height = map[row][column];
            if (height !== 0) continue;
            for (const direction of Object.values(directions)) {
                findTrails(row + direction.row, column + direction.column, map, height, row, column, trailheads, []);
            }
        }
    }
    return Object.values(trailheads).map(paths => paths.size).reduce(sum);
}