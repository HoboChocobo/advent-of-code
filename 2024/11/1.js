export default function([input]) {
    let arrangement = input.split(" ").map(Number);
    for (let blink = 0; blink < 25; blink++) {
        const temp = [];
        for (let i = 0; i < arrangement.length; i++) {
            const stone = arrangement[i];
            if (stone === 0) temp.push(1);
            else if ((String(stone).length % 2) === 0) {
                const string = String(stone);
                const [left, right] = [string.slice(0, string.length / 2), string.slice(string.length / 2, string.length)].map(Number);
                temp.push(left, right);
            } else {
                temp.push(stone * 2024);
            }
        }
        arrangement = temp;
    }
    return arrangement.length;
}