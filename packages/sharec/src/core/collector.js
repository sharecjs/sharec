const path = require('path')
const { readDir, lstat } = require('../utils/fs')

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

      files.push(...subDirectoryFiles)
    } else {
      const fileKey = !subPath ? fileName : path.join(subPath, fileName)

      files.push(fileKey)
    }
  }

  return files
}

module.exports = {
  collectConfigsPaths,
}
