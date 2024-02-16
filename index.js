
import {Parser} from 'temper-earley/parser';

const parser = new Parser(`

start: topLevel*

topLevel: decorator? varDecl

varDecl: ("export" | "public" | "private" | "static" | "get" | "set" | "var" | "let" | "const")* ident ("="! "3")? ";"!

expr: logic...

logic: logic ("&&" | "||") cmp | cmp...

cmp: add ("<" | ">" | "<=" | ">=" | "==" | "!=") add | add...

add: add [+-] mul | add...

mul: mul [*/%] pow | mul...

pow: single "**" pow | single...

single: ident... | number... | "(" expr... ")"

number: int... | float...

int: INT

float: FLOAT

ident: CNAME

FLOAT: INTEGER "." INTEGER
INT: "0"
    | "-" [123456789] DIGIT*
    | [123456789] DIGIT*

ignore: WHITESPACE

`);

console.log(parser.parse(`

    let x;

`).toString());
