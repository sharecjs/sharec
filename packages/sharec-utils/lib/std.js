// @ts-check
const nativeFS = require('fs')
const { promisify } = require('util')

module.exports = {
  readdir: promisify(nativeFS.readdir),
  makedir: promisify(nativeFS.mkdir),
  readFile: promisify(nativeFS.readFile),
  copyFile: promisify(nativeFS.copyFile),
  writeFile: promisify(nativeFS.writeFile),
  lstat: promisify(nativeFS.lstat),
  removeFile: promisify(nativeFS.unlink),
}
