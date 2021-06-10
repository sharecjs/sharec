// @ts-check
const commandsToMap = require('../helpers/commandsToMap')
const hashAtom = require('./hash')

/**
 * @typedef {import('../').ParsedCommand} ParsedCommand
 * @typedef {import('../').SchemaParam<ParsedCommand>} SchemaCommandParam
 * @typedef {import('../').SchemaParams<string>} SchemaRawCommandParams
 */

/**
 * Transforms passed with parsed command map to ready to execution or
 * using in `package.json` string
 * @param {ParsedCommand} commandMap
 * @returns {string}
 */
function unwrapCommandsMap(commandMap) {
  const subcommands = []

  commandMap.forEach((value, key) => {
    if (value.length === 0) {
      subcommands.push(key)
      return
    }

    value.forEach((item) => {
      let subcommand = key
      const env = item.get('env')
      const args = item.get('args')
      const separator = item.get('separator')

      if (env.length > 0) {
        // just because it is not possible to correctly define type for this
        // @ts-ignore
        subcommand = `${env.join(' ')} ${subcommand}`
      }

      if (args.length > 0) {
        // for this either
        // @ts-ignore
        subcommand = `${subcommand} ${args.join(' ')}`
      }

      if (separator) {
        subcommand = `${subcommand} ${separator}`
      }

      subcommands.push(subcommand)
    })
  })

  return subcommands.join(' ')
}

/**
 * Merges parsed cli-commands and returns cli-command string
 * @param {SchemaRawCommandParams} params
 * @returns {string}
 */
function commandAtom(params) {
  const { current, upcoming, cached } = commandsToMap(params)

  if (!upcoming) return unwrapCommandsMap(current)
  if (!current) return unwrapCommandsMap(upcoming)

  const result = hashAtom({
    current,
    upcoming,
    cached,
  })

  // @ts-ignore
  return unwrapCommandsMap(result)
}

module.exports = commandAtom
