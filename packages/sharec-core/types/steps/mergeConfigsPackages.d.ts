export = mergeConfigsPackages
/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').Logger} Logger
 */
/**
 * @param {FlowContext} context
 * @param {Logger} logger
 * @returns {Promise<FlowContext>}
 */
declare function mergeConfigsPackages(context: FlowContext, logger: Logger): Promise<FlowContext>
declare namespace mergeConfigsPackages {
  export { FlowContext, Logger }
}
type FlowContext = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * Different options from CLI
   */
  options: import('..').CliOptions
  /**
   * `package.json `from `targetPath`
   */
  targetPackage?: any
  runtimeConfig?: import('..').RuntimeConfig
  /**
   * Original configs from upcoming package
   */
  configs: import('..').ConfigPackage[]
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: any
  /**
   * Previously installed configuration
   */
  cache?: any
}
type Logger = {
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
