const { map } = require('../../actions')
const { lintStagedJson } = require('./schema')
const { createJsonPipe } = require('../../helpers/pipes')

const lintStagedJsonPipe = createJsonPipe(lintStagedJson)

const lintStagedPipe = map(['.lintstagedrc', lintStagedJsonPipe])

module.exports = {
  pipe: lintStagedPipe,
}
