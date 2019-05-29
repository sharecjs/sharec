const path = require('path')
const { readFileSync } = require.requireActual('fs')
const { vol } = require('memfs')
const { collectConfigs } = require('core/collector')

describe('core > collector >', () => {
  let template01
  let template02
  let template03

  beforeAll(async () => {
    template01 = await readFileSync(
      path.resolve(__dirname, './fixtures/templates/exampleCss.ejs.t'),
      'utf8',
    )
    template02 = await readFileSync(
      path.resolve(__dirname, './fixtures/templates/exampleHtml.ejs.t'),
      'utf8',
    )
    template03 = await readFileSync(
      path.resolve(__dirname, './fixtures/templates/exampleJs.ejs.t'),
      'utf8',
    )
  })

  beforeEach(() => {
    vol.reset()
  })

  describe('collectConfigs', () => {
    it('should collect all files from config package', async () => {
      expect.assertions(1)

      const dir = {
        'package.json': JSON.stringify(
          {
            foo: 'bar',
          },
          null,
          2,
        ),
        '.eslintrc': JSON.stringify(
          {
            rules: {
              'no-console': 0,
            },
          },
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigs('/configs')

      expect(files).toEqual(dir)
    })

    it('should collect all files from config package with nested directories', async () => {
      expect.assertions(1)

      const dir = {
        '_templates/exampleCss.ejs.t': template01,
        '_templates/exampleHtml.ejs.t': template02,
        '_templates/exampleJs.ejs.t': template03,
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigs('/configs')

      expect(files).toEqual(dir)
    })

    it('should collect mixed files and directories from config package', async () => {
      expect.assertions(1)

      const dir = {
        '_templates/exampleCss.ejs.t': template01,
        '_templates/exampleHtml.ejs.t': template02,
        '_templates/exampleJs.ejs.t': template03,
        'package.json': JSON.stringify(
          {
            foo: 'bar',
          },
          null,
          2,
        ),
        '.eslintrc': JSON.stringify(
          {
            rules: {
              'no-console': 0,
            },
          },
          null,
          2,
        ),
      }
      vol.fromJSON(dir, '/configs')

      const files = await collectConfigs('/configs')

      expect(files).toEqual(dir)
    })

    it('should return empty object if configs dir does not contains any files', async () => {
      vol.fromJSON(
        {
          '/configs': {},
        },
        '/',
      )

      const files = await collectConfigs('/configs')

      expect(files).toEqual({})
    })
  })
})
