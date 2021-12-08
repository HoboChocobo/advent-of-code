import fs from "fs";
import { dirname } from "path";

export const readFile = ({ path, filename }) => {
	const basePath = dirname(new URL(path).pathname.replace(/%20/g, " "));
	return fs.readFileSync(`${basePath}/${filename}`).toString();
}