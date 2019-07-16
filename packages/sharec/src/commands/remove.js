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
    const { deps } = await removeTask({ configsPath, targetPath })

    if (deps) {
      const depsModificationMessage = [
        'some dependencies were not removed because have been modified by user:',
      ]

      depsModificationMessage.push(
        ...Object.keys(deps).map(key => `${key}   ${deps[key]}`),
      )

      spinner.warn(depsModificationMessage.join('\n'))
    } else {
      spinner.succeed('configuration removed, have a nice time! 🌈')
    }

    console.info(
      [
        'sharec: for update dependencies run:',
        'npm i',
        'Have a nice time!',
      ].join('\n'),
    )
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
