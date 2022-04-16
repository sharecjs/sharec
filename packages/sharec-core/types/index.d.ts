export type BaseInput = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * Options given by cli
   */
  options: CliOptions
}
export type ConfigPackage = {
  /**
   * Config package name
   */
  name: string
  /**
   * Config package version
   */
  version: string
  /**
   * Config package path inside node_modules
   */
  path: string
  /**
   * Mapped config files with their content
   */
  configs: object
}
/**
 * n@2, etc.)
 *  `true` – store cache inside `node_modules/.cache/.sharec`
 *  `false` – don't store cache at all
 */
export type CliOptions = {
  /**
   * Used for cache manipulations (--cache, -c)
   * `include` – store cache inside `.sharec`, to include it to the project (for yarn
   */
  cache: true | false | 'include'
}
export type RuntimeConfig = {
  beforeMerge?: FlowStep
  afterMerge?: FlowStep
}
export type FlowContext = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * Different options from CLI
   */
  options: CliOptions
  /**
   * `package.json `from `targetPath`
   */
  targetPackage?: object
  /**
   * Runtime configuration including hooks
   */
  runtimeConfig?: RuntimeConfig
  /**
   * Original configs from upcoming package
   */
  configs: ConfigPackage[]
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: object
  /**
   * Previously installed configuration
   */
  cache?: object
}
export type Semaphore = {
  /**
   * Starts the spinner
   */
  start: (text: string) => void
  /**
   * Stops the spinner with success
   */
  success: (text: string) => void
  /**
   * Stops the spinner with failure, but doesn't terminate the program
   */
  error: (text: string) => void
  /**
   * Stops the spinner with failure and terminates the program
   */
  fail: (text: string) => void
}
export type FlowStep = (context: FlowContext, semaphore?: Semaphore) => Promise<FlowContext>
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
 * @property {FlowStep} [beforeMerge]
 * @property {FlowStep} [afterMerge]
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
export function sharec(input: BaseInput, semaphore: Semaphore): Promise<void>
