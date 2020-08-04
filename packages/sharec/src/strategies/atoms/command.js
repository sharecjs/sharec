const commandsToMap = require('../helpers/params/commandsToMap')
const hashAtom = require('./hash')

function unwrapCommandsMap(maps) {
  const subcommands = []

  maps.forEach((value, key) => {
    let subcommand = key
    const env = value.get('env')
    const args = value.get('args')
    const separator = value.get('separator')

    if (env.length > 0) {
      subcommand = `${env.join(' ')} ${subcommand}`
    }

    if (args.length > 0) {
      subcommand = `${subcommand} ${args.join(' ')}`
    }

    if (separator) {
      subcommand = `${subcommand} ${separator}`
    }

    subcommands.push(subcommand)
  })

  return subcommands.join(' ')
}

function commandAtom(params) {
  const { current, upcoming, cached } = commandsToMap(params)

  if (!upcoming) return unwrapCommandsMap(current)
  if (!current) return unwrapCommandsMap(upcoming)

  const result = hashAtom({ current, upcoming, cached })

  return unwrapCommandsMap(result)
}

module.exports = commandAtom
