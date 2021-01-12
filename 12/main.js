const fs = require('fs');
const { setUncaughtExceptionCaptureCallback } = require('process');

const instructions = fs.readFileSync(__dirname + '/input.txt').toString()
    .split('\n').map(line => ({ action: line.substr(0, 1), amount: line.substr(1) }));

const INDEXES = ['E', 'S', 'W', 'N'];

const DIRECTIONS = {
    E: { x: 1, y: 0 },
    S: { x: 0, y: -1 },
    W: { x: -1, y: 0 },
    N: { x: 0, y: 1 }
}


class Thing {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.facing = DIRECTIONS.E;
    }
    move(direction, factor) {
        this.x += direction.x * factor;
        this.y += direction.y * factor;
    }
}

const ship = new Ship(0, 0);
const waypoint = new Thing(10, 1);

for (const instruction of instructions) {
    if (DIRECTIONS[instruction.action]) ship.move(DIRECTIONS[instruction.action], instruction.amount);
    else if (instruction.action === 'F') ship.move(ship.facing, instruction.amount);
    else {
        const offset = (instruction.action == 'R' ? instruction.amount : 360 * 10 - instruction.amount) / 90;
        ship.facing = DIRECTIONS[INDEXES[(Object.values(DIRECTIONS).indexOf(ship.facing) + offset) % 4]];
    }
}

console.log(ship.x, ship.y, Math.abs(ship.x) + Math.abs(ship.y));