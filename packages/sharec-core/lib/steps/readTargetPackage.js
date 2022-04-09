// @ts-check
const { readFile } = require('sharec-utils').std
const { resolve } = require('sharec-utils').path

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const readTargetPackage = async (context, semaphore) => {
  semaphore.start('Loading package.json')

  try {
    const targetPackageJsonPath = resolve(context.targetPath, './package.json')
    const rawTargetPackageJson = await readFile(targetPackageJsonPath, 'utf8')

    context.targetPackage = JSON.parse(rawTargetPackageJson)

    return context
  } catch (err) {
    semaphore.fail("Can't continue without package.json")

    return context
  }
}

module.exports = readTargetPackage
