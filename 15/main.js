const fs = require('fs');

const occurences = {};
const numbers = [];

function found(number, index) {
    if (!occurences.hasOwnProperty(number)) occurences[number] = [];
    occurences[number].push(index);
    numbers.push(number);
}

fs.readFileSync(__dirname + '/input.txt').toString().split(',')
    .forEach(found);

function one() {
    while (numbers.length < 2020) {
        const previous = numbers[numbers.length - 1];
        let result = 0;
        if (occurences[previous].length >= 2) {
            const o = occurences[previous];
            result = o[o.length - 1] - o[o.length - 2];
        }
        found(result, numbers.length);
    }
    console.log(numbers[numbers.length - 1]);
}

function two() {
    
}