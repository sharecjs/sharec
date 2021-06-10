// @ts-check
const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const slash = require('slash')

// @ts-nocheck
const readDir = promisify(fs.readdir)
const makeDir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)
const lstat = promisify(fs.lstat)
const removeFile = promisify(fs.unlink)
// @ts-check

module.exports = {
  fs: {
    readDir,
    makeDir,
    readFile,
    copyFile,
    writeFile,
    lstat,
    removeFile,
  },

  // replacement of standard path utilities, but with slashes unification
  path: {
    /**
     * Original node `path.join`, but with normalized slashes
     * @param {String} p
     * @param {...String} parts
     * @returns {String}
     */
    join: (p, ...parts) => slash(path.join(p, ...parts)),
    /**
     * Original node `path.resolve`, but with normalized slashes
     * @param {String} p
     * @param {...String} parts
     * @returns {String}
     */
    resolve: (p, ...parts) => slash(path.resolve(p, ...parts)),
    /**
     * Original node `path.basename`, but with normalized slashes
     * @param {String} p
     * @param {String=} ext
     * @returns {String}
     */
    basename: (p, ext) => slash(path.basename(p, ext)),
    /**
     * Original node `path.dirname`, but with normalized slashes
     * @param {String} p
     * @returns {String}
     */
    dirname: (p) => slash(path.dirname(p)),
  },
}
