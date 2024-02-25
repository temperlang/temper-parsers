#!/usr/bin/env lua

package.path = 'temper.out/lua/?.lua'

local parser = require('temper-parsers.src.parser')
local tree = require('temper-parsers.src.common.tree')

local function read(name)
    local f = io.open(name)
    local ret = f:read('*all')
    f:close()
    return ret
end

local p = parser.Parser(read(arg[1]))
for i=2, #arg do
    local data = p:parse(read(arg[i]))
    print(tree.format(data))
end
