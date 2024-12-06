export function firstAndLast(calibration) {
    return [calibration[0], calibration[calibration.length - 1]];
}

export function sum(total, current) {
    return total + current;
}

export function product(total, current) {
    return total * current;
}

export function ascending(a, b) {
    return a - b;
}

export function descending(a, b) {
    return b - a;
}