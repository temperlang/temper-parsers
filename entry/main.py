#!/usr/bin/env python3

import logging
import sys

sys.path.append('temper.out/py/std')
sys.path.append('temper.out/py/temper-core')
sys.path.append('temper.out/py/temper-parsers')

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, format='%(message)s')

from temper_parsers.src.parser import Parser
from temper_parsers.src.tree import format

with open(sys.argv[1]) as f:
    parser = Parser(f.read())

for arg in sys.argv[2:]:
    with open(arg) as f:
        src = f.read()
    data = parser.parse(src)
    print(format(data))
