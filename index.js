
import {Parser} from 'temper-earley/parser';
import {format} from 'temper-earley/tree';

const parser = new Parser(`

start: (topLevel ";"!)* expr?

blockBody: (topLevel ";"!)* expr?

topLevel?: varDecl | expr | returnStmt

returnStmt: "return"! expr?

varDecl: ("export" | "public" | "private" | "static" | "get" | "set" | "var" | "let" | "const")+ ident ("="! expr)?

expr?: logic

logic : logic ("&&" | "||") cmp -> binary
logic?: cmp

cmp: add ("<" | ">" | "<=" | ">=" | "==" | "!=") add -> binary
cmp?: add

add: add [+-] mul -> binary
add?: mul

mul: mul [*/%] pow -> binary
mul?: pow

pow: prefix "**" pow -> binary
pow?: prefix

prefix: [-+] postfix -> unary
prefix?: postfix

postfix: postfix "["! expr "]"! -> index
postfix: postfix "."! ident -> dot
postfix: postfix args -> call
postfix: "new"! type args -> new
postfix?: single

args?: "("! (expr ","!)* expr? ")"! blockArg*
args?: blockArg+
blockArg: "{"! blockSig ";;"! blockBody "}"!

single?: ident | int | float | array | "("! expr ")"!

array: "["!  "]"!

blockSig: "("! (maybeTypedParam ","!)* maybeTypedParam? ")"! ":"! type
blockSig: "("! (maybeTypedParam ","!)* maybeTypedParam? ")"! -> blockSigAutoReturn

maybeTypedParam: ident ":"! type -> typedParam
maybeTypedParam: ident -> untypedParam

type: ident
type: ident "<"! (type ","!)* type? ">"! -> genericType 

int: INT

float: FLOAT

ident: CNAME

FLOAT: INT "." INT
INT: "0" | [123456789] DIGIT*

ignore: WHITESPACE

`);

const data = parser.parse(`

    var builder = new ListBuilder<Int>();
    builder.add(1);
    builder.add(2);
    var twice = builder.map { (x);;
        return x * 2;
    };
    console.log(twice[0]);

`);

console.log(format(data));
