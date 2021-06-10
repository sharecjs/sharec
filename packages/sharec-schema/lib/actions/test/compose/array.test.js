const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { listConcatAtom } = require('../../../atoms')

describe('actions > compose > array', () => {
  const listConcatBaseFxt = fixtures('list/json/00-concat-primitives', 'map')

  it('should create composition for hashes', () => {
    const composition = compose([listConcatAtom])
    const result = composition(listConcatBaseFxt)

    expect(result).toEqual(listConcatBaseFxt.result)
  })
})
