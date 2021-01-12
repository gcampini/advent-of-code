const fs = require('fs');

const lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
const width = lines[0].length;

const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
]

let result = 1;
for (const slope of slopes) {
    let count = 0;
    const pos = { x: 0, y: 0 };
    while (pos.y < lines.length) {
        pos.x += slope.x;
        pos.y += slope.y;
        const tree = pos.y < lines.length && lines[pos.y][pos.x % width] === '#';
        if (tree) count += 1;
    }
    result *= count;
}

console.log(result);