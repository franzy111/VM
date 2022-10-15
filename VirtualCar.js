let fs = require('fs');
let rs = require('readline-sync');
let arg = process.argv;
let ram = new Array();
try {
    ram = fs.readFileSync(arg[2]).toString().split(/\s+/);
} catch (err) {
    console.log(err);
}
let ip = 0, length = ram.length, forCmp = '';

function forJumpByIndex(nameForFlag) {
    let start = 0, res = 0;
    while (ram[res - 1] !== 'flag') {
        res = ram.indexOf(nameForFlag, start);
        start = res + 1;
    }
    return res;
}

while (ip < length) {
    switch (ram[ip]) {
        case 'begin':
            ip++;
            break;
        case 'input':
            ram[ram[ip + 1]] = parseInt(rs.prompt());
            ip += 2;
            break;
        case 'set':
            ram[ram[ip + 1]] = parseInt(ram[ip + 2]);
            ip += 3;
            break;
        case 'cmp':
            if (ram[ram[ip + 1]] > ram[ram[ip + 2]]) {
                forCmp = 'first more';
            } else if (ram[ram[ip + 1]] < ram[ram[ip + 2]]) {
                forCmp = 'second more';
            } else {
                forCmp = 'equal';
            }
            ip += 3;
            break;
        case 'jz':
            if (forCmp === 'equal') {
                ip = forJumpByIndex(ram[ip + 1]) + 1;
            } else {
                ip += 2;
            }
            break;
        case 'jump':
            ip = forJumpByIndex(ram[ip + 1]) + 1;
            break;
        case 'flag':
            ip += 2;
            break;
        case 'add':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] + ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'sub':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] - ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'mul':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] * ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'firstMore':
            if (forCmp === 'first more') {
                ip = forJumpByIndex(ram[ip + 1]) + 1;
            } else {
                ip += 2;
            }
            break;
        case 'secondMore':
            if (forCmp === 'second more') {
                ip = forJumpByIndex(ram[ip + 1]) + 1;
            } else {
                ip += 2;
            }
            break;
        case 'print':
            console.log(ram[ram[ip + 1]]);
            ip += 2;
            break;
        case 'end':
            console.log('Process was finished!');
            ip = length + 1;
            break;
        default:
            console.log('eRRoR!!!')
            ip = length + 1;
            break;
    }
}