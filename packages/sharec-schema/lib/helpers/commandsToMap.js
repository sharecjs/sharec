// @ts-check
// TODO: move to parsers
const trim = require('lodash/trim')
const identity = require('lodash/identity')
const last = require('lodash/last')
const head = require('lodash/head')

/**
 * @typedef {import('../').ParsedCommand} ParsedCommand
 * @typedef {import('../').SchemaParams<string>} SchemaStringParams
 * @typedef {import('../').SchemaParams<ParsedCommand>} SchemaCommandsParams
 */

/**
 * Parse given object with raw cli-commands and returns parsed ones
 * for next merge
 * schema params
 * @param {SchemaStringParams} params
 * @returns {SchemaCommandsParams}
 */
function commandsToMap(params) {
  return Object.keys(params).reduce((acc, key) => {
    const parsedCommand = new Map()

    if (!params[key]) {
      return Object.assign(acc, {
        [key]: undefined,
      })
    }

    const splittedCommand = params[key].split(/([&|]{1,2}|;)/).map(trim)

    for (let i = 0; i < splittedCommand.length; i++) {
      const command = splittedCommand[i]
      const splittedSubcommand = command.split(/([A-Z0-9_-]+=\S+)\s/).filter(identity)
      const subcommandWithArgs = last(splittedSubcommand).split(' ')
      const subcommand = head(subcommandWithArgs).trim()
      const args = subcommandWithArgs.slice(1)
      const env = splittedSubcommand.slice(0, splittedSubcommand.length - 1)
      const parsedSubcommand = new Map([['separator', null]])

      if (splittedCommand[i + 1]) {
        parsedSubcommand.set('separator', splittedCommand[i + 1])
      }

      parsedSubcommand.set('env', env.map(trim))
      parsedSubcommand.set('args', args.map(trim))

      if (!parsedCommand.has(subcommand)) {
        parsedCommand.set(subcommand, [])
      }

      parsedCommand.set(subcommand, parsedCommand.get(subcommand).concat(parsedSubcommand))

      i++
    }

    return Object.assign(acc, {
      [key]: parsedCommand,
    })
  }, {})
}

module.exports = commandsToMap
