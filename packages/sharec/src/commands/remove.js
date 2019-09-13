const removeTask = require('../tasks/remove')
const createSpinner = require('../cli/spinner')

async function remove({ configsPath, targetPath, options = {} }) {
  if (!configsPath || configsPath === targetPath) return

  const isSilentMode = options.silent
  const spinner = createSpinner({
    text: 'removing installed configuration...',
    silent: isSilentMode,
  }).start()

  await removeTask({ configsPath, targetPath })

  spinner.succeed('removed!')
}

module.exports = remove
