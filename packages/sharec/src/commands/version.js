const pkg = require('../../package.json')
const { getUpcomingPackageJsonMetaData } = require('../core/package/extract')

async function version(configsPath) {
  const lines = [`Sharec: ${pkg.version}`]

  if (configsPath) {
    const upcomingMeta = await getUpcomingPackageJsonMetaData(configsPath)

    lines.push(`Configuration: ${upcomingMeta.config}@${upcomingMeta.version}`)
  }

  console.info(lines.join('\n'))
}

module.exports = version
