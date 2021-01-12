const fs = require('fs');

const instructions = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')
    .map(line => {
        let [instr, value] = line.split(' = ');
        if (instr != 'mask') {
            const s = instr.substr(0, instr.length - 1).split('[');
            return {
                instruction: s[0],
                position: parseInt(s[1]),
                value: parseInt(value)
            };
        }
        return {
            instruction: instr,
            value
        };
    });

String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function one() {
    let mask = null;
    const memory = [];
    for (const instr of instructions) {
        if (instr.instruction == 'mask') mask = instr.value;
        else {
            let binary = Number(instr.value).toString(2);
            binary = '0'.repeat(36 - binary.length) + binary;
            for (let i = 0; i < mask.length; i++) {
                if (mask[i] !== 'X') binary = binary.replaceAt(i, mask[i]);
            }
            memory[instr.position] = parseInt(binary, 2);
        }
    }
    let sum = 0;
    for (const n of memory.filter(n => !Number.isNaN(n))) sum += n;
    console.log(sum);
}

function getCombinations(value, combinations = []) {
    for (let i = 0; i < value.length; i++) {
        const c = value[i];
        if (c === 'X') {
            console.log(value.replaceAt(i, 0));
            combinations.push(...getCombinations(value.replaceAt(i, 0), combinations));
            combinations.push(...getCombinations(value.replaceAt(i, 1), combinations));    
            return combinations;
        }
    }
    combinations.push(value);
    return combinations;
}

function two() {
    let mask = null;
    const memory = [];
    for (const instr of instructions) {
        if (instr.instruction == 'mask') mask = instr.value;
        else {

            let binary = Number(instr.position).toString(2);
            binary = '0'.repeat(36 - binary.length) + binary;

            for (let i = 0; i < mask.length; i++) {
                if (mask[i] !== '0') binary = binary.replaceAt(i, mask[i]);
            }

            console.log(getCombinations(binary));

        }
    }
    let sum = 0;
    for (const n of memory.filter(n => !Number.isNaN(n))) sum += n;
    console.log(sum);
}

two();