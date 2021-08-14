// @ts-check
const { copyFile } = require('sharec-utils').std
const { basename, dirname, join } = require('sharec-utils').path
const { safeMakeDir } = require('sharec-utils').fs

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const writeConfigs = async (input) => {
  const { binaries, targetPath } = input
  const configsPath = join(input.configPath, '/configs')

  const directories = {}

  for (const original of binaries) {
    const filename = original.replace(configsPath, '').replace(/^\//, '')
    const target = join(targetPath, filename)
    const directory = dirname(target)

    if(directories[directory]) {
      directories[directory].push([original, target])
    } else {
       directories[directory] = [[original, target]]
    }
  }

  for (const [directory, files] of Object.entries(directories)) {
    await safeMakeDir(directory)

    for (const [original, target] of files) {
      await copyFile(original, target)
    }
  }

  return input
}

module.exports = writeConfigs
