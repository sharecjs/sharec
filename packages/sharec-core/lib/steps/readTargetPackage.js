// @ts-check
const { readFile } = require('sharec-utils').std
const { resolve } = require('sharec-utils').path

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const readTargetPackage = async (context) => {
  const targetPackageJsonPath = resolve(context.targetPath, './package.json')
  const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')
  const targetPackage = JSON.parse(rawTargetPackageJson)

  context.targetPackage = targetPackage

  return context
}

module.exports = readTargetPackage
