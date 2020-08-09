const commandsToMap = require('../helpers/params/commandsToMap')
const hashAtom = require('./hash')

function unwrapCommandsMap(maps) {
  const subcommands = []

  maps.forEach((value, key) => {
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
  })

  return subcommands.join(' ')
}

function commandAtom(params) {
  const { current, upcoming, cached } = commandsToMap(params)

  if (!upcoming) return unwrapCommandsMap(current)
  if (!current) return unwrapCommandsMap(upcoming)

  const result = hashAtom({
    current,
    upcoming,
    cached,
  })

  return unwrapCommandsMap(result)
}

module.exports = commandAtom
