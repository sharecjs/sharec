const installTask = require('../tasks/install')
const { collectConfigPackageInfo } = require('../core/configs/collect')
const { extractMetaData } = require('../core/package/extract')
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
  const meta = await extractMetaData(targetPath)
  const isSilentMode = options.silent || (meta && meta.version === version)
  const spinner = createSpinner({
    text: 'applying configuration...',
    silent: isSilentMode,
  })

  spinner.start()

  try {
    await installTask({
      configsName: name,
      configsVersion: version,
      configsPath,
      targetPath,
      options,
    })

    spinner.succeed('configuration applyed, have a nice time!')

    if (isSilentMode) {
      installedMessage()
    }
  } catch (err) {
    const { message } = err

    if (message.includes('already installed')) {
      spinner.succeed('this version of configs already injected!')
    } else if (message.includes('ENOENT')) {
      spinner.fail('configs directory was not found!')
    } else {
      spinner.fail('unhandeled error!')
      console.error(err)
    }
  }
}

module.exports = install
