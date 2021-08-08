export type Input = {
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
   * Configs from target package
   */
  local?: any
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
/**
 * @typedef {import('../').Input} Input
 */
/**
 * Composes steps in one function
 * Executes each step and pass result to the next one
 * @param {Array<Function>} steps Steps functions
 * @returns {Function}
 */
export function composeSteps(...steps: Array<Function>): Function
export namespace steps {
  export { isAlreadyInstalled }
  export { isDependantOfSharec }
  export { isIgnoresSharecConfigs }
  export { mergeConfigs }
  export { insertEOL }
  export { insertMeta }
  export { applyFormatting }
  export { readConfigs }
  export { readTargetPackage }
  export { readUpcomingPackage }
  export { readCache }
  export { readEditorconfig }
  export { readPrettier }
  export { readSharecConfig }
  export { writeConfigs }
  export { writeCache }
}
declare const isAlreadyInstalled: (input: import('..').Input) => import('..').Input
declare const isDependantOfSharec: (input: import('..').Input) => import('..').Input
declare const isIgnoresSharecConfigs: (input: import('..').Input) => import('..').Input
declare const mergeConfigs: (input: import('..').Input) => Promise<import('..').Input>
declare const insertEOL: (input: import('..').Input) => Promise<import('..').Input>
declare const insertMeta: (input: import('..').Input) => Promise<import('..').Input>
declare const applyFormatting: (input: import('..').Input) => import('..').Input
declare const readConfigs: (input: import('..').Input) => Promise<import('..').Input>
declare const readTargetPackage: (input: import('..').Input) => Promise<import('..').Input>
declare const readUpcomingPackage: (input: import('..').Input) => Promise<import('..').Input>
declare const readCache: (input: import('..').Input) => Promise<import('..').Input>
declare const readEditorconfig: (input: import('..').Input) => Promise<import('..').Input>
declare const readPrettier: (input: import('..').Input) => Promise<import('..').Input>
declare const readSharecConfig: (input: import('..').Input) => Promise<import('..').Input>
declare const writeConfigs: (input: import('..').Input) => Promise<import('..').Input>
declare const writeCache: (input: import('..').Input) => Promise<import('..').Input>
export {}
