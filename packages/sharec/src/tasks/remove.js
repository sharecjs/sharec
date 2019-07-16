const path = require('path')
const { collectConfigsPaths } = require('../core/configs/collect')
const { removeConfig } = require('../core/configs/remove')
const { clearPackageJson } = require('../core/package/remove')
const { getCurrentPackageJsonMetaData } = require('../core/package/extract')

async function remove({ configsPath, targetPath }) {
  const res = {}
  const metaData = await getCurrentPackageJsonMetaData(targetPath)

  if (!metaData || !metaData.injected) {
    throw new Error('Configs is not installed!')
  }

  const fullConfigsPath = path.join(configsPath, './configs')
  const configs = await collectConfigsPaths(fullConfigsPath)
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
    Object.assign(res, {
      deps: modifiedDeps,
    })
  }

  return res
}

module.exports = remove
