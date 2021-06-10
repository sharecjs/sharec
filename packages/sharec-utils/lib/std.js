// @ts-check
const { readdir, mkdir, readFile, copyFile, writeFile, lstat, unlink } = require('fs')
const path = require('path')
const { promisify } = require('util')
const slash = require('slash')

module.exports = {
  fs: {
    readdir: promisify(readdir),
    makedir: promisify(mkdir),
    readFile: promisify(readFile),
    copyFile: promisify(copyFile),
    writeFile: promisify(writeFile),
    lstat: promisify(lstat),
    removeFile: promisify(unlink),
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
