const { map } = require('../../actions')
const { lintStagedJson } = require('./schema')

const lintStagedPipe = map(['.lintstagedrc', lintStagedJson])

module.exports = lintStagedPipe
