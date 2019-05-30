const ora = require('ora')
const execute = require('./core/executor')

async function sharec(configsPath, options) {
  const targetPath = process.env.PWD

  if (configsPath === targetPath) return

  const spinner = ora({
    text: 'checking configuration 🔎',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()

  try {
    spinner.start('applying configuration 🚀')
    await execute(configsPath, targetPath)
    spinner.succeed('configuration applyed, have a nice time! 🌈')
  } catch (err) {
    console.log(err)
    spinner.fail('something went wrong! 😞')
  }
}

module.exports = sharec
