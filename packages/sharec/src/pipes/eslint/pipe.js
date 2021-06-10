const { map } = require('sharec-schema').actions
const { eslintJson } = require('./schema')
const { createJsonPipe, createYamlPipe } = require('sharec-schema').pipes

const eslintJsonPipe = createJsonPipe(eslintJson)
const eslintYamlPipe = createYamlPipe(eslintJson)

const eslintPipe = map(
  ['.eslintrc', eslintJsonPipe],
  ['.eslintrc.json', eslintJsonPipe],
  ['eslintrc.json', eslintJsonPipe],
  ['.eslintrc.yaml', eslintYamlPipe],
  ['.eslintrc.yml', eslintYamlPipe],
)

module.exports = {
  pipe: eslintPipe,
}
