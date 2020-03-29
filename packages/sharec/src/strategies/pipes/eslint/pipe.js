const flow = require('lodash/flow')
const { map } = require('../../actions')
const { eslintJson } = require('./schema')
const { fromJson, toJson, fromYaml, toYaml } = require('../../helpers/pipes')

const eslintJsonPipe = flow(
  fromJson,
  eslintJson,
  toJson,
)
const eslintYamlPipe = flow(
  fromYaml,
  eslintJson,
  toYaml,
)

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
