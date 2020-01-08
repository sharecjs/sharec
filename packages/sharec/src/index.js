const minimist = require('minimist')
const { install, remove, version } = require('./commands')
const {
  isTargetDependantOfSharec,
  isTargetPackageInSharecIgnore,
} = require('./core/package/extract')
const { getUpcomingConfigsPath } = require('./core/configs/collect')

/**
 * @param {NodeJS.Process} targetProcess
 * @returns {Promise<void>}
 */
async function sharec(targetProcess) {
  const { _, ...options } = minimist(targetProcess.argv.slice(2))
  const targetPath = targetProcess.env.INIT_CWD
  const isDependantOfSharec = await isTargetDependantOfSharec(targetPath)

  if (isDependantOfSharec) return

  const isIgnoresSharecConfigs = await isTargetPackageInSharecIgnore(targetPath)

  if (isIgnoresSharecConfigs) return

  const configsPath = getUpcomingConfigsPath(targetProcess)

  if (!configsPath || configsPath === targetPath) return

  const [command = 'install'] = _

  if (command === 'version') {
    await version(configsPath)
    return
  }

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
