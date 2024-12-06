let sampleInput = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`.replaceAll("\r", "").split("\n");

function min(array) {
    return array.sort((a, b) => a - b)[0];
}

export default function(input) {
    const seeds = input[0].replace("seeds: ", "").split(" ").map(x => Number(x.trim()));
    let from, to;
    const maps = new Map();
    for (const line of input.slice(2)) {
        const match = line.match(/(.*?)-to-(.*?) map/);
        if (match) {
            from = match[1];
            to = match[2];
            maps.set(`${from}-${to}`, []);
        } else {
            const match = line.match(/(\d+) (\d+) (\d+)/);
            if (!match) continue;

            const [destinationRangeStart, sourceRangeStart, rangeLength] = match.slice(1).map(Number);
            maps.get(`${from}-${to}`).push({ sourceRangeStart, rangeLength, destinationRangeStart });
        }
    }

    const allMaps = Object.fromEntries(maps);

    function getLocation(seed) {
        let value = seed;
        let from = "seed";
        let found = false;
        while (!found) {
            const [key, ranges] = Object.entries(allMaps).find(([key]) => key.split("-")[0] == from);
            let to = key.split("-")[1];

            const range = ranges.find(({ sourceRangeStart, rangeLength }) => sourceRangeStart <= value && sourceRangeStart + rangeLength > value);
            if (range) {
                const { destinationRangeStart, sourceRangeStart } = range;
                const diff = destinationRangeStart - sourceRangeStart;
                value = value + diff;
            }

            if (to === "location") found = true;
            else from = to;
        }

        return value;
    }

    const locations = seeds.map(getLocation);
    return min(locations);
}