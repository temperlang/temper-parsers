#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

for (let i = 3; i < argv.length; i++) {
    const data = parser.lex(String(readFileSync(argv[i])));
    
    for (const tok of data) {
        console.log(tok.toString());
    }
}
