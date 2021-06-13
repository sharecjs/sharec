// @ts-check
const isEmpty = require('lodash/isEmpty')
const get = require('lodash/get')
const pick = require('lodash/pick')
const nanomatch = require('sharec-nanomatch')
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
    const configsOptions = get(sharecConfig, 'configs') || {}

    for (const config in mergedConfigs) {
      const configParamsKeys = nanomatch([config], Object.keys(configsOptions))
      const configParams = pick(configsOptions, configParamsKeys)
      const formatPreventedg = Object.values(configParams).find(({ format }) => format === false)
      const formatRules = getFormatByFilename(format, config)

      if (!formatRules || formatPreventedg) {
        formattedConfigs[config] = mergedConfigs[config]
        continue
      }

      formattedConfigs[config] = applyFormat({
        filename: config,
        content: mergedConfigs[config],
        rules: formatRules,
      })
    }

    input.mergedConfigs = formattedConfigs

    return input
  }

module.exports = applyFormatting
