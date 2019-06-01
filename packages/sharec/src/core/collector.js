const path = require('path')
const slash = require('slash')
const { readDir, lstat } = require('../utils/fs')

const normalizePathSlashes = paths => paths.map(el => slash(el))

const collectConfigsPaths = async (configsPath, subPath = '') => {
  const fullConfigsPath = !subPath
    ? configsPath
    : path.join(configsPath, subPath)
  const filesList = await readDir(fullConfigsPath)

  if (filesList.length === 0) return []

  const files = []

  for (const fileName of filesList) {
    const filePath = path.join(fullConfigsPath, fileName)
    const stats = await lstat(filePath)

    if (stats.isDirectory()) {
      const subDirectoryFiles = await collectConfigsPaths(
        fullConfigsPath,
        fileName,
      )

      files.push(...normalizePathSlashes(subDirectoryFiles))
    } else {
      const fileKey = !subPath ? fileName : path.join(subPath, fileName)

      files.push(...normalizePathSlashes([fileKey]))
    }
  }

  return files
}

module.exports = {
  normalizePathSlashes,
  collectConfigsPaths,
}
