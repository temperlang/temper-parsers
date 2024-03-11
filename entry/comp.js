#!/usr/bin/env node

import fs from 'fs/promises';
import {Parser} from 'temper-parsers/all-exports.js';
import {argv} from 'process';

const main = async () => {
    const parser = new Parser(String(await fs.readFile(argv[2])));

    try {
        await fs.mkdir('out.dir');
    } catch {
        await fs.rm('out.dir', { recursive: true });
        await fs.mkdir('out.dir');
    }
    const config = await fs.readFile('template/config.temper.md.tmp');
    await fs.writeFile('out.dir/config.temper.md', config);
    const trees = await fs.readFile('template/trees.temper.tmp');
    await fs.writeFile('out.dir/trees.temper', trees);
    const gen = parser.comp();
    await fs.writeFile('out.dir/parser.temper', gen);
};

main().catch((e) => {
    console.error(e);
});

