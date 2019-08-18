const path = require('path')
const { readFile } = require('../../utils/std').fs
const { flatSearch } = require('../../utils/fs')

const collectConfigPackageInfo = async configsPath => {
  const configPackageJsonPath = path.resolve(configsPath, 'package.json')
  const rawConfigsPackageJson = await readFile(configPackageJsonPath, 'utf8')
  const { name, version } = JSON.parse(rawConfigsPackageJson)

  return { name, version }
}

const collectConfigs = async configsPath => {
  const configsPaths = await flatSearch({
    path: configsPath,
    pattern: /^((?!lock).)*$/,
  })
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
  collectConfigs,
}
