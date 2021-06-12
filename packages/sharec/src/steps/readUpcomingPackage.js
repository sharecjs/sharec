// @ts-check
const { readFile } = require('sharec-utils').std
const { resolve } = require('sharec-utils').path

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const readUpcomingPackage = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    try {
      spinner.frame('reading package.json from upcoming configuration')

      const upcomingPackageJsonPath = resolve(input.configPath, 'package.json')
      const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
      const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

      spinner.frame('package.json from upcoming configuration was readed')

      input.upcomingPackage = upcomingPackage

      return input
    } catch (err) {
      spinner.fail("Upcoming configuration's package.json was not readed")

      throw err
    }
  }

module.exports = readUpcomingPackage
