const removeTask = require('../tasks/remove')

async function remove({ configsPath, targetPath }) {
  if (!configsPath || configsPath === targetPath) return

  await removeTask({ configsPath, targetPath })
}

module.exports = remove
