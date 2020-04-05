const { fixtures } = require('testUtils')
const compose = require('../../compose')
const { listConcatAtom } = require('../../../atoms')

describe('actions > compose > array', () => {
  const listConcatBaseFxt = fixtures('atomic/list/json/00-concat-primitives', 'json')

  it('should create composition for hashes', () => {
    const composition = compose([listConcatAtom])
    const result = composition(listConcatBaseFxt)

    expect(result).toEqual(listConcatBaseFxt.result)
  })
})
