const { fixtures } = require('testUtils')
const listConcatAtom = require('./listConcat')

describe('atoms > listConcat', () => {
  const primitivesListFxt = fixtures('list/json/00-concat-primitives', 'map')
  const hashesListFxt = fixtures('list/json/03-concat-hashes', 'map')

  it('should return current if upcoming is not passed', () => {
    expect(listConcatAtom({ current: primitivesListFxt.current })).toEqual(primitivesListFxt.current)
    expect(listConcatAtom({ current: hashesListFxt.current })).toEqual(hashesListFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    expect(listConcatAtom({ upcoming: primitivesListFxt.upcoming })).toEqual(primitivesListFxt.upcoming)
    expect(listConcatAtom({ upcoming: hashesListFxt.upcoming })).toEqual(hashesListFxt.upcoming)
  })

  it('should concat primitives lists', () => {
    expect(listConcatAtom(primitivesListFxt)).toEqual(primitivesListFxt.result)
  })

  it('should concat hashes lists', () => {
    expect(listConcatAtom(hashesListFxt)).toEqual(hashesListFxt.result)
  })
})
