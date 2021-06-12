const { vol } = require('memfs')
const { safeMakeDir, find } = require('./fs')

describe('utils > fs >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('safeMakeDir', () => {
    it('should create directories by given path recursively', async () => {
      vol.fromJSON({}, '/')

      await safeMakeDir('/foo/bar/baz')

      expect(vol.readdirSync('/foo/bar')).toEqual(['baz'])
    })
  })

  describe('find', () => {
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
      expect(res).toEqual(expect.arrayContaining(['/baz.txt', '/bar/baz.txt', '/foo/bar/baz.txt']))
    })
  })
})
