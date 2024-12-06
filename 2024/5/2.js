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
    for (let numbers of updates) {
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
        if (!valid) {
            while (!valid) {
                const slightlyMoreCorrect = rearrangeInefficiently(numbers, rulesMap);
                if (slightlyMoreCorrect === null) {
                    const middle = numbers[Math.ceil(numbers.length / 2) - 1];
                    sum += middle;
                    valid = true;
                } else {
                    numbers = slightlyMoreCorrect;
                }
            }
        }
    }
    return sum;
}

function rearrangeInefficiently(nums, rulesMap) {
    let numbers = [...nums];
    const seen = new Set();
    for (const number of numbers) {
        const baddies = rulesMap.get(number);
        if (baddies && [...baddies].some(value => seen.has(value))) {
            const theBadOne = [...baddies].find(value => seen.has(value));
            const left = numbers.findIndex(value => value === theBadOne);
            const right = numbers.findIndex(value => value === number);
            [numbers[left], numbers[right]] = [numbers[right], numbers[left]];
            return numbers;
        }
        seen.add(number);
    }
    return null;
}