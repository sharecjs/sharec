const { vol } = require('memfs')
const { normalizePathSlashes, flatSearch, safeMakeDir } = require('../fs')

describe('utils > fs >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('normalizePathSlashes', () => {
    it('should transform windows-like slashes to normal', () => {
      expect(normalizePathSlashes(['foo\\bar.js', 'bar/baz.js'])).toEqual([
        'foo/bar.js',
        'bar/baz.js',
      ])
    })
  })

  describe('safeMakeDir', () => {
    it('should create directories by given path recursively', async () => {
      expect.assertions(1)

      vol.fromJSON({}, '/')

      await safeMakeDir('/foo/bar/baz')

      expect(vol.readdirSync('/foo/bar')).toEqual(['baz'])
    })
  })

  describe('flatSearch', () => {
    const dir = {
      '/.bar': 'bar',
      '/foo/.foo': 'foo',
      '/baz/baz/.foo': 'foo',
      '/baz/baz/bar.txt': 'bar',
      '/baz/baz/baz.txt': 'baz',
      '/empty': {},
    }

    beforeEach(() => {
      vol.fromJSON(dir, '/')
    })

    it('should find all files paths in target dir', async () => {
      expect.assertions(1)

      const res = await flatSearch({
        path: '/',
      })

      expect(res).toEqual([
        '.bar',
        'baz/baz/.foo',
        'baz/baz/bar.txt',
        'baz/baz/baz.txt',
        'foo/.foo',
      ])
    })

    it('should find all files paths in target dir which to equals to root', async () => {
      expect.assertions(1)

      const res = await flatSearch({
        path: '/foo',
      })

      expect(res).toEqual(['.foo'])
    })

    it('should return empty array if target directory is empty', async () => {
      expect.assertions(1)

      const res = await flatSearch({
        path: '/empty',
      })

      expect(res).toEqual([])
    })

    it('should find all files paths in target dir by given pattern', async () => {
      expect.assertions(1)

      const res = await flatSearch({
        path: '/',
        pattern: /(^\.[a-z0-9]+|\/\.[a-z0-9]|\\\.[a-z0-9]+)/i,
      })

      expect(res).toEqual(['.bar', 'baz/baz/.foo', 'foo/.foo'])
    })
  })
})
