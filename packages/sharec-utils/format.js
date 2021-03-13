// @ts-check
const get = require('lodash/get')
const detectIndent = require('detect-indent')
const minimatch = require('minimatch')
const { basename } = require('./std').path

/**
 * @typedef {import('../../types/FormattingRules').MappedFormattingRules} MappedFormattingRules
 * @typedef {import('../../types/FormattingRules').FormattingRules} FormattingRules
 */

/**
 * Returns true if given string contains tab indent
 * @param {String} str
 * @returns {Boolean}
 */
const hasTabsIndent = (str) => detectIndent(str).type === 'tab'

/**
 * Returns true if given string containse space indent
 * @param {String} str
 * @returns {Boolean}
 */
const hasSpacesIndent = (str) => detectIndent(str).type === 'space'

/**
 * Returns true if given string contains empty line at the end
 * @param {String} str
 * @returns {Boolean}
 */
const hasEOF = (str) => /^\s*$/gm.test(str)

/**
 * Replaces all indents in string by tabs
 * @param {String} [str = '']
 * @returns {String}
 */
const indentWithTab = (str = '') => {
  const { type, indent } = detectIndent(str)

  if (type !== 'space') return str

  return str.replace(new RegExp(indent, 'gm'), '\t')
}

/**
 * Replaces all indents in string by spaces with given size
 * @param {String} [str = '']
 * @param {Number} [size = 2]
 * @returns {String}
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
 * @param {String} params.filename
 * @param {String} params.content
 * @param {FormattingRules} [params.rules]
 * @returns {String}
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
 * @param {String} filename
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
