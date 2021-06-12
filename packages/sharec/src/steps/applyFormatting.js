// @ts-check
const isEmpty = require('lodash/isEmpty')
const get = require('lodash/get')
const { applyFormat, getFormatByFilename } = require('sharec-utils').format

/**
 * @typedef {import('../').StepWrapperPayload} StepWrapperPayload
 * @typedef {import('../').Input} Input
 */

/**
 * @param {StepWrapperPayload} [payload]
 * @returns {Function}
 */
const applyFormatting = ({ spinner }) =>
  /**
   * @param {Input} input
   * @returns {Input}
   */
  (input) => {
    spinner.frame('reading .editorconfig')

    const { mergedConfigs, format, sharecConfig } = input

    if (!format || isEmpty(format)) return input

    const formattedConfigs = {}

    for (const config in mergedConfigs) {
      const configParams = get(sharecConfig, `configs['${config}']`, {})
      const formatRules = getFormatByFilename(format, config)

      if (!formatRules || configParams.format === false) {
        formattedConfigs[config] = mergedConfigs[config]
        continue
      }

      formattedConfigs[config] = applyFormat({
        // FIXME: very fast and dirty hot fix
        // need to move formatting rules determining on `readEditorconfig` or `readPrettier` level
        // or, need to add new step for formatting rules merge and normalization
        filename: config,
        content: mergedConfigs[config],
        rules: formatRules,
      })
    }

    input.mergedConfigs = formattedConfigs

    return input
  }

module.exports = applyFormatting
