const path = require('path')
const {
  readFile,
  readDir,
  lstat,
  normalizePathSlashes,
} = require('../../utils/fs')

const collectConfigVersion = async configsPath => {
  const configPackageJsonPath = path.resolve(configsPath, 'package.json')
  const rawConfigsPackageJson = await readFile(configPackageJsonPath, 'utf8')
  const { version } = JSON.parse(rawConfigsPackageJson)

  return version
}

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
  collectConfigVersion,
  collectConfigsPaths,
}
