const yaml = require('js-yaml')
const isEmpty = require('lodash/isEmpty')

const fromYaml = data => yaml.safeLoad(data)

const toYaml = data => {
  if (isEmpty(data)) return ''

  return yaml.safeDump(data)
}

const transformInputToYAML = (...args) => args.map(arg => fromYaml(arg))

module.exports = {
  fromYaml,
  toYaml,
  transformInputToYAML,
}
