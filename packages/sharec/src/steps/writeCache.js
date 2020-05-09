const { writeFile } = require('../utils/std').fs
const { join, dirname } = require('../utils/std').path
const { safeMakeDir } = require('../utils/fs')

const writeCache = spinner => async input => {
  const { upcomingPackage, configs, targetPath, options } = input
  const { name, version } = upcomingPackage
  const { disappear, overwrite } = options

  if (disappear || overwrite) return input

  spinner.frame(`writing cache for ${name}/${version}`)

  const baseCachePath = join(targetPath, `node_modules/.cache/sharec/${name}/${version}`)

  await safeMakeDir(baseCachePath)

  for (const config in configs) {
    await safeMakeDir(join(baseCachePath, dirname(config)))
    await writeFile(join(baseCachePath, config), configs[config])
  }

  spinner.frame(`configuration for ${name}/${version} was cached`)

  return input
}

module.exports = writeCache
