import { sum } from "../lib/index.js";
import { parseGames } from "./1.js";

export default function(input) {
    const games = parseGames(input);
    const maxes = games.map(game => {
        const max = { blue: 0, red: 0, green: 0 };
        for (const grab of game.grabs) {
            if (grab.blue > max.blue) max.blue = grab.blue;
            if (grab.red > max.red) max.red = grab.red;
            if (grab.green > max.green) max.green = grab.green;
        }
        return max;
    });
    const powers = maxes
        .map(max => Object.values(max))
        .map(powers => powers.reduce((product, current) => product * current, 1));
    return powers.reduce(sum, 0);
}