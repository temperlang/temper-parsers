#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Node, format} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

for (let i = 3; i < argv.length; i++) {
    const data = parser.parse(String(readFileSync(argv[i])));

    if (!(data instanceof Node)) {
        console.log(`fail ${argv[i]}`);
    }
}
