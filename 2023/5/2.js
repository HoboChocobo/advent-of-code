function range(from, to) {
    return Array(to - from + 1).fill().map((_, i) => i + from);
}

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

export default function(input) {
    input = sampleInput;
    const seedInput = input[0].replace("seeds: ", "").split(" ").map(x => Number(x.trim()));
    const seedRanges = [];
    while (seedInput.length) {
        seedRanges.push(seedInput.splice(0, 2));
    }
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

    let min = Number.MAX_SAFE_INTEGER;
    maps.get("seed-soil").sort((a, b) => a.sourceRangeStart - b.sourceRangeStart);
    for (const [rangeStart, rangeLength] of seedRanges) {
        const rangeEnd = rangeStart + rangeLength;
        let minSeedsByRange = new Map();
        let ranges = maps.get("seed-soil");
        ranges = ranges.map(({ sourceRangeStart, rangeLength, destinationRangeStart }) => ({ sourceRangeStart, rangeLength, sourceRangeEnd: sourceRangeStart + rangeLength, destinationRangeStart }));
        const inRange = ranges.filter(range => 
            (rangeStart <= range.sourceRangeStart && rangeEnd > range.sourceRangeEnd) ||
            (rangeStart <= range.sourceRangeStart && rangeEnd > range.sourceRangeStart) ||
            (rangeStart > range.sourceRangeStart && rangeStart <= range.sourceRangeEnd)
        );
        console.log("start: " + rangeStart + " end: " + rangeEnd);
        console.log(inRange);

        inRange.
        // for (let i = rangeStart; i < rangeStart + rangeLength; i++) {
        //     //console.log(i);
        //     //const location = getLocation(i);
        //     //if (location < min) min = location;
        // }
    }
    return min;
}