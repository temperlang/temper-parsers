#!/usr/bin/env python3

import sys

sys.path.append('temper.out/py/temper-core')
sys.path.append('temper.out/py/temper-earley')

from temper_earley.src.parser import Parser
from temper_earley.src.tree import format

with open(sys.argv[1]) as f:
    parser = Parser(f.read())

with open(sys.argv[2]) as f:
    data = parser.parse(f.read())

print(format(data))
