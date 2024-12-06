function isXmas(input, x, y) {
    const one = [input[x-1]?.[y-1], input[x+1]?.[y+1]].filter(Boolean).join("");
    const two = [input[x-1]?.[y+1], input[x+1]?.[y-1]].filter(Boolean).join("");
    return (["MS", "SM"].includes(one) && ["MS", "SM"].includes(two));
}

export default function(input) {
    let count = 0;
    for (let x = 0; x < input.length; x++) {
        const row = input[x];
        for (let y = 0; y < row.length; y++) {
            const char = row[y];
            if (char === "A" && isXmas(input, x, y)) count++;
        }
    }
    return count;
}