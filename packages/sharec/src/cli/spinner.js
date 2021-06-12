// @ts-check
const ora = require('ora')

/**
 * @typedef {import('../').Spinner} Spinner
 */

/**
 * Creates wrapper below ora spinner
 * Can be silenced by parameters
 * @param {object} params
 * @param {string} params.text Spinner's initial text
 * @param {boolean} [params.silent] Ignores all spinner messages and frames
 * @returns {Spinner}
 */
const createSpinner = ({ text, silent }) => {
  const spinner = ora({
    spinner: 'line',
    prefixText: 'sharec:',
    interval: 50,
    text,
  })

  return {
    /**
     * Starts created spinner
     * @memberof Spinner
     * @returns {Spinner}
     */
    start: () => {
      if (silent) {
        return spinner
      }

      spinner.start()

      return spinner
    },

    /**
     * Checks spinner's current frame as succeed and returns spinner
     * @memberof Spinner
     * @param {string} text
     * @returns {Spinner}
     */
    succeed: (text) => {
      if (silent) {
        return spinner
      }

      spinner.succeed(text)

      return spinner
    },

    /**
     * Checks spinner's current frame as failed and returns spinner
     * @memberof Spinner
     * @param {string} text
     * @returns {Spinner}
     */
    fail: (text) => {
      if (silent) {
        return spinner
      }

      spinner.fail(text)

      return spinner
    },

    /**
     * Just changes spinner's current text
     * @memberof Spinner
     * @param {string} text
     * @returns {Spinner}
     */
    frame: (text) => {
      if (silent) {
        return spinner
      }

      spinner.text = text

      return spinner
    },
  }
}

module.exports = {
  createSpinner,
}
