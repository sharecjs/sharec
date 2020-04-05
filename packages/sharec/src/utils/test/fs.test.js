const { vol } = require('memfs')
const {
  normalizePathSlashes,
  flatSearch,
  safeReadFile,
  safeMakeDir,
} = require('../fs')

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
      vol.fromJSON({}, '/')

      await safeMakeDir('/foo/bar/baz')

      expect(vol.readdirSync('/foo/bar')).toEqual(['baz'])
    })
  })

  describe('safeReadFile', () => {
    it('should return file content by given path', async () => {
      const dir = {
        'target/file.txt': 'foo',
      }
      vol.fromJSON(dir, '/')

      const res = await safeReadFile('/target/file.txt', 'utf8')

      expect(res).toEqual('foo')
    })

    it('should return null if target file is not exists', async () => {
      const dir = {
        'target/file.txt': 'foo',
      }
      vol.fromJSON(dir, '/')

      const res = await safeReadFile('/target/other-file.txt', 'utf8')

      expect(res).toEqual(null)
    })
  })

  describe('flatSearch', () => {
    const dir = {
      '.bar': 'bar',
      'foo/.foo': 'foo',
      'baz/baz/.foo': 'foo',
      'baz/baz/bar.txt': 'bar',
      'baz/baz/baz.txt': 'baz',
      'empty/': {},
    }

    beforeEach(() => {
      vol.fromJSON(dir, '/')
    })

    it('should find all files paths in target dir', async () => {
      const res = await flatSearch({
        path: '/',
      })

      expect(res).toHaveLength(5)
      expect(res).toEqual(
        expect.arrayContaining([
          '.bar',
          'foo/.foo',
          'baz/baz/baz.txt',
          'baz/baz/bar.txt',
          'baz/baz/.foo',
        ]),
      )
    })

    it('should find all files paths in target dir which to equals to root', async () => {
      const res = await flatSearch({
        path: '/foo',
      })

      expect(res).toEqual(['.foo'])
    })

    it('should return empty array if target directory is empty', async () => {
      const res = await flatSearch({
        path: '/empty',
      })

      expect(res).toHaveLength(0)
    })

    it('should find all files paths in target dir by given pattern', async () => {
      const res = await flatSearch({
        path: '/',
        pattern: /(^\.[a-z0-9]+|\/\.[a-z0-9]|\\\.[a-z0-9]+)/i,
      })

      expect(res).toHaveLength(3)
      expect(res).toContain('.bar')
      expect(res).toContain('baz/baz/.foo')
      expect(res).toContain('foo/.foo')
    })
  })
})
