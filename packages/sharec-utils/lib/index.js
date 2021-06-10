const format = require('./format')
const fs = require('./fs')
const map = require('./map')
const std = require('./std')

/**
 * @typedef {object} FormattingRules
 * @property {'space' | 'tab'} [indentType]
 * @property {number} [indentSize]
 * @property {boolean} [eof]
 */

/**
 * @typedef {{ [x: string]: FormattingRules }} MappedFormattingRules
 */

module.exports = {
  format,
  fs,
  map,
  std,
}
