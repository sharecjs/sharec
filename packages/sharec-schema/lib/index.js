const actions = require('./actions')
const atoms = require('./atoms')
const helpers = require('./helpers')
const parsers = require('./parsers')

/**
 * @typedef {Map<string, any>} ParsedCommand
 * @property {string[]} env
 * @property {string[]} args
 * @property {string} [separator]
 */

/**
 * @template T
 * @typedef {Map<string, T>} SchemaParam
 */

/**
 * @template T
 * @typedef {object} SchemaParams
 * @property {T} [current]
 * @property {T} [upcoming]
 * @property {T} [cached]
 * @property {T} [result]
 */

/**
 * @typedef {{ [x: string]: any }} Schema
 * @property {string[]} [$$ignore]
 * @property {Function} [$$default]
 */

/**
 * @typedef {(string|number|boolean)} Primitive
 */

/**
 * @template T
 * @typedef {[string, T]} Pair
 */

/**
 * @typedef {(Primitive|{ [x: string]: any } | any[])} Rule
 */

module.exports = {
  actions,
  atoms,
  helpers,
  parsers,
}
