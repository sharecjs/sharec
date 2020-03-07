const { fixtures } = require('testUtils')
const listMergeAtom = require('../listMerge')
const primitiveAtom = require('../primitive')
const hashAtom = require('../hash')

describe('atoms > listMerge', () => {
  const primitivesListFxt = fixtures('list/json/01-merge-primitives', 'json')
  const hashesListFxt = fixtures('list/json/02-merge-hashes', 'json')

  it('should return current if upcoming is not passed', () => {
    expect(
      listMergeAtom(primitiveAtom)({ current: primitivesListFxt.current }),
    ).toEqual(primitivesListFxt.current)
    expect(listMergeAtom(hashAtom)({ current: hashesListFxt.current })).toEqual(
      hashesListFxt.current,
    )
  })

  it('should return upcoming if current is not passed', () => {
    expect(
      listMergeAtom(primitiveAtom)({ upcoming: primitivesListFxt.upcoming }),
    ).toEqual(primitivesListFxt.upcoming)
    expect(
      listMergeAtom(hashAtom)({ upcoming: hashesListFxt.upcoming }),
    ).toEqual(hashesListFxt.upcoming)
  })

  it('should merge primitives lists', () => {
    expect(listMergeAtom(primitiveAtom)(primitivesListFxt)).toEqual(
      primitivesListFxt.result,
    )
  })

  it('should merge hashes lists', () => {
    expect(listMergeAtom(hashAtom)(hashesListFxt)).toEqual(hashesListFxt.result)
  })
})
