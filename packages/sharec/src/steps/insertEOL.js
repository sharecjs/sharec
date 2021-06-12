// @ts-check

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const insertEOL = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Promise<Input>}
   */
  async (input) => {
    const { mergedConfigs } = input

    spinner.frame('inserting EOL')

    for (const config in mergedConfigs) {
      const withEOL = /^\s*$/gm.test(mergedConfigs[config])

      if (withEOL) continue

      input.mergedConfigs[config] = mergedConfigs[config] + '\n'
    }

    spinner.frame('EOL was inserted')

    return input
  }

module.exports = insertEOL
