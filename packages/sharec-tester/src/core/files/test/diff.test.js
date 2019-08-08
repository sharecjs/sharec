const { fitSourceLines, createFilesDiff } = require('../diff')

describe('files > diff >', () => {
  describe('fitSourceLines', () => {
    it('should fit lines with empty lines for given length', () => {
      const lines = [
        'foo',
        'bar',
        'baz'
      ]

      expect(fitSourceLines({lines, fitCount: 5})).toEqual([
       'foo',
        'bar',
        'baz',
        '',
        ''
      ])
    })

    it('should return linex if fitCount less or equal to lines length', () => {
      const lines = ['foo', 'bar', 'baz']

      expect(fitSourceLines({ lines, fitCount: 1 })).toEqual(lines)
      expect(fitSourceLines({ lines, fitCount: 3 })).toEqual(lines)
    })
  })

  // describe('createFilesDiff', () => {
  //   it('should do something', () => {
  //     expect(1 + 1).toBe(3)
  //   })
  // })
})
