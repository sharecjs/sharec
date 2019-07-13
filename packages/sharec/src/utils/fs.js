const fs = require('fs')
const { promisify } = require('util')
const slash = require('slash')

const readDir = promisify(fs.readdir)
const makeDir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)
const lstat = promisify(fs.lstat)
const removeFile = promisify(fs.unlink)
const normalizePathSlashes = paths => paths.map(el => slash(el))

module.exports = {
  readDir,
  makeDir,
  readFile,
  copyFile,
  writeFile,
  lstat,
  removeFile,
  normalizePathSlashes,
}
