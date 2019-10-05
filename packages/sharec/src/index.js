const { install, remove, version } = require('./commands')
const {
  isTargetDependantOfSharec,
  isTargetPackageInSharecIgnore,
} = require('./core/package/extract')

async function sharec({ configsPath, targetPath, command, options }) {
  if (command === 'version') {
    await version(configsPath)
    return
  }

  const isIndependantOfSharec = await isTargetDependantOfSharec(targetPath)
  const isIgnoresSharecConfigs = await isTargetPackageInSharecIgnore(targetPath)

  if (isIndependantOfSharec || isIgnoresSharecConfigs) return

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
