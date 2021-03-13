const { writeFile } = require('sharec-utils/std').fs
const { dirname } = require('sharec-utils/std').path
const { safeMakeDir } = require('sharec-utils/fs')

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
