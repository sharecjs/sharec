const ora = require('ora')
const path = require('path')
const { collectConfigsPaths } = require('../core/collector')
const { removeConfig } = require('../processors/configs')
const {
  getCurrentPackageJsonMetaData,
  clearPackageJson,
} = require('../processors/package')

async function remove({ configsPath, targetPath }) {
  if (!configsPath || configsPath === targetPath) return

  const spinner = ora({
    text: 'checking configuration 🔎',
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
  }).start()
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (!metaData || !metaData.injected) {
    spinner.fail('configs is not injected! ⛔️')
    return
  }

  const fullConfigsPath = path.join(configsPath, './configs')
  let configs = null

  try {
    configs = await collectConfigsPaths(fullConfigsPath)
  } catch (err) {
    spinner.fail('configs directory was not found! ⛔️')
    return
  }
  spinner.start('removing configuration 🗑')

  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  await Promise.all(
    standaloneConfigs.map(configPath =>
      removeConfig({
        configsPath: fullConfigsPath,
        filePath: configPath,
        targetPath,
      }),
    ),
  )
  const modifiedDeps = await clearPackageJson(fullConfigsPath, targetPath)

  if (modifiedDeps) {
    const depsModificationMessage = [
      'some dependencies were not removed because have been modified by user:\n',
    ]

    depsModificationMessage.push(
      ...Object.keys(modifiedDeps).map(key => `${key}   ${modifiedDeps[key]}`),
    )

    spinner.warn(depsModificationMessage.join('\n'))
  } else {
    spinner.succeed('configuration removed, have a nice time! 🌈')
  }

  console.info(
    ['sharec: for update dependencies run:', 'npm i', 'Have a nice time!'].join(
      '\n',
    ),
  )
}

module.exports = remove
