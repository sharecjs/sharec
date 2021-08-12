// @ts-check
const { copyFile } = require('sharec-utils').std
const { dirname, join } = require('sharec-utils').path
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

  for (const { filename, original } of binaries) {
    const target = join(targetPath, filename)

    await safeMakeDir(dirname(filename))
    await copyFile(original, target)
  }

  return input
}

module.exports = writeConfigs
