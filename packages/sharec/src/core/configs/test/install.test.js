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
        '/target/.eslintrc': JSON.stringify(eslintBaseFxt.current),
      }

      vol.fromJSON(dir, '/')

      await installConfig({
        targetPath: '/target',
        configPath: '.eslintrc',
        configSource: JSON.stringify(eslintBaseFxt.upcoming),
      })

      expect(JSON.parse(vol.readFileSync('/target/.eslintrc', 'utf8'))).toEqual(
        eslintBaseFxt.result,
      )
    })

    it('should merge YAML configs', async () => {
      expect.assertions(1)

      const dir = {
        '/target/.eslintrc.yaml': eslintBaseFxtYaml.current,
      }
      vol.fromJSON(dir, '/')

      await installConfig({
        targetPath: '/target',
        configPath: '.eslintrc.yaml',
        configSource: eslintBaseFxtYaml.upcoming,
      })

      expect(vol.readFileSync('/target/.eslintrc.yaml', 'utf8')).toEqual(
        eslintBaseFxtYaml.result,
      )
    })

    it('should copy all non-mergeable configs', async () => {
      expect.assertions(1)

      const dir = {}

      vol.fromJSON(dir, '/')

      await installConfig({
        targetPath: '/target',
        configPath: '.editorconfig',
        configSource: 'bar',
      })

      const res = await vol.readFileSync('/target/.editorconfig', 'utf8')

      expect(res).toEqual('bar')
    })

    it('should correctly process configs with mixed file structure', async () => {
      expect.assertions(1)

      const dir = {}
      vol.fromJSON(dir, '/')

      await installConfig({
        targetPath: '/target',
        configPath: 'foo/bar/.editorconfig',
        configSource: 'bar',
      })

      expect(vol.readFileSync('/target/foo/bar/.editorconfig', 'utf8')).toEqual(
        'bar',
      )
    })
  })
})
