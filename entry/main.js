#!/usr/bin/env node

import {readFileSync, writeFileSync, mkdirSync, existsSync, mkdir} from 'fs';
import {Parser, Tree, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';
import JSON5 from 'json5';

let n = 1;
let mode = 'rules-rec';
let echo = false;
let time = false;

while (argv[2].startsWith('-')) {
    if (argv[2] === '-n') {
        n = Number(argv[3]);
        argv.splice(2, 2);
    } else if (argv[2] === '-e') {
        echo = true;
        argv.splice(2, 1);
    } else if (argv[2] === '-t') {
        time = true;
        argv.splice(2, 1);
    } else if (argv[2] === '-m') {
        mode = argv[3];
        argv.splice(2, 2);
    } else {
        break;
    }
}

let grammar = argv[2];
let parser;
{
    const src = String(readFileSync(grammar));
    parser = new Parser(src);
}

let lines = 0;
let chars = 0;

let strs = [];
for (let i = 3; i < argv.length; i++) {
    let file = argv[i];
    let data = String(readFileSync(argv[i]));
    strs.push([file, data]);
    lines += data.split('\n').length;
    chars += data.length;
}

// if (grammar === 'grammars/json') {
//     let start = new Date();
//     for (let i = 0; i < n; i++) {
//         for (const [file, data] of strs) {
//             let res = null;
//             try {
//                 res = JSON5.parse(data);
//             } catch (e) {
//                 console.error(e);
//                 console.log(`fail ${file}`);
//             }
//         }
//     }
//     let end = new Date();
//     if (time) {
//         console.log(`JSON5.parse: ${lines * n / (end - start) * 1000 |0} ln/s`);
//     }
// };

const modes = [
    'floyd-rec-js',
    'floyd-dfa-js',
];

if (modes.indexOf(mode) !== -1) {
    parser.mode = mode;
    
    let res = parser.comp();
    if (!existsSync('out.dir')) {
        mkdirSync('out.dir');
    }
    writeFileSync('out.dir/parser.js', res);

    import('../out.dir/parser.js').then(({Parser}) => {
        const parser = new Parser();
        let start = new Date();
        for (let i = 0; i < n; i++) {
            for (const [file, data] of strs) {
                let res = null;
                try {
                    res = parser.parse(data.split(""));
                } catch (e) {
                    console.error(e);
                    console.log(`fail ${file}`);
                }
                if (res != null) {
                    res = res.toTrees(parser.chars)[0];
                    if (res != null) {
                        if (res instanceof Tree) {
                            if (echo) {
                                console.log(format(res));
                            }
                        } else {
                            console.log(`fail ${file}`);
                        }
                    }
                } else {
                    console.log(`fail ${file}`);
                }
            }
        }
        let end = new Date();
        if (time) {
            console.log(`${lines * n / (end - start) * 1000 |0} ln/s`);
        }
    });
} else {
    parser.mode = mode;

    let start = new Date();
    for (let i = 0; i < n; i++) {
        for (const [file, data] of strs) {
            let res = null;
            try {
                res = parser.parse(data);
            } catch (e) {
                console.error(e);
                console.log(`fail ${file}`);
            }
            if (res != null) {
                if (res instanceof Tree) {
                    if (echo) {
                        console.log(format(res));
                    }
                } else {
                            console.error(res);
                            console.log(`fail ${file}`);
                }
            }
        }
    }
    let end = new Date();
    if (time) {
        console.log(`${lines * n / (end - start) * 1000 |0} ln/s`);
    }
}
