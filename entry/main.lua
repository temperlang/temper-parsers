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

local function line_count(data)
    local n = 0
    for i=1, string.len(data) do
        if string.byte(data, i, i) == 10 then
            n = n + 1
        end
    end
    return n
end

local n = 1
local mode = 'rules-rec'
local echo = false
local time = false

local head = 1
while arg[head] ~= nil and string.sub(arg[head], 1, 1) == '-' do
    if arg[head] == '-n' then
        n = tonumber(arg[head + 1])
        head = head + 2
    elseif arg[head] == '-e' then
        echo = true
        head = head + 1
    elseif arg[head] == '-t' then
        time = true
        head = head + 1
    elseif arg[head] == '-m' then
        mode = arg[head + 1]
        head = head + 2
    else
        break
    end
end

local t1 = os.clock()
local p = parser.Parser(read(arg[head]))
local t2 = os.clock()
if time then
    -- print(string.format('grammar: %sms', math.floor((t2-t1)*1000)))
end

p.mode = mode

head = head + 1

local strs = {}

local lines = 0
local chars = 0
while arg[head] ~= nil do
    local file = arg[head]
    head = head + 1
    local data = read(file)
    lines = lines + line_count(data)
    chars = chars + string.len(data)
    strs[#strs + 1] = {
        file = file,
        data = data
    }
end

local t1 = os.clock()
for nth=1, n do
    for i=1, #strs do
        local ok, res = pcall(function()
            return p:parse(strs[i].data)
        end)
        if ok then
            if echo then
                print(tree.format(res))
            end
        else
            print('fail ' .. strs[i].file)
        end
    end
end
local t2 = os.clock()
if time then
    -- print(string.format('files: %sms', math.floor((t2-t1)*1000)))
    print(string.format('%s ln/s', math.floor(lines*n/(t2-t1))))
end
