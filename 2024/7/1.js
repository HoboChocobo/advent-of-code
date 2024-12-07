import { sum } from "../lib/index.js";

function buildEquations(operands, equations = []) {
    if (!equations.length) equations.push([operands[0]]);
    else equations.forEach(equation => equation.push(operands[0]));
    if (operands.length === 1) return equations;
    const adds = [...equations].map(x => x.slice());
    const multiplies = equations;
    adds.forEach(equation => equation.push("+"));
    multiplies.forEach(equation => equation.push("*"));
    equations = [...adds, ...multiplies];
    const newOperands = operands.slice(1, operands.length);
    return buildEquations(newOperands, equations);
}

function possiblyTrue([result, ...operands]) {
    const equations = buildEquations(operands);
    for (const equation of equations) {
        let value = 0;
        for (let i = 0; i < equation.length; i += 2) {
            const operand = equation[i];
            const operator = equation[i-1];
            if (i === 0) value = operand;
            else value = operator === "*" ? value * operand : value + operand; 
        }
        if (value === result) return true;
    }
    return false;
}

export default function(input) {
    const equations = input.map(line => line.replace(":", "").split(" ").map(Number));
    const calibrationResult = equations
        .filter(possiblyTrue)
        .map(equation => equation.at(0))
        .reduce(sum);
    return calibrationResult;
}