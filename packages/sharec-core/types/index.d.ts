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
   * Original configs from upcoming package
   */
  configs?: ConfigPackage[]
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: object
  /**
   * Previously installed configuration
   */
  cache?: object
}
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
/**
 * Main sharec entrance
 * @param {BaseInput} input
 * @returns {Promise<void>}
 */
export function sharec(input: BaseInput): Promise<void>
import { InternalError } from './errors'
import { errorCauses } from './errors'
export { InternalError, errorCauses }
