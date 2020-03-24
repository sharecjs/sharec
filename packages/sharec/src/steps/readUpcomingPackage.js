const path = require('path')
const { readFile } = require('../utils/std').fs

const readUpcomingPackage = async input => {
  try {
    const upcomingPackageJsonPath = path.resolve(
      input.configPath,
      'package.json',
    )
    const rawUpcomingPackageJson = await readFile(
      upcomingPackageJsonPath,
      'utf8',
    )
    const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

    return Object.assign(input, {
      upcomingPackage,
    })
  } catch (err) {
    // TODO:
    throw err
  }
}

module.exports = readUpcomingPackage
