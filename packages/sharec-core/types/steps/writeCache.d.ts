export = writeCache
/**
 * @typedef {import('../').FlowContext} FlowContext
 */
/**
 * @param {FlowContext} context
 * @returns {Promise<FlowContext>}
 */
declare function writeCache(context: FlowContext): Promise<FlowContext>
declare namespace writeCache {
  export { FlowContext }
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
  /**
   * Original configs from upcoming package
   */
  configs?: import('..').ConfigPackage[]
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: any
  /**
   * Previously installed configuration
   */
  cache?: any
}
