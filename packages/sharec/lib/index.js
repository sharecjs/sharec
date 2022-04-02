// @ts-check
const minimist = require('minimist')
const { sharec: sharecCore, errorCauses, InternalError } = require('sharec-core')
const { createSpinner } = require('./spinner')

/**
 * Main sharec entrance, accepts node process all files and configuration
 * On any error will notify user and exit with status 1
 * In other cases will exit with status 0, and notify user with informative
 * message
 * In the future, should be moved to sharec-core package, all CLI things
 * should be isolated in sharec-cli package or just sharec
 * @param {NodeJS.Process} targetProcess Node process
 * @returns {Promise<void>}
 */
async function sharec(targetProcess) {
  // input options
  const { _, ...options } = minimist(targetProcess.argv.slice(2))

  // CLI utilities
  const spinner = createSpinner({
    text: 'Initializing sharec',
  })

  // steps preparation and definition
  const targetPath = targetProcess.env.INIT_CWD
  const input = {
    targetPath,
    targetPackage: null,
    configs: {},
    mergedConfigs: {},
    cache: {},
    options: {
      cache: options.c || options.cache || true,
    },
  }

  try {
    await sharecCore(input)

    spinner.succeed('configuration was installed')
    targetProcess.exit(0)
  } catch (err) {
    if (!(err instanceof InternalError)) {
      spinner.fail('Configuration was not fully applyed due unexpected error')
      console.error(err)
      targetProcess.exit(1)
    }

    // errors which can be handled
    switch (err.cause) {
      case errorCauses.IS_DEPENDANT_OF_SHAREC.symbol:
      case errorCauses.IS_IGNORES_SHAREC.symbol:
        break
      case errorCauses.ALREADY_INSTALLED.symbol:
        spinner.succeed(err.message)
        break
      default:
        // unhadled internal errors
        spinner.fail(err.message)
        targetProcess.exit(1)
    }
  }
}

module.exports = sharec
