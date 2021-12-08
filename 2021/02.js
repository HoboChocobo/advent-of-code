import { filters, log, map, pipe, reduce, split } from "blowdash";
import { readFile } from "../library.js";

const commands = pipe(
	readFile,
	split("\n"),
	filters.existence,
	map(split(" "))
)({ path: import.meta.url, filename: "input.txt" });

const directions = {
    forward: { x: 1, y: 1 },
    up: { aim: -1 },
    down: { aim: 1 }
};

const updatePositionAndAim = (position, [direction, unit]) => {
	position.x += (directions[direction].x || 0) * unit;
	position.y += (directions[direction].y || 0) * unit * (position.aim || 0);
	position.aim += (directions[direction].aim || 0) * unit;
	return position;
};

pipe(
	reduce(updatePositionAndAim)({ x: 0, y: 0, aim: 0 }),
	({ x, y }) => log("Horizontal position x depth")(x * y)
)(commands);