#!/usr/bin/env node

import {readFileSync} from 'fs';
import {Parser, format} from 'temper-earley/all-exports.js';
import {argv} from 'process';

const parser = new Parser(String(readFileSync(argv[2])));

const data = parser.parse(String(readFileSync(argv[3])));

console.log(format(data));
