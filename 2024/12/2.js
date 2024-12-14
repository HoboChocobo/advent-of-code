const directions = {
    "^": { row: -1, column: 0 },
    ">": { row: 0, column: 1 },
    "v": { row: 1, column: 0 },
    "<": { row: 0, column: -1 }
};

function findRegion(plot, row, col) {
    const visited = new Set();
    const toVisit = [[row, col]];
    while (toVisit.length) {
        const [row, col] = toVisit.pop();
        const id = [row, col].join(":");
        visited.add(id);
        const plant = plot[row][col];
        for (const direction of Object.values(directions)) {
            const newId = [row + direction.row, col + direction.column].join(":");
            if (visited.has(newId)) continue;
            if (plot[row + direction.row]?.[col + direction.column] === plant) {
                toVisit.push([row + direction.row, col + direction.column]);
            }
        }
    }
    return Array.from(visited);
}

function findPerimeter(plot, region) {
    const [row, col] = region[0].split(":");
    const plantType = plot[row][col];
    const perimeterPoints = [];
    for (const plant of region) {
        const [plantRow, plantCol] = plant.split(":").map(Number);
        for (const [arrow, direction] of Object.entries(directions)) {
            if (plot[plantRow + direction.row]?.[plantCol + direction.column] !== plantType) {
                perimeterPoints.push([plantRow, plantCol, arrow]);
            }
        }
    }
    let perimeter = 0;
    const groupedByDirection = new Map();
    for (const [row, col, direction] of perimeterPoints) {
        if (!groupedByDirection.has(direction)) groupedByDirection.set(direction, []);
        groupedByDirection.get(direction).push([row, col]);
    }
    for (const [direction, points] of groupedByDirection.entries()) {
        for (const point of points) {
            if (["^", "v"].includes(direction)) {
                if (!points.find(([row, col]) => row === point[0] && (col === point[1] - 1))) {
                    perimeter++;
                }
            } else {
                if (!points.find(([row, col]) => row === (point[0] - 1) && col === point[1])) {
                    perimeter++;
                }
            }
        }
    }
    return perimeter;
}

export default function(input) {
    const plot = input.map(line => line.split(""));
    let regionId = 0;
    const regionToPlants = new Map();
    const plantToRegion = new Map();
    for (let row = 0; row < plot.length; row++) {
        for (let col = 0; col < plot[row].length; col++) {
            const id = [row, col].join(":");
            if (plantToRegion.has(id)) continue;
            const region = findRegion(plot, row, col);
            regionToPlants.set(regionId, region);
            region.forEach(plant => plantToRegion.set(plant, regionId));
            regionId++;
        }
    }
    let totalPrice = 0;
    for (const region of regionToPlants.values()) {
        const area = region.length;
        const perimeter = findPerimeter(plot, region);
        const price = area * perimeter;
        totalPrice += price;
    }
    return totalPrice;
}