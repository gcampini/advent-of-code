const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n\n');

class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    in(number) {
        return number >= this.min && number <= this.max;
    }
}

const rules = {};
input[0].split('\n').forEach(line => {
    let [field, ranges] = line.split(': ');
    ranges = ranges.split(' or ').map(r => {
        const [min, max] = r.split('-').map(n => parseInt(n));
        return new Range(min, max);
    });
    rules[field] = ranges;
});

const tickets = [];
tickets.push(input[1].split('\n')[1].split(',').map(n => parseInt(n)))
tickets.push(...input[2].split('\n').splice(1).map(line => line.split(',').map(n => parseInt(n))));

function one() {
    let sum = 0;
    for (const ticket of tickets) {
        for (const number of ticket) {
            
            let valid = false;
            for (const rule of Object.values(rules)) {
                if (!rule.every(range => !range.in(number))) valid = true;
            }
            if (!valid) sum += number;

        }
    }
    console.log(sum);
}

one();