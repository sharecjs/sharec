const path = require('path')
const { writeFile } = require('../utils/std').fs
const { safeMakeDir } = require('../utils/fs')

const writeCache = spinner => async input => {
  const { upcomingPackage, configs, targetPath, options } = input
  const { name, version } = upcomingPackage

  if (options.disappear) return input

  spinner.frame(`writing cache for ${name}/${version}`)

  const baseCachePath = path.join(targetPath, `node_modules/.cache/sharec/${name}/${version}`)

  await safeMakeDir(baseCachePath)

  for (const config in configs) {
    await writeFile(path.join(baseCachePath, config), configs[config])
  }

  spinner.frame(`configuration for ${name}/${version} was cached`)

  return input
}

module.exports = writeCache
