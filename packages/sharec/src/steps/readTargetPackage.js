// @ts-check
const { fs } = require('sharec-utils').std
const { resolve } = require('sharec-utils').path

/**
 * @typedef {import('../').Input} Input
 */

const readTargetPackage = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    try {
      spinner.frame('reading package.json from target project')

      const targetPackageJsonPath = resolve(input.targetPath, 'package.json')
      const rawTargetPackageJson = await fs.readFile(targetPackageJsonPath, 'utf8')
      const targetPackage = JSON.parse(rawTargetPackageJson)

      spinner.frame("target package's package.json was readed")

      input.targetPackage = targetPackage

      return input
    } catch (err) {
      spinner.fail("Target project's package.json was not readed")
      throw err
    }
  }

module.exports = readTargetPackage
