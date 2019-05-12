const chalk = require('chalk')
const minimist = require('minimist')
const {
  setAsInjected,
  getInjectStatus,
  getConfigs,
  copyConfigs,
  getDependenciesFromConfigs,
  installConfigsDependencies,
  updatePackageJson,
} = require('./lib')

/**
 * @param {String} basePath
 * @returns {Promise}
 */
async function sharec(basePath) {
  if (basePath === process.env.PWD) return

  const isInjected = await getInjectStatus()

  if (isInjected) {
    console.warn(
      chalk.yellow(
        'sharec: already was injected. You can remove sharec property from your package.json, only if you really shure! ☝️',
      ),
    )
    return
  }

  console.info(chalk.green('sharec: extracting configs 📦'))

  try {
    const configs = await getConfigs(process.env.PWD)
    const deps = await getDependenciesFromConfigs(process.env.PWD, configs)

    await copyConfigs(process.env.PWD, basePath, configs)
    await updatePackageJson(process.env.PWD, basePath, configs)
    await setAsInjected(basePath)

    console.info(
      chalk.green(
        'sharec: all configs were ejected. Run "npm install" command to install new dependencies! 🙌',
      ),
    )
  } catch (err) {
    console.log(err)
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
