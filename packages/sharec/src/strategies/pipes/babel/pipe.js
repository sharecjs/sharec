const { map } = require('../../actions')
const { babelJson } = require('./schema')

const babelPipe = map(
  ['.babelrc', babelJson],
  ['.babelrc.json', babelJson],
  ['babelrc.json', babelJson],
)

module.exports = babelPipe
