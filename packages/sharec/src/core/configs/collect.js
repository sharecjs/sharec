const path = require('path')
const {
  readFile,
  readDir,
  lstat,
  normalizePathSlashes,
} = require('../../utils/fs')

const collectConfigPackageInfo = async configsPath => {
  const configPackageJsonPath = path.resolve(configsPath, 'package.json')
  const rawConfigsPackageJson = await readFile(configPackageJsonPath, 'utf8')
  const { name, version } = JSON.parse(rawConfigsPackageJson)

  return { name, version }
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

  return files.filter(file => !/(\.?lock)(\S+)?$/.test(file))
}

const collectConfigs = async configsPath => {
  const configsPaths = await collectConfigsPaths(configsPath)
  const collectedConfigs = {}

  for (const configPath of configsPaths) {
    const configFullPath = path.join(configsPath, configPath)
    const configSource = await readFile(configFullPath, 'utf8')

    Object.assign(collectedConfigs, {
      [configPath]: configSource,
    })
  }

  return collectedConfigs
}

module.exports = {
  collectConfigPackageInfo,
  collectConfigsPaths,
  collectConfigs,
}
