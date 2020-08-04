const commandsToMap = require('../commandsToMap')

describe('strategies > helpers > params > commandsToMap', () => {
  it('should trim EOF each params entry', () => {
    expect(
      commandsToMap({
        current: 'foo --bar --baz foo && bar -a=b & baz --a=b',
        upcoming: 'foo & bar | FOO=bar BAR=baz baz',
      }),
    ).toEqual({
      current: new Map([
        [
          'foo',
          new Map([
            ['separator', '&&'],
            ['env', []],
            ['args', ['--bar', '--baz', 'foo']],
          ]),
        ],
        [
          'bar',
          new Map([
            ['separator', '&'],
            ['env', []],
            ['args', ['-a=b']],
          ]),
        ],
        [
          'baz',
          new Map([
            ['separator', null],
            ['env', []],
            ['args', ['--a=b']],
          ]),
        ],
      ]),
      upcoming: new Map([
        [
          'foo',
          new Map([
            ['separator', '&'],
            ['env', []],
            ['args', []],
          ]),
        ],
        [
          'bar',
          new Map([
            ['separator', '|'],
            ['env', []],
            ['args', []],
          ]),
        ],
        [
          'baz',
          new Map([
            ['separator', null],
            ['env', ['FOO=bar', 'BAR=baz']],
            ['args', []],
          ]),
        ],
      ]),
    })
  })
})
