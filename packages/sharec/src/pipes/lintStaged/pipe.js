const { map } = require('sharec-schema').actions
const { lintStagedJson } = require('./schema')
const { createJsonPipe } = require('sharec-schema').pipes

const lintStagedJsonPipe = createJsonPipe(lintStagedJson)

const lintStagedPipe = map(['.lintstagedrc', lintStagedJsonPipe])

module.exports = {
  pipe: lintStagedPipe,
}
