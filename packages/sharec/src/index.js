const { inject } = require('./commands')

async function sharec({ configsPath, targetPath, command, options }) {
  if (!configsPath || configsPath === targetPath) return

  switch (command) {
    case 'inject':
      await inject({ configsPath, targetPath, options })
      break
    default:
      throw new Error(`sharec: unsupported command ${command}.`)
  }
}

module.exports = sharec
