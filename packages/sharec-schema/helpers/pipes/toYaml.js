// @ts-check

const last = require('lodash/last')
const { toYAML } = require('../../parsers/yaml')

/**
 * Transforms JSON-string to YAML-string
 * @param {string} input
 * @returns {string}
 */
const toYaml = (input) => {
  const yamlInput = toYAML(input)
  const yamlLines = yamlInput.split(/\n|\r\n/)
  const eof = last(yamlLines) === ''

  if (eof) {
    return yamlLines.slice(0, yamlLines.length - 1).join('\n')
  }

  return yamlInput
}

module.exports = toYaml
