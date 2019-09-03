const { install } = require('./commands')

async function sharec({ configsPath, targetPath, command, options }) {
  if (!configsPath || configsPath === targetPath) return

  switch (command) {
    case 'install':
    default:
      await install({ configsPath, targetPath, options })
  }
}

module.exports = sharec
