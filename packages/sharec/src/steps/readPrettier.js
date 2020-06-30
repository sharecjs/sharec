const get = require('lodash/get')
const { readFile } = require('../utils/std').fs
const { join } = require('../utils/std').path

const readPrettier = (spinner) => async (input) => {
  spinner.frame('reading prettier configuration')

  const { targetPath, configPath, targetPackage, upcomingPackage } = input
  let prettierrc = null

  try {
    const configsPath = join(configPath, '/configs')
    const configsPrettierrcPath = join(configsPath, '.prettierrc')
    const rawPrettierrc = await readFile(configsPrettierrcPath, 'utf8')

    prettierrc = JSON.parse(rawPrettierrc)
  } catch (err) {}

  // if upcoming config does not contain .editorconfig, try to read it from target project
  if (!prettierrc) {
    try {
      const targetPrettierrcPath = join(targetPath, '.prettierrc')
      const rawPrettierrc = await readFile(targetPrettierrcPath, 'utf8')

      prettierrc = JSON.parse(rawPrettierrc)
    } catch (err) {}
  }

  // try to read prettier config from upcoming package.json
  if (!prettierrc && get(upcomingPackage, 'prettier')) {
    prettierrc = upcomingPackage.prettier
  }

  // try to read prettier config from target package.json
  if (!prettierrc && get(targetPackage, 'prettier')) {
    prettierrc = targetPackage.prettier
  }

  if (!prettierrc) return input

  input.format = {
    '*': {
      indentType: prettierrc.tab ? 'tab' : 'space',
      indentSize: prettierrc.tabWidth || 2,
      eof: true,
    },
  }

  return input
}

module.exports = readPrettier
