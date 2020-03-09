const { map } = require('../../actions')
const { eslintJson } = require('./schema')

const eslintPipe = map(
  ['.eslintrc', eslintJson],
  ['.eslintrc.json', eslintJson],
  ['eslintrc.json', eslintJson],
)

module.exports = eslintPipe
