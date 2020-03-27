const path = require('path')
const isEqual = require('lodash/isEqual')
const installTask = require('../tasks/install')
const removeTask = require('../tasks/remove')
const {
  getCurrentPackageJsonMetaData,
  getUpcomingPackageJsonMetaData,
} = require('../core/package/extract')
const { collectConfigsPaths } = require('../core/configs/collect')
const createSpinner = require('../cli/spinner')
const installedMessage = require('../cli/messages')

/**
 * @param {String} options.configsPath
 * @param {String} options.targetPath
 * @param {Object} options.options
 * @param {Boolean} [options.overwrite]
 * @returns {Promise<void>}
 */
async function install({ configsPath, targetPath, options = {} }) {
  const isSilentMode = options.silent
  const spinner = createSpinner({
    text: 'preparing...',
    silent: isSilentMode,
  }).start()
  const fullConfigsPath = path.join(configsPath, './configs')
  const configs = await collectConfigsPaths(fullConfigsPath)

  if (configs.length === 0) {
    spinner.fail(
      'configs directory is not present in upcoming configuration package!',
    )
    return
  }

  const upcomingMeta = await getUpcomingPackageJsonMetaData(configsPath)
  const installedMeta = await getCurrentPackageJsonMetaData(targetPath)
  const isOldMeta = installedMeta && !installedMeta.config
  const isMetaMatched = installedMeta && isEqual(installedMeta, upcomingMeta)

  if (!isOldMeta && isMetaMatched) {
    spinner.succeed('this version of configs already injected')
    return
  }

  if (installedMeta && (!isMetaMatched || isOldMeta)) {
    spinner.frame('removing previous insatlled configuration...')

    await removeTask({
      configsPath,
      targetPath,
    })

    spinner.succeed('previously insatalled configuration removed!')
  }

  spinner.frame('applying configuration...')

  try {
    await installTask({
      installedMeta,
      upcomingMeta,
      configsPath,
      targetPath,
      configs,
      overwrite: options.overwrite,
    })

    spinner.succeed('configuration applyed, have a nice time!')

    if (isSilentMode) return
    if (!isMetaMatched || isOldMeta) installedMessage()
  } catch (err) {
    spinner.fail('unhandeled error')
    console.error(err)
  }
}

module.exports = install
