const ora = require('ora')
const installTask = require('../tasks/install')
const { collectConfigVersion } = require('../core/configs/collect')
const installedMessage = require('../messages/installed')

async function install({ configsPath, targetPath, options }) {
  const spinner = ora({
    text: 'applying configuration... 🚀',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()
  const configsVersion = await collectConfigVersion(configsPath)

  try {
    await installTask({ configsPath, targetPath, configsVersion, options })

    spinner.succeed('configuration applyed, have a nice time! 🌈')
    installedMessage()
  } catch (err) {
    const { message } = err

    if (message.includes('already installed')) {
      spinner.succeed('this version of configs already injected! 👍')
    } else if (message.includes('ENOENT')) {
      spinner.fail('configs directory was not found! ⛔️')
    } else {
      spinner.fail('unhandeled error! 💥')
      console.erorr(err)
    }
  }
}

module.exports = install
