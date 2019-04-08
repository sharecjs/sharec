const fs = require('fs')
const childProcess = require('child_process')
const { promisify } = require('util')

const readDir = promisify(fs.readdir)
const readFile = promisify(fs.readFile)
const copyFile = promisify(fs.copyFile)
const writeFile = promisify(fs.writeFile)
const exec = promisify(childProcess.exec)

module.exports = {
  readDir,
  readFile,
  copyFile,
  writeFile,
  exec,
}
