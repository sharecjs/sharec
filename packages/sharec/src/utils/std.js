const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const slash = require('slash')

const readDir = promisify(fs.readdir)
const makeDir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)
const lstat = promisify(fs.lstat)
const removeFile = promisify(fs.unlink)

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
    join: (...args) => slash(path.join(...args)),
    resolve: (...args) => slash(path.resolve(...args)),
    basename: (...args) => slash(path.basename(...args)),
    dirname: (...args) => slash(path.dirname(...args)),
  },
}
