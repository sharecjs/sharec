const path = require('path')
const { readFile, writeFile } = require('utils/fs')

const createBackup = async ({ targetPath, version, configs }) => {
  const backup = {
    files: {},
    version,
  }

  for (const filePath of configs) {
    const fullFilePath = path.join(targetPath, filePath)

    try {
      const file = await readFile(fullFilePath, 'hex')

      Object.assign(backup.files, {
        [filePath]: file,
      })
    } catch (err) {}
  }

  return backup
}

const writeBackup = async ({ targetPath, backup }) => {
  const backupFilePath = path.join(targetPath, 'sharec-lock.json')

  await writeFile(backupFilePath, JSON.stringify(backup, null, 2), 'utf8')
}

const readBackup = async targetPath => {
  try {
    const backupFilePath = path.join(targetPath, 'sharec-lock.json')
    const backupFile = await readFile(backupFilePath, 'utf8')
    const { version, files } = JSON.parse(backupFile)

    return {
      version,
      files: Object.keys(files).reduce(
        (acc, key) =>
          Object.assign(acc, {
            [key]: Buffer.from(files[key], 'hex').toString('utf8'),
          }),
        {},
      ),
    }
  } catch (err) {
    return null
  }
}

const backupConfigs = async ({ targetPath, version, configs = [] }) => {
  const backup = await createBackup({ targetPath, version, configs })

  if (Object.keys(backup.files).length === 0) return

  await writeBackup({ targetPath, backup })
}

module.exports = {
  createBackup,
  writeBackup,
  readBackup,
  backupConfigs,
}
