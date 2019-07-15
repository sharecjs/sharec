const initTask = require('../tasks/init')

async function postinstall(targetPath) {
  if (!targetPath) return

  await initTask(targetPath)
}

module.exports = postinstall
