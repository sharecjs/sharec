const commandsToLists = require('../helpers/params/commandsToLists')
const listMergeAtom = require('./listMerge')
const hashAtom = require('./hash')

function concatCommandsMaps(maps) {
  return maps
    .reduce((acc, part) => {
      const command = part.get('command')
      const operator = part.get('operator')

      if (operator) {
        return `${acc} ${command} ${operator}`
      }

      return `${acc} ${command}`
    }, '')
    .trim()
}

function commandAtom(params) {
  const { current, upcoming, cached } = commandsToLists(params)

  if (!upcoming) return concatCommandsMaps(current)
  if (!current) return concatCommandsMaps(upcoming)

  const result = listMergeAtom(hashAtom)({ current, upcoming, cached })

  return concatCommandsMaps(result)
}

module.exports = commandAtom
