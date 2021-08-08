// @ts-check
const { map } = require('sharec-schema').actions
const { createJsonPipe } = require('sharec-schema').pipes
const { babelJson } = require('./schema')

const babelJsonPipe = createJsonPipe([babelJson])

const babelPipe = map(['.babelrc', babelJsonPipe], ['.babelrc.json', babelJsonPipe], ['babelrc.json', babelJsonPipe])

module.exports = {
  pipe: babelPipe,
}
