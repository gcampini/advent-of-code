const fs = require('fs');

const weakness = 105950735; // (position 564)

const numbers = fs.readFileSync(__dirname + '/input.txt').toString().split('\n').map(n => parseInt(n));

function one() {
    for (let i = 25; i < numbers.length; i++) {
        let valid = false;
        for (let j = i - 25; j < i; j++) {
            for (let k = i - 25; k < i; k++) {
                if (numbers[j] + numbers[k] == numbers[i]) valid = true;
            }
        }
        if (!valid) {
            console.log(i, numbers[i]);
            return;
        }
    }
}

function two() {
    for (let start = 0; start < numbers.length - 1; start++) {
        let sum = numbers[start];
        const ns = [numbers[start]];
        for (let end = start + 1; end < numbers.length; end++) {
            sum += numbers[end];
            ns.push(numbers[end]);
            if (sum == weakness) {
                return Math.min(...ns) + Math.max(...ns);
            } else if (sum > weakness) break;
        }
    }
}

console.log(two());