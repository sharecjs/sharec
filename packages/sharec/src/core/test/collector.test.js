const { vol } = require('memfs')
const { collectConfigsPaths } = require('core/collector')

describe('core > collector >', () => {
  beforeEach(() => {
    vol.reset()
  })

  describe('collectConfigsPaths', () => {
    it('should collect all files from config package', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': 'foo',
        '.eslintrc': 'bar',
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigsPaths('/configs')

      expect(files).toEqual(['.eslintrc', 'package.json'])
    })

    it('should collect all files from config package with nested directories', async () => {
      expect.assertions(1)

      const dir = {
        '_templates/exampleCss.ejs.t': 'foo',
        '_templates/exampleHtml.ejs.t': 'bar',
        '_templates/exampleJs.ejs.t': 'baz',
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigsPaths('/configs')

      expect(files).toEqual([
        '_templates/exampleCss.ejs.t',
        '_templates/exampleHtml.ejs.t',
        '_templates/exampleJs.ejs.t',
      ])
    })

    it('should collect mixed files and directories from config package', async () => {
      expect.assertions(1)

      const dir = {
        '.editorconfig': 'foo',
        '.eslintrc': '5',
        '_templates/exampleCss.ejs.t': '1',
        '_templates/exampleHtml.ejs.t': '2',
        '_templates/exampleJs.ejs.t': '3',
        'package.json': '4',
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigsPaths('/configs')

      expect(files).toEqual([
        '.editorconfig',
        '.eslintrc',
        '_templates/exampleCss.ejs.t',
        '_templates/exampleHtml.ejs.t',
        '_templates/exampleJs.ejs.t',
        'package.json',
      ])
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
