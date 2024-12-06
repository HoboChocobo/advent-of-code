function formatNumbers(numbers) {
    return numbers.split(" ").map(number => Number(number.trim()));
}

export default function(input) {
    const ogScorecards = input
        .map(line => line.replace(/\s+/g, " "))
        .map(line => line.match(/Card (\d+): (.*?) \| (.*)/).slice(1))
        .map(([id, winningNumbers, cardNumbers]) => ({
            id: Number(id),
            winningNumbers: formatNumbers(winningNumbers),
            cardNumbers: formatNumbers(cardNumbers)
        }));
    
    const scorecards = [...ogScorecards];
    let totalScratchcards = ogScorecards.length;

    while (scorecards.length > 0) {
        const { id, winningNumbers, cardNumbers } = scorecards.pop();
        let winCount = 0;
        for (const number of cardNumbers) {
            if (winningNumbers.includes(number)) {
                winCount += 1;
            }
        }
        const scorecardsToAdd = ogScorecards.slice(id, id + winCount);
        scorecards.push(...scorecardsToAdd);
        totalScratchcards += scorecardsToAdd.length;
    }

    return totalScratchcards;
}