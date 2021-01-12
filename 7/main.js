const fs = require('fs');

const tree = {};

const rules = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');

function parseRule(raw) {
    const [parent, childrenRaw] = raw.split(' bags contain ');
    const children = childrenRaw.replace(/bags?\.?/g, '').split(' , ').filter(c => c !== 'no other ');
    if (children.length === 0) return;
    children[children.length - 1] = children[children.length - 1].substring(0, children[children.length - 1].length - 1);

    if (!tree.hasOwnProperty(parent)) tree[parent] = {};
    for (let child of children) {
        const split = child.split(' ');
        child = { count: parseInt(split[0]), name: split[1] + ' ' + split[2] };
        tree[parent][child.name] = child.count;
    }
}

for (const rule of rules) parseRule(rule);

function find(child) {
    const parents = tree[child];
    let count = 0;
    for (const parent in parents) {
        const c = parents[parent];
        count += c + c * find(parent);
    }
    return count;
}

console.log(find('shiny gold'));