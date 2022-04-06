// @ts-check
const { join } = require('sharec-utils').path
const { readFile, writeFile } = require('sharec-utils/lib/std')
const { fromJSON, toJSON } = require('sharec-schema/lib/parsers/json')

/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Semaphore} Semaphore
 */

/**
 * @param {FlowContext} context
 * @param {Semaphore} semaphore
 * @returns {Promise<FlowContext>}
 */
const writeLockdata = async (context, semaphore) => {
  semaphore.start('Saving lock data')

  const { targetPath, configs, mergedConfigs } = context

  if (Object.keys(mergedConfigs).length === 0) {
    semaphore.success('Nothing to lock')

    return context
  }

  const lockedVersions = configs.reduce(
    (acc, config) => Object.assign(acc, { [config.name]: config.version }),
    {},
  )
  const targetPackagePath = join(targetPath, 'package.json')
  const rawTargetPackage = await readFile(targetPackagePath, 'utf8')
  const targetPackage = fromJSON(rawTargetPackage)

  targetPackage.get('sharec').set('locked', lockedVersions)

  try {
    await writeFile(targetPackagePath, toJSON(targetPackage))

    semaphore.success('Lock data has been saved')
  } catch (err) {
    semaphore.error("Lock data hasn't been saved")
  }

  return context
}

module.exports = writeLockdata
