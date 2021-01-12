const fs = require('fs');

const grid = fs.readFileSync(__dirname + '/input.txt').toString()
    .split('\n')
    .map(line => line.split(''));

function isOccupied(row, col, grid) {
    if (row < 0 || row >= grid.length) return null;
    if (col < 0 || col >= grid[row].length) return null;
    return grid[row][col] === '#';
}

function isOutOfBounds(row, col, grid) {
    return row < 0 || row >= grid.length || col < 0 || col >= grid[row].length;
}

function equals(grid1, grid2) {
    if (!grid1 || !grid2) return false;
    for (let row = 0; row < grid1.length; row++) {
        for (let col = 0; col < grid1[row].length; col++) {
            if (grid1[row][col] !== grid2[row][col]) return false;
        }
    }
    return true;
}

function transform(grid) {
    newGrid = [];
    for (let row = 0; row < grid.length; row++) {
        newGrid.push([]);
        for (let col = 0; col < grid[row].length; col++) {

            let count = 0;
            // for (let i = -1; i < 2; i++) if (occupied(row - 1, col + i, grid)) count += 1;
            // for (let i = -1; i < 2; i++) if (occupied(row + 1, col + i, grid)) count += 1;
            // if (occupied(row, col - 1, grid)) count += 1;
            // if (occupied(row, col + 1, grid)) count += 1;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    if (i === 0 && j === 0) continue;



                    let n = 1;
                    let occupied = null;
                    while (occupied === null) {
                        const r = row + i * n;
                        const c = col + j * n;
                        if (isOutOfBounds(r, c, grid)) break;
                        if (grid[r][c] === '#') occupied = true;
                        else if (grid[r][c] === 'L') occupied = false;
                        n += 1;
                    }
                    if (occupied) count += 1;

                }
            }

            if (grid[row][col] == 'L' && count == 0) newGrid[row].push('#');
            else if (grid[row][col] == '#' && count >= 5) newGrid[row].push('L');
            else newGrid[row].push(grid[row][col]);

        }
    }
    return newGrid;
}

let old = null;
let neww = grid;
while (!equals(old, neww)) {
    old = neww;
    neww = transform(neww);
}

let count = 0;
for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
        if (isOccupied(row, col, neww)) count += 1;
    }
}
console.log(count);

// console.log(newGrid);