export default function([input]) {
    const arrangement = input.split(" ").map(Number);
    let stones = arrangement.reduce((acc, cur) => (acc[cur] = 1) && acc, {});
    for (let blink = 0; blink < 75; blink++) {
        const temp = {};
        for (const [engraving, count] of Object.entries(stones)) {
            if (engraving == 0) {
                temp[1] = (temp[1] || 0) + count;
            } else if ((engraving.length % 2) === 0) {
                const [firstHalf, secondHalf] = [engraving.slice(0, engraving.length / 2), engraving.slice(engraving.length / 2, engraving.length)].map(Number);
                temp[firstHalf] = (temp[firstHalf] || 0) + count;
                temp[secondHalf] = (temp[secondHalf] || 0) + count;
            } else {
                const newNumber = Number(engraving) * 2024;
                temp[newNumber] = (temp[newNumber] || 0) + count;
            }
        }
        stones = temp;
    }
    return Object.values(stones).reduce((acc, cur) => acc + cur, 0);
}