import "dotenv/config.js";
import fs from "fs/promises";
import { getArgs, getYear, getDay, pathExists, createDirectoryIfNotExists } from "./lib/index.js";
const { COOKIE } = process.env;
const PART_TEMPLATE = `export default function(input) {\n\n}`;

async function getInput(year, day) {
    const res = await fetch(`https://adventofcode.com/${year}/day/${day}/input`, { headers: { "Cookie": COOKIE }});
    const text = await res.text();
    return text.replace(/\n$/, "");
}

async function initializeDay(year, day) {
    const path = `./${year}/${day}`;
    for (const filename of ["input.txt", "1.js", "2.js"]) {
        if (await pathExists(`${path}/${filename}`)) continue;
        const file = filename === "input.txt" ? await getInput(year, day) : PART_TEMPLATE;
        await fs.writeFile(`${path}/${filename}`, file);
        console.log(`Created file ${path}/${filename}`);
    }
}

const args = getArgs();
const year = args.year || await getYear();
await createDirectoryIfNotExists(`./${year}`);
const day = args.day || (await getDay(year) + 1) || new Date().getDate();;
await createDirectoryIfNotExists(`./${year}/${day}`);
await initializeDay(year, day);