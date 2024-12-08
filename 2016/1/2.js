const directions = {
    "^": { x: 0, y: -1, L: "<", R: ">" },
    ">": { x: 1, y: 0, L: "^", R: "v" },
    "v": { x: 0, y: 1, L: ">", R: "<" },
    "<": { x: -1, y: 0, L: "v", R: "^" }
};

export default function(input) {
    const instructions = input[0].split(", ").map(instruction => instruction.match(/([LR])(\d+)/).slice(1));
    const position = { x: 0, y: 0, facing: "^" };
    const visited = new Set();
    for (const [turn, move] of instructions) {
        position.facing = directions[position.facing][turn];
        const { x, y } = directions[position.facing];
        for (let i = 0; i < Number(move); i++) {
            const id = [position.x + (i * x), position.y + (i * y)].join(",");
            if (visited.has(id)) return Math.abs(position.x + (i * x)) + Math.abs(position.y + (i * y));
            visited.add(id);
        }
        position.x = position.x + (Number(move) * x);
        position.y = position.y + (Number(move) * y);

    }
    return Math.abs(position.x) + Math.abs(position.y);
}