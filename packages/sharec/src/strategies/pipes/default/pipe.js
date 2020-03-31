const flow = require('lodash/flow')
const { map } = require('../../actions')
const { defaultJson } = require('./schema')
const { fromJson, toJson, fromYaml, toYaml } = require('../../helpers/pipes')

const defaultJsonPipe = flow(
  fromJson,
  defaultJson,
  toJson,
)
const defaultYamlPipe = flow(
  fromYaml,
  defaultJson,
  toYaml,
)

const defaultPipe = map([/\.json$/, defaultJsonPipe], [/\.ya?ml$/, defaultYamlPipe])

module.exports = {
  pipe: defaultPipe,
}
