// @ts-check
const { map } = require('sharec-schema').actions
const { yaspellerJson } = require('./schema')
const { createJsonPipe } = require('sharec-schema').pipes

const yaspellerJsonPipe = createJsonPipe([yaspellerJson])

const yaspellerPipe = map(['.yaspellerrc', yaspellerJsonPipe], ['.yaspeller.json', yaspellerJsonPipe])

module.exports = {
  pipe: yaspellerPipe,
}
