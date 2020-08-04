const commandAtom = require('../command')

describe('atoms > command', () => {
  const commandFxt = {
    current: 'NODE_ENV=test foo && bar && baz',
    upcoming: 'NODE_ENV=production foo && bar --foo && baz --foo',
    cached: 'NODE_ENV=test foo && bar --baz && baz',
    result: 'NODE_ENV=production foo && bar && baz --foo',
  }
  const commandRemovedFxt = {
    current: 'bar && baz',
    upcoming: 'NODE_ENV=production foo && bar --foo && baz --foo',
    cached: 'NODE_ENV=test foo && bar --baz && baz',
    result: 'bar && baz --foo',
  }

  it('should return current if upcoming is not passed', () => {
    const result = commandAtom({ current: commandFxt.current })

    expect(result).toEqual(commandFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = commandAtom({ upcoming: commandFxt.upcoming })

    expect(result).toEqual(commandFxt.upcoming)
  })

  it('should merge rules with cache', () => {
    const result = commandAtom(commandFxt)

    expect(result).toEqual(commandFxt.result)
  })

  it('should handle removed parts', () => {
    const result = commandAtom(commandRemovedFxt)

    expect(result).toEqual(commandRemovedFxt.result)
  })
})
