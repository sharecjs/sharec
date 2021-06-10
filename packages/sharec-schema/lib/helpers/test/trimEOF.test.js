const trimEOF = require('../trimEOF')

describe('strategies > helpers > params > trimEOF', () => {
  it('should trim EOF each params entry', () => {
    expect(
      trimEOF({
        current: 'foo\nbar\nbaz\n',
        upcoming: 'foo\nbar\nbaz\n',
      }),
    ).toEqual({
      current: 'foo\nbar\nbaz',
      upcoming: 'foo\nbar\nbaz',
    })
  })
})
