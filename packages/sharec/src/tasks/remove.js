const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
const { removeConfig } = require('../core/configs/remove')
const { clearPackageJson } = require('../core/package/remove')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')

async function remove({ configsPath, targetPath }) {
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (!metaData) {
    return
  }

  const fullConfigsPath = path.join(configsPath, './configs')
  const configs = await collectConfigsPaths(fullConfigsPath)
  const standaloneConfigs = configs.filter(
    filePath => !/(package\.json)/.test(filePath),
  )

  try {
    await Promise.all(
      standaloneConfigs.map(configPath =>
        removeConfig({
          configsPath: fullConfigsPath,
          filePath: configPath,
          targetPath,
        }),
      ),
    )
    await clearPackageJson({
      configsPath: fullConfigsPath,
      targetPath,
    })
  } catch (err) {}
}

module.exports = remove
