#!/usr/bin/env lua

package.path = 'temper.out/lua/?.lua'

local parser = require('temper-earley.src.parser')
local tree = require('temper-earley.src.tree')

local function read(name)
    local f = io.open(name)
    local ret = f:read('*all')
    f:close()
    return ret
end

local p = parser.Parser(read(arg[1]))
local data = p:parse(read(arg[2]))

print(tree.format(data))