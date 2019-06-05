const path = require('path')
const { readFile, writeFile } = require('utils/fs')

const createBackup = async (targetPath, configs) => {
  const backup = {}

  for (const filePath of configs) {
    const fullFilePath = path.join(targetPath, filePath)

    try {
      const file = await readFile(fullFilePath, 'hex')

      Object.assign(backup, {
        [filePath]: file,
      })
    } catch (err) {}
  }

  return backup
}

const writeBackup = async (targetPath, backup) => {
  const backupFilePath = path.join(targetPath, 'sharec.lock')

  await writeFile(backupFilePath, JSON.stringify(backup, null, 2), 'utf8')
}

const readBackup = async targetPath => {
  try {
    const backupFilePath = path.join(targetPath, 'sharec.lock')
    const backupFile = await readFile(backupFilePath, 'utf8')
    const parsedBackupFile = JSON.parse(backupFile)

    return Object.keys(parsedBackupFile).reduce(
      (acc, key) =>
        Object.assign(acc, {
          [key]: Buffer.from(parsedBackupFile[key], 'hex').toString('utf8'),
        }),
      {},
    )
  } catch (err) {
    return null
  }
}

const backupConfigs = async (targetPath, configs) => {
  const backup = await createBackup(targetPath, configs)

  if (Object.keys(backup).length === 0) return

  await writeBackup(targetPath, backup)
}

module.exports = {
  createBackup,
  writeBackup,
  readBackup,
  backupConfigs,
}
