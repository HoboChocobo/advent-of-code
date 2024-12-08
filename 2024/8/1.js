function findAntennae(locations) {
    const antennae = new Map();
    for (let i = 0; i < locations.length; i++) {
        for (let j = 0; j < locations[i].length; j++) {
            const frequency = locations[i][j];
            if (frequency === ".") continue;
            if (!antennae.has(frequency)) antennae.set(frequency, []);
            antennae.get(frequency).push([i, j]);
        }
    }
    return antennae;
}

function findAntinodes(antennae) {
    const antinodes = [];
    for (let i = 0; i < antennae.length; i++) {
        for (let j = 0; j < antennae.length; j++) {
            if (i === j) continue;
            const antennaOne = antennae[i];
            const antennaTwo = antennae[j];
            const dx = antennaOne[0] - antennaTwo[0];
            const dy = antennaOne[1] - antennaTwo[1];
            antinodes.push(
                ...[
                    [antennaOne[0] + dx, antennaOne[1] + dy], 
                    [antennaOne[0] - dx, antennaOne[1] - dy],
                    [antennaTwo[0] + dx, antennaTwo[1] + dy], 
                    [antennaTwo[0] - dx, antennaTwo[1] - dy]
                ].filter(([x, y]) => ![[antennaOne[0], antennaOne[1]], [antennaTwo[0], antennaTwo[1]]].map(point => point.join("-")).includes([x, y].join("-")))
            );
        }
    }
    return antinodes;
}

export default function(input) {
    const locations = input.map(line => line.split(""));
    const locationsWithAntinodes = new Set();
    const antennaeMap = findAntennae(locations);
    for (const antennae of antennaeMap.values()) {
        const antinodes = findAntinodes(antennae);
        for (const [x, y] of antinodes) {
            locationsWithAntinodes.add([x, y].join(":"));
        }
    }
    const validAntinodes = Array.from(locationsWithAntinodes)
        .map(point => point.split(":").map(Number))
        .filter(([x, y]) => x >= 0 && y >= 0 && x < locations.length && y < locations[0].length);

    return validAntinodes.length;
}