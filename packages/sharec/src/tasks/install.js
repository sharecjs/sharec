const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
const { installConfig } = require('../core/configs/install')
const { installPackageJson } = require('../core/package/install')

async function install({
  installedMeta,
  upcomingMeta,
  configsPath,
  targetPath,
}) {
  const fullConfigsPath = path.join(configsPath, './configs')
  const collectedConfigsPaths = await collectConfigsPaths(fullConfigsPath)

  if (collectedConfigsPaths.includes('package.json')) {
    await installPackageJson({
      configsPath: fullConfigsPath,
      installedMeta,
      upcomingMeta,
      targetPath,
    })
  }

  for (const configPath of collectedConfigsPaths) {
    if (/(package\.json)/.test(configPath)) return

    await installConfig({
      configsPath: fullConfigsPath,
      configPath,
      installedMeta,
      upcomingMeta,
      targetPath,
    })
  }
}

module.exports = install
