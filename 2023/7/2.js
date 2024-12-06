import { sum } from "../lib/index.js";

const types = {
    FIVE_OF_A_KIND: 6,
    FOUR_OF_A_KIND: 5,
    FULL_HOUSE: 4,
    THREE_OF_A_KIND: 3,
    TWO_PAIR: 2,
    ONE_PAIR: 1,
    HIGH_CARD: 0
};

const cardValue = {
    A: "N",
    K: "M",
    Q: "L",
    J: "A",
    T: "K",
    2: "C",
    3: "D",
    4: "E",
    5: "F",
    6: "G",
    7: "H",
    8: "I",
    9: "J"
};

function getType(hand) {
    const counts = hand.reduce((counts, card) => {
        counts[card] = (counts[card] ?? 0) + 1;
        return counts;
    }, {});

    let twos = 0, threes = 0, fours = 0;
    for (const [card, cardCount] of Object.entries(counts)) {
        if (card === "J") continue;
        if (cardCount === 5) return types.FIVE_OF_A_KIND;
        if (cardCount === 4) fours += 1;
        if (cardCount === 3) threes += 1;
        if (cardCount === 2) twos += 1;
    }

    const jacks = counts["J"];
    if ((fours && jacks === 1) || (threes && jacks === 2) || (twos === 1 && jacks === 3) || jacks >= 4) return types.FIVE_OF_A_KIND;
    if (fours || (threes && jacks === 1) || (twos && jacks === 2) || jacks >= 3) return types.FOUR_OF_A_KIND;
    if ((threes && twos) || (twos === 2 && jacks === 1)) return types.FULL_HOUSE;
    if (threes || (twos && jacks === 1) || jacks === 2) return types.THREE_OF_A_KIND;
    if (twos > 1) return types.TWO_PAIR;
    if (twos || jacks === 1) return types.ONE_PAIR;
    return types.HIGH_CARD;
}

export default function(input) {
    return input
        .map(line => line.match(/(.*?) (.*)/).slice(1))
        .map(([hand, bid]) => ({
            hand: hand.split("").map(card => cardValue[card]).join(""),
            type: getType(hand.split("")),
            bid: Number(bid)
        }))
        .sort((a, b) => a.type - b.type || a.hand.localeCompare(b.hand))
        .map(({ bid }, i) => bid * (i + 1))
        .reduce(sum, 0);
}