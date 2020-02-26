const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { primitiveAtom } = require('../../../atoms')

describe('actions > compose > mixed', () => {
  const listFxt = fixtures('list/json/00-base', 'json')

  it('should allow to compose nested schemas', () => {
    const composition = compose({
      foo: compose([primitiveAtom]),
    })
    const result = composition({
      current: { foo: listFxt.current },
      upcoming: { foo: listFxt.upcoming },
      cached: { foo: listFxt.cached },
    })

    expect(result).toEqual({ foo: listFxt.result })
  })
})
