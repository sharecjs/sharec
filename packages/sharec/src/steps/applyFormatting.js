const isEmpty = require('lodash/isEmpty')
const { applyFormat, getFormatByFilename } = require('../utils/format')

const applyFormatting = ({ spinner, prompt }) => (input) => {
  spinner.frame('reading .editorconfig')

  const { mergedConfigs, format } = input

  if (!format || isEmpty(format)) return input

  const formattedConfigs = {}

  for (const config in mergedConfigs) {
    const formatRules = getFormatByFilename(format, config)

    if (!formatRules) {
      formattedConfigs[config] = mergedConfigs[config]
      continue
    }

    formattedConfigs[config] = applyFormat({
      config: config,
      content: mergedConfigs[config],
      rules: formatRules,
    })
  }

  input.mergedConfigs = formattedConfigs

  return input
}

module.exports = applyFormatting
