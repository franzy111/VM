let readlineSync = require('readline-sync');
let fs = require('fs');
let arg = process.argv;
let ram = new Array();
let forCompare;
let proText = fs.readFileSync(arg[2]).toString();
ram = proText.split(/\s+/);
let ip = 0;
while (ram[ip] !== 'finish') {
    switch (ram[ip]) {
        case 'input':
            ram[ram[ip + 1]] = parseInt(readlineSync.prompt());
            ip += 2;
            break;
        case 'print':
            console.log(ram[ram[ip + 1]]);
            ip += 2;
            break;
        case 'add':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] + ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'mul':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] * ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'sub':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] - ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'set':
            ram[ram[ip + 1]] = parseInt(ram[ip + 2]);
            ip += 3;
            break;
        case 'div-mod':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] % ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'compare':
            if ((ram[ram[ip + 1]] - ram[ram[ip + 2]]) > 0){
                ram[0] = 1;
            } else if ((ram[ram[ip + 1]] - ram[ram[ip + 2]]) < 0) {
                ram[0] = -1;
            } else {
                ram[0] = 0;
            }
            ip += 3;
            break;
        case 'jumpIfEqual':
            if (ram[0] === 0) {
                ip = 1 + forJumpByIndex(ram[ip + 1]);
            }
            else ip += 2;
            break;
        case 'flag':
            ip += 2;
            break;
        case 'jump':
            ip = forJumpByIndex(ram[ip + 1]) + 1;
            break;
    }

}
function forJumpByIndex(nameForFlag) {
    let start = 0, res = 0;
    while (true) {
        res = ram.indexOf(nameForFlag, start);
        if (ram[res - 1] == 'flag') break;
        start = res + 1
    }
    return res;
}
