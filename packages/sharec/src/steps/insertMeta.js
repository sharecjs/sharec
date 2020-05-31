const { join } = require('../utils/std').path

const insertMeta = (spinner) => async (input) => {
  const { options, mergedConfigs } = input
  const { disappear, overwrite } = options

  if (disappear || overwrite) return input

  spinner.frame('inserting sharec meta data')

  const { name, version } = input.upcomingPackage
  const targetPackagePath = join(input.targetPath, 'package.json')
  const targetPackage = mergedConfigs[targetPackagePath]
    ? JSON.parse(mergedConfigs[targetPackagePath])
    : input.targetPackage

  targetPackage.sharec = {
    config: name,
    version,
  }

  input.mergedConfigs[targetPackagePath] = JSON.stringify(targetPackage, null, 2)

  spinner.frame('sharec meta data was inserted')

  return input
}

module.exports = insertMeta
