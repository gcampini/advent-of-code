const fs = require('fs');

const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');

function evaluate(line) {
    console.log(line);
    console.log(line.split(/\(|\)/));

    const members = [];


}

evaluate(input[0]);