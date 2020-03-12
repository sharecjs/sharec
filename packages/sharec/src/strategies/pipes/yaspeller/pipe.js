const { map } = require('../../actions')
const { yaspellerJson } = require('./schema')

const yaspellerPipe = map(
  ['.yaspellerrc', yaspellerJson],
  ['.yaspeller.json', yaspellerJson],
)

module.exports = yaspellerPipe
