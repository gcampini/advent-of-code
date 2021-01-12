const fs = require('fs');

const passports = fs.readFileSync(__dirname + '/input.txt').toString().split('\n\n');
const required = {
    byr: (v) => parseInt(v) >= 1920 && parseInt(v) <= 2002,
    iyr: (v) => parseInt(v) >= 2010 && parseInt(v) <= 2020,
    eyr: (v) => parseInt(v) >= 2020 && parseInt(v) <= 2030,
    hgt: (v) => {
        if (v.endsWith('cm')) {
            const t = parseInt(v.substring(0, v.length - 2));
            return t >= 150 && t <= 193;
        } else if (v.endsWith('in')) {
            const t = parseInt(v.substring(0, v.length - 2));
            return t >= 59 && t <= 76;
        }
        return false;
    },
    hcl: (v) => v.match(/#[0-9a-f]{6}/),
    ecl: (v) => v.match(/amb|blu|brn|gry|grn|hzl|oth/),
    pid: (v) => v.match(/^[0-9]{9}$/)
};

let count = 0;
for (const passport of passports) {
    let valid = 0;
    passport.split(/\n| /).forEach(f => {
        const [key, value] = f.split(':');
        if (required[key]) valid += required[key](value) ? 1 : 0;
    });
    if (valid == 7) count += 1;
}

console.log(count);