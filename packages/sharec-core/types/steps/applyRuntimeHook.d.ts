export = readRuntimeConfig
/**
 * @typedef {import('../').FlowContext} FlowContext
 * @typedef {import('../').FlowStep} FlowStep
 * @typedef {import('../').Semaphore} Semaphore
 */
/**
 * @param {'beforeMerge'|'afterMerge'} hook
 * @returns {FlowStep}
 */
declare function readRuntimeConfig(hook: 'beforeMerge' | 'afterMerge'): FlowStep
declare namespace readRuntimeConfig {
  export { FlowContext, FlowStep, Semaphore }
}
type FlowStep = (
  context: import('..').FlowContext,
  semaphore?: import('..').Semaphore,
) => Promise<import('..').FlowContext>
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
   * Runtime configuration including hooks
   */
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
type Semaphore = {
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
