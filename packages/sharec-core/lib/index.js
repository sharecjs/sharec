// @ts-check
const { commonFlow } = require('./steps')

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
 * @typedef {object} CliOptions
 * @property {true|false|'include'} cache Used for cache manipulations (--cache, -c)
 *  `include` – store cache inside `.sharec`, to include it to the project (for yarn@2, etc.)
 *  `true` – store cache inside `node_modules/.cache/.sharec`
 *  `false` – don't store cache at all
 */

/**
 * @typedef {object} RuntimeConfig
 * @property {(context: FlowContext) => Promise<FlowContext>} [beforeMerge]
 * @property {(context: FlowContext) => Promise<FlowContext>} [afterMerge]
 */

/**
 * @typedef {object} FlowContext
 * @property {string} targetPath Target project path
 * @property {CliOptions} options Different options from CLI
 * @property {object} [targetPackage] `package.json `from `targetPath`
 * @property {RuntimeConfig} [runtimeConfig] Runtime configuration including hooks
 * @property {ConfigPackage[]} configs Original configs from upcoming package
 * @property {object} [mergedConfigs] Processed configs from upcoming package
 * @property {object} [cache] Previously installed configuration
 */

/**
 * @typedef {object} Semaphore
 * @property {(text: string) => void} start Starts the spinner
 * @property {(text: string) => void} success Stops the spinner with success
 * @property {(text: string) => void} error Stops the spinner with failure, but doesn't terminate the program
 * @property {(text: string) => void} fail Stops the spinner with failure and terminates the program
 */

/**
 * @typedef {(context: FlowContext, semaphore?: Semaphore) => Promise<FlowContext>} FlowStep
 */

/**
 * Main sharec entrance
 * @param {BaseInput} input
 * @param {Semaphore} semaphore
 * @returns {Promise<void>}
 */
async function sharec(input, semaphore) {
  /** @type {FlowContext} */
  const context = {
    targetPath: input.targetPath,
    targetPackage: null,
    configs: [],
    mergedConfigs: {},
    cache: {},
    options: input.options,
  }

  await commonFlow(context, semaphore)
}

module.exports = {
  sharec,
}
