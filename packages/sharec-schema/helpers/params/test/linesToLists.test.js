const linesToLists = require('../linesToLists')

describe('strategies > helpers > params > linesToLists', () => {
  it('should trim EOF each params entry', () => {
    expect(
      linesToLists({
        current: 'foo\nbar\nbaz',
        upcoming: 'foo\nbar\nbaz',
      }),
    ).toEqual({
      current: ['foo', 'bar', 'baz'],
      upcoming: ['foo', 'bar', 'baz'],
    })
  })
})
