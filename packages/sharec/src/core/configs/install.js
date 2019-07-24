const chalk = require('chalk')
const path = require('path')
const { readFile, writeFile, makeDir } = require('../../utils/fs')
const { resolveConfigStrategy } = require('../strategies/resolve')

const installConfig = async ({ configsPath, targetPath, filePath }) => {
  const targetStrategy = resolveConfigStrategy(filePath)
  const localConfigPath = path.join(targetPath, filePath)
  const localConfigDirName = path.dirname(localConfigPath)
  let localConfig = null

  const newConfigPath = path.join(configsPath, filePath)
  let newConfig = await readFile(newConfigPath, 'utf8')

  try {
    localConfig = await readFile(localConfigPath, 'utf8')
  } catch (err) {}

  if (localConfig && targetStrategy) {
    try {
      newConfig = targetStrategy.merge(filePath)(localConfig, newConfig)
    } catch (err) {
      const errorMessage = [
        chalk.bold(
          `sharec: an error occured during merging ${localConfigPath}`,
        ),
        err.message,
      ]

      console.error(errorMessage.join('\n\t'))
    }
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

module.exports = {
  installConfig,
}
