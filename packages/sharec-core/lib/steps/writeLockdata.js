// @ts-check
const { join } = require('sharec-utils').path
const { readFile, writeFile } = require('sharec-utils/lib/std')
const { fromJSON, toJSON } = require('sharec-schema/lib/parsers/json')

/**
 * @typedef {import('../').FlowContext} FlowContext
 */

/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
const writeLockdata = async (context) => {
  const { targetPath, configs } = context
  const lockedVersions = configs.reduce(
    (acc, config) => Object.assign(acc, { [config.name]: config.version }),
    {},
  )
  const targetPackagePath = join(targetPath, 'package.json')
  const rawTargetPackage = await readFile(targetPackagePath, 'utf8')
  const targetPackage = fromJSON(rawTargetPackage)

  targetPackage.get('sharec').set('locked', lockedVersions)

  await writeFile(targetPackagePath, toJSON(targetPackage))

  return context
}

module.exports = writeLockdata
