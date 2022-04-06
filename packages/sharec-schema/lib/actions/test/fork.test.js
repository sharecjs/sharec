const { fixtures } = require('testUtils')
const fork = require('./fork')
const compose = require('./compose')
const { primitiveAtom, listConcatAtom } = require('../atoms')

describe('actions > fork', () => {
  const listFxt = fixtures('list/json/00-concat-primitives', 'map')

  it('should apply strategies for mixed parameters types', () => {
    const composition = compose({
      foo: fork([[Array.isArray, listConcatAtom], primitiveAtom]),
    })

    expect(
      composition({
        current: new Map().set('foo', listFxt.current),
        upcoming: new Map().set('foo', listFxt.upcoming),
      }),
    ).toEqual(new Map().set('foo', listFxt.result))
    expect(
      composition({
        current: new Map().set('foo', 'foo'),
        upcoming: new Map().set('foo', 'bar'),
      }),
    ).toEqual(new Map().set('foo', 'bar'))
  })
})
