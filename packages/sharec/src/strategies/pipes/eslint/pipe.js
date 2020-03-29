const flow = require('lodash/flow')
const { map } = require('../../actions')
const { eslintJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const eslintJsonPipe = flow(
  fromJson,
  eslintJson,
  input => JSON.stringify(input, null, 2),
)

const eslintPipe = map(
  ['.eslintrc', eslintJsonPipe],
  ['.eslintrc.json', eslintJsonPipe],
  ['eslintrc.json', eslintJsonPipe],
)

module.exports = {
  pipe: eslintPipe,
}
