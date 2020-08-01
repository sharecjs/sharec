const { Confirm } = require('enquirer')

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
     * @param {String} message Confirm message
     * @returns {Promise<Boolean>}
     */
    confirm: async (message) => {
      if (silent) return

      const confirm = new Confirm({
        message,
      })

      try {
        const res = await confirm.run()

        return res
      } catch (err) {
        return false
      }
    },
  }

  return prompt
}

module.exports = createPrompt
