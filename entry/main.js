#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Tree, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

let n = 1;
let mode = 'rules-rec';
let echo = false;
let time = false;

while (argv[2].startsWith('-')) {
    if (argv[2] == '-n') {
        n = Number(argv[3]);
        argv.splice(2, 2);
    } else if (argv[2] == '-e') {
        echo = true;
        argv.splice(2, 1);
    } else if (argv[2] == '-t') {
        time = true;
        argv.splice(2, 1);
    } else if (argv[2] == '-m') {
        mode = argv[3];
        argv.splice(2, 2);
    } else {
        break;
    }
}

let parser;
{
    const src = String(readFileSync(argv[2]));
    let start = new Date();
    parser = new Parser(src);
    let end = new Date();
    if (time) {
        // console.log(`grammar: ${end - start}ms`);
    }
}

parser.mode = mode;

{
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
                    console.log(`fail ${file}`);
                }
            }
        }
    }
    let end = new Date();
    if (time) {
        // console.log(`files: ${end - start}ms`);
        console.log(`${lines * n / (end - start) * 1000 |0} ln/s`);
    }
}
