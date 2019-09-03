const path = require('path')
const { collectConfigs } = require('../core/configs/collect')
const { cacheConfigs, loadCache } = require('../core/configs/cache')
const { installConfig } = require('../core/configs/install')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const { installPackageJson } = require('../core/package/install')

/**
 * @param {String} options.configsPath
 * @param {String} options.configsName
 * @param {String} options.configsVersion
 * @param {String} options.targetPath
 * @returns {Promise<void>}
 */
async function install({
  configsPath,
  configsName,
  configsVersion,
  targetPath,
}) {
  const fullConfigsPath = path.join(configsPath, './configs')
  const metaData = await getCurrentPackageJsonMetaData(targetPath)
  const configs = await collectConfigs(fullConfigsPath)

  await cacheConfigs({
    configsName,
    configsVersion,
    configs,
    targetPath,
  })

  if (Object.keys(configs).includes('package.json')) {
    await installPackageJson({
      configsPath: fullConfigsPath,
      configsName,
      configsVersion,
      targetPath,
    })
  }

  for (const configPath in configs) {
    if (/(package\.json)/.test(configPath)) return

    await installConfig({
      configSource: configs[configPath],
      configPath,
      targetPath,
    })
  }
}

module.exports = install
