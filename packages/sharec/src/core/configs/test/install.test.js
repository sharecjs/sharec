const { fixtures } = require('testUtils')
const { vol } = require('memfs')
const { installConfig } = require('../install')

describe('processors > configs >', () => {
  const eslintBaseFxt = fixtures('eslint/json/01-base', 'json')
  const eslintBaseFxtYaml = fixtures('eslint/yaml/01-base')

  beforeEach(() => {
    vol.reset()
  })

  describe('installConfig', () => {
    it('should merge JSON configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configuration-package/configs/.eslintrc': JSON.stringify(
          eslintBaseFxt.upcoming,
        ),
        '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      }

      vol.fromJSON(dir, '/')

      await installConfig({
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        targetPath: '/target',
        configPath: '.eslintrc',
        configsPath: '/configuration-package/configs',
      })

      expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
        eslintBaseFxt.result,
      )
    })

    it('should merge YAML configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configuration-package/configs/.eslintrc.yaml':
          eslintBaseFxtYaml.upcoming,
        '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        targetPath: '/target',
        configPath: '.eslintrc.yaml',
        configsPath: '/configuration-package/configs',
      })

      expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toWraplessEqual(
        eslintBaseFxtYaml.result,
      )
    })

    it('should copy all non-mergeable configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configuration-package/configs/.editorconfig': 'bar',
      }

      vol.fromJSON(dir, '/')

      await installConfig({
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        targetPath: '/target',
        configPath: '.editorconfig',
        configsPath: '/configuration-package/configs',
      })

      const res = await vol.readFileSync('/target/.editorconfig', 'utf8')

      expect(res).toEqual('bar')
    })

    it('should correctly process nested configs', async () => {
      expect.assertions(1)

      const dir = {
        '/configuration-package/configs/foo/bar/.editorconfig': 'bar',
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        upcomingMeta: {
          config: 'awesome-config',
          version: '1.0.0',
        },
        targetPath: '/target',
        configPath: 'foo/bar/.editorconfig',
        configsPath: '/configuration-package/configs',
      })

      expect(vol.readFileSync('/target/foo/bar/.editorconfig', 'utf8')).toEqual(
        'bar',
      )
    })
  })
})
