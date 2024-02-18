#!/usr/bin/env sh

time='time -f"%es %Mk %P"'
args='grammars/temper input/basic.temper'

# our dear temper build
echo "--- building temper---" && temper build -b js -b py -b lua

# ugly hack
echo '{"name": "temper-earley", "type": "module"}' > temper.out/js/temper-earley/package.json

# install our temper
rm -rf node_modules/
echo "--- installing modules ---" && npm i temper.out/js/*

# run with fastest first
which node > /dev/null  && echo "--- node ---" && sh -c "$time node entry/main.js $args"
which pypy3 > /dev/null  && echo "--- pypy3 ---" && sh -c "$time pypy3 entry/main.py $args"
which luajit > /dev/null  && echo "--- luajit ---" && sh -c "$time luajit entry/main.lua $args"
which python3 > /dev/null  && echo "--- python3 ---" && sh -c "$time python3 entry/main.py $args"
which lua > /dev/null  && echo "--- lua ---" && sh -c "$time lua entry/main.lua $args"
