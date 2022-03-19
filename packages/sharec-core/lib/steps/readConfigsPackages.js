// @ts-check
const { readFile } = require('sharec-utils').std
const { join, resolve } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const readConfigsPackages = async (input) => {
  const { targetPackage, targetPath } = input
  const { configs } = targetPackage.sharec
  const configPackages = []

  for (const config of configs) {
    const configPackagePath = resolve(targetPath, './node_modules', config)
    const configPackageJsonPath = join(configPackagePath, 'package.json')
    const rawConfigPackageJson = await readFile(configPackageJsonPath)
    const configPackageJson = JSON.parse(rawConfigPackageJson)
    const configPackageFilesPath = join(configPackagePath, './config')
    const configPackageFilteredFiles = await find(configPackageFilesPath, '**/*')
    const withoutLocks = configPackageFilteredFiles.filter((config) => !/(\.|-)lock/.test(config))
    const readedConfigs = {}

    for (const config of withoutLocks) {
      const configKey = config.replace(configPackageFilesPath, '').replace(/^\//, '')

      readedConfigs[configKey] = await readFile(config, 'utf8')
    }

    const configPackage = {
      name: config,
      version: configPackageJson.version,
      path: configPackagePath,
      configs: readedConfigs,
    }

    configPackages.push(configPackage)
  }

  input.configs = configPackages

  return input
}

module.exports = readConfigsPackages
