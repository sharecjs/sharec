const path = require('path')
const isEmpty = require('lodash/isEmpty')
const { readFile, writeFile, removeFile } = require('../../utils/std').fs
const { resolveConfigStrategy } = require('../strategies/resolve')

const removeConfig = async ({ configsPath, targetPath, filePath }) => {
  const targetStrategy = resolveConfigStrategy(filePath)
  const localConfigPath = path.join(targetPath, filePath)
  const localConfig = await readFile(localConfigPath, 'utf8')
  const configPath = path.join(configsPath, filePath)
  const config = await readFile(configPath, 'utf8')

  if (!targetStrategy) return

  const restoredConfig = targetStrategy.unapply(filePath)(localConfig, config)

  if (isEmpty(restoredConfig)) {
    await removeFile(localConfigPath)
  } else {
    const restoredConfigToWrite =
      restoredConfig instanceof Object
        ? JSON.stringify(restoredConfig, null, 2)
        : restoredConfig

    await writeFile(localConfigPath, restoredConfigToWrite)
  }
}

module.exports = {
  removeConfig,
}
