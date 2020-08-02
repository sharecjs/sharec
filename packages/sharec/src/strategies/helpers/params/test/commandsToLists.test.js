const commandsToLists = require('../commandsToLists')

describe('strategies > helpers > params > commandsToLists', () => {
  it('should trim EOF each params entry', () => {
    expect(
      commandsToLists({
        current: 'foo && bar & baz',
        upcoming: 'foo & bar | baz',
      }),
    ).toEqual({
      current: [
        new Map().set('command', 'foo').set('operator', '&&'),
        new Map().set('command', 'bar').set('operator', '&'),
        new Map().set('command', 'baz').set('operator', null),
      ],
      upcoming: [
        new Map().set('command', 'foo').set('operator', '&'),
        new Map().set('command', 'bar').set('operator', '|'),
        new Map().set('command', 'baz').set('operator', null),
      ],
    })
  })
})
