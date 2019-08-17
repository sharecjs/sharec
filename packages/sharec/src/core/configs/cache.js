const path = require('path')
const { writeFile, safeMakeDir } = require('../../utils/fs')

/**
 * Configs sources mapped by files paths
 * @typedef {Object} ConfigsSources
 * @property {String} Config source in UTF8
 */

/**
 * @param {String} options.configsName
 * @param {String} options.configsVersion
 * @param {String} options.configPath
 * @param {String} options.configSource
 * @param {String} options.targetPath
 * @returns {Promise<void>}
 */
const cacheConfig = async ({
  configsName,
  configsVersion,
  configPath,
  configSource,
  targetPath,
}) => {
  const configsBackupPath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${configsName}/${configsVersion}`,
  )

  await safeMakeDir(configsBackupPath)

  const backupedConfigPath = path.join(configsBackupPath, configPath)

  await safeMakeDir(path.dirname(backupedConfigPath))
  await writeFile(backupedConfigPath, configSource, 'utf8')
}

/**
 * @param   {String} options.configsName
 * @param   {String} options.configsVersion
 * @param   {ConfigsSources} options.configs
 * @param   {String} targetPath
 * @returns {Promise<void>}
 */
const cacheConfigs = async ({
  configsName,
  configsVersion,
  configs = {},
  targetPath,
}) => {
  for (const configPath in configs) {
    await cacheConfig({
      configSource: configs[configPath],
      configPath,
      configsName,
      configsVersion,
      targetPath,
    })
  }
}

module.exports = {
  cacheConfig,
  cacheConfigs,
}
