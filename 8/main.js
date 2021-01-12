const fs = require('fs');

const instructions = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map(i => {
    let [instr, number] = i.split(' ');
    number = parseInt(number);
    return { instr, number };
});

const tweakables = instructions.filter(i => i.instr == 'jmp' || i.instr == 'nop');

function find() {
    const old = [];
    let current = 0;
    let acc = 0;
    while (!old.includes(current) && current < instructions.length - 1) {
        old.push(current);
        const i = instructions[current];
        if (i.instr == 'nop') current += 1;
        else if (i.instr == 'acc') {
            acc += i.number;
            current += 1;
        } else current += i.number;
    }
    return { current, acc };
}

function toggle(instr) {
    if (instr.instr == 'nop') instr.instr = 'jmp';
    else if (instr.instr == 'jmp') instr.instr = 'nop';
}

for (let i = 0; i < tweakables.length; i++) {
    const tweak = tweakables[i];
    toggle(tweak);
    const f = find();
    if (f.current == instructions.length - 1) console.log(f.acc);
    toggle(tweak);
}