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
const readSharecConfig = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    try {
      spinner.frame('reading sharec configuration from upcoming configuration')

      input.sharecConfig = {}

      try {
        const upcomingSharecrcPath = resolve(input.configPath, '.sharecrc.json')
        const rawSharecrc = await readFile(upcomingSharecrcPath, 'utf8')
        const sharecrc = JSON.parse(rawSharecrc)

        if (sharecrc) {
          spinner.frame('sharec configuration was loaded from `.sharecrc.json`')

          input.sharecConfig = sharecrc

          return input
        }
      } catch (err) {}

      const upcomingPackageJsonPath = resolve(input.configPath, 'package.json')
      const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
      const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

      if (upcomingPackage.sharec) {
        spinner.frame('sharec configuration was loaded from `package.json`')

        input.sharecConfig = upcomingPackage.sharec

        return input
      }

      return input
    } catch (err) {
      spinner.fail('Upcoming sharec configuration was not readed')

      return input
    }
  }

module.exports = readSharecConfig
