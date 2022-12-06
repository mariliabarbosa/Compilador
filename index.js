const compiler = require('./compiler')
const input = '1 |> add(2)'

const output = compiler(input)
console.log(output)