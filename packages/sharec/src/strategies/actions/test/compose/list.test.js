const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { primitiveAtom, hashAtom } = require('../../../atoms')

describe('actions > compose > list', () => {
  const listFxt = fixtures('list/json/00-base', 'json')
  const indexedListFxt = fixtures('list/json/01-indexed', 'json')

  it('should create composition for lists', () => {
    const composition = compose([primitiveAtom])
    const result = composition(listFxt)

    expect(result).toEqual(listFxt.result)
  })

  it('should create composition for indexed lists', () => {
    const composition = compose([primitiveAtom, hashAtom])
    const result = composition(indexedListFxt)

    expect(result).toEqual(indexedListFxt.result)
  })
})
