#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

for (let i = 3; i < argv.length; i++) {
    const src  = String(readFileSync(argv[i]));
    const data = parser.lex(src);
    const dest = data.map(x => x.value).join("");
    if (src !== dest) {
        console.log(`fail: ${argv[i]}`)
    } else {
        console.log(`succeed: ${src.length / data.length}`);
    }
}
