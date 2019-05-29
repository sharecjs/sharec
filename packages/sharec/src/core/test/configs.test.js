const { vol } = require('memfs')
const { processConfig } = require('core/configs')

describe('core > collector >', () => {
  const eslint01 = require('./fixtures/eslint/json/eslintrc_01.json')
  const eslint02 = require('./fixtures/eslint/json/eslintrc_02.json')
  const eslint03 = require('./fixtures/eslint/json/eslintrc_03.json')

  beforeEach(() => {
    vol.reset()
  })

  describe('processConfig', () => {
    it('should merge JSON configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc': JSON.stringify(eslint01),
        '/configs/.eslintrc': JSON.stringify(eslint02),
      }
      vol.fromJSON(dir, '/')

      await processConfig('/configs', '/target', '.eslintrc')

      const res = await vol.readFileSync('/target/.eslintrc', 'utf8')

      expect(JSON.parse(res)).toEqual(eslint03)
    })

    it('should copy all non-mergeable configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configs/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      await processConfig('/configs', '/target', '.editorconfig')

      const res = await vol.readFileSync('/target/.editorconfig', 'utf8')

      expect(res).toEqual('bar')
    })

    it('should correctly process configs with mixed file structure', async () => {
      expect.assertions(1)

      const dir = {
        '/configs/foo/bar/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      await processConfig('/configs', '/target', 'foo/bar/.editorconfig')

      const res = await vol.readFileSync(
        '/target/foo/bar/.editorconfig',
        'utf8',
      )

      expect(res).toEqual('bar')
    })
  })
})
