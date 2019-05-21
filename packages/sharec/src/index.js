const ora = require('ora')
const collect = require('./core/collector')
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
    const collectedConfigs = await collect(configsPath, targetPath)
    spinner.start('applying configuration 🚀')

    await execute(configsPath, targetPath, collectedConfigs)
    spinner.succeed('configuration applyed, have a nice time! 🌈')
  } catch (err) {
    console.log(err)
    spinner.fail('something went wrong! 😞')
  }
}

module.exports = sharec
