const fs = require('fs');

const adapaters = fs.readFileSync(__dirname + '/input.txt').toString().split('\n')
    .map(n => parseInt(n)).sort((a, b) => a - b);

adapaters.unshift(0);
adapaters.push(adapaters[adapaters.length - 1] + 3);

function one() {
    const counts = { 1: 0, 3: 0 };
    for (let i = 0; i < adapaters.length - 1; i++) {
        const diff = adapaters[i + 1] - adapaters[i];
        counts[diff] += 1;
    }
    console.log(counts);
    return counts[1] * counts[3];
}

function two(ads = adapaters, start = 0) {
    let arrangements = 0;
    for (let i = start; i < ads.length - 2; i++) {
        const diff = ads[i + 2] - ads[i];
        if (diff <= 3) {
            const newAds = [...ads];
            newAds.splice(i + 1, 1);
            arrangements += two(newAds, i);
        }
    }
    arrangements += 1;
    return arrangements;
}

function goodTwo() {
    const removable = [];
    let group = null;
    for (let i = 1; i < adapaters.length - 1; i++) {
        const diff = adapaters[i + 1] - adapaters[i - 1];
        if (diff <= 3) {
            if (!group) group = { start: i - 1, end: null };
        } else if (group) {
            group.end = i;
            removable.push(group);
            group = null;
        }
    }

    let possibilites = 1;
    for (const group of removable) {
        const copy = [...adapaters];
        possibilites *= two(copy.splice(group.start, group.end - group.start + 1));
    }

    return possibilites;
}

console.log(goodTwo());
