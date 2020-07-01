const { map } = require('../../actions')
const { prettierJson } = require('./schema')
const { createJsonPipe, createYamlPipe } = require('../../helpers/pipes')

const prettierJsonPipe = createJsonPipe(prettierJson)
const prettierYamlPipe = createYamlPipe(prettierJson)

const stylelintPipe = map(
  ['.prettierrc', prettierJsonPipe],
  ['.prettierrc.json', prettierJsonPipe],
  ['.prettierrc.yml', prettierYamlPipe],
  ['.prettierrc.yaml', prettierYamlPipe],
)

module.exports = {
  pipe: stylelintPipe,
}
