const { install, remove, version } = require('./commands')
const { isTargetDependantOfSharec } = require('./core/package/extract')

async function sharec({ configsPath, targetPath, command, options }) {
  if (command === 'version') {
    await version(configsPath)
    return
  }

  const isIndependantOfSharec = await isTargetDependantOfSharec(targetPath)

  if (isIndependantOfSharec) return

  switch (command) {
    case 'remove':
      await remove({ configsPath, targetPath, options })
      break
    case 'install':
    default:
      await install({ configsPath, targetPath, options })
  }
}

module.exports = sharec
