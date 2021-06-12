// @ts-check
const sharec = require('./cli')

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
 * @typedef {object} Input
 * @property {string} targetPath Target project path
 * @property {object} targetPackage `package.json `from `targetPath`
 * @property {string} configPath Upcoming configuration path
 * @property {object} upcomingPackage `package.json `from `configPath`
 * @property {SharecRuntimeConfiguration} [sharecConfig]
 * @property {object} [format] //TODO: Formatting rules
 * @property {object} [configs] Original configs from upcoming package
 * @property {object} [mergedConfigs] Processed configs from upcoming package
 * @property {object} [cache] Previously installed configuration
 * @property {object} options Different options from CLI
 * @property {boolean} options.silent Disables all messages from sharec
 * @property {boolean} options.overwrite Forcily replaces all configs by new ones
 * @property {boolean} options.disappear Do not write cache and sharec meta to target project
 * @property {boolean} options.debug Enables debug messages
 * @property {boolean} options.interactive Enables interactive merge mode
 * @property {boolean} options.includeCache Can be used to save configs to `.sharec/.cache`
 *  directory instead of `node_modules/.cache`
 */

module.exports = sharec
