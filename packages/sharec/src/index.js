const chalk = require('chalk')
const minimist = require('minimist')
const {
  getConfigs,
  copyConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  updatePackageJson,
} = require('./lib')

async function sharec(basePath) {
  if (basePath === process.env.PWD) return

  console.info(chalk.green('sharec: extracting configs 📦'))

  try {
    const configs = await getConfigs(process.env.PWD)
    const deps = await getDependenciesFromConfigs(process.env.PWD, configs)

    await copyConfigs(process.env.PWD, basePath, configs)
    await updatePackageJson(process.env.PWD, basePath, configs)
    await installConfigsDependencies(basePath, deps)

    console.info(chalk.green('sharec: all configs were ejected 🙌'))
  } catch (err) {
    if (err.message.includes('ENOENT') && err.path.includes('/configs')) {
      console.error(
        chalk.red(
          'sharec: configs dir is not exists in current configuration!',
        ),
      )
    }
  }
}

module.exports = sharec
