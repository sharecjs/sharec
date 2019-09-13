const installTask = require('../tasks/install')
const removeTask = require('../tasks/remove')
const {
  getCurrentPackageJsonMetaData,
  getUpcomingPackageJsonMetaData,
} = require('../core/package/extract')
const createSpinner = require('../cli/spinner')
const installedMessage = require('../cli/messages')

/**
 * @param {String} options.configsPath
 * @param {String} options.targetPath
 * @param {Object} options
 * @returns {Promise<void>}
 */
async function install({ configsPath, targetPath, options = {} }) {
  const upcomingMeta = await getUpcomingPackageJsonMetaData(configsPath)
  const installedMeta = await getCurrentPackageJsonMetaData(targetPath)

  const isSilentMode = options.silent
  const isMetaMatched =
    installedMeta && installedMeta.version === upcomingMeta.version
  const spinner = createSpinner({
    text: 'preparing...',
    silent: isSilentMode,
  }).start()

  if (isMetaMatched) {
    spinner.succeed('this version of configs already injected')
    return
  }

  if (installedMeta && !isMetaMatched) {
    spinner.frame('removing previous insatlled configuration...')

    await removeTask({
      configsPath,
      targetPath,
    })

    spinner.succeed('previously insatalled configuration removed!')
    return
  }

  spinner.frame('applying configuration...')

  try {
    await installTask({
      installedMeta,
      upcomingMeta,
      configsPath,
      targetPath,
      options,
    })

    spinner.succeed('configuration applyed, have a nice time!')

    if (!isMetaMatched && !isSilentMode) {
      installedMessage()
    }
  } catch (err) {
    const { message } = err

    if (message.includes('ENOENT')) {
      spinner.fail('configs directory was not found')
    } else {
      spinner.fail('unhandeled error')
      console.error(err)
    }
  }
}

module.exports = install
