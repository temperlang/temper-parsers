#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, Tree} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

for (let i = 3; i < argv.length; i++) {
    let data = null;
    try {
        data = parser.parse(String(readFileSync(argv[i])));
    } catch (e) {
        console.error(e);
        console.log(`fail ${argv[i]}`);
    }

    if (data != null && !(data instanceof Tree)) {
        console.log(`fail ${argv[i]}`);
    }
}
