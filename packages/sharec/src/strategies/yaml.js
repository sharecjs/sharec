const yaml = require('js-yaml')

const fromYaml = data => yaml.safeLoad(data)

const toYaml = data => yaml.safeDump(data)

module.exports = {
  fromYaml,
  toYaml,
}
