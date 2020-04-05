const { map } = require('../../actions')
const { commitlintJson } = require('./schema')
const { createJsonPipe, createYamlPipe } = require('../../helpers/pipes')

const commitlintJsonPipe = createJsonPipe(commitlintJson)
const commitlintYamlPipe = createYamlPipe(commitlintJson)

const commitlintPipe = map(
  ['.commitlintrc.json', commitlintJsonPipe],
  ['.commitlintrc.yaml', commitlintYamlPipe],
  ['.commitlintrc.yml', commitlintYamlPipe],
)

module.exports = {
  pipe: commitlintPipe,
}
