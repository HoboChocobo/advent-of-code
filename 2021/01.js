import { filters, map, pipe, split, sum, range, log } from "blowdash";
import { readFile } from "../library.js";

const measurements = pipe(
	readFile,
	split("\n"),
	filters.existence,
	map(Number)
)({ path: import.meta.url, filename: "input.txt" });

const select = ({ array, start, count }) => array.slice(start, start + count);

const windowMeasurements = ({ measurements, start, windowSize }) => pipe(
	select,
	sum
)({ array: measurements, start, count: windowSize });

const increases = (measurements, windowSize) => (start) =>
	windowMeasurements({ measurements, start, windowSize }) < windowMeasurements({ measurements, start: start + 1, windowSize });

const increasesForWindowSize = (windowSize) => pipe(
	range,
	map(
		increases(measurements, windowSize),
		Number
	),
	sum,
	log(`Increases for window size ${windowSize}`)
)(measurements.length);

increasesForWindowSize(1);
increasesForWindowSize(3);