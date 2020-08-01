const { bold } = require('chalk')
const { getConfigPipe } = require('../strategies/pipes')
const { readFile } = require('../utils/std').fs
const { join, dirname, basename } = require('../utils/std').path

const mergeConfigs = ({ spinner, prompt }) => async (input) => {
  const { configs, cache = {}, targetPath, options } = input
  const { overwrite, interactive } = options

  spinner.frame('merging configuration')

  for (const config in configs) {
    const upcomingConfig = configs[config]

    if (!upcomingConfig) continue

    let currentConfig
    let isMergeConfirmed = !interactive
    let targetConfigPath = join(targetPath, config)
    const targetConfigBasename = basename(config)
    const isPackageJson = targetConfigBasename === 'package.json'
    const isOverwritePackageJson = isPackageJson && overwrite
    const targetPipe = getConfigPipe(targetConfigPath)

    if (targetPipe && targetPipe.alias) {
      targetConfigPath = join(dirname(targetConfigPath), targetPipe.alias)
    }

    try {
      currentConfig = await readFile(targetConfigPath, 'utf8')
    } catch (err) {}

    if (currentConfig && interactive) {
      isMergeConfirmed = await prompt.confirm(`Do you want to update ${bold(targetConfigPath)}?`)
    }

    // if user has not accepted merge -- skip file
    if (!isMergeConfirmed) {
      continue
    }

    if (!targetPipe) {
      input.mergedConfigs[targetConfigPath] = upcomingConfig
      continue
    }

    // package.json can't be overwrited
    if (overwrite && !isPackageJson) {
      input.mergedConfigs[targetConfigPath] = upcomingConfig
      continue
    }

    const cachedConfig = !isOverwritePackageJson ? cache[config] : undefined

    // skip config if it was fully removed by user
    if (!currentConfig && cachedConfig) {
      continue
    }

    const mergedConfig = targetPipe.processor({
      current: currentConfig,
      upcoming: upcomingConfig,
      cached: cachedConfig,
    })

    input.mergedConfigs[targetConfigPath] = mergedConfig
  }

  spinner.frame('configuration was merged')

  return input
}

module.exports = mergeConfigs
