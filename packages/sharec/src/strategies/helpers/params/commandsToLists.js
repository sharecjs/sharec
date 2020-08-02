function commandsToLists(params) {
  return Object.keys(params).reduce((acc, key) => {
    const splittedCommand = params[key].split(/(\||&{1,2})/)
    const parsedCommand = []

    for (let i = 0; i < splittedCommand.length; i++) {
      if (!splittedCommand[i + 1]) {
        parsedCommand.push(new Map().set('command', splittedCommand[i].trim()).set('operator', null))
        continue
      }

      parsedCommand.push(new Map().set('command', splittedCommand[i].trim()).set('operator', splittedCommand[i + 1]))
      i++
    }

    return Object.assign(acc, {
      [key]: parsedCommand,
    })
  }, {})
}

module.exports = commandsToLists
