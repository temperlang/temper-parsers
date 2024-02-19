#!/usr/bin/env lua

package.path = 'temper.out/lua/?.lua'

local temper = require('temper-core/prelude');
local parser = require('temper-parsers.src.parser')
local tree = require('temper-parsers.src.tree')

local function read(name)
    local f = io.open(name)
    local ret = f:read('*all')
    f:close()
    return ret
end

local p = parser.Parser(read(arg[1]))
for i=2, #arg do
    local file = arg[i]
    local data = p:parse(read(file))
    if type(data) ~= 'table' or data[temper.type_tag] == tree.Node then
        print(file)
    end
end

