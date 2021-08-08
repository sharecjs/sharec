export type RuntimeConfigOptions = {
  /**
   * Can be used to prevent file formatting after the merge
   */
  format?: boolean
  /**
   * Can be used to prevent file merge and just force overwritting
   */
  overwrite?: boolean
}
export type SharecRuntimeConfiguration = {
  /**
   * Configs specific options
   * Can be used to specify merge behavior for specific files by regexps, wildcard patterns,
   * or filename
   */
  configs?: {
    [x: string]: RuntimeConfigOptions
  }
}
export type BaseInput = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * Upcoming configuration path
   */
  configPath: string
  /**
   * Disables all messages from sharec
   */
  silent: boolean
  /**
   * Forcily replaces all configs by new ones
   */
  overwrite: boolean
  /**
   * Do not write cache and sharec meta to target project
   */
  disappear: boolean
  /**
   * Enables debug messages
   */
  debug: boolean
  /**
   * Can be used to save configs to `.sharec/.cache`
   * directory instead of `node_modules/.cache`
   */
  includeCache: boolean
}
export type Input = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * `package.json `from `targetPath`
   */
  targetPackage: object
  /**
   * Upcoming configuration path
   */
  configPath: string
  /**
   * `package.json `from `configPath`
   */
  upcomingPackage: object
  sharecConfig?: SharecRuntimeConfiguration
  format?: object
  /**
   * Original configs from upcoming package
   */
  configs?: object
  /**
   * Configs from target package
   */
  local?: object
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: object
  /**
   * Previously installed configuration
   */
  cache?: object
  /**
   * Different options from CLI
   */
  options: {
    silent: boolean
    overwrite: boolean
    disappear: boolean
    debug: boolean
    includeCache: boolean
  }
}
/**
 * Main sharec entrance
 * @throws
 * @param {BaseInput} baseInput
 * @returns {Promise<void>}
 */
export function sharec(baseInput: BaseInput): Promise<void>
export const steps: {
  isAlreadyInstalled: (input: Input) => Input
  isDependantOfSharec: (input: Input) => Input
  isIgnoresSharecConfigs: (input: Input) => Input
  mergeConfigs: (input: Input) => Promise<Input>
  insertEOL: (input: Input) => Promise<Input>
  insertMeta: (input: Input) => Promise<Input>
  applyFormatting: (input: Input) => Input
  readConfigs: (input: Input) => Promise<Input>
  readTargetPackage: (input: Input) => Promise<Input>
  readUpcomingPackage: (input: Input) => Promise<Input>
  readCache: (input: Input) => Promise<Input>
  readEditorconfig: (input: Input) => Promise<Input>
  readPrettier: (input: Input) => Promise<Input>
  readSharecConfig: (input: Input) => Promise<Input>
  writeConfigs: (input: Input) => Promise<Input>
  writeCache: (input: Input) => Promise<Input>
}
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
 * @property {object} [local] Configs from target package
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
export const commonFlow: Function
export const InternalError: typeof import('./errors/InternalError')
export const errorCauses: {
  ALREADY_INSTALLED: {
    message: () => string
    symbol: symbol
  }
  IS_DEPENDANT_OF_SHAREC: {
    message: () => string
    symbol: symbol
  }
  IS_IGNORES_SHAREC: {
    message: () => string
    symbol: symbol
  }
  CONFIGS_NOT_FOUND: {
    message: (path: any) => string
    symbol: symbol
  }
}
