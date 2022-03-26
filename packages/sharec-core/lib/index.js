// @ts-check
const { composeSteps, steps } = require('./steps')
const { errorCauses, InternalError } = require('./errors')

/**
 * @typedef {object} CliOptions
 * @property {true|false|'include'} cache Used for cache manipulations (--cache, -c)
 *  `include` – store cache inside `.sharec`, to include it to the project (for yarn@2, etc.)
 *  `true` – store cache inside `node_modules/.cache/.sharec`
 *  `false` – don't store cache at all
 */

/**
 * @typedef {object} BaseInput
 * @property {string} targetPath Target project path
 * @property {CliOptions} options Options given by cli
 */

/**
 * @typedef {object} ConfigPackage
 * @property {string} name Config package name
 * @property {string} version Config package version
 * @property {string} path Config package path inside node_modules
 * @property {object} configs Mapped config files with their content
 */

/**
 * @typedef {object} FlowContext
 * @property {string} targetPath Target project path
 * @property {CliOptions} options Different options from CLI
 * @property {object} [targetPackage] `package.json `from `targetPath`
 * @property {ConfigPackage[]} [configs] Original configs from upcoming package
 * @property {object} [mergedConfigs] Processed configs from upcoming package
 * @property {object} [cache] Previously installed configuration
 */

const commonFlow = composeSteps(
  steps.readTargetPackage,
  steps.readUpcomingPackage,
  steps.isAlreadyInstalled,
  steps.isDependantOfSharec,
  steps.isIgnoresSharecConfigs,
  steps.readSharecConfig,
  steps.readConfigs,
  steps.readCache,
  steps.readEditorconfig,
  steps.readPrettier,
  steps.mergeConfigs,
  steps.insertMeta,
  steps.insertEOL,
  steps.applyFormatting,
  steps.writeCache,
  steps.writeConfigs,
)

/**
 * Main sharec entrance
 * @param {BaseInput} input
 * @returns {Promise<void>}
 */
async function sharec(input) {
  /** @type {FlowContext} */
  const context = {
    targetPath: input.targetPath,
    targetPackage: null,
    configs: [],
    mergedConfigs: {},
    cache: {},
    options: input.options,
  }

  await commonFlow(context)
}

module.exports = {
  sharec,
  steps,
  commonFlow,
  InternalError,
  errorCauses,
}
