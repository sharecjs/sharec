// @ts-check
const { readFile } = require('sharec-utils').std
const { join } = require('sharec-utils').path
const { find } = require('sharec-utils').fs

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const readConfigsPackages = async (context, semaphore) => {
  semaphore.start('Looking for configs')

  const { targetPackage, targetPath } = context
  const { configs = [] } = targetPackage.sharec || {}
  const configPackages = []

  if (configs.length === 0) {
    semaphore.warn("There aren't any config to install!")

    return context
  }

  semaphore.success(`Found ${configs.length} configs`)

  for (const config of configs) {
    semaphore.start(`Reading ${config}`)

    try {
      const configPackagePath = join(targetPath, './node_modules', config)
      const configPackageJsonPath = join(configPackagePath, 'package.json')
      const rawConfigPackageJson = await readFile(configPackageJsonPath, 'utf8')
      const configPackageJson = JSON.parse(rawConfigPackageJson)
      const configPackageFilesPath = join(configPackagePath, './configs')
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

      semaphore.success(`${config} has been loaded`)

      configPackages.push(configPackage)
    } catch (err) {
      semaphore.error(`${config} hasn't been loaded`)
    }
  }

  context.configs = configPackages

  return context
}

module.exports = readConfigsPackages
