const ora = require('ora')

/**
 * @typedef {Object} Spinner
 */

/**
 * @param {Object} params
 * @param {String} params.text
 * @param {Boolean} [params.silent]
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
     * @memberof Spinner
     * @param {String} text
     * @returns {Spinner}
     */
    succeed: text => {
      if (silent) {
        return spinner
      }

      spinner.succeed(text)

      return spinner
    },

    /**
     * @memberof Spinner
     * @param {String} text
     * @returns {Spinner}
     */
    fail: text => {
      if (silent) {
        return spinner
      }

      spinner.fail(text)

      return spinner
    },

    /**
     * @memberof Spinner
     * @param {String} text
     * @returns {Spinner}
     */
    frame: text => {
      if (silent) {
        return spinner
      }

      spinner.text = text

      return spinner
    },
  }
}

module.exports = createSpinner
