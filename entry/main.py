#!/usr/bin/env python3

import logging
import sys

sys.setrecursionlimit(1 << 12)

sys.path.append('temper.out/py/std')
sys.path.append('temper.out/py/temper-core')
sys.path.append('temper.out/py/temper-parsers')

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, format='%(message)s')

from math import floor
from time import time as clock
from temper_parsers.src.parser import Parser
from temper_parsers.src.common.tree import format

n = 1
mode = 'rules-rec'
echo = False
time = False

head = 1
while head < len(sys.argv) and sys.argv[head].startswith('-'):
    if sys.argv[head] == '-n':
        n = int(sys.argv[head + 1])
        head += 2
    elif sys.argv[head] == '-e':
        echo = True
        head += 1
    elif sys.argv[head] == '-t':
        time = True
        head += 1
    elif sys.argv[head] == '-m':
        mode = sys.argv[head + 1]
        head += 2
    else:
        break

with open(sys.argv[head]) as f:
    parser = Parser(f.read())
    head += 1
# if time:
#     print(f'{floor((t2-t1)*1000)}ms')

lines = 0
chars = 0
srcs = []
while head < len(sys.argv):
    file = sys.argv[head]
    head += 1
    with open(file) as file_obj:
        data = file_obj.read()
    lines += data.count('\n')
    chars += len(data)
    srcs.append((file, data))

t1 = clock()
for (file, data) in srcs:
    ok = True
    try:
        res = parser.parse(data)
    except Exception as e:
        ok = False
    if ok:
        if echo:
            print(format(res))
    else:
        print(f'fail {file}')
t2 = clock()

if time:
    # print(f'files: {floor((t2-t1)*1000)}ms')
    print(f'{floor(lines/(t2-t1))} ln/s')