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
    A: "Z",
    K: "Y",
    Q: "X",
    J: "W",
    T: "V"
};

function getType(hand) {
    const counts = hand.reduce((counts, card) => {
        counts[card] = (counts[card] ?? 0) + 1;
        return counts;
    }, {});

    let twos = 0, threes = 0;
    for (const cardCount of Object.values(counts)) {
        if (cardCount === 5) return types.FIVE_OF_A_KIND;
        if (cardCount === 4) return types.FOUR_OF_A_KIND;
        if (cardCount === 3) threes += 1;
        if (cardCount === 2) twos += 1;
    }

    if (threes && twos) return types.FULL_HOUSE;
    if (threes) return types.THREE_OF_A_KIND;
    if (twos > 1) return types.TWO_PAIR;
    if (twos) return types.ONE_PAIR;
    return types.HIGH_CARD;
}

export default function(input) {
    return input
        .map(line => line.match(/(.*?) (.*)/).slice(1))
        .map(([hand, bid]) => ({
            hand: hand.split("").map(card => cardValue[card] || String.fromCharCode("A".charCodeAt(0) + Number(card))).join(""),
            type: getType(hand.split("")),
            bid: Number(bid)
        }))
        .sort((a, b) => a.type - b.type || a.hand.localeCompare(b.hand))
        .map(({ bid }, i) => bid * (i + 1))
        .reduce(sum, 0);
}