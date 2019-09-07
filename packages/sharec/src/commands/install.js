const installTask = require('../tasks/install')
const removeTask = require('../tasks/remove')
const { loadCache } = require('../core/configs/cache')
const { collectConfigPackageInfo } = require('../core/configs/collect')
const { extractMetaData } = require('../core/package/extract')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const createSpinner = require('../cli/spinner')
const installedMessage = require('../cli/messages')

/**
 * @param {String} options.configsPath
 * @param {String} options.targetPath
 * @param {Object} options
 * @returns {Promise<void>}
 */
async function install({ configsPath, targetPath, options = {} }) {
  const { name, version } = await collectConfigPackageInfo(configsPath)
  const meta = await getCurrentPackageJsonMetaData(targetPath)
  const cache = meta
    ? await loadCache({
        configsName: meta.config,
        configsVersion: meta.version,
        targetPath,
      })
    : {}
  const isSilentMode = options.silent
  const isMetaMatched = meta && meta.version === version
  const spinner = createSpinner({
    text: 'preparing...',
    silent: isSilentMode,
  }).start()

  if (isMetaMatched) {
    spinner.succeed('this version of configs already injected')
    return
  }
  spinner.frame('applying configuration...')

  try {
    await installTask({
      configsName: name,
      configsVersion: version,
      configsCache: cache,
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
