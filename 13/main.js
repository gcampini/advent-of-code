const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
const earliest = parseInt(input[0]);
// const buses = input[1].split(',').filter(b => b !== 'x').map(b => parseInt(b));
const buses = {};
input[1].split(',').forEach((b, index) => b === 'x' ? '' : buses[b] = index);

function one() {
    let time = earliest - 1;
    let found = null;
    while (found == null) {
        time += 1;
        for (const bus of buses) {
            if (time % bus === 0) found = bus;
        }
    }
    console.log((time - earliest) * found);
}

function two() {
    let n = 0;
    const biggest = Math.max(...Object.keys(buses).map(b => parseInt(b)));
    console.log(biggest);
    let found = null;
    while (found == null) {
        n += 1;
        const time = biggest * n;
        let valid = true;
        for (const b in buses) {
            if ((time + buses[b] - buses[biggest]) % parseInt(b) !== 0) {
                valid = false;
                break;
            }
        }
        if (valid) found = time - buses[biggest];
    }
    console.log(found);
}

function goodTwo() {

    let time = 1;

    for (const b in buses) {
        time *= parseInt(b) 
    }

}

two();