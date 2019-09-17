const path = require('path')
const { writeFile, readFile } = require('../../utils/std').fs
const { safeMakeDir } = require('../../utils/fs')

const cacheConfig = async ({
  configsMeta,
  configPath,
  configSource,
  targetPath,
}) => {
  const { config, version } = configsMeta
  const configsBackupPath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${config}/${version}`,
  )

  await safeMakeDir(configsBackupPath)

  const backupedConfigPath = path.join(configsBackupPath, configPath)

  await safeMakeDir(path.dirname(backupedConfigPath))
  await writeFile(backupedConfigPath, configSource, 'utf8')
}

const loadConfigCache = async ({ configsMeta, configPath, targetPath }) => {
  const { config, version } = configsMeta
  const fullConfigsBackupPath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${config}/${version}/${configPath}`,
  )

  try {
    const cache = await readFile(fullConfigsBackupPath, 'utf8')

    return cache
  } catch (err) {
    return null
  }
}

module.exports = {
  cacheConfig,
  loadConfigCache,
}
