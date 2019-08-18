const path = require('path')
const { removeConfig } = require('../core/configs/remove')
const { clearPackageJson } = require('../core/package/remove')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')
const { flatSearch } = require('../utils/fs')

async function remove({ configsPath, targetPath }) {
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (!metaData) {
    return
  }

  const fullConfigsPath = path.join(configsPath, './configs')
  const configs = await flatSearch({
    path: fullConfigsPath,
    pattern: /^((?!lock).)*$/,
  })
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
