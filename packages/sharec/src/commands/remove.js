const ora = require('ora')
const removeTask = require('../tasks/remove')

async function remove({ configsPath, targetPath }) {
  if (!configsPath || configsPath === targetPath) return

  const spinner = ora({
    text: 'removing configuration... 🗑',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()

  try {
    await removeTask({ configsPath, targetPath })

    spinner.succeed('configuration removed, have a nice time! 🌈')
  } catch (err) {
    const { message } = err

    if (message.includes('not installed')) {
      spinner.fail('configs is not injected! ⛔️')
    } else if (message.includes('ENOENT')) {
      spinner.fail('configs directory was not found! ⛔️')
    } else {
      spinner.fail('unhandeled error! 💥')
      console.error(err)
    }
  }
}

module.exports = remove
