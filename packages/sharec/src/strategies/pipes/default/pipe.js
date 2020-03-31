const { map } = require('../../actions')
const { defaultJson } = require('./schema')
const { createJsonPipe, createYamlPipe } = require('../../helpers/pipes')

const defaultJsonPipe = createJsonPipe(defaultJson)
const defaultYamlPipe = createYamlPipe(defaultJson)

const defaultPipe = map([/\.json$/, defaultJsonPipe], [/\.ya?ml$/, defaultYamlPipe])

module.exports = {
  pipe: defaultPipe,
}
