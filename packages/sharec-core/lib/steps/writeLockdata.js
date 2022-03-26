// @ts-check
const { join } = require('sharec-utils').path
const { readFile, writeFile } = require('sharec-utils/lib/std')

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const writeLockdata = async (context) => {
  const { targetPath, configs } = context
  const lockedVersions = configs.reduce((acc, config) => Object.assign(acc, { [config.name]: config.version }), {})
  const targetPackagePath = join(targetPath, 'package.json')
  const rawTargetPackage = await readFile(targetPackagePath, 'utf8')
  const targetPackage = JSON.parse(rawTargetPackage)

  targetPackage.sharec = {
    ...targetPackage.sharec,
    lock: lockedVersions,
  }

  await writeFile(targetPackagePath, JSON.stringify(targetPackage))

  return context
}

module.exports = writeLockdata
