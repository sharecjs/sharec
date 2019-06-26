const path = require('path')
const { readFile, writeFile, makeDir } = require('../utils/fs')
const { determineConfigStrategy } = require('../core/strategist')

const processConfig = async ({ configsPath, targetPath, filePath }) => {
  const targetStrategy = determineConfigStrategy(filePath)
  const targetConfigPath = path.join(targetPath, filePath)
  const targetConfigDirName = path.dirname(targetConfigPath)
  let targetConfig = null

  const newConfigPath = path.join(configsPath, filePath)
  let newConfig = await readFile(newConfigPath, 'utf8')

  try {
    targetConfig = await readFile(targetConfigPath, 'utf8')
  } catch (err) {}

  if (targetConfig && targetStrategy) {
    newConfig = targetStrategy.merge(filePath)(targetConfig, newConfig)
  }

  try {
    await makeDir(targetConfigDirName, {
      recursive: true,
    })
  } catch (err) {}

  await writeFile(
    targetConfigPath,
    newConfig instanceof Object
      ? JSON.stringify(newConfig, null, 2)
      : newConfig,
    'utf8',
  )
}

module.exports = {
  processConfig,
}
