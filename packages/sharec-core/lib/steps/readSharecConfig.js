// @ts-check
const { readFile } = require('sharec-utils').std
const { resolve } = require('sharec-utils').path

/**
 * @typedef {import('../').Input} Input
 */

/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
const readSharecConfig = async (input) => {
  try {
    input.sharecConfig = {}

    try {
      const upcomingSharecrcPath = resolve(input.configPath, '.sharecrc.json')
      const rawSharecrc = await readFile(upcomingSharecrcPath, 'utf8')
      const sharecrc = JSON.parse(rawSharecrc)

      if (sharecrc) {
        input.sharecConfig = sharecrc

        return input
      }
    } catch (err) {}

    const upcomingPackageJsonPath = resolve(input.configPath, 'package.json')
    const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
    const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

    if (upcomingPackage.sharec) {
      input.sharecConfig = upcomingPackage.sharec

      return input
    }

    return input
  } catch (err) {
    return input
  }
}

module.exports = readSharecConfig
