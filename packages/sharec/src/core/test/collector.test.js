const { vol } = require('memfs')
const {
  normalizePathSlashes,
  collectConfigVersion,
  collectConfigsPaths,
} = require('core/collector')

describe('core > collector >', () => {
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

  describe('collectConfigVersion', () => {
    it('should return configuration package version', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': JSON.stringify({
          version: '1.0.0',
        }),
      }
      vol.fromJSON(dir, '/configs')

      const version = await collectConfigVersion('/configs')

      expect(version).toBe('1.0.0')
    })
  })

  describe('collectConfigsPaths', () => {
    it('should collect all files from config package', async () => {
      expect.assertions(3)

      const dir = {
        'package.json': 'foo',
        '.eslintrc': 'bar',
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigsPaths('/configs')

      expect(files).toHaveLength(2)
      expect(files).toContain('package.json')
      expect(files).toContain('.eslintrc')
    })

    it('should collect all files from config package with nested directories', async () => {
      expect.assertions(4)

      const dir = {
        '_templates/exampleCss.ejs.t': 'foo',
        '_templates/exampleHtml.ejs.t': 'bar',
        '_templates/exampleJs.ejs.t': 'baz',
      }
      vol.fromJSON(dir, '/')

      const files = await collectConfigsPaths('/')

      expect(files).toHaveLength(3)
      expect(files).toContain('_templates/exampleCss.ejs.t')
      expect(files).toContain('_templates/exampleHtml.ejs.t')
      expect(files).toContain('_templates/exampleJs.ejs.t')
    })

    it('should collect mixed files and directories from config package', async () => {
      expect.assertions(7)

      const dir = {
        '_templates/exampleCss.ejs.t': '1',
        '_templates/exampleHtml.ejs.t': '2',
        '_templates/exampleJs.ejs.t': '3',
        'package.json': '4',
        '.editorconfig': 'foo',
        '.eslintrc': '5',
      }
      vol.fromJSON(dir, '/')

      const files = await collectConfigsPaths('/')

      expect(files).toHaveLength(6)
      expect(files).toContain('_templates/exampleCss.ejs.t')
      expect(files).toContain('_templates/exampleHtml.ejs.t')
      expect(files).toContain('_templates/exampleJs.ejs.t')
      expect(files).toContain('package.json')
      expect(files).toContain('.editorconfig')
      expect(files).toContain('.eslintrc')
    })

    it('should return empty object if configs dir does not contains any files', async () => {
      vol.fromJSON(
        {
          '/configs': {},
        },
        '/',
      )

      const files = await collectConfigsPaths('/configs')

      expect(files).toEqual([])
    })
  })
})
