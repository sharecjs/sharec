const flow = require('lodash/flow')
const { map } = require('../../actions')
const { yaspellerJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const yaspellerJsonPipe = flow(
  fromJson,
  yaspellerJson,
  input => JSON.stringify(input, null, 2),
)

const yaspellerPipe = map(['.yaspellerrc', yaspellerJsonPipe], ['.yaspeller.json', yaspellerJsonPipe])

module.exports = {
  pipe: yaspellerPipe,
}
