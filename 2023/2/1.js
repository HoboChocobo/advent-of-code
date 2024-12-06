import { sum } from "../lib/index.js";

const bag = {
    red: 12,
    green: 13,
    blue: 14
};

function getColors(grab) {
    const colors = {};
    for (const pull of grab) {
        const [cubes, color] = pull.match(/(\d+) (.+)/).slice(1);
        colors[color] = Number(cubes);
    }
    return colors;
}

export function parseGames(input) {
    return input.map(game => {
        const [id, results] = game.match(/Game (\d+): (.*)/).slice(1);
        const grabs = results.split("; ").map(x => x.split(", "));
        return { id: Number(id), grabs: grabs.map(getColors) };
    });
}

export default function(input) {
    const games = parseGames(input);
    const possibleGames = games.filter(game => {
        for (const grab of game.grabs) {
            for (const [color, max] of Object.entries(bag)) {
                if (grab[color] > max) return false;
            }
        }
        return true;
    });
    return possibleGames.map(game => game.id).reduce(sum, 0);
}