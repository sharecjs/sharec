const path = require('path')
const { readDir, readFile, lstat } = require('../utils/fs')

const collectConfigs = async (configsPath, subPath = '') => {
  const fullConfigsPath = !subPath
    ? configsPath
    : path.join(configsPath, subPath)
  const filesList = await readDir(fullConfigsPath)

  if (filesList.length === 0) return {}

  const files = {}

  for (const fileName of filesList) {
    const filePath = path.join(fullConfigsPath, fileName)
    const stats = await lstat(filePath)

    if (stats.isDirectory()) {
      const subDirectoryFiles = await collectConfigs(fullConfigsPath, fileName)

      Object.assign(files, subDirectoryFiles)
    } else {
      const file = await readFile(filePath, 'utf8')
      const fileKey = !subPath ? fileName : path.join(subPath, fileName)

      Object.assign(files, {
        [fileKey]: file,
      })
    }
  }

  return files
}

module.exports = {
  collectConfigs,
}
