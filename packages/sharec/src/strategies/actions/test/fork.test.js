const { fixtures } = require('testUtils')
const fork = require('../fork')
const compose = require('../compose')
const { primitiveAtom, listConcatAtom } = require('../../atoms')

describe('actions > fork', () => {
  const listFxt = fixtures('atomic/list/json/00-concat-primitives', 'json')

  it('should apply strategies for mixed parameters types', () => {
    const composition = compose({
      foo: fork([[Array.isArray, listConcatAtom], primitiveAtom]),
    })

    expect(
      composition({
        current: { foo: listFxt.current },
        upcoming: { foo: listFxt.upcoming },
      }),
    ).toEqual({
      foo: listFxt.result,
    })
    expect(
      composition({
        current: { foo: 'foo' },
        upcoming: { foo: 'bar' },
      }),
    ).toEqual({
      foo: 'bar',
    })
  })
})
