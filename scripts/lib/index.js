import fs from "fs/promises";

export function getArgs() {
    return process.argv
        .slice(2)
        .map(x => x.split("="))
        .reduce((args, [name, value]) => (args[name] = value) && args, {});
}

export async function getYear() {
    const objects = await fs.readdir(`./`, { withFileTypes: true });
    const years = objects.filter(object => object.isDirectory()).map(directory => Number(directory.name)).filter(Boolean);
    years.sort((a, b) => b - a);
    return years.at(0) || new Date().getFullYear();
}

export async function getDay(year) {
    const objects = await fs.readdir(`./${year}`, { withFileTypes: true });
    const days = objects.filter(object => object.isDirectory()).map(directory => Number(directory.name)).filter(Boolean);
    days.sort((a, b) => b - a);
    return days.at(0);
}

export async function pathExists(path) {
    try {
        await fs.access(path);
        return true;
    } catch {
        return false;
    }
}

export async function createDirectoryIfNotExists(path) {
    if (await pathExists(path)) return;
    await fs.mkdir(path);
    console.log(`Created directory ${path}`);
}

export async function solve(year, day, part) {
    const input = (await fs.readFile(`./${year}/${day}/input.txt`)).toString("utf-8").replaceAll("\r", "").split("\n");
    const solver = (await import(`../../${year}/${day}/${part}.js`))?.default;
    const solution = solver(input);
    return solution;
}