const flow = require('lodash/flow')
const { map } = require('../../actions')
const { babelJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const babelJsonPipe = flow(
  fromJson,
  babelJson,
  input => JSON.stringify(input, null, 2),
)

const babelPipe = map(['.babelrc', babelJsonPipe], ['.babelrc.json', babelJsonPipe], ['babelrc.json', babelJsonPipe])

module.exports = {
  pipe: babelPipe,
}
