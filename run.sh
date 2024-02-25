#!/usr/bin/env sh

time='time -f"%es %Mk %P"'
args="grammars/temper $(find src -name '*.temper' | xargs echo)"

which node > /dev/null  && echo "--- node ---" && sh -c "$time node entry/main.js $args > out.node.txt"
which bun > /dev/null  && echo "--- bun ---" && sh -c "$time bun entry/main.js $args > out.bun.txt"
which pypy3 > /dev/null  && echo "--- pypy3 ---" && sh -c "$time pypy3 entry/main.py $args > out.pypy3.txt"
which python3 > /dev/null  && echo "--- python3 ---" && sh -c "$time python3 entry/main.py $args > out.python3.txt"
which luajit > /dev/null  && echo "--- luajit ---" && sh -c "$time luajit entry/main.lua $args > out.luajit.txt"
which lua > /dev/null  && echo "--- lua ---" && sh -c "$time lua entry/main.lua $args > out.lua.txt"
