const ora = require('ora')
const path = require('path')
const { execute } = require('./core/executor')
const { getCurrentPackageJsonMetaData } = require('./core/packageProcessor')
const { collectConfigsPaths } = require('./core/collector')

async function sharec(targetPath, configsPath, options) {
  if (configsPath === targetPath) return

  const spinner = ora({
    text: 'checking configuration 🔎',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()

  try {
    const fullConfigsPath = path.join(configsPath, './configs')
    const configs = await collectConfigsPaths(fullConfigsPath)
    const metaData = await getCurrentPackageJsonMetaData(targetPath)

    if (metaData && metaData.injected) {
      spinner.start('configs already injected! ✨')
      return
    }

    spinner.start('applying configuration 🚀')
    await execute(fullConfigsPath, targetPath, configs)
    spinner.succeed('configuration applyed, have a nice time! 🌈')
    console.info(
      [
        'sharec: for install injected dependencies run:',
        'npm i',
        'Have a nice time! – Your config 😉',
      ].join('\n'),
    )
  } catch (err) {
    spinner.fail('something went wrong! 😞')

    if (err.message.includes('ENOENT')) {
      throw new Error(
        'sharec: configs directory is not exists in your configuration package!',
      )
    } else {
      throw new Error(
        [
          'sharec: unexpected error:',
          err.message,
          'If it is potentially problem in sharec – feel free to open issue! 🙌',
        ].join('\n'),
      )
    }
  }
}

module.exports = sharec
