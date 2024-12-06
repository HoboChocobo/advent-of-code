const directions = {
    "^": { column: 0, row: -1, next: ">" },
    "v": { column: 0, row: 1, next: "<" },
    "<": { column: -1, row: 0, next: "^" },
    ">": { column: 1, row: 0, next: "v" }
};

function findGuard(positions) {
    for (let row = 0; row < positions.length; row++) {
        for (let column = 0; column < positions[row].length; column++) {
            if (["^", "v", "<", ">"].includes(positions[row][column])) {
                return [row, column, positions[row][column]];
            }
        }
    }
}

function turn(positions, guardRow, guardColumn, direction) {
    positions[guardRow][guardColumn] = directions[direction].next;
}

function move(positions, guardRow, guardColumn, direction) {
    const { column, row } = directions[direction];
    positions[guardRow][guardColumn] = ".";
    positions[guardRow+row][guardColumn+column] = direction;
}

export default function(input) {
    const positions = input.map(line => line.split(""));
    const visited = new Set();
    while (true) {
        const [guardRow, guardColumn, direction] = findGuard(positions);
        visited.add([guardRow, guardColumn].join("-"));
        const { column, row } = directions[direction];
        const nextPosition = positions[guardRow+row]?.[guardColumn+column];
        if (!nextPosition) break;
        if (nextPosition === "#") turn(positions, guardRow, guardColumn, direction);
        if (nextPosition === ".") move(positions, guardRow, guardColumn, direction);
    }
    return visited.size;
}