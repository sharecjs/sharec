const { install, remove } = require('./commands')

async function sharec({ configsPath, targetPath, command, options }) {
  if (!configsPath || configsPath === targetPath) return

  switch (command) {
    case 'install':
      await install({ configsPath, targetPath, options })
      break
    case 'remove':
      await remove({ configsPath, targetPath, options })
      break
    default:
      throw new Error(`sharec: unsupported command ${command}.`)
  }
}

module.exports = sharec
