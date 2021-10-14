// @ts-check
const nanospinner = require('nanospinner')

/**
 * @typedef {Object} Spinner
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
  const spinner = nanospinner.createSpinner(text)

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

      spinner.success({ text })

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

      spinner.error({ text })

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

      spinner.update({ text })

      return spinner
    },
  }
}

module.exports = {
  createSpinner,
}
