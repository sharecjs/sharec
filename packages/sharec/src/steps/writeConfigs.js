const { writeFile } = require('../utils/std').fs
const { dirname } = require('../utils/std').path
const { safeMakeDir } = require('../utils/fs')

const writeConfigs = ({ spinner, prompt }) => async (input) => {
  const { mergedConfigs } = input

  spinner.frame('writing configuration')

  for (const config in mergedConfigs) {
    await safeMakeDir(dirname(config))
    await writeFile(config, mergedConfigs[config])
  }

  spinner.frame('configuration was writed')

  return input
}

module.exports = writeConfigs
