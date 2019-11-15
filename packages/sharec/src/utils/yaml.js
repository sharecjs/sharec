const yaml = require('js-yaml')
const isEmpty = require('lodash/isEmpty')

const hasDoubleQuotes = data => /"/.test(data)

const fromYaml = data => yaml.safeLoad(data)

const toYaml = data => {
  if (isEmpty(data)) return ''

  return yaml.safeDump(data)
}

const transformYAMLInput = (...args) => args.map(arg => fromYaml(arg))

module.exports = {
  hasDoubleQuotes,
  fromYaml,
  toYaml,
  transformYAMLInput,
}
