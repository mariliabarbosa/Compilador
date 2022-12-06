module.exports = function parser(tokens){
    let current = 0;
    let body = []

    while(current < tokens.length){
        let token = tokens[current];
        if (token.type === 'number') {
            current++;
            body.push({
              type: 'NumberLiteral',
              value: token.value
            });
            continue;
        }
        if (token.type === 'pipe' ) {
            firstParam = body.splice(--current, ++current);
            token = tokens[++current];
            
            let expression = { 
                type: 'CallExpression',
                name: token.value,
                params: firstParam
            }

            current++;
            body.push(expression);
            continue;
        }
        if (token.type === 'paren' && token.value === '(') {
            current++;
            continue;
        }
        if (token.type === 'paren' && token.value === ')') {
            let param = body.pop()
            let expression = body[body.length-1]

            if(expression.type == "CallExpression"){
                expression = body.pop();

                expression.params.push(param)

                body.push(expression)
            }
            current++;
            continue;
        }
        if(token.type === 'name'){
            current++;
            continue;
        }
        throw new TypeError(`Unknown token: '${JSON.stringify(token)}'`);
    }
    
    const ast = {
        type: 'Program',
        body
    };

    return ast;
}