const flow = require('lodash/flow')
const { map } = require('../../actions')
const { lintStagedJson } = require('./schema')
const fromJson = require('../../helpers/pipes/fromJson')

const lintStagedJsonPipe = flow(
  fromJson,
  lintStagedJson,
  input => JSON.stringify(input, null, 2),
)

const lintStagedPipe = map(['.lintstagedrc', lintStagedJsonPipe])

module.exports = {
  pipe: lintStagedPipe,
}
