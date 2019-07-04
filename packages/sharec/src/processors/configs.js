const path = require('path')
const isEmpty = require('lodash/isEmpty')
const { readFile, writeFile, makeDir, removeFile } = require('../utils/fs')
const { determineConfigStrategy } = require('../core/strategist')

// TODO: rename to inject
// TODO: May be targetPath must be in filePath?
const processConfig = async ({ configsPath, targetPath, filePath }) => {
  const targetStrategy = determineConfigStrategy(filePath)
  const localConfigPath = path.join(targetPath, filePath)
  const localConfigDirName = path.dirname(localConfigPath)
  let localConfig = null

  const newConfigPath = path.join(configsPath, filePath)
  let newConfig = await readFile(newConfigPath, 'utf8')

  try {
    localConfig = await readFile(localConfigPath, 'utf8')
  } catch (err) {}

  if (localConfig && targetStrategy) {
    newConfig = targetStrategy.merge(filePath)(localConfig, newConfig)
  }

  try {
    await makeDir(localConfigDirName, {
      recursive: true,
    })
  } catch (err) {}

  await writeFile(
    localConfigPath,
    newConfig instanceof Object
      ? JSON.stringify(newConfig, null, 2)
      : newConfig,
    'utf8',
  )
}

const removeConfig = async ({ configsPath, targetPath, filePath }) => {
  const targetStrategy = determineConfigStrategy(filePath)
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
  processConfig,
  removeConfig,
}
