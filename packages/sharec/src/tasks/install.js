const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
const { installConfig } = require('../core/configs/install')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const { processPackageJson } = require('../core/package/install')

async function install({ configsPath, targetPath, options }) {
  const fullConfigsPath = path.join(configsPath, './configs')
  const configs = await collectConfigsPaths(fullConfigsPath)
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (metaData && metaData.injected) {
    throw new Error('Configs already installed!')
  }

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
  await processPackageJson(fullConfigsPath, targetPath)
}

module.exports = install
