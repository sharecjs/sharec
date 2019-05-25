const fs = require('fs')
const childProcess = require('child_process')
const { promisify } = require('util')

const readDir = promisify(fs.readdir)
const makeDir = promisify(fs.mkdir)
const readFile = promisify(fs.readFile)
const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)
const exec = promisify(childProcess.exec)

const pipe = (...funs) => (...args) =>
  funs.reduce((acc, fun, i) => (i === 0 ? fun(...args) : fun(acc)), null)

module.exports = {
  readDir,
  makeDir,
  readFile,
  copyFile,
  writeFile,
  exec,
  pipe,
}
