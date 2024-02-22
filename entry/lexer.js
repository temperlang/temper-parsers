#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Node, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

parser.mode = 'lexer';

for (let i = 3; i < argv.length; i++) {
    let data = null;
    try {
        data = parser.parse(String(readFileSync(argv[i])));
    } catch (e) {
        console.log(`fail ${argv[i]}`);
    }
    if (data != null) {
        if (data instanceof Node) {
            console.log(format(data));
        } else {
            console.log(`fail ${argv[i]}`);
        }
    }
}
