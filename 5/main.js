const fs = require('fs');

const seats = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');

function find(seat, max, letter) {
    let up = max;
    let down = 0;
    for (const l of seat) {
        l == letter ? down += (up - down) / 2 : up -= (up - down) / 2;
    }
    return down;
}

console.log(find('FBFBBFF', 128, 'B'), find('RLR', 8, 'R'));

console.log(find('BFFFBBF', 128, 'B'), find('RRR', 8, 'R'));

console.log(find('FFFBBBF', 128, 'B'), find('RRR', 8, 'R'));

console.log(find('BBFFBBF', 128, 'B'), find('RLL', 8, 'R'));

max = 0;
for (const seat of seats) {
    const row = find(seat.substring(0, 7), 128, 'B');
    const col = find(seat.substring(7, 10), 8, 'L');
    console.log(seat, row, col);
    const result = row * 8 + col;
    if (result > max) max = result;
}
console.log(max);