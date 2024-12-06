export default function(input) {
    const sections = input.join("\n").split(/\n\n/).map(section => section.split("\n"));
    const rules = sections[0].map(rule => rule.split("|").map(Number));
    const rulesMap = new Map();
    for (const rule of rules) {
        if (!rulesMap.has(rule[0])) rulesMap.set(rule[0], new Set());
        rulesMap.get(rule[0]).add(rule[1]);
    }
    const updates = sections[1].map(line => line.split(",").map(Number));
    let sum = 0;
    for (const numbers of updates) {
        const seen = new Set();
        let valid = true;
        for (const number of numbers) {
            const baddies = rulesMap.get(number);
            if (baddies && [...baddies].some(value => seen.has(value))) {
                valid = false;
                break;
            }
            seen.add(number);
        }
        if (valid) {
            const middle = numbers[Math.ceil(numbers.length / 2) - 1];
            sum += middle;
        }
    }
    return sum;
}