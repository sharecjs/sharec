const chalk = require('chalk')
const minimist = require('minimist')
const {
  getConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  extractPackageJsonConfigs,
  mergePackageJsonConfigs,
} = require('./lib')

async function sharec(basePath) {
  if (process.cwd() === process.env.PWD) return

  console.info(chalk.green('sharec: extracting configs 📦'))

  try {
    const configs = await getConfigs(basePath)
    const deps = await extractPackageJsonConfigs(basePath, configs)

    await installConfigsDependencies(deps)

    console.info(chalk.green('sharec: all configs were ejected 🙌'))
  } catch (err) {
    if (err.message.includes('ENOENT')) {
      console.error(
        chalk.red(
          'sharec: configs dir is not exists in current configuration!',
        ),
      )
    }
  }
}

module.exports = sharec
