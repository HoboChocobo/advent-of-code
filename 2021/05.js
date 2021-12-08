import { 
	abs,
	delta,
	diff,
	filter,
	filters,
	flat,
	gte,
	increment,
	length,
	log,
	map,
	or,
	pipe,
	range,
	reduce,
	split
} from "blowdash";
import { readFile } from "../library.js";

const getPointsOnLine = ([[x1, y1], [x2, y2]]) => {
	const dx = delta(x1, x2);
	const dy = delta(y1, y2);

	return pipe(
		range,
		map(i => ({ x: x1 + (i * dx), y: y1 + (i * dy) })),
		flat
	)(pipe(
		or(diff(y1, y2)),
		abs,
		increment
	)(diff(x1, x2)));
};

pipe(
	readFile,
	split("\n"),
	filters.existence,
	map(
		split(" -> "),
		map(
			split(","),
			map(Number)
		),
		getPointsOnLine
	),
	flat,
	reduce((pointMap, { x, y }) => pointMap.set(`${x},${y}`, (pointMap.get(`${x},${y}`) || 0) + 1))(new Map()),
	pointMap => Array.from(pointMap.values()),
	filter(gte(2)),
	length,
	log("Number of dangerous areas")
)({ path: import.meta.url, filename: "input.txt" });