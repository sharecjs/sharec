const { fixtures } = require('testUtils')
const variant = require('../variant')
const compose = require('../compose')
const { primitiveStrategy, listStrategy } = require('../../atoms')

describe('actions > variant', () => {
  const listFxt = fixtures('list/json/00-base', 'json')

  it('should apply strategies for mixed parameters types', () => {
    const composition = compose({
      foo: variant(listStrategy, primitiveStrategy),
    })

    expect(
      composition({
        current: { foo: listFxt.current },
        upcoming: { foo: listFxt.upcoming },
        cached: { foo: listFxt.cached },
      }),
    ).toEqual({
      foo: listFxt.result,
    })
  })
})
