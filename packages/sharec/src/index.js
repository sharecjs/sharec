const minimist = require('minimist')
const { pwd } = require('shelljs')
const { createSpinner, createLogger } = require('./cli')
const { composeSteps, steps } = require('./steps')
const { CAUSES, InternalError } = require('./errors')

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
  const { env } = targetProcess
  const { _, ...options } = minimist(targetProcess.argv.slice(2))
  const debugMode = env.DEBUG
  const silentMode = options.s || options.silent
  const disappearMode = options.d || options.disappear
  const overwriteMode = options.o || options.overwrite

  // CLI utilities
  const spinner = createSpinner({
    text: 'Initializing sharec',
    silent: silentMode,
  })
  const logger = createLogger({
    prefix: 'debugger',
    silent: !debugMode,
  })

  // steps preparation and definition
  const targetPath = targetProcess.env.INIT_CWD
  const configPath = pwd().stdout
  const input = {
    targetPath,
    configPath,
    options: {
      silent: silentMode,
      overwrite: overwriteMode,
      disappear: disappearMode,
      debug: debugMode,
    },
  }

  logger.log('process env\n', env)
  logger.log('initial input\n', input)

  const commonFlow = composeSteps(
    logger.wrap(steps.readTargetPackage(spinner), 'readTargetPackage'),
    logger.wrap(steps.readUpcomingPackage(spinner), 'readUpcomingPackage'),
    logger.wrap(steps.isAlreadyInstalled(spinner), 'isAlreadyInstalled'),
    logger.wrap(steps.isDependantOfSharec(spinner), 'isDependantOfSharec'),
    logger.wrap(steps.isIgnoresSharecConfigs(spinner), 'isIgnoresSharecConfigs'),
    logger.wrap(steps.readConfigs(spinner), 'readConfigs'),
    logger.wrap(steps.readCache(spinner), 'readCache'),
    logger.wrap(steps.writeConfigs(spinner, 'writeConfigs')),
    logger.wrap(steps.writeCache(spinner), 'writeCache'),
    logger.wrap(steps.writeMeta(spinner), 'writeMeta'),
  )

  try {
    const finalInput = await commonFlow(input)

    logger.log('final input\n', finalInput)
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
      case CAUSES.IS_DEPENDANT_OF_SHAREC.symbol:
      case CAUSES.IS_IGNORES_SHAREC.symbol:
        break
      case CAUSES.ALREADY_INSTALLED.symbol:
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
