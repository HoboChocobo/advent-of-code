export default function(input) {
    const machines = [];
    while (input.length) {
        const [buttonA, buttonB, prize, _, ...rest] = input;
        input = rest;
        const [buttonAX, buttonAY] = buttonA.match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
        const [buttonBX, buttonBY] = buttonB.match(/X\+(\d+), Y\+(\d+)/).slice(1).map(Number);
        const [prizeX, prizeY] = prize.match(/X=(\d+), Y=(\d+)/).slice(1).map(Number);
        machines.push({
            buttonA: [buttonAX, buttonAY],
            buttonB: [buttonBX, buttonBY],
            prize: [prizeX, prizeY]
        });
    }

    let cost = 0;
    for (const { buttonA, buttonB, prize } of machines) {
        const [buttonAX, buttonAY] = buttonA;
        const [buttonBX, buttonBY] = buttonB;
        const [prizeX, prizeY] = prize;
        let b = 0;
        while ((b * buttonBX < prizeX) && (b * buttonBY < prizeY)) {
            if (prizeY === (((prizeX - (b * buttonBX)) / buttonAX) * buttonAY) + (b * buttonBY)) {
                const a = (prizeX - (b * buttonBX)) / buttonAX;
                if (!Number.isInteger(a)) continue;
                cost += (a * 3) + b;
                break;
            }
            b++;
        }
    }
    return cost;
}