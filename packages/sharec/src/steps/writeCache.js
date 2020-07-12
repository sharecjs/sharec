const { writeFile } = require('../utils/std').fs
const { join, dirname } = require('../utils/std').path
const { safeMakeDir } = require('../utils/fs')

const writeCache = ({ spinner, prompt }) => async (input) => {
  const { upcomingPackage, configs, targetPath, options } = input
  const { name, version } = upcomingPackage
  const { disappear, overwrite, includeCache } = options

  if (disappear || overwrite) return input

  spinner.frame(`writing cache for ${name}/${version}`)

  let cachePath = includeCache ? join(targetPath, '.sharec/.cache') : join(targetPath, 'node_modules/.cache/sharec')

  cachePath = join(cachePath, `${name}/${version}`)

  await safeMakeDir(cachePath)

  for (const config in configs) {
    await safeMakeDir(join(cachePath, dirname(config)))
    await writeFile(join(cachePath, config), configs[config])
  }

  spinner.frame(`configuration for ${name}/${version} was cached`)

  return input
}

module.exports = writeCache
