function formatNumbers(numbers) {
    return numbers.split(" ").map(number => Number(number.trim()));
}

export default function(input) {
    const scorecards = input
        .map(line => line.replace(/\s+/g, " "))
        .map(line => line.match(/Card (\d+): (.*?) \| (.*)/).slice(1))
        .map(([id, winningNumbers, cardNumbers]) => ({
            id: Number(id),
            winningNumbers: formatNumbers(winningNumbers),
            cardNumbers: formatNumbers(cardNumbers)
        }));

    let pointsSum = 0;
    for (const { id, winningNumbers, cardNumbers } of scorecards) {
        let points = 0;
        for (const number of cardNumbers) {
            if (winningNumbers.includes(number)) {
                if (points == 0) points = 1;
                else points = points * 2;
            }
        }
        pointsSum = pointsSum + points;
    }

    
    return pointsSum;
}