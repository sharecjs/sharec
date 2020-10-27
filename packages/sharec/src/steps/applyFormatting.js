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
      // FIXME: very fast and dirty hot fix
      // need to move formatting rules determining on `readEditorconfig` or `readPrettier` level
      // or, need to add new step for formatting rules merge and normalization
      config: config,
      content: mergedConfigs[config],
      rules: formatRules,
    })
  }

  input.mergedConfigs = formattedConfigs

  return input
}

module.exports = applyFormatting
