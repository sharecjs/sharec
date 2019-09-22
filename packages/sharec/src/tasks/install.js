const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
const { installConfig } = require('../core/configs/install')
const { installPackageJson } = require('../core/package/install')

/**
 * @param {Object} options.installedMeta
 * @param {Object} options.upcomingMeta
 * @param {String} options.configsPath
 * @param {String} options.targetPath
 * @param {Object} options.options
 * @param {Boolean} [options.overwrite]
 * @returns {Promise}
 */
async function install({
  installedMeta,
  upcomingMeta,
  configsPath,
  targetPath,
  overwrite = false,
}) {
  const fullConfigsPath = path.join(configsPath, './configs')
  const collectedConfigsPaths = await collectConfigsPaths(fullConfigsPath)

  if (collectedConfigsPaths.includes('package.json')) {
    await installPackageJson({
      configsPath: fullConfigsPath,
      installedMeta,
      upcomingMeta,
      targetPath,
      overwrite,
    })
  }

  for (const configPath of collectedConfigsPaths) {
    if (!/(package\.json)/.test(configPath)) {
      await installConfig({
        configsPath: fullConfigsPath,
        configPath,
        installedMeta,
        upcomingMeta,
        targetPath,
        overwrite,
      })
    }
  }
}

module.exports = install
