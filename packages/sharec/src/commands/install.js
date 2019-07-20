const createSpinner = require('../messages/spinner')
const installTask = require('../tasks/install')
const { collectConfigVersion } = require('../core/configs/collect')
const { extractMetaData } = require('../core/package/extract')
const installedMessage = require('../messages/installed')

async function install({ configsPath, targetPath, options = {} }) {
  const configsVersion = await collectConfigVersion(configsPath)
  const meta = await extractMetaData(targetPath)
  const isSilentMode =
    options.silent || (meta && meta.version === configsVersion)
  const spinner = createSpinner({
    text: 'applying configuration... 🚀',
    silent: isSilentMode,
  })

  spinner.start()

  try {
    await installTask({ configsPath, targetPath, configsVersion, options })

    spinner.succeed('configuration applyed, have a nice time! 🌈')

    if (isSilentMode) {
      installedMessage()
    }
  } catch (err) {
    const { message } = err

    if (message.includes('already installed')) {
      spinner.succeed('this version of configs already injected! 👍')
    } else if (message.includes('ENOENT')) {
      spinner.fail('configs directory was not found! ⛔️')
    } else {
      spinner.fail('unhandeled error! 💥')
      console.error(err)
    }
  }
}

module.exports = install
