export = readRuntimeConfig
/**
 * @typedef {import('../').FlowContext} FlowContext
 */
/**
 * @param {'beforeMerge'|'afterMerge'} hook
 * @returns {(context: FlowContext) => Promise<FlowContext>}
 */
declare function readRuntimeConfig(hook: 'beforeMerge' | 'afterMerge'): (context: FlowContext) => Promise<FlowContext>
declare namespace readRuntimeConfig {
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
