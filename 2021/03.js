import { 
	arrayToString,
	filters,
	flipBit,
	gte,
	map,
	pipe,
	range,
	split,
	sum,
	toBit,
	toDecimal,
	verticalSlice
} from "blowdash";
import { readFile } from "../library.js";

const input = pipe(
	readFile,
	split("\n"),
	filters.existence
)({ path: import.meta.url, filename: "input.txt" });

const numbers = map(split(""))(input);

const mostCommonBitAtPosition = ({ array, position }) => pipe(
	verticalSlice,
	sum,
	gte(array.length / 2),
	toBit
)({ array, position });

const leastCommonBitAtPosition = pipe(
	mostCommonBitAtPosition,
	flipBit
);

const getLastRemainingNumber = ({ numbers, findBit }) => {
	const [last] = range(numbers[0].length).reduce((keep, position) => {
		if (keep.length == 1) return keep;

		const bit = findBit({ array: keep, position });
		return keep.filter(n => n[position] == bit);
	}, numbers);
	return last;
};

const find = pipe(
	getLastRemainingNumber,
	arrayToString,
	toDecimal
);

const oxygen = find({ numbers, findBit: mostCommonBitAtPosition });
const co2 = find({ numbers, findBit: leastCommonBitAtPosition });

console.log(oxygen * co2);