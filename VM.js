let readline = require('readline-sync');
let fs = require('fs');
let arg = process.argv;
let ram = new Array();
let progText = fs.readFileSync(arg[2]).toString();
ram = progText.split(/\s+/);
let ip = 0;
while (ip < ram.length) {
    switch (ram[ip]) {
        case 'input':
            ram[ram[ip + 1]] = readline.questionInt();
            ip += 2;
            break;
        case 'print':
            console.log(ram[ram[ip + 1]]);
            ip += 2;
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
            ram[ram[ip + 1]] = ram[ip + 2];
            ip += 3;
            break;
        case 'divmod':
            ram[ram[ip + 3]] = ram[ram[ip + 1]] % ram[ram[ip + 2]];
            ip += 4;
            break;
        case 'finish':
            console.log('process finished');
            ip = ram.length + 1;
            break;
        default:
            console.log("Error");
            break;
    }
}