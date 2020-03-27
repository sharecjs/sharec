const path = require('path')
const { writeFile } = require('../utils/std').fs
const { safeMakeDir } = require('../utils/fs')

const writeCache = spinner => async input => {
  const { upcomingPackage, configs, targetPath } = input
  const { name, version } = upcomingPackage

  spinner.frame(`Writing cache for ${name}/${version}`)

  const baseCachePath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${name}/${version}`,
  )

  await safeMakeDir(baseCachePath)

  for (const config in configs) {
    await writeFile(path.join(baseCachePath, config), configs[config])
  }

  spinner.succeed(`Configuration for ${name}/${version} was cached`)

  return input
}

module.exports = writeCache
