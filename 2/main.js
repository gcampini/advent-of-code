const fs = require('fs');

const lines = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');

let count = 0;
for (const line of lines) {
    const [policy, password] = line.split(': ');
    const [amount, letter] = policy.split(' ');
    const [min, max] = amount.split('-').map(n => parseInt(n) - 1);

    if (!password) continue;
    let c = 0;
    if (password[min] == letter) c += 1;
    if (password[max] == letter) c += 1;
    if (c == 1) count += 1;

    /* For PART ONE */
    // const occurence = password ? password.length - password.replace(new RegExp(letter, 'g'), '').length : 0;
    // if (occurence >= min && occurence <= max) count += 1;
}

console.log(count);