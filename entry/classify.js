#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Node} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

for (let i = 3; i < argv.length; i++) {
    const trees = parser.classify(argv[i]);

    
    console.log(String(trees));
}
