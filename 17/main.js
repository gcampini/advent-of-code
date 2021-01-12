const fs = require('fs');

class Grid {
    constructor() {
        this.cube = {};
        this.min = 0;
        this.max = 0;
    }

    set(x, y, z, activated) {
        if (!this.cube[x]) this.cube[x] = {};
        if (!this.cube[x][y]) this.cube[x][y] = {};
        this.cube[x][y][z] = activated;
        this.min = Math.min(this.min, x, y, z);
        this.max = Math.max(this.max, x, y, z);
    }

    activated(x, y, z) {
        return this.cube[x] && this.cube[x][y] ? !!this.cube[x][y][z] : false;
    }

    each(action) {
        for (let x = this.min; x < this.max + 1; x++) {
            for (let y = this.min; y < this.max + 1; y++) {
                for (let z = this.min; z < this.max + 1; z++) {
                    action(x, y, z, this.activated(x, y, z));
                }
            }
        }
    }

    toString(depth) {
        const m = [];
        this.each((y, x, z, activated) => {
            if (z !== depth) return;
            x -= this.min;
            y -= this.min;
            if (!m[x]) m[x] = [];
            m[x][y] = (activated ? '#' : '.');
        });
        return m.map(line => line.join('')).join('\n');
    }
}

let grid = new Grid();

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
const size = input.length;

for (let x = 0; x < size; x++) {
    for (let y = 0; y < size; y++) {
        grid.set(x - Math.floor(size / 2), y - Math.floor(size / 2), 0, input[y][x] === '#');
    }
}

function one() {

    for (let cycle = 0; cycle < 1; cycle++) {
        let newGrid = new Grid();
        for (let x = grid.min - 1; x < grid.max + 2; x++) {
            for (let y = grid.min - 1; y < grid.max + 2; y++) {
                for (let z = grid.min - 1; z < grid.max + 2; z++) {

                    let count = 0;
                    for (let xo = -1; xo < 2; xo++) {
                        for (let yo = -1; yo < 2; yo++) {
                            for (let zo = -1; zo < 2; zo++) {
                                if (xo == 0 && yo == 0 && zo == 0) continue;
                                if (grid.activated(x + xo, y + yo, z + zo)) count += 1;
                            }
                        }
                    }
                    // console.log(count);

                    if (grid.activated(x, y, z)) {
                        if (count != 2 && count != 3) newGrid.set(x, y, z, false);
                    } else {
                        if (count == 3) newGrid.set(x, y, z, true);
                    }

                }
            }
        }

        grid = newGrid;
    }

}

console.log(grid.toString(0));
one();
console.log("-------\n" + grid.toString(0));

let count = 0;
grid.each((x, y, z, active) => {
    if (active) count += 1;
});
console.log(count);