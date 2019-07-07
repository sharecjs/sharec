const ora = require('ora')
const path = require('path')
const { collectConfigsPaths } = require('../core/collector')
const { backupConfigs } = require('../core/backuper')
const { processConfig } = require('../processors/configs')
const {
  getCurrentPackageJsonMetaData,
  processPackageJson,
} = require('../processors/package')

async function install({ configsPath, targetPath, options }) {
  if (!configsPath || configsPath === targetPath) return

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

  spinner.start('backuping origin configs 💾')
  await backupConfigs({
    targetPath,
    configs,
  })
  spinner.start('applying configuration 🚀')

  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  await Promise.all(
    standaloneConfigs.map(configPath =>
      processConfig({
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
