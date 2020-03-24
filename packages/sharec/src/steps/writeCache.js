const path = require('path')
const { writeFile } = require('../utils/std').fs
const { safeMakeDir } = require('../utils/fs')

const writeCache = async input => {
  const { upcomingPackage, configs, targetPath } = input
  const { name, version } = upcomingPackage
  const baseCachePath = path.join(
    targetPath,
    `node_modules/.cache/sharec/${name}/${version}`,
  )

  await safeMakeDir(baseCachePath)

  for (const config in configs) {
    await writeFile(path.join(baseCachePath, config), configs[config])
  }
}

module.exports = writeCache
