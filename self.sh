#!/usr/bin/env sh

for i in src/*.temper;
do
    time -f"$i: %es" node entry/main.js grammars/temper $i > $i.out
done