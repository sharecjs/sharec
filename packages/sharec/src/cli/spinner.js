const ora = require('ora')

/**
 * @typedef {Object} Spinner
 */

/**
 * Creates wrapper below ora spinner
 * Can be silenced by parameters
 * @param {Object} params
 * @param {String} params.text Spinner's initial text
 * @param {Boolean} [params.silent] Ignores all spinner messages and frames
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
     * @param {String} text
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
     * @param {String} text
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
     * @param {String} text
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

module.exports = createSpinner
