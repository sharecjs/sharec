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
const readTargetPackage = async (input) => {
  const targetPackageJsonPath = resolve(input.targetPath, 'package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackage = JSON.parse(rawTargetPackageJson)

  input.targetPackage = targetPackage

  return input
}

module.exports = readTargetPackage
