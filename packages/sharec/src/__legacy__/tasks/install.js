const path = require('path')
const { installConfig } = require('../core/configs/install')
const { installPackageJson, injectMeta } = require('../core/package/install')

/**
 * @param {Object} options.installedMeta
 * @param {Object} options.upcomingMeta
 * @param {String} options.configsPath
 * @param {String} options.targetPath
 * @param {Object} options.options
 * @param {String[]} options.configs
 * @param {Boolean} [options.overwrite]
 * @returns {Promise}
 */
async function install({
  installedMeta,
  upcomingMeta,
  configsPath,
  targetPath,
  configs = [],
  overwrite = false,
}) {
  const fullConfigsPath = path.join(configsPath, './configs')

  if (configs.includes('package.json')) {
    await installPackageJson({
      configsPath: fullConfigsPath,
      installedMeta,
      upcomingMeta,
      targetPath,
      overwrite,
    })
  }

  for (const configPath of configs) {
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

  await injectMeta({
    meta: upcomingMeta,
    targetPath,
  })
}

module.exports = install
