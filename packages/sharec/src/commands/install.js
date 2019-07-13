const ora = require('ora')
const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
// const { backupConfigs } = require('../core/backuper')
const { installConfig } = require('../core/configs/install')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const { processPackageJson } = require('../core/package/install')

async function install({ configsPath, targetPath, options, version }) {
  const spinner = ora({
    text: 'checking configuration 🔎',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()
  const fullConfigsPath = path.join(configsPath, './configs')
  let configs = null

  try {
    configs = await collectConfigsPaths(fullConfigsPath)
  } catch (err) {
    spinner.fail('configs directory was not found! ⛔️')
    return
  }

  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (metaData && metaData.injected) {
    spinner.succeed('configs already injected! ✨')
    return
  }

  // TODO: return that or remove
  // spinner.start('backuping origin configs 💾')
  // await backupConfigs({
  //   targetPath,
  //   configs,
  // })
  spinner.start('applying configuration 🚀')

  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  await Promise.all(
    standaloneConfigs.map(configPath =>
      installConfig({
        configsPath: fullConfigsPath,
        filePath: configPath,
        targetPath,
      }),
    ),
  )
  await processPackageJson(configsPath, targetPath)
  spinner.succeed('configuration applyed, have a nice time! 🌈')

  console.info(
    [
      'sharec: for install injected dependencies run:',
      'npm i',
      'Have a nice time!',
    ].join('\n'),
  )
}

module.exports = install
