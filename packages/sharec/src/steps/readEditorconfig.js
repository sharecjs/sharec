const get = require('lodash/get')
const editorconfig = require('editorconfig')
const { readFile } = require('../utils/std').fs
const { join } = require('../utils/std').path

const readEditorconfig = (spinner) => async (input) => {
  spinner.frame('reading .editorconfig')

  const { targetPath, configPath } = input
  let rawEditorconfig = null

  try {
    const configsPath = join(configPath, '/configs')
    const configsEditorconfigPath = join(configsPath, '.editorconfig')

    rawEditorconfig = await readFile(configsEditorconfigPath, 'utf8')
  } catch (err) {}

  // if upcoming config does not contain .editorconfig, try to read it from target project
  if (!rawEditorconfig) {
    try {
      const targetEditorconfigPath = join(targetPath, '.editorconfig')

      rawEditorconfig = await readFile(targetEditorconfigPath, 'utf8')
    } catch (err) {}
  }

  if (!rawEditorconfig) return input

  const [, ...filesConfigs] = editorconfig.parseString(rawEditorconfig)
  const format = filesConfigs.reduce((acc, item) => {
    const [extension, config] = item
    // editorconfig can't return boolean or numeric value
    const eof = get(config, 'insert_final_newline', 'true') === 'true'
    const indentSize = Number(get(config, 'indent_size', '2'))

    return Object.assign(acc, {
      [extension]: {
        indentType: config.indent_style || 'space',
        indentSize,
        eof,
      },
    })
  }, {})

  input.format = format

  return input
}

module.exports = readEditorconfig
