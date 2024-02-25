#!/usr/bin/env python3

import logging
import sys

sys.path.append('temper.out/py/std')
sys.path.append('temper.out/py/temper-core')
sys.path.append('temper.out/py/temper-parsers')

logging.basicConfig(stream=sys.stdout, level=logging.DEBUG, format='%(message)s')

from temper_parsers.src.parser import Parser
from temper_parsers.src.common.tree import Node

with open(sys.argv[1]) as f:
    parser = Parser(f.read())

for arg in sys.argv[2:]:
    with open(arg) as f:
        src = f.read()
    try:
        data = parser.parse(src)
    except RuntimeError:
        data = None
    if not isinstance(data, Node):
        print(f'fail {arg}')
