#!/usr/bin/env sh

time='time -f"%es %Mk %P"'
args='grammars/temper src/*.temper'

which node > /dev/null  && echo "--- node ---" && sh -c "$time node entry/check.js $args"
which bun > /dev/null  && echo "--- bun ---" && sh -c "$time bun entry/check.js $args"
which pypy3 > /dev/null  && echo "--- pypy3 ---" && sh -c "$time pypy3 entry/check.py $args"
which python3 > /dev/null  && echo "--- python3 ---" && sh -c "$time python3 entry/check.py $args"
which luajit > /dev/null  && echo "--- luajit ---" && sh -c "$time luajit entry/check.lua $args"
which lua > /dev/null  && echo "--- lua ---" && sh -c "$time lua entry/check.lua $args"
