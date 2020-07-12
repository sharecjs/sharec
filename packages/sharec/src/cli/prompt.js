const {} = require('inquirer')

/**
 * @typedef {Object} Prompt
 */

/**
 * Creates prompt for handling user input
 * @param {Object} params
 * @param {Boolean} params.silent If silent is truthy - logger will not print any message
 * @returns {Prompt}
 */

const createPrompt = ({ silent }) => {
  const prompt = {
    /**
     * Ask user to confirm something
     * @memberof Logger
     * @param {String} msg Confirm message
     * @returns {Promise<Boolean>}
     */
    confirm: msg => {
      if (silent) return

      console.log(msg)
    }
  }

  return prompt
}

module.exports = createPrompt
