// @ts-check
const { readFile } = require('sharec-utils').std
const { join, resolve } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const readConfigsPackages = async (context) => {
  const { targetPackage, targetPath } = context
  const { configs = [] } = targetPackage.sharec
  const configPackages = []

  if (configs.length === 0) {
    // TODO
    throw new Error('')
  }

  for (const config of configs) {
    const configPackagePath = resolve(targetPath, './node_modules', config)
    const configPackageJsonPath = join(configPackagePath, 'package.json')
    const rawConfigPackageJson = await readFile(configPackageJsonPath, 'utf8')
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

  context.configs = configPackages

  return context
}

module.exports = readConfigsPackages
