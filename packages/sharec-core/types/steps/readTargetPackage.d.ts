export = readTargetPackage
/**
 * @typedef {import('../').Input} Input
 */
/**
 * @param {Input} input
 * @returns {Promise<Input>}
 */
declare function readTargetPackage(input: Input): Promise<Input>
declare namespace readTargetPackage {
  export { Input }
}
type Input = {
  /**
   * Target project path
   */
  targetPath: string
  /**
   * `package.json `from `targetPath`
   */
  targetPackage: any
  /**
   * Upcoming configuration path
   */
  configPath: string
  /**
   * `package.json `from `configPath`
   */
  upcomingPackage: any
  sharecConfig?: import('..').SharecRuntimeConfiguration
  format?: any
  /**
   * Original configs from upcoming package
   */
  configs?: any
  /**
   * Processed configs from upcoming package
   */
  mergedConfigs?: any
  /**
   * Previously installed configuration
   */
  cache?: any
  /**
   * Different options from CLI
   */
  options: {
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
}
