// @ts-check
const { map } = require('sharec-schema').actions
const { createJsonPipe, createYamlPipe } = require('sharec-schema').pipes
const { commitlintJson } = require('./schema')

const commitlintJsonPipe = createJsonPipe([commitlintJson])
const commitlintYamlPipe = createYamlPipe([commitlintJson])

const commitlintPipe = map(
  ['.commitlintrc.json', commitlintJsonPipe],
  ['.commitlintrc.yaml', commitlintYamlPipe],
  ['.commitlintrc.yml', commitlintYamlPipe],
)

module.exports = {
  pipe: commitlintPipe,
}
