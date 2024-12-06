export default function(input) {
    const instructions = [...input.join(' ').matchAll(/mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g)];
    let skip = false;
    let sum = 0;
    for (const [instruction, ...args] of instructions) {
        if (instruction === "don't()") skip = true;
        else if (instruction === "do()") skip = false;
        else {
            if (skip) continue;
            const [x, y] = args.map(Number);
            sum += x * y;
        }
    }
    return sum;
}