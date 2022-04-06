const { fixtures } = require('testUtils')
const compose = require('../compose')
const { listConcatAtom } = require('../../atoms')

describe('actions > compose > mixed', () => {
  const listFxt = fixtures('list/json/00-concat-primitives', 'map')

  it('should allow to compose nested schemas', () => {
    const composition = compose({
      foo: compose({
        bar: listConcatAtom,
      }),
    })
    const result = composition({
      current: new Map().set('foo', new Map().set('bar', listFxt.current)),
      upcoming: new Map().set('foo', new Map().set('bar', listFxt.upcoming)),
      cached: new Map().set('foo', new Map().set('bar', listFxt.cached)),
    })

    expect(result).toEqual(new Map().set('foo', new Map().set('bar', listFxt.result)))
  })
})
