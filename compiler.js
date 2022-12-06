const tokenizer = require('./tokenizer')
const parser = require('./parser')
const transformer = require('./transformer');
const generateCode = require('./generateCode');

module.exports = function compiler(input) {
    //Análise Léxica
    const tokens = tokenizer(input);
    //Análise Sintática
    const elixirAST = parser(tokens);
    //Análise Semântica
    const jsAST = transformer(elixirAST);
    //Geração de código
    const jsCode = generateCode(jsAST);
    return jsAST;
}