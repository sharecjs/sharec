const detectIndent = require('detect-indent')
const minimatch = require('minimatch')
const { basename } = require('../utils/std').path

/**
 * @typedef {Object} Format
 * @property {Number} indentSize
 * @property {String} indentType
 * @property {Boolean} eof
 */

/**
 * @typedef {{ [x: String]: Format }} Formats
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
 * @returns {Boolean}
 */
const indentWithSpace = (str = '', size = 2) => {
  const { type, indent } = detectIndent(str)

  if (type !== 'tab') return str

  const newIndent = Array(size).fill(' ').join('')

  return str.replace(new RegExp(indent, 'gm'), newIndent)
}

/**
 * Formats string (probably file's content) with given formatting options
 * @param {String} str
 * @param {Format} [format = {}]
 * @returns {String}
 */
const applyFormat = (str, format = {}) => {
  const { indentType = 'space', indentSize = 2, eof = true } = format
  let result = str

  if (indentType === 'tab') {
    result = indentWithTab(result)
  }

  if (indentType === 'space') {
    result = indentWithSpace(result, indentSize)
  }

  if (eof && !hasEOF(str)) {
    result += '\n'
  }

  return result
}

/**
 * @param {Formats} formats
 * @param {String} filename
 * @returns {Format|null}
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
