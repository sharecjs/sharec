const { readFile } = require('../utils/std').fs
const { resolve } = require('../utils/std').path

const readUpcomingPackage = ({ spinner, prompt }) => async (input) => {
  try {
    spinner.frame('reading package.json from upcoming configuration')

    const upcomingPackageJsonPath = resolve(input.configPath, 'package.json')
    const rawUpcomingPackageJson = await readFile(upcomingPackageJsonPath, 'utf8')
    const upcomingPackage = JSON.parse(rawUpcomingPackageJson)

    spinner.frame('package.json from upcoming configuration was readed')

    input.upcomingPackage = upcomingPackage

    return input
  } catch (err) {
    spinner.fail("Upcoming configuration's package.json was not readed")

    throw err
  }
}

module.exports = readUpcomingPackage
