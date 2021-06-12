// @ts-check
const nativePath = require('path')
const slash = require('slash')

/**
 * Original node `path.join`, but with normalized slashes
 * @param {String} p
 * @param {...String} parts
 * @returns {String}
 */
const join = (p, ...parts) => slash(nativePath.join(p, ...parts))

/**
 * Original node `path.resolve`, but with normalized slashes
 * @param {String} p
 * @param {...String} parts
 * @returns {String}
 */
const resolve = (p, ...parts) => slash(nativePath.resolve(p, ...parts))

/**
 * Original node `path.basename`, but with normalized slashes
 * @param {String} p
 * @param {String=} ext
 * @returns {String}
 */
const basename = (p, ext) => slash(nativePath.basename(p, ext))

/**
 * Original node `path.dirname`, but with normalized slashes
 * @param {String} p
 * @returns {String}
 */
const dirname = (p) => slash(nativePath.dirname(p))

module.exports = {
  join,
  resolve,
  basename,
  dirname,
}
