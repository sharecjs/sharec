// @ts-check
const minimist = require('minimist')
const { sharec: sharecCore } = require('sharec-core')
const { createSpinner } = require('nanospinner')

/**
 * @typedef {import('nanospinner').Spinner} Spinner
 */

/**
 * Main sharec entrance, accepts node process
 * On any unexpected error notifies the user and exits with status 1
 * In the other cases exits with status 0
 * @param {NodeJS.Process} targetProcess Node process
 * @returns {Promise<void>}
 */
async function sharec(targetProcess) {
  /** @type {Spinner|null} */
  let spinner = null

  const { _, ...options } = minimist(targetProcess.argv.slice(2))
  const targetPath = targetProcess.env.INIT_CWD
  const input = {
    targetPath,
    options: {
      cache: options.c || options.cache || true,
    },
  }

  try {
    await sharecCore(
      input,
      {
        start: text => {
          spinner = createSpinner(text).start()
        },
        success: text => {
          if (!spinner) return

          spinner.success({ text })
          spinner = null
        },
        error: text => {
          if (!spinner) return

          spinner.error({ text })
          spinner = null
        },
        fail: text => {
          if (spinner) {
            spinner.error({ text })
            spinner = null
          }

          targetProcess.exit(1)
        },
      },
    )

    targetProcess.exit(0)
  } catch (err) {
    if (spinner) {
      spinner.error({ text: "Configuration hasn't been applyed due unexpected error!" })
      spinner = null
    } else {
      console.error("Configuration hasn't been applyed due unexpected error!")
    }

    console.error(err)

    targetProcess.exit(1)
  }
}

module.exports = sharec
