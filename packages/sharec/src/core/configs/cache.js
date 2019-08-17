const path = require('path')
const { copyFile, safeMakeDir } = require('../../utils/fs')
const { collectConfigsPaths } = require('./collect')

const backupConfigs = async ({
  configsName,
  configsVersion,
  configsPath,
  targetPath,
}) => {
  const configsPaths = await collectConfigsPaths(configsPath)
  const configsBackupPath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${configsName}/${configsVersion}`,
  )

  await safeMakeDir(configsBackupPath)

  for (const configPath of configsPaths) {
    const fullConfigPath = path.join(configsPath, configPath)
    const backupedConfigPath = path.join(configsBackupPath, configPath)

    await safeMakeDir(path.dirname(backupedConfigPath))
    await copyFile(fullConfigPath, backupedConfigPath)
  }
}

module.exports = {
  backupConfigs,
}
