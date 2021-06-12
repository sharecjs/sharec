// @ts-check
const { map } = require('sharec-schema').actions
const { defaultJson } = require('./schema')
const { createJsonPipe, createYamlPipe } = require('sharec-schema').pipes

const defaultJsonPipe = createJsonPipe([defaultJson])
const defaultYamlPipe = createYamlPipe([defaultJson])

const defaultPipe = map([/\.json$/, defaultJsonPipe], [/\.ya?ml$/, defaultYamlPipe])

module.exports = {
  pipe: defaultPipe,
}
