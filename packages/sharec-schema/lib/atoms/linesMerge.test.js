const { fixtures } = require('testUtils')
const linesMergeAtom = require('./linesMerge')

describe('atoms > linesMerge', () => {
  const mergeLinesFxt = fixtures('lines/lines/00-merge')

  it('should return current if upcoming is not passed', () => {
    const result = linesMergeAtom({ current: mergeLinesFxt.current })

    expect(result).toEqual(mergeLinesFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = linesMergeAtom({ upcoming: mergeLinesFxt.upcoming })

    expect(result).toEqual(mergeLinesFxt.upcoming)
  })

  it('should merge lines as lists', () => {
    expect(linesMergeAtom(mergeLinesFxt)).toMatchSnapshot()
  })
})
