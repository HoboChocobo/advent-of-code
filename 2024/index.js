import fs from "fs";

function getArgs() {
    const args = process.argv.slice(2).map(x => x.split("="));
    let day, part;
    for (const [name, value] of args) {
        if (name === "day") day = value;
        if (name === "part") part = value;
    }
    return { day, part };
}

const { day, part } = getArgs();
const input = fs.readFileSync(`./${day}/input.txt`).toString("utf-8").replaceAll("\r", "").split("\n");
const solver = (await import(`./${day}/${part}.js`))?.default;
if (!solver) {
    throw new Error(`Error importing solver function for Day ${day} Part ${part}.`);
}
const solution = solver(input);
console.log(`Day ${day} Part ${part} solution: ${solution}`);