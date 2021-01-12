const fs = require('fs');

const groups = fs.readFileSync(__dirname + '/input.txt').toString().split('\n\n');

let count = 0;
for (const group of groups) {
    const people = group.split('\n');
    const counts = {};
    for (const person of people) {
        for (const c of person) {
            if (!counts[c]) counts[c] = 0;
            counts[c] += 1;
        }
    }
    let e = 0;
    for (const c in counts) {
        if (counts[c] == people.length) e += 1;
    }
    count += e;
}
console.log(count);