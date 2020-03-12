const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { listConcatAtom } = require('../../../atoms')

describe('actions > compose > mixed', () => {
  const listFxt = fixtures('list/json/00-concat-primitives', 'json')

  it('should allow to compose nested schemas', () => {
    const composition = compose({
      foo: compose({
        bar: listConcatAtom,
      }),
    })
    const result = composition({
      current: { foo: { bar: listFxt.current } },
      upcoming: { foo: { bar: listFxt.upcoming } },
      cached: { foo: { bar: listFxt.cached } },
    })

    expect(result).toEqual({ foo: { bar: listFxt.result } })
  })
})
