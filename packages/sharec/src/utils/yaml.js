const yaml = require('js-yaml')

const fromYaml = data => yaml.safeLoad(data)

const toYaml = data => yaml.safeDump(data)

const transformInputToYAML = (...args) => args.map(arg => fromYaml(arg))

module.exports = {
  fromYaml,
  toYaml,
  transformInputToYAML,
}
