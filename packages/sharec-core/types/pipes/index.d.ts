export namespace pipes {
  export const babel: {
    pipe: Function
  }
  export const browserslist: {
    pipe: Function
  }
  export const eslint: {
    pipe: Function
  }
  export const gitignore: {
    pipe: Function
    alias: string
  }
  export const lintStaged: {
    pipe: Function
  }
  export const npmignore: {
    pipe: Function
    alias: string
  }
  const _package: {
    pipe: Function
  }
  export { _package as package }
  export const stylelint: {
    pipe: Function
  }
  export const yaspeller: {
    pipe: Function
  }
  export const prettier: {
    pipe: Function
  }
}
/**
 * Returns pipe for specific configuration file by its name
 * If pipe is not exist - tries to resolve default pipe
 * If default pipe is not exist too - returns null
 * @param {String} configPath
 * @returns {Object|null} result
 * @property {Function} result.processor Configuration processor function
 * @property {String} [result.alias] Configuration file name after write
 */
export function getConfigPipe(configPath: string): any | null
/**
 * Trying to find default pipe for given configuration file
 * If it is not exist - returns null
 * @param {String} configPath
 * @returns {Object|null} result
 * @property {Function} result.processor Configuration processor function
 * @property {String} [result.alias] Configuration file name after write
 */
export function getFallbackConfigPipe(configPath: string): any | null
