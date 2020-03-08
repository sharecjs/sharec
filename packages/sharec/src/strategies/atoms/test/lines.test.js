const { fixtures } = require('testUtils')
const linesAtom = require('../lines')

describe('atoms > lines', () => {
  const baseLinesFxt = fixtures('lines/lines/00-base')

  it('should return current if upcoming is not passed', () => {
    const result = linesAtom({ current: baseLinesFxt.current })

    expect(result).toEqual(baseLinesFxt.current)
  })

  it('should return upcoming if current is not passed', () => {
    const result = linesAtom({ upcoming: baseLinesFxt.upcoming })

    expect(result).toEqual(baseLinesFxt.upcoming)
  })

  it('should return upcoming if types of data are not equal', () => {
    expect(linesAtom(baseLinesFxt)).toEqual(baseLinesFxt.result)
  })
})
