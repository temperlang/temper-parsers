#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Tree} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

let parser;
{
    const src = String(readFileSync(argv[2]));
    let start = new Date();
    parser = new Parser(src);
    let end = new Date();
    console.log(`grammar: ${end - start}ms`);
}

{
    let strs = [];
    for (let i = 3; i < argv.length; i++) {
        strs.push(String(readFileSync(argv[i])));
    }

    let lines = 0;
    let chars = 0;
    let start = new Date();
    for (const src of strs) {
        let data = null;
        try {
            data = parser.parse(src);
        } catch (e) {
            console.error(e);
            console.log(`fail ${argv[i]}`);
        }
        lines += src.split('\n').length;
        chars += src.length;
        if (data != null) {
            if (data instanceof Tree) {
                // console.log(format(data));
            } else {
                console.log(`fail ${argv[i]}`);
            }
        }
    }
    let end = new Date();
    console.log(`files: ${end - start}ms`);
    console.log(`${lines / (end - start) * 1000 |0} ln/s`);
    console.log(`${chars / (end - start) |0} chars/ms`);
}
