// @ts-check
const get = require('lodash/get')
const detectIndent = require('detect-indent')
const minimatch = require('minimatch')
const { basename } = require('./std').path

/**
 * @typedef {import('./index').FormattingRules} FormattingRules
 * @typedef {import('./index').MappedFormattingRules} MappedFormattingRules
 */

/**
 * Returns true if given string contains tab indent
 * @param {string} str
 * @returns {boolean}
 */
const hasTabsIndent = (str) => detectIndent(str).type === 'tab'

/**
 * Returns true if given string containse space indent
 * @param {string} str
 * @returns {boolean}
 */
const hasSpacesIndent = (str) => detectIndent(str).type === 'space'

/**
 * Returns true if given string contains empty line at the end
 * @param {string} str
 * @returns {boolean}
 */
const hasEOF = (str) => /^\s*$/gm.test(str)

/**
 * Replaces all indents in string by tabs
 * @param {string} [str = '']
 * @returns {string}
 */
const indentWithTab = (str = '') => {
  const { type, indent } = detectIndent(str)

  if (type !== 'space') return str

  return str.replace(new RegExp(indent, 'gm'), '\t')
}

/**
 * Replaces all indents in string by spaces with given size
 * @param {string} [str = '']
 * @param {number} [size = 2]
 * @returns {string}
 */
const indentWithSpace = (str = '', size = 2) => {
  const { type, indent } = detectIndent(str)

  if (type !== 'tab') return str

  const newIndent = Array(size).fill(' ').join('')

  return str.replace(new RegExp(indent, 'gm'), newIndent)
}

/**
 * Formats string (probably file's content) with given formatting options
 * @param {Object} params
 * @param {string} params.filename
 * @param {string} params.content
 * @param {FormattingRules} [params.rules]
 * @returns {string}
 */
const applyFormat = ({ filename, content, rules }) => {
  const indentType = get(rules, 'indentType', 'space')
  const indentSize = get(rules, 'indentSize', 2)
  const eof = get(rules, 'eof', true)
  const isYaml = filename && /\.ya?ml/.test(filename)
  let result = content

  if (indentType === 'tab' && !isYaml) {
    result = indentWithTab(result)
  }

  if (indentType === 'space' || isYaml) {
    result = indentWithSpace(result, indentSize)
  }

  if (eof && !hasEOF(content)) {
    result += '\n'
  }

  return result
}

/**
 * @param {MappedFormattingRules} formats
 * @param {string} filename
 * @returns {FormattingRules|null}
 */
const getFormatByFilename = (formats, filename) => {
  if (formats['*']) return formats['*']

  const formatKey = Object.keys(formats).find((key) => {
    const fileBasename = basename(filename)

    return minimatch(fileBasename, key)
  })

  if (!formatKey) return null

  return formats[formatKey]
}

module.exports = {
  hasSpacesIndent,
  hasTabsIndent,
  hasEOF,
  indentWithSpace,
  indentWithTab,
  applyFormat,
  getFormatByFilename,
}
