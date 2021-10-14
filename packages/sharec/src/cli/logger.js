// @ts-check
const { bold } = require('picocolors')

/**
 * @typedef {import('../').Logger} Logger
 */

/**
 * Creates logger for debug puporses
 * Can be created with custom prefix for next problem scope determining
 * @param {object} params
 * @param {string} [params.prefix] Prefix which would append to each logger message
 * @param {boolean} params.silent If silent is truthy - logger will not print any message
 * @returns {Logger}
 */
const createLogger = ({ prefix = '', silent }) => {
  const logPrefixParts = ['sharec', ':']

  if (prefix) {
    logPrefixParts.splice(1, 0, ` [${prefix}]`)
  }

  const logPrefix = bold(logPrefixParts.join(''))

  const logger = {
    /**
     * Wraps function with logger by special ID
     * Usefull in cases when we need to see all input and output parameters from function
     * @memberof Logger
     * @param {Function} fn Any function
     * @param {String} [fnId] Function name for anonymous functions logging
     * @returns {Function}
     */
    wrap: (fn, fnId = '') =>
      /**
       * @memberof Logger
       * @param {Array<*>} params Any arguments for logging
       * @returns {*} Result of given function execution
       */
      (...params) => {
        if (silent) return fn(...params)
        if (params.length === 0) return fn(...params)

        params.forEach((param, i) => {
          // @ts-ignore
          console.dir(logPrefix, bold(`${fn.name || fnId}(arg[${i}]): \n`), param)
        })

        return fn(...params)
      },

    /**
     * Uses for logging like common console.log, but from special logger
     * @memberof Logger
     * @param {Array<*>} entries Any parameters which would be logged
     * @returns {void}
     */
    log: (...entries) => {
      if (silent) return

      console.dir(logPrefix, ...entries)
    },
  }

  return logger
}

module.exports = {
  createLogger,
}
