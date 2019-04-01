const chalk = require('chalk')

// const path = require('path')
// const { readDir, readFile, copyFile, exec } = require('./utils')

// const processConfigs = async configs => {
//   if (configs.includes('package.json')) {
//     const pkg = await readFile(path.join(CONFIGS_DIR, 'package.json'))
//     const { dependencies = {}, devDependencies = {} } = JSON.parse(pkg)
//
//     await processDeps(dependencies, devDependencies)
//   }
//
//   await Promise.all(
//     configs
//       .filter(config => config !== 'package.json')
//       .map(config => copyFile(path.join(CURRENT_DIR, config))),
//   )
// }
//
// const formatDeps = deps =>
//   Object.keys(deps).reduce((acc, key) => acc.concat(`${key}@${deps[key]}`), [])
//
// const processDeps = async (deps, devDeps) => {
//   await installDeps(formatDeps(deps))
//   await installDeps(formatDeps(devDeps), true)
// }
//
// const installDeps = async (deps, devMode) => {
//   const command = devMode ? 'npm i --save-dev' : 'npm i --save'
//
//   await Promise.all(deps.map(dep => exec(`${command} ${dep}`)))
// }
//
// const main = async () => {
//   console.info(chalk.green('Starting configs installing... 🚀'))
//
//   try {
//     const configs = await getConfigsList()
//
//     await processConfigs(configs)
//
//     console.info(chalk.green('All done! 📦'))
//   } catch (err) {
//     console.error(`Something wrong: ${err}`)
//   }
// }
//
// ;(async () => {
//   await main()
// })()

async function sharec(basePath) {

  console.info(chalk.green(path))
}

module.exports = sharec