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
const readUpcomingPackage = async (input) => {
  const upcomingPackageJsonPath = resolve(input.configPath, 'package.json')
  const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
  const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

  input.upcomingPackage = upcomingPackage

  return input
}

module.exports = readUpcomingPackage
