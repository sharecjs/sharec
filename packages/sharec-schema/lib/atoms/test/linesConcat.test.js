const { fixtures } = require('testUtils')
const linesConcatAtom = require('../linesConcat')

describe('atoms > linesConcat', () => {
  const concatLinesFxt = fixtures('lines/lines/01-concat')

  it('should return current if upcoming is not passed', () => {
    const result = linesConcatAtom({ current: concatLinesFxt.current })

    expect(result).toMatchSnapshot()
  })

  it('should return upcoming if current is not passed', () => {
    const result = linesConcatAtom({ upcoming: concatLinesFxt.upcoming })

    expect(result).toMatchSnapshot()
  })

  it('should merge lines as lists', () => {
    expect(linesConcatAtom(concatLinesFxt)).toMatchSnapshot()
  })
})
