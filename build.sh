#!/usr/bin/env sh

# our dear temper build
echo "--- building temper---" && temper build -b js -b py -b lua

# ugly hack
echo '{"name": "temper-parsers", "type": "module"}' > temper.out/js/temper-parsers/package.json

# install our temper
rm -rf node_modules/
echo "--- installing modules ---" && npm i temper.out/js/*
