const fs = require('fs');

const numbers = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map(n => parseInt(n));

for (const n1 of numbers) {
    for (const n2 of numbers) {
        for (const n3 of numbers) {
            if (n1 + n2 + n3 == 2020) console.log(n1 * n2 * n3);
        }
    }
}