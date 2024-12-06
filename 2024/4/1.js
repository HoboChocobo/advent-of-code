function isXmas(input, x, y, a, b) {
    const word = [input[x]?.[y], input[x+a]?.[y+b], input[x+a*2]?.[y+b*2], input[x+a*3]?.[y+b*3]].filter(Boolean).join("");
    return word === "XMAS";
}

export default function(input) {
    let count = 0;
    for (let x = 0; x < input.length; x++) {
        const row = input[x];
        for (let y = 0; y < row.length; y++) {
            const char = row[y];
            if (char !== "X") continue;
            for (let a = -1; a <= 1; a++) {
                for (let b = -1; b <= 1; b++) {
                    if (a === 0 && b === 0) continue;
                    if (isXmas(input, x, y, a, b)) count++;
                }
            }
        }
    }
    return count;
}