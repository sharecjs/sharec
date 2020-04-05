const { vol } = require('memfs')
const { find } = require('../fs')

describe('utils > fs > find', () => {
  beforeEach(() => {
    vol.reset()
  })

  it('should find all files matched by given path', async () => {
    const dir = {
      'foo/bar/baz.txt': 'foo',
      'bar/baz.txt': 'foo',
      'baz.txt': 'foo',
    }

    vol.fromJSON(dir, '/')

    const res = await find('/', '**/baz.txt')

    expect(res).toHaveLength(3)
    expect(res).toEqual(
      expect.arrayContaining(['/baz.txt', '/bar/baz.txt', '/foo/bar/baz.txt']),
    )
  })
})
