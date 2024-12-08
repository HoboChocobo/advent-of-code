import "dotenv/config.js";
import { getArgs, getYear, getDay, solve } from "./lib/index.js";
const { COOKIE } = process.env;

async function submit(solution, year, day, part) {
    const res = await fetch(`https://adventofcode.com/${year}/day/${day}/answer`, { 
        method: "POST",
        headers: { 
            "Cookie": COOKIE,
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            "level": part,
            "answer": solution
        })
    });
    const html = await res.text();
    const [message] = html.match(/<article>(.*?)<\/article>/)?.slice(1) || [];
    return message?.replace("<p>", "").replace("</p>", "") || "";
}

const args = getArgs();
const year = args.year || await getYear();
const day = args.day || await getDay(year);
const part = args.part || 1;

const solution = await solve(year, day, part);
console.log(`Year ${year} Day ${day} Part ${part} solution: ${solution}`);

if (solution) {
    const submission = await submit(solution, year, day, part);
    console.log(submission);
} else {
    console.log("Invalid solution, won't attempt to submit it");
}