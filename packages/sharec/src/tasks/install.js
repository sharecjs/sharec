const path = require('path')
const { collectConfigs } = require('../core/configs/collect')
const { installConfig } = require('../core/configs/install')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const { installPackageJson } = require('../core/package/install')

async function install({ configsPath, targetPath, configsVersion, options }) {
  const fullConfigsPath = path.join(configsPath, './configs')
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (metaData && metaData.version === configsVersion) {
    throw new Error('Configs already installed!')
  }

  const configs = await collectConfigs(fullConfigsPath)

  if (Object.keys(configs).includes('package.json')) {
    await installPackageJson({
      configsPath: fullConfigsPath,
      configsVersion,
      targetPath,
    })
  }

  for (const configPath in configs) {
    if (/(package\.json)/.test(configPath)) return

    await installConfig({
      configSource: configs[configPath],
      configPath,
      targetPath,
    })
  }
}

module.exports = install
