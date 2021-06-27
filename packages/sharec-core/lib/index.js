// @ts-check
const { composeSteps, steps } = require('./steps')
const { errorCauses, InternalError } = require('./errors')

/**
 * @typedef {object} RuntimeConfigOptions
 * @property {boolean} [format] Can be used to prevent file formatting after the merge
 * @property {boolean} [overwrite] Can be used to prevent file merge and just force overwritting
 */

/**
 * @typedef {object} SharecRuntimeConfiguration
 * @property {{ [x: string]: RuntimeConfigOptions }} [configs] Configs specific options
 *  Can be used to specify merge behavior for specific files by regexps, wildcard patterns,
 *  or filename
 *  @example
 *  ```
 *  configs: {
 *    '.eslintrc': {
 *      ignore: true
 *    },
 *    '/\.json$/': {
 *      format: false
 *    }
 *  }
 *  ```
 */

/**
 * @typedef {object} BaseInput
 * @property {string} targetPath Target project path
 * @property {string} configPath Upcoming configuration path
 * @property {boolean} silent Disables all messages from sharec
 * @property {boolean} overwrite Forcily replaces all configs by new ones
 * @property {boolean} disappear Do not write cache and sharec meta to target project
 * @property {boolean} debug Enables debug messages
 * @property {boolean} includeCache Can be used to save configs to `.sharec/.cache`
 *  directory instead of `node_modules/.cache`
 */

/**
 * @typedef {object} Input
 * @property {string} targetPath Target project path
 * @property {object} targetPackage `package.json `from `targetPath`
 * @property {string} configPath Upcoming configuration path
 * @property {object} upcomingPackage `package.json `from `configPath`
 * @property {SharecRuntimeConfiguration} [sharecConfig]
 * @property {object} [format] //TODO: Formatting rules
 * @property {object} [configs] Original configs from upcoming package
 * @property {object} [mergedConfigs] Processed configs from upcoming package
 * @property {object} [cache] Previously installed configuration
 * @property {object} options Different options from CLI
 * @property {boolean} options.silent Disables all messages from sharec
 * @property {boolean} options.overwrite Forcily replaces all configs by new ones
 * @property {boolean} options.disappear Do not write cache and sharec meta to target project
 * @property {boolean} options.debug Enables debug messages
 * @property {boolean} options.includeCache Can be used to save configs to `.sharec/.cache`
 *  directory instead of `node_modules/.cache`
 */

const commonFlow = composeSteps(
  steps.readTargetPackage,
  steps.readUpcomingPackage,
  steps.isAlreadyInstalled,
  steps.isDependantOfSharec,
  steps.isIgnoresSharecConfigs,
  steps.readSharecConfig,
  steps.readConfigs,
  steps.readEditorconfig,
  steps.readPrettier,
  steps.readCache,
  steps.mergeConfigs,
  steps.insertMeta,
  steps.insertEOL,
  steps.applyFormatting,
  steps.writeCache,
  steps.writeConfigs,
)

/**
 * Main sharec entrance
 * @throws
 * @param {BaseInput} baseInput
 * @returns {Promise<void>}
 */
async function sharec(baseInput) {
  const input = {
    targetPath: baseInput.targetPath,
    configPath: baseInput.configPath,
    targetPackage: null,
    upcomingPackage: null,
    configs: {},
    mergedConfigs: {},
    cache: {},
    format: null,
    options: {
      silent: baseInput.silent,
      overwrite: baseInput.overwrite,
      disappear: baseInput.disappear,
      debug: baseInput.debug,
      includeCache: baseInput.includeCache,
    },
  }

  await commonFlow(input)
}

module.exports = {
  sharec,
  steps,
  commonFlow,
  InternalError,
  errorCauses,
}
